// https://observablehq.com/d/5375e854035bc764@743
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("bars")).define("bars", ["progress_bar","a"], function(progress_bar,a)
{
  return `
<div class="subtitle">
Total Raised* <span class=subtitle3>(<a href="https://www.crowdrise.com/o/en/campaign/moca-spike-150">Donate</a>)</span>
</div> 

<div>
${progress_bar('amount', a.amount, '#ffa10a', '$', ' ')}
</div>

<div class="subtitle" >
Total <a href="/spike-relay/rules/">Relay</a> Mileage</span>
</div>
<div>
${progress_bar('miles', a.miles, '#63bf87', '', ' ')}
</div>
`
}
);
  main.variable(observer("progress_bar")).define("progress_bar", function(){return(
(id, amount, color, prefix, suffix) =>  {
  const max = 300000
  const percent = parseInt((amount/max) * 100)
  return`
<style>
#${id} {
    background: #eee;
    border-radius: 13px;
    height: 20px;
    width: 95%;
    padding: 3px;
    margin-top: 10px;
}
@media only screen and (max-width: 991px) {
    #${id} {
    width: 295px;
  }
}

#${id}:after {
    content: '';
    display: block;
    background: ${color};
    width: ${percent}%;
    height: 100%;
    border-radius: 9px;
}

.subtitle {
    font-size: 18px;
    font-family: Verlag-bold;
    line-height: 1;
    padding-top:10px
}
 .subtitle_amount {
    font-family: Verlag-bold;
    color: #ffa10a;
    font-size: 32px;
}
 .subtitle_miles {
    font-family: Verlag-bold;
    color: #63bf87;
    font-size: 32px;
    padding-left:12px;
}
 .subtitle_numbers  {
    font-family: Verlag-bold;
    color: #63bf87;
    font-size: 32px;
} 

.subtitle_num2
{
    font-family: Verlag-bold;
    color: #63bf87;
    font-size: 32px;
    padding-left:12px;
}
 .footnote_link {
    font-size: 15px;
     font-family: Verlag-bold;
}
 .footnote {
    font-size: 14px;
    font-style: italic;

}
</style>
<div id="${id}"></div>
<span class="subtitle_${id}">${prefix}${amount.toLocaleString()}${suffix}</span>
`
}
)});
  main.variable(observer("a")).define("a", ["total_mileage","total_donation","Promises","track_length"], async function*(total_mileage,total_donation,Promises,track_length)
{
  const miles = parseInt(total_mileage) ;
  const amount = total_donation.amount;
  for(let i = 0; i < 100; i++) {
    await Promises.delay(0.5);
    yield {
      miles: Math.floor(i * miles / 100),
      track_miles: (miles % track_length) * (i / 100),
      amount: Math.floor(i * amount / 100)
    }
  }
  yield { 
    miles: miles,
    track_miles: miles % track_length, 
    amount: amount 
  } ;
}
);
  main.variable(observer("total_mileage")).define("total_mileage", ["d3"], function(d3){return(
d3.text('https://raw.githubusercontent.com/mocaspike150/leaderboard/master/data/current_miles.txt')
)});
  main.variable(observer("total_donation")).define("total_donation", ["d3"], function(d3){return(
d3.json('https://raw.githubusercontent.com/mocaspike150/donation/master/data/total.json')
)});
  main.variable(observer("title")).define("title", function(){return(
'<div style="font-family: Verlag-bold; color: #ffa10a; font-size: 30px;">Spike 150 Virtual Relay</div>'
)});
  main.variable(observer()).define(["html","title","bars","build","a","railroad_completed","all_club_leaderboard","leaderboard_link","footnote"], function(html,title,bars,build,a,railroad_completed,all_club_leaderboard,leaderboard_link,footnote){return(
html`
<div class="container">
${title}
${bars}
<div id="railroad" >
${build(a.track_miles)}
</div>
${railroad_completed}
${all_club_leaderboard()}
${leaderboard_link}
${footnote}
</div>
`
)});
  main.variable(observer("week_array")).define("week_array", ["week"], function(week)
{
  const by_start = (x, y) => {
    return (x.start > y.start) ? 1 : -1
  }
  let output = []
  for( const id in week) {
    let w = week[id]
    w.id = id
    output.push(w)
  }
  return output.sort(by_start)
}
);
  main.variable(observer("week_id_array")).define("week_id_array", ["week_array"], function(week_array)
{
  return week_array.map((d) => (d.id))
}
);
  main.variable(observer("weekly")).define("weekly", ["d3","DOM","relay_week","club"], function(d3,DOM,relay_week,club){return(
() => {
  const container =  d3.select(DOM.element('div'))
  container.style('margin', 'auto')
  container.style('width', '90%')
 
  const id = 1;
  const week = '01';
    
        container.append('h6')
          .html(`
Week ${parseInt(week)} : 
${
                relay_week[week]["start"]
                .replace('2019-', '')
                .replace('-', '/')
                }
to 
${
                relay_week[week]["end"]
                .replace('2019-', '')
                .replace('-', '/')
                }
`)
          .attr('id', `week${week}`)
       
        container.append('div')
        .style('padding', '10px')
        .style('margin-top', '5px')
        .style('margin-bottom', '5px')
          .selectAll('div')
          .data(relay_week[week]["teams"])
          .enter()
          .append('div')
          .style('margin', '10px')
          .style('display', 'inline-block')
          .html((d) => { 
            return club.logo_html(d.id)
          })

  
 
  
  return container.node()
}
)});
  main.variable(observer("profile")).define("profile", ["d3"], function(d3){return(
d3.json('/api/club/profile.json')
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
d3.json('/api/club/avatar.json')
)});
  main.variable(observer("members")).define("members", ["d3"], function(d3){return(
d3.json('https://raw.githubusercontent.com/mocaspike150/api/master/club/members.json')
)});
  main.variable(observer("relay_week")).define("relay_week", ["d3"], function(d3){return(
d3.json('/api/relay/week.json')
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
  const base = '/spike-relay/club/club.html'
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
  const base = '/spike-relay/club/club.html'
  let title = 'N/A'
  if( profile[id]) {
     title = `${profile[id].en ? profile[id].en : ''}  ${profile[id].cn ? `| ${profile[id].cn} `: '' }`
  }
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
  main.variable(observer("club_message")).define("club_message", ["profile","oneline_relay_weeks"], function(profile,oneline_relay_weeks){return(
(id) => {
  return `
庆祝美国横贯大陆铁路建成通车150周年，并彰显华人在美国历史上的重大贡献，我们${ profile[id].cn ? profile[id].cn: profile[id].en }支持美国华人博物馆（MOCA）保存华人在美国历史的使命，积极响应MOCA组织倡议的MOCA Spike 150:  Running Forward With Our Stories活动。${ profile[id].cn ? profile[id].cn: profile[id].en } 将于 ${oneline_relay_weeks(id)}参加<a href="http://www.mocaspike150.org">MOCA Spike 150</a>线上接力，为MOCA募款，请支持我们的团队！
`
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer("club_miles")).define("club_miles", ["leaderboard"], function(leaderboard){return(
(id) => {
  if ( leaderboard[id]) {
  const km = leaderboard[id].map((d) => (parseFloat(d[2])? parseFloat(d[2]) : 0 ))
  let total = 0
  if(km.length > 0) {
     total = parseInt(km.reduce((x, y) => (x + y)) * 0.621371) 
  }
  return total ? total: 0
  }
  else {
    return 'N/A'
  }
}
)});
  main.variable(observer("week")).define("week", ["d3"], function(d3){return(
d3.json('/api/relay/week.json')
)});
  main.variable(observer("all_teams")).define("all_teams", ["week"], function(week)
{
  let teams = {}
  for(const id in week) {
    for(const team of week[id].teams) {
       teams[team.id] = {id: team.id, name: team.name}
    }
  }
  let output = []
  for(const id in teams) {
    output.push(teams[id])
  }
  return output
}
);
  main.variable(observer("team_miles")).define("team_miles", ["week","club_miles","avatar","leaderboard","club"], function(week,club_miles,avatar,leaderboard,club){return(
(week_id) => {
  let output = `
<table>
  <tr>
    <th width="10%">Rank</th>
    <th width="20%">Club</th>
    <th width="40%">Distance</th>
    <th >Runners / Club Size</th>
  </tr>
`
let teams = week[week_id].teams.sort((x, y) => (club_miles(x.id)  <= club_miles(y.id)) ? 1 : -1 )
 const base = '/spike-relay/club/club.html'
  let rank = 1
  for(let team of teams) {
    output += `
    <tr>
      <td>${rank}</td>
      <td><a href="${base}#${team.id}"><img style="border-radius: 32px; width: 32px; height: 32px; margin: 5px; "  src="${avatar[team.id].src}"/></a>
      </td>
      <td>${club_miles(team.id)} miles</td>
      </td>
      <td>${leaderboard[team.id].length} / ${club.members[team.id]}</td>
    </tr>
`
     rank++
  }
  output += `</table>`
  return output
}
)});
  main.variable(observer("club_leaderboard")).define("club_leaderboard", ["team_miles"], function(team_miles){return(
(week_id) => {
  return `
  <h6>Week 25 Mileage by Clubs</h6>
  <div>
  ${team_miles(week_id)}
  </div>
  `
}
)});
  main.variable(observer("all_club_leaderboard")).define("all_club_leaderboard", ["all_team_miles"], function(all_team_miles){return(
() => {
  return `
  <h6>Week 25 Mileage by Clubs</h6>
  <div>
  ${all_team_miles()}
  </div>
  `
}
)});
  main.variable(observer("uniq")).define("uniq", function(){return(
(input) => {
  let previous = input[0]
  let output = [previous]
  for (const i of input) {
    if (i.name != previous.name || i.mile != previous.mile  ) {
      previous = i
      output.push(i)
    }
  }
  return output
}
)});
  main.variable(observer("by_mile_and_name")).define("by_mile_and_name", function(){return(
function (a, b) {  
  if(b.mile < a.mile) {
    return -1
  }
  if(b.mile > a.mile ) {
    return 1
  }
  return b.name <= a.name ? 1 : -1
}
)});
  main.variable(observer("weekrank")).define("weekrank", ["uniq","weekdata","by_mile_and_name"], function(uniq,weekdata,by_mile_and_name){return(
uniq(weekdata.sort(by_mile_and_name))
)});
  main.variable(observer()).define(["weekdata"], function(weekdata){return(
weekdata
)});
  main.variable(observer()).define(["weekdata","by_mile_and_name"], function(weekdata,by_mile_and_name){return(
weekdata.sort(by_mile_and_name)
)});
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
        mile : mile,
        count : c[3]
      }
      output.push(entry)
      }
    }
  }
  return output
  
}
);
  main.variable(observer()).define(["leaderboard"], function(leaderboard){return(
Object.keys(leaderboard)
)});
  main.variable(observer("leaderboard")).define("leaderboard", ["all_leaderboard"], function(all_leaderboard)
{
  let output = {}
  for(const id in all_leaderboard) {
     if (id != '513442') { output[id] = all_leaderboard[id] } // remove 513442
  }
  return output
}
);
  main.variable(observer("all_leaderboard")).define("all_leaderboard", ["d3"], function(d3){return(
d3.json(`https://raw.githubusercontent.com/mocaspike150/leaderboard/master/data/leaderboard.json`)
)});
  main.variable(observer("update_time")).define("update_time", ["d3"], function(d3){return(
d3.text('https://raw.githubusercontent.com/mocaspike150/leaderboard/master/data/update_time.txt')
)});
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
  main.variable(observer("all_team_miles")).define("all_team_miles", ["all_teams","club_miles","avatar"], function(all_teams,club_miles,avatar){return(
() => {
  let output = `
<div>
`
let teams = all_teams.sort((x, y) => (club_miles(x.id)  <= club_miles(y.id)) ? 1 : -1 )

  const base = '/spike-relay/club/club.html'
  let rank = 1
  for(let team of teams) {
    output += `
<span style="display:inline-block;width:88px;white-space:nowrap;">
<a href="${base}#${team.id}"><img style="border-radius: 32px; width: 32px; height: 32px; margin: 5px; "  src="${avatar[team.id].src}"/></a> &nbsp; ${club_miles(team.id)} </span>
`
     rank++
  }
  output += `</div>`
  return output
}
)});
  main.variable(observer("track_length")).define("track_length", function(){return(
1776
)});
  main.variable(observer("railroad_completed")).define("railroad_completed", ["a","track_length"], function(a,track_length){return(
`
<div class="subtitle" style="margin-top:15px">Number of Railroads Completed *</div>
<div class="subtitle_num2">
${parseInt(a.miles / track_length)}
</div>
`
)});
  main.variable(observer("leaderboard_link")).define("leaderboard_link", function(){return(
`<div class="footnote_link" style="padding-top:15px;">
<a href="/spike-relay/final/" style="color: red;">Final Result Scorecard</a> | <a href="/spike-relay/scorecard/list">Past Scorecards</a>
|
<a href="/fundraised-list/?max_row=1000">Fundraiser List</a>
</div>
`
)});
  main.variable(observer("footnote")).define("footnote", function(){return(
`
<div class='footnote' style="margin-top:15px;">* The total amount is being raised by MOCA Spike 150 <a href="/spike-150-ambassadors/">ambassadors</a> and <a href="/spike-150-clubs/">relay teams</a>, thank you!</div>
<div class='footnote'>* Length of First Transcontinental Railroad: 1,776 miles (<a href="/posts/2019-05-17-15-Facts">more facts</a>)</div>
`
)});
  main.variable(observer("build")).define("build", ["track_length","DOM","d3","track","spike_svg","spike_positions"], function(track_length,DOM,d3,track,spike_svg,spike_positions){return(
(mile) => {
  const t = Math.floor(mile * 42 / track_length) % 42
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
)});
  main.variable(observer("spike_svg")).define("spike_svg", ["d3"], function(d3){return(
d3.json('/api/spike.json')
)});
  main.variable(observer("track")).define("track", ["d3"], function(d3){return(
d3.json('/json/track.json')
)});
  main.variable(observer("spike_positions")).define("spike_positions", function(){return(
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
)});
  return main;
}
