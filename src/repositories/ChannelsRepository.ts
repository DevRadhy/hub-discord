import { EntityRepository, Repository } from "typeorm";
import { Channel } from "../entities/Channel";

@EntityRepository(Channel)
class ChannelsRepository extends Repository<Channel> {}

export { ChannelsRepository };