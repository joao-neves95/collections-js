/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'CollectionBase', ['errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    module.exports['CollectionBase'] = factory( require( './js.system.collections' )['Errors'] );

  } else {
    // Browser.
    root.Collection = factory( root.Errors );
  }
})( typeof global !== 'undefined' ? global : this.window || this.global, function( Errors ) {

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
     *
     * @memberof Stack
     */
    clear() {
      this.____elements = null;
      this.____elements = [];
    }
    
    /**
     * Pops every element of the array storage,
     * maintaining the same underling array store.
     *
     * @memberof Stack
     */
    clearSafe() {
      while(this.____elements.length) {
        this.____elements.pop();
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

  }

  return CollectionBase;
} );
