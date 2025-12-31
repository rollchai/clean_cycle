import nodemailer from "nodemailer";
import Email from "../model/Email.js";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save to database
    const contact = new Email({ name, email, message });
    await contact.save();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER, // send from your own email
      replyTo: email, // so replies go to the sender
      to: process.env.GMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending contact message:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
