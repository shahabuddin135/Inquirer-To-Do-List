import inquirer from "inquirer";
import chalk from "chalk";
const main = async () => {
    let taskList = [];
    while (true) {
        let { task } = await inquirer.prompt([
            {
                name: "task",
                type: "input",
                message: chalk.yellow("\nWhat do you want to add?"),
            },
        ]);
        taskList.push(task);
        let { confirm } = await inquirer.prompt([
            {
                name: "confirm",
                type: "confirm",
                message: chalk.yellow("\nDo you want to add more?"),
            },
        ]);
        if (!confirm) {
            break;
        }
    }
    ;
    taskList.forEach((task, index) => {
        console.log(chalk.bold.bgGreenBright(`\n${index + 1} ${task}`));
    });
};
main();