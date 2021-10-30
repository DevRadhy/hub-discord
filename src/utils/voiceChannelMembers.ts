import { VoiceChannel } from "discord.js";

export function voiceChannelMembers(channel: VoiceChannel): number {
  const channelMembers = channel.members.size;
  
  if(channelMembers >= 0) {
    return channelMembers;
  }

  return 0;
}