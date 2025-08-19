"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLikes = readLikes;
exports.writeLikes = writeLikes;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const LIKES_PATH = path_1.default.resolve(process.cwd(), "data", "likes.json");
function readLikes() {
    try {
        if (!fs_1.default.existsSync(LIKES_PATH)) {
            fs_1.default.mkdirSync(path_1.default.dirname(LIKES_PATH), { recursive: true });
            fs_1.default.writeFileSync(LIKES_PATH, "{}");
        }
        return JSON.parse(fs_1.default.readFileSync(LIKES_PATH, "utf-8"));
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
