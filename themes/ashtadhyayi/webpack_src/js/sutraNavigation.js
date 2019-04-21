export function addLinks(htmlIn) {
  // Replace stuff like ६.४.१३ or 6.4.13.
  let htmlOut = htmlIn.replace(/(\d\.\d\.\d+)/g, getSutraLinkHtml).replace(/([०-९][।.][०-९][।.][०-९]+)/g, getSutraLinkHtmlFromDevanagari);
  htmlOut = htmlOut.replace(/\(सि.कौ. (\d+)\)/g, getSkSutraLinkHtml);
  return htmlOut;
}

import Sanscript from "@sanskrit-coders/sanscript";

export function sutraIdToDevanagari(sutraId) {
  return Sanscript.t(sutraId, "slp1", "devanagari").split("।").join(".");
}

function getSutraLinkTag(sutraId, style, preHtml, postHtml) {
  if (preHtml == null) {
    preHtml = "";
  }
  if (postHtml == null) {
    postHtml = "";
  }
  return `<a href="${getContextSensitiveSutraLink(sutraId)}"  class="${style}">${preHtml} ${sutraIdToDevanagari(sutraId)} ${postHtml}</a>`;
}

function getSutraLinkHtml(sutraId) {
  return getSutraLinkTag(sutraId, "contentSutraLink");
}


function getSutraLinkHtmlFromDevanagari(sutraIdDevanagari) {
  let sutraId = Sanscript.t(sutraIdDevanagari, "devanagari", "slp1");
  return getSutraLinkTag(sutraId, "contentSutraLink");
}


export function getSutraLinkRelative(sutraId, resourceType) {
  let sutraPaada = sutraId.split(".").slice(0,2).join(".");
  if (resourceType == "txt") {
    return `../../pada-${sutraPaada}/${sutraId}.txt`
  } else {
    return `../../pada-${sutraPaada}/${sutraId}.md`;
  }
}

export function getContextSensitiveSutraLink(sutraId) {
  if (!pageSource.startsWith("vritti")) {
    return `${baseURL}/sutra-details/?sutra=${sutraId}`;
  } else {
    return getSutraLinkRelative(sutraId);
  }

}

export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

export function setSutraNavigationLinks(sutraBasics){
  if (sutraBasics == null) {
    console.debug("No sutraBasics. Returning", sutraBasics);
    return;
  }
  try{
    if (sutraBasics.Previous) {
      // console.log(nextSutraPaada);
      $(prevSutraDiv).append(getSutraLinkTag(sutraBasics.Previous, "btn btn-secondary", "", "<i class=\"fas fa-caret-left\"></i>"));
    }
    if (sutraBasics.Next) {
      $(nextSutraDiv).append(getSutraLinkTag(sutraBasics.Next, "btn btn-secondary", "<i class=\"fas fa-caret-right\"></i>"));
      // console.log(nextSutraPaada);
    }
  } catch(e) {
    console.debug(e);
    console.log("Not a sutra page, probably.");
  }
}

export function getEditMePath(pageUrl) {
  // console.debug(pageUrl);
  return siteParams.githubeditmepathbase + pageUrl.replace("vritti/", "").replace(/\/$/, ".md");
}

export function getGithubCreationPath(pageUrl) {
  return getEditMePath(pageUrl).replace("/edit/", "/create/").split("/").slice(0,-1).join("/");
}

import {kaumudiToAshtadhyayiIndex} from "./dbInterface";
function getSkSutraLinkHtml(sutraId) {
  let ashtadhyayiSutraId = kaumudiToAshtadhyayiIndex.get(sutraId.replace("\(सि.कौ. ", "").replace("\)", ""));
  console.debug(sutraId, ashtadhyayiSutraId);
  return `<a href="${getContextSensitiveSutraLink(ashtadhyayiSutraId)}">${sutraIdToDevanagari(sutraId)}</a>`;
}
