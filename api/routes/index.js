const express = require("express");

const router = express.Router();

router.get("/", function (request, response) {
  response.json({ message: "Hello world!" });
});

router.use("/api/v1/auth", require("./auth.routes"));
router.use("/api/v1/dragon", require("./dragon.routes"));

module.exports = router;