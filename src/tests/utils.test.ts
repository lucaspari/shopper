import utils from "../utils/utils";

jest.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContent: jest.fn().mockResolvedValue({
            response: {
              text: jest.fn().mockReturnValue("12345"),
            },
          }),
        }),
      };
    }),
  };
});

describe("utils", () => {
  describe("verifyIfIsImage", () => {
    it("should return true for valid image file extensions", () => {
      const file = { originalname: "test.png" };
      expect(utils.verifyIfIsImage(file)).toBe(true);
    });
    it("should return false for invalid image file extensions", () => {
      const file = { originalname: "test.txt" };
      expect(utils.verifyIfIsImage(file)).toBe(false);
    });
  });

  describe("getNumberInsideString", () => {
    it("should extract numbers from a string", () => {
      const str = "abc123def";
      expect(utils.getNumberInsideString(str)).toBe(123);
    });
    it("should raise error and return 0 if there is no number", () => {
      const str = "abcdef";
      expect(utils.getNumberInsideString(str)).toBe(0);
    });
  });
});
