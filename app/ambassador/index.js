const axios = require('axios')
const api = 'https://www.crowdrise.com/o/en/campaign/moca-spike-150-ambassadors'

exports.amount = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let id = req.params.id
  let endpoint = `${api}/${id}`
  axios.get(endpoint)
    .then( (response) => {
      let html = response.data
      let lines = html.split('\n');
      let raised = lines.filter((d) => ( d.match(/<h2 class="inline raised"/)))[0]
      let goal = lines.filter((d) => ( d.match(/<span class="h3 inline goal">/)))[0]
      let amount = {
        raised: raised,
        goal: goal
      }
      res.end(JSON.stringify(amount))
    })
    .catch((error) => {
      res.end(JSON.stringify(error.response.data));
    });
  }
