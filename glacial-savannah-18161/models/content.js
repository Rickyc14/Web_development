var mongoose = require("mongoose");

var express            = require("express");

//****


var ContentSchema = new mongoose.Schema({
   title: String,
   content: String
});

module.exports = mongoose.model("Content", ContentSchema);
