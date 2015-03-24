# News Corp Weather Forecast

[![Build Status](https://travis-ci.org/psenger/NewsCorpWeatherForecast.svg)](https://travis-ci.org/psenger/NewsCorpWeatherForecast)

Written by Philip A Senger

[philip.a.senger@cngrgroup.com](mailto:philip.a.senger@cngrgroup.com) |
mobile: 0406770664 |
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
 
# Running 

There are two environment variables that determine the configuration files hierarchy and user overrides. They are:

    NODE_ENV
    USER

## CONF environment properties

Configuration files located in **conf** directory serve the following function:
 
- properties in conf/global.json applies globally
- properties in conf/development.json applies to Development when *NODE_ENV* is set to development
- properties in conf/production.json applies to Production when *NODE_ENV* is set to production
- properties in conf/test.json applies to Testing when *NODE_ENV* is set to test

As the name global implies, there is a level of hierarchy.

	Argv <-overridden by- Env <-overridden by- NODE_ENV <-overridden by- Global <-overridden by- User

## CONF/.USER user override properties

Files in **conf/.user** directory serve the following function:

User specific values can override the given environment values. This only occurs when *USER* is set. the Travis CI system uses travis.json, and any files placed in here are ignored by git.

## properties

	"port" : 9090 <- indicates the http port number
 	"APIKEY": "set this value" <- should be set to the API KEY from forecast.io

# Testing

Unit tests can be run by the NPM command test

	npm install
	npm test

# Heroku

        Philips-MBP:~ psenger$ cd Documents/Dev/NewsCorpWeatherForecast/
        Philips-MBP:NewsCorpWeatherForecast psenger$ heroku login
        Enter your Heroku credentials.
        Email: philip.a.senger@cngrgroup.com
        Password (typing will be hidden):
        Authentication successful.

        updating...done. Updated to 3.30.3
        Philips-MBP:NewsCorpWeatherForecast psenger$ heroku create
        Creating pacific-citadel-2778... done, stack is cedar-14
        https://pacific-citadel-2778.herokuapp.com/ | https://git.heroku.com/pacific-citadel-2778.git
        Git remote heroku added
        Philips-MBP:NewsCorpWeatherForecast psenger$ git push heroku master
        Counting objects: 135, done.
        Delta compression using up to 8 threads.
        Compressing objects: 100% (125/125), done.
        Writing objects: 100% (135/135), 2.35 MiB | 116.00 KiB/s, done.
        Total 135 (delta 51), reused 0 (delta 0)
        remote: Compressing source files... done.
        remote: Building source:
        remote:
        remote: -----> Node.js app detected
        remote:
        remote: -----> Reading application state
        remote:        package.json...
        remote:        build directory...
        remote:        cache directory...
        remote:        environment variables...
        remote:
        remote:        Node engine:         unspecified
        remote:        Npm engine:          unspecified
        remote:        Start mechanism:     npm start
        remote:        node_modules source: package.json
        remote:        node_modules cached: false
        remote:
        remote:        NPM_CONFIG_PRODUCTION=true
        remote:        NODE_MODULES_CACHE=true
        remote:
        remote: -----> Installing binaries
        remote:        Resolving node version (latest stable) via semver.io...
        remote:        Downloading and installing node 0.12.0...
        remote:        Using default npm version: 2.5.1
        remote:
        remote: -----> Building dependencies
        remote:        No cache available
        remote:        Installing node modules
        remote:        npm WARN engine forecastio@0.2.0: wanted: {"node":">=0.10 <0.12"} (current: {"node":"0.12.0","npm":"2.5.1"})
        remote:
        remote:        > dtrace-provider@0.4.0 install /tmp/build_1acbc96a5fb6fe5c5c28dfc8268a916b/node_modules/restify/node_modules/dtrace-provider
        remote:        > node scripts/install.js
        remote:
        remote:
        remote:        > dtrace-provider@0.4.0 install /tmp/build_1acbc96a5fb6fe5c5c28dfc8268a916b/node_modules/bunyan/node_modules/dtrace-provider
        remote:        > node scripts/install.js
        remote:
        remote:        fs@0.0.2 node_modules/fs
        remote:
        remote:        path@0.11.14 node_modules/path
        remote:
        remote:        q@1.2.0 node_modules/q
        remote:
        remote:        cookie-parser@1.3.4 node_modules/cookie-parser
        remote:        ├── cookie-signature@1.0.6
        remote:        └── cookie@0.1.2
        remote:
        remote:        debug@2.1.3 node_modules/debug
        remote:        └── ms@0.7.0
        remote:
        remote:        http-proxy@1.9.0 node_modules/http-proxy
        remote:        ├── requires-port@0.0.0
        remote:        └── eventemitter3@0.1.6
        remote:
        remote:        morgan@1.5.2 node_modules/morgan
        remote:        ├── basic-auth@1.0.0
        remote:        ├── depd@1.0.0
        remote:        └── on-finished@2.2.0 (ee-first@1.1.0)
        remote:
        remote:        body-parser@1.12.2 node_modules/body-parser
        remote:        ├── content-type@1.0.1
        remote:        ├── bytes@1.0.0
        remote:        ├── raw-body@1.3.3
        remote:        ├── depd@1.0.0
        remote:        ├── on-finished@2.2.0 (ee-first@1.1.0)
        remote:        ├── qs@2.4.1
        remote:        ├── type-is@1.6.1 (media-typer@0.3.0, mime-types@2.0.10)
        remote:        └── iconv-lite@0.4.7
        remote:
        remote:        restify@3.0.1 node_modules/restify
        remote:        ├── assert-plus@0.1.5
        remote:        ├── escape-regexp-component@1.0.2
        remote:        ├── tunnel-agent@0.4.0
        remote:        ├── deep-equal@0.2.2
        remote:        ├── keep-alive-agent@0.0.1
        remote:        ├── negotiator@0.4.9
        remote:        ├── lru-cache@2.5.0
        remote:        ├── mime@1.3.4
        remote:        ├── formidable@1.0.17
        remote:        ├── qs@1.2.2
        remote:        ├── once@1.3.1 (wrappy@1.0.1)
        remote:        ├── node-uuid@1.4.3
        remote:        ├── semver@2.3.2
        remote:        ├── spdy@1.31.0
        remote:        ├── verror@1.6.0 (extsprintf@1.2.0)
        remote:        ├── http-signature@0.10.1 (asn1@0.1.11, ctype@0.5.3)
        remote:        ├── csv@0.4.1 (stream-transform@0.0.7, csv-parse@0.1.0, csv-generate@0.0.4, csv-stringify@0.0.6)
        remote:        ├── backoff@2.4.1 (precond@0.2.3)
        remote:        └── dtrace-provider@0.4.0 (nan@1.5.3)
        remote:
        remote:        forecastio@0.2.0 node_modules/forecastio
        remote:        └── request@2.53.0 (caseless@0.9.0, json-stringify-safe@5.0.0, aws-sign2@0.5.0, forever-agent@0.5.2, tunnel-agent@0.4.0, stringstream@0.0.4, oauth-sign@0.6.0, isstream@0.1.2, node-uuid@1.4.3, qs@2.3.3, combined-stream@0.0.7, form-data@0.2.0, mime-types@2.0.10, http-signature@0.10.1, bl@0.9.4, tough-cookie@0.12.1, hawk@2.3.1)
        remote:
        remote:        bunyan@1.3.4 node_modules/bunyan
        remote:        ├── safe-json-stringify@1.0.1
        remote:        ├── mv@2.0.3 (rimraf@2.2.8, ncp@0.6.0, mkdirp@0.5.0)
        remote:        └── dtrace-provider@0.4.0 (nan@1.5.3)
        remote:
        remote:        fast-csv@0.6.0 node_modules/fast-csv
        remote:        ├── is-extended@0.0.10
        remote:        ├── object-extended@0.0.7 (array-extended@0.0.11)
        remote:        ├── string-extended@0.0.8 (date-extended@0.0.6, array-extended@0.0.11)
        remote:        └── extended@0.0.6 (extender@0.0.10)
        remote:
        remote:        moment@2.9.0 node_modules/moment
        remote:
        remote:        nconf@0.7.1 node_modules/nconf
        remote:        ├── ini@1.3.3
        remote:        ├── async@0.9.0
        remote:        └── optimist@0.6.1 (wordwrap@0.0.2, minimist@0.0.10)
        remote:
        remote:        lodash-node@3.5.0 node_modules/lodash-node
        remote:
        remote:        nodemon@1.3.7 node_modules/nodemon
        remote:        ├── minimatch@0.3.0 (sigmund@1.0.0, lru-cache@2.5.0)
        remote:        ├── touch@0.0.3 (nopt@1.0.10)
        remote:        ├── ps-tree@0.0.3 (event-stream@0.5.3)
        remote:        └── update-notifier@0.3.1 (is-npm@1.0.0, string-length@1.0.0, chalk@1.0.0, semver-diff@2.0.0, latest-version@1.0.0, configstore@0.3.2)
        remote:
        remote: -----> Checking startup method
        remote:        No Procfile; Adding 'web: npm start' to new Procfile
        remote:
        remote: -----> Finalizing build
        remote:        Creating runtime environment
        remote:        Exporting binary paths
        remote:        Cleaning npm artifacts
        remote:        Cleaning previous cache
        remote:        Caching results for future builds
        remote:
        remote: -----> Build succeeded!
        remote:
        remote:        NewsCorpWeatherForecast@1.0.0 /tmp/build_1acbc96a5fb6fe5c5c28dfc8268a916b
        remote:        ├── body-parser@1.12.2
        remote:        ├── bunyan@1.3.4
        remote:        ├── cookie-parser@1.3.4
        remote:        ├── debug@2.1.3
        remote:        ├── fast-csv@0.6.0
        remote:        ├── forecastio@0.2.0
        remote:        ├── fs@0.0.2
        remote:        ├── http-proxy@1.9.0
        remote:        ├── lodash-node@3.5.0
        remote:        ├── moment@2.9.0
        remote:        ├── morgan@1.5.2
        remote:        ├── nconf@0.7.1
        remote:        ├── nodemon@1.3.7
        remote:        ├── path@0.11.14
        remote:        ├── q@1.2.0
        remote:        └── restify@3.0.1
        remote:
        remote:        WARNING: Node version not specified in package.json
        remote:        https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version
        remote:
        remote: -----> Discovering process types
        remote:        Procfile declares types -> web
        remote:
        remote: -----> Compressing... done, 14.4MB
        remote: -----> Launching... done, v3
        remote:        https://pacific-citadel-2778.herokuapp.com/ deployed to Heroku
        remote:
        remote: Verifying deploy... done.
        To https://git.heroku.com/pacific-citadel-2778.git
         * [new branch]      master -> master
        Philips-MBP:NewsCorpWeatherForecast psenger$ heroku ps:scale web=1
        Scaling dynos... done, now running web at 1:1X.
        Philips-MBP:NewsCorpWeatherForecast psenger$ heroku open
