# Por que eu preciso de buffers?

O JavaScript é bom para lidar com strings, mas quando é necessário lidar com dados binários... não é tão eficiente. Manipular imagens e arquivos binários usando apenas strings é uma insanidade.

O Node possui um buffer binário, exposto pela classe _Buffer_. O comprimento do buffer é especificado em bytes, e você pode acessar e definir esses bytes de forma aleatória.

## Criando um buffer


```js
import { Buffer } from "node:buffer";
let buff = Buffer.from("Hello World");
```

A codificação UTF-8 é a padrão, você pode criar um buffer a partir de outras codificações, desde que especifique no segundo argumento.

```js
let buff = Buffer.from("Hello World", "utf-8");
```

Em caso de desejar alocar uma determinada quantidade de memória, mas não ter um valor, você pode especificar o comprimento do buffer sem definir o seu conteúdo, e ele será preenchido por padrão com 0's.


```js
let buff = Buffer.alloc(1024);
```

> Existe um segundo argumento opcional que define o valor de "preenchimento", então você pode alocar, por exemplo, 1024 bytes preenchidos com '1';

## Manipulando um buffer

Para inspecionar e alterar o seu conteúdo, acesse o valor do byte em qualquer posição do buffer usando o operador [].

```js
let buff = Buffer.from("Hello World");
console.log(buff[8]);
```


E para manipular o conteúdo, é fácil assim: dê um índice e, em seguida, atribua um valor. Por exemplo, se eu quero definir o 9º byte com o valor 249.

```js
buff[8] = 249;
```

Para obter o comprimento de um determinado buffer, use a propriedade length: `buff.length`. Se um buffer tem 100 bytes, seu comprimento é 100. E você também pode usar esse comprimento para iterar sobre o buffer.

## Slicing

Às vezes você pode querer extrair uma parte de um buffer, e há um método chamado `Buffer.subarray([start_index], [end_index])`.

Ele retorna um novo buffer que faz referência à mesma memória do original, mas deslocado e recortado pelos argumentos _start_ e _end_. É importante saber que a parte fatiada faz referência à mesma memória do buffer original.

> Modificar a nova parte fatiada do buffer também modifica os valores no buffer original, pois eles apontam para a mesma memória.

> Especificar **_end_** maior que `buf.length` retornará o mesmo resultado que especificar _end_ igual a `buf.length`.

> O valor padrão para _start_ é 0 e para _end_ é buff.length.

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

## Copiando

Também é possível copiar parte de um buffer para outro buffer usando o método `Buffer.copy(target, targetstart, sourceStart, sourceEnd)`.

Este método copia dados de uma região de um buffer para uma região em um alvo, mesmo que a região de memória do alvo se sobreponha ao buffer. Este método retorna o número de bytes copiados.

### Descrição dos parâmetros

- `targetStart`: um número inteiro que indica onde a escrita no alvo deve começar. **Padrão: 0**;
- `sourceStart`: um número inteiro que indica de onde a cópia do buffer deve começar. **Padrão: 0**.
- `sourceEnd`: um número inteiro que indica onde a cópia do buffer deve parar. **Padrão: `buff.length`**;

Agora vamos criar um novo buffer e transformar "World" em "Worth". Para fazer isso, vamos copiar os índices de 6 a 11. Na cópia, vamos alterar os valores decimais correspondentes a "t" e "h", que são 116 e 104.

```js
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
console.log(buff.toString()); // -> "Hello World"

```

> Ao usar `Buffer.copy()`, é necessário fornecer um buffer existente a partir do qual os dados podem ser copiados para a memória alocada. A quantidade de dados que pode ser copiada é limitada pelo tamanho do buffer. Por exemplo, se o seu buffer consistir em apenas 10 bytes, você só poderá copiar no máximo 10 bytes.

> Como alocamos mais 5 bytes de memória e copiamos os dados nele, é importante observar que agora temos dois buffers separados e independentes. A modificação de um buffer não afeta o outro.

