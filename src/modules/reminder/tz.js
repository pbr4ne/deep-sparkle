const { IANAZone } = require('luxon');

const ABBR = {
	PDT: 'America/Los_Angeles',
	PST: 'America/Los_Angeles',
	MDT: 'America/Denver',
	MST: 'America/Denver',
	CDT: 'America/Chicago',
	CST: 'America/Chicago',
	EDT: 'America/New_York',
	EST: 'America/New_York',
	AKDT: 'America/Anchorage',
	AKST: 'America/Anchorage',
	HST: 'Pacific/Honolulu',
	ADT: 'America/Halifax',
	AST: 'America/Halifax',
	NDT: 'America/St_Johns',
	NST: 'America/St_Johns',
	UTC: 'UTC',
	GMT: 'UTC'
};

function normalizeZone(input) {
	if (!input) return null;
	const s = input.trim();
	if (IANAZone.isValidZone(s)) return s;
	const mapped = ABBR[s.toUpperCase()];
	if (mapped) return mapped;
	const mins = parseOffsetMinutes(s);
	if (mins == null) return null;
	return `UTC${formatOffset(mins)}`;
}

function parseOffsetMinutes(s) {
	const m = s.match(/^(?:UTC)?\s*([+-])\s*(\d{1,2})(?::?(\d{2}))?$/i);
	if (!m) return null;
	const sign = m[1] === '-' ? -1 : 1;
	const h = parseInt(m[2], 10);
	const mn = m[3] ? parseInt(m[3], 10) : 0;
	if (h > 14 || mn > 59) return null;
	return sign * (h * 60 + mn);
}

function formatOffset(mins) {
	const sign = mins >= 0 ? '+' : '-';
	const a = Math.abs(mins);
	const h = String(Math.floor(a / 60)).padStart(2, '0');
	const m = String(a % 60).padStart(2, '0');
	return `${sign}${h}:${m}`;
}

module.exports = { normalizeZone };
