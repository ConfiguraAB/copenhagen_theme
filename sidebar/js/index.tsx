import * as React from "react";
import * as ReactDOM from "react-dom";
import Sidebar from "./components/Sidebar";
import { TranslationsDropdown } from "./components/TranslationsDropdown";

function domReady(callback: () => void) {
	document.readyState === "interactive" || document.readyState === "complete"
		? callback()
		: document.addEventListener("DOMContentLoaded", callback);
}

domReady(() => {
	ReactDOM.render(
		<Sidebar />,
		document.body.appendChild(document.createElement("DIV"))
	);
	ReactDOM.render(
		<TranslationsDropdown />,
		document.getElementById("language-dd")
	);
});
