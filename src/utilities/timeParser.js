function parseTime(timeStr) {
  const timeRegex = /(\d+)\s*(second|minute|hour|day)s?/gi;
  let match;
  let totalMs = 0;
  const multipliers = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
  };

  while ((match = timeRegex.exec(timeStr)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    totalMs += value * (multipliers[unit] || 0);
  }

  return totalMs > 0 ? totalMs : null;
}

module.exports = { parseTime };
