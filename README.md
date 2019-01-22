# WeatherApp
Weather application demonstration for programming interview. 

# Features

* It uses OpenWeatherMap to retrieve current weather data for cities. 
* Users can add cities by name, and see the current weather for those cities.
* Authentication is not secure, and merely acts as an identifier for users.
* Cities are saved for an hour after their weather details are retrieved from OpenWeatherMap.
* User sessions are kept for an hour.

# Usage

* Users require only their desired name to login, and there is no verification step.
* User's cities that are added must be done using exact syntax (although they are not case-sensitive).

<b>Example city names</b>:
* Louisville
* cincinnati
* los angeles

# Dependencies

This application uses the following technologies:

* [Angular 7](https://angular.io)
* [Angular CLI](https://cli.angular.io/)
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction)
* [Nodejs](https://nodejs.org/en/)
* [Nodemon](https://nodemon.io/)
* [Expressjs](https://expressjs.com/)
* [Redis](https://redis.io/)
* [OpenWeatherMap](https://openweathermap.org/)

# Getting Started

1. Clone this repo.
2. [Download and install node](https://nodejs.org/en/) (LTS)
3. [Install Redis](https://redis.io/)
4. Install angular cli `npm i -g @angular@latest` (last tested with 7.2.2)
5. Install nodemon `npm i -g nodemon@latest` (last tested with 1.18.9)
6. Install dependencies on Angular app: `cd frontend; npm i`
7. Build UI: `ng build` or build prod: `ng build --prod`
7. Install dependencies on Backend server: `cd ../backend; npm i`
8. Create `config.json` file in root of backend `touch config.json`, and paste the following into it:
```
{
    "port": 80,
    "redis": {
        "host": "localhost",
        "port": "6379"
    },
    "open_weather_map": {
        "url": "http://api.openweathermap.org/data/2.5/",
        "APPID": "<Your APPID from https://openweathermap.org/appid here>",
        "icon_url": "http://openweathermap.org/img/w/"
    },
    "session": {
        "secret": "<use any string here>"
    }
}
```
9. Run redis: `redis-server`
10. Run application/server: `npm start`
