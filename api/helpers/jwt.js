// const expressJwt = require('express-jwt');


// function authJwt(){
//     const secret = process.env.JWT_KEY;
//     const api = process.env.API_URL;
//     return expressJwt({
//         secret,
//         algorithms: ['HS256'],
//         isRevoked: isRevoked
//     }).unless({
//         path: [
//         {url:/\/api\/eazy_cakes\/category(.*)/, methods: ['GET', 'OPTIONS']},
//         `${api}/users/login`,
//         `${api}/users/signup`,        
//         ]
//     })
// }

// async function isRevoked(req, payload, done){
//     if(!payload.isAdmin) {
//         done(null, true)
//     }

//     done();
// }



// module.exports = authJwt