// URL: https://observablehq.com/@ontouchstart/moca-spike-150-virtual-relay-club-line-up
// Title: MOCA Spike 150 Virtual Relay Club Line Up
// Author: Sam Liu (@ontouchstart)
// Version: 99
// Runtime version: 1

const m0 = {
  id: "6a188faa4436cc94@99",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# MOCA Spike 150 Virtual Relay Club Line Up`
)})
    },
    {
      inputs: ["d3","DOM","phase","relay_week","avatar","club_profile"],
      value: (function(d3,DOM,phase,relay_week,avatar,club_profile)
{
  const container =  d3.select(DOM.element('div'))
  for (let id in phase) { 
    container.append('h1').html(`Phase ${id}`)
    for (let week of phase[id].sort()) {
      container.append('h2').html(`Week ${parseInt(week)}`)
      container.append('div').html(`From ${relay_week[week]["start"]} to ${relay_week[week]["end"]}`)
      container.append('ul')
        .selectAll('li')
        .data(relay_week[week]["teams"])
        .enter()
        .append('li')
        .style('list-style', 'none')
        .style('margin', '1em')
        .html((d) => { 
        return `
<img src="${avatar[d].src}"/>
${club_profile[d].en} ${club_profile[d].cn}
<a href="https://www.strava.com/clubs/${d}" target="_">${d}</a> 
`})
      
    }
  }
  
  return container.node()
}
)
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
)})
    },
    {
      name: "relay_week",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/relay/week.json')
)})
    },
    {
      name: "club_profile",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/club/profile.json')
)})
    },
    {
      name: "phase",
      inputs: ["relay_week"],
      value: (function(relay_week)
{
  let phase = {}
  for (let k in relay_week) {
    let week = relay_week[k].phase
    phase[week] = []
  }
  for (let k in relay_week) {
    let week = relay_week[k].phase
    phase[week].push(k)
  }
  return phase
}
)
    },
    {
      name: "avatar",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/club/avatar.json')
)})
    }
  ]
};

const notebook = {
  id: "6a188faa4436cc94@99",
  modules: [m0]
};

export default notebook;
