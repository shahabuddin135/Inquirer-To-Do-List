#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const main = async () => {
    let taskList = [];
    const addTask = async () => {
        while (true) {
            let { task } = await inquirer.prompt([
                {
                    name: "task",
                    type: "input",
                    message: chalk.blue.bold("What do you want to add?"),
                },
            ]);
            taskList.push(task);
            let { confirm } = await inquirer.prompt([
                {
                    name: "confirm",
                    type: "confirm",
                    message: chalk.bold.blue("Do you want to add more?"),
                },
            ]);
            if (!confirm) {
                break;
            }
        }
    };
    await addTask();
    let showList = () => {
        taskList.forEach((task, index) => {
            console.log(chalk.bold.greenBright(`${index + 1} ${task}`));
        });
    };
    const updateList = async () => {
        let { update } = await inquirer.prompt([
            {
                name: "update",
                type: "confirm",
                message: chalk.cyan.bold("Do you want to make changes to the list?"),
            },
        ]);
        if (!update) {
            showList();
        }
        else {
            let { options } = await inquirer.prompt([
                {
                    name: "options",
                    type: "list",
                    choices: ["Add a task", "Done a task", "Don't change"],
                },
            ]);
            if (options === "Add a task") {
                await addTask();
                console.log(chalk.bold.blue(`Task added`));
                showList();
            }
            else if (options === "Done a task") {
                const deleteTask = async () => {
                    let { task } = await inquirer.prompt([
                        {
                            name: "task",
                            type: "list",
                            choices: taskList,
                            message: chalk.blue.bold("Which task is Done?"),
                        },
                    ]);
                    let index = taskList.indexOf(task);
                    if (index === -1) {
                        console.log(chalk.red.bold("Task not found!"));
                    }
                    else {
                        taskList.splice(index, 1);
                        console.log(chalk.red(`${task} Done`));
                        showList();
                    }
                };
                await deleteTask();
            }
            else if (options === "Don't change") {
                showList();
            }
        }
    };
    await updateList();
};
main();
//problem 1: showing undefined in the list
//problem 2: cant show the list after adding more items in updateList();
//changes to make: add colors using chalk
// red | Blue Text | bold | green text.
//Add a task: addtask(); : do you want to add more? : yes |addTask|
//delete task: do you want to make more changes to the list? : yes |updateList();|,|showList();| no: || showList();
//dont change: show list
