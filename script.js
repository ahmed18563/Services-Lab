document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-link-form");
    const linkList = document.getElementById("link-list");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const primaryLink = document.getElementById("primary-link").value;
        const expirationLink = document.getElementById("expiration-link").value;
        const expirationDate = document.getElementById("expiration-date").value;

        // TODO: Implement API call to add the link to Google Sheets
        console.log("Adding link:", { primaryLink, expirationLink, expirationDate });

        // Add the new link to the list for now
        const listItem = document.createElement("li");
        listItem.textContent = `Primary: ${primaryLink}, Expiration: ${expirationLink}, Date: ${expirationDate}`;
        linkList.appendChild(listItem);

        form.reset();
    });

    // TODO: Fetch and display existing links
});
