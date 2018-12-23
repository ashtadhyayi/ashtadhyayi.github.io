function sutraIdToDevanagari(sutraId) {
  return Sanscript.t(sutraId, "slp1", "devanagari").split("।").join(".");
}

function getSutraLinkTag(sutraId, style, preHtml, postHtml) {
  let sutraLink = "";
  if (preHtml == null) {
    preHtml = "";
  }
  if (postHtml == null) {
    postHtml = "";
  }
  return `<a href="${getContextSensitiveSutraLink(sutraId)}"  class="${style}">${preHtml} ${sutraIdToDevanagari(sutraId)} ${postHtml}</a>`;
}

function getSutraLinkHtml(sutraId) {
  return getSutraLinkTag(sutraId, style="contentSutraLink");
}


function getSutraLinkHtmlFromDevanagari(sutraIdDevanagari) {
  let sutraId = Sanscript.t(sutraIdDevanagari, "devanagari", "slp1");
  return getSutraLinkTag(sutraId, style="contentSutraLink");
}


function getSutraLinkRelative(sutraId, resourceType) {
  let sutraPaada = sutraId.split(".").slice(0,2).join(".");
  if (resourceType == "txt") {
    return `../../pada-${sutraPaada}/${sutraId}.txt`
  } else {
    return `../../pada-${sutraPaada}/${sutraId}/`;
  }
}

function getContextSensitiveSutraLink(sutraId) {
  if (!pageSource.startsWith("vritti")) {
    return baseURL + `?sutra=${sutraId}`;
  } else {
    return getSutraLinkRelative(sutraId);
  }

}

function getQueryVariable(variable) {
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

function setSutraNavigationLinks(){
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

function getEditMePath(pageUrl) {
  // console.debug(pageUrl);
  return siteParams.githubeditmepathbase + pageUrl.replace("vritti/", "").replace(/\/$/, ".md");
}

function getGithubCreationPath(pageUrl) {
  return getEditMePath(pageUrl).replace("/edit/", "/create/").split("/").slice(0,-1).join("/");
}
