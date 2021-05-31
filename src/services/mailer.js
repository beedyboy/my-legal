import nodemailer from "nodemailer"

const mailer = {
  getTransporter: () => {
    return nodemailer.createTransport({
      host: process.env.REACT_APP_MAIL_HOST,
      port: process.env.REACT_APP_MAIL_PORT,
      auth: {
        user: process.env.REACT_APP_MAIL_USERNAME,
        pass: process.env.REACT_APP_MAIL_PASSWORD,
      },
      tls: { secureProtocol: "TLSv1_method" }
    });
  },

  getMailOptions: ({ email, subject, message }) => { 
    return {
      from: `${process.env.REACT_APP_EMAIL_FROM_NAME} <${process.env.REACT_APP_EMAIL_FROM_EMAIL}>`,
      to: email,
      subject: subject,
      html: message,
    };
  }, 
  sendEmail: async (data) => {
    const transporter = mailer.getTransporter();
    const mailOptions = mailer.getMailOptions(data);
 
    return await transporter.sendMail(mailOptions);
  },
}; 
export default mailer;