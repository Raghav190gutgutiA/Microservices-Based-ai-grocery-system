const { subscribeToQueue } = require("./rabbit");
const sendEmail = require("../utils/email");
require("dotenv").config();

function startListener() {

  subscribeToQueue("user_created", async (msg) => {
    const {
      email,
      role,
      fullname: { firstName, lastName },
    } = msg;

    const template = `
      <div style="font-family: Arial, sans-serif; background:#f6fff7; padding:30px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:30px;">
          <h1 style="color:#16a34a; text-align:center;">Welcome to AI Grocery 🛒</h1>
          <p>Hi <strong>${firstName} ${lastName}</strong>,</p>
          <p>Your role: <strong>${role}</strong></p>
          <p>Start exploring smart grocery shopping with AI 🚀</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Welcome to AI Grocery 🛒",
      text: "Welcome to AI Grocery",
      htmlContent: template,
    });
  });

  subscribeToQueue("password_reset_requested", async (msg) => {
    const { email, fullname, resetToken } = msg;

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const template = `
      <div style="font-family: Arial, sans-serif; background:#fff7f7; padding:30px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:30px;">
          <h2 style="color:#dc2626;">Reset Password 🔐</h2>
          <p>Hello ${fullname.firstName},</p>
          <a href="${resetLink}" style="display:inline-block; padding:10px 20px; background:#16a34a; color:#fff; border-radius:6px; text-decoration:none;">
            Reset Password
          </a>
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Reset your password 🔐",
      text: "Reset your password",
      htmlContent: template,
    });
  });
  
   subscribeToQueue("notification_events", async (msg) => {
    if (msg.type === "PAYMENT_SUCCESS") {

      const { email, orderId, amount } = msg;

      const template = `
        <div style="font-family: Arial; background:#f0fdf4; padding:30px;">
          <div style="max-width:600px; margin:auto; background:#fff; padding:30px; border-radius:12px;">
            <h2 style="color:#16a34a;">Payment Successful ✅</h2>
            <p>Your order <strong>#${orderId}</strong> has been placed successfully.</p>
            <p>Amount Paid: ₹${amount}</p>
          </div>
        </div>
      `;

      await sendEmail({
        to: email,
        subject: "Payment Successful ✅",
        text: "Payment success",
        htmlContent: template,
      });
    }

    
    if (msg.type === "PAYMENT_FAILED") {

      const { email, orderId } = msg;

      const template = `
        <div style="font-family: Arial; background:#fff7f7; padding:30px;">
          <div style="max-width:600px; margin:auto; background:#fff; padding:30px; border-radius:12px;">
            <h2 style="color:#dc2626;">Payment Failed ❌</h2>
            <p>Your payment for order <strong>#${orderId}</strong> failed.</p>
            <p>Please try again.</p>
          </div>
        </div>
      `;

      await sendEmail({
        to: email,
        subject: "Payment Failed ❌",
        text: "Payment failed",
        htmlContent: template,
      });
    }
  });

}

module.exports = startListener;