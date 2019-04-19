function addLinks(htmlIn) {
  // Replace stuff like ६.४.१३ or 6.4.13.
  let htmlOut = htmlIn.replace(/(\d\.\d\.\d+)/g, getSutraLinkHtml).replace(/([०-९][।.][०-९][।.][०-९]+)/g, getSutraLinkHtmlFromDevanagari);
  htmlOut = htmlOut.replace(/\(सि.कौ. (\d+)\)/g, getSkSutraLinkHtml);
  return htmlOut;
}

var showdownConverter = new showdown.Converter();

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
            if (includedPageUrl.endsWith(".md")) {
                var renderedHtml = showdownConverter.makeHtml(responseHtml.split("---").slice(2).join("\n"));
                

                var titleHtml = "";
                titleHtml = "<div class='card-title border d-flex justify-content-between'>" +
                    `<div id='${title}' class="btn"><a data-toggle="collapse" href="#${title}_body" role="button" aria-expanded="true" aria-controls="${title}_body">${title}` +
                    `<i class="fas fa-caret-down"></i></a> </div>` +
                    `${editLinkHtml}` +
                    "</div>";
                var contentHtml = `<div id='${title}_body' class="card-body ${collapseStyle}">${addLinks(renderedHtml)}</div>`;
                elementToInclude.html(titleHtml + contentHtml);
                jsIncludeJqueryElement.html(elementToInclude);
                return;
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
