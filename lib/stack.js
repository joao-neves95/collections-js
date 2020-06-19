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
      define( 'Stack', ['errors'], factory );
  
    } else if ( typeof module === 'object' && module.exports ) {
      // CommonJS.
      module.exports['Stack'] = factory( require( './js.system.collections' )['Errors'] );
  
    } else {
      // Browser.
      root.Stack = factory();
    }
  })( typeof global !== 'undefined' ? global : this.window || this.global, function( Errors ) {
  
    class Stack {
        
        constructor() {
          this.____elements = [];
        }

        get length() {
          return this.____elements.length;
        }

        /**
         * Sets the array storage value to null and creates a new one.
         *
         * @memberof Stack
         */
        clear() {
          this.____elements = null;
          this.____elements = [];
        }

        /**
         * Pops every element of the array storage,
         * maintaining the same underling array store.
         *
         * @memberof Stack
         */
        clearSafe() {
          while(this.____elements.length) {
            this.____elements.pop();
          }
        }

        /**
         * Sets the top element.
         *
         * @param {*} value
         * @memberof Stack
         */
        push(value) {
          this.____elements.push( value );
        }

        /**
         * Pops the most recent element and returns it (top).
         *
         * @param {*} value
         * @returns
         * @memberof Stack
         */
        pop(value) {
          if (this.length === 0) {
            return Errors.codeEmpty;
          }

          return this.____elements.pop();
        }

        /**
         * Returns the most recent element (top).
         *
         * @returns
         * @memberof Stack
         */
        peek() {
          if (this.length === 0) {
            return Errors.codeEmpty;
          }
          
          return this.____elements[this.length - 1];
        }

        /**
         * Returns all elements in an array.
         *
         * @returns
         * @memberof Stack
         */
        peekAll() {
          return this.____elements;
        }

    }
  
    return Stack;
  });
  