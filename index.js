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
        type: "list",
        name: "role",
        message: "what is the employee's role?",
        choices:["Manager","Engineer", "Intern" ]
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
interQs = [
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
    if(fs.existsSync(filePath)) {
        inquirer.prompt({
            type: "confirm",
            message: "Would you like overwrite your current team roster in index.html?",
            name: "overwrite"
        }).then(async (response) => {
            let overwrite = response.overwrite;
            if(await overwrite === true) {
                console.log("please enter team information");
                newEmployee()
            } else if (await overwrite === false) {
                console.log("current index.html will not be overwriten, current index file will need to be removed from the dist folder before starting a new index.html file");
            }
            
        })
    } else {
        console.log("To create a team profile, please enter your team's information");
        newEmployee()
    }

};

// function to create new employee
const newEmployee = async () => {
    await inquirer.prompt(questions)
    .then((response) => {
        let name = response.name;
        let id = response.id;
        let email = response.email;
        let role = response.role;
        let officeNumber;
        let github;
        let school;

        if (role === "Engineer") {
            inquirer.prompt(engineerQs).then((response) => {
                github = response.github;
                let employee = new Engineer(name, id, email, github);
                emplArr.push(employee);
                addEmployee(emplArr);
            });
        }
        else if (role === "Manager") {
            inquirer.prompt(managerQs).then((response) => {
                officeNumber = response.officeNumber;
                let employee = new Manager(name, id, email, officeNumber);
                emplArr.push(employee);
                addEmployee(emplArr);
            });
        }
        else if (role === "Intern") {
            inquirer.prompt(interQs).then((response) => {
                school = response.school;
                let employee = new Intern(name, id, email, school);
                emplArr.push(employee);
                addEmployee(emplArr);
            });
        }
        
        });

};

    
// Add a new employee function, that will stop after you select no and will render the html file 
const addEmployee = async (array) => {
    await inquirer
    .prompt({
        type:"confirm",
        name:"addEmployee",
        message:"Add an employee? (Required)",
    }).then(async(response) => {
        var createEmployee = response.addEmployee;
        if (await createEmployee === true) {
            newEmployee();
        }

        else if (await createEmployee === false) {
            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir)
            }
            fs.writeFile(filePath, renderHTML(array), (err) => {
                if(err) {
                    return console.log(err);
                }
                console.log("index.html file has been created in dist folder ");
            });
        }

    })
};

// function call 
init();