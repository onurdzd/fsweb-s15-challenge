const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decodedJWT) => {
        if (err) {
          res.status(401).json({
            message: "Token gecersizdir",
          });
        } else {
          req.decodedJWT = decodedJWT;
          next();
        }
      });
    }else{
      res.status(401).json(  {
        "message": "Token gereklidir"
      })
    }
  } catch (error) {
    next(error);
  }

  /*
    EKLEYİN

    1- Authorization headerında geçerli token varsa, sıradakini çağırın.

    2- Authorization headerında token yoksa,
      response body şu mesajı içermelidir: "token gereklidir".

    3- Authorization headerında geçersiz veya timeout olmuş token varsa,
	  response body şu mesajı içermelidir: "token geçersizdir".
  */
};
