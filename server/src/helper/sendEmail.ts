import nodemailer from "nodemailer";
import fs from "fs/promises";

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: "akashgupta989177@gmail.com",
    pass: "efijreibtsdxysmz",
  },
});

export async function sendEmail(email:string) {
    try{
        const data = await fs.readFile('./forgetPassword.html','utf-8');
  const info = await transporter.sendMail({
    from: 'akashgupta989177@gmail.com',
    to: email, 
    subject: "Todo App, Forget password",
    text: "Hello User",
    html: data,
  });

  console.log("Message sent: %s", info.messageId);
}catch(err){
    console.log(err);
}
}