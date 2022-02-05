const Discord = require('discord.js');

exports.embed = (response) => {
  if (!response || !response.fields) {
    return;
  }
  const embed = new Discord.MessageEmbed().setColor('#F012BE');
  response.fields.forEach(field => embed.addField(field.label, field.content));
  if (response.footer) {
    embed.setFooter({ text: response.footer });
  }
  return embed;
};
