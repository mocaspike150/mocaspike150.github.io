// https://observablehq.com/@ontouchstart/untitled/4@60
import define1 from "./019e2a8ca05edb80@167.js";
import define2 from "./255396474bbcb25b@34.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const child1 = runtime.module(define1);
  main.import("club", child1);
  const child2 = runtime.module(define2);
  main.import("map", child2);
  main.variable(observer()).define(["map"], function(map){return(
map()
)});
  return main;
}
