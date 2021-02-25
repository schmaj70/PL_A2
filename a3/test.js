var fileName = 'a3';
var selectedTest = process.argv[2];
var solution; // student's solution code

/////////////////////// define the test suite /////////////////////////
var tests = [
    /*  0 */ "consecutiveSum( [1,2,3],3 )",
    /*  1 */ "consecutiveSum( [1,2,3],5 )",
    /*  2 */ "consecutiveSum( [1,2,3],2 )",
    /*  3 */ "consecutiveSum( [1,2,3],10 )",
    /*  4 */ "consecutiveSum( [],0 )",
    /*  5 */ "consecutiveSum( [1],1 )",
    /*  6 */ "addIfNew( [1,2,3],5 )",
    /*  7 */ "addIfNew( [1,2,3],1 )",
    /*  8 */ "addIfNew( [1,2,3],2 )",
    /*  9 */ "addIfNew( [1,2,3],3 )",
    /* 10 */ "addIfNew( [ ],3 )",
    /* 11 */ "removeDuplicates([])",
    /* 12 */ "removeDuplicates([1,2,3,4,5])",
    /* 13 */ "removeDuplicates([1,1,1,1,1,1])",
    /* 14 */ "removeDuplicates([1,2,3,3,4,2,5,1,3,2,2])",
    /* 15 */ "fillIn(1,4)",
    /* 16 */ "fillIn(4,-1)",
    /* 17 */ "fillIn(5,5)",
    /* 18 */ "fillIn(4,5)",
    /* 19 */ "removeLast( [] )",
    /* 20 */ "removeLast( [1] )",
    /* 21 */ "removeLast( [1,2,3,4] )",
    /* 22 */ "removeLast( [[1,2],[3],[[[4]]],[5,[6]]] )",
    /* 23 */ "removeLast( [1,[2,[3,[4,[5,6],7],8],9],10] )",    
    /* 24 */ "intersperse( [1,3,5], [2,4,6] )",
    /* 25 */ "intersperse( [1,3,5,7,8], [2,4,6] )",
    /* 26 */ "intersperse( [1,3,5], [2,4,6,7,8] )",
    /* 27 */ "intersperse( [1], [] )",
    /* 28 */ "intersperse( [], [1] )",
    /* 29 */ "intersperse( [], [] )"    
];

////////////////// load the student's solution  //////////////////////
process.stdout.write("\nLoading student code... ");
try {
    solution = require('./' + fileName);
    console.log(" done\n");
} catch (e) {
    console.log("\nError loading the student's solution code from " 
		+ fileName + ".js\n");
    process.exit(1);
}

///////////////////////// run the test(s) /////////////////////////////
if (selectedTest) {
    if ( (/^[0-9]+$/.test(selectedTest)) &&
	 (Number(selectedTest) < tests.length) ) {
	runTest(selectedTest)
    } else {
	console.log("Error: Test number is invalid or out of range");
	process.exit(1);
    }
} else { 
    console.log("===========================");
    console.log("Test suite for", fileName +".js");
    console.log("===========================");
    for(var i=0; i<tests.length; i++) {
	runTest(i);
    }
}

/////////////// helper function to run one test //////////////////
function runTest(testNumber) {
    var test = tests[testNumber];
    var output;
    var fname = "addIfNew";
    var args = [[1,2,3],4];
    
    var fn = solution[fname];
    try {
	console.log("Test #",testNumber);
	output = eval( "solution." + test );
	console.log( "", test )
	process.stdout.write(" ==> ");
	console.log( JSON.stringify(output) );
    } catch (e) {
	console.log(e.message);
    }
    console.log("----------------------------------------------------");
}
