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
    define( 'errors', ['exports'], factory );

  } else if ( typeof exports === 'object' && typeof exports.nodeName !== 'string' ) {
    // CommonJS.
    module.exports = factory( exports );

  } else {
    // Browser.
    root.Errors = factory( root );
  }
})( typeof global !== 'undefined' ? global : this.window || this.global, function( exports ) { 

  class Errors {
    static get existingKey() { throw new Error( 'An item with the same key has already been added.' ); };

    static get noTypeProvided() { throw new Error( 'No type provided on Collection instantiation.' ) };

    static wrongType( type ) { throw new Error( `The value is not from the same type as the List<${type}>` ); };
  }

  exports.action = Errors;
  return Errors;
});

