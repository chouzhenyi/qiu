import validateProjectName from "validate-npm-package-name";
import chalk from "chalk";
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { prompt } = require("prompts");
export const noNamedCheck = (projectName) => {
  // 检查是否有输入应用名称
  if (!projectName) {
    console.log(`${chalk.redBright("需要输入待创建项目的目录名")}`);
    console.log("例如:");
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green("my-sany-app")}`
    );
    return;
  }
  return true;
};

/**
 * @description 检查应用命名规范
 * @param {*} appName
 */
export const checkAppName = (appName) => {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.info(
      chalk.red(
        `不能使用项目名称（${chalk.green(`"${appName}"`)}） 因为npm命名规定:\n`
      )
    );
    [
      ...(validationResult.errors || []),
      ...(validationResult.warnings || []),
    ].forEach((error) => {
      console.info(chalk.red(`  * ${error}`));
    });
    console.info(chalk.red("\n 请选择别的项目名称"));
    process.exit(1);
  }
  return true;
};

export const checkAppNotExist = async (appName) => {
  const isExist = fs.existsSync(appName);
  if (isExist) {
    const { converApp } = await prompt({
      type: "confirm",
      name: "converApp",
      message: `应用${appName}已有同名目录，是否覆盖`,
    });
    return converApp;
  }
  return true;
};
