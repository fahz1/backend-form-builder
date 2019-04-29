const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const formRoutes = express.Router();
const PORT = 4000;

let Form = require('./form.model');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/forms', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})



formRoutes.route('/').get(function(req, res) {
    Form.find(function(err, forms) {
        if (err) {
            console.log(err);
        } else {
            res.json(forms);
        }
    });
});

formRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Form.findById(id, function(err, form) {
        res.json(form);
    });
});

formRoutes.route('/add').post(function(req, res) {
    let form = new Form(req.body);
    form.save()
        .then(form => {
            res.status(200).json({'form': 'form added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new form failed');
        });
});

app.use('/forms', formRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
