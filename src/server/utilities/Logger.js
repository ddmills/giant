import chalk from 'chalk';

export function log(...parameters) {
  console.log(chalk.white.bgGreen('[LOG]'), ...parameters);
}
1
export function info(...parameters) {
  console.log(chalk.white.bgCyan('[INFO]'), ...parameters);
}

export function debug(...parameters) {
  console.log(chalk.white.bgBlue('[DEBUG]'), ...parameters);
}

export function warn(...parameters) {
  console.log(chalk.blue.bgYellow('[WARN]'), ...parameters);
}

export function error(...parameters) {
  console.log(chalk.white.bgRed('[ERROR]'), ...parameters);
}

export function json(object, indentation = 2) {
  console.log(JSON.stringify(object, null, indentation));
}
