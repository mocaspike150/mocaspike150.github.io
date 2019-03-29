// URL: https://observablehq.com/d/89f1be3cdf99e7b5
// Title: Build a Railroad
// Author: Sam Liu (@ontouchstart)
// Version: 115
// Runtime version: 1

const m0 = {
  id: "89f1be3cdf99e7b5@115",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Build a Railroad`
)})
    },
    {
      inputs: ["html","mile"],
      value: (function(html,mile){return(
html`<h2 style="color: #64C188;"> Miles: ${mile()} </h2>`
)})
    },
    {
      inputs: ["build","track","mile"],
      value: (function(build,track,mile){return(
build(track, mile())
)})
    },
    {
      name: "t0",
      value: (function(){return(
Date.now()
)})
    },
    {
      name: "mile",
      inputs: ["now","t0","mile_data"],
      value: (function(now,t0,mile_data){return(
() => {
  let dt = now - t0
  let T = 3000
  return parseInt(mile_data.mile * (dt < T ? (dt / T) : 1) )
}
)})
    },
    {
      name: "build",
      inputs: ["DOM","width","height","d3"],
      value: (function(DOM,width,height,d3){return(
(track, mile) => {
  let t = Math.floor(mile * 42 / 1912)
  const svg = DOM.svg(width, height)
  svg.style = "width: 100%;"
  const container = d3.select(svg)
  
  let g = container.selectAll('g').data(track).enter().append('g');
  g.attr('fill', 'none')
  g.append('path')
    .attr('d', (d, i) => { return d.path[0] })
    .attr('fill', (d, i) => { return (i < t) ? '#64C188' : '#ccc'})
  g.append('path')
    .attr('d', (d, i) => { return d.path[1] })
    .attr('fill', (d, i) => { return (i < t) ? '#64C188' : '#ccc'})
  g.append('polygon')
    .attr('points', (d, i) => { return d.points })
    .attr('fill', (d, i) => { return (i < t) ? '#64C188' : '#ccc'})
 
  return svg;
}
)})
    },
    {
      name: "height",
      value: (function(){return(
183
)})
    },
    {
      name: "width",
      value: (function(){return(
1280
)})
    },
    {
      name: "url",
      value: (function(){return(
'https://www.mocaspike150.org/json/track.json'
)})
    },
    {
      name: "track",
      inputs: ["d3","url"],
      value: (function(d3,url){return(
d3.json(url)
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    },
    {
      name: "mile_data",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/json/mile.json')
)})
    }
  ]
};

const notebook = {
  id: "89f1be3cdf99e7b5@115",
  modules: [m0]
};

export default notebook;
