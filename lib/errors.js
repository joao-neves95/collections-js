try {
  'use strict';

} catch ( e ) {
  //;
}

class Errors {
  static get existingKey() { throw new Error( 'An item with the same key has already been added.' ); };

  static get noTypeProvided() { throw new Error( 'No type provided on Collection instantiation.' ) };

  static wrongType( type ) { throw new Error( `The value is not from the same type as the List<${type}>` ); };
}

try {
  module.exports = Errors;

} catch ( e ) {
  //;
}
