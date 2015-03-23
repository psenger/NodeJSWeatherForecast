/**
 * Conf is a hierachy property loader.
 *
 * in order of being overridden
 * Argv <-overridden by- Env <-overridden by- NODE_ENV <-overridden by- Global <-overridden by- User
 *
 * Environment:NODE_ENV will call in a conf/<environment>.json file with the same name.
 * User will call in a conf/.user/<user>.json and will silently move on if not found.
 */
(function () {
    'use strict';
    var path = require('path'),
        fs = require('fs'),
        nconf = require('nconf');
    nconf.argv() // arguments passed on the command line eg '--bar bar'
        .env(); // environment variables eg 'NODE_ENV=production'
    var configDir = path.join(__dirname, '../..', 'conf');
    console.log('configDir = ' + configDir);
    if (nconf.get('NODE_ENV')) {
        console.log("Detected env: " + nconf.get('NODE_ENV'));
        var env = nconf.get('NODE_ENV').toLowerCase();
        if (fs.existsSync(path.join(configDir, env + '.json'))) {
            console.log("   loading config env: " + nconf.get('NODE_ENV'));
            nconf.add(env, {type: 'file', file: path.join(configDir, env + '.json')});
        } else {
            console.log("   No config file for env found: " + nconf.get('NODE_ENV'));
        }
    }
    console.log("loading config for global");
    nconf.add('global', {type: 'file', file: path.join(configDir, 'global.json')});
    if (nconf.get('USER')) {
        console.log("Detected user: " + nconf.get('USER'));
        var user = nconf.get('USER').toLowerCase();
        if (fs.existsSync(path.join(configDir, '.user', user + '.json'))) {
            console.log("   loading config for user: " + nconf.get('USER'));
            nconf.add(user, {type: 'file', file: path.join(configDir, '.user', user + '.json')});
        } else {
            console.log("   No config file for user found: " + nconf.get('USER'));
        }
    }
    nconf.load();
    module.exports = nconf;
}());