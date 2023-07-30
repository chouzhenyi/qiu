import fs from "fs-extra";
import spawn from "cross-spawn";
import chalk from "chalk";
import path from "path";
import { checkAppNotExist } from "./validate.mjs";

/**
 * @description 项目模板安装
 * @param {*} appName
 */
const templateInstall = (appName, root) => {
  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
  };
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
};

const spawnCb = (
  command,
  args,
  processInfo = "",
  errInfo = "",
  succeedInfo = ""
) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("close", (err) => {
      if (err) {
        console.log(chalk.red(errInfo));
        reject();
        return;
      }
      console.log(chalk.green(succeedInfo));
      resolve();
    });
  });
};
/**
 * @description git 初始化
 */
const gitInit = async (appName) => {
  await spawnCb("git", ["init"], "git 初始化", "git 初始化失败", "");
  await spawnCb("git", ["add", "."], "", "git添加暂存区失败", "");
  await spawnCb(
    "git",
    ["commit", "-m", "项目初始化"],
    "",
    "git提交失败",
    `${appName}应用创建`
  );
};
/**
 * @description 创建应用
 * @param {*} appName
 */
export const createApp = async (appName) => {
  if (await checkAppNotExist(appName)) {
    fs.ensureDirSync(appName);
    const root = path.resolve(appName);
    await templateInstall(appName, root);
    //   切换根目录到新创建应用的目录
    process.chdir(root);
    await gitInit(appName);
  }
};
