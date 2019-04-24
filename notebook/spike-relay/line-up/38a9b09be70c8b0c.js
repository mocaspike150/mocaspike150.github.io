// URL: https://observablehq.com/d/38a9b09be70c8b0c
// Title: MOCA Spike 150 Virtual Relay Club Line UP
// Author: Sam Liu (@ontouchstart)
// Version: 105
// Runtime version: 1

const m0 = {
  id: "38a9b09be70c8b0c@105",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# MOCA Spike 150 Virtual Relay Club Line UP`
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
      name: "id",
      inputs: ["club_profile"],
      value: (function(club_profile){return(
Object.keys(club_profile)
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
      inputs: ["d3","DOM","phase","relay_week","club_profile"],
      value: (function(d3,DOM,phase,relay_week,club_profile)
{
  const container =  d3.select(DOM.element('div'))
  for (let id in phase) { 
    container.append('h1').html(`Phase ${id}`)
    for (let week of phase[id].sort()) {
      container.append('h2').html(`Week ${parseInt(week)}`)
      container.append('ul')
        .selectAll('li')
        .data(relay_week[week]["teams"])
        .enter()
        .append('li')
        .html((d) => (`
${club_profile[d].en} ${club_profile[d].cn}
<a href="https://www.strava.com/clubs/${d}" target="_">${d}</a> 
`))
    }
  }
  
  return container.node()
}
)
    }
  ]
};

const notebook = {
  id: "38a9b09be70c8b0c@105",
  modules: [m0]
};

export default notebook;
