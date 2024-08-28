const utils = {
  verifyImageBase64: (encoding: string): boolean => {
    return encoding.startsWith("data:image/png;base64,");
  },
};

export default utils;
