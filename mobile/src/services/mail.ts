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
    return new Promise(async (resolve, reject) => {
      try {
        let request = bent(<string>VARIABLES.MAILER_HOST, "POST", "json", 200);

        let result = await request("mail/addToDb", {
          mail,
        });

        resolve({});
      } catch (error: any) {
        console.log("Mail send error");
      }
    });
  }
})();
