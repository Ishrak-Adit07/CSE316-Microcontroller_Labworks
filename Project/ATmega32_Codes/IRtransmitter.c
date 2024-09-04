#include <avr/io.h>
#define F_CPU 8000000UL // Define CPU frequency as 8MHz
#include <util/delay.h>


void USART_Init(unsigned int ubrr) {
  // Set baud rate
  UBRRH = (unsigned char)(ubrr >> 8);
  UBRRL = (unsigned char)ubrr;
  // Enable transmitter
  UCSRB = (1 << TXEN);
  // Set frame format: 8 data bits, 1 stop bit
  UCSRC = (1 << UCSZ1) | (1 << UCSZ0);
}

void USART_Transmit(unsigned char data) {
  // Wait for empty transmit buffer
  while (!(UCSRA & (1 << UDRE)))
  ;
  // Put data into buffer, sends the data
  UDR = data;
}

int main(void) {

  // Initialize USART with baud rate 9600
  USART_Init(51); // For 9600 baud rate with 8MHz frequency
  
  DDRA = 0x00;
  DDRB = 0xFF;
  PORTB = 0x01;
  
  int triggerPush = 0;
  int inactive = 1;

  while (1) {
    
    triggerPush = 0;
    triggerPush = PINA & 0x01;
    
    //inactive = 1;
    inactive = (PINA >> 1) & 0x01;
    
    if(inactive == 0){
      USART_Transmit(0b00000000);
      _delay_ms(300); //3 seconds
      inactive = 1;
    }
    
    triggerPush = PINA & 0x01;
    
    if(triggerPush == 1 && inactive == 1){
      PORTB = 0x00;
      USART_Transmit(0b10101010);
      _delay_ms(10);
      USART_Transmit(0b01010101);
      PORTB = 0x01;
    }
    
    
    else{
      
    }
    
  }
  return 0;
}

// First Player:
// id: 0b10101010
// pass: 0b01010101

//Second Player
// 0b10111011
// 0b11011101

//Transmitter code
//First Player