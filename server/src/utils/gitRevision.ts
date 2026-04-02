export let GIT_VERSION = "Unknown";
try {
    //GIT_VERSION = execSync("git rev-parse HEAD").toString().trim();
} catch (_error) {
    //console.error(`Failed to parse git revision: `, error);
}
