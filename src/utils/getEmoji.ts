const { reactions } = require('../../reaction.json');

interface IEmojiProps {
  name: string;
  reaction_id: string;
}

export function getEmoji(emojiName: string): IEmojiProps {
  const emoji: IEmojiProps = reactions.find((emoji: IEmojiProps) => emoji.name === emojiName);

  if(!emoji) {
    throw new Error("Emoji does not exits.");
  }

  return emoji;
}