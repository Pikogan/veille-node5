const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/',function(req, res){

 res.render('accueil.ejs')
})

app.get('/formulaire',function(req, res){

 res.render('formulaire.ejs')
})

////////////////////////////////////////////////////////////////////////////////

app.get('/membres',function(req, res){

var cursor = db.collection('adresse').find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('gabarit.ejs', {adresse: resultat})
})
})

/////////////////////////////////////////////////////////////////////////////

app.get('/ajouter', function (req, res) {
 // Preparer l'output en format JSON
 db.collection('adresse').save(req.query, (err, result) => {
 if (err) return console.log(err)
 console.log()
 res.redirect('/membres')
 })

});

let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})
