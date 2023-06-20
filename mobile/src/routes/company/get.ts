import { getCompanies } from '../../models/companies';


export const _get = async (req,res) => {
    let data = await getCompanies()
    if(data){res.send(data)} else {console.log("data yok")}
 }

 