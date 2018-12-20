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
                title = titleElements[0].textContent;
            }
            var editMePath = "";
            var editLinkElements = virtualJqPage.find("#currentSutraDiv");
            console.debug(editLinkElements);
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
                var elementToInclude = $("<div class='included-post-content'/>")
                var titleHtml = "";
                titleHtml = "<h2 id='" + title + "'>" + title + "</h2>" +
                "<a class='btn btn-default ma1' href='" + includedPageUrl + "'>See separately</a> " +
                `<a class='btn btn-default ma2' href='${editMePath}'>Edit</a>`;
                elementToInclude.html(titleHtml + contentElements[0].innerHTML);
                jsIncludeJqueryElement.html(elementToInclude);
            }
        },
        error: function(xhr, error){
            var titleHtml = "";
            var title = "Missing page.";
            if (jsIncludeJqueryElement.attr("includeTitle")) {
                titleHtml = "<h1 id='" + title + "'>" + title + "</h1>";
            }
            jsIncludeJqueryElement.html(titleHtml + "Could not get: " + includedPageUrl + " See debug messages in console for details.");
            console.debug(xhr); console.debug(error);
        }
    });
}
