const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const generateInvoice = require("../utils/generateInvoice");


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { amount }=req.body;
        const options={
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            plan
        } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = require("crypto")
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment" });
        }
        const user = await User.findById(req.user);
        user.subscription.plan = plan;
        user.subscription.startDate = new Date();
        await user.save();
        let amount =0;
        if(plan === "lite") amount =139;
        if(plan === "standard") amount = 199;
        if(plan === "platinum") amount = 299;
        if(plan === "student") amount = 99;
        const invoicePath = await generateInvoice(user, plan, amount);
        await sendEmail(user, invoicePath, plan);
        res.json({ message: "Payment successful, invoice sent" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};