/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";


//let { useremail, refreshtoken, clientid, clientsecret } = config().gmail;

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

/** defining and destructuring environments config for firebase functions */
let { useremail, refreshtoken, clientid, clientsecret } = functions.config().gmail;

/**create reusable transporter object using the gmail SMTP transport */
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: useremail,
        clientId: clientid,
        clientSecret: clientsecret,
        refreshToken: refreshtoken,
    },
});


//our firebase cloud function
exports.sendEmail = onCall((request: any) => {
    // Data passed from the client.
    const emailText = request.data.emailText;
    const emailTo = request.data.emailTo;
    const emailSubject = request.data.emailSubject;
    const uid = request.auth.uid;
    const name = request.auth.token.name || null;
    const picture = request.auth.token.picture || null;
    const email = request.auth.token.email || null;

    // TODO: Replace the `from`, `html` and `subject` values
    const mailOptions = {
        from: "miklos.borsi.4@gmail.com",
        to: emailTo,
        subject: emailSubject,
        html: emailText,
    };

// send mail with defined transport object
return transporter.sendMail(mailOptions).catch((err: any)=>{
        console.log(err);
    });
});


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
