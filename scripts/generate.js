import {generateStaticSite, DiagnosticsError} from 'lwr';

import dotenv from 'dotenv';

const serverMode = process.env.MODE || 'dev';
const serverType = 'express';

dotenv.config();

const moduleProviders = [
    "$rootDir/build/wire-provider.js",
    "@lwrjs/app-service/moduleProvider",
    [
        "@lwrjs/label-module-provider",
        {
            "provideDefault": true,
            "labelDirs": [
                {
                    "dir": "$rootDir/src/labels",
                    "package": "@my/label"
                }
            ]
        }
    ],
    "@lwrjs/lwc-module-provider",
    "@lwrjs/npm-module-provider"
];

const bundleConfig = {
    "exclude": [
        "lwc", "@lwc/synthetic-shadow"
    ]
}

const staticSiteGenerator = {
    outputDir: `__generated_site_${serverMode}__`,
    locales: ['en-US'],
};

generateStaticSite({ serverType, serverMode, moduleProviders, bundleConfig, staticSiteGenerator})
    .then((data) => {
        console.log('>> success', data);
        process.exit(0);
    })
    .catch((err) => {
        if (err instanceof DiagnosticsError) {
            console.log('LWR Diagnostic Error: ');
            console.log(JSON.stringify(diagnostics));
            console.log(err.stack);
        } else {
            console.error(err);
        }

        process.exit(1);ß
    });