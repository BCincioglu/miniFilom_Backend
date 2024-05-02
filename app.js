const express = require("express");
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://bcc1nc1oglu:T7dXu3K18Vt79E2R@cluster0.9djsobr.mongodb.net/miniFilom"

const app = express();

// CORS çözümü
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


const rentalRouter = require("../miniFilom 2/route/rental.js");
const renterRouter = require("../miniFilom 2/route/renter.js");
const vehicleRouter = require("../miniFilom 2/route/vehicle.js");
const { deneme } = require("./Middleware/ScheduledThings.js");

app.use(express.json());
app.use('/vehicle', vehicleRouter);
app.use('/renter', renterRouter);
app.use('/rental', rentalRouter);
 

const PORT = process.env.PORT || 3000; 


mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: false })
  .then((result) => {
    app.listen(PORT);
    console.log(PORT);
  })
  .catch((err) => {
    console.log(err);
  });