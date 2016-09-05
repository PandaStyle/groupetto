var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    creatorId: String,
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: String,
    meetingPoint: String,
    type: String,
    participants: [],
    private: Boolean,
    route: Object,


});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
