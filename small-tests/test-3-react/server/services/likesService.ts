import fs from "fs";
import path from "path";

const LIKES_PATH = path.resolve(process.cwd(), "data", "likes.json");

export function readLikes() {
  try {
    if (!fs.existsSync(LIKES_PATH)) {
      fs.mkdirSync(path.dirname(LIKES_PATH), { recursive: true });
      fs.writeFileSync(LIKES_PATH, "{}");
    }
    return JSON.parse(fs.readFileSync(LIKES_PATH, "utf-8"));
  } catch (e) {
    console.error("Error reading likes:", e);
    return {};
  }
}

export function writeLikes(data: any) {
  try {
    fs.writeFileSync(LIKES_PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error writing likes:", e);
  }
}
