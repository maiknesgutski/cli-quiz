#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

/**
 * Player Object
 * handles all the operation on the player
 */
const player = {
    getPlayerName() {
        return this.data.name;
    },
    setPlayerName(name) {
        this.data.name = name;
    },
    getScore() {
        return this.data.score;
    },
    setScore(score) {
        this.data.score += score;
    },
    resetData() {
        this.setPlayerName("").setScore(0);
    },
    data: {
        name: "",
        score: 0,
    }
}

//sleep function used for the spinners and loaders (cosmetic)
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const karaokeTitle = chalkAnimation.karaoke(
        'Scaaaryyy console game \n'
    );

    await sleep();
    karaokeTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY:')}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right....
    `);
}

/**
 * Function to set the name of the player. Name Value gets set through the {inquirer.prompt()}
 */
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: "input",
        message: 'What is your name?',
        default() {
            return 'Senior Boligrafo';
        }
    })

    player.setPlayerName(answers.player_name);
}

/**
 * This Function handles the frontend part of checking the answer.
 * @param {boolean} isCorrect
 * @returns {void} Prints to console. 
 */
async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer ...').start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `Nice Work ${player.getPlayerName()}. That is correct!`});
    }else{
        spinner.error({text: `💀💀💀 Game over 💀💀💀
        Better luck next time ${player.getPlayerName()}`})
    }
}

/**
 * Function that checks if the user knows the favorite color of the game.
 * @returns {void}
 */
async function question_1(){
    let correct = `Red ${chalk.bgRed('  ')}`;

    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: `Okay ${player.getPlayerName()}. What is my favorite color:\n`,
        choices:[
            `Black ${chalk.bgBlack('  ')}`,
            `Blue ${chalk.bgBlue('  ')}`,
            correct,
            `Yellow ${chalk.bgYellow('  ')}`,
        ]
    })
            
    return handleAnswer(answers.question_1 == correct);
}

await welcome();
await askName();
await question_1();