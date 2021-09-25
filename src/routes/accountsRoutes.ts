/*
  @openapi
   components:
     schemas:
       Account:
         type: object
         required:
           - id
           - user_id
           - user_name
           - balance
         properties:
           id:
             type: integer
             description: The auto-generated id of the book.
           user_id:
             type: string
             description: User ID.
           user_name:
             type: string
             description: User name.
           balance:
             type: boolean
             description: Balance of selected user.
         example:
            id: 43c1c6b0-9809-49f3-85b2-3000302c7db8
            user_id: 44335131-9c13-475e-c24b-9ea961e2a4ed
            user_name: Dave Thomas
            balance: 3000
*/

import express from "express";
import accountController from "../controllers/AccountController";

const router = express.Router();

router.get("/", accountController.getAll);
router.get("/:id", accountController.get);

export default router;
