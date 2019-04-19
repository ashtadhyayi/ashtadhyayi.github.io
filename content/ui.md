---
---
<div name="manualRedirectionDiv"/>

<script>
function redirectToPage(url, manualRedirectionDiv) {
    if (manualRedirectionDiv) {
        manualRedirectionDiv.innerHTML = `Redirecting <a href='${url}'>here</a>`;
    }
    if (randomUrl) {
        window.location.replace(url);
    }
}
redirectToRandomPage("../sutra-details/?sutra=" + querySutraId, document.getElementsByName("manualRedirectionDiv"));

</script>