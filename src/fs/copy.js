import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const sourceDir = path.join(__dirname, "files");
  const targetDir = path.join(__dirname, "files_copy");

  try {
    try {
      await fs.access(sourceDir);
    } catch (error) {
      throw new Error("FS operation failed");
    }
    try {
      await fs.access(targetDir);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
    await fs.mkdir(targetDir);
    const files = await fs.readdir(sourceDir);
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      await fs.copyFile(sourcePath, targetPath);
    }
    console.log("Folder copied successfully!");
  } catch (error) {
    if (error.message === "FS operation failed") {
      throw error;
    }
    throw new Error("FS operation failed");
  }
};

(async () => {
  try {
    await copy();
  } catch (error) {
    console.error(error.message);
  }
})();
