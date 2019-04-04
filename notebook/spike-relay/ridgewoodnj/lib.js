// URL: https://observablehq.com/@ontouchstart/ridgewood-nj
// Title: Ridgewood NJ
// Author: Sam Liu (@ontouchstart)
// Version: 124
// Runtime version: 1

const m0 = {
  id: "07d58ed57f7998c7@124",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Ridgewood NJ`
)})
    },
    {
      name: "chart",
      inputs: ["d3","DOM","topojson","us","geojson","projection"],
      value: (function(d3,DOM,topojson,us,geojson,projection)
{
  const width = 960;
  const height = 600;
  const path = d3.geoPath();
  const svg = d3.select(DOM.svg(width, height))
      .style("width", "100%")
      .style("height", "auto");
  
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
  
  for (const d of geojson.features) {
      svg.append("circle")
        .attr("fill", "orange")
        .attr("transform", `translate(${projection(d.geometry.coordinates)})`)
        .transition()
        .delay(1000)
        .duration(1000)
        .attr("r", 10);
  }

  return svg.node();
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
      name: "us",
      inputs: ["d3"],
      value: (async function(d3)
{
  const us = await d3.json("https://www.mocaspike150.org/notebook/spike-relay/us.json");
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
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    },
    {
      inputs: ["us"],
      value: (function(us){return(
us.objects.counties
)})
    },
    {
      name: "geojson",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://www.mocaspike150.org/notebook/spike-relay/ridgewoodnj/map.geojson')
)})
    }
  ]
};

const notebook = {
  id: "07d58ed57f7998c7@124",
  modules: [m0]
};

export default notebook;
