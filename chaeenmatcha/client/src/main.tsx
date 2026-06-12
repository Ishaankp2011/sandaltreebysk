import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import logoPath from "@assets/chaeenmatcha_logo.png";

// set favicon dynamically to ensure asset from attached_assets is used
const setFavicon = (href: string) => {
	let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.head.appendChild(link);
	}
	link.href = href;
};

if (typeof document !== 'undefined') {
	setFavicon(logoPath);
}

createRoot(document.getElementById("root")!).render(<App />);
