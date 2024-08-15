TITLE PROBLEM_2 : SUM_OF_DIGITS

.MODEL SMALL
.STACK 100H

.DATA
    CR EQU 0DH
    LF EQU 0AH
    BS EQU 20H
    
    NUMBER DW 0
    SUM DW 0
    
PROMPT DB 'ENTER NUMBER: $'
OUTPROMPT DB CR, LF, 'SUM OF DIGITS: $' 
NEWLINE DB CR, LF, '$'
 

.CODE
MAIN PROC
    
    ;Initializing DS
    MOV AX, @DATA
    MOV DS, AX
    
    ;Prompting user for input number
    LEA DX, PROMPT
    MOV AH, 9
    INT 21H
    
    ;Preparing CX for multiplication
    MOV CX, 10
    
;Taking input number
INPUT_N:
    MOV AH, 1
    INT 21H
    
    CMP AL, CR
    JNE INPUT_PROC_N
    
    ;Input done, proceed to calculate sum
    JMP SUM_PROC

INPUT_PROC_N:
    ;Storing new character
    SUB AL, 30H
    XOR BX, BX
    MOV BL, AL
    
    ;Multiplying prev number by 10
    XOR AX, AX
    XOR DX, DX
    
    MOV AX, NUMBER
    MUL CX
    
    ;Adding new digit
    ADD AX, BX
    
    ;Storing new number
    MOV NUMBER, AX
    
    ;Repeat
    JMP INPUT_N 

SUM_PROC:
    
    ;Saving given number
    MOV AX, NUMBER
    PUSH AX
    
    ;Calling function to calculate sum
    CALL SUM_OF_DIGITS 
    
    ;Displaying sum of digits
    LEA DX, OUTPROMPT
    MOV AH, 9
    INT 21H
    
    ;Storing sum in output register
    MOV SUM, BX
    MOV AX, SUM
    XOR BX, BX  
    
    JMP DISPLAY_SUM
    
DISPLAY_SUM:
    
    CMP AX, 0
    JE PRINT
    
    MOV CX, 10
    XOR DX, DX
    DIV CX
    
    PUSH DX
    INC BX
    JMP DISPLAY_SUM
    
PRINT:
    CMP BX, 0
    JE EXIT ;Done when all digits are printed
    
    POP DX
    ADD DX, 30H ;Restoring digit character
       
    MOV AH, 2 ;Final print
    INT 21H
    
    DEC BX
    JMP PRINT
    
EXIT:
    MOV AH, 4CH     ;DOS exit
    INT 21H
    
    
MAIN ENDP


SUM_OF_DIGITS PROC
    
    PUSH BP
    MOV BP, SP
    
    CMP WORD PTR[BP+4], 0   ;Checking if all digits are parsed
    JG ADD_NEXT_DIGIT
    
    XOR BX, BX
    JMP END_CALC
    
ADD_NEXT_DIGIT:
    
    MOV AX, [BP+4]  ;Pointer to next Digit in Stack
    
    MOV CX, 10
    XOR DX, DX
    DIV CX 
    
    PUSH DX     ;Storing Remainder 
    PUSH AX     ;Storing Quotient for next operation
    
    CALL SUM_OF_DIGITS  ;Calling function recursively to add the next digit
    
    POP DX
    ADD BX, DX 

END_CALC:
    POP BP
    RET 2
    
    
SUM_OF_DIGITS ENDP

    END MAIN