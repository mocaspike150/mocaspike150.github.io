// https://observablehq.com/d/a39ec5429de765b5@174
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`[notebook](https://observablehq.com/d/a39ec5429de765b5)`
)});
  main.variable(observer("note")).define("note", function(){return(
`
Note: Include Flying Fox.
`
)});
  main.variable(observer()).define(["md","title","note","table"], function(md,title,note,table){return(
md`
# ${title}
${note}
${table(15)}
`
)});
  main.variable(observer("title")).define("title", function(){return(
'Top 15 Fundraising Teams'
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.json('https://raw.githubusercontent.com/mocaspike150/donation/master/data/clubs.json')
)});
  main.variable(observer("avatar")).define("avatar", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/avatar.json')
)});
  main.variable(observer("profile")).define("profile", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/profile.json')
)});
  main.variable(observer("strava")).define("strava", ["profile"], function(profile)
{
  let output = {}
  for (const id in profile) {
    output[profile[id].crowdrise_id] = id
  }
  return output
}
);
  main.variable(observer("sort_by_donation")).define("sort_by_donation", ["data","strava","profile"], function(data,strava,profile)
{
  let output = []
  for(const id in data) {
    if(strava[id]) {
      output.push({ id: strava[id], amount: data[id].amount, crowdrise: profile[strava[id]].crowdrise})
    }
  }
  output.push({id: '0', amount: data['5337023'].amount, crowdrise: 'https://www.crowdrise.com/o/en/campaign/moca-spike-150-ambassadors/Flyingfox' })
  return output.sort((x, y) => (x.amount < y.amount ? 1 : -1))
}
);
  main.variable(observer("logo")).define("logo", ["avatar"], function(avatar){return(
(id) => {
  if(avatar[id]) {
   return `<a href="https://spike150.mocanyc.org/spike-relay/club/club.html#${id}"><img style="width: 64px; heigh:64px;border-radius: 64px;" src="${avatar[id].src}"/></a>`
  }
  else {
    return '<a href="https://flyingfoxcsc.org/"><img style="width: 64px; heigh:64px;border-radius: 64px;" src="https://cdn.crowdrise.com/v2/photo/file/member/5337023"/></a>'
  }
}
)});
  main.variable(observer("table")).define("table", ["sort_by_donation","logo"], function(sort_by_donation,logo){return(
(limit) => {
  let output =`
<style>
  a.button {
  border: 1px solid #ffa10a;
  background-color: white;
  color: #ffa10a;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 3px;
}

.donate {
  border-color: #ffa10a;
  color: #ffa10a
}

.donate:hover {
  background: #ffa10a;
  color: white;
  text-decoration:none;
}

</style>

<table>
  <thead>
<tr>
<th  style="width:1em;">
</th>

<th style="width:20%;">
Club
</th>
<th style="width:45%;text-align:center;">
Raised 
</th>
<th style="text-align:center;">

</th>

</tr>
</thead>
`
  let count = 1
  for(const club of sort_by_donation) {
    if (count < limit+1) {
    output += `
<tr>
<td>
${count}
</td>
<td>
${logo(club.id)}
</td>
<td style="text-align:center;">
<a href="${club.crowdrise}">\$${club.amount.toLocaleString()}</a>
</td>
<td style="text-align:center;">
<a href="${club.crowdrise}" class="button donate">Donate</a>
</td>
</tr>
`
    count++
    }
  }
  output += `</table>`
  return output
}
)});
  main.variable(observer()).define(["table"], function(table){return(
table(15)
)});
  return main;
}
