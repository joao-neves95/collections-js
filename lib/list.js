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
   * @param {Type} value
   */
  add( value ) {
    switch ( this.type ) {
      case 'any':
        return this.push( value );
      case 'int':
        if ( this.isInt( value ) ) {
          return this.push( value );
        }
        break;
      case 'float':
        if ( this.isFloat( value ) ) {
          return this.push( value );
        }
        break;
      default:
        if ( typeof value === this.type )
          return this.push( value );
        break;
    }

    throw ____errors2.wrongType( this.type );
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

  /**
   * (private)
   * @param {Number} value
   */
  isInt( value ) {
    if ( typeof value !== 'number' )
      return false;

    return value % 1 === 0;
  }

  /**
   * (private)
   * @param {Number} value
   */
  isFloat( value ) {
    if ( typeof value !== 'number' )
      return false;

    return value % 1 !== 0;
  }
}

try {
  module.exports = List;

} catch ( e ) {
  //;
}
