var frisby = require('frisby');
require('jasmine-expect')

frisby.create('GET JSON data from an endpoint')
  .get('https://api.github.com/users/gd46/repos',
  	{headers: {'User-Agent': 'Chrome'}})
  .expectStatus(200)
  .afterJSON(function(body) {
  	console.log('body', body)
  	expect(body[0].owner.login).toBe('gd46');
  	frisby.globalSetup({
      request: { 
        headers: {
          'User-Agent': 'Chrome'
        }
      }
    });
  	frisby.create("GET list of followers")
  		.get(body[0].owner.followers_url)
  		.expectStatus(200)
  		.afterJSON(function(body) {
  			expect(body[0].login).toBeString();
  		})
  		.toss()

  })
.toss();