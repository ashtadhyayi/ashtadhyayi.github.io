function redirectToPage(url, manualRedirectionDiv) {
    if (manualRedirectionDiv) {
        manualRedirectionDiv.innerHTML = `Redirecting <a href='${url}'>here</a>`;
    }
    if (url) {
        window.location.replace(url);
    }
}
