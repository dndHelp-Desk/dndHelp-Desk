const { MailSlurp } = require("mailslurp-client");
const mailslurp = new MailSlurp({
  apiKey: "7677cf6428fa677c5a3e2afadf9bbc846934a206e98bcfb5bc9640eb2edbefb7",
});
// send email and get saved result
export const sentEmail =  mailslurp.inboxController.sendEmailAndConfirm(
  "___inboxId___",
  {
    to: ["eluzaimoyo45@gmail.com"],
    subject: "Test",
    body: "Test",
  }
);

