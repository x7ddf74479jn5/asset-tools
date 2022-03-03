import "zx/globals";
import path from "path";

console.log(import.meta);
console.log(path.dirname(import.meta.url), path.basename(import.meta.url));
