// URL: https://observablehq.com/d/4daaf075e8f0bd0f
// Title: Crowdrise
// Author: Sam Liu (@ontouchstart)
// Version: 27
// Runtime version: 1

const m0 = {
  id: "4daaf075e8f0bd0f@27",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Crowdrise`
)})
    },
    {
      inputs: ["html","data0","data1"],
      value: (function(html,data0,data1){return(
html`<style>img { height: 128px; }</style><h1>Crowdrise0</h1>${data0}<h1>crowdrise1</h1>${data1}`
)})
    },
    {
      name: "data0",
      inputs: ["d3","api"],
      value: (function(d3,api){return(
d3.text(`${api}/0`)
)})
    },
    {
      name: "data1",
      inputs: ["d3","api"],
      value: (function(d3,api){return(
d3.text(`${api}/1`)
)})
    },
    {
      name: "api",
      value: (function(){return(
'https://moca-spike-150.appspot.com/crowdrise'
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
  id: "4daaf075e8f0bd0f@27",
  modules: [m0]
};

export default notebook;
