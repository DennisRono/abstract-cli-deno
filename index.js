#!/usr/bin/env node

/*
  Author: Dennis Kibet 2022
  Github: @DennisRono
  Email: dennisrkibet@gmail.com | dennis@denniskibet.com
  website: denniskibet.com
*/

import chalk from 'chalk';
import shell from 'shelljs'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

const log = console.log;
const curdir = process.cwd()

const uchoices = process.argv.slice(2);
if(uchoices.length === 0){
    log(`${chalk.red('Please pass in the arguments...')}`);
    process.exit(1);
}

let repository = uchoices[0];
if(repository === '.'){
    repository = curdir.split("\\").slice(-1)[0]
}
log(`${chalk.green(repository)}`);

let visi = uchoices[1]
if(visi === '+p'){
    visi = "--public"
} else {
    visi = "--private"
}
log(`${chalk.green(visi)}`);

// create repo
const createrepo = "gh repo create "+repository+" "+visi
const crespinner = createSpinner(chalk.blue.underline.bold('Creating your repository..')).start()
if (shell.exec(createrepo).code !== 0) {
    setTimeout(() => {
        crespinner.error()
    }, 1000)
} else {
    setTimeout(() => {
        crespinner.success()
    }, 1000)
}

//initialize the repository
const git = "git remote add origin https://github.com/DennisRono/"+repository+".git"
const inspinner = createSpinner(chalk.blue.underline.bold('Adding your remote..')).start()
shell.exec(`echo # ${repository} >> README.md`)
shell.exec('git init .')
if (shell.exec(git).code !== 0) {
    setTimeout(() => {
        inspinner.error()
    }, 1000)
    process.exit(1);
} else {
    setTimeout(() => {
        inspinner.success()
    }, 1000)
    figlet('Success!! created '+repository, function(err, data) {
        if (err) {
            log(`${chalk.red('Something went wrong...')}`);
            console.dir(gradient.pastel.multiline(err) + '\n');
            return;
        }
        log(`${chalk.green(data)}`)
        process.exit(0);
    });
}