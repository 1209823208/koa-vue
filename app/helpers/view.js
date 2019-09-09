const manifest = require('../../static/dist/manifest.json');
const config = require('../../config');

const productionAsset = config.productionAsset;
const devStaticHost = config.devStaticHost;

let url = function (scope, option) {
    const publicAsset = manifest[option.params[0]];
    let path = null;
    if (scope && scope.data && scope.data.env && scope.data.env == 'production') {
        path = `${productionAsset}/${publicAsset}`;
    } else {
        path = `${devStaticHost}/${option.params[0]}`;
    }
    return path;
};
exports.url = url;