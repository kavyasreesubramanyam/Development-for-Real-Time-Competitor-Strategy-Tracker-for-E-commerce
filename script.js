// Hide the table container by default
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tableContainer");
    if (container) {
        container.style.display = "none";
    }
});

async function loadData() {
    const container = document.getElementById("tableContainer");
    const body = document.getElementById("tableBody");

    container.style.display = "block";
    body.innerHTML = `
		<tr>
			<td colspan="11" style="text-align:center;">Loading...</td>
		</tr>
	`;

    const res = await fetch("ai_pricing_different_books.csv");
    const text = await res.text();

    // Use PapaParse to parse CSV
    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
    const data = parsed.data;

    body.innerHTML = "";

    data.forEach((row, index) => {
        // Extract and clean up fields
        const bookTitle = row["Book Title"] || "";
        const upc = row["UPC"] || "";
        const isbn10 = row["ISBN-10"] || "";
        const isbn13 = row["ISBN-13"] || "";
        const ourPrice = row["Our Price (£)"] ? `£${row["Our Price (£)"]}` : "";
        const competitorPrice = row["Competitor Price (£)"] ? `£${row["Competitor Price (£)"]}` : "";
        const discount = row["Discount"] || "";
        let finalPrice = row["Final Price (£)"];
        const status = row["status"] || "";
        const matchId = row["match_identifier"] || "";

        // Format final price
        if (finalPrice && !finalPrice.startsWith("£")) {
            finalPrice = `£${finalPrice}`;
        }

        body.innerHTML += `
			<tr>
				<td>${index + 1}</td>
				<td>${bookTitle}</td>
				<td>${upc}</td>
				<td>${isbn10}</td>
				<td>${isbn13}</td>
				<td>${ourPrice}</td>
				<td>${competitorPrice}</td>
				<td>${discount}</td>
				<td>${finalPrice || ''}</td>
				<td>${status}</td>
				<td>${matchId}</td>
			</tr>
		`;
    });
}
