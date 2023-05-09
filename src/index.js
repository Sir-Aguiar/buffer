import { Buffer } from 'node:buffer';

const buff = Buffer.from('Hello World');
const worldBuffer = Buffer.alloc(5);

const TARGET_START = 0;
const SOURCE_START = 6;
const SOURCE_END = 11;

buff.copy(worldBuffer, TARGET_START, SOURCE_START, SOURCE_END);

console.log(worldBuffer.toJSON().data); // [ 87, 111, 114, 108, 100 ]

worldBuffer[3] = 116;
worldBuffer[4] = 104;

console.log(worldBuffer.toJSON().data); // -> [ 87, 111, 114, 116, 104 ]

console.log(worldBuffer.toString()); // -> "Worth"
console.log(buff.toString('base64')); // -> "Hello World"
