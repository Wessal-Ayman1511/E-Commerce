
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { mailTemplate } from './MailTemplate.js'
import User from '../../db/models/user.model.js'
import { generateToken } from '../utilities/createToken.js'

export default function sendEmail (token){
let dec_token = jwt.decode(token)
let email = dec_token.email
console.log(email)

// console.log("user email issssssss", email)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: "nouriti24@gmail.com",
        pass: "kilm rcic cojl vdam"
    },
    tls:{
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from:"Rahma Rubi",
    to: email,
    subject: 'Hello from TOP SHOES',
    text: 'This is a test email sent using Nodemailer.',
    html: mailTemplate(token)
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error occurred:', error);
    }
    console.log('Email sent:', info.messageId);
});
}
