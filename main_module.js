import React, { StrictMode, useState } from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

const el = React.createElement;

function App() {
	let imgs = [];
	for (let i = 0; i < 16; i++) {
		if (Math.random() < 0.5) {
			imgs.push(el('img', {src: 'happy_white_woman.png'}, null));
		} else {
			imgs.push(el('img', {src: 'angry_white_woman.png'}, null));
		}
	}
	let rows = [];
	for (let i = 0; i < 4; i++) {
		let tds = imgs.slice(i*4, i*4+4).map(img => el('td', null, img));
		rows.push(el('tr', null, ...tds));
	}
	return el('table', null, el('tbody', null, ...rows));
}

export default function() {
	const root = createRoot(document.getElementById('root'));
	root.render(el(StrictMode, null, el(App)));
}
