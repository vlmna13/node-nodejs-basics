import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const file = path.join(__dirname, "files", "fileToWrite.txt");
  process.stdin.pipe(createWriteStream(file));
};

await write();
