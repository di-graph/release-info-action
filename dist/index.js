/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 94:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 184:
/***/ ((module) => {

module.exports = eval("require")("yaml");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(94);
const { promises: fs } = __nccwpck_require__(147);
const path = __nccwpck_require__(17);
const YAML = __nccwpck_require__(184);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;