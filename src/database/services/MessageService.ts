import { getCustomRepository } from "typeorm";
import { IMessageProps } from "../../DTO/MessagesDTO";
import { MessageRepository } from "../../repositories/MessagesRepository";

class MessageService {
  messageRepository =  getCustomRepository(MessageRepository);

  async create({ guild_id, message_id }: IMessageProps) {
    const message = this.messageRepository.create({ guild_id, message_id });

    await this.messageRepository.save(message);
  }

  async getMessage({ guild_id, message_id }: IMessageProps) {
    const messageIdAlreadyExists = await this.messageRepository.findOne({ message_id });

    if(!messageIdAlreadyExists) {
      throw new Error("Reaction Role message does not exists.");
    }

    const message = await this.messageRepository.findOne({ guild_id, message_id });

    return message;
  }
}

export { MessageService };