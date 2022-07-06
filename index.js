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

app.get('/ip', (req, res) => {
	let h = req.headers;
	res.set("Content-Type", "text/plain");
	
	let ClientIp = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress || ''
	).match(/\d+.\d+.\d+.\d+/);
	ClientIp = ClientIp ? ClientIp.join('.') : null;
	
	res.send(JSON.stringify({
		'host': h.host,
		'connection': h.connection,
		'user-agent': h["user-agent"],
		'time-stamp': + new Date(),
		"client-ip": ClientIp,
	}, null, "    "));
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
})