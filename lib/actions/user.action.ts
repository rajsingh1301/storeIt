"use server"
import { Query, ID, Databases } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appWriteConfig } from "../appwrite/config";


import { parseStringify } from "../utils";
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

 export const createAccount = async ({ 
    fullName , email}:
     { fullName : string , 
        email:string

     }) =>{
        const existingUser = await getUserByEmail(email)
        const accountId = await sendEmailOTP({ email })
        if(!accountId){
            throw new Error("Failed to send otp");
        }
        if(!existingUser){
            const {database} =  await createAdminClient()
            await database.createDocument({
                databaseId: appWriteConfig.databaseId,
                collectionId: appWriteConfig.usersCollectionId,
                documentId: ID.unique(),
                data: {
                    fullName,
                    email,
                    avatar: "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=",
                    accountId
                }
            })
        }
        return parseStringify({accountId});


}