import { ObjectId } from "mongodb";
import { mongodbRead, mongodbWrite } from "../app";
import { EXPERIENCE } from "./experiences";
import { SKILL } from "./skills";
import { LANGUAGE } from "./languages";
import { EDUCATION } from "./educations";
import { COURSE } from "./courses";
import { getUserFollowers } from "./follows";
import { getFollowerEmailById, getMemberFullName } from "./members";
import { ServicesRequest } from "../services/microServices";
import { getUserFullName } from "./users";
import { getCompanyNameWithId } from "./companies";

export interface NOTIFICATION {
  "user_id"?: ObjectId;
  "user_name"?: string;
  "experiences"?: Array<EXPERIENCE>;
  "skills"?: Array<SKILL>;
  "courses"?: Array<COURSE>;
  "educations"?: Array<EDUCATION>;
  "languages"?: Array<LANGUAGE>;
}

const collectionRead = mongodbRead.collection("m_notifications");
const collectionWrite = mongodbWrite.collection("m_notifications");

export const getUserNotifications = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const notifyFollowerMembersAboutUpdates = async (notificationObj: NOTIFICATION): Promise<any> => {
    let willInformMemberEmails = []
    let willInformMemberIds = await getUserFollowers(notificationObj.user_id);
    if(willInformMemberIds.length == 0){
      return
    }
    try {
      for(let i=0; i < willInformMemberIds[0].followers.length;i++){
        let memberMail = await getFollowerEmailById(willInformMemberIds[0].followers[i]);
        if(memberMail){ willInformMemberEmails.push(memberMail.email) }
      }
    
      // add course objects course name
      notificationObj.courses.map(async (course) => {
        let companyName = await getCompanyNameWithId(new ObjectId(course.company_id))
        course["company_name"] = companyName
        return course
      })

      let data= await ServicesRequest(
        null, // -> Express.request
        null, // -> Express.response
        "MAILER", // -> İsteğin atıldığı servis MAILER: mail servisi
        "mail/notifyUserFollowersAboutUpdates", // -> isteğin atıldığı path
        "POST", // HTTP request tipi
        {
          "emails": willInformMemberEmails,
          "userName": notificationObj.user_name,
          "updatedExperiences": notificationObj.experiences,
          "updatedSkills": notificationObj.skills,
          "updatedCourses": notificationObj.courses,                    
          "updatedEducations": notificationObj.educations,
          "updatedLanguages": notificationObj.languages,
        },
        {
            "requestFromInside": "ms", 
            "ms": "MOBILE" // isteği atan servis
        }
    )

    if(data){
      return Promise.resolve(data)
    } else {
      return Promise.resolve({
        "status": "error",
        "msg": "Mails could not be sent"
      })
    }
    } catch(e) {
      console.error(e)
    }
  }