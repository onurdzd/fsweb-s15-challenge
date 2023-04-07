// değişiklik yapmayın
const router = require('express').Router();
const Bilmece=require("./bilmeceler-model")
const mw=require("../middleware/middleware")
const jwt=require("jsonwebtoken")

router.get('/', async(req, res,next) => {
  try {
    const bilmeceler=await Bilmece.getAll()
    res.status(201).json(bilmeceler)
  } catch (error) {
    next(error)
  }
});

router.post("/",mw.adminYetkisi("admin"), async(req, res, next) => { 
 try {
  const token = req.headers.authorization;
  const decodedJWT = jwt.verify(token, process.env.SECRET);
  const newBilmece=await Bilmece.create(req.body.bilmece,decodedJWT.user_id)
  res.status(201).json(newBilmece)
 } catch (error) {
  next(error)
 }
});


module.exports = router;
