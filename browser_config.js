var RQ = RQ || {};
RQ.config = RQ.config || {};

function getBrowserConfigs(browser) {
  var configs = {
    chrome: {
      storageType: 'sync',
      contextMenuContexts: ['browser_action']
    },
    firefox: {
      storageType: 'local',
      contextMenuContexts: ['all']
    }
  };

  return configs[browser];
}

RQ.manifestJson = chrome.runtime.getManifest();

// We define applications as key in firefox manifest and not in chrome manifest
RQ.currentBrowser = RQ.manifestJson['description'].indexOf('Firefox') !== -1 ? 'firefox' : 'chrome';
RQ.browserConfigs = getBrowserConfigs(RQ.currentBrowser);
