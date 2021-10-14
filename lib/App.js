const inquirer = require('inquirer');
const Engineer = require('./Engineer');
const Intern = require('./Intern');
const Manager = require('./Manager');
const util = require('util');
const fs = require('fs');

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, error => {
    if (error) {
      return console.log(error);
    }
  })
}

const genHtml = util.promisify(writeToFile);

