/* 
    description: CS 331 - Spring 2021 - A2

    your names: Jeffrey Schmadebeck

                Cole Krajewski
                  
*/

// lexical section of the grammar 
// ==============================

%lex
%%
\s+                   /* no return statement, so skip whitespace */
[0-9]+                return "NUMBER"
"<"                   return "LT"
">"                   return "GT"
"~"                   return "BNOT"
"|"                   return "OR"
"&"                   return "AND"
"^"                   return "XOR"
"+"                   return "PLUS"
"-"                   return "MINUS"
"*"                   return "TIMES"
"/"                   return "DIV"
"%"                   return "MOD"
"("                   return "LPAREN"
")"                   return "RPAREN"
<<EOF>>               return "EOF"
.                     return "INVALID"

/lex

%start program

// phrase-structure section of the grammar
// =======================================

%%

program : a "EOF"   { return JSON.stringify($1); }
        ;

        
a
  :  b
    {$$ = [$1[0] ,$1[1]];}
  | b "GT" a
    {$$ = ['(' + $1[0] + '>' + $3[0] + ')', $1[1] > $3[1]];}
  ;
b
  : c
    {$$ =[$1[0] , $1[1]];}
  | c "LT" b
    {$$ = ['(' + $1[0] + '<' + $3[0] + ')', $1[1] < $3[1]];}
  ;

c
  : d
    {$$ = [$1[0] , $1[1]];}
  | "BNOT" c
    {$$ = ['(' + '~' + $2[0] + ')', ~$2[1]];}
  ;

d
  : e
    {$$ = [$1[0], $1[1]];}
  | d "OR" e
    {$$ = ['(' + $1[0] + '|' + $3[0] + ')', $1[1] | $3[1]];}
  | d "AND" e 
    {$$ = ['(' + $1[0] + '&' + $3[0] + ')', $1[1] & $3[1]];}
  | d "XOR" e 
    {$$ = ['(' + $1[0] + '^' + $3[0] + ')', $1[1] ^ $3[1]];}
  ;

e
  : f
    {$$ = [$1[0] , $1[1]];}
  | f "PLUS" e 
    {$$ = ['(' + $1[0] + '+' + $3[0] + ')', $1[1] + $3[1]];}
  | f "MINUS" e 
    {$$ = ['(' + $1[0] + '-' + $3[0] + ')', $1[1] - $3[1]];}
  ;

f
  : g
    {$$ = [$1[0] , $1[1]];}
  | f "TIMES" g 
    {$$ = ['(' + $1[0] + '*' + $3[0] + ')', $1[1] * $3[1]];}
  | f "DIV" g 
    {$$ = [ '(' + $1[0] + '/' + $3[0] + ')', Math.floor($1[1] / $3[1])];}
  | f "MOD" g 
    {$$ = ['(' + $1[0] + '%' + $3[0] + ')',  $1[1] % $3[1]];}
  ;

g
  : "NUMBER" 
    {$$ = [$1[0] , Number($1[0])];} 
  | "LPAREN" a "RPAREN"
    {$$ = [$2[0],  $2[1]];} //$2
  ;