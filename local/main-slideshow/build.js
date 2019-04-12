const fs = require('fs')
const sharp = require('sharp')

const w = 1920
const h = 1080

const build = (fn) => {
  const input = `${fn}.jpg`
  sharp(input)
    .resize({ width: w, height: h })
    .toBuffer()
    .then( (data) => { 
       const html = `<img width="100%" src="data:image/png;base64,${data.toString('base64')}"/>`
       const output = `${fn}.html`
       fs.writeFile(output, html, () => {})
    });
}

build('01')
build('02')

Array.from(Array(5).keys()).forEach((i) => {
  const delay = 10 + i * 5
  const output = `${delay}s.html`
  html = `---
layout: plain
---
<html>
<head>
{% include_relative style.html %}
</style>
</head>
<body>
{% include_relative main.html %}
</div>
<script>
const delay = ${delay * 1000};
{% include_relative animation.html %}
</script>
</body>
</html>
`
  fs.writeFile(output, html, () => {})

  console.log(`<li><a href="${output}">${output}</a></li>`)
})

