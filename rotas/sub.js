const rt = require("express").Router();

rt.post("/add/nego", (req, res) => {
  let { nomez, nuitx } = req.body;
  console.log(nomez, nuitx);
});

module.exports = rt;
