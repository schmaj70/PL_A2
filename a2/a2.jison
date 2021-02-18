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
    {$$ = [['a', $1], $1];}
  | b "GT" a
    {$$ = [['a', $1, '>', $3], $1 > $3];}
  ;
b
  : c
    {$$ =[['b', $1], $1];}
  | c "LT" d
    {$$ = [['b', $1, '<', $3],$1 < $3];}
  ;

c
  : d
    {$$ = [['c', $1],$1];}
  | "BNOT" d
    {$$ = [['c', '~', $2], ~$2];}
  ;

d
  : e
    {$$ = $1;}
  | d "OR" e
    {$$ = $1 | $3;}
  | d "AND" e 
    {$$ = $1 & $3;}
  | d "XOR" e 
    {$$ = $1 ^ $3;}
  ;

e
  : f
    {$$ = $1;}
  | f "PLUS" e 
    {$$ = $1 + $3;}
  | f "MINUS" e 
    {$$ = $1 - $3;}
  ;

f
  : g
    {$$ = $1;}
  | f "TIMES" g 
    {$$ = $1 * $3;}
  | f "DIV" g 
    {$$ = Math.floor($1 / $3);}
  | f "MOD" g 
    {$$ = $1 % $3;}
  ;

g
  : "NUMBER"
    {$$ = Number($1);} 
  | "LPAREN" a "RPAREN"
    {$$ = $2;} //$2
  ;
        
