// URL: https://observablehq.com/d/efaf71fba159b7ef
// Title: clubs
// Author: Sam Liu (@ontouchstart)
// Version: 71
// Runtime version: 1

const m0 = {
  id: "efaf71fba159b7ef@71",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# clubs`
)})
    },
    {
      name: "clubs",
      value: (function(){return(
['Flyingfox', 'we-run', 'misty-mountain-runners']
)})
    },
    {
      name: "amounts",
      value: (function(){return(
[]
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
)})
    },
    {
      name: "data",
      inputs: ["clubs","d3"],
      value: (function(clubs,d3){return(
clubs.map((d) => (d3.json(`https://moca-spike-150.appspot.com/ambassador/${d}/amount`)))
)})
    },
    {
      name: "amounts0",
      inputs: ["data"],
      value: (function(data){return(
data[0]
)})
    },
    {
      name: "amounts1",
      inputs: ["data"],
      value: (function(data){return(
data[1]
)})
    },
    {
      name: "amounts2",
      inputs: ["data"],
      value: (function(data){return(
data[2]
)})
    },
    {
      inputs: ["html","amounts0"],
      value: (function(html,amounts0){return(
html`<h1>Club1</h1>${amounts0.raised}${amounts0.goal}`
)})
    },
    {
      inputs: ["html","amounts1"],
      value: (function(html,amounts1){return(
html`<h1>Club2</h1>${amounts1.raised}${amounts1.goal}`
)})
    },
    {
      inputs: ["html","amounts2"],
      value: (function(html,amounts2){return(
html`<h1>Club3</h1>${amounts2.raised}${amounts2.goal}`
)})
    }
  ]
};

const notebook = {
  id: "efaf71fba159b7ef@71",
  modules: [m0]
};

export default notebook;
