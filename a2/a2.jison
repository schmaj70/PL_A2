/* 
    description: CS 331 - Spring 2021 - A2

    your names: Jeffrey Schmadebeck

                Cole ???
                  
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
  : b
    {$$ = $1;}
  | b "GT" a //good
    {$$ = $1 > $3;}
  ;
b
  : c
    {$$ = $1;}
  | c "LT" d //good
    {$$ = $1 < $3;}
  ;

c
  : d
    {$$ = $1;}
  | "BNOT" d //TODO errors out
    {$$ = ~$1;}
  ;

d
  : e
    {$$ = $1;}
  | d "OR" e //good
    {$$ = $1 | $3;}
  | d "AND" e //good
    {$$ = $1 & $3;}
  | d "XOR" e //good
    {$$ = $1 ^ $3;}
  ;

e
  : f
    {$$ = $1;}
  | f "PLUS" e //good
    {$$ = $1 + $3;}
  | f "MINUS" e //good
    {$$ = $1 - $3;}
  ;

f
  : g
    {$$ = $1;}
  | f "TIMES" g //good
    {$$ = $1 * $3;}
  | f "DIV" g //good
    {$$ = Math.floor($1 / $3);}
  | f "MOD" g //good
    {$$ = $1 % $3;}
  ;

g
  : "NUMBER"
    {$$ = Number($1);} //good
  | "LPAREN" a "RPAREN"
    {$$ = $2;}
  ;
        
