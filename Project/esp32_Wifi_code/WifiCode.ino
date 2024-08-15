/**
 * BasicHTTPClient.ino
 *
 *  Created on: 24.05.2015
 *
 */

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

//This esp32 and webserver were connected to same wifi
const char* ssid = "Your_Wifi_Name";
const char* password = "Your_Wifi_Password";
char jsonOutput[128];

const int HIT_DETECTION_PIN = 5;
int hitDetection = 0;

void setup(){

  pinMode(HIT_DETECTION_PIN, INPUT);

  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Connecting to wifi");

  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConnected to the wifi network");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if(WiFi.status() == WL_CONNECTED){

    //long rnd = random(1, 10);
    HTTPClient client;
    //client.begin("http://jsonplaceholder.typicode.com/comments?id=" + String(rnd));
    client.begin("http://{device_ip_address}:{server_port_number}/login/id"); //Arbitrary api end point
    client.addHeader("Content-Type", "application/json");

    const size_t CAPACITY = JSON_OBJECT_SIZE(1);
    StaticJsonDocument<CAPACITY> doc;

    JsonObject object = doc.to<JsonObject>();
    object["team"] = "red";
    object["number"] = 1;
    object["id"] = "0b10101010";
    object["password"] = "0b10101111";
    /*
    object["team"] = "green";
    object["number"] = 1;
    object["id"] = "0b10101010";
    object["password"] = "0b10101111";
    */

    serializeJson(doc, jsonOutput);

    int httpCode = client.POST(String(jsonOutput));

    if(httpCode > 0){

      String payload = client.getString();
      Serial.println("\nStatus code: " + String(httpCode));
      Serial.println(payload);

      char json[500];
      payload.replace(" ", "");
      payload.replace("\n", "");
      payload.trim();
      payload.remove(0, 1);
      payload.toCharArray(json, 500);

      StaticJsonDocument<200> doc;
      deserializeJson(doc, json);

      const char* id = doc["id"];
      const char* password = doc["password"];

      Serial.println(String(id));
      Serial.println(String(password));

      client.end();
    }
    else{

      Serial.println("Error on http POST id request");

    }

  }
  else{

    Serial.println("Connection lost");

  }

} //setup

void loop(){

  if(WiFi.status() == WL_CONNECTED){

    hitDetection = 0;
    hitDetection = digitalRead(HIT_DETECTION_PIN);

    if( hitDetection == HIGH ){

      //long rnd = random(1, 10);
      HTTPClient client;
      //client.begin("http://jsonplaceholder.typicode.com/comments?id=" + String(rnd));
      client.begin("http://192.168.130.46:4000/login/score");
      client.addHeader("Content-Type", "application/json");

      const size_t CAPACITY = JSON_OBJECT_SIZE(1);
      StaticJsonDocument<CAPACITY> doc;

      JsonObject object = doc.to<JsonObject>();
       object["playerID"] = "0b10101010";
      object["opponent1HitCount"] = 2;
      object["friend1HitCount"] = 0;

      serializeJson(doc, jsonOutput);

      int httpCode = client.POST(String(jsonOutput));

      if(httpCode > 0){

        String payload = client.getString();
        Serial.println("\nStatus code: " + String(httpCode));
        Serial.println(payload);

        char json[500];
        payload.replace(" ", "");
        payload.replace("\n", "");
        payload.trim();
        payload.remove(0, 1);
        payload.toCharArray(json, 500);

        StaticJsonDocument<200> doc;
        deserializeJson(doc, json);

        const char* name = doc["playerName"];
        int score = doc["score"];

        Serial.println(String(name));
        Serial.println(String(score));

        client.end();
      }

      //Request no successful
      else{

        Serial.println("Error on http POST score request");

      }
      
    }

    // hitDetection =- LOW
    else{
      
    }

  }
  // No WiFi Connection
  else{

    Serial.println("Connection lost");

  }

  delay(10000);

}
