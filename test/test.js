const Jasmine = require( 'jasmine' );
const jasmine = new Jasmine();

jasmine.loadConfigFile( './test/spec/support/jasmine.json' );

jasmine.onComplete( function( passed ){
  if ( passed ) {
    console.info( 'All specs jave passed!' );

  } else {
    console.error( 'Not all specs have passed!' );
  }
} );

jasmine.execute();
