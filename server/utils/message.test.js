const expect = require("expect");
const {generateMessage} = require("./message")

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const text = "Test text";
    const from = "admin";

    let response = generateMessage(from, text);
    expect(response.from).toBe(from);
    expect(response.text).toBe(text);
    expect(response.createdAt).toBeA("number");
  });
});
