import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_KEY!);

export default async function (userEmail: string, subjectTitle: string, content: any) {
  const msg = {
    to: userEmail,
    from: 'auth@typefeel.com',
    subject: subjectTitle,
    text: 'and easy to do anywhere, even with Node.js',
    html: content,
  };
  await sgMail.send(msg)
    .then(() => {
      console.log('email success')
    })
    .catch(() => {
      console.log('email failed')
    });
}
