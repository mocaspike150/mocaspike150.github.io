let config = {};

const host = '***';

config.endpoint = `${host}/wp-json`;

config.headers = {
  "Authorization": "Basic ***"
};

config.data = {
  "title": "Test post",
  "content": `
  Tested on ${Date()}
  `
};

config.crowdrise = {
  url: [
    '***',
    '***'
  ]
}

config.mailer = {
  service: '***',
  auth: {
    user: '***',
    pass: '***'
  },
  mailOptions : (data) => ({
    from: '***',
    to: '***',
    subject: '***',
    html: `
    ***
    `
  }),
  redirect: `***`
}

module.exports = config;
