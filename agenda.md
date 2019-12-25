# API AGENDA

*Interfaz del sistema para la consulta y carga de pedidos de inspección.*

## Uso

Expone dos endpoints; uno para consultar la disponibilidad para realizar la inspección por parte del estudio, según la zona en la que se realizará, y otro para schedule la inspección.

*Las url's base de cada ambiente y las api keys serán provistas por el estudio.*

## Endpoints

### {{baseUrl}}/calendar/horarios?localidad=:localidad&cp=:cp

#### Método: GET

#### Headers:
  - **x-api-key**: Provisto por el estudio

#### Params
Se debe enviar al menos uno de los dos:
  - **localidad**
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
   "titular": {
    	"nombre": string, // *OBLIGATORIO*
    	"apellido": string, // *OBLIGATORIO*
    	"telefono_1": number, // *OBLIGATORIO*
    	"telefono_2": number
    },
    "inspection": {
    	"direccion": string, // *OBLIGATORIO*
    	"localidad": string, // *opcional* en caso de que sea provisto el código postal
		"codigo_postal": string, // *opcional* en caso de que sea provista la localidad
    	"provincia": string,
    	"dia": "DD|MM|AAAA", // *OBLIGATORIO* se toma como fecha válida una fecha desde la actual hasta 5 días posterior
    	"horario": string // *OBLIGATORIO* la hora inicial, sin minutos
    },
    "vehiculo": {
    	"dominio": string, // *OBLIGATORIO*
        "tipo": string,
        "marca": string, // *OBLIGATORIO*
    	"modelo": string, // *OBLIGATORIO*
        "anio": number,
    	"chasis": string,
    	"motor": string,
    	"km": number,
    	"combustible": string
    },
    "observaciones": string
}
```
