import * as query from "./query";

export function setInlineComments(htmlIn) {
    let commentStyle = query.getQueryVariable("comment_style") || "on";
    let commentStyleDropdown = document.getElementsByName("commentStyleDropdown")[0];
    commentStyleDropdown.value = commentStyle;
    if (commentStyle === "hidden") {
        return htmlIn.replace(/\+\+\+([\s\S]+?)\+\+\+/g, "<span class=\"inline_comment\" hidden>$1</span>");
    } else {
        return htmlIn.replace(/\+\+\+([\s\S]+?)\+\+\+/g, "<span class=\"inline_comment\">$1</span>");
    }
}

export function updateCommentStyleFromDropdown() {
    let commentStyleDropdown = document.getElementsByName("commentStyleDropdown")[0];
    var commentStyle = commentStyleDropdown.options[commentStyleDropdown.selectedIndex].value;
    query.insertQueryParam("comment_style", commentStyle);
}

export function setInlineCommentsInPostContent() {
    if ($("#post_content").length > 0) {
        // console.debug( $("#post_content").html);
        // console.log(setInlineComments($("#post_content").html()));
        $("#post_content").html(setInlineComments($("#post_content").html()));
    }
}
