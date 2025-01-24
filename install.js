const axios = require("axios");
const dotenv = require("dotenv");
const extractZip = require("extract-zip");
const fs = require("fs");
const path = require("path");

dotenv.config();

const releases = require("./releases.js");

const gitHubApi = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
});

function isReleaseInstalled(repository, tag) {
    return fs.existsSync(path.join(process.env.WORKING_DIRECTORY, `${repository}-${tag}`));
}

async function downloadGitHubRelease(organization, repository, tag) {
    const response = await gitHubApi.get(`/repos/${organization}/${repository}/zipball/${tag}`, {
        responseType: "stream"
    });

    const zipFilePath = path.join(process.env.WORKING_DIRECTORY, `${repository}-${tag}.zip`);
    const stream = fs.createWriteStream(zipFilePath);
    response.data.pipe(stream);
    await new Promise((resolve, reject) => stream.on("finish", resolve).on("error", reject));

    await extractZip(zipFilePath, { dir: process.env.WORKING_DIRECTORY });

    const files = fs.readdirSync(process.env.WORKING_DIRECTORY);
    const directory = files.find((file) => file.startsWith(`${organization}-${repository}`));

    if (!directory) {
        throw Error("The extracted archive was not found");
    }

    fs.renameSync(path.join(process.env.WORKING_DIRECTORY, directory), path.join(process.env.WORKING_DIRECTORY, `${repository}-${tag}`));

    fs.rmSync(zipFilePath);
}

function getEnvExampleConfig(repository, tag) {
    const data = fs.readFileSync(path.join(process.env.WORKING_DIRECTORY, `${repository}-${tag}`, ".env.example"), "utf8");
    const buffer = Buffer.from(data);
    return dotenv.parse(buffer);
}

function setEnvConfig(repository, tag, config) {
    const data = Object.entries(config).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join("\n");
    fs.writeFileSync(path.join(process.env.WORKING_DIRECTORY, `${repository}-${tag}`, ".env"), data, "utf8")
}

async function main() {
    for (const release of releases) {
        if (isReleaseInstalled(release.repository, release.tag)) {
            continue;
        }

        console.log(`${release.repository}#${release.tag} Downloading release…`);
        await downloadGitHubRelease(release.organization, release.repository, release.tag);

        console.log(`${release.repository}#${release.tag} Creating environment file…`);
        const config = getEnvExampleConfig(release.repository, release.tag);
        setEnvConfig(release.repository, release.tag, config)
    }
}

main();
