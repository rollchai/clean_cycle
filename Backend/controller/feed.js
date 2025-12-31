import feedModel from "../model/feed.js";
import nodemailer from "nodemailer"
// Create feedback
export const createFeedback = async (req, res) => {
    try {
        const { name, email, rating, message } = req.body;

        if (!name || !email || !rating || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const feedback = await feedModel.create({ name, email, rating, message });
  await feedback.save()
   const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
   })
   const mailOption={
    from:process.env.GMAIL_USER, // send from your own email
      replyTo: email, // so replies go to the sender
      to: process.env.GMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nFeedback:\n${message}`,
   }
   await transporter.sendMail(mailOption)
    return res
      .status(200)
      .json({ success: true, message: "Feedback sent successfully" });
    
    }  catch (error) {
    console.error("Error sending contact message:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

