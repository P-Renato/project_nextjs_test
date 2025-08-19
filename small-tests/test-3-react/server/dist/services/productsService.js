"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readProducts = readProducts;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const PRODUCTS_PATH = path_1.default.resolve(process.cwd(), "data", "products.json");
function readProducts() {
    try {
        return JSON.parse(fs_1.default.readFileSync(PRODUCTS_PATH, "utf-8"));
    }
    catch (e) {
        console.error("Error reading products:", e);
        return [];
    }
}
