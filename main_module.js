import React, { StrictMode, useState } from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";
import bad_faces from './faces/bad.json' with { type: "json" };
import good_faces from './faces/good.json' with { type: "json" };

const el = React.createElement;

function generateFaces() {
	const faces = [];
	for (let i = 0; i < 16; i++) {
		if (Math.random() < 0.5) {
			name = good_faces[Math.floor(good_faces.length*Math.random())];
			faces.push({src: `faces/good/${name}`, good: true, on: false});
		} else {
			name = bad_faces[Math.floor(bad_faces.length*Math.random())];
			faces.push({src: `faces/bad/${name}`, good: false, on: false});
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

function ConfirmationButton({faces, setFaces}) {
	const correct =
		faces.map(f => f.good === f.on).reduce((x, y) => x && y);
	const onClick = function() {
		if (correct) {
			setFaces(generateFaces());
		} else {
			alert('not quite...');
		}
	};
	const className =
		'confirmation ' + (correct ? 'enabled' : 'disabled');
	return el('button', {className, onClick}, 'Confirm');
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
	return el(
		'div',
		null, 
		el('h2', null, 'Tap on non-threatening faces'),
		el('table', null, el('tbody', null, ...rows)),
		el(ConfirmationButton, {faces, setFaces}, null)
	);
}

export default function() {
	const root = createRoot(document.getElementById('root'));
	root.render(el(StrictMode, null, el(App)));
}
