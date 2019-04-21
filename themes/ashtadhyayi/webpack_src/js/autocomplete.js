
import csv from "jquery-csv";
import {sutraIdToDevanagari, getContextSensitiveSutraLink} from "./sutraNavigation";
import 'webpack-jquery-ui';

import {getSutraBasicsList} from "./dbInterface";

function loadSutraHandler() {
  let sutraSelected = $("#sutraSearchInputBox").val();
  if (sutraSelected == "") {
    return;
  }
  let sutraId = sutraSelected.split(" ")[0];
  // console.debug(sutraId);
  if (sutraId) {
    console.debug(getContextSensitiveSutraLink(sutraId));
    // return;
    window.location = getContextSensitiveSutraLink(sutraId);
  }
}

$(document).ready(function() {
  getSutraBasicsList().then(sutraBasicsList => {
    // console.debug(sutraBasicsMap);
    let sutraAutocompleteList = [];
    sutraBasicsList.forEach (sutraObject  => {
      let autocompleteText = `${sutraObject["id"]} ${sutraObject["सूत्रम्"]} ${sutraIdToDevanagari(sutraObject["id"])}`;
      sutraAutocompleteList.push(autocompleteText);
      $("#sutraSearchInputBox").autocomplete({
        source: sutraAutocompleteList
      });
    });
    $("#sutraSearchInputBox").change(loadSutraHandler);
  });
});
