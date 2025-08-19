import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const PRODUCTS_PATH = path.resolve(__dirname, "../../data/products.json");
const LIKES_PATH = path.resolve(__dirname, "../../data/likes.json");

console.log("Looking for products.json at:", PRODUCTS_PATH);

function readProducts() {
  try {
    return JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf-8"));
  } catch (e) {
    console.error("Error reading products:", e);
    return [];
  }
}

function readLikes() {
  try {
    if (!fs.existsSync(LIKES_PATH)) {
      fs.writeFileSync(LIKES_PATH, '{}');
    }
    return JSON.parse(fs.readFileSync(LIKES_PATH, 'utf-8'));
  } catch (e) {
    console.error("Error reading likes:", e);
    return {};
  }
}

export const getProducts = (req: Request, res: Response) => {
    console.log("GET /api/products hit!");

  const products = readProducts();
  const likes = readLikes();

  const merged = products.map((prod: any) => ({
    ...prod,
    likes: likes[prod.id] || 0,
  }));

  res.json(merged);
};
