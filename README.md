# News Corp Weather Forecast

Written by Philip A Senger

[philip.a.senger@cngrgroup.com](mailto:philip.a.senger@cngrgroup.com) |
[mobile](0406770664) |
[CV/Resume](http://www.visualcv.com/philipsenger) |
[blog](http://www.apachecommonstipsandtricks.blogspot.com/) |
[LinkedIn](http://au.linkedin.com/in/philipsenger) |
[twitter](http://twitter.com/PSengerDownUndr)


This application is a sample rest application designed to pull Forecast data from forecast.io, based on the city location and weekday. Additionally, send the data back to the user in the form of either JSON or HTML.

## Issues

There are several know issues with this application and addressed here.

### Unspecified unit of measurement

Units are specified in US.

### Ambiguous Location declared in documentation

While reviewing the documentation and consulting the Forecast.io api, I discovered that the api does not provide a City Name parameter. Rather location is derived from the Geo Location of Latitude and Longitude. The requirement specified a city name without Country or State. That lack of information is required to correctly identify the city. For example there is an Epping in New South Wales and Victoria in Australia.

### Externalized Geo Location Source ( micro service )

For this example, I used Australia Cities only. I based this on the example given. Due to the need for a Geo Location of the data, I suggest we find a provider rather than host our own geo location data. I have timed the data down and accepted the fact that I will never know which city the user really wants if there are two or more match city names.

### SSL

SSL was never discussed as a requirement but should be considered.

### Lacking provisions for internationalization

There was no requirements to handle internationalized characters, cities or values.

### Cross-origin resource sharing (CORS)

There was no requirement for CORS, this means the application will only work in a http domain from whence it is deployed.

### Cache

Forecast.io charges for it's service after 1000 reuqests per day. I suggest we build a LRU Map, or some strategy. This strategy could even be another microservice or REDIS server.

## Design Factors

I decided to use Restify because Express is targeted at browser applications and contains functionality not needed, such as templating and rendering. Additionally, Restify has mechanisms in place to handle error rest clients.. reducing the amount of code I needed to create.

I decided to create a single instance of GeoData, and wait to start the app until it had fully loaded the CSV in memory. I feel this is a good design but I needed to build something quickly.

## Data

As mentioned above, Forecast.io does not support city names, it only supports Lat/Long. Rather than find a third party for Geo Location or use a NPM module, I downloaded a City Name Lat Long look up from http://download.geonames.org/export/dump/ and trimmed the data. It has duplicate cities in the data and is located in the module app/data/data-sm.csv the original download is located app/data/data.csv
