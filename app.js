const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
//console.log(OUTPUT_DIR);
const outputPath = path.join(OUTPUT_DIR, "team.html");
//console.log(outputPath);



//created objects for each team members.
const questions = [
    {
        type: "input",
        message: "What is your Name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your Email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is your ID?",
        name: "id",
    },
    {
        type: "list",
        message: "What is your Role?",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ],
    },
];

const managerQuestion = [
    {
        type: "input",
        message: "What is your Office Number?",
        name: "officeNumber"
    },
];

const enggQuestion = [
    {
        type: "input",
        message: "What is your Github username?",
        name: "github"
    },
];

const internQuestion = [
    {
        type: "input",
        message: "What is your School Name?",
        name: "school"
    }
];

const repeat = [
    {
        type: "confirm",
        message: "Want to add another team member?",
        name: "addMoreMember"
    },
];

let team = [];

function generateTeam(){
    inquirer.prompt(questions).then(queRes => {
        if(queRes.role === "Manager"){
            
            inquirer.prompt(managerQuestion).then(manRes => {
                console.log(manRes);
                team.push(new Manager(queRes.name, queRes.email, queRes.id, manRes.officeNumber));
                askAgain();
            });
        }else if(queRes.role === "Engineer"){
            
            inquirer.prompt(enggQuestion).then(enggRes => {
                console.log(enggRes);
                team.push(new Engineer(queRes.name, queRes.email, queRes.id, enggRes.github));
                askAgain();
            })
        }else if(queRes.role === "Intern"){
            
            inquirer.prompt(internQuestion).then(internRes => {
                console.log(internRes);
                team.push(new Intern(queRes.name, queRes.email, queRes.id, internRes.school));
                askAgain();
            })
        }
    });

function askAgain(){
    inquirer.prompt(repeat).then(resp => {
        if(resp.addMoreMember){
            generateTeam();
        } else {
            fs.writeFile(outputPath, render(team), err => {
                if(err){
                    throw err;
                }
                console.log("HTML generated successfully");
            });
        }        
    });
};
};

generateTeam()