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
