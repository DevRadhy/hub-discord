import { getCustomRepository } from "typeorm";
import { ChannelsRepository } from "../../repositories/ChannelsRepository";

class ChannelService {
  async create(guild_id: string, channel_id: string) {
    const channelsRepository = getCustomRepository(ChannelsRepository);
    const channel = channelsRepository.create({ guild_id, channel_id });

    await channelsRepository.save(channel);
  }

  async delete(channel_id: string) {
    const channelsRepository = getCustomRepository(ChannelsRepository);
    const channel = channelsRepository.findOne({ channel_id });

    if(!channel) {
      throw new Error('Channel does not exists.');
    }

    await channelsRepository.delete({ channel_id });
  }

  async getAll() {
    const channelsRepository = getCustomRepository(ChannelsRepository);
    const channels = await channelsRepository.find();

    return channels;
  }

  async verify() {
    const channelsRepository = getCustomRepository(ChannelsRepository);
    const channels = await channelsRepository.find();

    const fiveMinutesInMilliseconds = 5000000;
    const threeHoursInMilliseconds = 1.08e+7;

    if(channels.length === 0) return;

    channels.map((channel) => {
      const channelTime = Number(channel.created_at) + fiveMinutesInMilliseconds - threeHoursInMilliseconds;
      const dateNow = Date.now();

      if(channelTime < dateNow) {
        this.delete(channel.channel_id);
      }
    });
  }
}

export { ChannelService };