const express = require("express");
const router = express.Router();
const Visitor = require("../model/visitor");

const {createVisitor}= require("../controller/visitor");

router.post("/create", createVisitor);


module.exports = router;