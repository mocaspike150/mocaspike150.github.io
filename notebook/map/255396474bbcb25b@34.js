// https://observablehq.com/d/255396474bbcb25b@34
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# map
Usage:
<pre>
import { map } from '255396474bbcb25b'
</pre>
<pre>
map()
</pre>
`
)});
  main.variable(observer("logo_size")).define("logo_size", function(){return(
16
)});
  main.variable(observer("logo_sizex2")).define("logo_sizex2", ["logo_size"], function(logo_size){return(
logo_size * 2
)});
  main.variable(observer()).define(["map"], function(map){return(
map()
)});
  main.variable(observer("map")).define("map", ["d3","DOM","logo_size","topojson","us","projection","spike_svg","geo","avatar","logo_sizex2"], function(d3,DOM,logo_size,topojson,us,projection,spike_svg,geo,avatar,logo_sizex2){return(
() => {
  const width = 960;
  const height = 600;
  const path = d3.geoPath();
  const spike_location = [-112.5475, 41.618611]
  const svg = d3.select(DOM.svg(width, height))
      .style("width", "100%")
      .style("height", "auto")
      .attr("stroke-width", "2");
  
  const clipPath = svg.append('clipPath')
    .attr('id', 'circle');
  
  clipPath.append('circle')
    .attr('cx', logo_size)
    .attr('cy', logo_size)
    .attr('r', logo_size);
  
  svg.append("path")
      .datum(topojson.merge(us, us.objects.lower48.geometries))
      .attr("fill", "#FFF7ED")
      .attr("stroke", "#6aa8ca")
      .attr("d", path);
  
  svg.append("path")
      .datum(topojson.mesh(us, us.objects.lower48, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "#6aa8ca")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  let g = svg.append('g')
          .attr("transform", `translate(${projection(spike_location)})`)
  
  let spike = g.append('g');
  spike.attr("transform", 'scale(0.2)').html(`${spike_svg.svg}`)
       .attr("opacity", 0);
  spike.transition()
       .delay(1000)
       .duration(2000)
       .attr("opacity", 1)
              
  for (const key of Object.keys(geo)) {
    for (const d of geo[key]) {
      const g = svg.append('g')
          .attr("style", "clip-path: url(#circle);")
          .attr("transform", `translate(${projection(spike_location)})`)
          .attr("opacity", 0)
  
      const link = g.append('a')

      link.attr("href", `/demo/club/club.html#${key}`)
        .attr("target", `club_${key}`)

      if(avatar[key].src) {
        link.append("image")
          .attr("width", logo_sizex2)
          .attr("height", logo_sizex2)
          .style('border-radius', `${logo_sizex2}px`)
          .attr("xlink:href", avatar[key].src)
      }
      
      g.transition()
        .delay(1000)
        .duration(2000)
        .attr("opacity", 1)
        .attr("transform", `translate(${projection(d)})`);    
    }
  }
  
  return svg.node();
}
)});
  main.variable(observer("spike_svg")).define("spike_svg", ["d3"], function(d3){return(
d3.json('/api/spike.json')
)});
  main.variable(observer("avatar")).define("avatar", ["d3"], function(d3){return(
d3.json('/api/club/avatar.json')
)});
  main.variable(observer("geo")).define("geo", ["d3"], function(d3){return(
d3.json(`/api/map/club/geo.json`)
)});
  main.variable(observer("us")).define("us", ["d3"], async function(d3)
{
  const us = await d3.json("/api/map/us.json");
  us.objects.lower48 = {
    type: "GeometryCollection",
    geometries: us.objects.states.geometries.filter(d => d.id !== "02" && d.id !== "15")
  };
  return us;
}
);
  main.variable(observer("projection")).define("projection", ["d3"], function(d3){return(
d3.geoAlbersUsa().scale(1280).translate([480, 300])
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  return main;
}
