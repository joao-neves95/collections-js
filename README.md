﻿# js.system.collections
 
[![npm](https://img.shields.io/npm/v/js.system.collections.svg)](https://www.npmjs.com/package/js.system.collections)
[![LICENSE](https://img.shields.io/npm/l/merger-js.svg)](https://github.com/joao-neves95/js.system.collections/blob/master/LICENSE.md)

Vanilla JavaScript ES collections inspired by .NET for Node.js and the browser. <br>
It has been used in production, but keep in mind that **there are no tests**.

## Getting Started

### Install with NPM to use js.system.collections on Node.js

```
npm i js.system.collections
```

or

```
npm install js.system.collections
```

and use it like:

```
const { Dictionary, List } = require( 'js.system.collections' );
const myDict = new Dictionary();
const myList = new List();
```


### Use js.system.collections on the browser

```
<script src="js.system.collections.min.js"></script>
```

or

```
<script src="https://cdn.jsdelivr.net/gh/joao-neves95/js.system.collections/dist/js.system.collections.min.js"></script>
```

or

```
<script src="https://raw.githubusercontent.com/joao-neves95/js.system.collections/master/dist/js.system.collections.min.js"></script>
```


&nbsp;


## API

- Common properties and methods
  - length
  - isEmpty
  - get(index)
  - getAll()
  - clear()
  - removeFirst()
  - removeLast()

- Dictionary( uniqueKeys = false )
  - lastValue
  - getAllValues
  - add( key, value )
  - remove( key )
  - updateByKey( key, newValue )
  - updateByIndex( idx, newValue )
  - getByIndex( index )
  - getKeyByIndex( index )
  - getByKey( key )
  - findIndexOfKey( key )
  - forEachValue( Callback )

- List( valueType = 'any' ) [ <'string' | 'number' | 'int' | 'float' | 'boolean' | 'any'> ]
  - last
  - add( value )
  - contains( value )
  - update( index, value )
  - remove( index )
  - forEach( Callback )
