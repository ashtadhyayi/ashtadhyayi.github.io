function fillJsInclude(jsIncludeJqueryElement) {
    var includedPageUrl = jsIncludeJqueryElement.attr("relativeUrlBase") + getSutraLinkRelative(sutraId);
    console.debug(includedPageUrl);
    $.ajax(includedPageUrl,{
        success: function(responseHtml) {
            // We want to use jquery to parse html, but without loading images. Hence this.
            // Tip from: https://stackoverflow.com/questions/15113910/jquery-parse-html-without-loading-images
            var virtualDocument = document.implementation.createHTMLDocument('virtual');
            var virtualJqPage = $(responseHtml, virtualDocument);
            var titleElements = virtualJqPage.find("#vrittiIdElement");
            var title = "";
            if (titleElements.length > 0) {
                // console.debug(titleElements[0]);
                title = titleElements[0].textContent.trim();
            }
            var editMePath = "";
            var editLinkElements = virtualJqPage.find("#currentSutraDiv");
            // console.debug(editLinkElements);
            if (editLinkElements.length == 0) {
                console.warn("Could not get \"currentSutraDiv\" element.");
                console.log(responseHtml);
            } else {
              editMePath = editLinkElements[0].getAttribute("href");
            }

            var contentElements = virtualJqPage.find("#vrittiContentDiv");
            // console.log(contentElements);
            if (contentElements.length == 0) {
                console.warn("Could not get \"vrittiContentDiv\" element.");
                console.log(responseHtml);
            } else {
                // We don't want multiple post-content divs, hence we replace with an included-post-content div.
                var elementToInclude = $("<div class='included-post-content card'/>")
                var titleHtml = "";
                titleHtml = "<div class='card-title border d-flex justify-content-between'>" +
                `<div id='${title}' class="btn"><a data-toggle="collapse" href="#${title}_body" role="button" aria-expanded="true" aria-controls="${title}_body">${title}` +
                `<i class="fas fa-caret-down"></i></a> </div>` +
                "<div><a class='btn btn-secondary' href='" + includedPageUrl + "'>पृथगीक्षताम्।</a> " +
                `<a class='btn btn-secondary' href='${editMePath}'>सम्पाद्यताम्।</a></div>` +
                "</div>";
                var contentHtml = `<div id='${title}_body' class="card-body collapse show">${contentElements[0].innerHTML}</div>`;
                elementToInclude.html(titleHtml + contentHtml);
                jsIncludeJqueryElement.html(elementToInclude);
            }
        },
        error: function(xhr, error){
            var titleHtml = "";
            var title = "Missing page.";
            titleHtml = "<div id='" + title + "'>" + title + "</div>";
            jsIncludeJqueryElement.html(titleHtml + "Could not get: " + includedPageUrl + " See debug messages in console for details.");
            console.debug(xhr); console.debug(error);
        }
    });
}
