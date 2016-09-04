var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    creatorId: String,
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },

    type: String,
    routeId: String,

    participants: [],
    private: Boolean,

    description: String
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
