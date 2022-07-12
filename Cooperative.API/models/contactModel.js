const mongoose = require("mongoose");
const Joi = require("joi");

let contactSchema = new mongoose.Schema({
    date_created:{
        type:Date,default:Date.now()
    },
    name:String,
    phone:String,
    msg:String
})

exports.contactModel = mongoose.model("contacts",contactSchema);

exports.validateContact = (_bodyReq) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    phone:Joi.string().min(2).max(99).required(),
    msg:Joi.string().min(2).max(99).required(),
  })
  return joiSchema.validate(_bodyReq);
}