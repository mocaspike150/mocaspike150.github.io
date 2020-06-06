// https://observablehq.com/d/0d77efac6cce1c60@228
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html","max_row","sorted_donation_table","runner_donation_data","profile_data","club_donation_data","view_all_link"], function(html,max_row,sorted_donation_table,runner_donation_data,profile_data,club_donation_data,view_all_link){return(
html`
<style>
  #donation {
    ${(max_row < 11) ? "padding: 10px;": ""}
  }
.viewall{
  background: #51cbce;
  border-radius: 30px;
  margin: 20px auto 0 0;
  padding: 10px 40px;
  text-transform: uppercase;
  font-weight: 600;

}
a.viewall{
  color: #fff;
}
.img-circle {
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.1);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.1);
    max-width: 100%;
    border-radius: 50%;
    width: 32px;
    height: 32px;
}
</style>
<div id="donation" >
  <div class="container-fluid" >
    <div class="row">
      <div class="col-sm-6"  ${(max_row < 11) ? "": "style='padding-left: 0'"}>
      <h4>Funds Raised by Runners</h4>
      ${sorted_donation_table(runner_donation_data, profile_data)}
      </div>
      <div class="col-sm-6"  ${(max_row < 11) ? "": "style='padding-left: 0'"}>
      <h4>Funds Raised by Clubs</h4>
      ${sorted_donation_table(club_donation_data, profile_data)}
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12" style="text-align:center">
     ${(max_row < 11) ? view_all_link: ""}
      </div>
    </div>
  </div>
</div>
`
)});
  main.variable(observer("view_all_link")).define("view_all_link", function(){return(
`
 <div style="padding-top: 20px;">
        <a  class="viewall" href='/fundraised-list/?max_row=1000'>   View All   </a>
      </div>
`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer("runner_donation_data")).define("runner_donation_data", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/donation/data/runners.json')
)});
  main.variable(observer("club_donation_data")).define("club_donation_data", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/donation/data/clubs.json')
)});
  main.variable(observer("runner_donation")).define("runner_donation", ["total_amount","runner_donation_data"], function(total_amount,runner_donation_data){return(
total_amount(runner_donation_data)
)});
  main.variable(observer("club_donation")).define("club_donation", ["total_amount","club_donation_data"], function(total_amount,club_donation_data){return(
total_amount(club_donation_data)
)});
  main.variable(observer("data2array")).define("data2array", function(){return(
(data) => {
  let output = []
  const by_amount = (x, y) => {
    return ((x.amount <= y.amount)? 1 : -1)
  }
  
  for (let id in data){
      output.push({id:id,amount:data[id].amount})
  }
  return output.sort(by_amount)
}
)});
  main.variable(observer("runner_donation_array")).define("runner_donation_array", ["data2array","runner_donation_data"], function(data2array,runner_donation_data){return(
data2array(runner_donation_data)
)});
  main.variable(observer("total_amount")).define("total_amount", function(){return(
(data) => {
  let output = 0
  for (const id in data) {
    output += parseInt(data[id].amount)
  }
  return output
}
)});
  main.variable(observer("club_donation_array")).define("club_donation_array", ["data2array","club_donation_data"], function(data2array,club_donation_data){return(
data2array(club_donation_data)
)});
  main.variable(observer("sorted_runner_id")).define("sorted_runner_id", ["runner_donation_array"], function(runner_donation_array){return(
runner_donation_array.map((d) => { return d.id })
)});
  main.variable(observer("sorted_club_id")).define("sorted_club_id", ["club_donation_array"], function(club_donation_array){return(
club_donation_array.map((d) => { return d.id })
)});
  main.variable(observer("max_row")).define("max_row", ["params"], function(params){return(
params.get('max_row') ? parseInt(params.get('max_row')) : 10
)});
  main.variable(observer("sorted_donation_table")).define("sorted_donation_table", ["data2array","max_row","html_name"], function(data2array,max_row,html_name){return(
(donation_data, profile_data) => {
  const donation_array = data2array(donation_data)
  const sorted_id = donation_array.map((d) => (d.id))
  let counter = 0
  let output = `<table>`
  for (let id of sorted_id){
    if(counter < max_row){
      for(let profile of profile_data){
        if(profile['crowdrise_id'] == id){
          if (donation_data[id].amount > 0){
         output += `
<tr>
<td style="width:55px;">
<img src="${profile['card-image']}" style="width:32px;" class="img-circle">
</td>
<td>
${html_name(profile)}
</td>
<td width=20%>
$${donation_data[id].amount.toLocaleString()}
</td>
</tr>
`
          }
        }
      }
    }
    counter++
  }
  output += `</table>`
  return output
}
)});
  main.variable(observer("html_name")).define("html_name", function(){return(
(profile) => {
  return `
<a href="https://www.crowdrise.com/o/en/campaign/${profile.team}/${profile.crowdrise_page}" target=_blank>
${profile.firstname ? profile.firstname : ''} ${profile.lastname ? profile.lastname : ''}
</a>
`
}
)});
  main.variable(observer("profile_data")).define("profile_data", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/data/ambassadors.json')
)});
  main.variable(observer("params")).define("params", function(){return(
new URL(document.baseURI).searchParams
)});
  return main;
}
