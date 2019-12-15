const mongoose = require('mongoose');

const TimeLineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    createdOn: Date,
});

module.exports = mongoose.model('timeLine', TimeLineSchema);