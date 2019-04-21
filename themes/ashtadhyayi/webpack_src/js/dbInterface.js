
export async function getSutraBasics(sutraId) {
    return getAllSutraBasics().then(x => x[sutraId]);
}

export async function getAllSutraBasics() {
    if (window.allSutraBasics != null) {
        return window.allSutraBasics;
    } else {
        return $.ajax(sutraBasicsJsonUrl).then(function (allSutraBasics) {
                window.allSutraBasics = allSutraBasics;
                return allSutraBasics;
            });
    }
}

