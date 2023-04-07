const router = require('express').Router();
const mw=require("../middleware/middleware")
const Users=require("./auth-model")
const bcrypt = require('bcryptjs');
const restricted=require("../middleware/restricted")


router.get("/",async(req,res,next)=>{
  const users=await Users.getAll()
  res.status(200).json(users)
})

router.post('/register',mw.postIstegiGeçerlimi,mw.kullaniciAdiVarmi,async (req, res,next) => {
  try {
    let {username,password,role_name}=req.body
    !role_name ? role_name="user" : role_name=req.body.role_name
    const hashedPassword=bcrypt.hashSync(password,8) 
    const newUser=await Users.create({username:username,password:hashedPassword,role_name:role_name})
    res.status(201).json({id:newUser.id,username:newUser.username,password:newUser.password})
  } catch (error) {
    next(error)
  }
  /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.
    2^8 HASH TURUNU AŞMAYIN!

    1- Yeni bir hesap kaydetmek için istemci "kullanıcı adı" ve "şifre" sağlamalıdır:
      {
        "username": "Captain Marvel", // `users` tablosunda var olmalıdır
        "password": "foobar"          // kaydedilmeden hashlenmelidir
      }

    2- BAŞARILI kayıtta,
      response body `id`, `username` ve `password` içermelidir:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- Request bodyde `username` ya da `password` yoksa BAŞARISIZ kayıtta,
      response body şunu içermelidir: "username ve şifre gereklidir".

    4- Kullanıcı adı alınmışsa BAŞARISIZ kayıtta,
      şu mesajı içermelidir: "username alınmış".
  */
});

router.post('/login',mw.postIstegiGeçerlimi,mw.kullaniciBilgileriGecerlimi, (req, res,next) => {

  try {
    res.status(200).json({message:`Welcome, ${req.body.username}`,token:req.token})
  } catch (error) {
    next(error)
  }
  /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.

    1- Var olan bir kullanıcı giriş yapabilmek için bir `username` ve `password` sağlamalıdır:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- BAŞARILI girişte,
      response body `message` ve `token` içermelidir:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- req body de `username` ya da `password` yoksa BAŞARISIZ giriş,
      şu mesajı içermelidir: "username ve password gereklidir".

    4- "username" db de yoksa ya da "password" yanlışsa BAŞARISIZ giriş,
      şu mesajı içermelidir: "geçersiz kriterler".
  */
});

module.exports = router;
