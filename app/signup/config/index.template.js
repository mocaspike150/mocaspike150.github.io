let config = {};

config.mailer = {
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  },
  mailOptions : (data) => ({
    from: '',
    to: '',
    subject: 'Signup Form from MOCASpike150',
    html: `
    <html>
    <p>Hi Renny, </p>
    <p>
    Someone had sent your a message via 
    <a href="https://www.mocaspike150.org/spike-relay-signup/"><img src="https://www.mocaspike150.org/wp/uploads/2019/03/cropped-spike-150-logo-85-1.png" alt="MOCA Spike 150."/></a>
    </p>
    <div>
    ${JSON.stringify(data)}
    </div>
    <p>
    <p>Yours,</p>
    <p>Moca Spike 150 bot 🤖 </p>
    `
  }),
  redirect: `https://mocaspike150.github.io/spike-relay-signup/thankyou`
}

module.exports = config;
