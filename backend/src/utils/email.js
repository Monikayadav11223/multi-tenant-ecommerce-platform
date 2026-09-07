const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (orderGroup, customerEmail, customerName) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn('SMTP configuration missing, skipping email.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let orderDetailsHtml = orderGroup.map(order => {
    return '<h3>Order ' + order._id + '</h3>' +
    '<ul>' + order.items.map(item => '<li>' + item.quantity + 'x - Rs' + item.price + '</li>').join('') + '</ul>' +
    '<p><strong>Total: Rs' + order.totalAmount + '</strong></p>';
  }).join('');

  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@multistore.com',
    to: customerEmail,
    subject: 'Order Confirmation - MultiStore',
    html: '<h2>Thank you for your order, ' + customerName + '!</h2>' +
           '<p>Your payment was successful. Here are your order details:</p>' +
           orderDetailsHtml +
           '<p>We will notify you when your items are shipped.</p>'
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderConfirmationEmail };
