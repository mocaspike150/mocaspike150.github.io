// URL: https://observablehq.com/d/24bd080f0e312dba
// Title: Untitled
// Author: Sam Liu (@ontouchstart)
// Version: 25
// Runtime version: 1

const m0 = {
  id: "24bd080f0e312dba@25",
  variables: [
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
      inputs: ["d3","DOM","id","club_profile"],
      value: (function(d3,DOM,id,club_profile)
{
  const container =  d3.select(DOM.element('div'))
  container.append('h1').html('Club Profile')
  container.append('ol')
    .selectAll('li')
    .data(id)
    .enter()
    .append('li')
    .html((d) => (`
${club_profile[d].en} ${club_profile[d].cn}
<a href="https://www.strava.com/clubs/${d}" target="_">${d}</a> 
`))
  
  return container.node()
}
)
    },
    {
      name: "weeks",
      inputs: ["relay_week"],
      value: (function(relay_week){return(
Object.keys(relay_week)
)})
    },
    {
      inputs: ["relay_week"],
      value: (function(relay_week){return(
relay_week["01"]
)})
    },
    {
      name: "week_list",
      inputs: ["d3","DOM","relay_week","club_profile"],
      value: (function(d3,DOM,relay_week,club_profile){return(
(id) => {
  const container =  d3.select(DOM.element('div'))
  container.append('h1').html('Relay week 1')
  container.append('div').html(relay_week[id]["start"])
  container.append('div').html(relay_week[id]["end"])
  
  container.append('ol')
    .selectAll('li')
    .data(relay_week[id]["teams"])
    .enter()
    .append('li')
    .html((d) => (`
${club_profile[d].en} ${club_profile[d].cn}
<a href="https://www.strava.com/clubs/${d}" target="_">${d}</a> 
`))
  
  return container.node()
}
)})
    },
    {
      inputs: ["week_list"],
      value: (function(week_list){return(
week_list("01")
)})
    }
  ]
};

const notebook = {
  id: "24bd080f0e312dba@25",
  modules: [m0]
};

export default notebook;
