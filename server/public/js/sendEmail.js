import nodemailer from 'nodemailer';

// const nn = require('.')

const sendEmail = async (notif, to, subject, text, link) => {
	try {
		const transporter = nodemailer.createTransport({
			host : 'smtp.gmail.com',
            service : 'gmail',
			port: 587,
			secure: true,
			auth: {
				user: 'demojyoti111@gmail.com',
				pass: 'yode nynb xboi qbbk',
			},
		});

		await transporter.sendMail({
			from: `"${notif}" <demojyoti111@gmail.com>`,
			to: to,
			subject: subject,
			text: text,
            html : `Click on this link to login <a href="${link}">login</a>`
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

export default sendEmail;