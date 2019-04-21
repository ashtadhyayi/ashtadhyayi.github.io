
import csv from "jquery-csv";
import {sutraIdToDevanagari, getContextSensitiveSutraLink} from "./sutraNavigation";
import 'webpack-jquery-ui';

import {getAllSutraBasics} from "./dbInterface";

let sutraAutocompleteMap = new Map();

function loadSutraHandler() {
  let sutraSelected = $("#sutraSearchInputBox").val();
  if (sutraSelected == "") {
    return;
  }
  let sutraId = sutraAutocompleteMap.get(sutraSelected);
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
    Object.keys(allSutraBasics).forEach(sutraIdx => {
      let sutraObject = allSutraBasics[sutraIdx];
      let autocompleteText = `${sutraIdx} ${sutraObject["सूत्रम्"]} ${sutraIdToDevanagari(sutraIdx)}`;
      sutraAutocompleteMap.set(autocompleteText, sutraIdx);
      $("#sutraSearchInputBox").autocomplete({
        source: Array.from(sutraAutocompleteMap.keys())
      });
    });
    $("#sutraSearchInputBox").change(loadSutraHandler);
  });
});
