
import csv from "jquery-csv";
import {sutraIdToDevanagari, getContextSensitiveSutraLink} from "./sutraNavigation";
import 'webpack-jquery-ui';

import {getAllSutraBasics} from "./dbInterface";

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
  getAllSutraBasics().then(allSutraBasics => {
    // console.debug(allSutraBasics);
    let sutraAutocompleteList = [];
    Object.keys(allSutraBasics).forEach(sutraIdx => {
      let sutraObject = allSutraBasics[sutraIdx];
      let autocompleteText = `${sutraIdx} ${sutraObject["सूत्रम्"]} ${sutraIdToDevanagari(sutraIdx)}`;
      sutraAutocompleteList.push(autocompleteText);
      $("#sutraSearchInputBox").autocomplete({
        source: sutraAutocompleteList
      });
    });
    $("#sutraSearchInputBox").change(loadSutraHandler);
  });
});
