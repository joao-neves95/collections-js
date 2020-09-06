/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

// Temporary.
// @import './lib/errors'
// @import './lib/collectionBase'
// @import './lib/collection'
// @import './lib/list'
// @import './lib/dictionary'
// @import './lib/dict'
// @import './lib/dictionaryObj'

/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

( function ( root, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'errors', [], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    module.exports['Errors'] = factory();

  } else {
    // Browser.
    root.Errors = factory();
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function () {

  class Errors {
    static get existingKey() { throw new Error( 'An item with the same key has already been added.' ); };

    static get noTypeProvided() { throw new Error( 'No type provided on Collection instantiation.' ); };

    static get notInteger() { throw new Error( `The value is not an integer` ); };

    static wrongType( type ) { throw new Error( `The value is not from the same type as the List<${type}>` ); };

    static get codeEmpty() { return '&C-EMPTY'; };
  }

  return Errors;
} );

/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

( function ( root, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'CollectionBase', ['errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    module.exports['CollectionBase'] = factory( require( './js.system.collections' )['Errors'] );

  } else {
    // Browser.
    root.CollectionBase = factory( root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( Errors ) {

  class CollectionBase {

    constructor( uniqueKeys = false, type = 'any' ) {
      this.elements = [];
      this.uniqueKeys = uniqueKeys;

      if ( !type ) throw Errors.noTypeProvided;
      this.type = type;
    }

    get length() {
      return this.elements.length;
    }

    get isEmpty() {
      return this.length === 0;
    }

    /**
     * Sets the array storage value to null and creates a new one.
     * ~O(1)
     * 
     */
    clear() {
      this.elements = null;
      this.elements = [];

      if ( this.____currentLength !== undefined ) {
        this.____currentLength = 0;
      }
    }

    /**
     * Pops every element of the array storage,
     * maintaining the same underling array store.
     * O(n)
     * 
     */
    clearSafe() {
      while ( this.elements.length ) {
        this.elements.pop();
      }

      if ( this.____currentLength !== undefined ) {
        this.____currentLength = 0;
      }
    }

    /**
     * (private)
     */
    __forEach( Callback ) {
      for ( let i = 0; i < this.elements.length; ++i ) {
        Callback( this.elements[i], i );
      }
    }

    /**
     * (private)
     * No type safety. For private class use.
     * @param {Type} value
     */
    ____push( value ) {
      this.elements.push( value );
    }

    /**
     * (private)
     * @param {any} value
     */
    __isCorrectType( value ) {
      switch ( this.type ) {
        case 'any':
          return true;
        case 'int':
          return this.__isInt( value );
        case 'float':
          return this.__isFloat( value );
        // Used for primitive types.
        // 'string' | 'number' | 'boolean'
        default:
          return typeof value === this.type;
      }
    }

    /**
     * (private)
     * @param {Number} value
     */
    __isInt( value ) {
      if ( typeof value !== 'number' ) {
        return false;
      }

      return value % 1 === 0;
    }

    /**
     * (private)
     * @param {Number} value
     */
    __isFloat( value ) {
      if ( typeof value !== 'number' ) {
        return false;
      }

      return value % 1 !== 0;
    }

    __isNullOrUndefined( value ) {
      return value === null || value === undefined;
    }

    __isNullUndefinedOrFalse( value ) {
      return this.__isNullOrUndefined( value ) || value === false;
    }

  }

  return CollectionBase;
} );

/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

( function ( root, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'collection', ['CollectionBase', 'errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    const lib = require( './js.system.collections' );
    module.exports['Collection'] = factory( lib['CollectionBase'], lib['Errors'] );

  } else {
    // Browser.
    root.Collection = factory( root.CollectionBase, root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( CollectionBase, Errors ) {

  class Collection extends CollectionBase {
    constructor( uniqueKeys = false, type = 'any' ) {
      super( uniqueKeys, type );
    }

    /**
     * (private)
     */
    get __last() {
      return this.elements[this.length - 1];
    }

    /**
     * Get all elements from the Collection.
     * For Dictionary is best to use .getAllValues()
     *
     * Returns elements[]
     */
    getAll() {
      return this.elements;
    }

    /**
     * Get an item from the Collection by index.
     * In of beeing a Dictionary it will retun an object containing the key and value ( { key: value } )
     *
     * @param { number | false } index
     */
    get( index ) {
      return this.elements[index] || false;
    }

    removeFirst() {
      this.____splice( 0 );
    }

    removeLast() {
      this.____splice( this.length - 1 );
    }

    /**
      * (private)
      * No checks. For private class use.
      * @param {Number} index
      */
    ____splice( index, quantity = 1 ) {
      this.elements.splice( index, quantity );
    }
  }

  return Collection;
} );

/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

( function ( root, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'list', ['collection'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    module.exports['List'] = factory( require( './js.system.collections' )['Collection'] );

  } else {
    // Browser.
    root.List = factory( root.Collection );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( Collection ) {

  /**
   * @typedef { List }
   * @extends Collection
   * */
  class List extends Collection {
    /**
     *
     * The Type of the list.
     * @param {String} type
     * ('string' | 'number' | 'int' | 'float' | 'boolean' | 'any')
     * Default: 'any'.
     */
    constructor( type ) {
      super( false, type );
    }

    /**
     * Returns the last element of the List or false.
     *
     * @returns { any }
     */
    get last() {
      try {
        return this.__last;

      } catch ( e ) {
        return false;
      }
    }

    /**
     * Add a new item to the List<T>.
     * @param { any } value
     */
    add( value ) {
      const canPush = this.__isCorrectType( value );

      if ( canPush === false ) {
        throw ____errors2.wrongType( this.type );
      }

      return this.____push( value );
    }

    update( index, value ) {
      const canPush = this.__isCorrectType( value );

      if ( canPush === false ) {
        throw ____errors2.wrongType( this.type );
      }

      this.elements[index] = value;
    }

    /**
     * Returns true if the List contains the value, or false if it does not.
     *
     * @param {any} value
     */
    contains( value ) {
      return this.elements.includes( value );
    }

    /**
     * Remove an new item from the List<T> by index.
     * @param {Number} index
     */
    remove( index ) {
      this.splice( index );
    }

    forEach( Callback ) {
      this.__forEach( ( item ) => {
        Callback( item );
      } );
    }
  }

  return List;
} );

/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

( function ( root, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'dictionary', ['collection', 'errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS (Node.js).
    const lib = require( './js.system.collections' );
    module.exports['Dictionary'] = factory( lib['Collection'], lib['Errors'] );

  } else {
    // Browser.
    root.Dictionary = factory( root.Collection, root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( Collection, Errors ) {

  class Dictionary extends Collection {
    /**
     * Dictionary of key-value pairs.
     * In order to have array-like features, this dictionary implementation
     * is O(n), linear.
     * You are probably looking for Dict or DictionaryObj.
     *
     * @param { Boolean } uniqueKeys
     * Optional.
     * Whether the keys should be unique or not.
     * Update: I have no idea why I thought this was a good idea.
     * @default { false }
     */
    constructor( uniqueKeys = false ) {
      super( uniqueKeys, 'any' );
    }

    getAllValues() {
      let allValues = [];

      this.forEachValue( ( value ) => {
        allValues.push( value );
      } );

      return allValues;
    }

    /**
     * Returns an array with all the dictionary's keys.
     * O(n)
     *
     * @returns { any[] }
     */
    getAllKeys() {
      const allKeys = [];

      this.__forEach( ( item ) => {
        allKeys.push( Object.keys( item )[0] );
      } );

      return allKeys;
    }

    /**
     * Returns the last element of the Dictionary or false.
     * O(1)
     *
     * @returns { any }
     */
    get lastValue() {
      try {
        return Object.values( this.__last )[0];

      } catch ( e ) {
        return false;
      }
    }

    /**
     * O(n)
     * 
     * @param { any } key
     * 
     * @returns { boolean }
     */
    containsKey( key ) {
      return this.findIndexOfKey( key ) !== false;;
    }

    /**
     * O(n)
     * 
     * @param { any } key
     * @param { any } value
     */
    add( key, value ) {
      if ( this.uniqueKeys ) {
        if ( this.containsKey( key ) ) {
          throw new Error( Errors.existingKey );
        }
      }

      this.____push( { [key]: value } );
    }

    /**
     * Removes an item from the Dictioary by index.
     * O(1)
     * 
     * @param { number } index
     */
    removeByIndex( index ) {
      this.____splice( index );
      return true;
    }

    /**
     * Removes an item from the Dictionary with the provided key.
     * O(n)
     * 
     * @param { any } key
     *
     * @return { bool }
     */
    remove( key ) {
      const index = this.findIndexOfKey( key );

      if ( index === false ) {
        return false;
      }

      this.____splice( index );
      return true;
    }

    /*
     * Updates an item in the Dictionary with the provided key.
     * O(n)
     *
     * @param { any } key
     * @param { any } newValue
     *
     * @return { bool }
     */
    updateByKey( key, newValue ) {
      const index = this.findIndexOfKey( key );

      if ( index === false ) {
        return false;
      }

      return this.updateByIndex( index, newValue );
    }

    /**
     * Updates an item in the Dictionary with the provided index.
     * O(1)
     *
     * @param { any } key
     * @param { any } newValue
     *
     * @returns { bool }
     */
    updateByIndex( idx, newValue ) {
      try {
        const item = this.elements[idx];

        Object.defineProperty( item, Object.keys( item )[0], {
          value: newValue
        } );

        return true;

      } catch ( e ) {
        return false;
      }
    }

    /**
     * Get a value with its index. Returns an array with the values.
     * O(1)
     *
     * @param { number } index
     *
     * @returns { any | false }
     */
    getByIndex( index ) {
      const element = this.elements[index];

      if ( element === undefined || element === null ) {
        return false;
      }

      return Object.values( element )[0];
    }

    /**
     * Get a key with its index.
     * O(1)
     *
     * @param { number } index
     *
     * @returns { any | false }
     */
    getKeyByIndex( index ) {
      const item = this.elements[index];

      if ( item === undefined || item === null ) {
        return false;
      }

      return Object.keys( item )[0];
    }

    /**
     * Returns the value by key or false if not found.
     * O(n)
     *
     * @param { any } key
     *
     * @returns { any | false }
     */
    getByKey( key ) {
      try {
        const elementAndIndex = this.____getElementAndIndexByKey( key );

        if ( elementAndIndex === false ) {
          return false;
        }

        return Object.values( elementAndIndex[1] )[0];

      } catch ( e ) {
        return false;
      }
    }

    /**
     * Returns the index of the provided key, or false if not found.
     * O(n)
     *
     * @param {any} key
     *
     * @returns { number | false }
     */
    findIndexOfKey( key ) {
      const elementAndIndex = this.____getElementAndIndexByKey( key );

      if ( elementAndIndex === false ) {
        return false;
      }

      return elementAndIndex[0];
    }

    /**
     * O(n)
     * 
     * @param {any} Callback
     */
    forEachValue( Callback ) {
      this.__forEach( ( item ) => {
        Callback( Object.values( item )[0] );
      } );
    }

    /**
     * (private)
     * Returns an array with the index and the respective key-value pair object, or false in case it does not find the provided key.
     * O(n)
     *
     * [index<number>, keyValuePair<object>]
     *
     * @param { any } key
     *
     * @returns { Object | false }
     */
    ____getElementAndIndexByKey( key ) {
      let currKeyValPair;

      for ( let i = 0; i < this.elements.length; i++ ) {
        currKeyValPair = this.elements[i];

        if ( Object.keys( currKeyValPair )[0] === key ) {
          return [i, currKeyValPair];
        }
      }

      return false;
    }

  }

  return Dictionary;
} );

/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

( function ( root, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'Dict', ['CollectionBase', 'errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS (Node.js).
    const lib = require( './js.system.collections' );
    module.exports['Dict'] = factory( lib['CollectionBase'], lib['Errors'] );

  } else {
    // Browser.
    root.Dict = factory( root.CollectionBase, root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( CollectionBase, Errors ) {

  class Dict extends CollectionBase {
    /**
     * Optimized dictionary of key-value pairs.
     *
     * @param { number } initialSize
     * Optional.
     * Integer representing the initial size of the dictionary.
     * Minimum and defualt is 32.
     */
    constructor( initialSize ) {
      super( true, 'any' );

      this.clearSafeIfNeed = false;
      this.____currentLength = 0;
      this.____prime = 7;

      if ( initialSize === undefined ) {
        initialSize = this.defaultSize;
      }

      if ( !Number.isInteger( initialSize ) ) {
        throw new Error( Errors.notInteger );

      } else if ( !initialSize || initialSize < this.defaultSize ) {
        this.____currentSize = this.defaultSize;

      } else if ( initialSize % 2 !== 0 ) {
        this.____currentSize = initialSize + 1;
      }

      this.____currentSize = initialSize;
    }

    get defaultSize() {
      return 32;
    }

    get count() {
      return this.____currentLength;
    }

    /**
     * Returns an array with all the dictionary's values.
     * O(n)
     * 
     * @returns { any[] }
     */
    getAllValues() {
      let allValues = [];

      this.forEachValue( ( value ) => {
        if ( !value ) {
          return;
        }

        allValues.push( value );
      } );

      return allValues;
    }

    /**
     * Returns an array with all the dictionary's keys.
     * O(n)
     *
     * @returns { any[] }
     */
    getAllKeys() {
      const allKeys = [];

      this.__forEach( ( item ) => {

        if ( !item ) {
          return;
        }

        allKeys.push( Object.keys( item )[0] );
      } );

      return allKeys;
    }

    /**
     * Returns the current hashed key of an item or false if not found.
     * ~O(1)
     *
     * @param { number | string } key
     *
     * @returns { any | undefined } The value or undefined.
     */
    getHashedKey( key ) {
      const hashedIndexVal = this.getIndexVal( key );

      if ( !hashedIndexVal ) {
        return undefined;
      }

      return hashedIndexVal[0];
    }

    /**
     * Returns the value by key (volatile) or false if not found.
     * ~O(1)
     *
     * @param { number | string } key
     *
     * @returns { any | undefined } The value or undefined.
     */
    getValue( key ) {
      const hashedIndexVal = this.getIndexVal( key );

      if ( !hashedIndexVal ) {
        return undefined;
      }

      return hashedIndexVal[1];
    }

    /**
     * ~O(1)
     *
     * @param { number | string } key
     *
     * @returns { bool }
     */
    containsKey( key ) {
      return this.getIndexVal( key ) !== undefined;
    }

    /**
     * ~O(1)
     * 
     * @param { number | string } key
     * 
     * @returns { [number, any] | undefined } [index, value]
     */
    getIndexVal( key ) {
      const normalizedKey = this.____normalizeKey( key );
      let hashedKey = this.____hashKey( normalizedKey );
      let currentDictKey = this.____keyAt( hashedKey );

      if ( currentDictKey === undefined ) {
        return undefined;
      }

      if ( currentDictKey === key ) {
        return [hashedKey, this.elements[hashedKey][key]];
      }

      for ( let i = 0; ; ++i ) {
        hashedKey = this.____doubleHashKey( normalizedKey, i );
        currentDictKey = this.____keyAt( hashedKey );

        if ( currentDictKey === key ) {
          return [hashedKey, this.elements[hashedKey][key]];

        } else if ( currentDictKey === undefined ) {
          return undefined;
        }
      }
    }

    /**
     * O(1), worst case O(n)
     * 
     * @param { string | number } key
     * @param { any } value
     * 
     * @returns { number | false } The new index or false.
     */
    add( key, value ) {
      if ( this.____currentLength === this.____currentSize ) {
        this.____currentSize *= 2;
        this.____rehashTable();
      }

      const newHashedKey = this.____generateNewHashedIndex( key );

      if ( newHashedKey === null ) {
        return false;
      }

      this.____set( newHashedKey, key, value );
      ++this.____currentLength;
      return newHashedKey;
    }

    /**
     * Removes an item from the Dictionary with the provided key.
     * O(1), worst case O(n)
     * 
     * @param { string | number } key
     *
     * @return { number | false } The index or false.
     */
    remove( key ) {
      if ( this.____currentLength === this.____currentSize / 4 ) {
        this.____currentSize /= 2;
        this.____rehashTable();
      }

      const hashedIndex = this.getHashedKey( key );

      if ( this.__isNullUndefinedOrFalse( hashedIndex ) ) {
        return false;
      }

      this.____setAsRemoved( hashedIndex );
      --this.____currentLength;
      return hashedIndex;
    }

    /**
     * Updates an item in the Dictionary with the provided key.
     * ~O(1)
     *
     * @param { string | number } key
     * @param { any } newValue
     *
     * @return { bool }
     */
    update( key, newValue ) {
      const hashedIndex = this.getHashedKey( key );

      if ( this.__isNullUndefinedOrFalse( hashedIndex ) ) {
        return false;
      }

      this.____set( hashedIndex, key, newValue );
      return hashedIndex;
    }

    /**
     * O(n)
     * 
     * @param {any} Callback
     */
    forEachValue( Callback ) {
      this.__forEach( ( item ) => {

        if ( !item ) {
          return item;
        }

        Callback( Object.values( item )[0] );
      } );
    }

    ____set( index, key, value ) {
      this.elements[index] = { [key]: value };
    }

    ____setAsRemoved( index ) {
      this.elements[index] = false;
    }

    ____isEmptyHashSlot( hashedKey ) {
      // elem is set to false when removed.
      return this.__isNullUndefinedOrFalse( this.elements[hashedKey] );
    }

    ____keyAt( index ) {
      if ( !this.elements[index] ) {
        return this.elements[index];
      }

      return Object.keys( this.elements[index] )[0];
    }

    /**
     * 
     * @param { number | string } key
     * 
     * @returns { number | false }
     */
    ____normalizeKey( key ) {
      if ( typeof ( key ) === 'number' ) {
        return key;

      } else if ( typeof ( key ) === 'string' ) {

        let normalizedKey = 0;

        for ( let i = 0; i < key.length; ++i ) {
          normalizedKey += key.charCodeAt( i );
        }

        return normalizedKey;

      } else {
        return false;
      }
    }

    /**
     * ~O(1)
     * 
     * @param { string | number } key
     */
    ____generateNewHashedIndex( key ) {
      const normalizedKey = this.____normalizeKey( key );

      if ( !normalizedKey ) {
        return null;
      }

      let hashedKey = this.____hashKey( normalizedKey );

      if ( this.____isEmptyHashSlot( hashedKey ) ) {
        return hashedKey;
      }

      for ( let i = 0; ; ++i ) {
        hashedKey = this.____doubleHashKey( normalizedKey, i );

        if ( this.____isEmptyHashSlot( hashedKey ) ) {
          return hashedKey;
        }
      }
    }

    /**
     * 
     * @param { number } normalizedKey
     */
    ____hashKey( normalizedKey ) {
      return normalizedKey % this.____currentSize;
    }

    /**
     * (private)
     *
     * @param { number } normalizedKey
     */
    ____hashKeyWithPrime( normalizedKey ) {
      return this.____prime - ( normalizedKey % this.____prime );
    }

    /**
     * (private)
     * 
     * To avoid many collisions.
     * 
     * @param { number } normalizedKey
     * @param { number } probeIndex
     */
    ____doubleHashKey( normalizedKey, probeIndex ) {
      return (
        this.____hashKey( normalizedKey ) +
        ( probeIndex * this.____hashKeyWithPrime( normalizedKey ) )
      ) % this.____currentSize;
    }

    /**
     * (private)
     *
     * O(n) | O(2n)
     */
    ____rehashTable() {
      const hashtableBK = this.elements;

      if ( this.clearSafeIfNeed ) {
        this.clearSafe();

      } else {
        this.clear();
      }

      this.____currentLength = 0;

      let thisKey;
      let hashedKey;

      for ( let i = 0; i < hashtableBK.length; ++i ) {
        if ( !hashtableBK[i] ) {
          continue;
        }

        thisKey = Object.keys( hashtableBK[i] )[0];
        hashedKey = this.____generateNewHashedIndex( thisKey );

        this.____set( hashedKey, thisKey, hashtableBK[i][thisKey] );
        ++this.____currentLength;
      }

      hashtableBK.splice( 0, hashtableBK.length );
    }
  }

  return Dict;
} );

/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

( function ( root, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'DictionaryObj', ['errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    module.exports['DictionaryObj'] = factory( require( './js.system.collections' )['Errors'] );

  } else {
    // Browser.
    root.DictionaryObj = factory( root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( Errors ) {

  class DictionaryObj {

    /**
     * A lightweight implementation of a dictionary, based on an object.
     * The time complexity is dependent on the vendor's browser engine.
     *
     */
    constructor() {
      this.elements = new Object();
      this.____length = 0;
    }

    get count() {
      return this.____length;
    }

    clear() {
      this.elements = null;
      this.elements = new Object();
      this.____length = 0;
    }

    get( key ) {
      return this.elements[key];
    }

    /**
     * Same as .get( key ).
     */
    getValue( key ) {
      return this.get( key );
    }

    containsKey( key ) {
      //try {
      return this.getValue( key ) !== undefined;

      //} catch ( e ) {
      //  return false;
      //}
    }

    getAllKeys() {
      return Object.keys( this.elements );
    }

    getAllValues() {
      return Object.values( this.elements );
    }

    add( key, value ) {
      this.elements[key] = value;
      ++this.____length;
    }

    update( key, value ) {
      this.add( key, value );
      --this.____length;
    }

    remove( key ) {
      delete this.elements[key];
      --this.____length;
    }

    forEachValue( Callback ) {
      for ( item in this.elements ) {
        Callback( this.elements[item] );
      }
    }
  }

  return DictionaryObj;
} );

