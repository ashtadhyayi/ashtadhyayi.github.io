import {setSutraNavigationLinks, sutraIdToDevanagari, getQueryVariable} from "./sutraNavigation";

if (pageSource == "sutra-details.md" || pageSource == "ui.md") {
    sutraId = "1.1.1";
    if (getQueryVariable("sutra")) {
        sutraId = getQueryVariable("sutra");
    }
}

import {getSutraBasics} from "./dbInterface";

$(document).ready(function() {
    getSutraBasics(sutraId).then(function (sutraBasics) {
        setSutraNavigationLinks(sutraBasics);
    })
});

import handleIncludes from "./handleIncludes";
$( document ).ready(handleIncludes);

$( document ).ready(function() {
if (sutraId != null) {
    getSutraBasics(sutraId).then(x => x["सूत्रम्"]).then(sutraTitle => $("#sutraHeading").text(`${sutraIdToDevanagari(sutraId)} ${sutraTitle}`)); 
}
});

import "./autocomplete";