import { run } from "./index.ts";
import core from "@actions/core";

run({
  core,
  userRegex: "foo",
  flags: "gzdwsqr3c2",
  input: "foo bar baz foo",
});
