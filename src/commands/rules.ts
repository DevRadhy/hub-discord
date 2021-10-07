import { ICommandsProps } from "../DTO/CommandsDTO";
import { MessageEmbed } from 'discord.js';

const { prefix, rules } = require('../../data.json');

interface IRulesProps {
  name: string,
  description: string;
}

const memberRules = ({ message }: ICommandsProps) => {
  const embed = new MessageEmbed();

  embed.setTitle("Regras");
  embed.setColor("#F72585");

  rules.map((rule: IRulesProps) => {
    embed.addField(`${prefix} ${rule.name}`, rule.description);
  });

  message.channel.send({ embeds: [embed] });
};

export const details = {
  name: "rules",
  description: "Comando para mostrar as regras.",
  aliasses: [ "regras" ],
  enable: true,
  execute: memberRules,
};