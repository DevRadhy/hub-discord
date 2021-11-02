import { getCustomRepository } from "typeorm";
import { ChannelsRepository } from "../../repositories/ChannelsRepository";

class ChannelService {
  channelsRepository: ChannelsRepository = getCustomRepository(ChannelsRepository);

  async create(guild_id: number, channel_id: number) {
    const channel = this.channelsRepository.create({ guild_id, channel_id });

    await this.channelsRepository.save(channel);
  }

  async delete(channel_id: number) {
    const channel = this.channelsRepository.findOne({ channel_id });

    if(!channel) {
      throw new Error('Channel does not exists.');
    }

    await this.channelsRepository.delete({ channel_id });
  }
}

export { ChannelService };