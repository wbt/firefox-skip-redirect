const events = require("sdk/system/events");
const interfaces = require("chrome").Ci;
const simplePreferences = require("sdk/simple-prefs");

const ui = require("./lib/ui");
const url = require("./lib/url");
const utils = require("./lib/utils");

function listener(event) {
    const subject = event.subject;
    subject.QueryInterface(interfaces.nsIHttpChannel);

    const isDocumentLoad = subject.loadFlags & subject.LOAD_INITIAL_DOCUMENT_URI;
    if (!isDocumentLoad) {
        return;
    }

    const preferences = simplePreferences.prefs;
    if (!preferences.enabled) {
        return;
    }

    const original = subject.URI.spec;
    const redirectTarget = url.getRedirectTarget(original);
    if (redirectTarget == original) {
        return;
    }

    ui.indicateSkip(original, redirectTarget);
    subject.redirectTo(utils.makeURI(redirectTarget));
}

exports.main = function(options) {

    ui.makeButton();
    events.on("http-on-opening-request", listener);
};

exports.onUnload = function(reason) {

    events.off("http-on-opening-request", listener);
    ui.destroyButton();
};
