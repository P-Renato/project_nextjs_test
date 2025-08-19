import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import fetch from 'node-fetch'; 

const PRODUCTS_PATH = path.resolve(process.cwd(), 'data', 'products.json');
const LIKES_PATH = path.resolve(process.cwd(), 'data', 'likes.json');

function ensureProductsExist() {
  if (!fs.existsSync(PRODUCTS_PATH)) {
    return fetch('https://all-apis.com/products?limit=60')
      .then(res => res.json())
      .then(data => {
        fs.mkdirSync(path.dirname(PRODUCTS_PATH), { recursive: true });
        fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(data, null, 2));
      });
  }
  return Promise.resolve();
}

function readLikes() {
  try {
    if (!fs.existsSync(LIKES_PATH)) {
      fs.mkdirSync(path.dirname(LIKES_PATH), { recursive: true });
      fs.writeFileSync(LIKES_PATH, '{}');
    }
    return JSON.parse(fs.readFileSync(LIKES_PATH, 'utf-8'));
  } catch (e) {
    console.error("Error reading likes:", e);
    return {};
  }
}

function writeLikes(data: any) {
  try {
    fs.writeFileSync(LIKES_PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error writing likes:", e);
  }
}

export const getProducts = async (req: Request, res: Response) => {
  await ensureProductsExist();

  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'));
  const likes = readLikes();

  const merged = products.map((prod: any) => ({
    ...prod,
    likes: likes[prod.id] || 0,
  }));

  res.json(merged);
};

export const likeProduct = (req: Request, res: Response) => {
  const productId = req.params.productId;
  const likesData = readLikes();

  likesData[productId] = (likesData[productId] || 0) + 1;
  writeLikes(likesData);

  res.json({ likes: likesData[productId] });
};
