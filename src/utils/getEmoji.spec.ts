import { getEmoji } from "./getEmoji";

jest.mock('../../reaction.json', () => require('../tests/mock/reaction.json'));

describe("Emoji", () => {
  it("Should be able to return an emoji", () => {
    const emoji = getEmoji('☕');
    const expectedEmoji = { "name": "☕", "reaction_id": "862089271745314836" };

    expect(emoji).toMatchObject(expectedEmoji);
  });

  it("Should not be able to return an emoji", () => {
    expect(() => getEmoji('')).toThrow(Error);
  });
});