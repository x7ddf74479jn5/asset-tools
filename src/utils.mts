export const isDefaultOrFalsy = (input: string) => input === "" || input === "n";
export const isDefaultOrTruthy = (input: string) => input === "" || input === "y";

export const debugRun = (filePath: string, cmd: string) => {
  return { filePath, cmd };
};

export const debugOutput = (result: Record<string, any>) => {
  console.log(`[Debug] Input args: ${JSON.stringify(argv, null, 2)}`);
  console.log(`[Debug] Actual commands: ${JSON.stringify(result, null, 2)}`);
  process.exit(0);
};
