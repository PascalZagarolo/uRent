export const switchSectionOverview = () => {
    console.log("Switching to section overview");

    // Get the current URL's pathname (without the query parameters)
    const newUrl = window.location.pathname;

    // Use history.pushState to update the URL without the query parameters
    window.history.pushState(null, '', newUrl);
}