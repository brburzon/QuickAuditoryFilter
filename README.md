# app

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Installation

Clone the project to your machine.
```
git clone https://github.iu.edu/brburzon/Constant-Stimuli-Hearing-Experiments
```

Install `yo`, `grunt-cli`, `bower`, `generator-angular` and `generator-karma`:
```
npm install -g grunt-cli bower yo generator-karma generator-angular
```

To make sure you have all of the dependencies, run the following from the root folder of the project
```
npm install
```
and 
```
bower install
```

## Development

Develoment notes can be found in: [development.org](development.org)

For development:
1. **Fork** current mater branch
2. **Pull** from your mater branch
3. **Chechout** to a new branch (name branch after the changes you plan to make) 
4. **Edit** or make your changes
5. **Commit** changes with description
6. **Push** the your changes in your branch
7. **Pull Request** for code review
8. **Merge** branch to master
9. **Delete** the created branch from step 3 and go back to step 2

## Build & development

Running `grunt` will create a `dist/` folder containing the minified components of the project.

Run `grunt serve` when you wish to see a live preview. This will open the project in a browser and refresh when ever it
detects a change in the code.


## Testing

Running `grunt test` will run the unit tests with karma.

Run `grunt karma:unit` for faster result when running unit tests.
