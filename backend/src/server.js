const express = require('express');

// In-memory 'database' object.
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

const app = express();

app.use(function(req, res, next) {
  // Allow CORS
  res.header('Access-Control-Allow-Origin', '*');//indicates whether the response can be shared with resources with the given origin.
  // For requests without credentials, the server may specify "*" as a wildcard, thereby allowing any origin to access the resource. Access will only be allowed for requests made with the crossorigin attribute set to "anonymous". Attempting to use the wildcard with credentials will result in an error.
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/sensors', (req, res) => {
  res.json(db.sensors);
});

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
