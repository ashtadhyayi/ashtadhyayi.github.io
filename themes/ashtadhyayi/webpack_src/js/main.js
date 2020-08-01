import {setSutraNavigationLinks, sutraIdToDevanagari, getQueryVariable} from "./sutraNavigation";

import {getSutraBasics} from "./dbInterface";
import handleIncludes from "./handleIncludes";

function setCanonicalUrl() {
    // Set canonical URL so that Google does not exclude this page from the index. See https://github.com/ashtadhyayi/ashtadhyayi.github.io/issues/11 .
    var link = !!document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']") : document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', location.protocol + '//' + location.host + "/sutra-details/?sutra=" + sutraId);
    document.head.appendChild(link);
}

$( document ).ready(function() {
if (pageSource.endsWith("sutra-details.md") || pageSource.endsWith("ui.md")) {
    sutraId = "1.1.1";
    if (getQueryVariable("sutra")) {
        sutraId = getQueryVariable("sutra");
    }
    setCanonicalUrl();
}

console.log(sutraId);

getSutraBasics(sutraId).then(function (sutraBasics) {
    setSutraNavigationLinks(sutraBasics);
});

if (sutraId != null) {
    getSutraBasics(sutraId).then(x => {return x["सूत्रम्"]}).then(sutraTitle => {
        let titleText = `${sutraIdToDevanagari(sutraId)} ${sutraTitle}`;
        $("#sutraHeading").text(titleText);
        document.title = `पाणिनीयमूलस्रोतः - ${titleText}`;
    }); 
}
    handleIncludes();
});

import "./autocomplete";

import {redirectToRandomPage, redirectToPage} from "./redirect";
// So that these can be used like module_main.default.redirectToPage(..).
export default {
    redirectToRandomPage: redirectToRandomPage,
    redirectToPage: redirectToPage
}

