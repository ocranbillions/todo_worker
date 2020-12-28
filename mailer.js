const nodemailer = require('nodemailer');

module.exports.mailer = async (data, from="sammiestt@gmail.com") => {
  const {friendsEmail, ownersEmail} = data;
  console.log(process.env.SMTP_AUTH_PASS, process.env.SMTP_AUTH_USER, "smtp")
  try {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
    },
  });
  const mailOptions = {
    from,
    to: friendsEmail,
    subject: `Access to ${ownersEmail}'s todos`,
    html: `
    <div>
        <p>Hello!</p>
        <p>You now have full access to ${ownersEmail}'s todos!
        </div>`
      };

      const response = await transporter.sendMail(mailOptions);
      console.log(response, "in-mailer")
      return response;
  } catch (error) {

    return error.message;
  }
};
