const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'dimas.ashar1997@gmail.com', 
    pass: 'fnnsfquhiocypdlr', 
  },
});

module.exports = {transporter};