# Quotes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.1.

## Prerequisites

Below software needs to be installed:
1. NodeJs [here] (https://nodejs.org/en/download/)
2. Npm 
3. Angular cli installed : You need angular cli to be installed
   npm install -g @angular/cli

## How to run

1. Go to src. Run below commands

   npm install
   ng serve

## Folder structure

## /src/app

### Components
Components folder contains the required components for the project

#### home
    - home.component.css
    - home.component.html
    - home.component.ts
    - home.component.spec.ts
    - home.service.ts
    - home.service.spec.ts
### shared
Shared folder contains shareable modules/files/constants etc

#### Constants
Contains constants required in application
- constants.ts

#### models
The interfaces we required
- event.model.ts
- quote.model.ts

Routes folder contain the routes/url mappings to particular CRUDS

#### Services
Serve the component
- socket-service.service.ts

## Routing
Routing is configured in file /app/app-routing.module.ts

