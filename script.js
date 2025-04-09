const API_URL = "https://script.google.com/macros/s/AKfycbwQJKthx3vw32XFTsFPuJEVBznq6RHtCZmE2ba7fe6B45Vs5iLzkS41QILZYQLhvA_wiw/exec";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-link-form");
    const linkList = document.getElementById("link-list");

    // Fetch and display existing links
    fetchLinks();

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const primaryLink = document.getElementById("primary-link").value;
        const expirationLink = document.getElementById("expiration-link").value;
        const expirationDate = document.getElementById("expiration-date").value;

        const newLink = {
            primaryLink: primaryLink,
            expirationLink: expirationLink,
            expirationDate: expirationDate
        };

        try {
            // Add link via API
            const response = await fetch(API_URL + "?action=addLink", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newLink)
            });

            const result = await response.json();
            if (result.success) {
                alert("Link added successfully!");
                fetchLinks(); // Refresh link list
            } else {
                throw new Error("Failed to add link");
            }
        } catch (error) {
            console.error(error);
            alert("Error adding link. Please try again.");
        }

        form.reset();
    });

    async function fetchLinks() {
        try {
            const response = await fetch(API_URL + "?action=getLinks");
            const data = await response.json();

            // Clear existing links
            linkList.innerHTML = "";

            // Populate links
            data.links.forEach((link) => {
                const listItem = document.createElement("li");
                listItem.textContent = `Primary: ${link.primaryLink}, Expiration: ${link.expirationLink}, Date: ${link.expirationDate}`;
                linkList.appendChild(listItem);
            });
        } catch (error) {
            console.error(error);
            alert("Error fetching links. Please try again.");
        }
    }
});
