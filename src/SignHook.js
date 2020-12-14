const fs = require('fs');
const path = require('path');
const s = require("../package");
var electron_notarize = require('electron-notarize');
require('dotenv').config({path: path.resolve(__dirname, '../config.env')});

module.exports = async function (params) {
    if (process.platform !== 'darwin') {
        return;
    }
    console.log('afterSign hook triggered', params);

    let appId = s.build.appId

    let appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`);
    if (!fs.existsSync(appPath)) {
        throw new Error(`Cannot find application at: ${appPath}`);
    }

    console.log(`Notarizing ${appId} found at ${appPath}`);

    try {
        await electron_notarize.notarize({
            appBundleId: appId,
            appPath: appPath,
            appleId: 'admin@habbo.nl',
            appleIdPassword: 'myappleidpassword123',
        });
    } catch (error) {
        console.error(error);
    }

    console.log(`Done notarizing ${appId}`);
};