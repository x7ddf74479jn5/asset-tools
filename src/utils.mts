export const isDefaultOrFalsy = (input: string) => input === "" || input === "n";
export const isDefaultOrTruthy = (input: string) => input === "" || input === "y";

export const debugRun = (filePath: string, cmd: string) => {
  return { filePath, cmd };
};

export const debugOutput = (result: Record<string, any>) => {
  console.log(`[Debug] Input args: ${JSON.stringify(argv)}`);
  console.log(`[Debug] Actual commands: ${JSON.stringify(result)}`);
  process.exit(0);
};
