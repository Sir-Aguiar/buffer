import { Buffer } from 'node:buffer';
let buff = Buffer.from("Hello World");
let world_buffer = Buffer.alloc(5);

const TARGET_START = 0;
const SOURCE_START = 6;
const SOURCE_END = 11

buff.copy(world_buffer, TARGET_START, SOURCE_START, SOURCE_END)

console.log(world_buffer.toJSON().data) // [ 87, 111, 114, 108, 100 ]

world_buffer[3] = 116
world_buffer[4] = 104

console.log(world_buffer.toJSON().data) // -> [ 87, 111, 114, 116, 104 ]

console.log(world_buffer.toString()) // -> "Worth"
console.log(buff.toString()) // -> "Hello World"