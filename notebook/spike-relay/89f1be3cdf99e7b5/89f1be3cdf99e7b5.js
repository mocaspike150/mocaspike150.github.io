// URL: https://observablehq.com/d/89f1be3cdf99e7b5
// Title: track
// Author: Sam Liu (@ontouchstart)
// Version: 33
// Runtime version: 1

const m0 = {
  id: "89f1be3cdf99e7b5@33",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# track`
)})
    },
    {
      inputs: ["track","progress"],
      value: (function(track,progress){return(
track(progress)
)})
    },
    {
      name: "viewof progress",
      inputs: ["html","data"],
      value: (function(html,data){return(
html`<input type=range min="0" max=${data.length}>`
)})
    },
    {
      name: "progress",
      inputs: ["Generators","viewof progress"],
      value: (G, _) => G.input(_)
    },
    {
      name: "track",
      inputs: ["DOM","width","height","d3","data"],
      value: (function(DOM,width,height,d3,data){return(
(t) => {
  const svg = DOM.svg(width, height)
  const container = d3.select(svg)
  container.attr('style', 'border: 1px solid #ccc; margin-top:10px; width: 100%');
  const mile = parseInt(1912 * t / 42);
  container.append('text')
    .text(`Current Mileage`)
    .attr('x', width - 150 )
    .attr('y',  10)
    .attr('fill', '#FFA10A')
  
  container.append('text')
    .text(`${mile}`)
    .attr('x', width - 40 )
    .attr('y', 40)
    .attr('text-anchor', 'end')
    .attr('fill', 'green')
  
  let g = container.selectAll('g').data(data).enter().append('g');
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
'https://mocaspike150.github.io/json/track.json'
)})
    },
    {
      name: "data",
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
      name: "mile",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/json/mile.json')
)})
    }
  ]
};

const notebook = {
  id: "89f1be3cdf99e7b5@33",
  modules: [m0]
};

export default notebook;
