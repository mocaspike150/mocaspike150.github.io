// URL: https://observablehq.com/d/61176a801eec5e83
// Title: Spike positions
// Author: Sam Liu (@ontouchstart)
// Version: 420
// Runtime version: 1

const m0 = {
  id: "61176a801eec5e83@420",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Spike positions

Usage:
<pre>import {spike_positions} from "61176a801eec5e83"
</pre>
`
)})
    },
    {
      inputs: ["md","mile"],
      value: (function(md,mile){return(
md`## Mileage ${mile()}`
)})
    },
    {
      name: "total_miles",
      value: (function(){return(
1912 + 800
)})
    },
    {
      inputs: ["build","track","mile"],
      value: (function(build,track,mile){return(
build(track, mile())
)})
    },
    {
      name: "spike_positions",
      value: (function(){return(
[
  { x: 35, y: 10, angle: 5 },
  { x: 60, y: 10, angle: 0 },
  { x: 90, y: 15, angle: 0 },
  { x: 125, y: 20, angle: 0 },
  { x: 162, y: 12, angle: 10 },  
  { x: 190, y: 22, angle: 15 },
  { x: 212, y: 28, angle: 0 },
  { x: 247, y: 30, angle: 0 },
  { x: 285, y: 30, angle: 10 },
  { x: 320, y: 45, angle: 25 },
  { x: 340, y: 70, angle: 15 },
  { x: 368, y: 77, angle: 0 },
  { x: 402, y: 75, angle: 0 },
  { x: 437, y: 75, angle: 15 },
  { x: 468, y: 85, angle: 15 },
  { x: 492, y: 90, angle: -6 },
  { x: 524, y: 85, angle: -9 },
  { x: 567, y: 80, angle: 16 },
  { x: 596, y: 92, angle: 10 },
  { x: 622, y: 98, angle: 5 },
  { x: 652, y: 100, angle: -8 },
  { x: 686, y: 95, angle: 5 },
  { x: 716, y: 95, angle: -5 },
  { x: 748, y: 98, angle: -2 },
  { x: 782, y: 98, angle: -8 },
  { x: 810, y: 90, angle: -20 },
  { x: 842, y: 78, angle: 6 },
  { x: 880, y: 85, angle: 25 },
  { x: 902, y: 95, angle: 15 },
  { x: 930, y: 105, angle: 10 },
  { x: 960, y: 115, angle: 10 },
  { x: 985, y: 115, angle: 0 },
  { x: 1010, y: 115, angle: -8 },
  { x: 1038, y: 115, angle: -10 },
  { x: 1067, y: 110, angle: -10 },
  { x: 1097, y: 105, angle: -3 },
  { x: 1126, y: 105, angle: 0 },
  { x: 1158, y: 105, angle: 5 },
  { x: 1184, y: 105, angle: -14 },
  { x: 1200, y: 92, angle: -40 },
  { x: 1225, y: 78, angle: -50 },
  { x: 1235, y: 48, angle: -48 }
]
)})
    },
    {
      name: "build",
      inputs: ["DOM","d3","spike_svg","spike_positions"],
      value: (function(DOM,d3,spike_svg,spike_positions){return(
(track, mile) => {
  const total = 1912
  let t = Math.floor(mile * 42 / total) % 42 
  const svg = DOM.svg(1280, 183)
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
  
  let spike = g.append('g').html(spike_svg.svg);
  spike.attr('transform', (d, i) => { if( i == t - 1) {
    return `translate(${spike_positions[i].x}, ${spike_positions[i].y}) scale(0.3) rotate(${spike_positions[i].angle})`
  } else {
    return 'scale(0)'
  }})
 
  return svg;
}
)})
    },
    {
      name: "mile",
      inputs: ["now","t0","total_miles"],
      value: (function(now,t0,total_miles){return(
() => {
  let dt = now - t0
  let T = 3000
  return parseInt(total_miles * (dt < T ? (dt / T) : 1) )
}
)})
    },
    {
      name: "t0",
      value: (function(){return(
Date.now()
)})
    },
    {
      name: "track",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/json/track.json')
)})
    },
    {
      name: "spike_svg",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/spike.json')
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
  id: "61176a801eec5e83@420",
  modules: [m0]
};

export default notebook;
