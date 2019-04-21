// URL: https://observablehq.com/d/79fda5d8b9c735eb
// Title: Untitled
// Author: Sam Liu (@ontouchstart)
// Version: 14
// Runtime version: 1

const m0 = {
  id: "79fda5d8b9c735eb@14",
  variables: [
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
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
      name: "topojson",
      inputs: ["require"],
      value: (function(require){return(
require("topojson-client@3")
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
      name: "projection",
      inputs: ["d3"],
      value: (function(d3){return(
d3.geoAlbersUsa().scale(1280).translate([480, 300])
)})
    },
    {
      name: "spike",
      value: (function(){return(
[-112.5475, 41.618611]
)})
    },
    {
      inputs: ["d3","DOM","topojson","us","projection","spike","data"],
      value: (function(d3,DOM,topojson,us,projection,spike,data)
{
  const width = 960;
  const height = 600;
  const path = d3.geoPath();
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
          .attr("transform", `translate(${projection(spike)})`)
  g.append("circle")
        .attr("fill", "orange")
        .attr("r", 5)
              
  for (const key of Object.keys(data)) {
    for (const d of data[key]) {
      let g = svg.append('g')
          .attr("transform", `translate(${projection(spike)})`);
     
      g.append("circle")
        .attr("fill", "orange")
        .attr("r", 5)
      
      g.transition()
        .delay(1000)
        .duration(2000)
        .attr("transform", `translate(${projection(d)})`);    
    }
  }
  
  return svg.node();
}
)
    }
  ]
};

const notebook = {
  id: "79fda5d8b9c735eb@14",
  modules: [m0]
};

export default notebook;
