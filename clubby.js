http = require('http');
clubby = require('fs');
count = 0;

// config - Format
// config = {
// 	"clubbed_file.js" : { 
//		"file_1.js" : minify,
//		"file_2.js" : minify
//	 }
// }
// Description : Above file_1.js and file_2.js are clubbed into a single
//               file with name clubbed_file.js
//               The files are clubbed in the order of appearence
//               By default minify is false

config = {
	"./clubbed.js" : {
		"./hi.js"    : false,
		"./file1.js" : false
	}
};

init = function() {
	for(var clubbed_file in config) {

        for(var file in config[clubbed_file]) {
            clubby.watchFile(file, {persistent : true}, 
                function(curr, prev) {
                    console.log('current ', curr, ' and previous ', prev);
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


