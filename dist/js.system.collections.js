/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

// Temporary.
// @import './lib/errors'
// @import './lib/collection'
// @import './lib/dictionary'
// @import './lib/list'

/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

(function (root, factory) {
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
})( typeof global !== 'undefined' ? global : this.window || this.global, function() {

  class Errors {
    static get existingKey() { throw new Error( 'An item with the same key has already been added.' ); };

    static get noTypeProvided() { throw new Error( 'No type provided on Collection instantiation.' ) };

    static wrongType( type ) { throw new Error( `The value is not from the same type as the List<${type}>` ); };
  }

  return Errors;
});

/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'collection', ['errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    module.exports['Collection'] = factory( require( './js.system.collections' )['Errors'] );

  } else {
    // Browser.
    root.Collection = factory( root.Errors );
  }
})( typeof global !== 'undefined' ? global : this.window || this.global, function( Errors ) {

  class Collection {
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
      return this.length <= 0;
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
      return this.elements[index] | false;
    }

    /**
     * Remove all elements from the Collection.
     */
    clear() {
      this.elements = [];
    }

    removeFirst() {
      this.____splice( 0 );
    }

    removeLast() {
      this.____splice( this.length - 1 );
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
     */
    __forEach( Callback ) {
      for ( let i = 0; i < this.elements.length; ++i ) {
        Callback( this.elements[i] );
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
      * No checks. For private class use.
      * @param {Number} index
      */
    ____splice( index, quantity = 1 ) {
      this.elements.splice( index, quantity );
    }

    /**
   * (private)
   * @param {Number} value
   */
    __isInt( value ) {
      if ( typeof value !== 'number' )
        return false;

      return value % 1 === 0;
    }

    /**
     * (private)
     * @param {Number} value
     */
    __isFloat( value ) {
      if ( typeof value !== 'number' )
        return false;

      return value % 1 !== 0;
    }
  }

  return Collection;
} );

/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

(function (root, factory) {
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
})( typeof global !== 'undefined' ? global : this.window || this.global, function( Collection, Errors ) {

  class Dictionary extends Collection {
    /**
     * Dictionary of key-value pairs.
     *
     * @param {Boolean} uniqueKeys Whether the keys should be unique or not.
     * Optional. It defaults to false
     * @default {false}
     */
    constructor( uniqueKeys ) {
      super( uniqueKeys, 'any' );
    }

    /**
     * Returns the last element of the Dictionary or false.
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
     * Returns an array with all the dictionary's values.
     *
     * @returns { any[] }
     */
    getAllValues() {
      let allValues = [];

      this.forEachValue( ( value ) => {
        allValues.push( value );
      } );

      return allValues;
    }

    /**
     * Returns an array with all the dictionary's keys.
     *
     * @returns { any[] }
     */
    getAllKeys() {
      const allKeys = [];

      this.__forEach( (item) => {
        allKeys.push( Object.keys( item )[0] );
      } )

      return allKeys;
    }

    containsKey( key ) {
      return this.findIndexOfKey( key ) !== false;;
    }

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
     * @param { number } index
     */
    removeByIndex( index ) {
      this.____splice( index );
      return true;
    }

    /**
     * Removes an item from the Dictionary with the provided key.
     * @param { any } key
     *
     * @return { bool }
     */
    remove( key ) {
      const index = this.findIndexOfKey( key );
      if ( index === false )
        return false;

      this.____splice( index );
      return true;
    }

    /*
     * Updates an item in the Dictionary with the provided key.
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
        console.error( e );
      }
    }

    /**
     * Returns the index of the provided key, or false if not found.
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
     * (private)
     * Returns an array with the index and the respective key-value pair object, or false in case it does not find the provided key.
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

    forEachValue( Callback ) {
      this.__forEach( ( item ) => {
        Callback( Object.values( item )[0] );
      } );
    }
  }

  return Dictionary;
});

/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

(function (root, factory) {
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
})( typeof global !== 'undefined' ? global : this.window || this.global, function( Collection ) {

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

      if ( canPush === false )
        throw ____errors2.wrongType( this.type );

      return this.____push( value );
    }

    update( index, value ) {
      const canPush = this.__isCorrectType( value );

      if ( canPush === false )
        throw ____errors2.wrongType( this.type );

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
});

