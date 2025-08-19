import fs from "fs";
import path from "path";

const PRODUCTS_PATH = path.resolve(process.cwd(), "data", "products.json");

export function readProducts() {
  try {
    return JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf-8"));
  } catch (e) {
    console.error("Error reading products:", e);
    return [];
  }
}
