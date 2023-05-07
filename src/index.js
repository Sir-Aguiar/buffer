import { Buffer } from 'node:buffer';
let buff = Buffer.from("Hello World")
let world_buff = buff.subarray(6)
console.log(buff.toJSON().data)
console.log(world_buff.toJSON().data)