"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const products_1 = require("../controllers/products");
const router = (0, express_1.Router)();
// register
router.post("/register", users_1.addNewUser);
// login
router.post("/login", users_1.loginUser);
// products
router.get("/products", products_1.getProducts);
// profile
router.patch('/category/:productId/like', products_1.likeProduct);
exports.default = router;
