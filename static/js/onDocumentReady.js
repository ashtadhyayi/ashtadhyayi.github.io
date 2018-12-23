
$(document).ready(setSutraNavigationLinks);

$( document ).ready(function() {
    $('.js_include').each(function() {
        console.debug("Inserting include for " + $(this).html());
        var jsIncludeJqueryElement = $(this);
        // The actual filling happens in a separate thread!
        fillJsInclude(jsIncludeJqueryElement);
    });
});

$( document ).ready(function() {
  if (pageSource == "_index.md") {
    $("h1").text(`${sutraId} ${sutraBasics["सूत्रम्‌"]}`);
  }
});

$( document ).ready(function() {
  console.debug(pageSource);
  if (pageSource.startsWith("vritti")) {
    $("#vrittiTitleSpan").text(vrittiBasics[pageParams.vritti]["name"]);
    $("#vrittiContentDiv").html(addLinks($("#vrittiContentDiv").html()));
  }
})
