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
    define( 'errors', [], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    module.exports['Errors'] = factory();

  } else {
    // Browser.
    root.Errors = factory();
  }
})( typeof global !== 'undefined' ? global : this.window || this.global, function() {

  class Errors {
    static get existingKey() { throw new Error( 'An item with the same key has already been added.' ); };

    static get noTypeProvided() { throw new Error( 'No type provided on Collection instantiation.' ) };

    static wrongType( type ) { throw new Error( `The value is not from the same type as the List<${type}>` ); };
  }

  return Errors;
});
