http = require('http');
clubby = require('fs');
count = 0;

config = {
	"./clubbed.js" : [
		{ "./hi.js"    : false },
		{ "./file1.js" : false }
	]
};

init = function() {
	for(var clubbed_file in config) {

		for(var file in config[clubbed_file]) {
			clubby.watch(file, {persistent : true}, 
				function(event, file_name) {
					console.log('event: ', event, ' and File: ', file_name);
					count += 1;
					console.log(count, ' ----------------------------------------');
			});
			console.log('clubby is watching ', file,' file...');
		}
	}
};
init();

server = http.createServer(
function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('hello world');
	res.end();
});
//server.listen(8000, "127.0.0.1");
//console.log('Clubby server running at http://127.0.0.1:8000/');


