import { MessageReaction } from "discord.js";
import { MessageService } from "../database/services/MessageService";
import { ICommandsProps } from "../DTO/CommandsDTO";
import { getEmoji } from "../utils/getEmojis";

const { message: messageReaction, reactions } = require('../../reaction.json');

const reactionRole = ({ message }: ICommandsProps) => {
  const messageService = new MessageService();

  message.channel.send(messageReaction.toString()).then(async (msg) => {
    reactions.map(async (reaction: { name: string }) => {
      await msg.react(reaction.name);
    });

    await messageService.create({
      guild_id: String(message.guild?.id),
      message_id: msg.id
    });

    const filter = (reaction: MessageReaction) => reactions.includes(reaction.emoji.name);

    const reactionCollector = msg.createReactionCollector({filter});

    reactionCollector.on('collect', (reaction, user) => {
      const guildMember = message.guild?.members.cache.get(user.id);
      const emojiName = reaction.emoji.name;
    
      const emoji = getEmoji(emojiName);
    
      guildMember?.roles.add(emoji.reaction_id);
    });
  });
};

export const details = {
  name: "rr",
  description: "Comando para adicionar cargos por reação.",
  aliasses: [ "reactionrole" ],
  enable: true,
  execute: reactionRole,
};