var frisby = require('frisby');
require('jasmine-expect');
var Mustache = require('mustache');

frisby.create("Mustache Template")
  		.get('https://api.github.com/users/gd46/repos',
  			{headers: {'User-Agent': 'Chrome'}})
  		.afterJSON(function(body) {
  			var template = JSON.stringify({
			    name: "Alfred",
			    stats: {
			        age: 32,
			        position: {
			            level: 10,
			            title: '{{title}}'
			        }
			    }
			});

			var data = {title: 'I am title'};
			var obj = JSON.parse(Mustache.render(template, data));
			console.log("Obj", obj);
  		})
  		.toss();