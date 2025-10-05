import {sender,resendClient } from "../lib/sender.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail =async (email,name,cilentURL)=>{
    const {data,error} = await resendClient.emails.send({
        from :`${sender.name} <${sender.email}>`,
        to:email,
        subject:"Welcome to chatApp",
        html:createWelcomeEmailTemplate(name,cilentURL)
    });
    if(error){
        console.log("Error sending in welcome Email",error);
        throw new Error("Failed to send Welcome Email");
    }
    console.log("Welcome Email Sent successFully",data);

}
