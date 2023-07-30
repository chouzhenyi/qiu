import { execSync } from "child_process";
import semver from "semver";
/**
 * @description 检查pnpm 版本
 * @returns
 */
export const checkPnpmVersion = (version) => {
  let hasMinPnpm = false;
  let pnpmVersion = null;
  try {
    pnpmVersion = execSync("pnpm --version").toString().trim();
    hasMinPnpm = semver.gte(pnpmVersion, version);
  } catch (err) {}
  return {
    hasMinPnpm,
    pnpmVersion,
  };
};
