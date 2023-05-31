const nodemailer = require('nodemailer');
const { promisify } = require('util');
const fs = require("fs");
const path = require("path");
const readFile = promisify(fs.readFile);

exports.sendEmail = async (destination) => {
    const username = process.env.emailUser;
    const password = process.env.emailPass;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: username,
            pass: password,
        },
    });

    const htmlFile = await readFile(path.join(__dirname, "mail.html"), 'utf8');

    const mailOptions = {
        from: username,
        to: destination,
        subject: 'Taxi Order Confirmation',
        html: htmlFile,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error occurred while sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
    });      
};