# js.system.collections

[![npm](https://img.shields.io/npm/v/js.system.collections.svg)](https://www.npmjs.com/package/js.system.collections)
[![LICENSE](https://img.shields.io/npm/l/merger-js.svg)](https://github.com/joao-neves95/js.system.collections/blob/master/LICENSE.md)

Vanilla JavaScript ES collections inspired by .NET for Node.js and the browser.

&nbsp;

## Getting Started

### Install with NPM

```
npm i js.system.collections
```

or

```
npm install js.system.collections
```

### Import on the browser

```
<script src="path-to-dist-folder/js.system.collections.min.js"></script>
```

or

```
<script src="https://cdn.jsdelivr.net/gh/joao-neves95/js.system.collections/dist/js.system.collections.min.js"></script>
```

or

```
<script src="https://raw.githubusercontent.com/joao-neves95/js.system.collections/master/dist/js.system.collections.min.js"></script>
```

#### Use from the browser (using the `window` object)
```
const myDict = new Dictionary( true );
```

#### Use with CommonJS (For environments that support `module.exports`, like Node.js)
```
// Pointing to node_modules/ (Node.js), or dist/
const { Dictionary, List } = require( 'js.system.collections' );

const myList = new List( 'any' );
const myStringList = new List( 'string' );
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
  - getAllValues()
  - getAllKeys()
  - containsKey( key )
  - add( key, value )
  - removeByIndex( index )
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
