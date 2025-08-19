"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const PRODUCTS_PATH = path_1.default.resolve(__dirname, "../../data/products.json");
const LIKES_PATH = path_1.default.resolve(__dirname, "../../data/likes.json");
console.log("Looking for products.json at:", PRODUCTS_PATH);
function readProducts() {
    try {
        return JSON.parse(fs_1.default.readFileSync(PRODUCTS_PATH, "utf-8"));
    }
    catch (e) {
        console.error("Error reading products:", e);
        return [];
    }
}
function readLikes() {
    try {
        if (!fs_1.default.existsSync(LIKES_PATH)) {
            fs_1.default.writeFileSync(LIKES_PATH, '{}');
        }
        return JSON.parse(fs_1.default.readFileSync(LIKES_PATH, 'utf-8'));
    }
    catch (e) {
        console.error("Error reading likes:", e);
        return {};
    }
}
const getProducts = (req, res) => {
    console.log("GET /api/products hit!");
    const products = readProducts();
    const likes = readLikes();
    const merged = products.map((prod) => (Object.assign(Object.assign({}, prod), { likes: likes[prod.id] || 0 })));
    res.json(merged);
};
exports.getProducts = getProducts;
