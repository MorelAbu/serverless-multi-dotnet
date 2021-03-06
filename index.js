'use strict';

const BbPromise = require('bluebird');
const pack = require('./lib/pack');
const getPackingInfo = require('./lib/pack');

class ServerlessDotNet {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    if(!options["nopack"]){
      
      Object.assign( this, pack );
      Object.assign( this, getPackingInfo );

      this.hooks = {
        'after:deploy:createDeploymentArtifacts': () => BbPromise.bind(this).then(this.pack)
      };
    }
  }
}

module.exports = ServerlessDotNet;
