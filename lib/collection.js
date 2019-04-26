﻿/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

let ____errors0;

try {
  'use strict';
  ____errors0 = require( './errors' );

} catch ( e ) {
  ____errors0 = Errors;
}

class Collection {
  constructor( uniqueKeys = false, type = 'any' ) {
    this.elements = [];
    this.uniqueKeys = uniqueKeys;

    if ( !type ) throw ____errors0.noTypeProvided;
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
   *
   * @param { number } index
   */
  get( index ) {
    return this.elements[index];
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
  ____splice( index ) {
    this.elements.splice( index, 1 );
  }
}

try {
  module.exports = Collection;

} catch ( e ) {
  //;
}
