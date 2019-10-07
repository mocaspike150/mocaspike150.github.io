// https://observablehq.com/d/453514e86d4cc6df@48
import define1 from "../d/e1ab97c865b36e5b.js";
import define2 from "../d/255396474bbcb25b.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", function(){return(
'MOCA Spike 150 Relay Clubs'
)});
  const child1 = runtime.module(define1);
  main.import("region_list", child1);
  const child2 = runtime.module(define2);
  main.import("map", child2);
  main.variable(observer()).define(["map"], function(map){return(
map()
)});
  main.variable(observer()).define(["region_list"], function(region_list){return(
region_list('')
)});
  main.variable(observer()).define(["title"], function(title){return(
document.title = title
)});
  return main;
}
