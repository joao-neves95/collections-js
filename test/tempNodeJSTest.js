/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

'use strict';
const readline = require( 'readline' );
const runTest = require('./tempTest');

// ------------------------------------------------------------------------ //

runTest();

// ------------------------------------------------------------------------ //

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question( 'Finito!', ( answer ) => {
    rl.close();
});

// ------------------------------------------------------------------------ //
