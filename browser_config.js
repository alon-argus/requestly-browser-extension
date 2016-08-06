var RQ = RQ || {};
RQ.config = RQ.config || {};

function getBrowserConfigs(browser) {
  var configs = {
    chrome: {
      storageType: chrome.storage.sync,
      contextMenuContexts: ['browser_action']
    },
    firefox: {
      storageType: chrome.storage.local,
      contextMenuContexts: ['all']
    }
  }

  return configs[browser];
}

RQ.manifestJson = chrome.runtime.getManifest();

// We define applications as key in firefox manifest and not in chrome manifest
RQ.currentBrowser = RQ.manifestJson['applications'] ? 'firefox' : 'chrome';
RQ.browserConfigs = getBrowserConfigs(RQ.currentBrowser);
