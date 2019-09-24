// https://observablehq.com/d/235f37e630c0d208@102
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html","countdown"], function(html,countdown){return(
html`
<style>
#clock {
}

#clock span {
  min-width: 3em;
  font-size: 32px;
  font-family: monospace;
}
</style>
${countdown}`
)});
  main.variable(observer("countdown")).define("countdown", ["days","hours","minutes","seconds"], function(days,hours,minutes,seconds)
{
  return `<div id="clock"><span>${days}</span> DAYS <span>${hours > 9 ? hours : `0${hours}`}</span> HRS <span>${minutes > 9 ? minutes : `0${minutes}`}</span> MINS <span>${seconds > 9 ? seconds : `0${seconds}`}</span> SEC<br/> until the TCS New York City Marathon!</div>`
}
);
  main.variable(observer("NYCM")).define("NYCM", function(){return(
new Date('2019-11-03T08:30:00')
)});
  main.variable(observer("delta")).define("delta", ["Promises","NYCM","now"], async function*(Promises,NYCM,now)
{
  while( true ) {
   await Promises.delay(1);
    yield NYCM - now
  } 
}
);
  main.variable(observer("days")).define("days", ["delta"], function(delta){return(
Math.floor(delta / (1000 * 24 * 3600))
)});
  main.variable(observer("hours")).define("hours", ["delta","days"], function(delta,days){return(
Math.floor((delta / (1000 * 3600)) % (24 * days))
)});
  main.variable(observer("minutes")).define("minutes", ["delta","days","hours"], function(delta,days,hours){return(
Math.floor((delta / (1000 * 60)) % ((24 * days + hours) * 60))
)});
  main.variable(observer("seconds")).define("seconds", ["delta","days","hours","minutes"], function(delta,days,hours,minutes){return(
Math.floor((delta / (1000)) % ((24 * days + hours) * 3600 + minutes * 60))
)});
  return main;
}
