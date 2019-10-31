const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
const darkblue = '040d74';
const lightblue = 'd6dfee'; 

pptx.defineSlideMaster({
  title: 'MOCA_EN',
  bkgd:  darkblue,
  objects: [
    { 'image': {
           path: 'https://www.mocaspike150.org/wp/uploads/2019/03/cropped-spike-150-logo-85-1.png', x:0.5, y: 0.5, w: 2.5 * 272/272, h: 2.5 * 85/272
        }
    }
  ]
});

pptx.defineSlideMaster({
  title: 'MOCA_CN',
  bkgd:  darkblue,
  objects: [
    { 'image': {
           path: 'https://www.mocaspike150.org/wp/uploads/2019/03/cropped-spike-150-logo-85-1.png', x:5.0, y: 0.5, w: 2.5 * 272/272, h: 2.5 * 85/272
        }
    }
  ]
});


const add_en_slide = (image, title, date, content) => {
  const slide = pptx.addNewSlide('MOCA_EN');
  slide.addText(content, { x:0.5, y:1.5, w: 4, h: 4, fontSize:12, fontFace: 'Arial', fill: lightblue, color: darkblue, valign: 'top', margin: '10px' })
  slide.addImage({ 
    path: image,
    x:5.0, 
    y:0.5, 
    w: 750/750 * 4,
    h: 590/750 * 4
  });
}

const add_cn_slide = (image, title, date, content) => {
  const slide = pptx.addNewSlide('MOCA_CN');
  slide.addText(content, 
     { x: 5.0, y:1.5, w: 4, h: 4, fontSize:12, fontFace: 'Arial', fill: lightblue, color: darkblue, valign: 'top', margin: '10px' })
  slide.addImage({ 
    path: image,
    x:0.5, 
    y:0.5, 
    w: 750/750 * 4,
    h: 590/750 * 4
  });
}

add_en_slide(
   'https://user-images.githubusercontent.com/23090526/67169076-1924a300-f377-11e9-98c4-6245bc0aef3a.jpg',
   'title',
   'date',
   `The first New York City Marathon was held in 1970 with a course entirely in Central Park. The entry fee was just $1 and only 55 out of the 127 entrants finished, receiving cheap wristwatches and baseball or bowling trophies as prizes. Today, the New York City Marathon is the world’s largest and most popular marathon, with over 52,000 finishers in 2018.
`
);

add_cn_slide(
  'https://user-images.githubusercontent.com/23090526/67169076-1924a300-f377-11e9-98c4-6245bc0aef3a.jpg',
   'title',
   'date',
   `1970年，纽约马拉松首次举办，当时整个赛道都在中央公园里。报名费只有1美元，127名参赛者中只有55人完成了比赛，他们获得了便宜的手表和棒球或保龄球奖杯作为奖品>。今天，纽约马拉松是世界上规模最大、最受欢迎的马拉松比赛，2018年有超过5.2万名选手完成比赛。`
)
pptx.save('output.pptx');
