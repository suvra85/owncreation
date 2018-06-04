const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');
const port = process.env.PORT || 1234;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/src'));
app.set('views', path.join(__dirname, 'src')); 
var routes = express.Router();

var user = require('./src/api/users'); //importing route
routes('/api/',user); //register the route

app.get('/', (req, res) => {
 var filePath=app.get('views');
 res.sendFile(filePath + '/index.html')  
});
app.listen(port, function() {
  console.log('listening on 1234')
})