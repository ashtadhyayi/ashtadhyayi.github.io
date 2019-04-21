
export async function getSutraBasics(sutraId) {
    return getSutraBasicsList().then(sutraBasicsList => {return sutraBasicsList.find(x => {return x["id"] == sutraId;})});
}

export async function getSutraBasicsList() {
    if (window.sutraBasicsList != null) {
        return window.sutraBasicsList;
    } else {
        return $.ajax(sutraBasicsJsonUrl).then(function (sutraBasicsList) {
            window.sutraBasicsList = Array.from(sutraBasicsList["sutraDetails"]);
            return window.sutraBasicsList;
        });
    }
}

export async function getVrittiBasics() {
    if (window.vrittiBasics != null) {
        return window.vrittiBasics;
    } else {
        return $.ajax(vrittiBasicsJsonUrl).then(function (vrittiBasics) {
            window.vrittiBasics = vrittiBasics;
            return vrittiBasics;
        });
    }
}
