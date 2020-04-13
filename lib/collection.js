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
    define( 'collection', ['exports', 'errors'], factory );

  } else if ( typeof exports === 'object' && typeof exports.nodeName !== 'string' ) {
    // CommonJS.
    module.exports = factory( exports, require( './errors' ) );

  } else {
    // Browser.
    root.Collection = factory( root, root.Errors );
  }
})( typeof global !== 'undefined' ? global : this.window || this.global, function( exports, Errors ) { 
  
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

  exports.action = Collection;
  return Collection;
} );

