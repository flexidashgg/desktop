module.exports = {
    packagerConfig: {
        asar: true,

        name: 'FlexiDash Desktop',
        productName: 'FlexiDash Desktop',
        executableName: 'FlexiDash Desktop Client',

        appBundleId: 'lol.lucat.flexidash.desktop'
    },

    rebuildConfig: {},

    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },

        {
            name: '@electron-forge/maker-squirrel',
            config: {},
        },

        {
            name: '@electron-forge/maker-deb',
            config: {},
        },

        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],

    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {},
        },
    ],
};
