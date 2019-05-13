// URL: https://observablehq.com/d/3f4fa13115bab893
// Title: Untitled
// Author: MOCA Spike 150 (@mocaspike150)
// Version: 177
// Runtime version: 1

const m0 = {
  id: "3f4fa13115bab893@177",
  variables: [
    {
      inputs: ["html","mileage"],
      value: (function(html,mileage){return(
html`${mileage}`
)})
    },
    {
      name: "leaderboard",
      value: (function(){return(
true
)})
    },
    {
      name: "railroad_completed",
      inputs: ["mile"],
      value: (function(mile){return(
`
<div style="color: #ffa10a;
    font-size: 16px;font-style: strong;
    line-height: 1;"">Number of Railroad Completed</div>
<div style="font-family: Verlag-bold;
    color: #63bf87;
    font-size: 40px;line-height: 0.9;">${Math.floor(mile / 1912)}
</div>
`
)})
    },
    {
      name: "current_mileage",
      inputs: ["mile"],
      value: (function(mile){return(
`
<div style="width:160px; margin-top: -50px; margin-left: auto;padding-right:10px">
<div style="color: #ffa10a;
    font-size: 16px;font-style: strong;
    line-height: 1;;text-align:right;">Current Week Mileage</div>
<div style="font-family: Verlag-bold;
    color: #63bf87;
    font-size: 40px;
    line-height: 0.9;text-align:right;">${mile}</div>
</div>
`
)})
    },
    {
      name: "title",
      value: (function(){return(
`
<div style="font-family: Verlag-bold; color: #ffa10a; font-size: 30px;">Spike 150 Virtual Relay</div>
`
)})
    },
    {
      name: "current_week",
      value: (function(){return(
1
)})
    },
    {
      name: "mileage",
      inputs: ["title","current_week","current_mileage","build","mile","railroad_completed","team_miles"],
      value: (function(title,current_week,current_mileage,build,mile,railroad_completed,team_miles)
{
  return `
<div style="background: #FFF7ED; padding:20px; width:100%">
<div style="margin: 10px">
${title}
<div style="font-family: Verlag-bold; color: #63bf87; font-size: 28px;">Week ${current_week}</div>
</div>
${current_mileage}
<style>
 #railroad{
  height: 150px;
  margin-top: -30px;
}
</style>
<div id="railroad" >
${build(mile)}
</div>
${railroad_completed}
<div>
${team_miles("01")}
</div>
<div style="padding-top:15px;font-style:strong;">
<a href="/spike-relay/">Weekly Leaderboard Coming Soon!</a>
</div>
</div>

`
}
)
    },
    {
      name: "mile",
      inputs: ["total_miles"],
      value: (function(total_miles)
{
  /*let i = 0;
  const limit = total_miles('01') / 10;
  while (i < limit) {
    await Promises.delay(1);
    yield 10 * (++i);
  }
  yield total_miles('01');
  */
  return total_miles('01');
}
)
    },
    {
      name: "mile_data",
      inputs: ["total_miles"],
      value: (function(total_miles){return(
{ mile: total_miles("01") }
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
  let teams = week[week_id].teams.sort((x, y) => (x.mile < y.mile) ? 1 : -1 )
  const base = 'https://www.mocaspike150.org/spike-relay/club/club.html'
  for(let team of teams) {
    output += `
<a href="${base}#${team.id}">
<img style="border-radius: 32px; width: 32px; height: 32px; margin: 5px"  src="${avatar[team.id].src}"/>
</a>${team.mile} miles
`
  }
  output += `</div>`
  return output
}
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
    },
    {
      inputs: ["club_miles"],
      value: (function(club_miles){return(
club_miles
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
      name: "build",
      inputs: ["DOM","d3","track","spike_svg","spike_positions"],
      value: (function(DOM,d3,track,spike_svg,spike_positions){return(
(mile) => {
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
      name: "club_miles",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/club/miles.json')
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
      inputs: ["leaderboard","week","club_miles"],
      value: (function(leaderboard,week,club_miles)
{
  if(leaderboard) {
   for(let team of week['01'].teams) {
     team.mile = parseInt(club_miles[team.id].miles)
    }
  }
  return week
}
)
    }
  ]
};

const notebook = {
  id: "3f4fa13115bab893@177",
  modules: [m0]
};

export default notebook;
