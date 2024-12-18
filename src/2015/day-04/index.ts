import * as utils from "../utils";
import * as crypto from "crypto";

// const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `yzbqklnj`;

const md5 = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex").toString();

console.log(`::: Part 1 :::`);

let res = "";
let i = 0;
res = md5(`${testData}${i}`);
while (res.slice(0, 6) !== "000000") {
  i++;
  res = md5(`${testData}${i}`);
}

console.log(`Part 1: ${i}`);

console.log(`::: Part 2 :::`);

console.log(`Part 2: ${{}}`);
