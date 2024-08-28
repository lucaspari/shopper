const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const utils = {
  verifyIfIsImage: (file: any): boolean => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    return allowedExtensions.test(path.extname(file.originalname));
  },
  getNumberInsideString: (str: string): number => {
    str = str.replace(/[^0-9]/g, "");
    return parseInt(str);
  },
  readingGeminiResult: async (path: any): Promise<string> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "What is the measurement of the following hydrometer or gasmeter? give me only the value as an integer, nothing more. please.",
      {
        inlineData: {
          data: Buffer.from(fs.readFileSync(path)).toString("base64"),
          mimeType: "image/png",
        },
      },
    ]);
    return result.response.text();
  },
};

export default utils;
