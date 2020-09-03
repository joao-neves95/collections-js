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

#### **List( type )**
```
  /**
  * @param {String} type The Type of the list.
  * ('string' | 'number' | 'int' | 'float' | 'boolean' | 'any')
  * Default: 'any'.
  */
  List(type)
```

- **length**
  ```
  .length
  ```

- **clear()**
  ```
  /**
   * Sets the array storage value to null and creates a new one.
   * ~O(1)
   */
  .clear()
  ```

- **clearSafe()**
  ```
  /**
   * Pops every element of the array storage,
   * maintaining the same underling array store.
   * O(n)
   */
  .clearSafe()
  ```

- **last**
    ```
    /**
        * Returns the last element of the List or false.
        *
        * @returns { any }
        */
    .last
    ```

- **getAll()**
    ```
    /**
     * Get all elements from the Collection.
     * For Dictionary is best to use .getAllValues()
     *
     * Returns elements[]
     */
    .getAll()
    ```

- **get( index )**
    ```
    /**
     * Get an item from the Collection by index.
     * In of beeing a Dictionary it will retun an object containing the key and value ( { key: value } )
     *
     * @param { number | false } index
     */
    .get( index )
    ```

- **contains( value )**
    ```
    /**
     * Returns true if the List contains at least one value,
     * or false if it does not.
     *
     * @param {any} value
     */
    .contains( value )
    ```

- **add( value )**
    ```
    /**
      * Add a new item to the List<T>.
      * @param { any } value
      */
    .add( value )
    ```

- **update( index, value )**
    ```
    /**
      * Update an item by index.
      *
      * @param { any } value
      */
    .update( index, value )
    ```

- **remove( index )**
    ```
    /**
     * Remove an new item from the List<T> by index.
     *
     * @param { Number } index
     */
    .remove( index )
    ```

- **removeFirst()**
  ```
  .removeFirst()
  ```

- **removeLast()**
  ```
  .removeLast()
  ```

- **forEach( index )**
  ```
  /**
   * Remove an new item from the List<T> by index.
   *
   * @param { Function } Callback f(item)
   */
  .forEach( Callback )
  ```

#### **Dict()**

- **count**
  ```
  /**
   * The count of actual items.
   * O(1)
   */
  .count
  ```

- **length**
  ```
  /**
   * The current length of the underlying hashtable.
   * O(1)
   */
  .length
  ```

- **clear()**
  ```
  /**
   * Sets the array storage value to null and creates a new one.
   * ~O(1)
   */
  .clear()
  ```

- **clearSafe()**
  ```
  /**
   * Pops every element of the array storage,
   * maintaining the same underling array store.
   * O(n)
   */
  .clearSafe()
  ```

- **getAllValues()**
  ```
  /**
   * Returns an array with all the dictionary's values.
   * O(n)
   * 
   * @returns { any[] }
   */
  .getAllValues()
  ```

- **getAllKeys()**
  ```
  /**
   * Returns an array with all the dictionary's keys.
   * O(n)
   *
   * @returns { any[] }
   */
  .getAllKeys()
  ```

- **getHashedKey( key )**
  ```
  /**
   * Returns the current hashed key of an item or false if not found.
   * ~O(1)
   *
   * @param { number | string } key
   *
   * @returns { any | undefined } The value or undefined.
   */
  .getHashedKey( key )
  ```

- **getValue( key )**
  ```
  /**
   * Returns the value by key (volatile) or false if not found.
   * ~O(1)
   *
   * @param { number | string } key
   *
   * @returns { any | undefined } The value or undefined.
   */
  .getValue( key )
  ```

- **getIndexVal( key )**
  ```
  /**
   * ~O(1)
   * 
   * @param { number | string } key
   * 
   * @returns { [number, any] | undefined } [index, value]
   */
  .getIndexVal( key )
  ```

- **containsKey( key )**
  ```
  /**
   * ~O(1)
   *
   * @param { number | string } key
   *
   * @returns { bool }
   */
  .containsKey( key )
  ```

- **add( key, value )**
  ```
  /**
   * O(1), worst case O(n)
   * 
   * @param { string | number } key
   * @param { any } value
   * 
   * @returns { number | false } The new index or false.
   */
  .add( key, value )
  ```

- **remove( key )**
  ```
  /**
   * Removes an item from the Dictionary with the provided key.
   * O(1), worst case O(n)
   * 
   * @param { string | number } key
   *
   * @return { number | false } The index or false.
   */
  .remove( key )
  ```

- **update( key, newValue )**
  ```
  /**
   * Updates an item in the Dictionary with the provided key.
   * ~O(1)
   *
   * @param { string | number } key
   * @param { any } newValue
   *
   * @return { bool }
   */
  .update( key, newValue )
  ```

- **forEachValue( Callback )**
  ```
  /**
   * O(n)
   * 
   * @param { Function } Callback (value)
   */
  .forEachValue( Callback )
  ```

#### **Dictionary( uniqueKeys = false )**

- **length**
  ```
  .length
  ```

- **clear()**
  ```
  /**
   * Sets the array storage value to null and creates a new one.
   * ~O(1)
   */
  .clear()
  ```

- **clearSafe()**
  ```
  /**
   * Pops every element of the array storage,
   * maintaining the same underling array store.
   * O(n)
   */
  .clearSafe()
  ```

- **getAllValues()**
  ```
  .getAllValues()
  ```

- **getAllKeys()**
  ```
  /**
   * Returns an array with all the dictionary's keys.
   * O(n)
   *
   * @returns { any[] }
   */
  .getAllKeys()
  ```

- **lastValue**
  ```
  /**
   * Returns the last element of the Dictionary or false.
   * O(1)
   *
   * @returns { any[] }
   */
  .lastValue
  ```

- **containsKey( key )**
  ```
  /**
   * O(n)
   * 
   * @param { any } key
   * 
   * @returns { boolean }
   */
  .containsKey( key )
  ```

- **getByIndex( index )**
  ```
  /**
   * Get a value with its index. Returns an array with the values.
   * O(1)
   *
   * @param { number } index
   *
   * @returns { any | false }
   */
  .getByIndex( index )
  ```

- **getKeyByIndex( index )**
  ```
  /**
   * Get a key by its index.
   * O(1)
   *
   * @param { number } index
   *
   * @returns { any | false }
   */
  .getKeyByIndex( index )
  ```

- **getByKey( key )**
  ```
  /**
   * Returns the value by key or false if not found.
   * O(n)
   *
   * @param { any } key
   *
   * @returns { any | false }
   */
  .getByKey( key )
  ```

- **findIndexOfKey( key )**
  ```
  /**
   * Returns the index of the provided key, or false if not found.
   * O(n)
   *
   * @param {any} key
   *
   * @returns { number | false }
   */
  .findIndexOfKey( key )
  ```

- **add( key, value )**
  ```
  /**
   * O(n)
   * 
   * @param { any } key
   * @param { any } value
   */
  .add( key, value )
  ```

- **removeFirst()**
  ```
  .removeFirst()
  ```

- **removeLast()**
  ```
  .removeLast()
  ```

- **removeByIndex( index )**
  ```
  /**
   * Removes an item from the Dictioary by index.
   * O(1)
   * 
   * @param { number } index
   */
  .removeByIndex( index )
  ```

- **remove( key )**
  ```
  /**
   * Removes an item from the Dictionary with the provided key.
   * O(n)
   * 
   * @param { any } key
   *
   * @return { bool }
   */
  .remove( key )
  ```

- **updateByKey( key, newValue )**
  ```
  /**
   * Updates an item in the Dictionary with the provided key.
   * O(n)
   *
   * @param { any } key
   * @param { any } newValue
   *
   * @return { bool }
   */
  .updateByKey( key, newValue )
  ```

- **updateByIndex( idx, newValue )**
  ```
  /**
   * Updates an item in the Dictionary with the provided index.
   * O(1)
   *
   * @param { any } key
   * @param { any } newValue
   *
   * @returns { bool }
   */
  .updateByIndex( idx, newValue )
  ```

- **forEachValue( Callback )**
  ```
  /**
   * O(n)
   * 
   * @param { Function } Callback (value)
   */
  .forEachValue( Callback )
  ```
