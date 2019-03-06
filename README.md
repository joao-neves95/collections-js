# js.system.collections

Vanilla JavaScript ES collections inspired by .NET for Node.js and the browser. <br>
This is a beta version. It has been used in production, but **it has no tests**.

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

&nbsp;

## API

- Common properties and methods
  - length
  - isEmpty
  - getAll()
  - clear()

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
  - remove( index )
  - forEach( Callback )
