function addLinks(htmlIn) {
  return htmlIn.replace(/(\d\.\d\.\d+)/g, getSutraLinkHtml).replace(/([०-९][।.][०-९][।.][०-९]+)/g, getSutraLinkHtmlFromDevanagari);
}

function fillJsInclude(jsIncludeJqueryElement) {
    var resourceType = jsIncludeJqueryElement.attr("dataType");
    var includedPageUrl = jsIncludeJqueryElement.attr("relativeUrlBase") + getSutraLinkRelative(sutraId, resourceType);
    var title = jsIncludeJqueryElement.attr("title");

    var elementToInclude = $("<div class='included-post-content card'/>")
    var isCollapsed =  jsIncludeJqueryElement.hasClass("collapsed");
    var collapseStyle = "collapse show";
    // console.debug(isCollapsed);
    if (isCollapsed) {
      collapseStyle = "collapse";
    }
    var editLinkHtml = `<a class='btn btn-secondary' href='${getEditMePath(includedPageUrl)}'><i class="fas fa-edit"></i></a>`;
    // console.debug(includedPageUrl);
    $.ajax(includedPageUrl,{
        success: function(responseHtml) {
            if (includedPageUrl.endsWith(".txt")) {
              var titleHtml = "";
              titleHtml = "<div class='card-title border d-flex justify-content-between'>" +
              `<div id='${title}' class="btn"><a data-toggle="collapse" href="#${title}_body" role="button" aria-expanded="true" aria-controls="${title}_body">${title}` +
              `<i class="fas fa-caret-down"></i></a> </div>` +
              `${editLinkHtml}` +
              "</div>";
              var contentHtml = `<div id='${title}_body' class="card-body ${collapseStyle}">${addLinks(responseHtml)}</div>`;
              elementToInclude.html(titleHtml + contentHtml);
              jsIncludeJqueryElement.html(elementToInclude);
              return;
            }
            // We want to use jquery to parse html, but without loading images. Hence this.
            // Tip from: https://stackoverflow.com/questions/15113910/jquery-parse-html-without-loading-images
            var virtualDocument = document.implementation.createHTMLDocument('virtual');
            var virtualJqPage = $(responseHtml, virtualDocument);

            var contentElements = virtualJqPage.find("#vrittiContentDiv");
            // console.log(contentElements);
            if (contentElements.length == 0) {
                console.warn(`Could not get \"vrittiContentDiv\" element from ${includedPageUrl}.`);
                console.log(responseHtml);
            } else {
                // We don't want multiple post-content divs, hence we replace with an included-post-content div.
                var titleHtml = "";
                titleHtml = "<div class='card-title border d-flex justify-content-between'>" +
                `<div id='${title}' class="btn"><a data-toggle="collapse" href="#${title}_body" role="button" aria-expanded="true" aria-controls="${title}_body">${title}` +
                `<i class="fas fa-caret-down"></i></a> </div>` +
                `<div><a class='btn btn-secondary' href='${includedPageUrl}'><i class="fas fa-external-link-square-alt"></i></a>` +
                `${editLinkHtml}</div>` +
                "</div>";
                var contentHtml = `<div id='${title}_body' class="card-body ${collapseStyle}">${addLinks(contentElements[0].innerHTML)}</div>`;
                elementToInclude.html(titleHtml + contentHtml);
                jsIncludeJqueryElement.html(elementToInclude);
            }
        },
        error: function(xhr, error){
            var createLinkHtml = `<a class='btn btn-secondary' href='${getGithubCreationPath(includedPageUrl)}'><i class="fas fa-edit"></i></a>`;
            var titleHtml = "";
            titleHtml = "<div class='card-title border d-flex justify-content-between'>" +
            `<div id='${title}' class="btn"><a data-toggle="collapse" href="#${title}_body" role="button" aria-expanded="true" aria-controls="${title}_body">${title}` +
            `<i class="fas fa-caret-down"></i></a> </div>` +
            `${createLinkHtml}` +
            "</div>";
            var collapseStyle = "collapse show";
            // console.debug(isCollapsed);
            if (isCollapsed) {
              collapseStyle = "collapse";
            }
            var contentHtml = `<div id='${title}_body' class="card-body ${collapseStyle}">न लब्धा वृत्तिः। <a href="https://github.com/sanskrit/ashtadhyayi/issues/new">सत्यां प्रेष्यताम्।</a></div>`;
            elementToInclude.html(titleHtml + contentHtml);
            jsIncludeJqueryElement.html(elementToInclude);
            console.debug(xhr); console.debug(error);
        }
    });
}
