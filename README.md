# Why do i need buffers ?

JavaScript is good to handle strings, but when is needed to handle binary data... Not that good. Manipulate images, and binary files using only strings, it's insanity.

Node has a binary buffer, exposed by the class _Buffer_. The buffer length is specified in bytes, and you can randomly get and set those from it.

## Creating a buffer

```js
import { Buffer } from "node:buffer";
let buff = Buffer.from("Hello World");
```

The UTF-8 encoding is by default, you can create it from another encodings, long as you specify it in the second argument.

```js
let buff = Buffer.from("Hello World", "utf-8");
```

In case you want a certain amount of memory allocated, but don't have a value, you can specify the length of the buffer, without saying it's content, and then it's default filled with 0's

```js
let buff = Buffer.alloc(1024);
```

> There's a second optional argument that says the "filling" value, so if you can allocate 1024 bytes of '1', for example;

## Manipulating a buffer

To inspect and change it's contents access the byte value on any position of a buffer by using the [] operator.

```js
let buff = Buffer.from("Hello World");
console.log(buff[8]);
```

And to manipulate the content it's easy like that, give it an index and then assign it. For example, i wanna set the 19th byte to the value 249.

```js
buff[18] = 249;
```

To get the length of a given buffer, use the length property: `buff.length`, if a buffer has 100 bytes, 100 it is. And you can also use this length to iterate over the buffer.

## Slicing

You might wanna extract part of a buffer, and there's a method called `Buffer.subarray([start_index], [end_index])`.

It returns a new Buffer that references the same memory as the original, but offset and cropped by the _start_ and _end_ arguments. And it's important to know that the sliced part references the same memory as the original Buffer.

> Modifying the new Buffer slice, also modify the values in the original Buffer, cause they point at the same memory

> Specifying **_end_** greater than `buf.length` will return the same result as that of end equal to `buf.length` .

> The default value for _start_ is 0, and for _end_ is buff.length

```js
let buff = Buffer.from("Hello World");
let world_buff = buff.subarray(6);

console.log(buff.toJSON().data);
/*
-> [ 72, 101, 108, 108, 111,  32,  87, 111, 114, 108, 100 ]
*/

console.log(world_buff.toJSON().data);
// -> [ 87, 111, 114, 108, 100 ]
```

## Copying

It's also possible to copy part of a buffer into another buffer, use the method `Buffer.copy(target, targetstart, sourceStart, sourceEnd)`.

This method copies data from a region of a buff to a region in a target, even if the target memory region overlaps with buff. And this method returns the number of bytes copied.

### Params description

- `targetStart`: an integer that says where the target writing should begin. **Default: 0**;
- `sourceStart`: an integer that says from where copying from buffer should start at. **Default: 0**.
- `sourceEnd`: an integer that say where copying from buffer should stop at. **Default: `buff.length`**;

Now let's create a new buffer and transform "World" into "Worth". To do it, change the decimals in it. The equivalent decimals to "t" and "h" is 116 and 104.

```js
let buff = Buffer.from("Hello World");
let world_buffer = Buffer.alloc(5);

const TARGET_START = 0;
const SOURCE_START = 6;
const SOURCE_END = 11;

buff.copy(world_buffer, TARGET_START, SOURCE_START, SOURCE_END);

console.log(world_buffer.toJSON().data); // -> [ 87, 111, 114, 108, 100 ]

world_buffer[3] = 116;
world_buffer[4] = 104;

console.log(world_buffer.toJSON().data); // -> [ 87, 111, 114, 116, 104 ]

console.log(world_buffer.toString()); // -> "Worth"
console.log(buff.toString()); // -> "Hello World"
```

> When using `Buffer.subarray()` it's necessary to provide an existing buffer from which the data can be copied to it's allocated memory. The amount of data that can be copied is limited by the size of the buffer. For example, if your buffer consists of only 10 bytes, you can only copy a maximum of 10 bytes.

> As we allocated an additional 5 bytes of memory and copied the data into it, it's important to note that we now have two separate and independent buffers. Modifying one buffer does not affect the other.
