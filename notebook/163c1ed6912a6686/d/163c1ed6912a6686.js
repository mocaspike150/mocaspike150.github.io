// https://observablehq.com/d/163c1ed6912a6686@572
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("style")).define("style", function(){return(
`
<style>
  .title1 {
    font-family: Verlag-bold; 
    font-size: 25px;
    color: #ffa10a;
  }
 td,th {
  text-align: center;
}
 .footnote {
    font-size: 14px;
    font-style: italic;
}
</style>
`
)});
  main.variable(observer()).define(["html","style"], function(html,style){return(
html`${style}`
)});
  main.variable(observer("overall")).define("overall", ["weekid","relay_week","total_club_num","total_club_members","total_club_miles"], function(weekid,relay_week,total_club_num,total_club_members,total_club_miles){return(
`
<h4>Week ${parseInt(weekid)}: ${relay_week[weekid].start.replace('2019-', '')
               .replace('-', '/')} to ${relay_week[weekid].end.replace('2019-', '')
               .replace('-', '/')}</h4>
<h6> Overall</h6>
<table>
<tr>
 <th style="text-align:center">Clubs</th>
 <th style="text-align:center">Runners</th>
 <th  style="text-align:center">Distance (Miles)</th>
 <th style="text-align:center" width="30%">Railroads Completed</th>


</tr>
<tr align=center>
 <td>${total_club_num(weekid)}</td>
 <td>${total_club_members(weekid)}</td>
 <td>${total_club_miles(weekid).toLocaleString()}</td>
 <td>${(total_club_miles(weekid)/1776).toFixed(1)}</td>
</tr>
</table>
`
)});
  main.variable(observer("id")).define("id", ["location"], function(location){return(
location.hash.replace('#', '')
)});
  main.variable(observer("weekid")).define("weekid", ["id"], function(id){return(
id ? id : "09"
)});
  main.variable(observer("total_club_num")).define("total_club_num", ["week"], function(week){return(
(id) => {
 return week[id].teams.length
}
)});
  main.variable(observer("total_club_members")).define("total_club_members", ["week"], function(week){return(
(id) => {
  let total = 0
  for (let team of week[id].teams){
    total += team.runners
  }
  return total
}
)});
  main.variable(observer("total_club_miles")).define("total_club_miles", ["week"], function(week){return(
(id) => {
  let total = 0
  for (let team of week[id].teams){
    total += team.mile
  }
  return total
}
)});
  main.variable(observer()).define(["html","overall"], function(html,overall){return(
html`${overall}`
)});
  main.variable(observer()).define(["html","club_leaderboard_by_distance"], function(html,club_leaderboard_by_distance){return(
html`${club_leaderboard_by_distance}`
)});
  main.variable(observer()).define(["html","club_leaderboard_by_average"], function(html,club_leaderboard_by_average){return(
html`${club_leaderboard_by_average}`
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
  main.variable(observer("club")).define("club", ["profile","avatar","members","logo_html","weeks"], function(profile,avatar,members,logo_html,weeks)
{ 
  let club = {}
  club.profile = profile
  club.avatar = avatar
  club.members = members
  club.logo_html = logo_html
  club.weeks = weeks
  return club
}
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer()).define(["week"], function(week){return(
week["01"].teams[0].runners
)});
  main.variable(observer("week")).define("week", ["d3"], function(d3){return(
d3.json('https://www.mocaspike150.org/api/relay/week.json')
)});
  main.variable(observer("by_distance")).define("by_distance", function(){return(
(x, y) => { return (x.mile  <= y.mile) ? 1 : -1}
)});
  main.variable(observer("by_runners")).define("by_runners", function(){return(
(x, y) => { return (x.runners  <= y.runners) ? 1 : -1}
)});
  main.variable(observer("by_average")).define("by_average", function(){return(
(x, y) => { return ((x.mile/x.runners)  <= (y.mile/y.runners)) ? 1 : -1}
)});
  main.variable(observer("by_donation")).define("by_donation", function(){return(
(x, y) => { return ((x.donation)  <= (y.donation)) ? 1 : -1}
)});
  main.variable(observer("club_leaderboard_by_distance")).define("club_leaderboard_by_distance", ["week","weekid","by_distance","avatar"], function(week,weekid,by_distance,avatar)
{
 let output =  `
 <h6>Total Mileage by Clubs</h6>
 <table>
  <tr>
    <th width="10%">Rank</th>
    <th>Club</th>
    <th>Distance (Miles)</th>
    <th>Club Size</th>
  </tr>
 `
  let teams = week[weekid].teams.sort(by_distance)
  const base = 'https://www.mocaspike150.org/spike-relay/club/club.html'
  let rank = 1
  for(let team of teams) {
    output += `
    <tr>
      <td>${rank}</td>
      <td><a href="${base}#${team.id}"><img style="border-radius: 32px; width: 32px; height: 32px; margin: 5px; "  src="${avatar[team.id].src}"/></a>
      </td>
      <td>${team.mile.toLocaleString()}</td>
      <td>${team.runners}</td>
    </tr>
`
     rank++
  }
  output += `</table>`
  return output
}
);
  main.variable(observer("club_leaderboard_by_average")).define("club_leaderboard_by_average", ["week","weekid","by_average","avatar"], function(week,weekid,by_average,avatar)
{
 let output =  `
 <h6>Average Mileage by Clubs</h6>
 <table>
  <tr>
    <th width="10%">Rank</th>
    <th>Club</th>
    <th>Average (Miles)</th>
    <th width="20%">Club Size</th>
  </tr>
 `
  let teams = week[weekid].teams.sort(by_average)
  const base = 'https://www.mocaspike150.org/spike-relay/club/club.html'
  let rank = 1
  for(let team of teams) {
    output += `
    <tr>
      <td>${rank}</td>
      <td><a href="${base}#${team.id}"><img style="border-radius: 32px; width: 32px; height: 32px; margin: 5px; "  src="${avatar[team.id].src}"/></a>
      </td>
      <td>${(team.mile/team.runners).toFixed(1)}</td>
      <td>${team.runners}</td>
    </tr>
`
     rank++
  }
  output += `</table>`
  return output
}
);
  main.variable(observer()).define(["html","top50_table"], function(html,top50_table){return(
html`${top50_table}`
)});
  main.variable(observer("top50_table")).define("top50_table", ["top50","medal","logo"], function(top50,medal,logo)
{
  let counter = 0
  let output = `<h6>Top 50 Runners</h6>
    <table>
        <tr>
    <th  width="10%">Rank</th>
    <th width="20%">Club</th>
    <th  width="40%">Name</th>
    <th>Distance</th>
  </tr>
  `
  
  for (let line of top50) {
    let mile = line.mile.toFixed(1)
    let id = `${line.name}|${mile}`
      output +=  `
      <tr>
        <td >${counter+1} ${medal[counter] ? medal[counter]: ' '} </td>
        <td>${logo(id)}</td>
        <td>${line.name}</td>
        <td>${mile} miles</td>
      </tr>
      `
    counter++
  }
  output += '</table>'
  return output
}
);
  main.variable(observer("medal")).define("medal", function(){return(
['🥇', '🥈', '🥉']
)});
  main.variable(observer("top50")).define("top50", ["d3","weekid"], function(d3,weekid){return(
d3.json(`https://raw.githubusercontent.com/mocaspike150/leaderboard/master/data/leaderboard/week${weekid}/top50.json`)
)});
  main.variable(observer("week_leaderboard")).define("week_leaderboard", ["d3","weekid"], function(d3,weekid){return(
d3.json(`https://raw.githubusercontent.com/mocaspike150/leaderboard/master/data/leaderboard/week${weekid}/leaderboard.json`)
)});
  main.variable(observer("leaderboard")).define("leaderboard", ["week","weekid","week_leaderboard"], function(week,weekid,week_leaderboard)
{
  let output = {}
  const club_ids = week[weekid].teams.map((d) => (d.id))
  for( let id of club_ids) {
     output[id] = week_leaderboard[id]
  }
  return output
}
);
  main.variable(observer("weekdata")).define("weekdata", ["leaderboard","club_name"], function(leaderboard,club_name)
{
  let output = []
  for (let id in leaderboard){
    let club = leaderboard[id]
    for (let c of club){
      const mile = parseFloat(c[2]) * 0.621371
      if(mile) {
      let entry = {
        club_id : id,
        club_name : (club_name(id) ? club_name(id): ''),
        name : c[1],
        mile : mile.toFixed(1)
      }
      output.push(entry)
      }
    }
  }
  return output
}
);
  main.variable(observer("club_runners")).define("club_runners", ["weekdata"], function(weekdata){return(
weekdata.map((d) => ({ key: `${d.name}|${d.mile}`, club: d.club_id}))
)});
  main.variable(observer("club_ids")).define("club_ids", ["club_runners"], function(club_runners)
{
  let output = {}
  for (const r of club_runners) {
    output[r.key] = []
  }

  for (const r of club_runners) {
    output[r.key].push(r.club)
  }
  return output
}
);
  main.variable(observer("logo")).define("logo", ["club_ids","club"], function(club_ids,club){return(
(id) => {
    let output = ''
    for(const club_id of club_ids[id]) {
      output += club.logo_html(club_id)
    }
    return output
}
)});
  main.variable(observer()).define(["html"], function(html){return(
html `<div class="footnote">Club Size: Strava Club Current Members</div>`
)});
  return main;
}
