const express = require('express');
const bodyparser = require('body-parser');


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
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

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

app.post('/sensor/:id/addnote', (req, res) => {
  // if the req.body does not have a note on it
  if (!req.body.note) {
    //return an error as JSON
    res.json({
      'error': 'gimme a note',
    });
  } else {
    //add note to sensor with id passed in URL
    db.sensors.forEach((sensor, index) => {
      if (sensor.id == req.params.id) {
        if (!db.sensors[index].notes) {
          db.sensors[index].notes = []
        }
        db.sensors[index].notes.push(req.body.note)

        //if adding the note was successfull then return a success message
        res.json({
          'success': 'added note to sensor '+ req.params.id,
          'notes': db.sensors[index].notes,
        })
      }
    });

    //and log to the console
    console.log(db.sensors);
    //logic here to add note data to sensor with id that matches req.params.id
  }
});

const PORT = 9000;
app.listen(PORT);
console.log('Express listening on port ' + PORT);
