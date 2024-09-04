#include <avr/io.h>
#define F_CPU 8000000UL // Define CPU frequency as 8MHz
#include <util/delay.h>

// #define USART_BAUDRATE 9600
#define BAUD_PRESCALE (((F_CPU / (USART_BAUDRATE * 16UL))) - 1)

void USART_Init(unsigned int ubrr)
{
  // Set baud rate
  UBRRH = (unsigned char)(ubrr >> 8);
  UBRRL = (unsigned char)ubrr;
  // Enable receiver and transmitter
  UCSRB = (1 << RXEN) | (1 << TXEN);
  // Set frame format: 8 data, 1 stop bit
  UCSRC = (1 << UCSZ1) | (1 << UCSZ0);
}

void USART_Transmit(unsigned char data)
{
  while (!(UCSRA & (1 << UDRE)))
    ;
  UDR = data;
}

unsigned char UART_RxChar()
{
  while ((UCSRA & (1 << RXC)) == 0)
    ;
  return (UDR);
}

void UART_TxChar(char ch)
{
  while (!(UCSRA & (1 << UDRE)))
    ; /* Wait for empty transmit buffer*/
  UDR = ch;
}

void UART_SendString(char *str)
{
  unsigned char j = 0;

  while (str[j] != 0) /* Send string till null */
  {
    UART_TxChar(str[j]);
    j++;
  }
}

int main()
{

  USART_Init(51); // For 9600 baud rate with 8MHz frequency

  DDRB = 0xFF;
  DDRA = 0xFF;

  char c = 0;
  char hit = 0;

  // For hit count

  while (1)
  {
    PORTB = 0x0F;
    PORTA = 0x00; // For ESP32

    if (hit == 0)
    {
      c = UART_RxChar();
    }
    else
    {
      continue;
    }

    if (c == 0b11011101)
    {

      PORTB = 0xF0;
      hit = 1;
      PORTA = 0x01;
      _delay_ms(10);
      // PORTA = 0xFF;
      UCSRB &= ~((1 << RXEN) | (1 << TXEN));
      PORTA = 0x00;
      _delay_ms(300);
      hit = 0;
      UCSRB |= (1 << RXEN) | (1 << TXEN);
      // PORTA = 0x00;
    }
  }
}

// Receiver code

// First Player:
// 0b10101010
// 0b01010101

// Second Player:
//  0b10111011
//  0b11011101

// Receiver code
// First Player