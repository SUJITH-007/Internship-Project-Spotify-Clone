const { Resend } = require("resend");
const fs = require("fs");

if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY missing");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (user, invoicePath, plan) => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: user.email,
            subject: "Spotify Premium Activated",
            html: `
                <h2>Hello ${user.username}</h2>
                <p>Your <b>${plan}</b> plan is successfully activated</p>
                <p>Invoice is attached</p>
            `,
            attachments: [
                {
                    filename: "invoice.pdf",
                    content: fs.readFileSync(invoicePath).toString("base64")
                }
            ]
        });
        console.log("Email sent successfully");
    } catch (err) {
        console.error("EMAIL ERROR:", err);
    }
};

module.exports = sendEmail;