import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const sourceFile = join(__dirname, 'files', 'fileToCompress.txt');
    const destinationFile = join(__dirname, 'files', 'archive.gz');
    try {
        const readStream = createReadStream(sourceFile);
        const gzipStream = createGzip();
        const writeStream = createWriteStream(destinationFile);
        await pipeline(readStream, gzipStream, writeStream);
        console.log('File successfully compressed!');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: Source file not found. Please make sure fileToCompress.txt exists in the files directory.');
        } else {
            console.error('Compression failed:', error.message);
        }
        throw error;
    }
  };

await compress();
