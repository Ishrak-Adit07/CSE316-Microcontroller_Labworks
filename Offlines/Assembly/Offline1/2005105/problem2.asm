TITLE PROBLEM_2 : MIDDLE ASCII VALUE

.MODEL SAMLL
.STACK 100H

.DATA
    CR EQU 0DH
    LF EQU 0AH 
    
    CHAR1 DB ?
    CHAR2 DB ?
    CHAR3 DB ?
    
PROMPT DB 'ENTER 3 LOWERCASE LETTERS: $'
EQUASCII_DISPLAY DB CR, LF, 'All letters are equal$'  
NEWLINE DB CR, LF, '$'  

.CODE
MAIN PROC   
    ;Initialize DS
    MOV AX, @DATA
    MOV DS, AX
    
    ;Prompting user for input
    LEA DX, PROMPT
    MOV AH, 9
    INT 21H
    LEA DX, NEWLINE
    INT 21H
    
    ;Taking inputs of 3 ascii chars
    MOV AH, 1
    INT 21H
    MOV CHAR1, AL
    LEA DX, NEWLINE
    MOV AH, 9
    INT 21H  
    
    MOV AH, 1
    INT 21H
    MOV CHAR2, AL
    LEA DX, NEWLINE
    MOV AH, 9
    INT 21H
    
    MOV AH, 1
    INT 21H
    MOV CHAR3, AL
    LEA DX, NEWLINE
    MOV AH, 9
    INT 21H
    
    ;Comparing char1 with char2
    MOV BL, CHAR1
    CMP BL, CHAR2
    JE CMPEQU12     ;if equal, we check if it is also equal to char3 or not
    
    ;Comparing char2 with char3
    MOV BL, CHAR2
    CMP BL, CHAR3
    JE CMPEQU23     ;if equal, we check if it is also equal to char1 or not
    
    ;Comparing char1 with char3
    MOV BL, CHAR1
    CMP BL, CHAR3
    JE CMPEQU13     ;if equal, we check if it is also equal to char2 or not
    
    ;Again, comparing char1 with char2
    MOV BL, CHAR1
    CMP BL, CHAR2
    JG CMPAC        ;if char1 > char2, we move to cmp char1 with char3  
    
    MOV BL, CHAR2           
    CMP BL, CHAR3   ;if char2 > char1, & => 
    JL OUT2         ;char2 < char3, char2 is middle ascii
    
    MOV BL, CHAR1
    CMP BL, CHAR3
    JG OUT1         ;char1 > char3, char1 is middle ascii 
    
    JMP OUT3        ;if none match, char3 is middle ascii
    
CMPEQU12:
    MOV BL, CHAR1
    CMP BL, CHAR3  
    JE OUT4         ;char1==char2==char3
    
    MOV BL, CHAR1   ;char1==char2 <> char3
    CMP BL, CHAR3
    JG OUT3
    
    JMP OUT1

CMPEQU23:
    MOV BL, CHAR2
    CMP BL, CHAR1
    JE OUT4         ;char1==char2==char3
    
    MOV BL, CHAR2   ;char2==char3 <> char1
    CMP BL, CHAR1
    JG OUT1
    
    JMP OUT2

CMPEQU13:
    MOV BL, CHAR1
    CMP BL, CHAR2
    JE OUT4         ;char1==char2==char3
    
    MOV BL, CHAR1   ;char1==char3 <> char2
    CMP BL, CHAR2
    JG OUT2
    
    JMP OUT1
    
CMPAC:
    MOV BL, CHAR1
    CMP BL, CHAR3
    JL OUT1          ;char1 > char2 and char1 < char3
    
    MOV BL, CHAR2
    CMP BL, CHAR3
    JG OUT2          ;char2 < char1 and char2 > char3
    
    JMP OUT3         ;char3 > char1 and char3 < char2

;Displaying different characters as middle ascii
OUT1:
    MOV DL, CHAR1
    MOV AH, 2
    INT 21H
    JMP EXIT
OUT2:      
    MOV DL, CHAR2
    MOV AH, 2
    INT 21H
    JMP EXIT
OUT3:      
    MOV DL, CHAR3
    MOV AH, 2
    INT 21H
    JMP EXIT

;Displaying that all have equal ascii values    
OUT4:
    LEA DX, EQUASCII_DISPLAY
    MOV AH, 9
    INT 21H
    JMP EXIT

;return to DOS    
EXIT:
    MOV AH, 4CH
    INT 21H          ;DOS exit 
  
MAIN ENDP
    END MAIN


    

