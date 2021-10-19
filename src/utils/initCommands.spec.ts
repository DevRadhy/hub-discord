import { Commands } from '../DTO/CommandsDTO';
import { initCommands } from './initCommands';

import path from 'path';

describe('Commands', () => {
  it('Should be possible to return commands', () => {
    const commandsPath = path.join(__dirname, '..', 'mock', 'commands');
    const commands: Commands = initCommands(commandsPath);

    expect(commands).toHaveProperty('coworking');
  });

  it('Should not be possible to return commands', () => {
    expect(() => initCommands('')).toThrow(Error);
  });
});