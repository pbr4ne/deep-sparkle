const { formatDuration, intervalToDuration } = require('date-fns');
const { MessageEmbed } = require('discord.js');

exports.raffle = (message) => {
  const { content, channel, author, guild } = message;

  const raffleParts = content.split(' ');
  if (raffleParts.length >= 4) {
    const time = raffleParts[2];
    if (!isNaN(time)) {
      const milliseconds = time * 1000;
      const description = raffleParts.slice(3, raffleParts.length).join(' ');
      const startEmbed = raffleStartEmbed(milliseconds, description, author, guild);
      
      channel.send({ embeds: [startEmbed] }).then(startMessage => {
        startMessage.createReactionCollector({ time: milliseconds })
          .on('end', async (collected) => {
            await message.channel.send({ embeds: [await raffleCompleteEmbed(description, author, guild, collected)] });
          });
      });
        
      return;
    }
  }
  channel.send('format incorrect');
}

function raffleEmbed(title, description, author, guild) {
  const embed = new MessageEmbed()
    .setColor('#F012BE')
    .setTitle(title)
    .setDescription(description)
    .setThumbnail(guild.iconURL())
    .setFooter({ 
      text: `raffle organized by ${author.username}`,
      iconURL: author.displayAvatarURL(),
    });

  return embed;
}

function raffleStartEmbed(milliseconds, description, author, guild) {
  const duration = intervalToDuration({start: 0, end: milliseconds});
  const embed = raffleEmbed('Raffle!', description, author, guild);

  embed.addFields({
    name: 'Instructions',
    value: 'React with any emoji to enter! Only one entry per person will be counted.',
  },{
    name: 'Duration',
    value: `Raffle will expire in ${formatDuration(duration)}.`,
  });

  return embed;
}

function raffleCompleteEmbed (description, author, guild, collected) {
  const embed = raffleEmbed('Raffle Results!', description, author, guild);
  
  if(collected.size > 0) {
    const uniqueUsers = new Set(collected.map((reaction) => reaction.users.cache.map(user => user)).flat());
    const usersDisplay = [...uniqueUsers].map(user => user.username).join('\n');
    const winner = Array.from(uniqueUsers)[Math.floor(Math.random() * uniqueUsers.size)];
    console.log(uniqueUsers);
    console.log(usersDisplay);
    console.log(winner);

    embed.image = winner.displayAvatarURL();

    embed.addFields({
      name: 'Entered',
      value: usersDisplay,
    },{
      name: 'Winner',
      value: `${winner}`,
    });

  } else {
    embed.description = 'No one entered the raffle.';
  }
  return embed;
}