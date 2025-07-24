import Path from 'path';
import common from '../core/validation/message.js';
import jwt from 'jsonwebtoken';
import userSchemaModel from '../module/usermodule.js';
import dotenv from "dotenv";
dotenv.config();
const Utiltiy = {};
let key = process.env.KEY;

var loginrequest = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.send({ success: false, code: 500, msg: 'Unauthorized user!'});
    }
};

Utiltiy.jwtAuth = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    var withOutLoginArr = common.withOutLoginArr;
    let urlStatus = false;

    if (withOutLoginArr.indexOf(req._parsedUrl.pathname) >= 0) {
        if (!req.header.authorization) {
            next();
        } else {
            urlStatus = true;
        }

    } else {
        urlStatus = true;

    }
    if (urlStatus) {

        if (req.headers && req.headers.authorization) {
            const bearerToken = req.headers.authorization;
            const token = bearerToken && bearerToken.split(" ")[1];  // ✅ Extract actual token
           
            jwt.verify(token, key, async (err, decode) => {
                if (err) {
                    req.user = undefined;
                    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
                        return res.send({ success: false, code: 402, msg: common.loginTokenMsg, err });
                    } else {
                        loginrequest(req, res, next);
                    }
                } else {
                    req.user = decode;

                    let userData = await userSchemaModel.findOne({token:token});

                    if (userData) {
                        req.user.userData = userData;
                        loginrequest(req, res, next);
                    } else {
                        return res.send({ success: false, code: 402, msg: common.loginTokenMsg });
                    }


                }
            })
        } else {
            req.user = undefined;
            loginrequest(req, res, next);
        }
    }

}
Utiltiy.fileUpload = async (data, foldername) => {
    if (data) {
        const imgdata = Array.isArray(data) ? data : [data];
        for (let file of Object.values(imgdata)) {
            const { name } = file;
            const ext = name.split('.').pop();
            let dt = Date.now();
            let NewImg = "image" + dt + '.' + ext;
            let filepath = 'upload/' + foldername + '/' + NewImg;
            var createdPath = 'upload/' + foldername + '/' + NewImg;
            await file.mv(Path.join(filepath))
        }
        return createdPath;
    }
}
export default Utiltiy;