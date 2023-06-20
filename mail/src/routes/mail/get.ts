import { ServicesRequest } from '../../services/microServices';
import { getMails } from '../../models/mail';

export const _getAllMails = async (req,res) => {
    let mails = await getMails();
    if(mails){res.send({mails})} else {console.log("data yok")}
}

export const _get = async (req,res) => {
    let data= await ServicesRequest(
        null,
        null,
        "MOBILE",
        "user/",
        "GET",
        {
        },
        {
            "requestFromInside": "ms",
            "ms": "MAILER"
        }
    )
    res.send({"status": data})
 }