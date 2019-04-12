const fs = require('fs')
const axios = require('axios')
const sharp = require('sharp')
const data = 'https://www.mocaspike150.org/data/ambassadors.json'
const placeholder = 'https://user-images.githubusercontent.com/46349226/56007582-392c2900-5ca7-11e9-9113-6391bf266f0d.jpg'

axios.get(data)
  .then( (res) => {
    res.data.forEach((d) => {
      const image = d['post-image'] ? d['post-image'] : placeholder
      const fn = `profile/${d.slug}.html`
      const w = 1920
      const h = 1080

      axios.get(image, { responseType: 'arraybuffer' })
       .then( (response) => {
         buffer = Buffer.from(response.data, 'binary')
         sharp(buffer).resize({ width: w, height: h })
           .toBuffer()
           .then( (data) => { 
             const html = `<img width="100%" src="data:image/png;base64,${data.toString('base64')}"/>`
             fs.writeFile(fn, html, (err) => {
               if(err) {
                 console.log(err)
               }
               else {
                 console.log(fn)
               }
             })
           })
       })
       .catch((error) => {
         console.log(error.response.data)
       })
//      qr(id)
    })
  })
  .catch((error) => {
    console.log(error.res.data)
  });

