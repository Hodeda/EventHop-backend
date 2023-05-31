const nodemailer = require('nodemailer');

exports.sendEmail = (destination, order) => {
    const username = process.env.emailUser;
    const password = process.env.emailPass;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: username,
            pass: password,
        },
    });
    const mailOptions = {
        from: username,
        to: destination,
        subject: 'Test Email',
        text: 'This is a test email sent using Nodemailer.',
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error occurred while sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
    });      
};