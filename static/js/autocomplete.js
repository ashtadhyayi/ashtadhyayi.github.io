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
  $("#sutraSearchInputBox").change(function() {
    let sutraSelected = $(this).val();
    let sutraDetails = sutraAutocompleteMap.get(sutraSelected)
    console.log(sutraDetails);
    if (sutraDetails) {
      window.location = getSutraLinkRelative(sutraDetails.index);
    }
  });
});
