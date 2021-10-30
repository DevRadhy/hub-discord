import { Client, Message } from 'discord.js';
import { Commands } from '../DTO/CommandsDTO';

const config = require('../../config.json');

function event(client: Client, message: Message, commands: Commands) {
  if(message.author.bot) return;
  if(message.channel.type === "DM") return;

  const filterPrefixes = config.prefixes.filter((prefix: string) => message.content.startsWith(prefix));

  if(filterPrefixes === []) return;

  const PREFIX_LENGTH = filterPrefixes[0].length;

  const args = message.content.slice(PREFIX_LENGTH).trim().split(' ');
  const command = String(args.shift()).toLowerCase();

  const cmd = commands[command];

  if(!cmd || !cmd.enable) return;

  cmd.execute({ client, message, args });
}

export { event };