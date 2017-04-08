# liri-node-app

HW - Liri Bot (Language Interpretation and Recognition Interface)


Live Link 

https://yenla.github.io/liri-node-app/


Summary

• This homework assignment require me to create a language interpretation and recognition interface. This application will take in the user command through the command line node app that takes in parameters and gives the user back the data they requested.

Code Explaination

First I need to require that the app will take in the npm node packages then I create a function to request the data from the npm package. These data then will display to the user using console log. 

For example:

	var spotify = require('spotify');

	function spotifySong() {

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
	    	}

	    });
	}