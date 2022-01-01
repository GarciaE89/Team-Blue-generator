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

class App {
  constructor() {

    this.teamRoster = [];
    this.employeeInfo = [

      {
        type: 'list',
        message: 'Please select role for employee, or leave the application.',
        name: 'type',
        choices: ['Manager', 'Engineer', 'Intern', 'Employee']
      },
      {
        type: 'input',
        message: 'What is the name of the individual?',
        name: 'name',
        when: ({ type }) => type != 'Leave',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter a name.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the ID number of the individual?',
        when: ({ type }) => type != 'Quit Application?',
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log('Please enter a id.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the employee email?',
        when: ({ type }) => type != 'Quit Application?',
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter the email address.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: `What is manager's office number?`,
        when: ({ type }) => type === 'Manager',
        validate: (officeNumInput) => {
          if (officeNumInput) {
            return true;
          } else {
            console.log(`Please enter the manger's office number.`);
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Provided the GitHub username for the engineer?',
        when: ({ type }) => type === 'Engineer',
        validate: (githubInput) => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter a GitHub username.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'school',
        message: `What is the intern's schol name?`,
        when: ({ type }) => type === 'Intern',
        validate: (schoolInput) => {
          if (schoolInput) {
            return true;
          } else {
            console.log('Please enter the school name.');
            return false;
          }
        }
      }
    ]

  }

  appInit = () => {
    this.teamBlue();
  }

  teamBlue = () => {
    inquirer.prompt(this.employeeInfo).then(data => {
      switch (data.type) {
        case 'Manager':
          this.teamRoster.push(new Manager(data.name, data.id, data.email, data.officeNumber));
          this.teamBlue();
          break;
        case 'Engineer':
          this.teamRoster.push(new Engineer(data.name, data.id, data.email, data.github));
          this.teamBlue();
          break;
        case 'Intern':
          this.teamRoster.push(new Intern(data.name, data.id, data.email, data.school));
          this.teamBlue();
          break;
        case 'Quit Application?':
          createHtml(this.teamRoster);
          break;
      }
    })
  }
};

const createHtml = (datData) => {
  let htmlArr = [];
  let baseHTML =
    `<!DOCTYPE html>
      <html lang='en'>
        <head>
        <meta charset='UTF-8'>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href='tailwind.css'>
        </head>
        <body>
          <main>
            <section class="bg-red-800 p-8">
              <div class="inline-block text-lg flex justify-center">
                <h1 class='font-bold text-xl mb-2'>My Team</h1>
              </div>
            </section>
            <div class="container mt-4 mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10">
            `;
        
  htmlArr.push(baseHTML);

  for (let i = 0; i < datData.length; i++) {
    let createCards =
    ``
    
    if (datData[i].officeNumber) {
      const manager = new Manager(datData[i].name, datData[i].id, datData[i].email, datData[i].officeNumber);
      createCards += 
            `
            <div class="card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
              <div class="m-3">
                <h2 class="bg-blue-200 rounded font-bold text-xl mb-2">
                  ${datData[i].name}
                  <span class="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse">
                    ${manager.getRole()}
                  </span>
                </h2>
                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                  Email: <a class='text-blue-400 hover:text-red-800' href='mailto:${datData[i].email}'>${datData[i].email}</a>
                </p>
                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                  ID Number: ${datData[i].id}
                </p>
                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                  Office Number: <a class='text-blue-400 hover:text-red-800' href='tel:${datData[i].officeNumber}'>${datData[i].officeNumber}</a>
                </p>
              </div>
            </div>`;
    }
    if (datData[i].github) {
      const engineer = new Engineer(datData[i].name, datData[i].id, datData[i].email, datData[i].github);
      createCards += `
            <div class="card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
              <div class="m-3">
                <h2 class="bg-blue-200 rounded font-bold text-xl mb-2">
                  ${datData[i].name}
                  <span class="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse">
                    ${engineer.getRole()}
                  </span>
                </h2>
                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                  Email: <a class='text-blue-400 hover:text-red-800' href='mailto:${datData[i].email}'>${datData[i].email}</a>
                </p>
                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                  ID Number: ${datData[i].id}
                </p>
                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                  GitHub: <a class='text-blue-400 hover:text-red-800' href='${engineer.getGitHub()}'>${engineer.getGitHub()}</a>
                </p>
              </div>
            </div>`;
    }
    if (datData[i].school) {
      const intern = new Intern(datData[i].name, datData[i].id, datData[i].email, datData[i].school);
      createCards += `
            <div class="card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
              <div class="m-3">
                <h2 class="bg-blue-200 rounded font-bold text-xl mb-2">
                  ${datData[i].name}
                  <span class="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse">
                    ${intern.getRole()}
                  </span>
                </h2>
                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                  Email: <a class='text-blue-400 hover:text-red-800' href='mailto:${datData[i].email}'>${datData[i].email}</a>
                </p>
                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                  ID Number: ${datData[i].id}
                </p>
                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                  Attending University: ${intern.getSchool()}
                </p>
              </div>
            </div>`;
    }
    htmlArr.push(createCards);
  }
  
  genHtml('dist/index.html', htmlArr.join(''));
}

module.exports = App;