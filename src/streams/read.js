import path from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const information = path.join(__dirname, "files", "fileToRead.txt");
  createReadStream(information).pipe(process.stdout);
};

await read();
