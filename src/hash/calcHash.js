import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const calculateHash = async () => {
const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    
    try {
        const hash = createHash('sha256');
        const readStream = createReadStream(filePath);
                await pipeline(
            readStream,
            hash
        );
        
        const hexHash = hash.digest('hex');
        console.log(hexHash);
        return hexHash;
    } catch (error) {
        console.error('Error calculating hash:', error.message);
        throw error;
    }
};

await calculateHash();
