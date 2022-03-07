# Angular Pokemon Trainer Web Appication
A Pokémon Trainer web app built using the Angular Framework.

## Table of Contents
- [Description](#description)
- [Install](#install)
- [Usage](#usage)
- [Authors and Developers](#authors-and-developers)

## Description
The first thing the user sees when opening the application is the **Landing** page where the user can enter their name and sign in.
The username is saved to the Trainers API hosted on Heroku. Users that are already signed in will automatically be redirected to the **Catalogue** page. This is accomplished and managed by saving the user/trainer data to the the browsers’ local session storage. As such, a user may only view and access the **Catalogue** and **Trainer** page, if they are currently signed into the app. Otherwise the user will be redirect back to the **Landing** page if no active login session exists in the browser storage.

On the **Cataloge** page, the user selects Pokemon Cards to catch and store. The “pokeball” icon to the top-right of each Pokemon card will catch the Pokemon. The name of the pokemon will be stored using the Trainer API with PATCH, and also pushed into the session storage. 

The **Trainer** page will display all the caught Pokemon of the current user. If the Pokemon is already caught, the trainer can click the “pokeball” icon, which is now red. This will “delete” the Pokemon in your API and no longer display them on the **Trainer** page by reloding the page. 

On each page, you also have a navbar to switch between the **Catalogue** and **Trainer**, and also a **Logout** which will clear the session storage and redirict back to the **Landing** page.

## Install
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Additional installations 
Firstly run **npm install** to install packages from nodeJs.
Additional installations include **ng add @angular/material**, **npm install --save ngx-loading** and **npm i animate.css --save**.
We also install and use **Tailwind** for additional CSS styling with classes.


## Usage

Sign in with a username on the **Landing** page. This will take you to the **Cataloge** page. From here you can select Pokemon to catach and navigate to the **Trainer** page where view your Pokemon.

The application is published on **Heroku**.\
Open [https://jc-react-translation-app.herokuapp.com/](https://jc-react-translation-app.herokuapp.com/) to view the application.

## Authors and Developers

Ammar Ahmed & Jasotharan Cyril
