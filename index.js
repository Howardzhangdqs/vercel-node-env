const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

const port = 3008;

app.all("*", function(req, res, next){
	
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","content-type");
	res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
	
	next();
});

app.get('/', (req, res) => {
	res.send('Hello World!');
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
})