// URL: https://observablehq.com/d/24bd080f0e312dba
// Title: MOCA Spike 150 Virtual Relay Club Line UP
// Author: Sam Liu (@ontouchstart)
// Version: 78
// Runtime version: 1

const m0 = {
  id: "24bd080f0e312dba@78",
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
d3.json('https://spike150.mocanyc.org/api/relay/week.json')
)})
    },
    {
      name: "club_profile",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/profile.json')
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
      name: "weeks",
      inputs: ["relay_week"],
      value: (function(relay_week){return(
Object.keys(relay_week).sort()
)})
    },
    {
      inputs: ["relay_week"],
      value: (function(relay_week){return(
relay_week["01"]
)})
    },
    {
      inputs: ["d3","DOM","weeks","relay_week","club_profile"],
      value: (function(d3,DOM,weeks,relay_week,club_profile)
{
  const container =  d3.select(DOM.element('div'))
  for (let id of weeks) { 
  container.append('h1').html(`Week ${id}`)
  container.append('div').html(`From ${relay_week[id]["start"]} to ${relay_week[id]["end"]}`)
  
  container.append('ol')
    .selectAll('li')
    .data(relay_week[id]["teams"])
    .enter()
    .append('li')
    .html((d) => (`
${club_profile[d].en} ${club_profile[d].cn}
<a href="https://www.strava.com/clubs/${d}" target="_">${d}</a> 
`))
  }
  
  return container.node()
}
)
    }
  ]
};

const notebook = {
  id: "24bd080f0e312dba@78",
  modules: [m0]
};

export default notebook;
