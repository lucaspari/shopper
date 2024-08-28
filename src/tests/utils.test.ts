import utils from "../utils/utils";
import fs from "fs";
import path from "path";

// Mock the GoogleGenerativeAI class and its methods
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

    it("should return NaN if no numbers are found", () => {
      const str = "abcdef";
      expect(utils.getNumberInsideString(str)).toBeNaN();
    });
  });

  describe("readingGeminiResult", () => {
    it("should return the text from the Gemini API response", async () => {
      const testPath = path.resolve(__dirname, "test.png");
      fs.writeFileSync(testPath, "dummy content");

      const result = await utils.readingGeminiResult(testPath);
      expect(result).toBe("12345");

      fs.unlinkSync(testPath);
    });
  });
});
