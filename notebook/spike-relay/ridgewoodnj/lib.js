const m0 = {
  id: "07d58ed57f7998c7@106",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Ridgewood NJ`
)})
    },
    {
      name: "chart",
      inputs: ["d3","DOM","topojson","us","data"],
      value: (function(d3,DOM,topojson,us,data)
{
  const width = 960;
  const height = 600;
  const path = d3.geoPath();
  const svg = d3.select(DOM.svg(width, height))
      .style("width", "100%")
      .style("height", "auto");
  const formatNumber = d3.format(",.0f");
  const radius = d3.scaleSqrt().domain([0, 1e6]).range([0, 15]);

  
  svg.append("path")
      .datum(topojson.merge(us, us.objects.lower48.geometries))
      .attr("fill", "#FFF7ED")
      .attr("stroke", "#6aa8ca")
      .attr("d", path);
  
 svg.append("circle")
      .attr("fill", "orange")
      .attr("transform", `translate(${data[0]})`)
      .attr("r", 10);
  
  svg.append("path")
      .datum(topojson.mesh(us, us.objects.lower48, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "#6aa8ca")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
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
      name: "ridgewood",
      value: (function(){return(
[-74.09363150596617,40.97473030684452]
)})
    },
    {
      name: "us",
      inputs: ["d3"],
      value: (async function(d3)
{
  const us = await d3.json("https://unpkg.com/us-atlas@1/us/10m.json");
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
d3.json('map.geojson')
)})
    },
    {
      name: "data",
      inputs: ["geojson","projection"],
      value: (function(geojson,projection){return(
geojson.features.map((d) => (projection(d.geometry.coordinates)))
)})
    }
  ]
};

const notebook = {
  id: "07d58ed57f7998c7@106",
  modules: [m0]
};

export default notebook;
