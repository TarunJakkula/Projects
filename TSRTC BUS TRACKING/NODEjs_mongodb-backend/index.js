const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const UserModel = require("./models/User");
const BusModel = require("./models/Bus");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://miniproject:miniproject@cluster0.lxxfc3p.mongodb.net/User?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const username = req.body.Username;
  const password = req.body.Password;
  const email = req.body.Email;
  const User = new UserModel({
    _id: username,
    Username: username,
    Password: password,
    Email: email,
    Bus: [2031, 102220314, 20314],
  });
  try {
    await User.save();
  } catch (err) {
    console.log(err);
  }
});

app.post("/read", async (req, res) => {
  const username = req.body.Username;
  const password = req.body.Password;
  UserModel.findOne({ Username: username, Password: password }).then(
    (response) => {
      if (response === null) {
        res.send("Error");
      } else {
        res.send(response);
      }
    }
  );
});

app.post("/details", async (req, res) => {
  const username = req.body.Username;
  const password = req.body.Password;
  UserModel.aggregate([
    { $match: { Username: username, Password: password } },
    {
      $lookup: {
        from: "busdetails",
        localField: "Bus",
        foreignField: "_id",
        as: "busDetails",
      },
    },
  ]).then((response) => {
    if (response === null) {
      res.send("Error");
    } else {
      res.send(response);
    }
  });
});

app.get("/buslist", async (req, res) => {
  BusModel.find({}).then((response) => {
    if (response === null) {
      res.send("Error");
    } else {
      res.send(response);
    }
  });
});

app.post("/updateProfile", async (req, res) => {
  const username = req.body.Username;
  const newpassword = req.body.newpassword;
  UserModel.updateOne(
    { _id: username },
    { $set: { Password: newpassword } }
  ).then((response) => res.send(response));
});

app.post("/removeList", async (req, res) => {
  const username = req.body.Username;
  const busnumber = req.body.busnumber;
  UserModel.updateOne({ _id: username }, { $pull: { Bus: busnumber } }).then(
    (response) => {
      if (response === null) {
        res.send("Error");
      } else {
        res.send(response);
      }
    }
  );
});

app.post("/addList", async (req, res) => {
  const username = req.body.Username;
  const busnumber = req.body.busnumber;
  UserModel.updateOne({ _id: username }, { $push: { Bus: busnumber } }).then(
    (response) => {
      if (response === null) {
        res.send("Error");
      } else {
        res.send(response);
      }
    }
  );
});

app.post("/fetchDetails", async (req, res) => {
  const id = req.body.id;
  BusModel.findOne({ _id: id }).then((response) => {
    if (response === null) {
      res.send("Error");
    } else {
      res.send(response);
    }
  });
});

app.post("/updateLocation", async (req, res) => {
  const id = req.body.id;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const time = req.body.time;
  BusModel.updateOne(
    { _id: id },
    { $set: { "Location.lat": lat, "Location.lon": lon, Updated: time } }
  ).then((response) => res.send(response));
});

app.post("/updateEmergency", async (req, res) => {
  const id = req.body.id;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const time = req.body.time;
  const reason = req.body.res;
  BusModel.updateOne(
    { _id: id },
    {
      $set: {
        "Emergency.lat": lat,
        "Emergency.lon": lon,
        "Emergency.Updated": time,
        "Emergency.reason": reason,
      },
    }
  ).then((response) => res.send(response));
});

app.listen(3001, () => {
  console.log("Server running on port 3001....");
});
