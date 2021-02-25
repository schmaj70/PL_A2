/********************************************
   CS 331 - A3

   Your names  :  ________________________

                  ________________________

                  ________________________

 ********************************************/

var fp = require('./fp');

if ( ! exports ) {
   var exports = [ ];
}

var consecutiveSum = function (ns,sum)
{

    /* to be completed */
    
};

var addIfNew = function(ns,n)
{

    /* to be completed */
    
};

var removeDuplicates = function (ns)
{

    /* to be completed */
    
};

var fillIn = function(n1, n2)
{

    /* to be completed */
    if(fp.isEq(n1,n2))
        return fp.makeList(n1);
    else if(fp.isLT(n1,n2))
        return fp.cons(n1, fillIn( fp.add(n1 , 1) , n2 ) );
    else if(fp.isLT(n2,n1))
        return fp.cons(n1, fillIn( fp.sub(n1 , 1) , n2 ) );
    
};

var removeLast = function(tree)
{
    /* to be completed */
    if( fp.isNull(tree) )
        return [ ];
    else if( fp.isNull( fp.tl(tree) ) )
        return [ ];
    else if( fp.isList( fp.hd(tree) ) )
        return fp.cons( removeLast( fp.hd(tree) ), removeLast( fp.tl(tree) ) );
    else
        return fp.cons( fp.hd(tree), removeLast( fp.tl(tree) ) );
};

var intersperse = function(ms,ns)
{

    /* to be completed */
    if( fp.isNull(ms) )
        return ns;
    else if( fp.isNull(ns) )
        return ms;
    else
        return fp.cons( fp.hd(ms), intersperse( ns, fp.tl(ms) ) );
};

exports.consecutiveSum = consecutiveSum;
exports.addIfNew = addIfNew;
exports.removeDuplicates = removeDuplicates;
exports.fillIn = fillIn;
exports.removeLast = removeLast;
exports.intersperse = intersperse;
