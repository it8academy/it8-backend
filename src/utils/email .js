const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

  let transporter = nodemailer.createTransport({
    name: process.env.SMTP_NAME,
    pool: true,
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `${process.env.SMTP_NAME} < ${process.env.SMTP_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.text,
    message: options.message,
    html: options.html,
    attachments: options.attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
