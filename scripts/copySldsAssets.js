const fs = require('fs-extra');
const path = require('path');

const SLDS_SUBFOLDERS = [`icons${path.sep}utility-sprite`, 'styles', 'images'];

SLDS_SUBFOLDERS.forEach((sub) => {
    fs.copySync(
        path.join(
            '__dirname',
            `../node_modules/@salesforce-ux/design-system/assets/${sub}`
        ),
        path.join('__dirname', `../assets/${sub}`)
    );
});
