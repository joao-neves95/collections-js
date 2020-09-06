# Changelog

&nbsp;

#### *v1.7.1 - 06/09/2020

  - Added more methods to the `DictionaryObj`.
  - Added tests to the `DictionaryObj`.
  - Multiple fixes to the `DictionaryObj`.

&nbsp;

#### v1.7.0 - 06/09/2020

  - Added a new lightweight implementation of a dictionary, `DictionaryObj`.
  - Small fix of bug that didn't made possible deletion and update of index 0.
    This was due to, in those methods, it was being checked if the searched
    return value was falsy (0 inclusive), instead of checking for undefined,
    null or false.

&nbsp;

#### v1.6.0 - 03/09/2020

  - Added another implementation of a dictionary, `Dict`, with ~O(1) search instead of O(n).
  - Multiple internal refactorings.
  - Updated the API docs.

&nbsp;

#### v1.5.0 - 15/04/2020

  - Added UMD compatibility support (AMD not tested).
  - Added tests to the List and Dictionary.
  - Multiple internal fixes (undefineds and exeptions) and refactorings.

&nbsp;

#### v1.4.0 - 06/04/2020

  - Fix on the the method "updateByIndex" of the Dictionary.
  - Added the method "removeByIndex( index )" to the Dictionary.
  - Added the method "containsKey( key )" to the Dictionary.
  - Small internal refactorings and fixes.


&nbsp;


#### v1.3.0 - 19/12/2019

  - Added the getAllKeys() method.


&nbsp;


#### v1.2.0 - 6/05/2019

  - Added the update(index, value) method to the List.
  - Added the contains(value) method to the List.
  - Multiple refactorings.


&nbsp;


#### v1.1.0 - 26/04/2019

  - Fixed the Dictionary getByKey and findIndexOfKey methods according to the new benchmarks. Big performance improvement;
  - Added the removeFirst() and removeLast() methods to the Collection class (common methods).


&nbsp;


#### v1.0.0 - 06/03/2019

  - Remove from beta.


&nbsp;


#### v1.0.0-beta.3 - 06/03/2019

  - Name change to publish on npm ("collections-js" -> "js.system.collections");
  - Other fixes.


&nbsp;


#### v1.0.0-beta.2 - 06/03/2019

  - Some fixes to make collections-js compatible for use on Node.js;
  - Added some temporary tests.


&nbsp;


#### v1.0.0-beta.1 - 05/03/2019

  - Migration from https://github.com/joao-neves95/Exercises_Challenges_Courses/blob/master/JavaScript/Collections.js
