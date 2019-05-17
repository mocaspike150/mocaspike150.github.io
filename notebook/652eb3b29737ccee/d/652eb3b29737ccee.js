// https://observablehq.com/d/652eb3b29737ccee@207
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html"], function(html){return(
html`<div style="width:100%">
<div>
<div style="font-family: Verlag-bold; font-size: 25px;color: #ffa10a;">Week 1: 05/13 to 05/19</div>
</div>
`
)});
  main.variable(observer()).define(["html","club_leaderboard"], function(html,club_leaderboard){return(
html`${club_leaderboard}`
)});
  main.variable(observer("profile")).define("profile", ["d3"], function(d3){return(
d3.json('https://www.mocaspike150.org/api/club/profile.json')
)});
  main.variable(observer("phase")).define("phase", ["relay_week"], function(relay_week)
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
);
  main.variable(observer("avatar")).define("avatar", ["d3"], function(d3){return(
d3.json('https://www.mocaspike150.org/api/club/avatar.json')
)});
  main.variable(observer("members")).define("members", ["d3"], function(d3){return(
d3.json('https://www.mocaspike150.org/api/club/members.json')
)});
  main.variable(observer("relay_week")).define("relay_week", ["d3"], function(d3){return(
d3.json('https://www.mocaspike150.org/api/relay/week.json')
)});
  main.variable(observer("relay_weeks")).define("relay_weeks", ["weeks"], function(weeks){return(
(id) => {
  const by_week = (x, y) => {
    if(parseInt(x.week) > parseInt(y.week)) return 1;
    if(parseInt(x.week) < parseInt(y.week)) return -1;
    return 0
  }
  
  let week_list = '<div>Relay Weeks: <ul>'
  for( let week of weeks[id].sort(by_week)) {
    week_list += `<li>
Week ${parseInt(week.week)}
(${week.start.replace('2019-', '').replace('-', '/')} to ${week.end.replace('2019-', '').replace('-', '/')})
</li>`
  }
  week_list += '</ul></div>'
  return week_list
}
)});
  main.variable(observer("oneline_relay_weeks")).define("oneline_relay_weeks", ["weeks"], function(weeks){return(
(id) => {
  const by_week = (x, y) => {
    if(parseInt(x.week) > parseInt(y.week)) return 1;
    if(parseInt(x.week) < parseInt(y.week)) return -1;
    return 0
  }
  
  let week_list = ''
  for( let week of weeks[id].sort(by_week)) {
    week_list += `
Week ${parseInt(week.week)}
(${week.start.replace('2019-', '').replace('-', '/')} to ${week.end.replace('2019-', '').replace('-', '/')})
`
  }
  return week_list
}
)});
  main.variable(observer("weeks")).define("weeks", ["profile","relay_week"], function(profile,relay_week)
{
  let output = ''
  let club_weeks = {}
  for(let team in profile) {
    club_weeks[team] = []
  }
  
  for(let week in relay_week) {
    for(let team of relay_week[week].teams) {
      club_weeks[team.id].push({week: week, start: relay_week[week].start, end: relay_week[week].end})
    }
  }
  return club_weeks
}
);
  main.variable(observer("location_html")).define("location_html", ["profile"], function(profile){return(
(id) => {
  if (profile[id].loc) {
    let loc = '<ul>'
    for(let i in profile[id].loc) {
      loc += `<li>${profile[id].loc[i]}</li>`
    }
    loc += '</ul>'

    return `
<div>
Meetup locations: ${loc}
</div> 
` }
  else {
    return ''
  }
}
)});
  main.variable(observer("list_html")).define("list_html", ["avatar","profile","members","location_html","relay_weeks"], function(avatar,profile,members,location_html,relay_weeks){return(
(id) => {
  const base = 'https://www.mocaspike150.org/spike-relay/club/club.html'
  return `
<div style="margin-top: 1em; background: #FFF7ED; padding: 1em; border-radius: 5px;">
  <img src="${avatar[id].src}" style="width: 64px; heigh:64px; border-radius: 64px;"/>
  <h3>
    <a href="${base}#${id}">
      ${profile[id].en ? profile[id].en : '' } 
      ${profile[id].cn ? `| ${profile[id].cn} `: '' }
    </a>
  </h3>
  <div>
    Club size: ${profile[id].size} 
  </div>
  <div>
    Strava members: ${members[id]} 
  </div>
  <div>
    ${location_html(id)}
  </div>
${relay_weeks(id)}
</div>
`  
}
)});
  main.variable(observer("logo_html")).define("logo_html", ["profile","avatar"], function(profile,avatar){return(
(id) => {
  const base = 'https://www.mocaspike150.org/spike-relay/club/club.html'
  const title = `${profile[id].en ? profile[id].en : ''}  ${profile[id].cn ? `| ${profile[id].cn} `: '' }`
  return `
<a href="${base}#${id}"
title="${title}">
<img src="${avatar[id].src}" style="width: 32px; heigh:32px; border-radius: 32px;"
alt="${title}"
/>
</a>
`  
}
)});
  main.variable(observer("club_name")).define("club_name", ["club"], function(club){return(
(id) => {
  return club.profile[id].en
  
}
)});
  main.variable(observer("club")).define("club", ["profile","avatar","members","list_html","logo_html","weeks"], function(profile,avatar,members,list_html,logo_html,weeks)
{ 
  let club = {}
  club.profile = profile
  club.avatar = avatar
  club.members = members
  club.list_html = list_html
  club.logo_html = logo_html
  club.weeks = weeks
  return club
}
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer("club_miles")).define("club_miles", ["leaderboard"], function(leaderboard){return(
(id) => {
  const km = leaderboard[id].map((d) => (parseFloat(d[2])))
  let total = 0
  if(km.length > 0) {
     total = parseInt(km.reduce((x, y) => (x + y)) * 0.621371) 
  }
  return total
}
)});
  main.variable(observer("week")).define("week", ["d3"], function(d3){return(
d3.json('https://www.mocaspike150.org/api/relay/week.json')
)});
  main.variable(observer("team_miles")).define("team_miles", ["week","club_miles","leaderboard","avatar"], function(week,club_miles,leaderboard,avatar){return(
(week_id) => {
  let output = `
<table>
  <tr>
    <th>Club</th>
    <th>Distance</th>
    <th width="20%"># of Runners</th>
    <th width="20%">Avg by Runners</th>
  </tr>
`
  let teams = week[week_id].teams.sort((x, y) => (club_miles(x.id)  <= club_miles(y.id)) ? 1 : -1 )
  const base = 'https://www.mocaspike150.org/spike-relay/club/club.html'
  let rank = 1
  for(let team of teams) {
    let num_runners = leaderboard[team.id].length
    let ave_mile = parseFloat(club_miles(team.id)/leaderboard[team.id].length).toFixed(1)
    output += `
    <tr>
      <td><a href="${base}#${team.id}"><img style="border-radius: 32px; width: 32px; height: 32px; margin: 5px; "  src="${avatar[team.id].src}"/></a>
      </td>
      <td>${club_miles(team.id)} miles</td>
      </td>
      <td>${num_runners}</td>
      <td>${ave_mile}  miles</td>
    </tr>
`
     rank++
  }
  output += `</table>`
  return output
}
)});
  main.variable(observer("club_leaderboard")).define("club_leaderboard", ["team_miles"], function(team_miles){return(
`
<h6>Club Mileage by Top 100 Runners</h6>
<div>
${team_miles("01")}
</div>
`
)});
  main.variable(observer()).define(["html","top"], function(html,top){return(
html`${top(20)}`
)});
  main.variable(observer("top")).define("top", ["weekrank","club"], function(weekrank,club){return(
(limit) => {
  let counter = 0
  let output = `<h6>Top ${limit} Runners</h6>
  <div>
    <table>
        <tr>
    <th>Rank</th>
    <th>Club</th>
    <th>Name</th>
    <th>Distance</th>
  </tr>
  `
  
  for (let line of weekrank) {
    if (counter< limit){
      output +=  `
      <tr>
        <td>${counter+1} </td>
        <td>${club.logo_html(line.club_id)}</td>
        <td>${line.name}</td>
        <td>${line.mile.toFixed(1)} miles</td>
      </tr>
      `
    }
    counter++
  }
  output += '</table></div>'
  return output
}
)});
  main.variable(observer("weekrank")).define("weekrank", ["weekdata"], function(weekdata){return(
weekdata.sort((x,y) => ((x.mile <= y.mile) ? 1 : -1))
)});
  main.variable(observer("weekdata")).define("weekdata", ["leaderboard","club_name"], function(leaderboard,club_name)
{
  let output = []
  for (let id in leaderboard){
    let club = leaderboard[id]
    for (let c of club){
      let entry = {
        club_id : id,
        club_name : club_name(id),
        name : c[1],
        mile : parseFloat(c[2])*0.621371,
        count : c[3]
      }
      output.push(entry) 
    }
  }
  return output
  
}
);
  main.variable(observer("leaderboard")).define("leaderboard", ["d3"], function(d3){return(
d3.json("https://www.mocaspike150.org/api/leaderboard/week01/leaderboard.json")
)});
  return main;
}
