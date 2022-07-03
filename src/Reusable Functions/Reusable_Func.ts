export const toUpper = (str: string) => {
  let firstChar = str?.charAt(0).toUpperCase();
  let otherPart = str?.split("");
  otherPart?.shift();
  return firstChar + otherPart?.join("")?.toLowerCase();
};
