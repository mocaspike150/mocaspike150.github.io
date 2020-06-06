// URL: https://observablehq.com/d/0507eb34c55e3cfb
// Title: Untitled
// Author: Sam Liu (@ontouchstart)
// Version: 43
// Runtime version: 1

const m0 = {
  id: "0507eb34c55e3cfb@43",
  variables: [
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
)})
    },
    {
      name: "profile",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/profile.json')
)})
    },
    {
      name: "id",
      inputs: ["profile"],
      value: (function(profile){return(
Object.keys(profile)
)})
    },
    {
      inputs: ["d3","DOM","id","profile"],
      value: (function(d3,DOM,id,profile)
{
  const container =  d3.select(DOM.element('div'))
  container.append('h1').html('Club Profile')
  container.append('ol')
    .selectAll('li')
    .data(id)
    .enter()
    .append('li')
    .html((d) => (`
${profile[d].en} ${profile[d].cn}
<a href="https://www.strava.com/clubs/${d}" target="_">${d}</a> 
`))
  
  return container.node()
}
)
    },
    {
      inputs: ["profile"],
      value: (function(profile){return(
Object.keys(profile)
)})
    }
  ]
};

const notebook = {
  id: "0507eb34c55e3cfb@43",
  modules: [m0]
};

export default notebook;
