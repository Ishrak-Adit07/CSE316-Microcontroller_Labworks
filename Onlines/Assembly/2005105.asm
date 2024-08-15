TITLE PROBLEM_2 : SUM_OF_DIGITS

.MODEL SMALL
.STACK 100H

.DATA
    CR EQU 0DH
    LF EQU 0AH
    BS EQU 20H
    
    VOWEL_COUNT DW 0
    CONSONANT_COUNT DW 0
    CHAR_COUNT DW 15
    
VOWEL_PROMPT DB 'VOWEL_COUNT: $'
CONSONANT_PROMPT DB CR, LF, 'CONSONANT_COUNT: $' 
NEWLINE DB CR, LF, '$'

INPUT DW 'qwertykeyboards'
 

.CODE
MAIN PROC
    
    ;Initializing DS
    MOV AX, @DATA
    MOV DS, AX 
    
    LEA SI, INPUT
    MOV BX, [SI]
    
    MOV CX, CHAR_COUNT
    
CHECK_CHAR:
    
    MOV BX, [SI]
    
    CMP BX, 'a'
    JE VOWEL_COUNT_INC
    
    CMP BX, 'e'
    JE VOWEL_COUNT_INC 
    
    CMP BX, 'i'
    JE VOWEL_COUNT_INC
    
    CMP BX, 'o'
    JE VOWEL_COUNT_INC
    
    CMP BX, 'u'
    JE VOWEL_COUNT_INC
    
    INC CONSONANT_COUNT
    
    ADD SI, 2
    LOOP CHECK_CHAR
    
VOWEL_COUNT_INC:
    INC VOWEL_COUNT
    
    ADD SI, 2
    LOOP CHECK_CHAR    

DISPLAY_X:
    MOV AX, VOWEL_COUNT
    XOR BX, BX  
    
    JMP DISPLAY_VOWEL_COUNT
    
DISPLAY_VOWEL_COUNT:
    
    CMP AX, 0
    JE PRINT_VOWEL_COUNT
    
    MOV CX, 10
    XOR DX, DX
    DIV CX
    
    PUSH DX
    INC BX
    JMP DISPLAY_VOWEL_COUNT
    
PRINT_VOWEL_COUNT:
    CMP BX, 0
    JE DISPLAY_Y ;Done when all digits are printed
    
    POP DX
    ADD DX, 30H ;Restoring digit character
       
    MOV AH, 2 ;Final print
    INT 21H
    
    DEC BX
    JMP PRINT_VOWEL_COUNT
    
DISPLAY_Y: 
    MOV AX, 0
    MOV AX, CONSONANT_COUNT
    XOR BX, BX  
    
    JMP DISPLAY_CONSONANT_COUNT
    
DISPLAY_CONSONANT_COUNT:
    
    CMP AX, 0
    JE PRINT_CONSONANT_COUNT
    
    MOV CX, 10
    XOR DX, DX
    DIV CX
    
    PUSH DX
    INC BX
    JMP DISPLAY_CONSONANT_COUNT
    
PRINT_CONSONANT_COUNT:
    CMP BX, 0
    JE EXIT ;Done when all digits are printed
    
    POP DX
    ADD DX, 30H ;Restoring digit character
       
    MOV AH, 2 ;Final print
    INT 21H
    
    DEC BX
    JMP PRINT_CONSONANT_COUNT
    
EXIT:
    MOV AH, 4CH     ;DOS exit
    INT 21H
    
    
MAIN ENDP

    END MAIN