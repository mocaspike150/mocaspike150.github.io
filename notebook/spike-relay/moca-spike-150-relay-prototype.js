// URL: https://observablehq.com/@ontouchstart/moca-spike-150-relay-prototype
// Title: MOCA Spike 150 Relay Prototype
// Author: Sam Liu (@ontouchstart)
// Version: 70
// Runtime version: 1

const m0 = {
  id: "60f2deef113c007d@70",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# MOCA Spike 150 Relay Prototype`
)})
    },
    {
      inputs: ["build","track","mile"],
      value: (function(build,track,mile){return(
build(track, mile())
)})
    },
    {
      inputs: ["map","us","data"],
      value: (function(map,us,data){return(
map(us, data)
)})
    },
    {
      name: "map",
      inputs: ["d3","DOM","topojson","projection","spike_svg","avatar"],
      value: (function(d3,DOM,topojson,projection,spike_svg,avatar){return(
(us, data) => {
  const width = 960;
  const height = 600;
  const path = d3.geoPath();
  const spike_location = [-112.5475, 41.618611]
  const svg = d3.select(DOM.svg(width, height))
      .style("width", "100%")
      .style("height", "auto")
      .style("font-family", "Verlag-Light")
      .style("font-size", "16px")
      .attr("stroke-width", "1")
  
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
              
  for (const key of Object.keys(data)) {
    for (const d of data[key]) {
      let g = svg.append('g')
          .attr("transform", `translate(${projection(spike_location)})`)
          .attr("opacity", 0)
     
     g.append("image")
        .attr("width", 16)
        .attr("height", 16)
        .attr("xlink:href", avatar[key].src)
     
      g.transition()
        .delay(1000)
        .duration(2000)
        .attr("opacity", 1)
        .attr("transform", `translate(${projection(d)})`);    
    }
  }
  
  return svg.node();
}
)})
    },
    {
      name: "build",
      inputs: ["DOM","d3"],
      value: (function(DOM,d3){return(
(track, mile) => {
  let t = Math.floor(mile * 42 / 1912)
  const svg = DOM.svg(1280, 183)
  svg.style = "width: 100%;"
  const container = d3.select(svg)
  
  let g = container.selectAll('g').data(track).enter().append('g');
  g.attr('fill', 'none')
  g.append('path')
    .attr('d', (d, i) => { return d.path[0] })
    .attr('fill', (d, i) => { return (i < t) ? '#64C188' : '#ccc'})
  g.append('path')
    .attr('d', (d, i) => { return d.path[1] })
    .attr('fill', (d, i) => { return (i < t) ? '#64C188' : '#ccc'})
  g.append('polygon')
    .attr('points', (d, i) => { return d.points })
    .attr('fill', (d, i) => { return (i < t) ? '#64C188' : '#ccc'})
 
  return svg;
}
)})
    },
    {
      name: "mile",
      inputs: ["now","t0","mile_data"],
      value: (function(now,t0,mile_data){return(
() => {
  let dt = now - t0
  let T = 3000
  return parseInt(mile_data.mile * (dt < T ? (dt / T) : 1) )
}
)})
    },
    {
      name: "mile_data",
      value: (function(){return(
{ mile: 1200 }
)})
    },
    {
      name: "t0",
      value: (function(){return(
Date.now()
)})
    },
    {
      name: "spike_svg",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/spike.json')
)})
    },
    {
      name: "track",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/json/track.json')
)})
    },
    {
      name: "avatar",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/api/club/avatar.json')
)})
    },
    {
      name: "data",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json(`https://www.mocaspike150.org/api/map/club/geo.json`)
)})
    },
    {
      name: "us",
      inputs: ["d3"],
      value: (async function(d3)
{
  const us = await d3.json("https://www.mocaspike150.org/api/map/us.json");
  us.objects.lower48 = {
    type: "GeometryCollection",
    geometries: us.objects.states.geometries.filter(d => d.id !== "02" && d.id !== "15")
  };
  return us;
}
)
    },
    {
      name: "projection",
      inputs: ["d3"],
      value: (function(d3){return(
d3.geoAlbersUsa().scale(1280).translate([480, 300])
)})
    },
    {
      name: "topojson",
      inputs: ["require"],
      value: (function(require){return(
require("topojson-client@3")
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
)})
    }
  ]
};

const notebook = {
  id: "60f2deef113c007d@70",
  modules: [m0]
};

export default notebook;
