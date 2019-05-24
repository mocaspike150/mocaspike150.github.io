// https://observablehq.com/d/54cd823ccb00cce5@62
import define1 from "../d/8c3fb504983a53c4.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html","lineup"], function(html,lineup){return(
html`${lineup()}`
)});
  main.variable(observer("scorecard")).define("scorecard", function(){return(
(week) => {
  if (week === '01') {
  return `
<div><a href="/spike-relay/scorecard/#${week}">Scorecard</a></div>
`
  }
  else {
    return ''
  }
}
)});
  main.variable(observer("lineup")).define("lineup", ["phase","relay_week","scorecard","club"], function(phase,relay_week,scorecard,club){return(
() => {
  let container = `
<div style="margin: auto; width: 90%">
`
  for (let id in phase) {
    container += `
<h3 style="color: #ffa10a;">Phase ${id}</h3>
`
    for (let week of phase[id].sort()) {
        container += `
<h6 id="week${week}">
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
</h6>
`
        container += `
<div style="
background: #FFF7ED;
padding: 10px;
margin-top: 5px;
margin-bottom: 5px;
">${scorecard(week)}`
        for( const team of relay_week[week]["teams"] ) {
          container += `
<div style="margin: 10px; display: inline-block">
${club.logo_html(team.id)}
</div>
`     }
      container += `</div>`
    }
  }
  return container
}
)});
  main.variable(observer()).define(["relay_week"], function(relay_week){return(
relay_week['01']["teams"]
)});
  main.variable(observer("avatar")).define("avatar", ["club"], function(club){return(
club.avatar
)});
  main.variable(observer("profile")).define("profile", ["club"], function(club){return(
club.profile
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
  main.variable(observer("relay_week")).define("relay_week", ["d3"], function(d3){return(
d3.json('https://www.mocaspike150.org/api/relay/week.json')
)});
  const child1 = runtime.module(define1);
  main.import("club", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  return main;
}
