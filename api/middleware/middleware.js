const Users = require("../auth/auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let jwtKey = process.env.SECRET;

const kullaniciAdiVarmi = async (req, res, next) => {
  try {
    const isValid = await Users.getBy({ username: req.body.username });
    if (isValid) {
      next({
        status: 400,
        message: "username alınmış",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const postIstegiGeçerlimi = (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      next({
        status: 400,
        message: "username ve şifre gereklidir",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const kullaniciBilgileriGecerlimi = async (req, res, next) => {
  try {
    const isValidUser = await Users.getBy({ username: req.body.username });
    const isValidPassword =isValidUser && bcrypt.compareSync(
      req.body.password,
      isValidUser.password
    );
    if (isValidUser && isValidPassword) {
      let token = jwt.sign(
        {
          username: isValidUser.username,
          role: isValidUser.role,
        },
        jwtKey,
        { expiresIn: "1h" }
      );
      req.token = token;
      next();
    } else if (!isValidUser || !isValidPassword) {
      next({
        status: 400,
        message: "geçersiz kriterler",
      });
    } else {
      next({
        status: 400,
        message: "geçersiz kriterler",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  kullaniciAdiVarmi,
  postIstegiGeçerlimi,
  kullaniciBilgileriGecerlimi,
};
