import { Client, Intents } from "discord.js";
import { event } from './events/message';
import { Commands } from "./DTO/CommandsDTO";
import { getEmoji } from "./utils/getEmoji";
import { initCommands } from "./utils/initCommands";
import path from "path";

import { MessageService } from './database/services/MessageService';

import './database';
import { CoworkingJob } from "./jobs/coworkingJob";
import { ChannelService } from "./database/services/ChannelService";

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
  const job = new CoworkingJob();
  const channelService = new ChannelService();

  job.create("* * * * *", async () => {
    const channels = await channelService.getAll();

    const fiveMinutesInMilliseconds = 5000000;
    const threeHoursInMilliseconds = 1.08e+7;

    if(channels.length === 0) return;

    channels.map((channel) => {
      const channelTime = Number(channel.created_at) + fiveMinutesInMilliseconds - threeHoursInMilliseconds;
      const dateNow = Date.now();

      const guild = client.guilds.cache.get(String(channel.guild_id));
      const guildChannel = guild?.channels.cache.get(String(channel.channel_id));

      if(guildChannel?.type !== 'GUILD_VOICE') return;

      const members = guildChannel?.members.size;

      if(members > 0) return;

      if(channelTime < dateNow) {
        channelService.delete(channel.channel_id);
        guildChannel?.delete();
      }
    });
  });

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
  if(user.bot) return;

  const { guild, id } = reaction.message;
  const guildMember = guild?.members.cache.get(user.id);

  const message = await messageService.getMessage({ guild_id: String(guild?.id), message_id: id });

  if (message?.message_id !== id) return;

  const emojiName = reaction.emoji.name;

  if(!emojiName) return;

  const emoji = getEmoji(emojiName);

  guildMember?.roles.add(emoji.role_id);
});

client.on('messageReactionRemove', async (reaction, user) => {
  const { guild, id } = reaction.message;
  const guildMember = guild?.members.cache.get(user.id);

  const message = await messageService.getMessage({ guild_id: String(guild?.id), message_id: id });

  if (message?.message_id !== id) return;

  const emojiName = reaction.emoji.name;

  if(!emojiName) return;

  const emoji = getEmoji(emojiName);

  guildMember?.roles.remove(emoji.role_id);
});

client.on('messageCreate', (message) => {
  event(client, message, commands);
});

client.login(process.env.SECRET_TOKEN);