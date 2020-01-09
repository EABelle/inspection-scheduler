# API AGENDA

This are the docs for the API endpoints to query available dates and times provided by an inspections company, and to book new inspection requests.

## Use

Exposes two endpoins; one to query the date and time availabilities according to a gegraphic location, and the other one to book the inspection.

*You need to be provided with an API key*

## Endpoints

### {{baseUrl}}/calendar/times?location=:location&cp=:cp

#### Method: GET

#### Headers:
  - **x-api-key**: An API key provided

#### Params
At least one of the two followings:
  - **location**: A city name
  - **zipCode**: A zip code 

#### Response:
Returns the days which the company has available to make the inspection at the provided location, within the next five days with their time ranges. The time ranges are three hours long.

**Format:** JSON

*Example of a response body:*

```js
{
    "data": {
        "7|8|2018": [
            {
                "min": 8, // number - time without minutes (only hours).
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
  - **x-api-key**: Provided

Request body:

```js
{
   "owner": {
    	"firstName": string, // *MANDATORY*
    	"lastName": string, // *MANDATORY*
    	"phone1": number, // *MANDATORY*
    	"phone2": number
    },
    "meetingDetails": {
    	"address": string, // *MANDATORY*
    	"city": string, // *optional* in case a zip code is provided
	"zipCode": string, // *optional* in case a city name is provided
    	"workingArea": string,
    	"date": "DD|MM|YYYY", date
    	"time": string // *MANDATORY* starting time (hours without minutes)
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
