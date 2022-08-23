const core = require('@actions/core');
const { promises: fs } = require('fs');
const path = require('path');
const YAML = require('yaml');

async function run() {
    try {
        let filePath, fileContents;
        filePath = core.getInput('file_path');
        core.debug(`filePath: ${filePath}`);

        if (filePath) {
            fileContents =  await fs.readFile(path.resolve(filePath), 'utf-8');
            fileContents = YAML.parse(fileContents);
            core.debug(`fileContents: ${fileContents}`)

            core.setOutput('repository_name', fileContents['repository']);
            core.setOutput('new_major_version', fileContents['new_major_version']);
            core.setOutput('new_minor_version', fileContents['new_minor_version']);
            core.setOutput('new_patch_version', fileContents['new_patch_version']);
            core.setOutput('previous_major_version', fileContents['previous_major_version']);
            core.setOutput('previous_minor_version', fileContents['previous_minor_version']);
            core.setOutput('previous_patch_version', fileContents['previous_patch_version']);
        } else {
            throw new Error(`The provided file path for Digraph release PR file may be incorrect. File is: ${filePath}`);
        }
    } catch (error) {
        console.log(error);
        core.setFailed(error);
    }
}

run();
