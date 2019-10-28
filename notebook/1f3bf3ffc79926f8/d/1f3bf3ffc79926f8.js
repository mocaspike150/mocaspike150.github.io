// https://observablehq.com/d/1f3bf3ffc79926f8@28
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html"], function(html){return(
html`
<a href="/spike-relay/final/" style="color: red; font-size: 15px; font-family: Verlag-bold">Final Result Scorecard</a>
`
)});
  main.variable(observer()).define(["html","scorecards"], function(html,scorecards){return(
html`
${scorecards}
`
)});
  main.variable(observer("past_weeks")).define("past_weeks", function()
{
  let output = []
  const start = new Date('2019-05-13T04:00:00')
  const today = new Date()
  const weeks_since_start = Math.floor((today - start) / (3600 * 1000 * 24 * 7)) + 1
  for(let i = 1; i < weeks_since_start; i++) {
    output.push((i < 10) ? `0${i}` : `${i}`)
  }
  return output.reverse()
}
);
  main.variable(observer("scorecards")).define("scorecards", ["past_weeks","relay_week"], function(past_weeks,relay_week)
{
  let output = `` 
  for(const weekid of past_weeks ) {
    output += `<h4><a href="/spike-relay/scorecard/#${weekid}"> Week ${parseInt(weekid)}: ${relay_week[weekid].start.replace('2019-', '')
               .replace('-', '/')} to ${relay_week[weekid].end.replace('2019-', '')
               .replace('-', '/')} </a></h4>`
  }
  return output
}
);
  main.variable(observer()).define(["relay_week"], function(relay_week){return(
relay_week["01"]
)});
  main.variable(observer("relay_week")).define("relay_week", ["d3"], function(d3){return(
d3.json('https://www.mocaspike150.org/api/relay/week.json')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  return main;
}
