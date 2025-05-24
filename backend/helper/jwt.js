var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.JSON_WEB_TOKEN_SECRET_KEY;
    return jwt({
        secret: secret,
        algorithms: ["HS256"]
    }).unless({
        path: [
            "/api/user/signin",
            "/api/user/signup"
        ] // These routes don't require authentication
    });
}

module.exports = authJwt;
