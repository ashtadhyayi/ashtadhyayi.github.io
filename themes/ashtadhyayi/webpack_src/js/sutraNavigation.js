import {getSutraBasicsFromSkId} from "./dbInterface";

import {replaceAsync, textNodesUnder} from "./utils";


async function addLinksInHtml(htmlIn) {
  // Process text like 6.4.13.
  let htmlOut = htmlIn.replace(/\[\[(\d)[।.|](\d)[।.|](\d+)\]\]/g, "($1.$2.$3)")
      .replace(/(\d\.\d\.\d+)/g, getSutraLinkHtml)
      // Process text like ६.४.१३
      .replace(/([०-९][।.][०-९][।.][०-९]+)/g, getSutraLinkHtmlFromDevanagari)
      .replace(/<\{SK(\d+)\}>/g, "(सि.कौ. $1)")
      // Process dhAtupATha references from ashtadhyayi.com db
      .replace(/\{!(\d+) +(.+?) *!\}/g, "$2")
      .replace(/\{\$(.+?)\$\}/g, "$1")
      // Fix $S$5$1$ (सुबन्त पञ्चमी एकवचनम्)
      .replace(/\$(.)\$(.)\$(.)\$/g, " $1-$2-$3");
  htmlOut = replaceAsync(htmlOut, /\(सि.कौ. (\d+)\)/g, getSkSutraLinkHtmlAsync);
  return htmlOut;
}


export async function addLinks(jqElement) {
  let jsElement = jqElement[ 0 ];

  let textElements = textNodesUnder(jsElement);
  textElements.forEach(async function (textNode) {
    let fixedHtml = await addLinksInHtml(textNode.textContent);
    $(textNode).replaceWith(fixedHtml);
  });

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


export function getContextSensitiveSutraLink(sutraId) {
  let sutraPaada = sutraId.split(".").slice(0,2).join(".");
  // return `${baseURL}/sutra-details/?sutra=${sutraId}`;
  return `/suutra/${sutraPaada}/${sutraId}/`;
}

export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

export async function setSutraNavigationLinks(sutraBasics){
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
    if (sutraId != null) {
      let urls = getAshtadhyayiComUrls();
      $(ashtadhyayiComDiv).append(`<a href="${urls.url}" class="btn btn-secondary">A</a><a href="${urls.editUrl}" class="btn btn-secondary">A<i class=\"fas fa-edit\"></i></a>`);
      
      let skId = sutraBasics["कौमुदीक्रमसङ्ख्या"];
      if (skId > 0) {
        let sutraBasicsPrev = await getSutraBasicsFromSkId(skId-1);
        // console.debug(sutraBasicsPrev, getContextSensitiveSutraLink(sutraBasicsPrev.id));
        $(skDiv).append(`<a href="${getContextSensitiveSutraLink(sutraBasicsPrev.id)}" class="btn btn-secondary"><i class=\"fas fa-caret-left\"></i>कौ${skId - 1}</a>`);
        let sutraBasicsNext = await getSutraBasicsFromSkId(skId+1);
        $(skDiv).append(`<a href="${getContextSensitiveSutraLink(sutraBasicsPrev.id)}" class="btn btn-secondary">कौ${skId + 1}<i class=\"fas fa-caret-right\"></i></a>`);
      }
    }
    
  } catch(e) {
    console.debug(e);
    console.log("Not a sutra page, probably.");
  }
}

export function getAshtadhyayiComUrls() {
  return {
    "editUrl": `https://github.com/ashtadhyayi-com/data/blob/master/`,
    "url": `https://ashtadhyayi.com/sutraani/`
  };
}

export function getEditMePath(pageUrl) {
  // console.debug(pageUrl);
  if(pageUrl.startsWith("https://raw.githubusercontent.com/")) {
    // Example: Get https://github.com/sanskrit/ashtadhyayi/edit/master/laghusiddhantakaumudi/pada-1.1/1.1.7.md from https://raw.githubusercontent.com/sanskrit/ashtadhyayi/master/laghusiddhantakaumudi/pada-1.1/1.1.7.md
    return pageUrl.replace("raw.githubusercontent.com", "github.com").replace("master", "edit/master");
  } else {
    return siteParams.githubeditmepathbase + pageUrl.replace(/.*?vritti\//, "").replace(/\/$/, ".md");
  }
}

export function getGithubCreationPath(pageUrl) {
  return getEditMePath(pageUrl).replace("/edit/", "/create/").split("/").slice(0,-1).join("/");
}

async function getSkSutraLinkHtmlAsync(sutraId) {
  let ashtadhyayiSutraObj = await getSutraBasicsFromSkId(sutraId.replace("\(सि.कौ. ", "").replace("\)", ""));
  console.debug(sutraId, ashtadhyayiSutraObj);
  if (ashtadhyayiSutraObj === undefined) {
    console.error(sutraId, ashtadhyayiSutraObj);
    return sutraIdToDevanagari(sutraId);
  } else {
    return `<a href="${getContextSensitiveSutraLink(ashtadhyayiSutraObj["id"])}">${sutraIdToDevanagari(sutraId)}</a>`;
  }
}
