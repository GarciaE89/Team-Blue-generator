const path= require('path');
const fs = require('fs');
const Employee = require('./Employee');
const tempDir = path.resolve(__dirname, "../templates");

// filter employee role
const renderHTML = employees => {
    const html = [];

    // manager filter
    html.push(...employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))
        );

    // filter engineer 
    html.push(...employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderEngineer(engineer))
      );
    
    // intern filter 
    html.push(...employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => renderIntern(intern))
      );
      
      return renderMain(html.join(""));   

};