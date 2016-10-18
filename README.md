Requestly [![Stories in Ready](https://badge.waffle.io/blunderboy/requestly.png?label=ready&title=Ready)](https://waffle.io/blunderboy/requestly)
================

Requestly is a chrome extension using which user can redirect an HTTP(S) request.
Requestly is available in [Chrome Store](https://chrome.google.com/webstore/detail/requestly/mdnleldcmiljblolnjhpnblkcekpdkpa).

## For Review Process by Mozilla Team
----------------------------------

### Prerequisites
1. Node JS (node v4.1+)
2. grunt plugin
3. Mozilla Firefox v49+

### Libraries Used
1. BackboneJs - v1.1.2 (Unminified)
2. Bootstrap - v3.3.5 (Minified)
3. Bootstrap Toggle - v2.2.0 (Minified) Link: http://www.bootstraptoggle.com
4. Firebase - v2.4.0 (Minified)
5. Handlebars runtime - v3.0.3 (Unminified)
6. jQuery - v2.2.4 (Unminified)
7. mdb.js - v2.0.1 (Purchased library. Here is the license - https://github.com/requestly/web/blob/gh-pages/libs/mdb/MDB%20License.pdf)
8. sanitize-html.js - Source code available here: https://github.com/requestly/sanitize-html
9. Underscore.js - v1.6.0 (Unminified)

### How to generate obfuscated code

    grunt concat

### How to generate signed xpi file for firefox

    grunt select-firefox
    # Create an alias if not already done like this. Write it inside ~/.bashrc
    # alias sign_requestly_build="web-ext sign --api-key=??? --api-secret=???"
    sign_requestly_build
    cp -r web-ext-artifacts/* builds/web-ext-artifacts/
    rm -rf web-ext-artifacts

### Additional Notes

- Handlebars is used for generating markup which is sanitized before injected into DOM. Code is inside BaseView.js.
Inside app.js you may see jquery .html() but it just takes backbone views el and adds to empty element in DOM.
Since Backbone views have sanitized html, above step is also safe.

Why do I need Requestly ?
-------------------------

Requestly is built with intention to help web developers debug JS issues on sites running in production environment.<br/>
User just needs to create a redirect rule and redirect the JS running in production environment to JS from your local machine.<br/>
Now, make changes on your local setup and test it on your site in production.

**Other Perks:**
Requestly can also be used to keep you away from time killing sites.<br/>
Just create a rule to redirect yourself from facebook.com, twitter.com to stackoverflow.com and do some geeky stuff there.

Steps to run the extension in Developer Mode:
---------------------------------------------

<strong>Step1:</strong> Download the extension code on your machine <br/>
(Using git): git clone https://github.com/blunderboy/requestly.git some_directory_name <br/>
(Download ZIP): You can also download the extension in zip format from [Requestly Repsitory](https://github.com/blunderboy/requestly)

<strong>Step2:</strong> Browse chrome://extensions/

<strong>Step3:</strong> Select Checkbox for Developer Mode

<strong>Step4:</strong> Click on Load unpacked extension

<strong>Step5:</strong> Browse the directory in which extension code is present

Author
------------------------------

Please feel free to drop an email to sachinjain024 [at] gmail [dot] com in case you find any issues.

License
----------------------

MIT: http://sachinjain.mit-license.org
