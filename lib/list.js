/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

let ____errors2;
let ____collection2;

try {
  'use strict';
  ____errors2 = require( './errors' );
  ____collection2 = require( './collection' );

} catch ( e ) {
  ____errors2 = Errors;
  ____collection2 = Collection;
}

/**
 * @typedef { List }
 * @extends Collection
 * */
class List extends ____collection2 {
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

try {
  module.exports = List;

} catch ( e ) {
  //;
}
