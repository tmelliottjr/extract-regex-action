import core from "@actions/core";

if (import.meta.url.endsWith(process.argv[1])) {
  const userRegex = core.getInput("regex");
  const flags = core.getInput("flags");
  const input = core.getInput("input");

  run({ core, userRegex, flags, input });
}

export function run(options: {
  core: typeof core;
  userRegex: string;
  flags: string;
  input: string;
}) {
  const { core, userRegex, flags, input } = options;

  if (!userRegex) {
    core.setFailed("No regex provided");
    return;
  }

  if (!input) {
    core.setFailed("No input provided");
    return;
  }

  try {
    const regex = new RegExp(userRegex, flags);
    const result = input.match(regex);

    if (result === null || result.length === 0) {
      core.info(
        `No matches found in input for the provided regex: ${userRegex}`
      );
      return;
    }

    const trimmedResult = result.map((r) => r.trim());

    core.setOutput("resultString", trimmedResult.join(" "));
    core.setOutput("resultArray", trimmedResult);
  } catch (error) {
    core.setFailed(`An error occurred: ${error}`);
  }
}
