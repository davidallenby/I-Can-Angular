# AGL developer test!

## Introduction

The code included in this repository is my submission for the coding challenge set by AGL. You can read through information around what the challenge was, and how I have completed it. However, if you just want to get right to it, jump to the "[Installation and setup](#installation-and-setup)" section.

## Contents

* [The original challenge](#original-challenge)
* [My submission](#my-submission)
* [Installation and setup](#installation-and-setup)
* [Testing](#testing)

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
I have implemented the following best practices:

__Coding style__
* Code should not exceed around 30 lines per function. (KISS - Keep it simple, stupid!)
* If the components/classes are hundred and hundreds of lines of code, we should separate them in to separate files. I prefer to use composition over inheritance. (Why, you ask? It is easier to change in the future. Explained in better detail [here](https://www.youtube.com/watch?v=wfMtDGfHWpA))
* [Don't repeat yourself (DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
* [Single responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
* Comments should explain WHY code is there, and WHAT it is doing.
* Limit line length to 80 characters. (This is a personal preference of mine. It allows me to have the terminal open on one half of the monitor, with VS Code on the other half. It also makes it easier to read.)
* Use `const` when the variable won't change, `let` when it does.

__Angular best practices__
* Use reusable components (e.g [ListComponent](https://github.com/davidallenby/agl-developer-test/tree/code-cleanup/src/app/shared/components/list))
* Lazy loading routes (reduces the size of the application, the initial load time, and improve the application boot time by not loading the unused modules.)
* Modular design: Apps should be structured with 1 x Core Module, 1 x Shared Module, and many Feature Modules
  - Core Module: This will be where any singleton services or site-wide components will be kept
  - Shared Module: This will be where any shared components/pipes/services will, but not technically used *everywhere*
  - Feature Module: This will be where any features that make up the application will live. They will be large sub-sections of the app that contain their own components, routes, pages, services etc.
* Smart & Dumb components:
  - Smart components: These will contain business logic in their respective services. They will pass data down to dumb components, and react to events coming from dumb components.
  - Dumb components: These are presentational only and will be used to display data. We will delegate user interaction up to smart components via events.
* "On push" Change Detection Strategy - This will improve performance of the application, as it will only update components when necessary.
* Import aliases - Shortened aliases for Core, Features, and Shared modules.

## Installation and setup

### Prerequisites
* Ensure you have [Node JS installed](https://nodejs.org/en/download/) (My version is 12.18.0)
* Ensure you have [NPM installed](https://www.npmjs.com/get-npm) (My version is 6.14.4)
* This project was built with Angular CLI `npm i -g @angular/cli`

### Install
* Clone the repo to your local: `git clone https://github.com/davidallenby/agl-developer-test.git`
* Go to the directory: `cd agl-developer-test`
* Install dependencies: `npm install`
* To run in dev mode: `ng serve`

## Testing
* Unit tests `ng test`
* e2e tests `ng e2e`
