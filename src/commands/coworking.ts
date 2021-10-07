import { Guild, OverwriteResolvable, PermissionString } from "discord.js";
import { ICommandsProps } from "../DTO/CommandsDTO";

import cron from 'node-cron';
import { createChannel } from "../utils/createChannel";

const { channels } = require('../../config.json');

const coworking = async ({ message }: ICommandsProps) => {
  const mentions = message.mentions.users;
  const everyoneRole = message.guild?.roles.everyone.id as string;
  
  const categoryID = channels.category_id;
  const channelName = `${message.author.username}'s co-working`;

  message.delete();

  if(mentions.size <= 0) return message.reply({ content: "Desculpe, você precisa mencionar um ou mais membros" });

  const permissions: PermissionString[] = [ 'CONNECT', 'SEND_MESSAGES', 'SPEAK', 'STREAM', 'VIEW_CHANNEL' ];
  const membersPermissions: OverwriteResolvable[] = [
    {
      id: everyoneRole,
      deny: permissions,
    },
    {
      id: message.author.id,
      allow: permissions,
    }
  ];

  mentions?.map((user) => {
    membersPermissions.push({
      id: user.id,
      allow: permissions,
    });
  });

  const channelProps = {
    guild: message.guild as Guild,
    categoryID,
    channelName,
    limit: mentions.size + 1,
    membersPermissions,
  };

  const channel = await createChannel(channelProps);

  const job = cron.schedule("*/5 * * * *", () => {
    const channelMembers = channel.members.size;

    if(channelMembers !== 0) return;

    channel.delete();

    job.destroy();
  });

  job.start();
};

export const details = {
  name: "coworking",
  description: "Comando para criar salas de co-working.",
  aliasses: [ "criarcanal", "createchannel", "cowork", "work", "co-working" ],
  enable: true,
  execute: coworking,
};