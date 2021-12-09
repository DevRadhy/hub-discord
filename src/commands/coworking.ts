import { CategoryChannelResolvable, Guild, OverwriteResolvable, PermissionString } from "discord.js";
import { ICommandsProps } from "../DTO/CommandsDTO";

import { createChannel } from "../utils/createChannel";
import { ChannelService } from "../database/services/ChannelService";

const coworking = async ({ message }: ICommandsProps) => {
  const mentions = message.mentions.users;
  const everyoneRole = message.guild?.roles.everyone.id as string;
  
  const category = String(process.env.CATEGORY_ID);
  const categoryID = message.guild?.channels.cache.get(category) as CategoryChannelResolvable;
  const channelName = `${message.author.username}'s co-working`;

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

  const guild = message.guild as Guild;

  const channelProps = {
    guild,
    categoryID,
    channelName,
    limit: mentions.size + 1,
    membersPermissions,
  };

  const channel = await createChannel(channelProps);

  const channelService = new ChannelService();

  await channelService.create(guild.id, channel.id);
};

export const details = {
  name: "coworking",
  description: "Comando para criar salas de co-working.",
  aliasses: [ "criarcanal", "createchannel", "cowork", "work", "co-working" ],
  enable: true,
  execute: coworking,
};