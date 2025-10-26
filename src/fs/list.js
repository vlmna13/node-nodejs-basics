import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  const folderPath = path.join(__dirname, "files");
  try {
    const files = await fs.readdir(folderPath);
    console.log(files);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

(async () => {
  try {
    await list();
  } catch (error) {
    console.error(error.message);
  }
})();
