const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: ['./src/index.js' , './src/Register.js' , './src/SignIn.js' , './src/Welcome.js'],
    output: {
        path: path.resolve(__dirname , 'dist'),
        filename: 'bundle.js'
    }
};
