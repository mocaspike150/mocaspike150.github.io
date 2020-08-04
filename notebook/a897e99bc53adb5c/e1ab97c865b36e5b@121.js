// https://observablehq.com/d/e1ab97c865b36e5b@121
import define1 from "./cff19b72da41813e@172.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Region List of Spike Virtual Relay Clubs

Usage:
<pre>
  import { region_list } from 'e1ab97c865b36e5b'
</pre>
<pre>
  region_list()
</pre>
`
)});
  main.variable(observer()).define(["region_list"], function(region_list){return(
region_list()
)});
  main.variable(observer("region_list")).define("region_list", ["club","html"], function(club,html){return(
(title) => {
  let list = '<div>'
  let regions = ['', '', '', '', '', ''];
  let region_names = ['US East', 'US Central', 'US South', 'US West', 'Canada', 'Around the World']
  for(let id in club.profile) {
    for(let i of [1, 2, 3, 4, 5, 6]){
      if(club.profile[id].region == i ) {
        regions[i-1] += club.list_html(id)
      }
     } 
  }
  
    for(let i of [1, 2, 3, 4, 5, 6]){
      list += `<h3 style="color: #FFA10A;">${region_names[i-1]}</h3>`
      list += regions[i-1]
    }
    list += '</div>'
    return html`
<div class="container">
<h1 class="hestia-title title-in-content">
${title}
</h1>
${list}
</div>
`
}
)});
  const child1 = runtime.module(define1);
  main.import("club", child1);
  return main;
}
