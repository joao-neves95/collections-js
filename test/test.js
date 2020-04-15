/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

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
