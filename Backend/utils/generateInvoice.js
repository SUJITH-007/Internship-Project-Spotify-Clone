const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const generateInvoice = (user, plan, baseAmount) => {
    return new Promise((resolve, reject) => {
        const dir = path.join(__dirname, "../uploads/invoices");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const filePath = path.join(dir, `invoice_${Date.now()}.pdf`);
        const total = baseAmount;
        const gst = (baseAmount * 18) / 118;
        const priceWithoutGST = baseAmount - gst;
        const doc = new PDFDocument({ margin: 0 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);
        doc.rect(0, 0, doc.page.width, doc.page.height)
            .fill("#121212");
        doc.rect(0, 0, doc.page.width, 80)
            .fill("#1DB954");
        doc.fillColor("#ffffff")
            .fontSize(28)
            .font("Helvetica-Bold")
            .text("Spotify", 50, 25);
        doc.fontSize(14)
            .font("Helvetica")
            .text("Premium Invoice", 50, 55);
        doc.fontSize(10)
            .text(`Date: ${new Date().toLocaleDateString()}`, 400, 30);
        doc.text(`Order ID: ${Date.now()}`, 400, 45);
        doc.fillColor("#b3b3b3")
            .fontSize(12)
            .text("Billed To:", 50, 120);
        doc.fillColor("#ffffff")
            .fontSize(14)
            .text(user.username, 50, 140);
        doc.fontSize(12)
            .text(user.email, 50, 160);
        doc.moveTo(50, 200)
            .lineTo(550, 200)
            .strokeColor("#333333")
            .stroke();
        doc.fillColor("#b3b3b3")
            .fontSize(12)
            .text("Subscription Details", 50, 220);
        doc.fillColor("#ffffff")
            .fontSize(14)
            .text(`Plan: ${plan.toUpperCase()}`, 50, 250);
        doc.fontSize(12)
            .fillColor("#b3b3b3")
            .text("Price (Excl. GST)", 50, 300);
        doc.fillColor("#ffffff")
            .text(`Rs ${priceWithoutGST.toFixed(2)}`, 400, 300);
        doc.fillColor("#b3b3b3")
            .text("GST (18%)", 50, 330);
        doc.fillColor("#ffffff")
            .text(`Rs ${gst.toFixed(2)}`, 400, 330);
        doc.rect(50, 380, 500, 60)
            .fill("#1DB954");
        doc.fillColor("#000000")
            .fontSize(16)
            .font("Helvetica-Bold")
            .text("TOTAL", 60, 400);
        doc.text(`Rs ${total.toFixed(2)}`, 400, 400);
        doc.fillColor("#888888")
            .fontSize(10)
            .font("Helvetica")
            .text("Thank you for choosing Spotify Premium", 50, 480);
        doc.text("Enjoy uninterrupted music ", 50, 500);
        doc.end();
        stream.on("finish", () => {
            resolve(filePath);
        });
        stream.on("error", (err) => {
            reject(err);
        });
    });
};

module.exports = generateInvoice;