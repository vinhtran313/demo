const gitVersion = require("git-rev-sync");
const fs = require("fs");

const version = gitVersion.short();
const content = `const version = "${version}";
export { version };
`;
fs.writeFileSync("version.js", content);
