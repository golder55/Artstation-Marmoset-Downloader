// ==UserScript==
// @name         Artstation Marmoset Viewer Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a button to download the Marmoset viewer file from the webpage.
// @author       golder55
// @match        https://www.artstation.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function onDocumentReady(callback) {
        if (document.readyState !== 'loading') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    }

    function checkForMarmosetScript() {
        const scripts = document.querySelectorAll('script');
        let viewerUrl = '';

        scripts.forEach(script => {
            if (script.textContent.includes('marmoset.embed')) {
                const urlMatch = script.textContent.match(/marmoset\.embed\(\s*"([^"]+)"\s*,\s*opts\s*\)/);
                if (urlMatch && urlMatch[1]) {
                    viewerUrl = urlMatch[1];
                }
            }
        });

        return viewerUrl;
    }

    function createDownloadButton(viewerUrl) {
        if (!viewerUrl) return;

        const button = document.createElement('button');
        button.textContent = 'Download';
        button.style.position = 'fixed';
        button.style.bottom = '10px';
        button.style.left = '10px';
        button.style.zIndex = '10000';
        button.style.padding = '10px';
        button.style.backgroundColor = '#007BFF';
        button.style.color = '#FFFFFF';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

        button.addEventListener('click', () => {
            window.open(viewerUrl, '_blank');
        });

        document.body.appendChild(button);
    }

    onDocumentReady(() => {
        const viewerUrl = checkForMarmosetScript();
        if (viewerUrl) {
            createDownloadButton(viewerUrl);
        }
    });
})();
