TITLE PROBLEM_1 : ASCII CHAR CASE DETERMINATION

.MODEL SMALL
.STACK 100H

.DATA  

    CR EQU 0DH
    LF EQU 0AH
    
PROMPT DB 'ENTER SINGLE PRINTABLE ASCII CHARACTER: $' 
UPPERCASE DB CR, LF, 'Uppercase letter$'
LOWERCASE DB CR, LF, 'Lowercase letter$'
NUMERIC DB CR, LF, 'Number$'
OTHERS DB CR, LF, 'Not an alphanumeric value$'

.CODE
MAIN PROC
    ;Initialize DS
    MOV AX, @DATA
    MOV DS, AX
    
    ;Prompting user for input
    LEA DX, PROMPT
    MOV AH, 9
    INT 21H 
    
    ;Taking input
    MOV AH, 1
    INT 21H
    
    ;Checking if char is uppercase
    CMP AL, 'A'
    JNGE CHECKLOWER
    CMP AL, 'Z'
    JNLE CHECKLOWER  
    
    ;Display in case of uppercase
    LEA DX, UPPERCASE
    MOV AH, 9
    INT 21H  
    JMP EXIT
    
CHECKLOWER: 
    
    ;Checking if char is lowercase
    CMP AL, 'a'
    JNGE CHECKNUMBER
    CMP AL, 'z'
    JNLE CHECKNUMBER
    
    ;Display in case of lowercase
    LEA DX, LOWERCASE
    MOV AH, 9
    INT 21H  
    JMP EXIT
    
CHECKNUMBER:
    
    ;Checking if char is number
    CMP AL, '0'
    JNGE GENERAL_DISPLAY
    CMP AL, '9'
    JNLE GENERAL_DISPLAY
    
    ;Display in case of number
    LEA DX, NUMERIC
    MOV AH, 9
    INT 21H 
    JMP EXIT  
    
GENERAL_DISPLAY:
    
    ;Display if none are the case
    LEA DX, OTHERS
    MOV AH, 9
    INT 21H 
    JMP EXIT

EXIT:
    ;return to DOS
    MOV AH, 4CH
    INT 21H         ;DOS exit
    
MAIN ENDP
END MAIN



