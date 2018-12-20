
function loadSutra() {
  let sutraSelected = $("#sutraSearchInputBox").val();
  let sutraDetails = sutraAutocompleteMap.get(sutraSelected)
  // console.debug(sutraDetails);
  if (sutraDetails) {
    console.debug(getContextSensitiveSutraLink(sutraDetails.index));
    // return;
    window.location = getContextSensitiveSutraLink(sutraDetails.index);
  }
}

$(document).ready(function(){
  let sutraAutocompleteMap = new Map();
  $.ajax({
    type: "GET",
    url: autocompletePageUrl,
    dataType: "text",
    success: function(response) {
      var options={"separator" : "\t"};
      sutraList = $.csv.toObjects(response, options);
      for (var sutraObject of sutraList) {
        let autocompleteText = sutraObject.index + " " + sutraObject.sutra;
        sutraAutocompleteMap.set(autocompleteText, sutraObject);
      }
      // console.log(sutraAutocompleteMap.keys());
      $("#sutraSearchInputBox").autocomplete({
        source: Array.from(sutraAutocompleteMap.keys())
      });
    }
  });
  $("#sutraSearchInputBox").change(loadSutra());
  $("#sutraSearchInputBox").keyup(loadSutra());
  $("#sutraSearchInputBox").mouseup(loadSutra());
});
