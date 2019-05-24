// https://observablehq.com/d/a92aa6de59a58af7@12
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`
# Paypal 
Usage:
<pre>
import { paypal } from 'a92aa6de59a58af7'
</pre>
`
)});
  main.variable(observer()).define(["html","paypal"], function(html,paypal){return(
html`${paypal}`
)});
  main.variable(observer("paypal")).define("paypal", function(){return(
`
<h6>Donate to MOCA via Paypal:</h6><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=AZGJLVBXNR67Y&amp;source=url">Please indicate the club name on the comment</a></h6>
`
)});
  return main;
}
