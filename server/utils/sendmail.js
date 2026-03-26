const nodemailer = require('nodemailer')
const { SENDBIRD_API, FROM_EMAIL } = require('../Config/env_export')
function sendmail(email, message) {
     console.log(message)
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false,
            auth: {
                user: "apikey",
                pass: SENDBIRD_API,
            },
        });


        (async () => {
            const info = await transporter.sendMail({
                from: `"soyab" <${FROM_EMAIL}>`,
                to: `${email}`,
                subject: "Hello ✔",
                text: message,
                html:message ,
            });

            console.log("Message sent:", info.messageId);
        })();
    } catch (e) {
        console.error(e.response)
        res.send({
            message: e.response
        })
    }
}
module.exports={sendmail}