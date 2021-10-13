const Employee = require('../lib/Employee')

class Engineer extends Employee {
    constructor(name, id, email, github){

    
    super (name, id, email)

    this.github = github;
    this.title = "Engineer";

};
getGitHub(){
    return `https://github.com/${this.github}`;
};

getRole(){
    return this.title
};

}

module.exports = Engineer;
