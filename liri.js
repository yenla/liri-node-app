var fs = require("fs");

var keys = require("./keys.js");
 
var twitter = require("twitter");

var spotify = require('spotify');
	
var request = require("request");

var dataArr = process.argv;

var action = process.argv[2];



function run(curAction){
	switch (curAction) {
		case "my-tweets":
		tweets();
		break;

		case "spotify-this-song":
		spotifySong();
		break;

		case "movie-this":
		movie();
		break;

		case "do-what-it-says":
		doThis();
		break;
	}
}
run(action);

function tweets(){

var client = new twitter(keys.twitterKeys);

	client.get('search/tweets', {q: 'anch0raway' }, function(error, tweets, response) {
  		if (!error) {

  			for (let i = 0; i < tweets.statuses.length; i++){
  				console.log(tweets.statuses[i].created_at);
  				console.log(tweets.statuses[i].text);
  				console.log("");


  			}
  		}
	});
}


// ===* SPOTIFY SECTION *=== //

function spotifySong() {

	// it will execute user input of argv[3] or it will execute the sign if there is no argv[3]
	var songData = process.argv[3] || "The Sign Ace of Base";

	spotify.search({ type: 'track', query: songData }, function(err, data) {
    	if (err) {
        	console.log('Error occurred: ' + err);
        	// return;
    	}
    	// console.log(data);
    	// console.log(data.tracks.items);

    	for (var i = 0; i < 1; i++){

    		// artist's name
    		console.log("");
    		console.log('Artists\' Name:');
    		data.tracks.items[i].artists.forEach(function(el){
    			console.log(el.name);
    		});

    		// song name
    		console.log("");
    		console.log('Song Name:');
    		console.log(data.tracks.items[i].name);

    		// this is name of album
    		console.log("");
    		console.log('Album Name: ' + data.tracks.items[i].album.name);

    		// track 30 seconds preview url
    		console.log("");
    		console.log('Preview of the song:');
    		console.log(data.tracks.items[i].preview_url);

    		// album image url
    		console.log("");
    		console.log('Album URL:');
    		console.log(data.tracks.items[i].album.external_urls.spotify);


    	}

    });
}

// ===* MOVIE SECTION *=== //

function movie() {

	var movieName = '';

	if(process.argv.length >= 4){
		for (var i = 3; i < dataArr.length; i++){
			if (i > 3 && i < dataArr.length) {
				movieName = movieName + "+" + dataArr[i];
			} else {
				movieName += dataArr[i];
			}
		} // closes for loop for dataArr
	} else {
		movieName = 'Mr Nobody';
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";

	console.log(queryUrl);

	request(queryUrl, function(error, response, body){

		if (!error && response.statusCode === 200) {

	    	console.log("");
			console.log("Title: " + JSON.parse(body).Title);
	    	console.log("");
	    	console.log("Release Year: " + JSON.parse(body).Released);
	    	console.log("");
	    	console.log("Rating: " + JSON.parse(body).imdbRating);
	    	console.log("");
	    	console.log("Produced In: " + JSON.parse(body).Country);
	    	console.log("");
	    	console.log("Language: " + JSON.parse(body).Language);
	    	console.log("");
	    	console.log("Plot: " + JSON.parse(body).Plot);
	    	console.log("");
	    	console.log("Actors: " + JSON.parse(body).Actors);
			console.log("");
	    	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    	console.log("");
	    	console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);

		}
	});			

}

// ===* DO WHAT IT SAY REQUEST SECTION *=== //

function doThis() {

    fs.readFile("random.txt", "utf8", function(error, data) {
	    var splitData = data.split(",");
	    var inputOne = splitData[0];
	    
	    process.argv[3] = splitData[1];

	    run(inputOne);

	    

	});
}