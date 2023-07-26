require('ts-node').register({
    transpileOnly: true,
    require: [
        'tsconfig-paths/register',
    ],
    compilerOptions: {
        module: 'commonjs',
        resolveJsonModule: true,
        baseUrl: './',
    },
    cucumberOpts: {
        timeout: 15_000
    }
});
