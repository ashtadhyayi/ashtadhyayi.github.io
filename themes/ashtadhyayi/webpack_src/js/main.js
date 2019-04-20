import {setSutraNavigationLinks, sutraIdToDevanagari, getQueryVariable} from "./sutraNavigation";

if (pageSource == "sutra-details.md" || pageSource == "ui.md") {
    sutraId = "1.1.1";
    if (getQueryVariable("sutra")) {
        sutraId = getQueryVariable("sutra");
    }
    sutraBasics = window.allSutraBasics[sutraId];
}


$(document).ready(setSutraNavigationLinks);

import {fillJsInclude} from "./handleIncludes";
$( document ).ready(function() {
    $('.js_include').each(function() {
        // console.debug("Inserting include for " + $(this).html());
        var jsIncludeJqueryElement = $(this);
        // The actual filling happens in a separate thread!
        fillJsInclude(jsIncludeJqueryElement);
    });
});

$( document ).ready(function() {
if (sutraId != null) {
    $("#sutraHeading").text(`${sutraIdToDevanagari(sutraId)} ${sutraBasics["सूत्रम्"]}`);
}
});

import "./autocomplete";