import {addLinks, getSutraLinkRelative, getEditMePath, getGithubCreationPath} from "./sutraNavigation";
import showdown from "showdown";

var showdownConverter = new showdown.Converter();

function getEditLinkHtml(includedPageUrl) {
    return `<a class='btn btn-secondary' href='${getEditMePath(includedPageUrl)}'><i class="fas fa-edit"></i></a>`    
}

function getCollapseStyle(jsIncludeJqueryElement) {
    var isCollapsed =  jsIncludeJqueryElement.hasClass("collapsed");
    var collapseStyle = "collapse show";
    // console.debug(isCollapsed);
    if (isCollapsed) {
        collapseStyle = "collapse";
    }
    return collapseStyle;
}

function getIncludePageUrl(includeElement) {
    let resourceType = includeElement.attr("dataType");
    return includeElement.attr("relativeUrlBase") + getSutraLinkRelative(sutraId, resourceType);
}

function getTextContentCard(responseHtml, includeElement) {
    let title = includeElement.attr("title");
    let resourceType = includeElement.attr("dataType");
    let includedPageUrl = includeElement.attr("relativeUrlBase") + getSutraLinkRelative(sutraId, resourceType);
    let collapseStyle = getCollapseStyle(includeElement);

    let titleHtml = "<div class='card-title border d-flex justify-content-between'>" +
        `<div id='${title}' class="btn"><a data-toggle="collapse" href="#${title}_body" role="button" aria-expanded="true" aria-controls="${title}_body">${title}` +
        `<i class="fas fa-caret-down"></i></a> </div>` +
        `${getEditLinkHtml(includedPageUrl)}` +
        "</div>";
    var contentHtml = `<div id='${title}_body' class="card-body ${collapseStyle}">${addLinks(responseHtml)}</div>`;
    var elementToInclude = $("<div class='included-post-content card'/>")
    elementToInclude.html(titleHtml + contentHtml);
    return elementToInclude;
}

function getMarkdownContentCard(responseHtml, includeElement) {
    let title = includeElement.attr("title");
    let resourceType = includeElement.attr("dataType");
    let includedPageUrl = getIncludePageUrl(includeElement);
    let collapseStyle = getCollapseStyle(includeElement);

    var renderedHtml = showdownConverter.makeHtml(responseHtml.split("---").slice(2).join("\n"));

    var titleHtml = "";
    titleHtml = "<div class='card-title border d-flex justify-content-between'>" +
        `<div id='${title}' class="btn"><a data-toggle="collapse" href="#${title}_body" role="button" aria-expanded="true" aria-controls="${title}_body">${title}` +
        `<i class="fas fa-caret-down"></i></a> </div>` +
        `${getEditLinkHtml(includedPageUrl)}` +
        "</div>";
    var contentHtml = `<div id='${title}_body' class="card-body ${collapseStyle}">${addLinks(renderedHtml)}</div>`;
    var elementToInclude = $("<div class='included-post-content card'/>")
    elementToInclude.html(titleHtml + contentHtml);
    includeElement.html(elementToInclude);
    return elementToInclude;
}

function setContentCard(responseHtml, includeElement) {
    let elementToInclude = null;
    let includedPageUrl = getIncludePageUrl(includeElement);
    if (includedPageUrl.endsWith(".txt")) {
        elementToInclude = getTextContentCard(responseHtml, includeElement);
    } else if (includedPageUrl.endsWith(".md")) {
        elementToInclude = getMarkdownContentCard(responseHtml, includeElement);
    }
    return elementToInclude;
}

function setMissingContentCard(error, includeElement) {
    let title = includeElement.attr("title");
    let includedPageUrl = getIncludePageUrl(includeElement);
    let collapseStyle = getCollapseStyle(includeElement);

    console.warn("An error!", error);
    var createLinkHtml = `<a class='btn btn-secondary' href='${getGithubCreationPath(includedPageUrl)}'><i class="fas fa-edit"></i></a>`;
    var titleHtml = "";
    titleHtml = "<div class='card-title border d-flex justify-content-between'>" +
        `<div id='${title}' class="btn"><a data-toggle="collapse" href="#${title}_body" role="button" aria-expanded="true" aria-controls="${title}_body">${title}` +
        `<i class="fas fa-caret-down"></i></a> </div>` +
        `${createLinkHtml}` +
        "</div>";
    var contentHtml = `<div id='${title}_body' class="card-body ${collapseStyle}">न लब्धा वृत्तिः। <a href="https://github.com/sanskrit/ashtadhyayi/issues/new">सत्यां प्रेष्यताम्।</a></div>`;
    var elementToInclude = $("<div class='included-post-content card'/>")
    elementToInclude.html(titleHtml + contentHtml);
    includeElement.html(elementToInclude);
    return elementToInclude;
}

async function fillJsInclude(includeElement) {
    if (includeElement.html().trim() != "") {
        console.warn("Refusing to refill element with non-empty html - ", includeElement);
        return "Already loaded";
    }
    console.info("Inserting include for ", includeElement);

    // console.debug(includedPageUrl);
    let includedPageUrl = getIncludePageUrl(includeElement);
    let ajaxResponsePromise = $.ajax(includedPageUrl);
    return ajaxResponsePromise.then((x) => setContentCard(x, includeElement)).catch((e) => setMissingContentCard(e, includeElement));
}

export default function handleIncludes() {
    if ($('.js_include').length == 0 ) { return; }
    return Promise.all($('.js_include').map(function() {
        var jsIncludeJqueryElement = $(this);
        // The actual filling happens in a separate thread!
        return fillJsInclude(jsIncludeJqueryElement);
    }));
}