require("dotenv").config();

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var command2 = process.argv[3];

if (command === "my-tweets") {
  var params = { screen_name: "Msolori0" };
  client.get("statuses/user_timeline", params, function (
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; 1 < 20; i++) {
        console.log("Your Tweet:" + tweets[i].text);
        console.log("/n At: " + tweets[i].created_at);
        console.log("/n ----------");
      }
    } else {
      console.log("error");
    }
  });
}

if (command === "spotify-this-song") {
  spotify.search(
    { type: "track", query: "All the Small Things", limit: 5 },
    function (err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      for (var i = 0; i < data.tracks.items.length; i++) {
        var track = data.tracks.items[i];
        console.log("----");
        console.log("Artist:" + track.artists[0].name);
        console.log("Title" + track.name);
        console.log("Album" + track.name);
        console.log("Preview" + track.external_urls.spotify);
        console.log("----")
      }
    }
  );
}

if (command === "movie-this") {
  var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("title: " + JSON.parse(body).Title);
      console.log("released: " + JSON.parse(body).Year);
      console.log("rating: " + JSON.parse(body).imdbRating);
      console.log("plot: " + JSON.parse(body).Plot);
      console.log("language: " + JSON.parse(body).Language);
      console.log("actors: " + JSON.parse(body).Actors);
      console.log("ratings: " + JSON.parse(body).Ratings[0].Value);
      console.log("country: " + JSON.parse(body).Country);
      console.log(
        "--------------------------------------"
      );

    }
  });
};

if (command === "do-what-it-says") {
  fs.readFile("random.txt", "UTF8", function (err, data) {
    console.log(data);
    var mainArray = data.split(",")
    console.log(mainArray)
    spotify.search(
      { type: "track", query: mainArray[1] || "All the Small Things", limit: 5 },
      function (err, data) {
        if (err) {
          return console.log("Error:" + err);
        }

        for (var i = 0; i < data.tracks.items.length; i++) {
          var firstTrack = data.tracks.items[i]; 1
          console.log("artist: " + firstTrack.artists[0].name);
          console.log("song Title: " + firstTrack.name);
          console.log("album: " + firstTrack.album.name);
          console.log("song Preview: " + firstTrack.external_urls.spotify);
          console.log(
            "-----------------------------------------"
          );
        }
      }
    );
  })
}