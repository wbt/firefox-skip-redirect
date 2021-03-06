const base64 = require("sdk/base64");
const url = require("../lib/url");

const queryAndFragment = "?some=parameter&some-other=parameter;another=parameter#some-fragment";

const wwwTargetUrl = "www.redirection.target.com/" + queryAndFragment;
const wwwTargetUrlEncoded = encodeURIComponent(wwwTargetUrl);
const wwwTargetUrlDoubleEncoded = encodeURIComponent(wwwTargetUrlEncoded);

const someTargetUrl = "some.www.redirection.target.com/" + queryAndFragment;
const someTargetUrlEncoded = encodeURIComponent(someTargetUrl);
const someTargetUrlDoubleEncoded = encodeURIComponent(someTargetUrlEncoded);

exports["test skipping to urls in querystring"] = function(assert) {
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "http://" +             someTargetUrl),                              "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "http%3A%2F%2F" +       someTargetUrlEncoded),                       "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "http%3A%2F%2F" +       someTargetUrlEncoded + "&unwanted"),         "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "http%253A%252F%252F" + someTargetUrlDoubleEncoded),                 "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "http%253A%252F%252F" + someTargetUrlDoubleEncoded + "&unwanted"),   "http://"  + someTargetUrl);

    assert.equal(url.getRedirectTarget(("http://"  + "www.some.website.com" + "/" + "http://" +             someTargetUrl).toLowerCase()),              "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://"  + "www.some.website.com" + "/" + "http%3A%2F%2F" +       someTargetUrlEncoded).toLowerCase()),       "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://"  + "www.some.website.com" + "/" + "http%253A%252F%252F" + someTargetUrlDoubleEncoded).toLowerCase()), "http://"  + someTargetUrl);

    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "?" + "http://" +  someTargetUrl),                                         "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("https://" + "www.some.website.com" + "/" + "http://" +  someTargetUrl),                                         "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "https://" + someTargetUrl),                                         "https://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "http://" +  someTargetUrlEncoded),                                  "http://"  + someTargetUrl);

    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" +               wwwTargetUrl),                                         "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" +               wwwTargetUrlDoubleEncoded),                            "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" +               wwwTargetUrlEncoded),                                  "http://"  + wwwTargetUrl);
};

exports["test skipping to urls in query parameter"] = function(assert) {
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrl),                                            "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrl +        "?some=parameter"),                 "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + "&some=parameter"),                 "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + ";some=parameter"),                 "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + "#some-fragment"),                  "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http%253A%252F%252F" + someTargetUrlDoubleEncoded),                               "http://" + someTargetUrl);

    assert.equal(url.getRedirectTarget(("http://"  + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrl).toLowerCase()),                            "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://"  + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrl +        "?some=parameter").toLowerCase()), "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://"  + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + "&some=parameter").toLowerCase()), "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://"  + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + ";some=parameter").toLowerCase()), "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://"  + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + "#some-fragment").toLowerCase()),  "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://"  + "www.some.website.com" + "/" + "?target=" + "http%253A%252F%252F" + someTargetUrlDoubleEncoded).toLowerCase()),               "http://" + someTargetUrl);

    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrlEncoded),                                     "http://" + someTargetUrl);

    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                          wwwTargetUrl),                                            "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                          wwwTargetUrl +        "?some=parameter"),                 "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                          wwwTargetUrlEncoded + "&some=parameter"),                 "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                          wwwTargetUrlEncoded + ";some=parameter"),                 "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                          wwwTargetUrlEncoded + "#some-fragment"),                  "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                          wwwTargetUrlDoubleEncoded),                               "http://"  + wwwTargetUrl);
};

exports["test recursion"] = function(assert) {
    const wwwTargetUrlOne =  wwwTargetUrl + "-ONE";
    const wwwTargetUrlTwo =  wwwTargetUrl + "-TWO";
    assert.equal(url.getRedirectTarget("http://www.some.website.com/" +                                             wwwTargetUrlOne + "/" +                                       wwwTargetUrlTwo),   "http://" + wwwTargetUrlTwo);
    assert.equal(url.getRedirectTarget("http://www.some.website.com/" +                                 "http://" + wwwTargetUrlOne + "/" +                           "http://" + wwwTargetUrlTwo),   "http://" + wwwTargetUrlTwo);

    assert.equal(url.getRedirectTarget("http://www.some.website.com/" + "?target=" +                                wwwTargetUrlOne + "&target=" +                                wwwTargetUrlTwo),   "http://" + wwwTargetUrlTwo);
    assert.equal(url.getRedirectTarget("http://www.some.website.com/" + "?target=" +                    "http://" + wwwTargetUrlOne + "&target=" +                    "http://" + wwwTargetUrlTwo),   "http://" + wwwTargetUrlTwo);
    assert.equal(url.getRedirectTarget("http://www.some.website.com/" + "?target=" + encodeURIComponent("http://" + wwwTargetUrlOne + "&target=" + encodeURIComponent("http://" + wwwTargetUrlTwo))), "http://" + wwwTargetUrlTwo);
};

exports["test exceptions to skipping"] = function(assert) {
    const noRedirectUrls = [
        someTargetUrl,
        "http://www.some.website.com/" + wwwTargetUrl.replace("www.", "www"),
        "http://www.some.website.com/" + "login?continue=" + someTargetUrl + "#some-fragment",
        "http://www.some.website.com/" + "login?continue=" + someTargetUrlEncoded + "#some-fragment",
        "http://www.some.website.com/" + "login?continue=" + someTargetUrlDoubleEncoded + "#some-fragment]",
    ];

    for (let urlString of noRedirectUrls) {
        assert.equal(url.getRedirectTarget(urlString), urlString);
    }
};

exports["test skipping to hex encoded urls"] = function(assert) {
    const noUrlBase64Url = "http://" + "www.some.website.com" + "/" + base64.encode("wwwwwwww");
    assert.equal(url.getRedirectTarget(noUrlBase64Url), noUrlBase64Url);

    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" +               base64.encode(wwwTargetUrl)),                    "http://" +  wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" +               base64.encode("http://" + someTargetUrl)),                    "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" +               base64.encode("http://" + someTargetUrl) + "#some-fragment"), "http://" + someTargetUrl);

    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "?target=" +  base64.encode(wwwTargetUrl)),                    "http://" +  wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "?target=" +  base64.encode("http://" + someTargetUrl)),                    "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "?target=" +  base64.encode("http://" + someTargetUrl) + "#some-fragment"), "http://" + someTargetUrl);
};

require("sdk/test").run(exports);
