// URL: https://observablehq.com/d/749a013be37e0fc4
// Title: Untitled
// Author: Sam Liu (@ontouchstart)
// Version: 14
// Runtime version: 1

const m0 = {
  id: "749a013be37e0fc4@14",
  variables: [
    {
      inputs: ["html"],
      value: (function(html){return(
html`
<style>
 #notebook {    
   background: #FFF7ED;
   padding-top: 100px;
 }

 #notebook .left {
  position: absolute;
  left: 0px;
  padding: 10px;
}
 #notebook .right {
  position: absolute;
  right: 0px;
  padding: 10px;
}

#notebook .relay .title {
  color: #ffa10a;
  font-size:15px;
  line-height:1;
  font-weight: strong;
  background: transparent;
  height: 120px;
}

#notebook .relay .week {
  font-family: Verlag-bold;
  color: #63bf87;
  font-size: 40px;
  line-height:0.8;
  background: transparent;
}

#notebook .mileage {
  padding-top: 20px;
}

#notebook .mileage .current-mile-title {
  color: #ffa10a;
  font-size:15px;
  line-height:1;
  font-weight: strong;
  
}
#notebook .mileage .current-mile {
  font-family: Verlag-bold;
   color: #63bf87;
   font-size:40px;
    line-height:0.8;
}
#notebook svg {
  margin-top: 20px;
}
</style>
<div class="relay left" >
<div class="h5 title">MOCA Spike 150 Virtual Relay</div>
<div class="week">Week 1</div>
</div>
<div class="mileage right" >
<div class="current-mile-title">Current Mileage</div>
<div class="current-mile">1200</div>
</div>

`
)})
    },
    {
      inputs: ["build","track"],
      value: (function(build,track){return(
build(track, 1200)
)})
    },
    {
      name: "build",
      inputs: ["DOM","d3","spike_svg"],
      value: (function(DOM,d3,spike_svg){return(
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
  
  let spike = g.append('g').html(spike_svg.svg).attr('transform', 'scale(0.3)');
  spike.attr('transform', 'translate(810, 80) scale(0) rotate(-20)')
  spike.attr('transform', 'translate(810, 80) scale(0.3) rotate(-20)')
  
 
  return svg;
}
)})
    },
    {
      name: "track",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://spike150.mocanyc.org/json/track.json')
)})
    },
    {
      name: "spike_svg",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://spike150.mocanyc.org/api/spike.json')
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
  id: "749a013be37e0fc4@14",
  modules: [m0]
};

export default notebook;
