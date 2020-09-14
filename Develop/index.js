const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project title?",
    },
    {
      type: "input",
      message: "Enter a description for this project:",
      name: "description",
    },
    {
      type: 'input',
      message: "Enter command to install necessary dependencies:",
      name: "installation"
    },
    {
      type: 'input',
      message: "Enter necessary steps for use of application:",
      name: "usage"
    },
    {
      type: "list",
      message: "Select a license badge:",
      choices: ["Website Down", "Website Up", "NPM Inquirer", "Made With JS"],
      name: "license",
    },
    {
      type: 'input',
      message: "Enter contribution details:",
      name: "contributing"
    },
    {
      type: 'input',
      message: "Provide prompt to start testing suite:",
      name: "tests"
    },
    {
      type: "input",
      message: "What is your gitHub username?",
      name: "username",
    },
  ])
  .then(async (answers) => {
    
    const title = `# ${answers.title}`;
    const licenseBadge = badge(answers.license);
    const description = `## Description 
${answers.description}`;
    const gitHubResults = await gitHubInfo(answers.username);
    const profilePic = `![ProfilePic](${gitHubResults.avatar_url})`;
    const TOC = `## Table Of Contents
+ [Installation](#installation)

+ [Usage](#usage)

+ [License](#license)

+ [Contributing](#contributing)

+ [Tests](#tests)

+ [Questions](#questions)`;
    const installation = `## Installation
#### To install neccessary dependencies, run the following command:  
    ${answers.installation}`;
    const usage = `## Usage 
${answers.usage}`;
    const license = `## License 
This project is licensed under the ${answers.license} license.`;
    const contributing = `## Contributing
${answers.contributing}`;
    const tests = `## Tests
#### To run tests, run the following command:
    ${answers.tests}`
    const questions = `## Questions
${profilePic}
#### If you have any questions about this repo, please contact me at ${gitHubResults.email}.`

    const wholeFile = [title, licenseBadge, description, TOC, installation, usage, license, contributing, tests, questions ].join("\n\n");

    fs.writeFile("README1.md", wholeFile, (err) => {
      if (err) {
        throw err;
      }
      console.log("README.md created");
    });
  });
//getting badge for license
const badge = (answer) => {
  let badgeSelection;
  if (answer === "Website Down") {
    badgeSelection = "![Website Down](https://img.shields.io/website-up-down-green-red/http/cv.lbesson.qc.to.svg?style=for-the-badge)";
  } else if (answer === "Website Up") {
    badgeSelection = "![Website Up](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?style=for-the-badge)";
  } else if (answer === "NPM Inquirer") {
    badgeSelection = "![NPM](https://img.shields.io/npm/l/inquirer?style=for-the-badge)";
  } else if (answer === "Made With JS") {
    badgeSelection = "![Made With JS](https://img.shields.io/badge/Made%20with-JS-1f425f.svg?style=for-the-badge)";
  }
  return badgeSelection;
};
//grabbing git hub pr0file pic and email
const gitHubInfo = async (username) => {
  let result;
  const queryUrl = `https://api.github.com/users/${username}`;
//authorizaiton token needs to be added to access email address with git hub request
  const config = {
    headers: {'Authorization': 'token b78a5819f1f91e2b1a7c6ffe98813719db397e6b'}
  }
  try {
    const { data } = await axios.get(queryUrl, config);
    result = data;
  } catch (e) {
    console.log(e);
  }
  return result;
};