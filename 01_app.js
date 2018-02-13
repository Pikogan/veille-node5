const express = require('express');
var app = express();
app.use(express.static('public'));
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB

/* on associe le moteur de vue au module «ejs» */

app.set('view engine', 'ejs'); // générateur de template
var util = require("util");

app.get('/', function (req, res) {

	var cursor = db.collection('adresse')
					.find().toArray(function(err, resultat){
						if(err) return console.log(err)
							console.log('util = ' + util.inspect(resultat));

						res.render('gabarit_1.ejs', {adresses: resultat})
					})
})

let db

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})
