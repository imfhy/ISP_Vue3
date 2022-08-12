const jwt = require('jsonwebtoken');
const secret = "shuquyoukey";
const userInfo = {
    name: "TestUser",
}
const options = {
    expiresIn: 20 * 1, // 过期时间
    algorithm: 'HS256' 
}
const token = jwt.sign(userInfo, secret, options);
console.log(token)