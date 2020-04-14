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
    module.exports = factory( require( './collection' ) );

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
