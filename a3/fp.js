"use strict";

/* global exports */

/**
 * This module supports the Functional Programming style by providing
 * standard accessors and mutators for a list data
 * structure. Additional functions in this module deal with numbers
 * (e.g., add, sub, isLT, isGT, isZero). Some of the included
 * functions (e.g., isEq, isNumber, and the list accessors and
 * constructors) will work fine when manipulating lists of other
 * primitive values (e.g., strings, booleans) or nested lists
 * thereof.
 * 
 * @module fp
 * @author David Furcy - Feb. 2021
 * @version 1.0 (AKA, Assignment 3)
 */

var fp = {};

(function(exports){

 /** hd takes in a non-empty list and returns the first element of that list
    @param  aList {list} - a list of values
    @alias module:fp.hd
    @return {list}  the first element of the input list
    @throws Exception: hd can only be called with a non-empty list.
 */
var hd = function (list) { 
    if (isList(list) && (list.length>0)) {
        return list[0]; 
    } else {
        throw new Error("hd can only be called on a non-empty list.");
    }
};
/** tl takes in a non-empty list and returns a copy of the input list with 
    its first element removed
    @param  aList {list} - a list of values
    @alias module:fp.tl
    @return {list} a copy of the input list with its first element removed
    @throws Exception: tl can only be called with a non-empty list.
 */
var tl = function (list) { 
     if (list.length>0) {
         return list.slice(1); 
     } else {
        throw new Error("tl can only be called on a non-empty list.");
     }
};
/** isList takes in a single argument and returns true if it is a list,
    false otherwise
    @param  argument - any value
    @alias module:fp.isList
    @return {boolean} true if argument is a list, false otherwise
 */
var isList = function (a) {
    return a && typeof a === 'object' && a.constructor === Array; 
};
/** cons takes in a value and a list and returns a new list that is a copy
    of the second argument with the first argument inserted in front
    @param  value  - any value
    @param  aList {list} - a list of values
    @alias module:fp.cons
    @return {list} a copy of the input list with value inserted in front
    @throws Exception: The second argument of cons must be a list.
 */
var cons = function (e,list) {
    if (isList(list)) {
        var result = list.slice(0); // makes a copy of list
        result.unshift(e);
        return result;
    } else {
        throw new Error("The second argument of cons must be a list.");
    }
};
/** isNull takes in a list and returns true if it is empty,
    false otherwise
    @param  aList {list} - a list
    @alias module:fp.isNull
    @return {boolean} true if the input list is empty, false otherwise
    @throws Exception: The argument of isNull must be a list.
 */
var isNull = function (list) { 
    if (isList(list)) {
        return list.length === 0; 
    } else {
        throw new Error("The argument of isNull must be a list.");
    }
};
// this function is not exported
var isPrimitive = function (a) {
    var type = typeof a;
    return type !== 'object' && type !== 'function' || a === null;
};
/** isEq takes in two primitive values and returns true if they are
    the same, false otherwise 
    @param v1  - any primitive value
    @param v2  - any primitive value
    @alias module:fp.isEq
    @return {boolean} true if the two primitive input values are the same, 
    false otherwise 
    @throws Exception: Both arguments of isEq must be primitive values.
 */
var isEq = function (a,b) { 
    if (isPrimitive(a) && isPrimitive(b)) {
        return a === b; 
    } else {
        throw new Error("Both arguments of isEq must be primitive values.");
    }
};
/** isZero takes in a number and returns true if it is equal to 0,
    false otherwise 
    @param n {number} - any number
    @alias module:fp.isZero
    @return {boolean} true if the input value is equal to 0, false otherwise 
    @throws Exception: The argument of isZero must be a number. 
 */
var isZero = function (a) { 
    if (typeof a === 'number') {
        return a === 0; 
    } else {
        throw new Error("The argument of isZero must be a number.");
    }
};
/** makeList takes in 0 or more values and returns a single list
    containing all of the input values in the same order
    @param 0_or_more_args - 0 or more arguments
    @alias module:fp.makeList
    @return {list} a list of all of the arguments in the same order
    @example makeList() returns []
    @example makeList(1) returns [1]
    @example makeList(1,2,3,4,5) returns [1,2,3,4,5]
 */
var makeList = function ( /* arguments */  ) {
    return Array.prototype.slice.call(arguments,0);
};
/** isNumber returns true if its single argument is a number, false otherwise
    @param aValue - any value
    @alias module:fp.isNumber
    @return {boolean} true if the argument is a number, false otherwise
 */
var isNumber = function (a) { 
    return Number.isFinite(a); 
};
/** isLT takes in two numbers and returns true if the first number is less than
    the second number, false otherwise
    @param n1 {number} - any finite number    
    @param n2 {number} - any finite number
    @alias module:fp.isLT
    @return {boolean} true if the first number is less than the second 
    number, false otherwise
    @throws Exception: Both arguments of isLT must be numbers.
 */
var isLT = function (a,b) {
    if (isNumber(a) && isNumber(b)) {
        return a < b; 
    } else {
        throw new Error("Both arguments of isLT must be numbers.");     
    }
};
/** isGT takes in two numbers and returns true if the first number is 
    greater than the second number, false otherwise
    @param n1 {number} - any finite number    
    @param n2 {number} - any finite number
    @alias module:fp.isGT
    @return {boolean} true if the first number is greater than the second 
    number, false otherwise
    @throws Exception: Both arguments of isGT must be numbers.
 */
var isGT = function (a,b) {
    if (isNumber(a) && isNumber(b)) {
        return a > b; 
    } else {
        throw new Error("Both arguments of isGT must be numbers.");     
    }
};
// this function is not exported
var makeArithmeticOp = function (name,f) {
    return function (a,b) {
        if (Number.isFinite(a) && Number.isFinite(b)) {
            return f(a,b);
        } else {
            throw new Error(name + " can only be called with two integers.");   
        }
    };
};
/** add takes in two numbers and returns their sum
    @function 
    @param n1 {number} - any finite number    
    @param n2 {number} - any finite number
    @alias module:fp.add
    @return {number} the sum of the two inputs
    @throws Exception: Both arguments of add must be numbers.
 */
var add = makeArithmeticOp( "add", function (a,b) { return a+b; } );
/** sub takes in two numbers n1 and n2 and returns n1 - n2
    @function 
    @param n1 {number} - any finite number    
    @param n2 {number} - any finite number
    @alias module:fp.sub
    @return {number} the result of subtracting the second number from the first
    one
    @throws Exception: Both arguments of sub must be numbers.
 */
var sub = makeArithmeticOp( "sub", function (a,b) { return a-b; } );

exports.hd = hd;
exports.tl = tl;
exports.cons = cons;
exports.isList = isList;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isEq = isEq;
exports.isGT = isGT;
exports.isLT = isLT;
exports.isZero = isZero;
exports.makeList = makeList;
exports.add = add;
exports.sub = sub;

})(typeof exports === 'undefined' ? fp : exports);
