import express from "express";
import { signup ,login,logout ,updateProfile } from "../controllers/authControllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router=express.Router();

router.use(arcjetProtection);

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/updateprofile",ProtectRoute,updateProfile);
router.get("/check",ProtectRoute,(req,res)=>{res.status(200).json(req.user)});
export default router;