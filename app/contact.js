const config = require('./config');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config.mailer);

const contact = (req, res, next) => {
  const data = req.body.wpforms.fields;
  transporter.sendMail(config.mailer.mailOptions(data), (err, info) => {
    if(err) {
      console.log(err)
    }
    else {
      console.log(info);
    }
    res.redirect(config.mailer.redirect);
  });
};

module.exports = contact;
