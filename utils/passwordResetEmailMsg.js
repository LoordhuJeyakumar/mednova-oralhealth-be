function passwordResetEmailMsg(verificationLink, name) {
  const message = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eeeeee;
        }
        .header img {
            max-width: 100px;
        }
        .content {
            padding: 20px 0;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
        }
        .button {
            text-align: center;
            margin: 20px 0;
        }
        .button a {
            background-color: #FF6347;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 20px;
            border-top: 1px solid #eeeeee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MedNova App</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We received a request to reset your password for your MedNova App account.</p>
            <p>If you made this request, please click the button below to reset your password:</p>
            <div class="button">
                <a href="${verificationLink}" target="_blank">Reset Password</a>
            </div>
            <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
            <p><a href="${verificationLink}" target="_blank">${verificationLink}</a></p>
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            <p>For your security, this link will expire in 24 hours.</p>
            <p>If you need further assistance, please contact our support team.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 MedNova App. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

  `;

  return message;
}

module.exports = passwordResetEmailMsg;
