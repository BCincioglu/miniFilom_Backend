const express = require("express");

const renterController = require("../controller/renter.js");

const router = express.Router();

router.get("/", renterController.getAllRenters);

router.get("/:id", renterController.getRenterById);

router.post("/",renterController.postRenter);

router.post("/:id", renterController.postUpdateRenter);

router.delete("/:id", renterController.postDeleteRenter);

module.exports = router;