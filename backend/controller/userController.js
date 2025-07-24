import userSchemaModel from "../module/usermodule.js";
import jsonwebtoken from "jsonwebtoken"
import "../module/connection.js";
import utility from "../core/utility.js"
import bcrypt from "bcrypt";
import common from '../core/validation/message.js'

export let signup = async (req, res) => {
  let { name, email, phone, password } = req.body;
  let userimg;
  if (req.files && req.files.img) {
    userimg = await utility.fileUpload(req.files.img, "")
  }
  let haspassword;
  if (password) {
    haspassword = await bcrypt.hash(password, 10);
  }

  let userdata = { ...req.body, "password": haspassword, "img": userimg }
  try {
    await userSchemaModel.create(userdata);
    res.send({ code: common.sucessCODE, msg: "data save" })
  } catch (error) {
    res.send({ "code": common.errorCODE, msg: "data not save" });
    console.log(error)
  }
}

export let userlogin = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await userSchemaModel.findOne({ "email": email });

    if (!user) {
      return res.send({
        code: common.errorCODE,
        msg: "The email address you entered isn't connected to an account. Please check your credentials and try again."
      })
    }
    let passwordcheck = await bcrypt.compare(password, user.password);

    if (!passwordcheck) {
      return res.send({
        code: common.errorCODE,
        msg: "Incorrect password. Please try again."
      })
    }
    let payload = { data: email }
    let key = process.env.KEY;

    let token = jsonwebtoken.sign(payload, key, { expiresIn: "48h" });

    user.token = token;//token login ke time gentare 
    await user.save();// db me save toga
    let userdata = {
      ...user._doc, // jo data user ka save hai bas wahi aaye ga
      password: undefined,
      token: token,
    }
    return res.send({ code:common.sucessCODE, "data": userdata, msg: "login successful" })
  } catch (error) {
    return res.send({
      code: common.errorCODE, msg: "An error occurred while processing your request.",
      error: error.message
    })

  }

}