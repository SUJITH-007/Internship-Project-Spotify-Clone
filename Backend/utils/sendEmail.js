const nodemailer = require("nodemailer");

const sendEmail = async (user, invoicePath, plan) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Spotify Premium Activated",
        html: `<h2>Hello ${user.username}</h2>
        <p>Your <b>${plan}</b> plan is successfully activated</p>
        <p>Invoice is attached</p>`,
        attachments: [{
                filename: "invoice.pdf",
                path: invoicePath
            }
        ]
    });
};

module.exports = sendEmail;