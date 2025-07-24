import mongoose from "mongoose";

let userModel = mongoose.Schema({
    "name":{
        type:String
    },
    "email":{
        type:String
    },
    "phone":{
        type:String
    },
    "password":{
        type:String
    },
    "img":{
        type:String
    },
    token: {
        type: String,
        default: ""
    },
},{"timestamps":true});

let userSchemaModel = mongoose.model('usercollection',userModel)

export default userSchemaModel;