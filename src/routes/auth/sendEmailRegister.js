const configGmail = require('../../config/configGmail.json');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const htmlMail = require('../../constants/htmlMail.js');

module.exports = async (req, res) => {
  if (!req.body.email) {
    res.json({
      code: 403, // Could not find email
      title: 'error',
      data: {
        message: "Email is a required field"
      }
    })
  } else {
    
    // Assign information to the token
    let token = await jwt.sign({ email: req.body.email }, 'secretkey');

    const transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: configGmail.user, // generated ethereal user
        pass: configGmail.password // generated ethereal password
      }
    });
    try {
      const info = await transporter.sendMail({
        from: '"Game Language 👻" <dev.game.backend@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Confirm mail ✔", // Subject line
        text: "Hello world?", // plain text body
        html: htmlMail(token)
        // html body
      });

      if (info) {
        res.json({
          code: 200, // Send confirm message to register ok!
          title: 'Success',
          data: {
            message: 'Please check your mail to confirm!'
          }
        })
      } else {
        res.json({
          code: 451, // Error
          title: 'Error',
          data: {
            message: 'Send confirm message to register fail!'
          }
        })
      }
    } catch (err) {
      res.sendStatus(400).send(err);
    }
  }
}