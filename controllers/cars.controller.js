/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */
const Car = require('../models/car.model.js');
const mongoose = require('mongoose');

exports.create = function(req, res, next) {
    // Create and Save a new car
    let carModel = new Car({
        title: 'Example code',
        text: 'This is to demonstrate how to add data to a database using Mongoose',
        author: 'Hyperion'
    });
    carModel.save(function(err, data) {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            console.log(data);
            res.send('The car has been added');
        }
    });
};

exports.findAll = function(req, res, next) {
    Car.find(function(err, cars) {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            res.json(cars);
        }
    });
};

exports.updateByOwner = function(req, res, next) {
    let query = { author: 'Matthew Liebenberg' };
    Car.findOneAndUpdate(query, { author: 'Hyperon' }, { new: true }, function(err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
            return next(err);
        }
        res.send("Updated");
    });
}

exports.deleteCarsByOwner = function(req, res, next) {
    Car.findOneAndRemove({ owner: 'Matthew Liebenberg' }, function(err) {
        if (err) {
            console.log("ERROR: Cars NOT removed. " + err);
            return next(err);
        }
        res.send("Cars removed");
    });
}