var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var dictionaryList = require('./public/assets/dictionaryList.js');

// var config = require('./utils/config');
// var utils = require('./utils/utils');

var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.set('port', port);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var dictionaryArray = null;

app.get('/', function(req, res) {
	dictionaryArray = dictionaryList['list'];
	dictionaryArray = dictionaryArray.filter(function(word) {
			return word.length > 3;
	});
	res.render("index");
});

app.post('/getWords', function(req, res) {
	var letterOne = req.body.one;
	var letterTwo = req.body.two;
	var letterThree = req.body.three;

	var list = getAllValidWords(letterOne, letterTwo, letterThree);
	var obj = {
		"list": list
	}
	res.json(obj);
});

var getAllValidWords = function(letterOne, letterTwo, letterThree) {
	var validList = [];
	for(var indexWord = 0; indexWord < dictionaryArray.length; indexWord++) {
		var word = dictionaryArray[indexWord];
		for(var indexOne = 0; indexOne < word.length; indexOne++) {
			if(word[indexOne] === letterOne) {
				for(var indexTwo = indexOne + 1; indexTwo < word.length; indexTwo++) {
					if(word[indexTwo] === letterTwo) {
						for(var indexThree = indexTwo + 1; indexThree < word.length; indexThree++) {
							if(word[indexThree] === letterThree) {
								validList.push(word);
							}
						}
					}
				}
			}
		}
	}
	return validList;
}

app.listen(port);
console.log("The server is running on port " + port + "...");