import { Command } from "commander";
import chalk from "chalk";
import { yo } from "yoo-hoo";
import { noNamedCheck, checkAppName } from "./utils/validate.mjs";
import { checkPnpmVersion } from "./utils/env.mjs";
import { createApp } from "./utils/create-app.mjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

let projectName;
const init = async () => {
  const { version: packageVersion, name: packageName } = packageJson;
  const program = new Command(packageName)
    .version(packageVersion)
    .arguments("<project-directory>")
    .usage(`${chalk.redBright("<project-directory>")} [options]`)
    .action((name = "") => {
      projectName = name;
    })
    .option("--verbose", "打印附加日志")
    .option("--info", "打印环境调试日志")
    .option("--scripts-version <alternative-package>", "使用非标准版本的脚本")
    .option("--template <path-to-template>", "指定创建项目的模板")
    .allowUnknownOption()
    .on("--info", () => {
      console.log(program);
    })
    .on("--help", () => {
      console.log("给你提供帮助");
      // TODO: 输出完整的帮助文档
    })
    .parse(process.argv);
  // 艺术字展示脚手架名称
  yo("zcli");
  await noNamedCheck(projectName);
  await checkAppName(projectName);
  const needPnpmVersion = "7.0.0";
  const { hasMinPnpm, pnpmVersion } = await checkPnpmVersion(needPnpmVersion);
  if (!hasMinPnpm) {
    const errMsg = `pnpm 版本最低要求是:${needPnpmVersion},您当前版本是:${pnpmVersion} 请升级pnpm`;
    console.log(chalk.red(errMsg));
    return;
  }
  // TODO: 脚手架最新版本检测
  console.log(
    chalk.green(`待创建的项目名称为“${chalk.bold.red(projectName)}”`)
  );
  createApp(projectName);
};
init();
