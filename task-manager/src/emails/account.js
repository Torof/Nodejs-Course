const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.MG_API_KEY, domain: process.env.DOMAIN_MG });
const postMaster = "Mailgun Sandbox <postmaster@sandbox4e2ce605f0e242909a0ed0cd4199dbcb.mailgun.org>"

const sendWelcomeEmail = (email, name) => {
    mg.messages().send({ 
        from: postMaster, 
        to: email, 
        subject: "Welcome", 
        text: `Welcome ${name}, to my app`
    })
}

const sendCancelEmail = (email, name) => {
    mg.messages().send({ 
        from: postMaster, 
        to: email, 
        subject: "Byebye", 
        text: `byebye ${name}, hope to see you around`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}

//data model:
// const data = {
//     from: "Mailgun Sandbox <postmaster@sandbox4e2ce605f0e242909a0ed0cd4199dbcb.mailgun.org>",
//     to: "scottpanam@protonmail.com",
//     subject: "task app",
//     text: "the task !"
// };

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.
