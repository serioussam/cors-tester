module.exports = {
  getCallback: getCallback,
  getDefaultedConfig: getDefaultedConfig
};

function getCallback(callback) {
  if (callback) {
    assertCallbackIsAFunction(callback);
    return callback;
  } else {
    return function(){};
  }
}

function getDefaultedConfig(configParam) {
  assertConfigIsAStringOrAnObject(configParam);
  if (isConfigParamString(configParam)) {
    return getConfigWithGapsFilledWithDefaults({url: configParam});
  } else {
    return getConfigWithGapsFilledWithDefaults(configParam);
  }
}

function isConfigParamString(configParam) {
  return typeof configParam == 'string';
}

function getConfigWithGapsFilledWithDefaults(configParam) {
  assertConfigHasUrl(configParam);
  var defaultConfigs = require('./defaultConfig.js');
  return {
    url: configParam.url,
    method: configParam.method || defaultConfigs.method,
    port: configParam.port || defaultConfigs.port
  };
}

function assertConfigHasUrl(config) {
  if (!config.url) {
    throw new Error('Config object must have key "url"!');
  }
}

function assertCallbackIsAFunction(callback) {
  var type = typeof callback;
  if (type !== 'function') {
    throw new TypeError('Second (callback) parameter has to be a function');
  }
}

function assertConfigIsAStringOrAnObject(configParam) {
  assertConfigOrUrlIsGiven(configParam);
  var type = typeof configParam;
  if (type !== 'object' && type !== 'string') {
    throw new TypeError('First (url||config) parameter has to be a string or an object');
  }
}

function assertConfigOrUrlIsGiven(configParam) {
  if (!configParam) {
    throw new Error('No URL or config given!');
  }
}