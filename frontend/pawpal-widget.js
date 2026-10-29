// Create the floating PawPal button

const pawpalButton = document.createElement("button");
pawpalButton.className = "pawpal-launcher";
pawpalButton.type = "button";
pawpalButton.textContent = "🐾 Talk to PawPal";
pawpalButton.setAttribute("aria-expanded", "false");

const pawpalPanel = document.createElement("div");
pawpalPanel.className = "pawpal-panel";
pawpalPanel.hidden = true;

const pawpalHeader = document.createElement("div");
pawpalHeader.className = "pawpal-panel-header";

const pawpalTitle = document.createElement("span");
pawpalTitle.textContent = "🐾 PawPal AI";

// Header contains the title only — no X button
pawpalHeader.append(pawpalTitle);

const pawpalFrame = document.createElement("iframe");
pawpalFrame.src = "assistant.html?widget=1";
pawpalFrame.title = "PawPal AI Assistant";

const pawpalFooter = document.createElement("div");
pawpalFooter.className = "pawpal-panel-footer";

const pawpalClose = document.createElement("button");
pawpalClose.className = "pawpal-close";
pawpalClose.type = "button";
pawpalClose.textContent = "✕ Close PawPal";

pawpalFooter.append(pawpalClose);
pawpalPanel.append(pawpalHeader, pawpalFrame, pawpalFooter);
document.body.append(pawpalPanel, pawpalButton);

function togglePawPal() {
    const opening = pawpalPanel.hidden;
    pawpalPanel.hidden = !opening;
    pawpalButton.setAttribute("aria-expanded", String(opening));
    pawpalButton.hidden = opening;
}

pawpalButton.addEventListener("click", togglePawPal);

pawpalClose.addEventListener("click", () => {
    pawpalPanel.hidden = true;
    pawpalButton.hidden = false;
    pawpalButton.setAttribute("aria-expanded", "false");
});
