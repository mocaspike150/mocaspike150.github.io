const fs = require('fs');
const sharp = require('sharp')
const input = 'banner.png'

const save = (fn, output) => {
  fs.writeFile(fn, output, (err) => {
    if(err) {
      console.log(err);
    }
    else {
      console.log(fn);
    }
  })
}

const test = (size) => {
  if(size) {
    sharp(input)
      .resize(size)
      .toBuffer()
      .then( data => { 
        const output = `<img src="data:image/png;base64,${data.toString('base64')}"/>`
        save(`banner-${size}.html`, output)
      })
      .catch( err => { 
        console.log(err)
      })
  }
  else {
    sharp(input)
      .toBuffer()
      .then( data => { 
        const output = `<img src="data:image/png;base64,${data.toString('base64')}"/>`
        save(`banner.html`, output)
      })
      .catch( err => { 
        console.log(err)
      })
  }
}

test()
test(2048)
test(1024)
test(512)
test(256)
test(128)
test(64)
test(32)
test(16)
