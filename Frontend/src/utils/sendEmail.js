import dotenv from "dotenv";

dotenv.config();

const accountSid=process.env.TWILIO_SID
const authToken=process.env.TWILIO_AUTH_TOKEN

const client =require("twilio")(accountSid,authToken)

const sendSMS=async (body)=>{
  let msgOptions={
    from:process.env.TWILIO_PHONE_NUMBER,
    to:process.env.To_number,
body,
  }
  try {
    const message=await client.messages.create(msgOptions)
    console.log(message)
  } catch (error) {
    console.log(err)
  }
}
sendSMS("hello")