// https://observablehq.com/d/a33d4e196badca5a@419
import define1 from "../d/a39ec5429de765b5.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html","toplimit"], function(html,toplimit){return(
html `
<div>
This page contains the team leaderborads of the current standing of:
<ul>
<li>Top 10 by Total Distance: The accumulated club mileage of three relay phases.</li>
<li>Top 10 by Average Mileage: Total distance of a club divided by total runners of the club.</li>
<li>Top 10 by Total Funds Raised: Total fund raised to date by the club.</li>
</ul>
</div>

<div>
Please note the first two ranking <u>only includes the teams completed the third relay phase</u>. The leaderboards will be updated weekly and finalized in the end of week 24 (10/27/2019). <span style="font-weight:bold;color:red;">We will honor the top ${toplimit} fundraised teams to join the relay on week 25 to the finish line</span>. However all teams can still continue fundraising until 12/1/2019 to support MOCA. 
</div>
`
)});
  main.variable(observer("toplimit")).define("toplimit", function(){return(
10
)});
  main.variable(observer("totalcompleted")).define("totalcompleted", function(){return(
12
)});
  main.variable(observer()).define(["toplimit","totaltable","aggregate","team_miles_by_week","html"], function(toplimit,totaltable,aggregate,team_miles_by_week,html)
{
  let output = `
<h4>Top ${toplimit} by Total Distance</h4>
${totaltable(aggregate(team_miles_by_week.finished).sort((x, y) => (x.mile < y.mile ? 1 : -1 )))}

`
  return html`${output}`
}
);
  main.variable(observer()).define(["toplimit","avgtable","aggregate","team_miles_by_week","html"], function(toplimit,avgtable,aggregate,team_miles_by_week,html)
{
  let output = `
<h4>Top ${toplimit} by Average Weekly Mileage Per Runner </h4>
${avgtable(aggregate(team_miles_by_week.finished).sort((x, y) => (x.mpr < y.mpr ? 1 : -1 )))}
`
  return html`${output}`
}
);
  main.variable(observer("totaltable")).define("totaltable", ["toplimit","logo"], function(toplimit,logo){return(
(data) => {
  let output = `
  <table>
<thead>
<tr>
<th style="width:1em;">
</th>

<th style="width:20%;">
Club
</th>

<th style="text-align:center;">
Total Distance* (Miles) 
</th>

<th  style="text-align:center;">
Railroads Completed
</th>

</tr>
</thead>
<tbody>
`
  let n=1
  for(const row of data) {
     if (n <= toplimit){
    output += `
<tr>
<td>
${n}
</td>
<td>
<a href="https://spike150.mocanyc.org/spike-relay/club/club.html#${row.id}">
${logo(row.id)}
</a>
<br/>
${row.start? row.start.substring(5) : ''}
</td>


<td style="text-align:center;">
<a href="https://spike150.mocanyc.org/spike-relay/club/club.html#${row.id}">${row.mile.toLocaleString()}</a> 
</td>

<td style="text-align:center;">
${(row.mile/1776).toFixed(1)}
</td>

</tr>
`
    n++
    }
  }
  output += `
</tbody>
</table>
`
  return output
}
)});
  main.variable(observer("avgtable")).define("avgtable", ["toplimit","logo"], function(toplimit,logo){return(
(data) => {
  let output = `
  <table>
<thead>
<tr>
<th  style="width:1em;">
</th>

<th style="width:20%;">
Club
</th>
<th style="text-align:center;">
Average (Miles) 
</th>
<th style="text-align:center;">
Total Runners*
</th>

</tr>
</thead>
<tbody>
`
  let n=1
  for(const row of data) {
     if (n <= toplimit){
    output += `
<tr>
<td>
${n}
</td>
<td>
<a href="https://spike150.mocanyc.org/spike-relay/club/club.html#${row.id}">
${logo(row.id)}
</a>
<br/>
${row.start? row.start.substring(5) : ''}
</td>

<td  style="text-align:center;">
<a href="https://spike150.mocanyc.org/spike-relay/club/club.html#${row.id}">${parseFloat(row.mile / row.runners).toFixed(2)}</a> 
</td>
<td style="text-align:center;">
${row.runners}
</td>

</tr>
`
    n++
     }
  }
  output += `
</tbody>
</table>
`
  return output
}
)});
  main.variable(observer()).define(["aggregate","team_miles_by_week"], function(aggregate,team_miles_by_week){return(
aggregate(team_miles_by_week.finished)
)});
  main.variable(observer("aggregate")).define("aggregate", function(){return(
(data) => {
  let club_data = {}
  let output = []
  for(const row of data) {
    club_data[row.id] = { mile : 0,  name: row.name, runners: 0, weekmiles: [] }
  }
  for(const row of data) {
    club_data[row.id].mile += row.mile
    club_data[row.id].runners += row.runners
    club_data[row.id].weekmiles.push(row.mile)
  }
  for(const id in club_data) {
    output.push({
      id: id, 
      name: club_data[id].name, 
      mile: club_data[id].mile, 
      runners: club_data[id].runners,
      mpr: club_data[id].mile / club_data[id].runners,
      weekmiles: club_data[id].weekmiles
    })
  }
  return output
}
)});
  main.variable(observer("team_miles_by_week")).define("team_miles_by_week", ["teams_each_week","profile"], function(teams_each_week,profile)
{
  let finished = []
  let ongoing = []
  for(const teams of teams_each_week) {
    for(const team of teams) {
      if(team.mile) {
         team.mpr = parseFloat(team.mile / team.runners)
         team.start = teams.start
         if(profile[team.id].finished) {
           finished.push(team)
         }
         else {
           ongoing.push(team)
         }
      }
    }
  }
  return {finished: finished, ongoing: ongoing}
}
);
  main.variable(observer("teams_each_week")).define("teams_each_week", ["data"], function(data){return(
Object.values(data).map(d => { let teams =  d.teams; teams.start = d.start; return teams } )
)});
  main.variable(observer("logo")).define("logo", ["avatar"], function(avatar){return(
(id) => {
  if(avatar[id]) {
   return `<img style="border-radius: 64px;width:64px;" src="${avatar[id].src}"/>`
  }
  else {
    return ''
  }
}
)});
  main.variable(observer("avatar")).define("avatar", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/avatar.json')
)});
  main.variable(observer("profile")).define("profile", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/profile.json')
)});
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/relay/week.json')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  const child1 = runtime.module(define1);
  main.import("table", child1);
  main.variable(observer()).define(["toplimit","table","html"], function(toplimit,table,html)
{
  let output = `
<h4>Top ${toplimit} by Total Funds Raised </h4>
${table(toplimit)}

`
  return html`${output}`
}
);
  main.variable(observer()).define(["html"], function(html){return(
html `<div class=footnote style="padding:10px 0;">
<div><a href="https://spike150.mocanyc.org/fundraised-list/?max_row=1000">View full current fundraising standing</a></div>
<div>*Total Runners: The sum of numbers of a club's runners counted in each of the three phases. For example, if a club with 75 Strava members in phase one, 76 in phase tow and 78 in phase three, the total runners will be  229 (75+76+78).
</div>
`
)});
  return main;
}
