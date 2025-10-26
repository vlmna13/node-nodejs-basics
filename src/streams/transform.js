import { Transform } from "stream";
import { pipeline } from "stream/promises";

const transform = async () => {
  class ReverseTransform extends Transform {
    _transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split("").reverse().join("");
      this.push(reversed);
      callback();
    }
  }

  await pipeline(process.stdin, new ReverseTransform(), process.stdout);
};

await transform();
