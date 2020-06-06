// URL: https://observablehq.com/d/624633383f012088
// Title: Untitled
// Author: Sam Liu (@ontouchstart)
// Version: 37
// Runtime version: 1

const m0 = {
  id: "624633383f012088@37",
  variables: [
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
)})
    },
    {
      name: "json_data",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://spike150.mocanyc.org/api/spike.json')
)})
    },
    {
      inputs: ["svg","json_data"],
      value: (function(svg,json_data){return(
svg`${json_data.svg}`
)})
    }
  ]
};

const notebook = {
  id: "624633383f012088@37",
  modules: [m0]
};

export default notebook;
