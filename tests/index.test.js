import { run } from "../index";
import core from "@actions/core";
import { describe, expect, it, vi, beforeAll } from "vitest";
beforeAll(() => {
    core.setOutput = vi.fn();
});
describe("run", () => {
    it("should fail if no regex is provided", () => {
        const mockSetFailed = vi.spyOn(core, "setFailed");
        run({
            core,
            userRegex: "",
            flags: "",
            input: "testing string",
        });
        expect(mockSetFailed).toHaveBeenCalledWith("No regex provided");
        expect(core.setOutput).not.toHaveBeenCalled();
    });
    it("should fail if no input is provided", () => {
        const mockSetFailed = vi.spyOn(core, "setFailed");
        run({
            core,
            userRegex: "test",
            flags: "",
            input: "",
        });
        expect(mockSetFailed).toHaveBeenCalledWith("No input provided");
        expect(core.setOutput).not.toHaveBeenCalled();
    });
    it("should fail if regex is invalid", () => {
        const mockSetFailed = vi.spyOn(core, "setFailed");
        run({
            core,
            userRegex: "test",
            flags: "invalid",
            input: "testing string",
        });
        expect(mockSetFailed).toHaveBeenCalled();
        expect(core.setOutput).not.toHaveBeenCalled();
    });
    it("should log if no matches found", () => {
        const mockInfo = vi.spyOn(core, "info");
        run({
            core,
            userRegex: "^test\\b",
            flags: "",
            input: "testing input",
        });
        expect(mockInfo).toHaveBeenCalledWith("No matches found in input for the provided regex: ^test\\b");
    });
    it("should return all matches", () => {
        run({
            core,
            userRegex: "(?<=### Status\\s).*?(?=\\s*###)",
            flags: "sgm",
            input: `### Status
      ⏸️ Paused
      ### TLDR
      
      ### Status
      🟢 > 🔴
      ### TLDR`,
        });
        expect(core.setOutput).toHaveBeenCalledWith("resultString", "⏸️ Paused 🟢 > 🔴");
        expect(core.setOutput).toHaveBeenCalledWith("resultArray", [
            "⏸️ Paused",
            "🟢 > 🔴",
        ]);
    });
});
