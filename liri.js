var fs = require("fs");

var keys = require("./keys.js");
 
var twitter = require("twitter");

var spotify = require('spotify');
	
var request = require("request");

var dataArr = process.argv;

var action = process.argv[2];




switch (action) {
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

function tweets(){

var client = new twitter(keys.twitterKeys);
	// console.log('tweets ran');

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


	var songData = process.argv.splice(3).join(" ");


	spotify.search({ type: 'track', query: songData }, function(err, data) {
    	if (err) {
        	console.log('Error occurred: ' + err);
        	// return;
    	}

    	// console.log(data);
    	// console.log(data.tracks.items);

    	for (var i = 0; i < 1; i++){
    		// console.log(data.tracks.items[i]);

    		// artist's name
    		console.log("");
    		console.log('Artists\' Name:');
    		data.tracks.items[i].artists.forEach(function(el){
    			console.log(el.name);
    		});

    		// song
    		console.log("");
    		console.log('Song Name:');
    		console.log(data.tracks.items[i].name);

    		// this is name of album
    		console.log("");
    		console.log('Album Name: ' + data.tracks.items[i].album.name);

    		// url
    		console.log("");
    		console.log('Preview of the song:');
    		console.log(data.tracks.items[i].preview_url);


    		console.log("");
    		console.log('Album URL:');
    		console.log(data.tracks.items[i].album.external_urls.spotify);


    	}

    });
}


// ===* MOVIE SECTION *=== //



function movie() {


	// process.argv returns an array
	// the first two elements are always present

	// in the case that an argument IS passed
	// process.argv[2] is defined
	// process.argv.length = 3


	// in the case that an argument is NOT passed
	// process.argv.length = 2
	// process.argv[2] is not defined

	var movieName = '';
	// var dataArr = process.argv;


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

		
	// var request = require("request");


	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

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


function doThis() {

	// if (splitData.length == 2) {
    // var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
	    var splitData = data.split(",");
	    // console.log(splitData); // Check to see what's split. 
	    var inputOne = splitData[0];
	    var inputTwo = splitData[1];
	    if (inputOne == "spotify-this-song") {
	        spotifySong(inputTwo); //spotifySongSearch function runs here
	    } else if (inputOne == "my-tweets") {
	        tweets(); // tweetit function runs here (no process.argv[3])
	    } else if (inputOne == "movie-this") {
	        movie(inputTwo); //movieSearch function runs here
	    }
	});
}
  // fs.readFile("random.txt", "utf8", function(error, data) {
  //   console.log(data);
  //   var dataSplit = data.split(',');

  //   if (dataSplit.length == 2) {
  //   	action(dataSplit[0], dataSplit[1]);

  //   } else if (dataSplit.length == 1) {
  //   	action(dataSplit[0]);

  //   }


  // });
// }




// var dataArr = data.split(',')

//     if (dataArr.length == 2) {
//       pick(dataArr[0], dataArr[1]);
//     } else if (dataArr.length == 1) {
//       pick(dataArr[0]);
//     }


