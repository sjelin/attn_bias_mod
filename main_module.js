import React, { StrictMode, useState } from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

const el = React.createElement;

import bad_faces from './faces/bad.json' with { type: "json" };
import good_faces from './faces/good.json' with { type: "json" };
const seen_good_faces = {};
const seen_bad_faces = {};

function get_new_face(all_faces, seen_faces) {
	while (true) {
		name = all_faces[Math.floor(all_faces.length*Math.random())];
		if (!(name in seen_faces)) {
			seen_faces[name] = true;
			return name;
		}
	}
}

function generateFaces() {
	// this is for me removing incorrect good/bad faces
//	return good_faces.map(
//		name => ({src: `faces/good/${name}`, good: true, on: false})
//	);

	if (Object.keys(seen_good_faces).length * 2 > good_faces.length) {
		seen_good_faces.forEach(name => { delete seen_good_faces[name] });
	}
	if (Object.keys(seen_bad_faces).length * 2 > bad_faces.length) {
		seen_bad_faces.forEach(name => { delete seen_bad_faces[name] });
	}

	const faces = [];
	for (let i = 0; i < 16; i++) {
		if (Math.random() < 0.5) {
			name = get_new_face(good_faces, seen_good_faces);
			faces.push({src: `faces/good/${name}`, good: true, on: false});
		} else {
			name = get_new_face(bad_faces, seen_bad_faces);
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

const INITIAL_FACES = generateFaces();

function App() {
	let [faces, setFaces] = useState(INITIAL_FACES);
	function toggleFace(idx) {
		setFaces(faces.map((f, i) => i === idx ? {...f, on: !f.on} : f));
	};

	let imgs = faces.map((props, i) => el(
		Face, {...props, toggle: toggleFace.bind(null, i)}, null
	));
	let rows = [];
	for (let i = 0; i < Math.floor(imgs.length/4); i++) {
		let tds = imgs.slice(i*4, i*4+4).map(img => el('td', null, img));
		rows.push(el('tr', null, ...tds));
	}
	return el(
		'div',
		null, 
		el('h2', null, 'Tap on happy faces'),
		el('table', null, el('tbody', null, ...rows)),
		el(ConfirmationButton, {faces, setFaces}, null)
	);
}

export default function() {
	const root = createRoot(document.getElementById('root'));
	root.render(el(StrictMode, null, el(App)));
}
