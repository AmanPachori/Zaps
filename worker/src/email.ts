import nodemailer from "nodemailer";

// Ensure your environment variables are properly set
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(to: string, body: string) {
  try {
    await transport.sendMail({
      from: "lonewolf.1002684@gmail.com",
      sender: "lonewolf.1002684@gmail.com",
      to: to,
      subject: "Hello from Zapier",
      text: body,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
