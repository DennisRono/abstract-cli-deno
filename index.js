#!/usr/bin/env node

import chalk from 'chalk';
import shell from 'shelljs'
import { input } from 'console-input'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

const log = console.log;
const curdir = process.cwd()

let repository = input('Enter Your Repo Name: ')
log(`${chalk.green(repository)}`);
if(repository === '.'){
    repository = curdir
}
let visi = input('Enter Your Repo Visibility public(+p) or private(-p): ')
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
    process.exit(0);
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