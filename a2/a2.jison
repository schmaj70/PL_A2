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

program : exp "EOF"   { return JSON.stringify($1); }
        ;

exp
        : term
          {return $1;}
        ;
        term
        : factor
          {$$ = $1;}
        | term "PLUS" factor //good
          {$$ = $1 + $3;}
        | term "MINUS" factor //good
          {$$ = $1 - $3;}
        | term "TIMES" factor //good
          {$$ = $1 * $3;}
        | term "DIV" factor //good
          {$$ = Math.floor($1 / $3);}
        | term "MOD" factor //good
          {$$ = $1 % $3;}
        | term "LT" factor //good
          {$$ = $1 < $3;}
        | term "GT" factor //good
          {$$ = $1 > $3;}
        | term "BNOT" //TODO errors out
          {$$ = ~$1;}
        | term "OR" factor //good
          {$$ = $1 | $3;}
        | term "AND" factor //good
          {$$ = $1 & $3;}
        | term "XOR" factor //good
          {$$ = $1 ^ $3;}
        ;
        factor
        : "NUMBER"
          {$$ = Number($1);} //good
        | "LPAREN" exp "RPAREN"
          {$$ = $2;}
        ;
        
