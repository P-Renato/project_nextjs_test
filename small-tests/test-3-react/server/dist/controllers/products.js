"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeProduct = exports.getProducts = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const PRODUCTS_PATH = path_1.default.resolve(process.cwd(), 'data', 'products.json');
const LIKES_PATH = path_1.default.resolve(process.cwd(), 'data', 'likes.json');
function ensureProductsExist() {
    if (!fs_1.default.existsSync(PRODUCTS_PATH)) {
        return (0, node_fetch_1.default)('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
            fs_1.default.mkdirSync(path_1.default.dirname(PRODUCTS_PATH), { recursive: true });
            fs_1.default.writeFileSync(PRODUCTS_PATH, JSON.stringify(data, null, 2));
        });
    }
    return Promise.resolve();
}
function readLikes() {
    try {
        if (!fs_1.default.existsSync(LIKES_PATH)) {
            fs_1.default.mkdirSync(path_1.default.dirname(LIKES_PATH), { recursive: true });
            fs_1.default.writeFileSync(LIKES_PATH, '{}');
        }
        return JSON.parse(fs_1.default.readFileSync(LIKES_PATH, 'utf-8'));
    }
    catch (e) {
        console.error("Error reading likes:", e);
        return {};
    }
}
function writeLikes(data) {
    try {
        fs_1.default.writeFileSync(LIKES_PATH, JSON.stringify(data, null, 2));
    }
    catch (e) {
        console.error("Error writing likes:", e);
    }
}
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ensureProductsExist();
    const products = JSON.parse(fs_1.default.readFileSync(PRODUCTS_PATH, 'utf-8'));
    const likes = readLikes();
    const merged = products.map((prod) => (Object.assign(Object.assign({}, prod), { likes: likes[prod.id] || 0 })));
    res.json(merged);
});
exports.getProducts = getProducts;
const likeProduct = (req, res) => {
    const productId = req.params.productId;
    const likesData = readLikes();
    likesData[productId] = (likesData[productId] || 0) + 1;
    writeLikes(likesData);
    res.json({ likes: likesData[productId] });
};
exports.likeProduct = likeProduct;
