var nodemailer = require("nodemailer");

module.exports.sendMail = (email, msg, firstName, lastName, phone, techEmail, recipientEmail, techPassword) => {
  console.log(techEmail, recipientEmail, techPassword);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: techEmail,
      pass: techPassword,
    },
  });

  // reginahlestun@gmail.com

  var mailOptions = {
    from: techEmail,
    to: recipientEmail,
    subject: `Повідомлення від ${firstName} ${lastName}`,
    text: `${msg}. Пошта відправника: ${email}. Телефон відправника: ${phone}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};



