const express = require("express");

const renterController = require("../controller/renter.js");
const { isAuth } = require("../Middleware/authMiddleware.js");

const router = express.Router();

router.get("/", isAuth, renterController.getAllRenters);

router.get("/:id", isAuth, renterController.getRenterById);

router.post("/", isAuth, renterController.postRenter);

router.post("/:id", isAuth, renterController.postUpdateRenter);

router.delete("/:id", isAuth, renterController.postDeleteRenter);

module.exports = router;