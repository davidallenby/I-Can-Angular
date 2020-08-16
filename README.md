# AGL developer test!

## Introduction

The code included in this repository is my submission for the coding challenge set by AGL. You can read through information around what the challenge was, and how I have completed it. However, if you just want to get right to it, jump to the "[Installation and setup](#installation-and-setup)" section.

## Contents

* [The original challenge](#original-challenge)
* [My submission](#my-submission)
* [Installation and setup](#installation-and-setup)
  

## Original challenge
A json web service has been set up at [the following url](http://agl-developer-test.azurewebsites.net/people.json) 
You need to write some code to consume the json and output a list of all the cats in alphabetical order under a heading of the gender of their owner.
You can write it in any language you like. You can use any libraries/frameworks/SDKs you choose.
Example:
__Male__
* Angel
* Molly
* Tigger

__Female__
* Gizmo
* Jasper

## My submission
For my submission I have completed the required task, but I have also added some extra details to showcase my skillset. I have included the following 3rd party libraries to assist in this work:
* [Bootstrap](https://getbootstrap.com/)

### What I did
I have implemented the following best practices:

#### Coding style
* Code should not exceed around 30 lines per function. (KISS - Keep it simple, stupid!)
* If the components/classes are hundred and hundreds of lines of code, we should separate them in to separate files. I prefer to use composition over inheritance. (Why, you ask? It is easier to change in the future. Explained in better detail [here](https://www.youtube.com/watch?v=wfMtDGfHWpA))
* [Don't repeat yourself (DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
* [Single responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
* Comments should explain WHY code is there, and WHAT it is doing.
* Limit line length to 80 characters. (This is a personal preference of mine. It allows me to have the terminal open on one half of the monitor, with VS Code on the other half.)

#### App Structure
You will notice that I have separated my application in to three sections: Core, Features, and Shared.

___Core__
This is where I keep any site-wide singleton services, or single instance components.

__Features__
This is the different features that make up the application. I have stored the homepage here. 

## Installation and setup

### Prerequisites
* Ensure you have [Node JS installed](https://nodejs.org/en/download/) (My version is 12.18.0)
* Ensure you have [NPM installed](https://www.npmjs.com/get-npm) (My version is 6.14.4)
* This project was built with Angular CLI `npm i -g @angular/cli`

### Install
* Clone the repo to your local: `git clone https://github.com/davidallenby/agl-developer-test.git`
* Go to the directory: `cd agl-developer-test`
* Install dependencies: `npm install`

### Dev mode
