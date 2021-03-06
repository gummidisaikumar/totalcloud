const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TimeLine = require("../model/timeLine");

router.get("/", (req, res, next) => {
  TimeLine.find()
    .exec()
    .then(result => {
      console.log("result", result);
      if (result.length >= 0) {
        res.status(200).json({
          result: result,
          status: 200
        });
      } else {
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  console.log("data", req.body.data);
  let attribute = {};

  const data = req.body.data.map(item => {
    if (item.hasOwnProperty("attributes")) {
      attribute = {
        description: item.description ? item.description : '',
        bold: item.attributes.bold ? item.attributes.bold : false,
        italic: item.attributes.italic ? item.attributes.italic : false
      };
    }
    return (obj = {
      attributes: attribute ? attribute : null
    });
  });
  const timeLine = new TimeLine({
    _id: new mongoose.Types.ObjectId(),
    data: {
      data,
    },
    createdOn: Date()
  });
  timeLine
    .save()
    .then(result => {
      console.log("saved", result);
    })
    .catch(err => console.log(err));
  res.status(200).json({
    status: 200
  });
});

module.exports = router;
