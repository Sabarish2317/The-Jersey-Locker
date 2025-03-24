import express from "express";
import {
  addJersey,
  getJerseys,
  editJersey,
  deleteJersey,
} from "../controller/jersey.controller.js";
import verifyAdmin from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", getJerseys);
router.post("/add", verifyAdmin, addJersey);
router.put("/:id", verifyAdmin, editJersey);
router.delete("/:id", verifyAdmin, deleteJersey);

export default router;
