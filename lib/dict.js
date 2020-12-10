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
          normalizedKey = this.__combineNumbers( normalizedKey, key.charCodeAt( i ) );
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
