import { getCustomRepository } from "typeorm";
import { IMessageProps } from "../../DTO/MessagesDTO";
import { MessageRepository } from "../../repositories/MessagesRepository";

class MessageService {
  async create({ guild_id, message_id }: IMessageProps) {
    const messageRepository = getCustomRepository(MessageRepository);

    const message = messageRepository.create({ guild_id, message_id });

    await messageRepository.save(message);
  }

  async getMessage({ guild_id, message_id }: IMessageProps) {
    const messageRepository = getCustomRepository(MessageRepository);

    const messageIdAlreadyExists = await messageRepository.findOne({ message_id });

    if(!messageIdAlreadyExists) {
      throw new Error("Reaction Role message does not exists.");
    }

    const message = await messageRepository.findOne({ guild_id, message_id });

    return message;
  }
}

export { MessageService };