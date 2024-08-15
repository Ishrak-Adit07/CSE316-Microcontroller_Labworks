TITLE PROBLEM_1 : TOTAL_CANDY_NUMBER

.MODEL SMALL
.STACK 100H

.DATA
    CR EQU 0DH
    LF EQU 0AH
    BS EQU 20H
    
    n DW 0
    k DW 0
    TOTAL_CANDY DW 0
    
PROMPT DB 'ENTER VALUE FOR n AND k: $'
OUTPROMPT DB CR, LF, 'POSSIBLE CANDY NUMBER IN TOTAL: ' 
NEWLINE DB CR, LF, '$'
 

.CODE
MAIN PROC
    
    ;Initializing DS
    MOV AX, @DATA
    MOV DS, AX

PROMPT_N:    
    ;Prompting user for input n
    LEA DX, PROMPT
    MOV AH, 9
    INT 21H
    
    ;Taking input n
    MOV CX, 10
    
INPUT_N:
    MOV AH, 1
    INT 21H
    
    CMP AL, BS
    JNE INPUT_PROC_N
    
    JMP PROMPT_K

INPUT_PROC_N:
    SUB AL, 30H
    XOR BX, BX
    MOV BL, AL
    
    XOR AX, AX
    XOR DX, DX
    
    MOV AX, n
    MUL CX   
    
    ADD AX, BX
    MOV n, AX
    
    JMP INPUT_N 
    
PROMPT_K:
    ;No extra prompt required   
    MOV CX, 10
    
INPUT_K:
    MOV AH, 1
    INT 21H
    
    CMP AL, CR
    JNE INPUT_PROC_K
    
    JMP TOTAL_CANDY_COUNTING
    
INPUT_PROC_K:
    SUB AL, 30H
    XOR BX, BX
    MOV BL, AL
    
    XOR AX, AX
    XOR DX, DX
    
    MOV AX, k
    MUL CX
    
    ADD AX, BX
    MOV k, AX
    
    JMP INPUT_K

TOTAL_CANDY_COUNTING:
    
    ;Setting initial value for total_candy
    MOV BX, n
    MOV TOTAL_CANDY, BX
    
    ;Starting count procedure 
    JMP COUNT_WHILE
    
COUNT_WHILE:
    
    ;Getting more candy while having enough wrapper
    MOV BX, n
    CMP BX, k
    JL END_WHILE 
    
    MOV BX, n
    SUB BX, k   ;Sub k wrappers for exchange
    INC BX      ;Add 1 wrapper for new candy
    MOV n, BX
    
    INC TOTAL_CANDY ;Add 1 to total candy
    JMP COUNT_WHILE ;Keep counting
    
END_WHILE: 
    
    ;Newline for Display
    LEA DX, NEWLINE
    MOV AH, 9
    INT 21H
    
    LEA DX, OUTPROMPT
    MOV AH, 9
    INT 21H
    
    MOV AX,TOTAL_CANDY
    XOR BX, BX
    
DISPLAY_CANDY:
    
    CMP AX, 0
    JE PRINT
    
    MOV CX, 10
    XOR DX, DX
    DIV CX
    
    PUSH DX
    INC BX

    JMP DISPLAY_CANDY
    
PRINT:
    CMP BX, 0
    JE EXIT
    
    POP DX
    ADD DX, 30H
    
    MOV AH, 2
    INT 21H
    
    DEC BX
    JMP PRINT
    
EXIT:
    MOV AH, 4CH     ;DOS exit
    INT 21H
    
    
MAIN ENDP
    END MAIN