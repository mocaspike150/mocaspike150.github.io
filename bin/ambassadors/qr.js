const fs = require('fs')
const QRCode = require('qrcode')
const axios = require('axios')
const data = 'https://www.mocaspike150.org/data/ambassadors.json'

const qr = (user, fn) => {
  const path = `https://www.crowdrise.com/o/en/campaign/moca-spike-150/${user}`
  QRCode.toDataURL(path, function (err, url) {
    const html = `
      <img src="${url}"/>
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
      const fn = `_includes/ambassadors/qr/${d.slug}.html`
      qr(user, fn)
    })
  })
  .catch((error) => {
    console.log(error.response.data)
  });

