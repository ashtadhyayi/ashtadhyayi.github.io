import Sanscript from "@sanskrit-coders/sanscript";
import * as utils from "./utils";
import * as query from "./query";

let transliterationTarget = "devanagari";
/* ---- Cookies ---- */
let LIPI_DEFAULT = "devanagari";
let LIPI_COOKIE = "transliteration_target";
let LIPI_EXPIRY = 30 * 24 * 3600 * 1000;  // 30 days

function loadLipi() {
    let previousTransliterationTarget = transliterationTarget;
    transliterationTarget = query.getQueryVariable("transliteration_target");
    if (!transliterationTarget) {
        transliterationTarget = utils.getCookie(LIPI_COOKIE) || LIPI_DEFAULT;
    }
    var translitrationTargetDropdown = document.getElementsByName("transliterationDropdown")[0];
    translitrationTargetDropdown.value = transliterationTarget;
    console.log(transliterationTarget);
}

export function saveLipi(lipi) {
    transliterationTarget = lipi || LIPI_DEFAULT;
    var date = new Date();
    date.setTime(date.getTime() + LIPI_EXPIRY);
    var addendum = "; expires=" + date.toGMTString() + "; path=/";
    document.cookie = LIPI_COOKIE + "=" + transliterationTarget + addendum;
}


export function transliterate() {
    loadLipi();
    if (!transliterationTarget) {
        return;
    }
    let transliterationSource = pageVars.unicodeScript || "devanagari";
    console.debug(transliterationSource, transliterationTarget);
    var textNodes = utils.textNodesUnder(document.getElementsByTagName("body")[0]);
    // console.debug(textNodes);
    textNodes.forEach(function (textNode) {
        if(textNode.parentNode.nodeName.toLowerCase() != "option") {
            // console.debug(textNode.textContent, transliterationSource, transliterationTarget);
            // console.debug(Sanscript.schemes)
            if (transliterationSource in Sanscript.schemes && transliterationTarget in Sanscript.schemes) {
                textNode.textContent = Sanscript.t(textNode.textContent, transliterationSource, transliterationTarget);
            } else {
                console.error("Some unsupported scheme! Not transliterating! Check!", transliterationSource, transliterationTarget)
            }
        }
    })
}

export function updateTransliteration() {
    var translitrationTargetDropdown = document.getElementsByName("transliterationDropdown")[0];
    var translitrationTarget = translitrationTargetDropdown.options[translitrationTargetDropdown.selectedIndex].value;
    saveLipi(translitrationTarget);
    query.insertQueryParam("transliteration_target", translitrationTarget);
}

