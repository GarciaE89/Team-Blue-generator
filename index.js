// all required packages listed
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const fileDir = path.resolve(__dirname, "dist");
const filePath = path.join(fileDir, "index.html");

// Required Module
const Manager = require("./lib/Manager");
const Engineer = require('./lib/Engineer');
const Intern = require("./lib/Intern");
const renderHTML = require("./lib/genHTML");

// empty employee Array 
let emplArr = [];

// Questions for all employees 
const questions = [
    {
        type: "input",
        name: "name",
        message: "what is the employee name?"
    },
    {
        type: "input",
        name: "id",
        message: "what is the employee ID?"
    },
    {
        type: "input",
        name: "email",
        message: "what is the employee email?"
    },
    {
        type: "input",
        name: "role",
        message: "what is the employee's role?"
    },

]

// set of questions for manager role
managerQs = [
    {
        type: "input",
        name: "officeNumber",
        message: "Please provide Manager's office number (Required)",
        validate: officeNumber => {
            if (officeNumber) {
                return true;
            } else {
                console.log("Please enter an office number!");
                return false;
            }
        }
    }
]

// Engineer Questions  
engineerQs = [
    {
        type: "input",
        name: "github",
        message:"Please provide engineer's GitHub Username (Required)",
        validate: github => {
            if (github) {
              return true;
            } else {
              console.log("Please enter a GitHub username!");
              return false;
            }
          }

    }
]

// question for intern 
InterQs = [
    {
        type: "input",
        name: "school",
        message: "School Intern attended? (Required)",
        validate: school => {
            if (school) {
              return true;
            } else {
              console.log("Please enter a school name!");
              return false;
            }
          }
    }
]

// initializing function 
const init = () => {

};

// function to create new employee

// Add a new employee function, that will stop after you select no and will render the html file 