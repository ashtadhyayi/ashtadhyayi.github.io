
export async function getSutraBasics(sutraId) {
    return getSutraBasicsList().then(sutraBasicsList => {return sutraBasicsList.find(x => {return x["id"] == sutraId;})});
}

export async function getSutraBasicsList() {
    if (window.sutraBasicsList != null) {
        return window.sutraBasicsList;
    } else {
        return $.getJSON(sutraBasicsJsonUrl).then(function (sutraBasicsList) {
            // console.debug(sutraBasicsList);
            window.sutraBasicsList = Array.from(sutraBasicsList["sutraDetails"]);
            return window.sutraBasicsList;
        });
    }
}

// The below can't be used in case of string replacement without special tricks. 
export async function getSutraBasicsFromSkId(skId) {
    return getSutraBasicsList().then(sutraBasicsList => {return sutraBasicsList.find(x => {return x["कौमुदीक्रमसङ्ख्या"] == skId;})});
}


export async function getVrittiBasics() {
    if (window.vrittiBasics != null) {
        return window.vrittiBasics;
    } else {
        return $.getJSON(vrittiBasicsJsonUrl).then(function (vrittiBasics) {
            window.vrittiBasics = vrittiBasics;
            return vrittiBasics;
        });
    }
}
