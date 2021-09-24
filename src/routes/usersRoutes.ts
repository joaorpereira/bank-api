import express from "express";
import userController from "../controllers/UserController";

const router = express.Router();

router.get("/", userController.getAll);
router.post("/login", userController.login);
router.post("/create", userController.create);
router.put("/edit", userController.update);
router.get("/:id", userController.get);
router.delete("/:id", userController.delete);

export default router;
