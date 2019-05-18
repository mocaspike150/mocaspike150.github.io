// https://observablehq.com/d/a9d47eda9c8eb67c@162
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html","club_leaderboard"], function(html,club_leaderboard){return(
html`${club_leaderboard}`
)});
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
  main.variable(observer("paypal")).define("paypal", function(){return(
`
<h6>Donate to MOCA via Paypal:</h6><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=AZGJLVBXNR67Y&amp;source=url">Please indicate the club name on the comment</a></h6>
`
)});
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
  main.variable(observer("detail_html")).define("detail_html", ["profile","avatar","members","location_html","relay_weeks","paypal","club_message"], function(profile,avatar,members,location_html,relay_weeks,paypal,club_message){return(
(id) => {
  let club = profile[id]
  const base = 'https://www.mocaspike150.org/spike-relay/club/index.html'
  return `
<div style="margin-top: 1em; background: #FFF7ED; padding: 2em; border-radius: 5px;">
<div style="text-align: right;"><a href="${base}">MOCA Spike 150 Relay Clubs</a></div>
<p>
<img src="${avatar[id].src}" style="width:128px;height:128px;border-radius:128px;"/>
<h1>
${club.en ? club.en: '' }
${club.cn ? club.cn: '' }
</h1>
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
<p>
${club.desc ? club.desc: ''}
</p>
<p>
${club['desc-cn'] ? club['desc-cn']: ''}
</p>
<h6>Strava:</h6>
<a href="https://www.strava.com/clubs/${id}">
https://www.strava.com/clubs/${id}
</a>

${club.url? '<h6>Website:</h6> <a href="' + club.url + '"/>' + club.url + '</a>': ''}

${club.crowdrise ? '<h6>Fundraising page:</h6> <a href="' + club.crowdrise + '"/>' + club.crowdrise + '</a>': ''}

${paypal}
<div style="padding-top:10px;">
${club_message(id)}
</div>
`
}
)});
  main.variable(observer("club_name")).define("club_name", ["club"], function(club){return(
(id) => {
  return club.profile[id].en
  
}
)});
  main.variable(observer("club")).define("club", ["profile","avatar","members","list_html","detail_html","logo_html","weeks"], function(profile,avatar,members,list_html,detail_html,logo_html,weeks)
{ 
  let club = {}
  club.profile = profile
  club.avatar = avatar
  club.members = members
  club.list_html = list_html
  club.detail_html = detail_html
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
  main.variable(observer("team_miles")).define("team_miles", ["week","club_miles","avatar","leaderboard"], function(week,club_miles,avatar,leaderboard){return(
(week_id) => {
  let output = `
<table>
  <tr>
    <th>Rank</th>
    <th>Club</th>
    <th>Distance</th>
    <th width="15%"># of Runners</th>
  </tr>
`
  let teams = week[week_id].teams.sort((x, y) => (club_miles(x.id)  <= club_miles(y.id)) ? 1 : -1 )
  const base = 'https://www.mocaspike150.org/spike-relay/club/club.html'
  let rank = 1
  for(let team of teams) {
    output += `
    <tr>
      <td>${rank}</td>
      <td><a href="${base}#${team.id}"><img style="border-radius: 32px; width: 32px; height: 32px; margin: 5px; "  src="${avatar[team.id].src}"/></a>
      </td>
      <td>${club_miles(team.id)} miles</td>
      </td>
      <td>${leaderboard[team.id].length}</td>
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
  main.variable(observer()).define(["html","top50"], function(html,top50){return(
html`${top50}`
)});
  main.variable(observer("top50")).define("top50", ["weekrank","club"], function(weekrank,club)
{
  let counter = 0
  let output = `<h6>Top 50 Runners</h6>
    <table>
        <tr>
    <th>Rank</th>
    <!--<th>Club</th>-->
    <th>Name</th>
    <th>Distance</th>
  </tr>
  `
  
  for (let line of weekrank) {
    if (counter<50){
      output +=  `
      <tr>
        <td>${counter+1} ${(counter < 3) ? '🏆' : ''}</td>
       <!-- <td>${club.logo_html(line.club_id)}</td>-->
        <td>${line.name}</td>
        <td>${line.mile.toFixed(1)} miles</td>
      </tr>
      `
    }
    counter++
  }
  output += '</table>'
  return output
}
);
  main.variable(observer("uniq")).define("uniq", function(){return(
(input) => {
  let previous = input[0]
  let output = [previous]
  for (const i of input) {
    if (i.name != previous.name && i.mile != previous.mile  ) {
      previous = i
      output.push(i)
    }
  }
  return output
}
)});
  main.variable(observer("weekrank")).define("weekrank", ["uniq","weekdata"], function(uniq,weekdata){return(
uniq(weekdata.sort((x,y) => ((x.mile <= y.mile) ? 1 : -1)))
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
