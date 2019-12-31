# API AGENDA

*Interfaz del sistema para la consulta y carga de pedidos de inspección.*

## Uso

Expone dos endpoints; uno para consultar la disponibilidad para realizar la inspección por parte del estudio, según la zona en la que se realizará, y otro para schedule la inspección.

*Las url's base de cada ambiente y las api keys serán provistas por el estudio.*

## Endpoints

### {{baseUrl}}/calendar/times?location=:location&cp=:cp

#### Método: GET

#### Headers:
  - **x-api-key**: Provisto por el estudio

#### Params
Se debe enviar al menos uno de los dos:
  - **location**
  - **cp**

#### Respuesta:
Devuelve los días que el estudio tiene disponible para cubrir la inspección en la zona provista, dentro de los próximos 5 días a partir de la consulta, con sus franjas horarias. Las franjas horarias pertenecientes a cada día son de 3 horas.

**Formato:** JSON

*Ejemplo del body de una respuesta:*

```js
{
    "data": {
        "7|8|2018": [
            {
                "min": 8, // number - representa la hora sin minutos.
                "max": 11
            },
            {
                "min": 9,
                "max": 12
            },
            {
                "min": 10,
                "max": 13
            }],
        "8|8|2018": [
            {
                "min": 10,
                "max": 13
            },
            {
                "min": 11,
                "max": 14
            },
            {
                "min": 12,
                "max": 15
            }
        ],
	}
```

### {{baseUrl}}/schedule

#### Método: POST

#### Request headers:
  - **Content-Type**: application/json
  - **x-api-key**: Provista por el estudio

Request body:

```js
{
   "owner": {
    	"firstName": string, // *MANDATORY*
    	"lastName": string, // *MANDATORY*
    	"phone1": number, // *MANDATORY*
    	"phone2": number
    },
    "inspection": {
    	"address": string, // *MANDATORY*
    	"city": string, // *optional* en caso de que sea provisto el código postal
		"zipCode": string, // *opcional* en caso de que sea provista la location
    	"workingArea": string,
    	"date": "DD|MM|AAAA", date
    	"time": string // *MANDATORY* la fecha inicial, sin minutos
    },
    "vehicle": {
    	"domain": string, // *MANDATORY*
        "type": string,
        "brand": string, // *MANDATORY*
    	"model": string, // *MANDATORY*
        "year": number,
    	"chassisNumber": string,
    	"motorNumber": string,
    	"km": number,
    	"fuelType": string
    },
    "comments": string
}
```
