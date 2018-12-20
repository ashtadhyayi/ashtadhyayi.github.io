function getSutraLinkRelative(sutraId) {
  let sutraPaada = sutraId.split(".").slice(0,2).join(".");
  return `../../pada-${sutraPaada}/${sutraId}/`;
}
function getSutraLinkTag(sutraId, style) {
  let sutraLink = getSutraLinkRelative(sutraId);
  return `<a href="${sutraLink}"  class="${style}"> ${sutraId} </a>`;
}

$(document).ready(function(){
  let currentSutraPaada = sutraId.split(".").slice(0,2).join(".");
  if (sutraBasics.Previous) {
    // console.log(nextSutraPaada);
    $(prevSutraDiv).append(getSutraLinkTag(sutraBasics.Previous, style="hover-white no-underline white-90 ma1"));
  }
  if (sutraBasics.Next) {
    $(nextSutraDiv).append(getSutraLinkTag(sutraBasics.Next, style="hover-white no-underline white-90 ma1"));
    // console.log(nextSutraPaada);
  }
});
