import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, otp) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: "OTP for password reset",
      html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        background: #ffffff;
        margin: 40px auto;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      h1 {
        color: #333;
        font-size: 22px;
      }
      p {
        font-size: 16px;
        color: #555;
        text-align: center;
      }
      .otp-box {
        font-size: 24px;
        font-weight: bold;
        color: #1E90FF;
        text-align: center;
        background: #f0f8ff;
        padding: 10px;
        border-radius: 6px;
        margin: 20px auto;
        width: fit-content;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #999;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Forgot Your Password?</h1>
      </div>
      <p>Use the OTP below to reset your password:</p>
      <div class="otp-box">${otp}</div>
      <p>This OTP will expire in <strong>10 minutes</strong>. If you didn't request this, please ignore this email.</p>
      <div class="footer">
        <p>⚽ The Jersey Locker - Your #1 Destination for Football Jerseys ⚽</p>
      </div>
    </div>
  </body>
  </html>
`,
    });
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
};

export default resend;
