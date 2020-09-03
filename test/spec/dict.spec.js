/*
 * Copyright (c) 2019-2020 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

const { Dict } = require( '../../dist/js.system.collections.js' );
// const { Dictionary } = require( '../../index.js' );

describe( 'The Dict', function () {

  beforeAll( function () {
    global.myDict = new Dict();
  } );

  it( 'should add values', function () {
    expect( global.myDict.add( 'one', 'This is one.' ) ).not.toBeFalse();
    expect( global.myDict.add( 'two', 'This is two.' ) ).not.toBeFalse();
    expect( global.myDict.add( 'three', 'This is three.' ) ).not.toBeFalse();

    expect( global.myDict ).toBeDefined();
    expect( global.myDict ).not.toBeFalse();
    expect( global.myDict.count ).toBe( 3 );
    expect( global.myDict.____currentLength ).toBe( 3 );
    expect( global.myDict.isEmpty ).toBeFalse();
  } );

  it( 'should find items by key', function () {

    const itemThreeRealValue = 'This is three.';
    const valOfThree = global.myDict.getValue( 'three' );
    expect( valOfThree ).toBe( itemThreeRealValue );

    const itemFourRealValue = 'This id four.';
    global.myDict.add( 'four', itemFourRealValue );

    expect( global.myDict.containsKey( 'four' ) ).toBeTrue();
    expect( global.myDict.containsKey( '$$$$$€€€€€€$$$$$' ) ).toBeFalse();

    const itemThreeVal = global.myDict.getValue( 'three' );
    expect( itemThreeVal ).toBeDefined();
    expect( itemThreeVal ).toBe( itemThreeRealValue );

    const itemFourVal = global.myDict.getValue( 'four' );
    expect( itemFourVal ).toBeDefined();
    expect( itemFourVal ).toBe( itemFourRealValue );

    const itemOneRealValue = 'This is one.';
    const itemOneVal = global.myDict.getValue( 'one' );
    expect( itemOneVal ).toBeDefined();
    expect( itemOneVal ).toBe( itemOneRealValue );

    const allKeys = global.myDict.getAllKeys();
    expect( allKeys.length ).toBe( 4 );
    expect( global.myDict.count ).toBe( 4 );
    expect( global.myDict.____currentLength ).toBe( 4 );
    expect( global.myDict.____currentSize ).toBe( global.myDict.defaultSize );
  } );

  it( 'should update item values', function () {
    const newTwoValue = 'This is two v2.';
    expect( global.myDict.update( 'two', newTwoValue ) ).not.toBeFalse();

    const newTwoSearchedValue = global.myDict.getValue( 'two' );
    expect( newTwoSearchedValue ).toBeDefined();
    expect( newTwoSearchedValue ).toBe( newTwoValue );

    const newThreeValue = 'This is three v2.';
    expect( global.myDict.update( 'three', newThreeValue ) ).not.toBeFalse();
    const newThreeSearchedValue = global.myDict.getValue( 'three' );
    expect( newThreeSearchedValue ).toBeDefined();
    expect( newThreeSearchedValue ).toBe( newThreeValue );
  } );

  it( 'should remove items', function () {
    global.myDict.remove( 'two' );

    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 3 );
    expect( global.myDict.count ).toBe( 3 );
    expect( global.myDict.____currentLength ).toBe( 3 );

    const itemTwoVal = global.myDict.getValue( 'two' );
    expect( itemTwoVal ).toBeUndefined();

  } );

  it( 'should clear all values', function () {
    global.myDict.clear();

    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 0 );
    expect( global.myDict.count ).toBe( 0 );
    expect( global.myDict.____currentLength ).toBe( 0 );
  } );

  const addBulk = () => {
    const numOfItems = 42;

    expect( global.myDict.count ).toBe( 0 );

    for ( let i = 0; i < numOfItems; ++i ) {
      expect(
        global.myDict.add(
          'ITEM_' + i.toString(),
          i + ( Math.random() * ( ( Math.random() * 10 ) + ( Math.random() * 10 ) ) )
        )
      ).not.toBeFalse();
    }

    const allValues = global.myDict.getAllValues();

    expect( allValues.length ).toBe( numOfItems );
    expect( global.myDict.____currentLength ).toBe( numOfItems );
    expect( global.myDict.____currentSize ).toBe( global.myDict.defaultSize * 2 );
  };

  it( 'should add a lot of items and rehash with no problems', function () {
    addBulk();
  } );

  it( 'should clear all values safely', function () {
    global.myDict.clearSafe();
    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 0 );
    expect( global.myDict.count ).toBe( 0 );
    expect( global.myDict.____currentLength ).toBe( 0 );
  } );

  //it( 'should remove all items by key and rehash with no problems', function () {
  //  const numOfItems = 42;
  //  addBulk();

  //  for ( let i = 0; i < numOfItems; ++i ) {
  //    expect( global.myDict.remove( 'ITEM_' + i.toString() ) ).not.toBeFalse();
  //    console.log( 'ITEM_' + i.toString() );
  //  }

  //  const allValues = global.myDict.getAllValues();

  //  console.log( global.myDict.elements );

  //  expect( allValues.length ).toBe( 0 );
  //  expect( global.myDict.____currentLength ).toBe( 0 );
  //  expect( global.myDict.____currentSize ).toBe( 4 );
  //} );

  afterAll( function () {
    global.myDict = null;
    global.myDict = undefined;
  } );

} );
