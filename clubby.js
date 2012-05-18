http = require('http');
clubby = require('fs');
count = 0;

// config - Format
// config = {
// 	"clubbed_file.js" : { 
//		"file_1.js" : { minify : true },
//		"file_2.js" : { minify : false }		
//	 }
// }
// Description : Above file_1.js and file_2.js are clubbed into a single
//               file with name clubbed_file.js
//		 Here file_1.js is minified and file_2.js is'nt minified
//		 By default minify is false

config = {
	"./clubbed.js" : {
		"./hi.js" : {
			minify: false
		}
	}
};
 
var server = http.createServer(
function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('hello world');
	res.end();
});
server.listen(8000, "127.0.0.1");
console.log('Clubby server running at http://127.0.0.1:8000/');

var start = function(){
	for(var file in config){
		console.log(file);
	}
};

clubby.watchFile('./hi.js', {persistent : true}, 
function(curr, prev){
	start();
	console.log('current ', curr, ' and previous ', prev);
	count += 1;
	console.log(count, ' ----------------------------------------');
});
console.log('clubby is watching hi.js file...');

