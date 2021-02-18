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
          {return $1;}
        ;
b
        : c
          {$$ = $1;}
        | b "PLUS" c //good
          {$$ = $1 + $3;}
        | b "MINUS" c //good
          {$$ = $1 - $3;}
        | b "TIMES" c //good
          {$$ = $1 * $3;}
        | b "DIV" c //good
          {$$ = Math.floor($1 / $3);}
        | b "MOD" c //good
          {$$ = $1 % $3;}
        | b "LT" c //good
          {$$ = $1 < $3;}
        | b "GT" c //good
          {$$ = $1 > $3;}
        | b "BNOT" //TODO errors out
          {$$ = ~$1;}
        | b "OR" c //good
          {$$ = $1 | $3;}
        | b "AND" c //good
          {$$ = $1 & $3;}
        | b "XOR" c //good
          {$$ = $1 ^ $3;}
        ;
c
        : "NUMBER"
          {$$ = Number($1);} //good
        | "LPAREN" a "RPAREN"
          {$$ = $2;}
        ;
        
