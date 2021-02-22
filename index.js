const core = require("@actions/core");
const github = require("@actions/github");

try {
  const { context } = github;
  const githubToken = core.getInput("GITHUB_TOKEN");
  const body = core.getInput("body");
  const prNumber = core.getInput("prNumber");

  if (!prNumber) {
    core.setFailed("prNumber input is required");
    return;
  }
  if (!githubToken) {
    core.setFailed("GITHUB_TOKEN input is required");
    return;
  }
  if (!body) {
    core.setFailed("body input is required");
    return;
  }

  const octokit = new github.GitHub(githubToken);
  octokit.pulls.update({
    ...context.repo,
    pull_number: prNumber,
    body
  });
} catch (error) {
  core.setFailed(error.message);
}
