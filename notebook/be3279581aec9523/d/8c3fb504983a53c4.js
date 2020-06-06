// https://observablehq.com/d/8c3fb504983a53c4@75
import define1 from "../d/a92aa6de59a58af7.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# club
The library to provide club profile and avatar data

Usage

<pre>import {club} from "8c3fb504983a53c4"</pre>
`
)});
  main.variable(observer()).define(["html","club"], function(html,club){return(
html`${club.logo_html(327007)}`
)});
  main.variable(observer()).define(["html","club"], function(html,club){return(
html`${club.list_html(229749)}`
)});
  main.variable(observer()).define(["html","club"], function(html,club){return(
html`${club.detail_html(513442)}`
)});
  main.variable(observer()).define(["html","club_message"], function(html,club_message){return(
html`${club_message(513442)}`
)});
  main.variable(observer("profile")).define("profile", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/profile.json')
)});
  main.variable(observer("avatar")).define("avatar", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/avatar.json')
)});
  main.variable(observer("members")).define("members", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/members.json')
)});
  main.variable(observer("relay_week")).define("relay_week", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/relay/week.json')
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
  const base = 'https://spike150.mocanyc.org/spike-relay/club/club.html'
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
  const base = 'https://spike150.mocanyc.org/spike-relay/club/club.html'
  const title = `${profile[id].en ? profile[id].en : ''}  ${profile[id].cn ? `| ${profile[id].cn} `: '' }`
  return `
<a href="${base}#${id}"
title="${title}">
<img src="${avatar[id].src}" style="width: 64px; heigh:64px; border-radius: 64px;"
alt="${title}"
/>
</a>
`  
}
)});
  main.variable(observer("detail_html")).define("detail_html", ["profile","avatar","members","location_html","relay_weeks","paypal","club_message"], function(profile,avatar,members,location_html,relay_weeks,paypal,club_message){return(
(id) => {
  let club = profile[id]
  const base = 'https://spike150.mocanyc.org/spike-relay/club/index.html'
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
庆祝美国横贯大陆铁路建成通车150周年，并彰显华人在美国历史上的重大贡献，我们${ profile[id].cn ? profile[id].cn: profile[id].en }支持美国华人博物馆（MOCA）保存华人在美国历史的使命，积极响应MOCA组织倡议的MOCA Spike 150:  Running Forward With Our Stories活动。${ profile[id].cn ? profile[id].cn: profile[id].en } 将于 ${oneline_relay_weeks(id)}参加<a href="http://spike150.mocanyc.org">MOCA Spike 150</a>线上接力，为MOCA募款，请支持我们的团队！
`
}
)});
  const child1 = runtime.module(define1);
  main.import("paypal", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  return main;
}
