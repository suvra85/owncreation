var express = require('express');
var app = express();
// Create the express router object for Users
var userRouter = express.Router();
// A GET to the root of a resource returns a list of that resource
userRouter.get('/', function(req, res) { console.log("get user router") });
// A POST to the root of a resource should create a new object
userRouter.post('/', function(req, res) { });
// We specify a param in our path for the GET of a specific object
userRouter.get('/:id', function(req, res) { console.log("get id user router")  });
// Similar to the GET on an object, to update it we can PATCH
userRouter.patch('/:id', function(req, res) { });
// Delete a specific object
userRouter.delete('/:id', function(req, res) { });
// Attach the routers for their respective paths
app.use('/users', userRouter);
module.exports = app;