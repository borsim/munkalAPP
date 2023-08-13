/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import {setGlobalOptions} from "firebase-functions/v2/options";

admin.initializeApp();
setGlobalOptions({region: "europe-west1"});


// create reusable transporter object using the gmail SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.USEREMAIL,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    refreshToken: process.env.REFRESHTOKEN,
  },
});

exports.sendemail = onCall((request) => {
  // Data passed from the client.
  const emailText = request.data.emailText;
  const emailTo = request.data.emailTo;
  const emailSubject = request.data.emailSubject;

  const mailOptions = {
    from: "miklos.borsi.4@gmail.com",
    to: emailTo,
    subject: emailSubject,
    html: emailText,
  };
  // send mail with defined transport object
  return transporter.sendMail(mailOptions).catch((err: string)=>{
    console.log(err);
  });
});
