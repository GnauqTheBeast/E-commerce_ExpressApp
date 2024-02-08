const express = require("express");
const router = express.Router();
const HomeController = require("../../app/controllers/client/Home.controller");

router.get("/", HomeController.show);

module.exports = router;
