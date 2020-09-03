/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

// const { List } = require( '../../dist/js.system.collections.js' );
const { List } = require( '../../index.js' );

describe( 'The List', function () {

  beforeAll( function () {
    global.myList = new List( 'float' );
  } );

  it( 'should add values', function () {
    expect( global.myList.isEmpty ).toBeTrue();
    global.myList.add( 1.5 );
    global.myList.add( 34.98 );
    global.myList.add( 26.8888 );

    expect( global.myList ).toBeDefined();
    expect( global.myList.length ).toBe( 3 );
    expect( global.myList.isEmpty ).toBeFalse();
  } );

  it( 'should check for values values', function () {
    expect( global.myList.contains( 26.8888 ) ).toBeTrue();
    expect( global.myList.contains( 99.3 ) ).toBeFalse();
  } );

  it( 'should get and find elements', function () {
    expect( global.myList.length ).toBe( 3 );
    global.myList.add( 29.65 );

    expect( global.myList.length ).toBe( 4 );

    expect( global.myList.get( 1 ) ).toBe( 34.98 );
    expect( global.myList.get( 23 ) ).toBeFalse();
  } );

  it( 'should update values', function () {
    global.myList.update( 1, 9.999 );
    expect( global.myList.get( 1 ) ).toBe( 9.999 );
  } );

  it( 'should NOT allow updates with the wrong type', function () {
    let error = false;

    try {
      global.myList.update( 1, 9 );

    } catch ( e ) {
      error = true;
    }

    expect( error ).toBeTrue();
  } );

  it( 'should NOT allow adding items with the wrong type', function () {
    let error = false;

    try {
      global.myList.add( true );

    } catch ( e ) {
      error = true;
    }

    expect( error ).toBeTrue();
  } );

  it( 'should remove items', function () {
    global.myList.removeFirst();
    global.myList.removeLast();

    expect( global.myList.length ).toBe( 2 );
  } );

  afterAll( function () {
    global.myList = null;
    global.myList = undefined;
  } );

} );
