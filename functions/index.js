'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const rp = require('request-promise-native')
const baseurl = 'http://wikipedia.simpleapi.net/api'

// a. the action name from the make_name Dialogflow intent
const NAME_ACTION = 'wikipedia';
// b. the parameters that are parsed from the make_name intent 
const KEYWORD = 'any'

exports.sillyNameMaker = functions.https.onRequest((request, response) => {
    const app = new App({request, response});
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));

    // c. The function that generates the silly name
    function wikipedia (app) {
	let keyword = app.getArgument(KEYWORD);
	if (!isja(keyword)) {
	    keyword = keyword.toUpperCase();
	}
	console.log('keyword: ' + keyword);
	GetArticleBody(keyword).then(function(result) {
	    console.log('result: ' + result);
	    let jsonResult = JSON.parse(result);
	    let talkBody = '';
	    
	    if (jsonResult.length == 1) {
		talkBody = decodeURIComponent(jsonResult[0]['body']);
	    } else {
		talkBody = decodeURIComponent(jsonResult[1]['body']);
	    }
	    app.tell(talkBody);
	}).catch(function(err) {
	    console.log(err);
	    app.tell('リクエストに失敗しました。')
	});
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, wikipedia);

app.handleRequest(actionMap);
});

function GetArticleBody(keyword, format='json') {
    keyword = encodeURIComponent(keyword);
    let url = baseurl + '?keyword=' + keyword + '&output=' + format
    console.log(url);
    return rp(url)
};

// コピペ from https://qiita.com/graminume/items/2ac8dd9c32277fa9da64
function isja ( str ) {
  return ( str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/) )? true : false
}
