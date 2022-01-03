const path = require('path');
const fs = require('fs');

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

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(tempDir, "manager.html"), "utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
};


const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(tempDir, "engineer.html"), "utf8");
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "id", engineer.getId());
    template = replacePlaceholders(template, "github", engineer.getGitHub());
    return template;


};

const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(tempDir, "intern.html"), "utf8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;

};

// function to create index file 
const renderMain = html => {
    const template = fs.readFileSync(path.resolve(tempDir, "main.html"),"utf8");

    return replacePlaceholders(template, "team", html);
};

// replaced placeholders based on input values 
const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
};

module.exports = renderHTML;