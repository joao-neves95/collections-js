/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

let ____errors1;
let ____collection1;

try {
  'use strict';
  ____errors1 = require( './errors' );
  ____collection1 = require( './collection' );

} catch ( e ) {
  ____errors1 = Errors;
  ____collection1 = Collection;
}

class Dictionary extends ____collection1 {
  /**
   * Dictionary of key-value pairs.
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

    for ( let i = 0; i < this.elements.length; ++i ) {
      allValues.push( Object.values( this.elements[i] )[0] );
    }

    return allValues;
  }

  /**
   * Returns an array with all the dictionary's keys.
   *
   * @returns { any[] }
   */
  getAllKeys() {
    const allKeys = [];

    for ( let i = 0; i < this.elements.length; ++i ) {
      allKeys.push( Object.keys( this.elements[i] )[0] );
    }

    return allKeys;
  }

  containsKey( key ) {
    return this.findIndexOfKey( key ) !== false;;
  }

  add( key, value ) {
    if ( this.uniqueKeys ) {
      if ( this.containsKey( key ) ) {
        throw new Error( ____errors1.existingKey );
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

      Object.defineProperty( item, Object.keys(item)[0], {
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
   * @param {number} index
   * 
   * @returns {any[]}
   */
  getByIndex( index ) {
    return Object.values( this.elements[index] )[0];
  }

  /**
   * Get a key with its index.
   * 
   * @param {number} index
   * 
   * @returns {any}
   */
  getKeyByIndex( index ) {
    return Object.keys( this.elements[index] )[0];
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

try {
  module.exports = Dictionary;

} catch ( e ) {
  //;
}
