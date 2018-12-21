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

function getSutraLinkTag(sutraId, style, preHtml, postHtml) {
  let sutraLink = "";
  if (preHtml == null) {
    preHtml = "";
  }
  if (postHtml == null) {
    postHtml = "";
  }
  return `<a href="${getContextSensitiveSutraLink(sutraId)}"  class="${style}">${preHtml} ${sutraId} ${postHtml}</a>`;
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
    let currentSutraPaada = sutraId.split(".").slice(0,2).join(".");
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
