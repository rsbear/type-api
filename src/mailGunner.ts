// import nodemailer from "nodemailer";
// import mg from "nodemailer-mailgun-transport";
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_KEY!);


export default function (userEmail: string, subjectTitle: string, content: any) {
  const msg = {
    to: userEmail,
    from: 'auth@typefeel.com',
    subject: subjectTitle,
    text: 'and easy to do anywhere, even with Node.js',
    html: content,
  };
  sgMail.send(msg)
    .then(() => {
      console.log('email success')
    })
    .catch(() => {
      console.log('email failed')
    });
}

// const auth = {
//   auth: {
//     api_key: "764ae19c2165472ec8e43099f37a8c50-19f318b0-d6a20d6c",
//     domain: "mail.keyconomy.com"
//   }
// };

// var nodemailerMailgun = nodemailer.createTransport(mg(auth));

// export default function (userEmail: string, subjectTitle: string, content: any) {
//   return nodemailerMailgun.sendMail(
//     {
//       from: { name: "typefeel ", address: "support@typefeel.com" },
//       to: userEmail, // An array if you have multiple recipients.
//       // cc: 'second@domain.com',
//       // bcc: 'secretagent@company.gov',
//       subject: subjectTitle,
//       //You can use "html:" to send HTML email content. It's magic!
//       html: content,
//       //You can use "text:" to send plain-text content. It's oldschool!
//       text: "Mailgun rocks, pow pow!"
//     },
//     function (err: any, info: any) {
//       if (err) {
//         console.log("Error: " + err);
//       } else {
//         console.log("Response: " + info);
//       }
//     }
//   );
// }