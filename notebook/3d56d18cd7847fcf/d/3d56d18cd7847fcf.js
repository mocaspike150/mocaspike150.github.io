// https://observablehq.com/d/3d56d18cd7847fcf@115
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("clubs")).define("clubs", ["id","profile","html","detail_html"], function(id,profile,html,detail_html)
{
  const base = 'https://spike150.mocanyc.org/spike-relay/club/index.html'
  if(id) {
    document.title = 'MOCA Spike 150 Relay Club: '
    document.title += profile[id].en ? profile[id].en : ''
    document.title += profile[id].cn ? `| ${profile[id].cn}` : ''
    return html`
${detail_html(id)}
`
  }
  else {
    return html``
  }
}
);
  main.variable(observer("id")).define("id", ["location"], function(location){return(
location.hash.replace('#', '') || '327007'
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer("mpr_ranking")).define("mpr_ranking", ["d3"], function(d3){return(
d3.csv('https://raw.githubusercontent.com/mocaspike150/leaderboard/master/data/club_mpr.csv')
)});
  main.variable(observer("donation")).define("donation", ["d3"], function(d3){return(
d3.json('https://raw.githubusercontent.com/mocaspike150/donation/master/data/clubs.json')
)});
  main.variable(observer("paypal")).define("paypal", function(){return(
`
<h6>Donate to MOCA via Paypal:</h6><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=AZGJLVBXNR67Y&amp;source=url">Please indicate the club name on the comment</a></h6>
`
)});
  main.variable(observer("footnote")).define("footnote", function(){return(
`
<div>
* Total Runners: The sum of numbers of a club's runners counted in each of the three phases. For example, if a club with 75 Strava members in phase one, 76 in phase tow and 78 in phase three, the total runners will be 229 (75+76+78).
</div>
`
)});
  main.variable(observer("profile")).define("profile", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/profile.json')
)});
  main.variable(observer("avatar")).define("avatar", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/avatar.json')
)});
  main.variable(observer("members")).define("members", ["d3"], function(d3){return(
d3.json('https://raw.githubusercontent.com/mocaspike150/api/master/club/members.json')
)});
  main.variable(observer("relay_week")).define("relay_week", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/relay/week.json')
)});
  main.variable(observer("mpr")).define("mpr", ["mpr_ranking"], function(mpr_ranking)
{
  let output = {}
  for(const row of mpr_ranking) {
    output[row.ID] = { total: parseInt(row['Total miles']), runners: parseInt(row['Total runners'])}
  }
  return output
}
);
  main.variable(observer("relay_weeks")).define("relay_weeks", ["weeks","mpr"], function(weeks,mpr){return(
(id) => {
  const by_week = (x, y) => {
    if(parseInt(x.week) > parseInt(y.week)) return 1;
    if(parseInt(x.week) < parseInt(y.week)) return -1;
    return 0
  }
  
  let week_list = '<div>Relay Weeks: <ul>'
  for( let week of weeks[id].sort(by_week)) {
    let relay_result =  week.runners ? `
<br/>(<a href="https://spike150.mocanyc.org/spike-relay/scorecard/#${week.week}">${week.mile.toLocaleString()} miles | ${week.runners} runners</a>)
` : ''
    week_list += `<li>
Week ${parseInt(week.week)}
(${week.start.replace('2019-', '').replace('-', '/')} to ${week.end.replace('2019-', '').replace('-', '/')})
${relay_result}
</li>`
  }
  week_list += '</ul>'
  week_list += `
<ul>
<li>Total Miles: ${mpr[id].total.toLocaleString()} miles</li>
<li>Total Runners *: ${mpr[id].runners}</li>
</ul>
</div>
`
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
      club_weeks[team.id].push({week: week, start: relay_week[week].start, end: relay_week[week].end, mile: team.mile, runners: (team.runners ? team.runners: 0)})
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
  main.variable(observer("list_html")).define("list_html", ["avatar","profile","members","location_html","donation_html","relay_weeks"], function(avatar,profile,members,location_html,donation_html,relay_weeks){return(
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
  <div>
    ${donation_html(id)}
  </div>
  ${relay_weeks(id)}
</div>
`  
}
)});
  main.variable(observer("donation_html")).define("donation_html", ["profile","donation"], function(profile,donation){return(
(id) => {
   if(! profile[id].crowdrise_id ) return ''
  if ( donation[profile[id].crowdrise_id].amount ) {
  return `Total Fund Raised: \$${donation[profile[id].crowdrise_id].amount.toLocaleString()}`
  }
  else {
    return ''
  }
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
  main.variable(observer("detail_html")).define("detail_html", ["profile","avatar","ambassador_img","members","location_html","relay_weeks","donation_html","paypal","club_message","footnote"], function(profile,avatar,ambassador_img,members,location_html,relay_weeks,donation_html,paypal,club_message,footnote){return(
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
<div style="margin-bottom: 10px;">
${ambassador_img}
</div>
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
${club.crowdrise ? '<h6>Fundraising page:</h6> <a href="' + club.crowdrise + '"/>' + '<img src="' + avatar[id].src + '" style="width: 64px; heigh:64px; border-radius: 64px;"></a>': ''}  ${donation_html(id)}

${paypal}
<div style="padding-top:10px;">
${club_message(id)}
</div>
<hr/>
${footnote}
`
}
)});
  main.variable(observer("club_message")).define("club_message", ["profile","oneline_relay_weeks"], function(profile,oneline_relay_weeks){return(
(id) => {
  return `
庆祝美国横贯大陆铁路建成通车150周年，并彰显华人在美国历史上的重大贡献，我们${ profile[id].cn ? profile[id].cn: profile[id].en }支持美国华人博物馆（MOCA）保存华人在美国历史的使命，积极响应MOCA组织倡议的MOCA Spike 150:  Running Forward With Our Stories活动。${ profile[id].cn ? profile[id].cn: profile[id].en } 将于 ${oneline_relay_weeks(id)}参加<a href="http://spike150.mocanyc.org">MOCA Spike 150</a>线上接力，为MOCA募款，请支持我们的团队！
`
}
)});
  main.variable(observer("ambassadors")).define("ambassadors", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/data/ambassadors.json')
)});
  main.variable(observer("ambassador_img_url")).define("ambassador_img_url", ["ambassadors"], function(ambassadors)
{
  let output = {}
  for(const ambassador of ambassadors) {
    output[ambassador.crowdrise_id] = `https://spike150.mocanyc.org/lab/ambassadors-slideshow${ambassador.id}/img.html`
  }
  return output
}
);
  main.variable(observer("ambassador_img")).define("ambassador_img", ["profile","id","ambassador_img_url","d3"], function(profile,id,ambassador_img_url,d3)
{
 if (!profile[id].crowdrise_id) { 
    return ''
 }
 else {
  return profile[id].crowdrise_id && ambassador_img_url[profile[id].crowdrise_id] ? d3.text(ambassador_img_url[profile[id].crowdrise_id]) : ''
  }
}
);
  return main;
}
