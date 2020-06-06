// https://observablehq.com/d/1dfb0073eaa78c82@453
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html"], function(html){return(
html `
<div>
This page contains the final team leaderboards of 24 weeks of Spike Virtual Relay:
<ul>
<li>Top 10 by Total Distance: The accumulated club mileage of three relay phases.</li>
<li>Top 10 by Average Mileage: Total distance of a club divided by total runners of the club.</li>
<li>Top 10 by Total Funds Raised: Total fund raised to date by the club.</li>
</ul>
* While MOCA Spike 150  Relay score is finalized, our fund raising will continue until 11/30/2019. Thank you so much for supporting MOCA!
</div>


`
)});
  main.variable(observer("medal")).define("medal", function(){return(
['🥇', '🥈', '🥉']
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
  main.variable(observer("totaltable")).define("totaltable", ["toplimit","medal","logo"], function(toplimit,medal,logo){return(
(data) => {
  let output = `
  <table>
<thead>
<tr>
<th  style="width:20%;"></th>

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
${n} ${medal[n-1] ? medal[n-1]: ' '}
</td>
<td>
<a href="https://www.mocaspike150.org/spike-relay/club/club.html#${row.id}">
${logo(row.id)}
</a>
<br/>
${row.start? row.start.substring(5) : ''}
</td>


<td style="text-align:center;">
<a href="https://www.mocaspike150.org/spike-relay/club/club.html#${row.id}">${row.mile.toLocaleString()}</a> 
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
  main.variable(observer("avgtable")).define("avgtable", ["toplimit","medal","logo"], function(toplimit,medal,logo){return(
(data) => {
  let output = `
  <table>
<thead>
<tr>
<th  style="width:20%;">
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
${n} ${medal[n-1] ? medal[n-1]: ' '}
</td>
<td>
<a href="https://www.mocaspike150.org/spike-relay/club/club.html#${row.id}">
${logo(row.id)}
</a>
<br/>
${row.start? row.start.substring(5) : ''}
</td>

<td  style="text-align:center;">
<a href="https://www.mocaspike150.org/spike-relay/club/club.html#${row.id}">${parseFloat(row.mile / row.runners).toFixed(2)}</a> 
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
   return `<a href="https://www.mocaspike150.org/spike-relay/club/club.html#${id}"><img style="width: 64px; heigh:64px;border-radius: 64px;" src="${avatar[id].src}"/></a>`
  }
  else {
    return '<a href="https://flyingfoxcsc.org/"><img style="width: 64px; heigh:64px;border-radius: 64px;" src="https://cdn.crowdrise.com/v2/photo/file/member/5337023"/></a>'
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
  main.variable(observer("club_data")).define("club_data", ["d3"], function(d3){return(
d3.json('https://raw.githubusercontent.com/mocaspike150/donation/master/data/clubs.json')
)});
  main.variable(observer("strava")).define("strava", ["profile"], function(profile)
{
  let output = {}
  for (const id in profile) {
    output[profile[id].crowdrise_id] = id
  }
  return output
}
);
  main.variable(observer("sort_by_donation")).define("sort_by_donation", ["club_data","strava","profile"], function(club_data,strava,profile)
{
  let output = []
  for(const id in club_data) {
    if(strava[id]) {
      output.push({ id: strava[id], amount: club_data[id].amount, crowdrise: profile[strava[id]].crowdrise})
    }
  }
  output.push({id: '0', amount: club_data['5337023'].amount, crowdrise: 'https://www.crowdrise.com/o/en/campaign/moca-spike-150-ambassadors/Flyingfox' })
  return output.sort((x, y) => (x.amount < y.amount ? 1 : -1))
}
);
  main.variable(observer("table")).define("table", ["sort_by_donation","medal","logo"], function(sort_by_donation,medal,logo){return(
(limit) => {
  let output =`
<style>
  a.button {
  border: 1px solid #ffa10a;
  background-color: white;
  color: #ffa10a;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 3px;
}

.donate {
  border-color: #ffa10a;
  color: #ffa10a
}

.donate:hover {
  background: #ffa10a;
  color: white;
  text-decoration:none;
}

</style>

<table>
  <thead>
<tr>
<th  style="width:20%;"></th>

<th style="width:20%;">
Club
</th>
<th style="width:45%;text-align:center;">
Raised 
</th>
<th style="text-align:center;">

</th>

</tr>
</thead>
`
  let count = 1
  for(const club of sort_by_donation) {
    if (count < limit+1) {
    output += `
<tr>
<td>
${count}
${medal[count-1] ? medal[count-1]: ' '}
</td>
<td>
${logo(club.id)}
</td>
<td style="text-align:center;">
<a href="${club.crowdrise}">\$${club.amount.toLocaleString()}</a>
</td>
<td style="text-align:center;">
<a href="${club.crowdrise}" class="button donate">Donate</a>
</td>
</tr>
`
    count++
    }
  }
  output += `</table>`
  return output
}
)});
  main.variable(observer()).define(["table","toplimit","html"], function(table,toplimit,html)
{
  let output = `
<h4>Current Top 10 by Total Funds Raised (Ongoing Until 12/01/2019) </h4>
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
