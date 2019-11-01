const axios = require('axios');
const sharp = require('sharp')
const fs = require('fs');
const yaml = require('js-yaml');

const input_dir = process.argv[2]  || '_stories';
const image_dir = process.argv[3]  || 'story_images';

if (!fs.existsSync(image_dir)){
    fs.mkdirSync(image_dir, { recursive: true });
}

const w = 900;
const h = 1000;
for(let file of fs.readdirSync(input_dir)) {
  const input = `${input_dir}/${file}`;
  const fn = `${image_dir}/${file}`;
  const md = fs.readFileSync(input, 'utf-8').split('---');
  const doc = yaml.safeLoad(md[1]);
  const url = doc['post-image'];
  axios.get(url, { responseType: 'arraybuffer' })
      .then( (response) => {
        const data = response.data;
        const buffer = Buffer.from(data, 'binary');
        sharp(buffer)
          .resize({ width: w, height: h, fit: 'contain', background: { r: 255, g: 255, b: 255 } })
          .toBuffer()
          .then( (data) => {
             const src = `data:image/png;base64,${data.toString('base64')}`
             fs.writeFile(fn, src, (error) => {
               if(error) { console.log(error) }
               else { console.log(fn) }
             });
             fs.writeFile(`${fn}.html`, `<img src="${src}"/>`, (error) => {
               if(error) { console.log(error) }
               else { console.log(fn) }
             });
           })
          .catch((error) => { console.log(errorr) });
       })
}
