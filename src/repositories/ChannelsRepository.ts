import { EntityRepository, Repository } from "typeorm";
import { Channels } from "../entities/Channels";

@EntityRepository(Channels)
class ChannelsRepository extends Repository<Channels> {}

export { ChannelsRepository };