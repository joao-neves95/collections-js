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
    }

    get( key ) {
      return this.elements[key];
    }

    getAllKeys() {
      return Object.keys( this.elements );
    }

    getAllValues() {
      return Object.value( this.elements );
    }

    add( key, value ) {
      this.elements[key] = value;
    }

    update( key, value ) {
      add( key, value );
    }

    remove( key ) {
      delete this.elements[key];
    }

    forEachValue( Callback ) {
      for ( item in this.elements ) {
        Callback( this.elements[item] );
      }
    }
  }

  return DictionaryObj;
} );
