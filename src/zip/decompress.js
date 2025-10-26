import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const sourceFile = join(__dirname, 'files', 'archive.gz');
  const destinationFile = join(__dirname, 'files', 'fileToCompress.txt');
   try {
        const readStream = createReadStream(sourceFile);
        const gunzipStream = createGunzip();
        const writeStream = createWriteStream(destinationFile);
        await pipeline(readStream, gunzipStream, writeStream);
        
        console.log('File successfully decompressed!');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: Compressed file not found. Please make sure archive.gz exists in the files directory.');
        } else {
            console.error('Decompression failed:', error.message);
        }
        throw error;
    }
};

await decompress();
