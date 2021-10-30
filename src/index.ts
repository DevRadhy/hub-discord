import { Client, Intents, MessageEmbed } from "discord.js";
import { event } from './events/message';
import { Commands } from "./DTO/CommandsDTO";
import { getEmoji } from "./utils/getEmoji";
import { initCommands } from "./utils/initCommands";
import path from "path";

import { MessageService } from './database/services/MessageService';

import './database';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const messageService = new MessageService();

const commandsPath = path.join(__dirname, 'commands');
const commands: Commands = initCommands(commandsPath);

client.on('ready', () => {
  const status = [
    { name: 'Seja bem-vindo(a) à HUB', type: 0 },
  ];

  function setActivity() {
    const randomStatus = status[Math.floor(Math.random() * status.length)];

    client.user?.setActivity(randomStatus);
  }

  setInterval(setActivity, 60000);
});

client.on('messageReactionAdd', async (reaction, user) => {
  const { guild, id } = reaction.message;
  const guildMember = guild?.members.cache.get(user.id);

  const message = await messageService.getMessage({ guild_id: String(guild?.id), message_id: id});

  if (message?.message_id !== id) return;

  const emojiName = reaction.emoji.name;

  if(!emojiName) return;

  const emoji = getEmoji(emojiName);

  guildMember?.roles.add(emoji.role_id);
});

client.on('messageReactionRemove', async (reaction, user) => {
  const { guild, id } = reaction.message;
  const guildMember = guild?.members.cache.get(user.id);

  const message = await messageService.getMessage({ guild_id: String(guild?.id), message_id: id});

  if (message?.message_id !== id) return;

  const emojiName = reaction.emoji.name;

  if(!emojiName) return;

  const emoji = getEmoji(emojiName);

  guildMember?.roles.remove(emoji.role_id);
});

client.on('guildMemberAdd', (member) => {
  const channel = member.guild.systemChannel;

  if (!channel) return;

  const embed = new MessageEmbed();

  embed.setColor('#F72585');
  embed.setTitle('Welcome');
  embed.setThumbnail(String(member.user.avatarURL()));
  embed.setDescription(`Seja bem-vindo(a) ${member.user.username}`);

  channel.send({ embeds: [embed] });
});

client.on('messageCreate', (message) => {
  event(client, message, commands);
});

client.login(process.env.SECRET_TOKEN);