let _Dictionary;
let _List;

try {
    // Node.js.
    _Dictionary = require('../index').Dictionary;
    _List = require('../index').List;

} catch (e) {
    // Browser.
    _Dictionary = Dictionary;
    _List = List;
}

const runTest = () => {
    // ------------------------------------------------------------------------ //

    // DICTIONARY
    console.log('// ------------------------------------------------------------------------ //');
    console.log('DICTIONARY');

    console.debug('Create a Dictionary with unique keys.');
    const myDict = new _Dictionary(true);

    console.debug('Is the Dictionay empty?', myDict.isEmpty);

    console.debug('Add some items to the neww Dictionary.');
    myDict.add('one', 'This is one.');
    myDict.add('two', 'This is two.');
    myDict.add('three', 'This is three.');
    console.debug('Is the Dictionay empty?', myDict.isEmpty);

    console.debug(myDict.findIndexOfKey('three'));
    console.debug(myDict.getByKey('three'));
    console.debug(myDict.getAllValues());

    console.debug('Remove the first and last elements from the Collection.');
    myDict.removeFirst();
    myDict.removeLast();
    console.debug(myDict.getAllValues());

    console.debug('Give an error now. \nAdd an item with an exixting key:');
    // UNCOMMENT FOR ERROR.
    // myDict.add('two', 'This is two AGAIN.');

    // ------------------------------------------------------------------------ //

    // LIST
    console.log('// ------------------------------------------------------------------------ //');
    console.log('LIST');

    console.debug('Create a List of floats.');
    const myList = new _List('float');

    console.debug('Is the List empty?', myList.isEmpty);

    console.debug('Add some floats to the List.');
    myList.add(1.5);
    myList.add(34.98);
    myList.add(26.8888);

    console.debug('Is the List empty?', myList.isEmpty);
    console.debug(myList.getAll());

    console.debug('Remove the first and last elements from the Collection.');
    myList.removeFirst();
    myList.removeLast();
    console.debug(myList.getAll());

    console.debug('Give an error now. \nAdd an integer:');
    // UNCOMMENT FOR ERROR.
    // myList.add( 69 );

    console.log('// ------------------------------------------------------------------------ //');

    // ------------------------------------------------------------------------ //
}

try {
    if ( process.env !== undefined )
      module.exports = runTest;

} catch (e) {
    // continue;
}
