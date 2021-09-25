import express from "express";
import accountController from "../controllers/AccountController";

const router = express.Router();

router.get("/", accountController.getAll);
router.get("/:id", accountController.get);

export default router;
