import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const sourceFile = path.join(__dirname, "files", "wrongFilename.txt");
  const targetFile = path.join(__dirname, "files", "properFilename.md");

  try {
    try {
      await fs.access(sourceFile);
    } catch (error) {
      throw new Error("FS operation failed");
    }
    try {
      await fs.access(targetFile);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
    await fs.rename(sourceFile, targetFile);
    console.log("File renamed successfully!");
  } catch (error) {
    if (error.message === "FS operation failed") {
      throw error;
    }
    throw new Error("FS operation failed");
  }
};

(async () => {
  try {
    await rename();
  } catch (error) {
    console.error(error.message);
  }
})();
