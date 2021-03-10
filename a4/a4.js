var fp = require('./fp');

/****************************************************************

   Your names:  Cole Krajewski
                Jeffrey Schmadebeck
                ______________________ 

 ****************************************************************/

if ( ! exports ) {
   var exports = [ ];
}

var filter = function (pred,lst)
{
    return fp.reduce(function(a,x){
        if(pred(x))
            return fp.cons(x,a);
        else
            return a;
    }, lst, []);

};


var map = function (f,lst)
{

    return fp.reduceRight(function(x,a){
        return fp.cons(f(x),a)
    }, lst, [])
    
};

var flatten = function (lsts)
{
    return fp.reduceRight(function(hd, x) { return fp.reduceRight(fp.cons, hd, x)}, lsts, []);
    
};

var compose = function (lst)
{
   
    if(fp.isNull(fp.tl(lst))){
        return fp.hd(lst);
    }
    else
        return fp.reduce(fp.compose, fp.tl(lst), fp.hd(lst));
};

var maxOfMins = function (lsts)
{
    var mapper = function(lst) {
        return fp.reduce(fp.min, fp.tl(lst), fp.hd(lst)); //return min from given list
    } 

    var reducer = function(n1, n2){
        return fp.max(n1, n2); //returns biggest number 
    } 

    return fp.reduce(
        reducer //reducer
        ,       
        fp.map(mapper,lsts) //fp.map(mapper, lsts)
        ,       
        fp.hd(fp.hd(lsts))
    );
};

exports.filter = filter;
exports.map = map;
exports.flatten = flatten;
exports.compose = compose;
exports.maxOfMins = maxOfMins;
