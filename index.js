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
let emplArr =[];

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
