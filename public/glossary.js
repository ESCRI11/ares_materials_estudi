/*
 * Select a word anywhere in a lesson to get a definition.
 *
 * Our own glossary is checked first, then a free dictionary API. That order is
 * deliberate: a general dictionary defines "terminal" as part of an airport,
 * "library" as a building full of books and "breadboard" as a thing you cut
 * bread on — worse than no answer for the vocabulary this site teaches.
 *
 * Plain JS in public/ rather than a component, because it has to run on every
 * page and Starlight has no global slot to mount one into.
 */

// Written for a designer with no programming background. One or two sentences.
// Add the plural or the abbreviation as its own key when people use both.
const GLOSSARY = {
	// Git and GitHub
	repository:
		'A project folder whose complete history is recorded, so you can see every change ever made and go back to any earlier version.',
	repo: 'Short for repository.',
	commit:
		'A saved snapshot of your project at one moment, with a short message saying what changed. The unit of work in git.',
	branch:
		'A parallel line of commits, used to try something out without disturbing the working version of a project.',
	'pull request':
		'A request to merge one branch into another, which others can review and comment on before it happens. How teams hand work over on GitHub.',
	merge: 'Combining the changes from one branch into another.',
	clone: 'Downloading a full copy of a repository, history included, onto your own machine.',
	push: 'Sending your local commits up to the copy of the repository stored on GitHub.',
	git: 'The program that records your project history. It runs on your machine and works without an internet connection.',
	github:
		'A website that hosts git repositories online, adding collaboration tools on top: issues, reviews, pull requests, and free hosting for simple websites.',

	// Terminal and files
	terminal:
		'A window where you type commands to your computer instead of clicking. Also called the command line or the shell.',
	shell: 'The program inside a terminal that reads your commands and runs them. Bash and zsh are shells.',
	'command line': 'Typing instructions to your computer as text, instead of clicking buttons.',
	directory: 'The technical word for a folder.',
	path: 'The address of a file, listing the folders you pass through to reach it, like /Users/ana/sketches/circle.js.',
	'package manager':
		'A tool that installs and updates the code libraries a project depends on, so you do not download them by hand. npm is the one used with JavaScript.',
	dependency: 'A piece of code written by someone else that your project needs in order to run.',

	// Code
	library:
		'A bundle of ready-made code you can use in your own project, so you do not write everything from scratch. p5.js is a library.',
	framework:
		'Like a library, but it sets the overall structure of your project rather than being a tool you call when you need it.',
	ide: 'Integrated Development Environment: an editor for writing code that also runs it, finds mistakes, and manages your files. VS Code is one.',
	variable: 'A named container holding a value that can change while a program runs.',
	function: 'A named block of instructions you can run whenever you need it, as many times as you like.',
	loop: 'An instruction to repeat something, either a set number of times or until a condition stops being true.',
	boolean: 'A value that can only be true or false. The simplest kind of data there is.',
	array: 'An ordered list of values held in a single variable.',
	console:
		'A panel inside a web browser or editor where a program prints messages, including its error messages. The first place to look when something breaks.',
	api: 'Application Programming Interface: an agreed way for one piece of software to ask another for something, such as a website fetching today’s weather.',
	sketch: 'In p5.js, a single program — one drawing that runs. Not a drawing in the pencil sense.',
	canvas: 'The rectangular area of a web page that a program can draw into, pixel by pixel.',

	// Physical computing
	breadboard:
		'A plastic board full of holes for building a circuit by pushing components in, with no soldering, so you can pull it apart and try again.',
	microcontroller:
		'A very small computer on a single chip, designed to read sensors and control motors and lights rather than run an operating system.',
	arduino:
		'A family of microcontroller boards, and the software used to program them, designed to make electronics approachable to non-engineers.',
	sensor: 'A component that measures something physical — light, distance, temperature, movement — and reports it as a number.',
	actuator: 'A component that produces a physical effect: a motor that turns, a light that lights, a speaker that sounds.',
	resistor: 'A component that limits how much current flows, most often used to stop an LED burning itself out.',
	firmware: 'The program stored on a microcontroller, which starts running the moment the board is powered.',
	serial: 'A way for a microcontroller and a computer to send messages to each other, one character at a time, over a USB cable.',

	// Fabrication
	cad: 'Computer-Aided Design: software for drawing an object precisely, to real dimensions, so a machine can make it.',
	slicer:
		'Software that converts a 3D model into the layer-by-layer instructions a 3D printer follows. The step between designing and printing.',
	vector:
		'An image stored as shapes and coordinates rather than pixels, so it can be scaled to any size without blurring. Laser cutters need vectors.',
	raster: 'An image stored as a grid of pixels, like a photograph. Enlarging it makes it blurry.',
	gcode: 'The list of movement instructions a 3D printer or CNC machine actually executes.',

	// Web and data
	markdown:
		'A way of writing formatted text using plain characters — # for a heading, ** for bold — that turns into a web page. This site is written in it.',
	json: 'A plain-text format for structured data, readable by both people and programs. Widely used to move data between tools.',
	csv: 'Comma-Separated Values: a spreadsheet saved as plain text, one row per line. The lowest common denominator for data.',
	localhost: 'Your own computer, when it is acting as the web server. A site at localhost is visible only to you.',
	deploy: 'Publishing your project so it is live on the internet rather than only running on your machine.',
	browser: 'The program you view web pages with: Chrome, Firefox, Safari, Edge.',
};

const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const cache = new Map();
let panel = null;
let generation = 0;

/** Lowercase, and strip anything that is not a letter from both ends. */
function normalise(text) {
	return text.trim().toLowerCase().replace(/^[^a-z]+/, '').replace(/[^a-z]+$/, '');
}

function lookupLocal(key) {
	// A naive singular is worth trying: "commits" and "sensors" are common.
	return GLOSSARY[key] || (key.endsWith('s') ? GLOSSARY[key.slice(0, -1)] : undefined);
}

async function lookupRemote(word) {
	if (cache.has(word)) return cache.get(word);
	let result = null;
	try {
		const response = await fetch(API + encodeURIComponent(word));
		if (response.ok) {
			const meaning = (await response.json())?.[0]?.meanings?.[0];
			if (meaning?.definitions?.[0]?.definition) {
				result = { text: meaning.definitions[0].definition, part: meaning.partOfSpeech };
			}
		}
	} catch {
		// Offline, rate-limited, or the service is down. A missing definition is
		// never worth breaking the page over.
	}
	cache.set(word, result);
	return result;
}

function hide() {
	if (panel) panel.hidden = true;
}

/** Definitions are inserted as text, never as HTML — they come from a third party. */
function render(rect, term, definition, source) {
	if (!panel) {
		panel = document.createElement('div');
		panel.className = 'ind-define';
		panel.setAttribute('role', 'tooltip');
		panel.hidden = true;
		document.body.append(panel);
	}

	const heading = document.createElement('p');
	heading.className = 'ind-define-term';
	heading.textContent = term;

	const body = document.createElement('p');
	body.className = 'ind-define-body';
	body.textContent = definition;

	panel.replaceChildren(heading, body);

	if (source) {
		const note = document.createElement('p');
		note.className = 'ind-define-source';
		note.textContent = source;
		panel.append(note);
	}

	panel.hidden = false;
	// Position in page coordinates so the panel scrolls along with the text.
	const top = rect.bottom + window.scrollY + 8;
	const left = Math.min(
		rect.left + window.scrollX,
		window.scrollX + document.documentElement.clientWidth - panel.offsetWidth - 12,
	);
	panel.style.top = `${top}px`;
	panel.style.left = `${Math.max(12, left)}px`;
}

async function handleSelection() {
	const selection = window.getSelection();
	if (!selection || selection.isCollapsed || selection.rangeCount === 0) return hide();

	const range = selection.getRangeAt(0);
	const container = range.commonAncestorContainer;
	const element = container.nodeType === 1 ? container : container.parentElement;
	if (!element?.closest('.sl-markdown-content')) return hide();

	const words = selection.toString().trim().split(/\s+/);
	const key = normalise(selection.toString());
	if (!key || words.length > 4) return hide();

	const rect = range.getBoundingClientRect();
	const local = lookupLocal(key);
	if (local) return render(rect, key, local, 'Glossary');

	// The dictionary only handles single words, and only ordinary English.
	if (words.length > 1) return hide();

	const token = ++generation;
	render(rect, key, 'Looking up…', '');
	const remote = await lookupRemote(key);
	if (token !== generation) return; // the reader selected something else meanwhile

	if (!remote) return render(rect, key, 'No definition found.', '');
	render(rect, `${key} · ${remote.part}`, remote.text, 'Wiktionary, via dictionaryapi.dev');
}

document.addEventListener('mouseup', (event) => {
	if (panel?.contains(event.target)) return;
	// Let the browser finish updating the selection first.
	setTimeout(handleSelection, 0);
});

document.addEventListener('mousedown', (event) => {
	if (!panel?.contains(event.target)) hide();
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') hide();
});
