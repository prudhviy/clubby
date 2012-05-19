http = require('http');
clubby = require('fs');
count = 0;

config = {
	"./clubbed.js" : [
		{ "./hi.js"    : false },
		{ "./file1.js" : false }
	],
	"./a.js" : [
		{ "./hi.js"    : false },
		{ "./file2.js" : false }
	]
};

file_config = {};

init = function() {
	var watch = function(file, clubbed_file) {
		/*clubby.watch(path, {persistent : true}, 
			function(event, file_name) {
				console.log('event: ', event, ' and File: ', file_name);
				count += 1;
				console.log(count, ' ----------------------------------------');
		});
		console.log('clubby is watching ', path,' file...');
		*/
	};
	
	var segregate = function(file_obj, clubbed_file) {
		for(var file in file_obj) {
			file_config[file] ? (file_config[file].push(clubbed_file)) : (file_config[file] = [clubbed_file]);
			//console.log("file-config: ", file_config);
			//console.log("----------------------------");
			watch(file);
		}
	};
	
	for(var clubbed_file in config) {
		var files = config[clubbed_file];
		for(var i = 0; i < files.length; i++) {
			//console.log(files[i]);
			segregate(files[i], clubbed_file);
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


