const fs = require('fs');
const yaml = require('js-yaml');
const PptxGenJS = require('pptxgenjs');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');

const pptx = new PptxGenJS();
const darkblue = '040d74';
const lightblue = 'd6dfee'; 
const brown = '582700';
const pink = 'f7cac9';
const input_dir = process.argv[2]  || '_stories';
const image_dir = process.argv[3] || 'story_images';


pptx.defineSlideMaster({
  title: 'MOCA_EN',
  bkgd:  darkblue,
  objects: [
    { 'image': {
        path: 'https://spike150.mocanyc.org/wp/uploads/2019/03/cropped-spike-150-logo-85-1.png', 
        x: 0.25, 
        y: 0.25,
        w: 2.5 * 272/272, 
        h: 2.5 * 85/272
      }
    }
  ]
});

pptx.defineSlideMaster({
  title: 'MOCA_CN',
  bkgd:  darkblue,
  objects: [
    { 
      'image': {
        path: 'https://spike150.mocanyc.org/wp/uploads/2019/03/cropped-spike-150-logo-85-1.png', 
        x: 5.25, 
        y: 0.25, 
        w: 2.5 * 272/272, 
        h: 2.5 * 85/272
      }
    }
  ]
});


const add_en_slide = (image, title, date, content) => {
  const slide = pptx.addNewSlide('MOCA_EN');

  slide.addShape(pptx.shapes.RIGHT_TRIANGLE, { 
    align:'c', 
    x:5, 
    y:4.625, 
    w:5, 
    h:1, 
    flipH: true,
    fill: pink
  });
 
  slide.addText(date, {
    x: 0.25,
    y: 1.25,
    w: 4.5,
    h: 0.25,
    bold: true,
    fill: lightblue,
    color: brown,
    fontSize: 12,
    fontFace: 'Arial',
    valign: 'top',
    margin: '10px'
  });

  slide.addText(title, {
    x: 0.25,
    y: 1.5,
    w: 4.5,
    h: 0.25,
    bold: true,
    fill: lightblue,
    color: brown,
    fontSize: 12,
    fontFace: 'Arial',
    valign: 'top',
    margin: '10px'
  });

  slide.addText(content, { 
    x: 0.25, 
    y: 1.75, 
    w: 4.5, 
    h: 3.5, 
    fontSize: 10, 
    fontFace: 'Arial', 
    fill: lightblue, 
    color: darkblue, 
    valign: 'top', 
    margin: '10px' 
  })

  slide.addImage({ 
    data: image,
    x: 5.25, 
    y: 0.25, 
    w: 4.5,
    h: 5,
    sizing: { type:'contain', w:4.5, h:5 }
  });
}

const add_cn_slide = (image, title, date, content) => {
  const slide = pptx.addNewSlide('MOCA_CN');
  slide.addShape(pptx.shapes.RIGHT_TRIANGLE, { 
    align:'c', 
    x:0, 
    y:4.625, 
    w:5, 
    h:1, 
    fill: pink
  });
  
  slide.addText(date, { 
    x: 5.25, 
    y: 1.25, 
    w: 4.5,
    h: 0.25, 
    bold: true,
    fill: lightblue, 
    color: brown,
    fontSize: 12, 
    fontFace: 'Arial', 
    valign: 'top', 
    margin: '10px' 
  });

  slide.addText(title, { 
    x: 5.25, 
    y: 1.5, 
    w: 4.5,
    h: 0.25, 
    bold: true,
    fill: lightblue, 
    color: brown,
    fontSize: 12, 
    fontFace: 'Arial', 
    valign: 'top', 
    margin: '10px' 
  });

  slide.addText(content, { 
    x: 5.25, 
    y: 1.75, 
    w: 4.5,
    h: 3.50, 
    fontSize: 10, 
    fontFace: 'Arial', 
    fill: lightblue, 
    color: darkblue, 
    valign: 'top', 
    margin: '10px' 
  })

  slide.addImage({ 
    data: image,
    x: 0.25, 
    y: 0.25, 
    w: 4.5,
    h: 5,
    sizing: { type:'contain', w:4.5, h:5 }
  });
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October', 
  'November',
  'December'
]

for(let file of fs.readdirSync(input_dir)) {
  const input = `${input_dir}/${file}`
  console.log(file)
  const fn_array = file.split('-');
  const date = `${fn_array[2]} ${months[fn_array[1] - 1]} ${fn_array[0]}`

  const md = fs.readFileSync(input, 'utf-8').split('---');
  const doc = yaml.safeLoad(md[1]);
  const en = new JSDOM(doc['story-en']); 
  const cn = new JSDOM(doc['story-cn']); 
  const en_content = jquery(en.window)('p').text();
  const cn_content = jquery(cn.window)('p').text();

  const image = fs.readFileSync(`${image_dir}/${file}`, 'utf-8');

  add_en_slide(
    image,
    doc['title'],
    date,
    en_content
  )

  add_cn_slide(
    image,
    doc['title-cn'],
    date,
    cn_content
  )
}

pptx.save('150stories.pptx');
