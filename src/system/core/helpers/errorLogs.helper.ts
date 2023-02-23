import chalk from 'chalk';

const log = (message: any) => {
  if (typeof message === 'string') {
    console.log(chalk.white.bgGreen.bold(`✔ ${message}`));
  } else {
    console.log(chalk.white.bgGreen.bold(`${message}`));
  }
};

const error = (message: any) => {
  if (typeof message === 'string') {
    console.log(chalk.red.bgBlue.bold(`✘ ${message}`));
  } else {
    console.log(chalk.red.bgBlue.bold(`${message}`));
  }
};

const info = (message: any) => {
  if (typeof message === 'string') {
    console.log(chalk.yellow.bgRed.bold(`✘ ${message}`));
  } else {
    console.log(chalk.yellow.bgRed.bold(`${message}`));
  }
};

export { log, error, info }