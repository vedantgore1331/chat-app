import express from 'express';
import {googlelogin ,login, register, setavatar,getallusers,fblogin } from '../controllers/usersController.js';
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/googlelogin",googlelogin);
router.post("/fblogin",fblogin);
router.post("/setavatar/:id",setavatar);
router.get("/getallusers/:id",getallusers)

export default router;