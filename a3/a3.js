/********************************************
   CS 331 - A3

   Your names  :  Jeffrey Schmadebeck
   
                  Cole Krajewski

 ********************************************/

var fp = require('./fp');

if ( ! exports ) {
   var exports = [ ];
}

var consecutiveSum = function (ns,sum)
{
    if( fp.isNull(ns) )
        return false;
    else if( fp.isNull( fp.tl(ns) ) )
        return false;
    else if( fp.isEq(fp.add( fp.hd(ns), fp.hd(fp.tl(ns) )), sum ))
        return true;
    else
        return consecutiveSum( fp.tl(ns), sum );
    
};

var addIfNew = function(ns,n)
{
    if(fp.isNull(ns))
        return fp.makeList(n);
    else if( fp.isEq(fp.hd(ns), n))
        return ns;
    else
        return fp.cons(fp.hd(ns), addIfNew(fp.tl(ns), n));
    
};

var removeDuplicates = function (ns)
{
    if(fp.isNull(ns))
        return [ ];
    else if(fp.isNull( fp.tl(ns) ))
        return ns;
    else if(fp.isEq(fp.hd(ns), fp.hd(fp.tl(ns) )))
        return removeDuplicates(fp.tl(ns));
    else
        return addIfNew(removeDuplicates( fp.tl(ns) ),  fp.hd(ns) );   
};

var fillIn = function(n1, n2)
{
    if(fp.isEq(n1,n2))
        return fp.makeList(n1);
    else if(fp.isLT(n1,n2))
        return fp.cons(n1, fillIn( fp.add(n1 , 1) , n2 ) );
    else if(fp.isLT(n2,n1))
        return fp.cons(n1, fillIn( fp.sub(n1 , 1) , n2 ) );
    
};

var removeLast = function(tree)
{
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
