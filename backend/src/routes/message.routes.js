import express from "express";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage ,} from "../controllers/message.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";


const router =express.Router();
router.use(arcjetProtection,ProtectRoute);

router.get("/contacts",getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id",getMessagesByUserId);
router.post("/send/:id",sendMessage);

export default router;