/*
 * Copyright (c) 2019 Jo�o Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

'use strict';
const { Dictionary, List } = require('../index');

// ------------------------------------------------------------------------ //

    // DICTIONARY
    console.log('// ------------------------------------------------------------------------ //');
    console.log('DICTIONARY');

    console.debug('Create a Dictionary with unique keys.');
    const myDict = new Dictionary(true);

    console.debug('Is the Dictionay empty?', myDict.isEmpty);

    console.debug('Add some items to the neww Dictionary.');
    myDict.add('one', 'This is one.');
    myDict.add('two', 'This is two.');
    myDict.add('three', 'This is three.');
    console.debug('Is the Dictionay empty?', myDict.isEmpty);

    console.debug( myDict.findIndexOfKey( 'three' ) );
    console.debug(myDict.getByKey('three'));
    console.debug(myDict.getAllValues());

    console.debug( 'Remove the first and last elements from the Collection.' );
    myDict.removeFirst();
    myDict.removeLast();
    console.debug( myDict.getAllValues() );

    console.debug('Give an error now. \nAdd an item with an exixting key:');
    // UNCOMMENT FOR ERROR.
    // myDict.add('two', 'This is two AGAIN.');

// ------------------------------------------------------------------------ //

    // LIST
    console.log( '// ------------------------------------------------------------------------ //' );
    console.log( 'LIST' );

    console.debug( 'Create a List of floats.' );
    const myList = new List( 'float' );

    console.debug( 'Is the List empty?', myList.isEmpty );

    console.debug( 'Add some floats to the List.' );
    myList.add( 1.5 );
    myList.add( 34.98 );
    myList.add( 26.8888 );

    console.debug( 'Is the List empty?', myList.isEmpty );
    console.debug( myList.getAll() );

    console.debug( 'Remove the first and last elements from the Collection.' );
    myList.removeFirst();
    myList.removeLast();
    console.debug( myList.getAll() );

    console.debug( 'Give an error now. \nAdd an integer:' );
    // UNCOMMENT FOR ERROR.
    // myList.add( 69 );

    console.log( '// ------------------------------------------------------------------------ //' );

// ------------------------------------------------------------------------ //
const readline = require( 'readline' );
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question( 'Finito!', ( answer ) => {
    rl.close();
});
// ------------------------------------------------------------------------ //
