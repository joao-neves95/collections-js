# collections-js

Vanilla JavaScript ES collections inspired by .NET for Node.js and the browser. <br>
This is an alpha version. It has been used in production, but **it has no tests**.

## Getting Started

### Install with NPM to use collections-js on Node.js


```
npm i collections-js
```
or 


```
npm install collections-js
```

and use it like:

```
const { Dictionary, List } = require('collections-js');
const myDict = new Dictionary();
const myList = new List();
```

### Use collections-js on the browser

```
<script src="collections-js.min.js"></script>
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
