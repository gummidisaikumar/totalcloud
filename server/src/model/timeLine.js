const mongoose = require("mongoose");

const TimeLineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  data: {
      type: Object,
      attributes: {
        type: Object,
        description: String,
        bold: Boolean,
        italic: Boolean
      }
  },
  createdOn: Date
});

module.exports = mongoose.model("timeLine", TimeLineSchema);
