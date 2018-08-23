const admin = require('firebase-admin');
//const twilio = require('./twilio');
const nodemailer = require('nodemailer');

const gmailEmail = "ditocode@gmail.com";
const gmailPassword = "¿¿¿¿¿¿";//poner password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000));


      var msj = `<div>
            <div>Codigo: ${code}</div>
        </div>`

      let mailOptions = {
        from: '"ditocode@gmail.com" <ditocode@gmail.com>', // sender address
        to: 'oscar.diez@gtec.com.mx,ditocode@gmail.com', // list of receivers
        subject: `Codigo ${code} `, // Subject line
        html: msj, // plain text body
      };

      // send mail with defined transport object
      mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(422).send(error);
        }else{
          admin.database().ref('users/' + phone)
          .update({ code: code, codeValid: true }, () => {
            res.send({ success: true });
          });
        }

      });

      /* twilio.messages.create({
          body: 'Your code is ' + code,
          to: phone,
          from: '+18053167032'
        }, (err) => {
          if (err) { return res.status(422).send(err); }

          admin.database().ref('users/' + phone)
            .update({ code: code, codeValid: true }, () => {
              res.send({ success: true });
            });
        })*/
    })
    .catch((err) => {
      res.status(422).send({ error: err });
    });
}