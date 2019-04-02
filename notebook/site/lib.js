const m0 = {
  id: "8ccdb44897a41e56@8",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`See data in console`
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
)})
    },
    {
      name: "data",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('./data.json')
)})
    },
    {
      inputs: ["data"],
      value: (function(data){return(
console.log(data)
)})
    }
  ]
};

const notebook = {
  id: "8ccdb44897a41e56@8",
  modules: [m0]
};

export default notebook;
