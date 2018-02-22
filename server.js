const express = require('express');

const app = express();
const request = require('request');

const port = process.env.PORT || 5000;


app.get('/api/list-repos', (req, res) => {
	var options = {
  		url: 'https://api.github.com/orgs/Netflix/repos',
  		headers: {
    		'User-Agent': 'ridonkz'
  		}
  	};
	request(options).pipe(res);
});

app.get('/api/commits/:repo', (req, res) => {
  const repo = req.params.repo
	var options = {
  		url: 'https://api.github.com/repos/Netflix/' + repo + '/commits',
  		headers: {
    		'User-Agent': 'ridonkz'
  		}
  	};
  	request(options).pipe(res);
})


app.listen(port, () => console.log(`Listening on port ${port}`));


