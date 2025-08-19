import {Router } from "express";
import { addNewUser, loginUser} from "../controllers/users";
import { getProducts, likeProduct  } from "../controllers/products";
const router = Router();


// register
router.post("/register", addNewUser);

// login
router.post("/login", loginUser);

// products
router.get("/products", getProducts);

// profile
router.patch('/category/:productId/like', likeProduct);

export default router;