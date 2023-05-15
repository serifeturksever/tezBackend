import { VARIABLES } from "../app";
import bent from "bent";

interface MAIL {
  from?: String;
  fromMail?: String;
  fromName?: String;
  to?: String;
  toName?: String;
  subject?: String;
  text?: String;
  html?: String;
  template?: String;
  data?: Object;
}

export const Mailer = new (class {
  public send(mail: MAIL): Promise<Object> {
    console.log("BURHAN DÜNDAR MAİL", mail);
    return new Promise(async (resolve, reject) => {
      try {
        let request = bent(<string>VARIABLES.MAILER_HOST, "POST", "json", 200);

        let result = await request("mail/addToDb", {
          mail,
        });
        console.log("result: ", result);

        resolve({});
      } catch (error: any) {
        console.log("Mail send error");
      }
    });
  }
})();
