const fs = require('fs')
const sharp = require('sharp')

const w = 1920
const h = 1080
const build_path = '_includes/main-slideshow'
const src_path = 'local/main-slideshow'

const build = (fn) => {
  const input = `${src_path}/${fn}.jpg`
  sharp(input)
    .resize({ width: w, height: h })
    .toBuffer()
    .then( (data) => { 
       console.log('input', input)
       const html = `<img width="100%" src="data:image/png;base64,${data.toString('base64')}"/>`
       const output = `${build_path}/${fn}.html`
       fs.writeFile(output, html, (err) => {
       if(err) {
         console.log(err)
	   }
	   else {
         console.log('output', output)
	   }
      })
    });
}

build('01')
build('02')
