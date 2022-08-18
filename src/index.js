const core = require('@actions/core');
const { promises: fs } = require('fs');
const path = require('path');
const YAML = require('yaml');

async function run() {
    let filePath, fileContents;
    try {
        filePath = core.getInput('file_path');
        core.debug(`filePath: ${filePath}`);

        if (filePath) {
            try {
                fileContents =  await fs.readFile(path.resolve(filePath), 'utf-8');
            } catch (error) {
                console.error(error);
                throw new Error(`The provided file path for Digraph release PR file may be incorrect. File is: ${filePath}`);
            }
        }

        if (fileContents) {
            // confirm it is valid YAML
            try {
                fileContents = YAML.parse(fileContents);
            } catch (error) {
                console.error(error);
                throw new Error('File contents is invalid YAML')
            }
        }

        core.setOutput('repository', fileContents['repository'])
        core.setOutput('new_major_version', fileContents['new_major_version'])
        core.setOutput('new_minor_version', fileContents['new_minor_version'])
        core.setOutput('new_patch_version', fileContents['new_patch_version'])
        core.setOutput('previous_major_version', fileContents['previous_major_version'])
        core.setOutput('previous_minor_version', fileContents['previous_minor_version'])
        core.setOutput('previous_patch_version', fileContents['previous_patch_version'])
    } catch (error) {
        core.setFailed(error)
    }
}

run();
