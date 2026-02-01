import React, { StrictMode, useState } from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

const el = React.createElement;

function generateFaces() {
	const faces = [];
	for (let i = 0; i < 16; i++) {
		if (Math.random() < 0.5) {
			faces.push({
				src: 'happy_white_woman.png', good: true, on: false
			});
		} else {
			faces.push({
				src: 'angry_white_woman.png', good: false, on: false
			});
		}
	}
	return faces;
}

function Face({src, good, on, toggle}) {
	const className =
		'face ' + (good ? 'good' : 'bad') + (on ? ' on' : '');
	return el(
		'a',
		{className, onClick: toggle},
		el('img', {src}, null),
		el('div', {className: 'overlay'}, null)
	);
}

function App() {
	let [faces, setFaces] = useState(generateFaces());
	function toggleFace(idx) {
		setFaces(faces.map((f, i) => i === idx ? {...f, on: !f.on} : f));
	};

	let imgs = faces.map((props, i) => el(
		Face, {...props, toggle: toggleFace.bind(null, i)}, null
	));
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
