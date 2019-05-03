// URL: https://observablehq.com/d/ef0253cb9fcac6a0
// Title: Untitled
// Author: Sam Liu (@ontouchstart)
// Version: 64
// Runtime version: 1

const m0 = {
  id: "ef0253cb9fcac6a0@64",
  variables: [
    {
      inputs: ["html","title","mileage"],
      value: (function(html,title,mileage){return(
html`
<div style="background: #FFF7ED; padding:20px; width:100%">
${title()}
${mileage()}
</div>
`
)})
    },
    {
      name: "title",
      value: (function(){return(
() => {
  return `
<div style="margin: 10px">
<div style="font-family: Verlag-bold; color: #ffa10a; font-size: 40px;">MOCA Spike 150 Virtual Relay</div>
<div style="font-family: Verlag-bold; color: #63bf87; font-size: 30px;">Week 1</div>
</div>
`
}
)})
    },
    {
      name: "mileage",
      inputs: ["mile","build","track","team_miles"],
      value: (function(mile,build,track,team_miles){return(
() => {
  return `
<div style="width:100px; margin-top: -50px; margin-left: auto;">
<div style="color: #ffa10a;
    font-size: 15px;
    line-height: 1;"">Current Mileage</div>
<div style="font-family: Verlag-bold;
    color: #63bf87;
    font-size: 40px;
    line-height: 0.8;">${mile()}</div>
</div>
${build(track, mile())}
<div style="color: #ffa10a;
    font-size: 15px;
    line-height: 1;"">Number of Railroads</div>
<div style="font-family: Verlag-bold;
    color: #63bf87;
    font-size: 40px;
    line-height: 0.8;">${Math.floor(mile() / 1912)}</div>
</div>
${team_miles("01")}
`
}
)})
    },
    {
      name: "total_miles",
      inputs: ["week"],
      value: (function(week){return(
(week_id) => {
  let total = 0;
  let teams = week[week_id].teams;
  for(let id in teams) {
    total += parseInt(teams[id].mile)
  }
  return total
}
)})
    },
    {
      name: "team_miles",
      inputs: ["week","avatar"],
      value: (function(week,avatar){return(
(week_id) => {
  let output = `<div>`
  let teams = week[week_id].teams
  
  for(let id in teams) {
    output += `
<a href="https://www.mocaspike150.org/demo/club/#${teams[id].id}" target="${teams[id].id}">
<img style="border-radius: 32px; width: 32px; height: 32px; margin: 5px"  src="${avatar[teams[id].id].src}"/>
</a>${teams[id].mile} miles
`
  }
  output += `</div>`
  return output
}
)})
    },
    {
      name: "build",
      inputs: ["DOM","d3","spike_svg","spike_positions"],
      value: (function(DOM,d3,spike_svg,spike_positions){return(
(track, mile) => {
  const total = 1912 
  const t = Math.floor(mile * 42 / total) % 42
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
 
  return svg.outerHTML;
}
)})
    },
    {
      name: "mile",
      inputs: ["now","t0","mile_data"],
      value: (function(now,t0,mile_data){return(
() => {
  let dt = now - t0
  let T = 6000
  return parseInt(mile_data.mile * (dt < T ? (dt / T) : 1) )
}
)})
    },
    {
      name: "mile_data",
      inputs: ["total_miles"],
      value: (function(total_miles){return(
{ mile: total_miles("01") }
)})
    },
    {
      name: "t0",
      value: (function(){return(
Date.now()
)})
    },
    {
      from: "61176a801eec5e83",
      name: "spike_positions",
      remote: "spike_positions"
    },
    {
      name: "spike_svg",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/spike.json')
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
      name: "week",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/relay/week.json')
)})
    },
    {
      name: "avatar",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/club/avatar.json')
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

const m1 = {
  id: "61176a801eec5e83",
  variables: [
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
    }
  ]
};

const notebook = {
  id: "ef0253cb9fcac6a0@64",
  modules: [m0,m1]
};

export default notebook;
