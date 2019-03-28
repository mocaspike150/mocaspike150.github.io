// URL: https://observablehq.com/d/1b097d360a9bffe3
// Title: MOCA Story
// Author: Sam Liu (@ontouchstart)
// Version: 25
// Runtime version: 1

const m0 = {
  id: "1b097d360a9bffe3@25",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# MOCA Story`
)})
    },
    {
      inputs: ["md","en"],
      value: (function(md,en){return(
md`${en}`
)})
    },
    {
      inputs: ["md","cn"],
      value: (function(md,cn){return(
md`${cn}`
)})
    },
    {
      name: "en",
      inputs: ["data"],
      value: (function(data){return(
data.files['en.md'].content
)})
    },
    {
      name: "cn",
      inputs: ["data"],
      value: (function(data){return(
`${data.files['cn.md'].content}`
)})
    },
    {
      inputs: ["data"],
      value: (function(data){return(
data.files['cn.md'].raw_url
)})
    },
    {
      name: "data",
      inputs: ["d3","api","gist"],
      value: (function(d3,api,gist){return(
d3.json(`${api}/${gist}`)
)})
    },
    {
      name: "api",
      value: (function(){return(
'https://api.github.com/gists'
)})
    },
    {
      name: "gist",
      value: (function(){return(
'b87a6bd865c07c77953a32fb2e8bfbd9'
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
)})
    }
  ]
};

const notebook = {
  id: "1b097d360a9bffe3@25",
  modules: [m0]
};

export default notebook;
