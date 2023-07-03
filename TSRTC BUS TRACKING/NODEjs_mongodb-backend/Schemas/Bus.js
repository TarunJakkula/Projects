const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  BusNumber: {
    type: String,
  },
  Location: {
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
  Updated: {
    type: String,
  },
  StartLocation: {
    type: String,
  },
  EndLocation: {
    type: String,
  },
  Locations: [
    {
      Loc: {
        lat: Number,
        lon: Number,
      },
      area: String,
    },
  ],
  Emergency: {
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
    Updated: {
      type: String,
    },
    reason: {
      type: String,
    },
  },
  path: {
    type: [Array],
  },
});

const Bus = mongoose.model("BusDetails", BusSchema);
module.exports = Bus;
