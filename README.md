# FirstApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Fixing a Bug

In the next lecture, we'll add some code to access the controls of our form array:
`*ngFor="let ingredientCtrl of recipeForm.get('ingredients').controls; let i = index"`
This code will fail with the latest Angular version.

You can fix it easily though. Outsource the "get the controls" logic into a getter of your component code (the `.ts` file):
1.  get controls() { // a getter!
2.    return (<FormArray\>this.recipeForm.get('ingredients')).controls;
3.  }

In the template, you can then use:
`*ngFor="let ingredientCtrl of controls; let i = index"`
This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).