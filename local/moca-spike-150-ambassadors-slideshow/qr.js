const fs = require('fs')
const QRCode = require('qrcode')
const axios = require('axios')
const data = 'https://www.mocaspike150.org/data/ambassadors.json'

const qr = (user, team, fn) => {
  const path = `https://www.crowdrise.com/o/en/campaign/${team}/${user}`
  QRCode.toDataURL(path, function (err, url) {
    const html = `
      <img width="100%" src="${url}"/>
      `
    fs.writeFile(fn, html, (err) => {
      if(err) {
        console.log(err)
      }
      else {
        console.log(fn)
      }
    })
  })
}


axios.get(data)
  .then( (response) => {
    response.data.forEach((d) => {
      const user = d.crowdrise_page
      const team= d.team
      const fn = `qr/${d.slug}.html`
      qr(user, team, fn)
    })
  })
  .catch((error) => {
    console.log(error.response.data)
  });

