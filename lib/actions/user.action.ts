"use server"
import { Query, ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appWriteConfig } from "../appwrite/config";
import { string } from "zod";
import { log } from "console";
import { console } from "inspector";
const getUserByEmail = async (email: string) => {
    const { database } = await createAdminClient();
    
    const result = await database.listDocuments(
        appWriteConfig.databaseId,
        appWriteConfig.usersCollectionId,
        [Query.equal("email",[email])]
    )
    return result.total > 0 ? result.documents[0] : null


}
const handleError = (error : unknown, message : string) => {
    console.log(error , message)
    throw error ;

    
}
const sendEmailOTP = async ({email} : { email: string}) =>{
    const {account} = await createAdminClient()

    try{

        const session = await account.createEmailToken(ID.unique(), email)
        return session.userId
    }catch (error){
      handleError(error, "failed to send otp");
        
    }
}

const createAccount = async ({ 
    fullName , email}:
     { fullName : string , 
        email:string

     }) =>{
        const existingUser = await getUserByEmail(email)
        const accountId = await sendEmailOTP({ email })



}