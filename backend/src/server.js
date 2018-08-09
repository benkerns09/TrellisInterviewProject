const express = require('express');//need this to use express

// In-memory 'database' object. Page has to be refreshed to see changes here(bk note)
const db = {
  sensors: [
    {
      id: 1,
      name: 'North Sensor',
      description: 'The sensor in the north',
    },
    {
      id: 2,
      name: 'South Sensor',
      description: 'The south field sensor',
    },
    {
      id: 3,
      name: 'East Sensor',
      description: 'The sensor on the east side',
    },
    {
      id: 4,
      name: 'West Sensor',
      description: 'The western most sensor',
    }
  ]
};

// Create express app. This is where all magic happends
const app = express();
//app.use is middleware. They have access to request object, which isn't being used here.
//response object
//function is executed everytime the app receives a request. No mount path here
app.use(function(req, res, next) {
  // Allow CORS
  // Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos.
  res.header('Access-Control-Allow-Origin', '*');//indicates whether the response can be shared with resources with the given origin.
  // For requests without credentials, the server may specify "*" as a wildcard, thereby allowing any origin to access the resource. Access will only be allowed for requests made with the crossorigin attribute set to "anonymous". Attempting to use the wildcard with credentials will result in an error.
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
  //next middleware function in the application's request-response cycle
});
//route handler. Handles GET requests to the root of the app. Intended for matching and handling a specific route when requested with the GET HTTP verb
app.get('/sensors', (req, res) => {
  // Return all sensors. Sends JSON response composed of a stringified version of the specified data
  //req is an object containing information about the HTTP request that raised the event. In response to req, you use res to send back the desired HTTP response
  res.json(db.sensors);
});

// that's actually defining that route right there
// you could change it to `app.get('/potato, (req, res) => {` and then when your frontend sends a GET request to `/potato` it will return the same thing






app.get('/sensors/:notes', (req, res) => {
  res.json(db.sensors[req.params.notes])
})

// app.post('/sensors/:notes'), (req, res) => {
//   response.send(request.body);
// }
// app.post('/sensor/:notes', (req, res) => {
//   res.send(db.sensors[req.params.notes])
//   // req.json(db.sensors[req.params.notes])
// })

const PORT = 9000;
app.listen(PORT);
console.log('Express listening on port ' + PORT);
