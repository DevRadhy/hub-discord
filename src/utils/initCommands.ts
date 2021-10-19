import fs from "fs";
import { Commands } from "../DTO/CommandsDTO";

export function initCommands(commandsPath: string) {
  if(!commandsPath) {
    throw new Error("Path is invalid.");
  }

  const commands: Commands = {};

  const files = fs.readdirSync(commandsPath);

  files.map((file) => {
    const module = require(`${commandsPath}/${file}`);
    const { name, aliasses, enable, execute } = module.details;

    commands[name] = {
      enable,
      execute,
    };

    aliasses.map((alias: string) => {
      commands[alias] = {
        enable,
        execute,
      };
    });
  });

  return commands;
}