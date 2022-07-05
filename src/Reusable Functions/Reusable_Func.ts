export const toUpper = (str: string) => {
  let firstChar = str?.charAt(0).toUpperCase();
  let otherPart = str?.split("");
  otherPart?.shift();
  return firstChar + otherPart?.join("")?.toLowerCase();
};

  //Email Valkidation function ============
 export const isEmail = (email:any)=> {
  return /[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/.test(email);
}