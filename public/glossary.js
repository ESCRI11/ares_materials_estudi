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
		'A bundle of ready-made code you can use in your own project, so you do not write everything from scratch, such as a charting library that draws graphs for you.',
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
	sketch: "Three meanings, all in this course. In creative coding and on Arduino, a single small program. In CAD, a 2D drawing on a chosen flat plane, which is the starting point of nearly every solid. In everyday use, a rough drawing.",
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
	browser: "Two meanings. On the web, the program you view pages with. In Fusion, the small tree at the top left listing a model's origin planes, sketches, bodies and components — the layers panel of CAD, with an eye icon beside each entry.",

	// added from 1
	file: "A lump of data with a name attached — a photograph, a paragraph, a program. Every file lives inside a folder somewhere on your machine; nothing floats loose.",
	folder: "A container for files and other folders. Programmers usually call it a directory, and the two words mean exactly the same thing.",
	"file extension": "The bit after the last dot in a file name — .pdf, .png, .js. It is a label that tells programs what kind of data to expect, not a conversion: renaming a file does not change what is inside it.",
	extension: "Two meanings. In a file name it is the bit after the last dot (.png, .js), a label saying what kind of data the file holds. In VS Code it is an add-on that teaches the editor something new, such as a language or a preview pane.",
	"absolute path": "A path that starts at the root of the disk or at your home folder, so it means the same thing typed from anywhere on the machine. The full postal address of a file.",
	"relative path": "A path that starts from the folder you are currently in, such as images/logo.png. It is 'second door on the left' — correct only if you are standing in the right corridor, but it survives when the whole project is moved or uploaded.",
	"home folder": "Your personal folder, containing your Desktop, Documents and Downloads. It is /Users/yourname on macOS and C:\\Users\\yourname on Windows, and both systems accept the shorthand ~ for it.",
	"working directory": "The one folder a terminal or a program considers 'here'. Commands act on it unless you tell them otherwise, and pwd is how you ask which one it currently is.",
	"parent folder": "The folder one level up from where you are. It is written as two dots, so cd .. moves you into it.",
	"hidden file": "A file whose name starts with a dot, like .gitignore. It is not secret — the convention exists to keep configuration files out of your way — and ls -a on macOS or ls -Force on Windows reveals them.",
	"plain text": "Characters and nothing else: no fonts, no bold, no page size. Code must be plain text, which is why a word processor breaks it by replacing straight quotes with curly ones.",
	root: "The very top of a disk's folder tree, above which there is nothing. It is written / on macOS and Linux, and each drive has its own on Windows, such as C:\\.",
	zsh: "The shell that comes with macOS — the program inside the Terminal window that reads and runs your commands.",
	powershell: "The shell that comes with Windows: the program inside the terminal window that reads and runs your commands. Its prompt starts with PS.",
	cli: "Command-line interface — a tool you drive by typing commands rather than by clicking. Many developer tools have a CLI and no window at all.",
	prompt: "Two meanings. In a terminal it is the line a shell writes before waiting for you, usually ending in %, $ or >, and you never type it. With a language model it is everything you send: the brief, the examples, the format you want back.",
	command: "The verb of a terminal line: the thing to do, such as ls or cd. Anything after it is a flag that changes its behaviour or an argument saying what to act on.",
	flag: "A switch in a terminal command that changes how it behaves, written with a dash — the -l in ls -l or the -e in winget install -e.",
	argument: "What a command should act on, written after the command name. In cd Documents, the word Documents is the argument.",
	sudo: "A word placed before a command to run it with administrator powers. It asks for your password, and nothing appears on screen as you type it — that is deliberate, not a frozen terminal.",
	"tab completion": "Typing the first few letters of a name and pressing Tab to have the shell finish it. It also proves the name exists and is spelled that way, which makes it the single most useful habit in a terminal.",
	pwd: "A command that prints the working directory — the absolute path of the folder your terminal is currently standing in. The first thing to type when a tool cannot find a file.",
	ls: "A command that lists the files and folders in the working directory. Add -a on macOS or -Force on Windows to include hidden files.",
	cd: "A command that changes the working directory, so cd Documents moves you into a folder, cd .. moves up one level, and cd ~ takes you home from anywhere.",
	mkdir: "A command that makes a new folder in the working directory: mkdir ind-prep creates a folder called ind-prep. Short for 'make directory'.",
	package: "One piece of software plus the information about it — its name, its version, and the other packages it needs in order to run.",
	dependencies: "The other packages a piece of software needs in order to work. A package manager reads that list and installs them for you.",
	homebrew: "The package manager for macOS. It is not preinstalled — you install it once with a command from brew.sh, and afterwards install tools with brew install.",
	brew: "The command Homebrew gives you on macOS: brew install for tools, brew install --cask for applications with a window, brew upgrade to update everything.",
	cask: "Homebrew's word for an application with a window, as opposed to a command-line tool. You install one with brew install --cask.",
	winget: "The package manager built into Windows. Check it with winget --version, and install things with winget install --id SomeId -e, where -e means match that id exactly.",
	"path variable": "PATH is the list of folders your shell searches when you type a command name. If a program is not in one of them the shell says 'command not found' even though it is installed — which is why an installer often ends by asking you to add itself to PATH.",
	"code editor": "An application for writing and editing plain text, such as VS Code. Unlike a word processor it never changes what you typed, which matters because curly quotes stop code from running.",
	"vs code": "Visual Studio Code, the free code editor named by the Creative Coding Foundations course. It works the same on macOS and Windows, and has a terminal built into the window.",
	"visual studio code": "The full name of VS Code, the free code editor used in the coding courses. Always open a folder in it rather than a single file.",
	"integrated terminal": "The terminal built into VS Code, opened with View then Terminal. It starts already inside the folder you have open, so commands run in the right place without any navigating.",
	"command palette": "The searchable list of every VS Code command, opened with Cmd+Shift+P on macOS or Ctrl+Shift+P on Windows. Documentation usually tells you to do things through it rather than through menus.",
	workspace: "Two meanings. In VS Code, the folder you have open. In Fusion, one of the modes in the switcher at the top left — Design, Render, Animation, Drawing, Manufacture — each with its own toolbar.",
	"file tree": "The list of a project's folders and files shown down the side of an editor. In VS Code it is the Explorer panel, and it only appears when you have opened a folder.",

	// added from 2
	"version control": "Software that records the history of a project so you can see every change, know who made it and why, and return the folder to any earlier state. Git is the one you will use.",
	"staging area": "The tray of changes you are proposing to save together. `git add` puts a change in it; `git commit` writes everything in it into the history as one snapshot.",
	stage: "To put a change into the staging area with `git add`, marking it as part of the commit you are about to make.",
	untracked: "A file sitting in your project folder that git has not been told to record. Git never saves anything you did not explicitly add.",
	"working tree": "The files as they currently sit in your project folder, as opposed to the versions stored in the history. A clean working tree means nothing has changed since the last commit.",
	hash: "The long identifier git calculates for a commit, like a3f9c1e. It refers to that exact snapshot forever; in practice you only ever type the first seven characters.",
	remote: "A named copy of your repository stored somewhere else, usually on GitHub. Adding one teaches your local repository an address, nothing more.",
	origin: "The conventional nickname for the main copy of a repository online. Nothing in git requires that word; every project uses it anyway.",
	pull: "Bringing commits from the copy on GitHub down into the one on your machine. The opposite of push.",
	fetch: "Downloading new commits from a remote without changing your own files yet. Pull is fetch plus merge, done in one step.",
	"merge conflict": "What happens when two branches changed the same lines of the same file, so git stops and asks a human to choose. Routine, recoverable, and no work is lost while you sort it out.",
	checkout: "The older command for switching branches, now split into `git switch` and `git restore`. It still works, and older tutorials are full of it.",
	main: "The conventional name for the branch that always works — the trusted version of a project, which experiments are merged back into.",
	readme: "The file named README.md at the top of a repository. GitHub renders it as the front page, so it is the first thing any visitor reads.",
	"personal access token": "A long generated string you paste instead of a GitHub password. GitHub shows it exactly once, and it should be treated like a password.",
	"ssh key": "A pair of files on your machine that proves your identity to a service like GitHub without typing anything. More setup once, less friction forever.",
	"github pages": "A free GitHub service that serves the files in a repository as a live website. Push a change and the published site updates itself.",
	static: "Describes files sent to a visitor exactly as they sit on the server, with no code run to produce them. A static site can hold pages, images and browser JavaScript, but no database or login.",
	"static site": "A website made only of files that are served as they are — HTML, CSS, JavaScript, images. Cheap to host, and what GitHub Pages publishes.",
	"alt text": "The written description attached to an image, announced by a screen reader and shown when the image fails to load. In Markdown it is the text inside the square brackets.",

	// added from 3
	render: "To turn instructions into something visible. A browser renders an HTML file into the page you see, in the same sense that a 3D program renders a scene.",
	rendering: "The act of turning code into pixels on screen. What a browser does with every HTML and CSS file it receives.",
	html: "HyperText Markup Language, the language that describes the structure and content of a web page: this is a heading, this is a paragraph, this is an image. It says nothing about appearance.",
	css: "Cascading Style Sheets, the language that controls how a web page looks — typeface, colour, spacing, layout, and how all of it changes with screen width.",
	stylesheet: "A file or block of CSS rules. One stylesheet can control the appearance of every page that links to it.",
	javascript: "The programming language of the browser. It handles behaviour: what happens when someone clicks, types, scrolls or waits.",
	markup: "Text with labels around it saying what each part is. HTML is markup: the words are the content, the tags are the labels.",
	server: "A computer that hands out files when someone on the network asks for them. Publishing a website means putting your files on one; building a website locally needs no server at all.",
	tag: "A word in angle brackets that marks the start or end of an HTML element, like the opening and closing tags of a paragraph. The closing one carries a slash.",
	element: "A complete piece of an HTML document: an opening tag, its content, and its closing tag. The tag is what you type; the element is what ends up on the page.",
	attribute: "Extra information written inside an opening HTML tag, as a name, an equals sign and a value in quotes — the address of a link, the file of an image.",
	nesting: "Putting one element inside another. Nesting is what turns a flat list of tags into a structure, and an element opened inside another must also be closed inside it.",
	parent: "The element that directly contains another one. A paragraph holding a link is that link's parent.",
	child: "An element directly inside another. Flexbox and many CSS rules work on the relationship between a parent and its children.",
	container: "An element whose job is to hold others so they can be grouped, spaced or laid out together. A div is the plain, meaningless version.",
	doctype: "The first line of every HTML file, written as an exclamation mark followed by doctype html. It tells the browser to use modern rules. Type it and move on.",
	head: "The part of an HTML document that holds information about the page rather than content on it: the page title, the character encoding, links to stylesheets.",
	body: "The part of an HTML document that holds everything the reader actually sees on the page.",
	title: "The HTML element in the head that names the browser tab and the bookmark. It is not a heading and does not appear on the page.",
	alt: "The attribute on an image holding a text description of it, read aloud by screen readers and shown when the image fails to load. Write it every time.",
	div: "A generic block container in HTML with no meaning of its own. You reach for it when you need to group things for layout and no more descriptive element fits.",
	span: "A generic container for a run of text inside a line, with no meaning of its own. The inline counterpart of a div.",
	semantic: "Describing HTML elements that state what a region is — header, nav, main, footer, article. They behave like a div but let screen readers and search engines understand the page.",
	comment: "A note in code written for humans and ignored by the machine. HTML, CSS and JavaScript each have their own way of marking one.",
	rule: "One instruction in CSS: a selector saying what to style, then a block of declarations saying how.",
	selector: "The part of a CSS rule that chooses which elements it applies to — a tag name, a class, an id, or a combination of them.",
	declaration: "One line of CSS inside a rule: a property, a colon, a value and a semicolon. The semicolon is not optional.",
	property: "The thing a CSS declaration changes — color, font-size, padding. The value that follows says what to change it to.",
	class: "A label you invent and attach to any number of HTML elements so CSS can style them together. Written class=\"name\" in the HTML and .name in the CSS; the closest thing the web has to a paragraph style.",
	id: "A unique label on a single HTML element, written id=\"name\" and selected with #name in CSS. Unlike a class, it may appear only once per page.",
	"inline style": "CSS written directly on one element as a style attribute. Quick for a test, awkward for real work, and it overrides almost everything else.",
	cascade: "The set of rules a browser uses to settle conflicting CSS: specificity first, then order in the file. The C in CSS.",
	specificity: "How precisely a CSS selector names its target, and therefore which rule wins a conflict. An inline style beats an id, an id beats a class, a class beats an element name.",
	inheritance: "The way some CSS properties pass from a parent element down to its children on their own. Mostly typographic ones — set the font on the body and the whole page follows.",
	hex: "A colour written as a hash and six characters, like #1b1b1b — the same notation as in any design tool. Three characters is a shorthand for the six.",
	"box model": "The description of every element on a page as four nested layers: content, padding, border and margin. Understanding it explains most layout surprises.",
	padding: "Space between an element's content and its border, inside the box. It takes the element's background colour — the web's version of a text inset.",
	margin: "Space outside an element's border, pushing neighbouring elements away. Always transparent, unlike padding.",
	border: "A line drawn around an element, between its padding and its margin. Written as thickness, style and colour in one declaration.",
	"box-sizing": "The CSS property that decides whether width means the content alone (the default) or the whole visible box. Setting it to border-box makes width mean what you expect.",
	"border-box": "The value of box-sizing that makes an element's stated width include its padding and border, so 300px on screen really is 300px.",
	block: "An element that starts on a new line and takes the full width available — a paragraph, a heading, a div. Width, height and vertical margins all apply to it.",
	inline: "An element that flows along inside a line of text like a word — a span, a link, emphasis. Width, height and vertical margins do nothing to it.",
	"inline-block": "A display value that keeps an element in the flow of a line while letting it accept width, height and vertical spacing like a block.",
	display: "The CSS property that decides how an element behaves in layout: block, inline, inline-block, flex or grid.",
	"margin collapsing": "The rule that vertical margins between stacked elements merge instead of adding up: a 30px margin meeting a 20px one gives a 30px gap.",
	flexbox: "The CSS layout system for arranging elements along one direction, with controls for distribution and alignment. Switched on with display: flex on the parent.",
	"flex container": "The element you set display: flex on. Its direct children become flex items and line up according to the container's rules.",
	"flex item": "A direct child of a flex container. It is arranged by the container's properties, and can carry a couple of its own like flex-grow.",
	"main axis": "The direction a flex container lays its items along — horizontal in a row, vertical in a column. justify-content works along this axis.",
	"cross axis": "The direction perpendicular to a flex container's main axis. align-items works across this one, so it swaps meaning when the direction changes.",
	"justify-content": "The flexbox property that distributes items along the main axis: packed to one end, centred, or spread with space between them.",
	"align-items": "The flexbox property that aligns items across the cross axis. In a row, this is the one that centres things vertically.",
	"flex-grow": "A property on a flex item telling it to absorb the leftover space in the container. Set it to 1 on the item that should stretch.",
	"flex-wrap": "The flexbox property that lets items drop onto a new line instead of squeezing when they run out of room. Half of responsive layout, with no media query.",
	grid: "The CSS layout system for two dimensions at once — rows and columns aligned to each other, like a page grid. Flexbox handles one direction; grid handles both.",
	"responsive design": "Building one page that works at any window width, by describing relationships and limits rather than fixed positions and sizes.",
	viewport: "The visible area of a web page inside the browser window. Its width is what media queries measure and what relative viewport units are based on.",
	"viewport meta tag": "One line in the head of an HTML file telling mobile browsers to use the real device width instead of pretending to be a desktop. Without it, no layout behaves on a phone.",
	"media query": "A block of CSS that only applies when a condition about the screen is true, usually a minimum width. How a layout changes shape at different sizes.",
	breakpoint: "The width at which a layout changes arrangement. Choose it where your own design stops looking right, not from a list of device sizes.",
	"mobile-first": "Writing the narrow, stacked layout as your base CSS and adding wider arrangements inside min-width media queries. The fallback is then always sound.",
	rem: "A CSS unit equal to the browser's base font size, normally 16 pixels. Building a spacing and type scale in rem means the whole page respects a reader's own text-size setting.",
	em: "A CSS unit equal to the current element's font size, useful for spacing that should scale with its own text.",
	ch: "A CSS unit equal to the width of one character in the current font. Setting a text column to about 65ch caps the line length the way you would in print.",
	"max-width": "A CSS property setting a ceiling rather than a demand: the element takes that width where there is room and less where there is not. Usually what you meant when you typed width.",
	"dev tools": "The inspection panel built into every browser, opened with a right-click and Inspect. It shows a page's HTML and CSS, lets you edit both live, and reports errors.",
	inspector: "The dev tools panel showing the page's HTML as a foldable tree, with the styles that apply to whatever you select. Called Elements in some browsers.",
	computed: "The dev tools view listing the final value of every CSS property on an element, after all rules, inheritance and defaults have been resolved.",

	// added from 4a
	"console.log": "The instruction that makes a program print a value where you can see it. Named after a ship's log, and the first tool you reach for when something behaves unexpectedly.",
	"developer tools": "The panel of instruments built into every browser for looking inside a web page: the console, the page structure, the network, the styles. Opened with F12 or by right-clicking and choosing Inspect.",
	devtools: "Short for developer tools — the browser's built-in panel for inspecting a page and running code against it.",
	expression: "Any piece of code that produces a value. 2 + 2 is an expression; so is a call to a function that returns something.",
	value: "A single piece of data: a number, a piece of text, true or false. What an expression produces and what a variable holds.",
	string: "Text in code, written between quote marks. The quotes tell JavaScript where the text starts and stops and are not part of it.",
	type: "What kind of thing a value is — a number, a string, a boolean. Most early bugs are a value having a different type from the one you assumed.",
	syntaxerror: "The error you get when code is not valid JavaScript at all — usually a missing bracket, comma or quote. The program never starts.",
	referenceerror: "The error you get when you use a name the program has never heard of. Nearly always a typo or a variable that was never declared.",
	declare: "To create a name for the first time, with let or const. Everything after that is using it, not declaring it.",
	assign: "To put a value into a name, with a single = sign. It always travels right to left: the value on the right goes into the name on the left.",
	const: "The word for declaring a variable whose name will keep the same value. The one to reach for by default.",
	let: "The word for declaring a variable whose value you intend to change later — a counter, a score, a position.",
	var: "The old word for declaring a variable, replaced by let and const in 2015. It still works, but seeing it means the code or tutorial is dated.",
	camelcase: "The convention of running several words together with a capital on each after the first — backgroundColour, surveyResponses. How names are written in JavaScript.",
	"template literal": "A string written between backticks instead of quotes, in which ${ } drops the value of an expression straight into the text.",
	conditional: "Code that runs only when something is true. Written with if, else if and else.",
	truthy: "A value that an if treats as true even though it is not the boolean true. Almost every value is truthy.",
	falsy: "One of the handful of values an if treats as false: false, 0, an empty string, null, undefined and NaN.",
	null: "A value meaning deliberately empty — there is nothing here, and that is on purpose.",
	undefined: "JavaScript's way of saying there is no value here: a variable never given one, a property that does not exist, or the result of a function that returns nothing.",
	nan: "Not a Number: the value you get from arithmetic that could not produce a number, such as multiplying a word by 2. Often the first sign that a value is a string.",
	index: "The position of an item in a list, counting from zero. The first item is at index 0, so a list of three ends at index 2.",
	"off-by-one": "The error of doing something one time too many or too few — the classic beginner bug, and the reason lists count from zero and loops stop below the count.",
	"infinite loop": "A loop whose condition never becomes false, so it runs for ever and freezes the page. The fix is closing the tab; the cure is making sure the body moves the condition towards ending.",
	parameter: "Three meanings. In code, the name a function gives to a value it will be handed. In CAD, one of the editable numbers a model is built from, which can be named — material_thickness, say — and reused in every dimension that depends on it. In a machine learning model, one of the billions of internal numbers adjusted during training; a model’s size is quoted as a count of them, such as 7B for seven billion.",
	call: "To run a function, by writing its name followed by brackets. Every call can pass different arguments and get a different answer back.",
	return: "The instruction that ends a function and hands a value back to whoever called it. A function with no return hands back undefined.",
	scope: "Where a name is visible. A variable declared inside a function exists only inside it, which is why two functions can both use a variable called i without colliding.",
	"arrow function": "A shorter way of writing a function, with no function keyword: (n) => n * 2. It is a value, so it is usually stored in a variable. You will see it everywhere in modern code.",
	hoisted: "Read ahead of time. Function declarations are hoisted, so a function can be called from a line above the one that declares it.",
	object: "A collection of labelled values held in one variable — a name, an age and an answer together. Reached by name with a dot, as in response.name.",

	// added from 4b
	dom: "Document Object Model: the browser's live model of a page, one object per element, which your JavaScript can read and change. Changing it changes what is on screen immediately.",
	queryselector: "The command that finds the first element matching a CSS selector, or gives back null if there is none.",
	callback: "A function you hand to something else so it can run it later, rather than calling it yourself. The function you pass to addEventListener is one.",
	event: "The browser's announcement that something happened: a click, a key pressed, a value typed, the pointer moved.",
	"event listener": "A function registered to run whenever a particular event happens on a particular element. Set up with addEventListener.",
	listener: "Short for event listener: a function waiting for something to happen so it can run.",
	addeventlistener: "The command that attaches a function to an element so it runs whenever a named event happens there.",
	context: "Two meanings. On a canvas it is the object holding every drawing command, the brush to the canvas's paper. With a language model it is everything you send in one request — instructions, conversation, pasted material — all of which the model must be given every time.",
	node: "One piece of a connected structure: a single element in the page tree, or a single block — a tone, a volume control — in a chain of audio processing.",
	frame: "One complete drawing of an animation. Played fast enough in sequence, frames read as movement.",
	"frame rate": "How many frames a program manages per second, written fps. Screens usually refresh sixty times a second, some newer ones twice that.",
	fps: "Frames per second: how many complete redraws an animation manages in a second.",
	requestanimationframe: "The command that asks the browser to run your drawing function immediately before the next screen refresh. Calling it again at the end of that function is what makes an animation loop.",
	easing: "Moving a fraction of the remaining distance each frame instead of a fixed amount, so motion starts quickly and settles gently. The code version of an ease-out curve.",
	"web audio api": "The browser's built-in sound engine. You build a chain of small parts — a tone generator, a volume control — and connect it to the speakers.",
	audiocontext: "The workspace the Web Audio API creates everything inside. Browsers keep it silent until the visitor has interacted with the page.",
	oscillator: "An audio part that produces one steady tone at a given frequency. Single-use: once stopped, you create a new one.",
	gain: "Volume, in audio terms. A gain node is a knob between 0 and 1 that everything passing through it is scaled by.",
	analyser: "An audio part that makes no sound of its own but lets your code read numbers describing whatever is passing through it, such as how loud the microphone currently is.",
	stream: "Live audio or video arriving continuously from a device, rather than a file with a beginning and an end.",
	getusermedia: "The command that asks for the microphone or camera. It shows the browser's own permission prompt and fails if the visitor says no.",
	"secure context": "A page served over https, or from localhost. Browsers only grant the microphone, camera and location to pages in one — a file opened straight from your folder may not qualify.",
	promise: "A receipt for a value that has not arrived yet, handed back by anything that has to wait — a network request, a permission prompt.",
	await: "Waits for a promised value and then continues with the real thing. It only works inside a function marked async.",
	async: "A label on a function saying it contains waiting. Required before you can use await inside it.",
	endpoint: "One specific address in an API, for one specific thing you can ask it: today's weather, one museum object, a list of results.",
	"api key": "A long secret string identifying your account to a service. It is a credential for your code, not a login for you: anyone holding it can make requests as you and spend your money. Never commit one to a repository or put one in browser JavaScript.",
	cors: "The rule deciding whether a server lets a web page read its data. If it says no, your request fails in the console and there is nothing your page can do about it.",
	"status code": "The number a server sends with every answer: 200 means fine, 404 means no such thing, 500 means something broke at their end.",
	parse: "To read text and turn it into structured values a program can use. JSON.parse turns JSON text into a real object.",
	"stack trace": "The list of function calls printed under an error message, most recent first, showing the route the program took to reach the failure.",
	typeerror: "An error saying a value was not the kind of thing the operation needed — usually reading a property from null, or calling something that is not a function.",
	debugging: "Finding out why a program does not do what you meant. Mostly reading error messages and printing values to check your assumptions, not guessing.",

	// added from 5
	voltage: "Electrical pressure: the difference in energy between two points in a circuit. Like water pressure in a pipe, it is always a difference between two places, never a property of one on its own. Measured in volts.",
	volt: "The unit of voltage, written V. A board's 5V pin sits five volts above ground.",
	current: "How much electricity is actually flowing past a point each second, like the flow rate in a pipe. Measured in amperes, usually in thousandths of one. Current is what damages components, not voltage.",
	ampere: "The unit of current, written A. In this kind of electronics you nearly always work in thousandths of one, called milliamps.",
	milliamp: "A thousandth of an ampere, written mA. The natural unit for small electronics: an LED wants somewhere between 5 and 20 mA.",
	resistance: "How much a component holds back the flow of current, like the narrowness of a pipe. Measured in ohms.",
	ohm: "The unit of resistance, written with the Greek letter omega. A 220 ohm resistor is the usual companion for an LED.",
	"ohm's law": "The one equation you need: voltage equals current times resistance, V = I x R. Rearranged as I = V / R, it tells you how much current a given voltage will push through a given resistor.",
	ground: "The zero point of a circuit and the path everything returns through. Labelled GND on a board. Every part of a circuit must share the same ground or nothing works.",
	gnd: "The label printed on a board for ground: the zero-volt reference and the return path of every circuit.",
	circuit: "A complete loop that current can travel around, out of a supply, through your components, and back to ground. Break the loop anywhere and nothing happens anywhere.",
	"closed circuit": "A complete loop, so current flows. What you want most of the time.",
	"open circuit": "A loop with a gap in it, so no current flows. A switch is a gap you control on purpose; a wire that fell out is one you did not.",
	"short circuit": "An unintended path of almost no resistance from the supply straight back to ground, bypassing the component that was meant to be there. Very large current, hot wires, dead parts.",
	series: "Components arranged one after another on a single path. The same current flows through all of them and the supply voltage divides between them.",
	parallel: "Components arranged on separate branches between the same two points. They all see the same voltage and the current divides between them.",
	led: "Light-emitting diode: a component that turns current into light. It only works one way round, and it needs a resistor in series with it because it does not limit its own current.",
	anode: "The leg of an LED or diode that goes towards the positive side of a circuit. On an LED it is usually the longer leg.",
	cathode: "The leg of an LED or diode that goes towards ground. On an LED it is usually the shorter leg, and often marked by a flat edge on the plastic.",
	"forward voltage": "The roughly fixed voltage an LED drops across itself when it is lit, around 2 V for a red one. Whatever the supply has left over is what the resistor has to deal with.",
	datasheet: "The manufacturer's document listing exactly what a component needs and can survive: voltages, currents, dimensions. The place to look instead of guessing.",
	schematic: "A circuit drawing that shows only what is connected to what, using standard symbols, ignoring where the parts physically sit. Lines that cross without a dot are not connected.",
	pinout: "A labelled diagram of a board showing every pin and what it can do. Pin numbers are specific to a board, so this is the document you check rather than reusing numbers from an example.",
	pin: "One electrical connection into a microcontroller chip, brought out to a labelled hole or leg on the edge of the board. Pins are how the chip touches everything else.",
	gpio: "General-purpose input/output: a pin your program controls, which can either read a voltage or drive one. Most of the pins on a board are these.",
	digital: "Having two states and nothing in between: on or off, high or low, 1 or 0. A button and a plain LED are digital.",
	analog: "Having a continuous range of values rather than two states. A dimmer rather than a light switch. Most sensors that measure a quantity produce an analog voltage.",
	adc: "Analog-to-digital converter: hardware inside the chip that measures the voltage on a pin and reports it as a number. Only certain pins are wired to it.",
	"analog-to-digital converter": "The hardware that turns a continuous voltage into a number your program can use. In MicroPython you read it with read_u16(), which gives 0 to 65535 on every board.",
	resolution: "How many distinct steps a converter can report. A 12-bit converter has 4096 of them, so it cannot tell apart two voltages closer together than one step.",
	input: "A pin configured to listen: it measures whether the voltage applied from outside is high or low, and supplies nothing itself.",
	output: "A pin configured to drive: your program sets its voltage and it supplies current to whatever is attached, within a small limit.",
	bootloader: "A small permanent program on a board that lets you load your own code over an ordinary USB cable, instead of needing special hardware.",
	"voltage regulator": "The part of a board that turns whatever voltage arrives into the steady one the chip needs.",
	header: "A row of labelled holes or pins along the edge of a board, exposing the chip's connections in a usable order.",
	micropython: "A version of the Python language small enough to run on a microcontroller, with extra modules for controlling pins. The language used in Creating Tangible Interfaces.",
	python: "A programming language known for readable code and for using indentation instead of curly braces to group lines together.",
	indentation: "In Python, how far a line is pushed to the right. It is not decoration: it defines which lines belong to which block, the job braces do in JavaScript.",
	list: "Python's name for an ordered collection of values in one variable, written in square brackets. The same idea JavaScript calls an array.",
	dictionary: "A Python collection of key-and-value pairs, written in curly brackets and read with square brackets. The same idea as a JavaScript object used as a bag of data.",
	module: "A bundle of ready-made code you pull into your program with import. On a microcontroller, machine and time are the two you use constantly.",
	none: "Python's word for no value at all, where JavaScript says null. Capital N.",
	"f-string": "A Python string with an f in front of the opening quote, letting you drop values straight into the text with curly brackets. The equivalent of a JavaScript template literal.",
	wokwi: "A browser-based simulator that runs real microcontroller firmware against a drawn circuit. It lets you build and test electronics without owning any, and without breaking anything.",
	simulator: "Software that imitates a physical system closely enough to be worth practising on. Forgiving in ways the real thing is not, which is both the point and the catch.",
	"main.py": "The file a MicroPython board looks for and runs the moment it has power. Your program goes here.",
	machine: "The MicroPython module that gives your code access to the hardware inside the chip: pins, analog inputs, PWM, timers.",
	"pull-up resistor": "A resistor that gently ties an input pin to the supply voltage, so it reads 1 whenever nothing else drives it. With one fitted, a button wired to ground reads 0 when pressed.",
	"pull-down resistor": "A resistor that gently ties an input pin to ground, so it reads 0 when nothing else drives it. The mirror image of a pull-up.",
	"pull-up": "Short for pull-up resistor: the arrangement that holds an input pin high until something pulls it low. Microcontrollers have one built into each pin that you can switch on in code.",
	"pull-down": "Short for pull-down resistor: the arrangement that holds an input pin low until something pulls it high.",
	floating: "The state of an input pin connected to nothing, with no fixed voltage. It picks up electrical interference and reports 1 and 0 more or less at random.",
	bounce: "The metal contacts inside a switch touching, springing apart and touching again over a few milliseconds. Invisible to you, and read as several separate presses by a chip.",
	debouncing: "Ignoring the extra presses that bounce produces, usually by refusing to accept another change for a few tens of milliseconds after accepting one.",
	polling: "Checking an input over and over in your main loop, because a microcontroller has no event listeners to call your code for you.",
	potentiometer: "A knob you turn, which produces a voltage somewhere between ground and the supply depending on its position. The clearest possible way to see analog input working.",
	photoresistor: "A component whose resistance falls as light falls on it. Paired with a fixed resistor it produces a voltage that tracks brightness. Also called an LDR.",
	ldr: "Light-dependent resistor: another name for a photoresistor, a component that changes resistance with the light falling on it.",
	calibration: "Measuring what a sensor actually reads at its real extremes, and using those numbers rather than the theoretical ones. Every physical-computing project needs some.",
	pwm: "Pulse width modulation: switching a pin on and off very fast and varying the proportion of time it spends on, so a two-state pin can dim an LED or set a servo's position.",
	"pulse width modulation": "Getting an in-between effect out of an on-or-off pin by switching it faster than the eye or the motor can follow, and changing how much of each cycle is spent on.",
	"duty cycle": "The fraction of each PWM cycle that the pin spends switched on. Half duty gives roughly half the energy, and an LED that looks about half as bright.",
	frequency: "How many times per second something repeats, measured in hertz. In PWM it is the switching rate, separate from the duty cycle.",
	hertz: "The unit of frequency, written Hz: cycles per second. A servo expects its signal repeated at 50 Hz.",
	servo: "A small geared motor with electronics inside that hold it at a commanded position. You tell it where to be, not how far to turn, by varying the length of a pulse.",
	buzzer: "A component that makes sound. An active one has its own oscillator and only turns on and off; a passive one is a tiny speaker that plays whatever frequency you feed it.",
	transistor: "A component that lets a small signal switch a much larger current. The usual thing to put between a microcontroller pin and anything power-hungry.",
	"motor driver": "A small board that takes the weak signal from a microcontroller pin and uses it to control a motor from a separate, larger supply.",
	"baud rate": "The agreed speed of a serial connection, in bits per second, commonly 115200. If the two ends disagree you get plausible-looking nonsense rather than an error.",
	repl: "Read, Eval, Print, Loop: a live prompt into a running interpreter. MicroPython's is attached to the serial connection, so you can type Python straight into the board while it runs.",
	"serial monitor": "The panel in a simulator or editor that shows what a board prints over its cable, and lets you type lines back to it.",
	"web serial": "A browser feature, in Chrome and Edge only, that lets a web page open a serial connection to a board with the user's permission. The bridge between a microcontroller and the JavaScript you write for the browser.",
	blocking: "Describes a line of code that stops everything until it finishes. input() blocks while it waits for you to type, which is fine for a hand-driven tool and wrong for anything watching a sensor.",

	// added from 1
	"file extension": "The bit after the last dot in a file name — .pdf, .png, .js. It is a label that tells programs what kind of data to expect, not a conversion: renaming a file does not change what is inside it.",
	"absolute path": "A path that starts at the root of the disk or at your home folder, so it means the same thing typed from anywhere on the machine. The full postal address of a file.",
	"relative path": "A path that starts from the folder you are currently in, such as images/logo.png. It is 'second door on the left' — correct only if you are standing in the right corridor, but it survives when the whole project is moved or uploaded.",
	"home folder": "Your personal folder, containing your Desktop, Documents and Downloads. It is /Users/yourname on macOS and C:\\Users\\yourname on Windows, and both systems accept the shorthand ~ for it.",
	"working directory": "The one folder a terminal or a program considers 'here'. Commands act on it unless you tell them otherwise, and pwd is how you ask which one it currently is.",
	"parent folder": "The folder one level up from where you are. It is written as two dots, so cd .. moves you into it.",
	"hidden file": "A file whose name starts with a dot, like .gitignore. It is not secret — the convention exists to keep configuration files out of your way — and ls -a on macOS or ls -Force on Windows reveals them.",
	"plain text": "Characters and nothing else: no fonts, no bold, no page size. Code must be plain text, which is why a word processor breaks it by replacing straight quotes with curly ones.",
	"tab completion": "Typing the first few letters of a name and pressing Tab to have the shell finish it. It also proves the name exists and is spelled that way, which makes it the single most useful habit in a terminal.",
	"path variable": "PATH is the list of folders your shell searches when you type a command name. If a program is not in one of them the shell says 'command not found' even though it is installed — which is why an installer often ends by asking you to add itself to PATH.",
	"code editor": "An application for writing and editing plain text, such as VS Code. Unlike a word processor it never changes what you typed, which matters because curly quotes stop code from running.",
	"vs code": "Visual Studio Code, the free code editor named by the Creative Coding Foundations course. It works the same on macOS and Windows, and has a terminal built into the window.",
	"visual studio code": "The full name of VS Code, the free code editor used in the coding courses. Always open a folder in it rather than a single file.",
	"integrated terminal": "The terminal built into VS Code, opened with View then Terminal. It starts already inside the folder you have open, so commands run in the right place without any navigating.",
	"command palette": "The searchable list of every VS Code command, opened with Cmd+Shift+P on macOS or Ctrl+Shift+P on Windows. Documentation usually tells you to do things through it rather than through menus.",
	"file tree": "The list of a project's folders and files shown down the side of an editor. In VS Code it is the Explorer panel, and it only appears when you have opened a folder.",

	// added from 2
	"version control": "Software that records the history of a project so you can see every change, know who made it and why, and return the folder to any earlier state. Git is the one you will use.",
	"staging area": "The tray of changes you are proposing to save together. `git add` puts a change in it; `git commit` writes everything in it into the history as one snapshot.",
	"working tree": "The files as they currently sit in your project folder, as opposed to the versions stored in the history. A clean working tree means nothing has changed since the last commit.",
	"merge conflict": "What happens when two branches changed the same lines of the same file, so git stops and asks a human to choose. Routine, recoverable, and no work is lost while you sort it out.",
	"personal access token": "A long generated string you paste instead of a GitHub password. GitHub shows it exactly once, and it should be treated like a password.",
	"ssh key": "A pair of files on your machine that proves your identity to a service like GitHub without typing anything. More setup once, less friction forever.",
	"github pages": "A free GitHub service that serves the files in a repository as a live website. Push a change and the published site updates itself.",
	"static site": "A website made only of files that are served as they are — HTML, CSS, JavaScript, images. Cheap to host, and what GitHub Pages publishes.",
	"alt text": "The written description attached to an image, announced by a screen reader and shown when the image fails to load. In Markdown it is the text inside the square brackets.",

	// added from 3
	"inline style": "CSS written directly on one element as a style attribute. Quick for a test, awkward for real work, and it overrides almost everything else.",
	"box model": "The description of every element on a page as four nested layers: content, padding, border and margin. Understanding it explains most layout surprises.",
	"box-sizing": "The CSS property that decides whether width means the content alone (the default) or the whole visible box. Setting it to border-box makes width mean what you expect.",
	"border-box": "The value of box-sizing that makes an element's stated width include its padding and border, so 300px on screen really is 300px.",
	"inline-block": "A display value that keeps an element in the flow of a line while letting it accept width, height and vertical spacing like a block.",
	"margin collapsing": "The rule that vertical margins between stacked elements merge instead of adding up: a 30px margin meeting a 20px one gives a 30px gap.",
	"flex container": "The element you set display: flex on. Its direct children become flex items and line up according to the container's rules.",
	"flex item": "A direct child of a flex container. It is arranged by the container's properties, and can carry a couple of its own like flex-grow.",
	"main axis": "The direction a flex container lays its items along — horizontal in a row, vertical in a column. justify-content works along this axis.",
	"cross axis": "The direction perpendicular to a flex container's main axis. align-items works across this one, so it swaps meaning when the direction changes.",
	"justify-content": "The flexbox property that distributes items along the main axis: packed to one end, centred, or spread with space between them.",
	"align-items": "The flexbox property that aligns items across the cross axis. In a row, this is the one that centres things vertically.",
	"flex-grow": "A property on a flex item telling it to absorb the leftover space in the container. Set it to 1 on the item that should stretch.",
	"flex-wrap": "The flexbox property that lets items drop onto a new line instead of squeezing when they run out of room. Half of responsive layout, with no media query.",
	"responsive design": "Building one page that works at any window width, by describing relationships and limits rather than fixed positions and sizes.",
	"viewport meta tag": "One line in the head of an HTML file telling mobile browsers to use the real device width instead of pretending to be a desktop. Without it, no layout behaves on a phone.",
	"media query": "A block of CSS that only applies when a condition about the screen is true, usually a minimum width. How a layout changes shape at different sizes.",
	"mobile-first": "Writing the narrow, stacked layout as your base CSS and adding wider arrangements inside min-width media queries. The fallback is then always sound.",
	"max-width": "A CSS property setting a ceiling rather than a demand: the element takes that width where there is room and less where there is not. Usually what you meant when you typed width.",
	"dev tools": "The inspection panel built into every browser, opened with a right-click and Inspect. It shows a page's HTML and CSS, lets you edit both live, and reports errors.",

	// added from 4a
	"console.log": "The instruction that makes a program print a value where you can see it. Named after a ship's log, and the first tool you reach for when something behaves unexpectedly.",
	"developer tools": "The panel of instruments built into every browser for looking inside a web page: the console, the page structure, the network, the styles. Opened with F12 or by right-clicking and choosing Inspect.",
	"template literal": "A string written between backticks instead of quotes, in which ${ } drops the value of an expression straight into the text.",
	"off-by-one": "The error of doing something one time too many or too few — the classic beginner bug, and the reason lists count from zero and loops stop below the count.",
	"infinite loop": "A loop whose condition never becomes false, so it runs for ever and freezes the page. The fix is closing the tab; the cure is making sure the body moves the condition towards ending.",
	"arrow function": "A shorter way of writing a function, with no function keyword: (n) => n * 2. It is a value, so it is usually stored in a variable. You will see it everywhere in modern code.",

	// added from 4b
	"event listener": "A function registered to run whenever a particular event happens on a particular element. Set up with addEventListener.",
	"frame rate": "How many frames a program manages per second, written fps. Screens usually refresh sixty times a second, some newer ones twice that.",
	"web audio api": "The browser's built-in sound engine. You build a chain of small parts — a tone generator, a volume control — and connect it to the speakers.",
	"secure context": "A page served over https, or from localhost. Browsers only grant the microphone, camera and location to pages in one — a file opened straight from your folder may not qualify.",
	"api key": "A password identifying you to an API, so the service can count and limit your requests. Never commit one to a public repository.",
	"status code": "The number a server sends with every answer: 200 means fine, 404 means no such thing, 500 means something broke at their end.",
	"stack trace": "The list of function calls printed under an error message, most recent first, showing the route the program took to reach the failure.",

	// added from 5
	"ohm's law": "The one equation you need: voltage equals current times resistance, V = I x R. Rearranged as I = V / R, it tells you how much current a given voltage will push through a given resistor.",
	"closed circuit": "A complete loop, so current flows. What you want most of the time.",
	"open circuit": "A loop with a gap in it, so no current flows. A switch is a gap you control on purpose; a wire that fell out is one you did not.",
	"short circuit": "An unintended path of almost no resistance from the supply straight back to ground, bypassing the component that was meant to be there. Very large current, hot wires, dead parts.",
	"forward voltage": "The roughly fixed voltage an LED drops across itself when it is lit, around 2 V for a red one. Whatever the supply has left over is what the resistor has to deal with.",
	"analog-to-digital converter": "The hardware that turns a continuous voltage into a number your program can use. In MicroPython you read it with read_u16(), which gives 0 to 65535 on every board.",
	"voltage regulator": "The part of a board that turns whatever voltage arrives into the steady one the chip needs.",
	"f-string": "A Python string with an f in front of the opening quote, letting you drop values straight into the text with curly brackets. The equivalent of a JavaScript template literal.",
	"main.py": "The file a MicroPython board looks for and runs the moment it has power. Your program goes here.",
	"pull-up resistor": "A resistor that gently ties an input pin to the supply voltage, so it reads 1 whenever nothing else drives it. With one fitted, a button wired to ground reads 0 when pressed.",
	"pull-down resistor": "A resistor that gently ties an input pin to ground, so it reads 0 when nothing else drives it. The mirror image of a pull-up.",
	"pull-up": "Short for pull-up resistor: the arrangement that holds an input pin high until something pulls it low. Microcontrollers have one built into each pin that you can switch on in code.",
	"pull-down": "Short for pull-down resistor: the arrangement that holds an input pin low until something pulls it high.",
	"pulse width modulation": "Getting an in-between effect out of an on-or-off pin by switching it faster than the eye or the motor can follow, and changing how much of each cycle is spent on.",
	"duty cycle": "The fraction of each PWM cycle that the pin spends switched on. Half duty gives roughly half the energy, and an LED that looks about half as bright.",
	"motor driver": "A small board that takes the weak signal from a microcontroller pin and uses it to control a motor from a separate, larger supply.",
	"baud rate": "The agreed speed of a serial connection, in bits per second, commonly 115200. If the two ends disagree you get plausible-looking nonsense rather than an error.",
	"serial monitor": "The panel in a simulator or editor that shows what a board prints over its cable, and lets you type lines back to it.",
	"web serial": "A browser feature, in Chrome and Edge only, that lets a web page open a serial connection to a board with the user's permission. The bridge between a microcontroller and the JavaScript you write for the browser.",

	// added from 6
	fablab: "A workshop full of computer-controlled machines — laser cutter, 3D printer, CNC router, vinyl cutter — open to students and members. Short for fabrication laboratory. SUPSI has one, and the digital fabrication course is taught in it.",
	"digital fabrication": "Making a physical object by sending a file to a machine that executes it, instead of shaping the material by hand. The design lives in the file, so it can be copied, shared, versioned and cut again identically.",
	subtractive: "Describes a process that starts with material and removes what is not wanted: laser cutting, CNC milling, vinyl cutting. Fast and strong, but the cutting tool has to be able to reach every surface it makes.",
	additive: "Describes a process that builds an object up out of nothing, layer by layer. 3D printing is the additive one, which is why it can make shapes no tool could carve.",
	"laser cutter": "A machine that moves a focused beam over a flat sheet and burns through it. Two-dimensional: every part comes out one sheet thick, with the same profile on the top and bottom face.",
	"3d printer": "A machine that builds an object up in thin layers. The common kind melts plastic filament and lays it down, so each layer has to rest on the one below.",
	cnc: "Computer numerical control: a machine whose cutting tool follows a path from a file rather than a person turning a handle. A CNC router or mill cuts thick wood, plastic or aluminium.",
	"vinyl cutter": "A machine that drags a small blade through thin flexible sheet, cutting it without cutting its backing paper. Used for stickers, stencils, textile transfers, and cutting copper tape into flexible circuits.",
	enclosure: "The housing around a piece of electronics: the box that holds the board, points the sensor the right way and lets the cable out. Turning a breadboard prototype into something a person can hold.",
	"fusion 360": "The Autodesk CAD program used in the digital fabrication course. It covers modelling, technical drawings, renders, animations and machine toolpaths in one window, and is free to students and for personal use.",
	fusion: "Short for Fusion 360, the Autodesk CAD program. Autodesk are dropping the number, so both names refer to the same software.",
	autodesk: "The company that makes Fusion 360 and AutoCAD. You need an Autodesk account to install or run Fusion, and your files are stored against it.",
	parametric: "Describes a model built from editable numbers and rules rather than fixed shapes. The software records the steps you took, so changing a dimension near the beginning rebuilds everything that came after it.",
	"user parameter": "A named value you create in Fusion, such as material_thickness = 3 mm, and then type into dimensions instead of a number. Change it once and every feature that used the name updates.",
	"sketch plane": "The flat surface a CAD sketch is drawn on — one of the three origin planes, or a flat face of something you already made. The artboard you pick before you can draw.",
	constraint: "A rule a sketch must obey — horizontal, parallel, equal, concentric, symmetric — which keeps holding after every later change. Snapping aligns something once; a constraint aligns it permanently.",
	dimension: "A constraint with a number in it: this line is 40 mm, these holes are 25 mm apart. Constraints say how things relate; dimensions say how big they are.",
	"fully constrained": "The state of a sketch in which every element is pinned by constraints and dimensions and nothing can be dragged. Fusion draws it in black instead of blue, and it is the goal before leaving any sketch.",
	"under-constrained": "A sketch with freedom left in it, drawn in blue and draggable. Whatever is still free was set by where you released the mouse, so a later edit can change it in ways you never decided.",
	extrude: "To take a closed 2D outline and push it perpendicular to its plane to make a solid. The main CAD verb: it adds material, or removes it when set to cut, which is how holes and slots are made.",
	profile: "A closed 2D outline inside a sketch — the region an extrude or revolve acts on. If a profile has a gap in it, nothing can be built from it.",
	revolve: "Spinning a 2D profile around an axis to make a solid. The feature for anything turned: a knob, a bottle, a lens housing.",
	fillet: "A rounded edge on a solid, made by clicking the edge and typing a radius. Add fillets late in the sequence, because they make every earlier edit harder to rebuild.",
	chamfer: "An edge cut off at an angle, usually 45 degrees. Useful twice over in fabrication: it softens an edge, and it prints without support where a square ledge would need it.",
	timeline: "The strip along the bottom of the Fusion window holding one icon per operation, in the order you performed them. Double-click one to edit it, or drag the marker back to see the model part-built.",
	feature: "One operation in a parametric model's history — an extrude, a fillet, a hole. Each one appears in the timeline and can be reopened and changed at any time.",
	component: "A named part of a CAD assembly, as opposed to a plain body. Only components can be positioned relative to each other and exploded in an animation, so make them as you go.",
	kerf: "The width of material a cutting beam or blade removes as it travels, roughly a tenth to three tenths of a millimetre on a laser. Because the beam is centred on your line, holes come out oversized and tabs come out undersized, so an exact fit always ends up loose.",
	"press fit": "A joint held by friction alone: a tab pushed into a slot sized to grip it. No glue, comes apart for iteration, and only works if you have allowed for kerf or printing tolerance.",
	"finger joint": "A comb of alternating tabs and gaps along two mating edges that interlock like clasped fingers. The standard way to build a laser-cut box: lots of glue area, and the parts locate themselves.",
	score: "A laser pass at reduced power that marks a line on the surface without cutting through. Used for fold lines, alignment marks and line artwork. Also called vector engrave.",
	engrave: "Burning a filled area into a surface, with the laser head sweeping back and forth like an inkjet printer. Works from a filled shape rather than a path, and is much slower than cutting.",
	undercut: "A shape that a straight-down cut cannot produce, because the profile changes through the thickness of the material. Laser cutters cannot make one, which is why laser-cut parts are always a single uniform thickness.",
	dxf: "Drawing Exchange Format: a plain vector file from the AutoCAD world, holding lines and curves and nothing else. The safest format to hand a laser cutter, exported from Fusion by right-clicking a sketch.",
	svg: "Scalable Vector Graphics: the vector format used by the web and by Illustrator. Some laser software accepts it and some does not, so ask the Fablab which they prefer.",
	fdm: "Fused deposition modelling: the common kind of 3D printing, in which a nozzle melts plastic filament and draws the object one thin layer at a time.",
	filament: "The spool of plastic wire a 3D printer melts. PLA is the forgiving default; other types print hotter and warp more.",
	pla: "The default 3D printing plastic: easy to print, low warping, made from plant starch. Use it unless someone tells you otherwise.",
	stl: "The oldest and most common 3D printing export format. It describes the outer surface of an object as thousands of triangles and carries nothing else — no units, no colour, no editable history.",
	"3mf": "A newer 3D printing file format that carries the mesh plus its units and extra information the printer software can use. Prefer it over STL where the slicer accepts it.",
	mesh: "A 3D shape described as a skin of triangles rather than as exact geometry. Curves become many small flat facets, which is why export dialogues ask you how finely to divide them.",
	"layer height": "How thick each printed layer is, typically 0.1 to 0.3 mm. Halving it doubles the print time and smooths curved surfaces; it changes nothing about horizontal detail.",
	infill: "The internal lattice a slicer builds inside a printed part instead of solid plastic, given as a percentage. Ten to twenty per cent is normal, and adding more buys much less strength than extra walls do.",
	walls: "The outlines a 3D printer draws around the edge of each layer, also called perimeters. Two or three is usual, and this is where most of a printed part's strength comes from.",
	supports: "Scaffolding a slicer adds under parts of a model that would otherwise print into thin air. They work, but they must be broken off and they leave a rough scar, so a shape that avoids them is worth designing.",
	overhang: "Part of a 3D model that sticks out over empty space, with nothing beneath it for the next layer to rest on. Up to about 45 degrees from vertical it prints cleanly; steeper than that it droops.",
	bridging: "A printed horizontal run stretched between two supported points, like the top of a doorway. It sags slightly but prints without support over spans of a few centimetres.",
	warping: "A printed part peeling its own corners off the bed as the plastic shrinks while cooling. Worst on large flat footprints with sharp corners; a brim or rounded corners mostly cure it.",
	brim: "A flat collar of plastic printed around the first layer to hold a part down. Cheap insurance on anything tall or with a small footprint.",
	raft: "A disposable slab printed underneath a whole part to help it stick to the bed. Heavier-handed than a brim, and it leaves a rough underside.",
	tolerance: "The allowance left between parts that have to fit together — the gap that turns 'the same size' into 'assembles'. Printed holes come out undersized and laser-cut holes come out oversized, so never design two parts to be exactly equal at the interface.",
	clearance: "The deliberate gap designed between two mating parts. Around 0.3 to 0.5 mm on a printed hole for a sliding fit, less for a press fit — confirm it with a small test print rather than trusting a number.",
	"technical drawing": "A dimensioned 2D document generated from a 3D model, aimed at whoever has to make or check the object. Unambiguous rather than attractive, and it stays linked to the model it came from.",
	orthographic: "A way of drawing an object straight on, with no perspective, so that parallel edges stay parallel and measurements taken off the drawing are true. The basis of every technical drawing.",
	"section view": "A drawing view in which a plane cuts through the object so the inside is visible. The only honest way to show a wall thickness or an internal cavity.",
	"title block": "The ruled box in the corner of a technical drawing carrying the part name, author, date, scale, units, material and revision. A drawing separated from it cannot be trusted, because nobody knows which version it is.",
	"first-angle projection": "The European convention for where to place the side and top views around the front view on a drawing. Most of the world outside Europe uses third-angle, which places them on the opposite sides — confusing the two mirrors the part, so the title block carries a symbol saying which is in use.",
	appearance: "In Fusion, how a surface looks when rendered: brushed aluminium, matte plastic, oak. Separate from the physical material, which is what the model uses to calculate weight.",
	"exploded view": "A drawing or render with the parts of an assembly pulled apart along their axes, showing how they fit together. Fusion can generate one automatically from named components.",
	"assembly animation": "A short video showing the parts of an object coming together or apart. Worth making when it shows something a still image cannot — how a joint engages, which way a lid comes off.",

	// added from 7
	"language model": "A program that, given a piece of text, guesses what comes next — then adds the guess and repeats. Everything a chat assistant does is that loop running fast.",
	llm: "Large Language Model: a language model trained on an enormous quantity of text, big enough to write fluently about almost anything. The kind behind every chat assistant you have used.",
	"large language model": "A text-predicting model trained on an enormous quantity of writing. It produces plausible continuations, which is why it is fluent about everything and reliable about nothing without checking.",
	model: "In machine learning, the trained program itself: a very large set of numbers plus the machinery that runs them. You send it text and it sends text back.",
	token: "The unit a language model actually reads and writes: a chunk of a few characters, often a whole common word, part of a rarer one, or a piece of punctuation. Cost, size limits and speed are all measured in tokens, not words.",
	tokeniser: "The step that chops text into tokens before a model sees it, using a vocabulary learned from data rather than a rule about spaces. It is why a model cannot easily count the letters inside a word.",
	"context window": "The maximum amount of text a model can hold at once, counted in tokens — your instructions, the whole conversation, any pasted document, and the answer being written. When a conversation outgrows it, something is dropped and the model is not told what.",
	weights: "Another word for a model's parameters: the numbers learned during training. Downloading a model means downloading its weights, which is why the files are gigabytes.",
	training: "The one-off process, before you ever use a model, of running vast amounts of data through it while its internal numbers are adjusted so its predictions get less wrong. It takes months and a data centre.",
	inference: "Running a finished model to get an answer — what happens every time you press enter. The parameters are frozen, so nothing you type during inference changes the model.",
	"fine-tuning": "Taking an already-trained model and training it further on a smaller, specific set of examples to shift its behaviour. Cheaper than training from scratch, and still a training step rather than a prompt.",
	hallucination: "A model stating something invented as though it were fact. Not a bug added by accident: the mechanism produces plausible text, and a well-formed false citation is as plausible as a real one.",
	temperature: "The dial controlling how adventurously the next token is chosen. Near zero the model takes the likeliest option every time and repeats itself; higher settings pick surprising options more often, and past a point produce nonsense.",
	sampling: "Choosing the next token by a weighted draw rather than always taking the highest-scoring one. It is why the same prompt gives a different answer each time.",
	distribution: "A set of scores across all the possible next tokens, saying how likely each one is. The model produces one of these at every step; temperature reshapes it before a token is drawn.",
	"system prompt": "Standing instructions sent with every request in a conversation — who the model is acting as, what it must never do, the output format. It is a strong instruction rather than an enforced rule.",
	"few-shot": "Including two or three worked examples in your prompt so the model can copy their format, tone and length. The highest-value habit in prompting: examples settle what adjectives cannot.",
	"zero-shot": "Asking a model to do something with no examples, on the strength of the instruction alone.",
	"prompt injection": "Text inside the material you feed a model — a user message, a web page, a file — that acts as an instruction and gets obeyed. There is no complete fix, so never let a model take an irreversible action on the strength of text you did not write.",
	"environment variable": "A named value belonging to the environment a program runs in rather than to its source code. The standard place to keep an API key, so the secret never appears in a file you might share.",
	gitignore: "A file listing things git must never record — build output, downloaded packages, and anything holding a secret. Named .gitignore and kept at the top of the repository.",
	"node.js": "JavaScript running outside the browser, on your machine or a server. Same language, no page and no window, plus access to files and to secrets a browser could never be trusted with.",
	streaming: "Receiving a model's answer token by token as it is produced, instead of waiting for the whole thing. It does not make generation faster; it makes the wait legible.",
	latency: "The delay between asking and receiving. With a language model most of it is the work itself, because tokens are generated one at a time, so a long answer genuinely takes longer.",
	"rate limit": "A provider's cap on how much you may ask for in a period — requests or tokens per minute. Crossing it gets you a refusal, conventionally status 429, and the right response is to wait longer between attempts rather than retry immediately.",
	quantisation: "Storing a model's parameters with less numerical precision, which shrinks the file and the memory it needs at some cost in quality. Labels like Q4 mean roughly four bits per parameter, and four bits is where most laptop-sized models settle.",
	quantization: "The American spelling of quantisation: rounding off a model's internal numbers so it fits in less memory, trading a little quality for the ability to run on a laptop.",
	"local model": "A model whose file sits on your own disk and runs on your own processor. Nothing crosses the network, so there is no key, no bill and no rate limit — in exchange for a smaller, weaker model.",
	ollama: "A tool for downloading and running language models on your own machine from the terminal. It handles the download, the quantisation choice and the memory management for you.",
	"lm studio": "A desktop application for browsing, downloading and chatting with models that run on your own machine. The same idea as Ollama with a window instead of a terminal.",
	gpu: "Graphics processing unit: the chip built to do many small calculations at once. It is what makes running a model fast, which is why a laptop without a capable one produces text slowly.",
	vram: "The memory attached to a graphics card. A model has to fit in it to run at full speed, which is the limit that decides what a given machine can run.",
	ram: "The fast working memory a computer uses for whatever is running right now, as opposed to the disk where things are stored. A local model has to fit into it, alongside everything else you have open.",
	bias: "In a model, a systematic lean inherited from its training data and its tuning: which names sound professional, whose English is treated as correct, what a default person is assumed to be. It shows up in generated personas and summaries long before it shows up in anything obviously offensive.",
	"training data": "The text, images and code a model was trained on. Its contents decide what the model is fluent about, what it is biased towards, and whose work went in without being asked.",

	// added from 8
	dataset: "One collection of data held together — one file, one export, one table. A dataset is made of records, and every record has the same fields.",
	record: "One entry in a dataset: one survey response, one sensor reading, one museum object. Spreadsheet people call it a row, researchers call it an observation.",
	field: "One thing recorded about every entry in a dataset — the city, the temperature, the timestamp. A column in a spreadsheet, a property on an object, a variable to a researcher.",
	observation: "One entry in a dataset, seen from the research side: one thing measured once. The same idea as a record or a row.",
	"tidy data": "A table arranged the way every data tool expects: one row per observation, one column per variable, one header row at the top, and nothing else on the sheet.",
	"header row": "The first line of a table, holding the name of each field rather than data. Short names without spaces or accents save hours later.",
	delimiter: "The character that separates one value from the next in a text file. A comma in most CSV files, but a semicolon wherever decimals are written with a comma.",
	"character encoding": "The agreement about which bytes stand for which characters. Write and read everything as UTF-8, or Zürich arrives as ZÃ¼rich.",
	"utf-8": "The character encoding that covers every language and is the modern default. In a spreadsheet's save dialog, choose CSV UTF-8 rather than plain CSV.",
	quantitative: "Data that is counted or measured: forty-two visitors, 21.4 degrees, three clicks. It answers how many, how much, how often.",
	qualitative: "Data that is described rather than counted: an interview transcript, a field note, a photograph, an open answer on a form. It answers why and what is it like.",
	categorical: "Describing a field whose values are labels rather than quantities — city, material, yes or no. Categories can be counted and compared, but not averaged.",
	coding: "In research, sorting qualitative material into categories so it can be counted: marking which of eleven transcripts mention the door. In programming, the same word means writing programs.",
	codebook: "The document that ships with a serious dataset, explaining what each field means, what the codes stand for and how the data was collected. Read it before charting anything.",
	"missing value": "A field with no data in it for a record. Blank, N/A, unknown, 999 and -1 are all used for this, and each has to be recognised and handled deliberately rather than averaged in as a number.",
	outlier: "A value far away from the rest of the data. It can be an error, something different measured by accident, or the most interesting record you have — you have to look to tell which.",
	mean: "The average: add the values and divide by how many there are. One extreme value drags it a long way, which is why it is worth reporting the median beside it.",
	median: "The middle value once the values are sorted, with half above and half below. Unlike the mean, it barely moves when one value is extreme.",
	spread: "How far apart the values in a dataset are. The simplest measure is the range — the smallest value and the largest.",
	range: "The distance from the smallest value in a dataset to the largest. The plainest way to describe how spread out the data is.",
	"iso 8601": "The international way of writing a date so nobody can misread it: year first, then month, then day, as 2026-04-03. It also sorts correctly as plain text.",
	"data cleaning": "Getting a dataset into a state where the analysis is not a lie: fixing missing values, duplicates, categories that disagree with themselves, dates, units and errors. Most of the hours in a data project go here.",
	visualisation: "A drawing of data in which a quantity is carried by something you can see — the length of a bar, the position of a dot, the darkness of a colour.",
	"visual encoding": "The rule connecting a number to a mark: this length means this many visitors. People read position and length most accurately, then angle, then area, then colour.",
	axis: "The labelled edge of a chart that tells you what the positions mean. A bar chart's value axis has to start at zero, because the length of the bar is the quantity.",
	baseline: "The line a bar chart's bars sit on, and the zero of its value scale. Starting it anywhere other than zero exaggerates every difference in the chart.",
	scale: "In a chart, the conversion between the units of the data and pixels on screen — how many pixels one visitor is worth. Calculate it from the largest value in the data rather than typing it in.",
	histogram: "A chart showing how a set of measurements is spread out: the values are grouped into ranges and one bar counts how many fall in each. It shows the shape an average hides.",
	"scatter plot": "A chart with one dot per record and a different variable on each axis, used to see whether two things move together.",
	"sequential scale": "A colour scale running light to dark in one hue, used for quantities. Light reads as less and dark as more, almost automatically.",
	"diverging scale": "A colour scale with two hues meeting at a neutral middle, used when the data has a meaningful midpoint such as zero, an average, or before and after.",
	"open data": "Data published with a licence that permits reuse, usually free to download as CSV or JSON. Open means specific permissions, stated on the download page, not merely that the file is on the internet.",
	scraping: "Extracting data from web pages built for humans by reading their HTML. The source of last resort: it may breach the site's terms, it loads someone else's server, and it breaks whenever the page changes.",
	consent: "Permission that is informed, specific and freely given: the person knows what you are collecting, what it is for, who will see it, how long you keep it, and that they can withdraw.",
	"personal data": "Any data that can identify a living person, directly or in combination with something else. A name, a photograph, a voice recording, or a set of fields that only one person matches.",
	anonymisation: "Removing identifying information so that no one can work out whose record is whose — including the combinations of ordinary fields, such as postcode and job title and year of birth, that single a person out.",
	pseudonymisation: "Replacing names with codes such as P01 and P02. A good habit, and not the same as anonymisation, because the key mapping the codes back to people still exists.",
	protocol: "The written record of how a dataset was produced: the question, the sources, the consent, the instrument and its settings, what went wrong, and every cleaning decision. What makes a result checkable rather than merely finished.",
	"sampling rate": "How often a sensor reading is recorded. Once a second for a week is 604,800 rows; once a minute is 10,080, and usually answers the same question.",
	"machine learning": "Getting a program to work out a rule from examples instead of being given the rule. Show it enough labelled photographs and it settles on numbers that classify new ones.",
	"test set": "Examples held back before training and never learned from, used to judge the model honestly. A model that scores well only on data it has already seen has told you nothing.",
	label: "The answer you want a model to give for an example — chair, spam, night, 21.4. Examples that carry labels are what supervised learning trains on.",
	"supervised learning": "Training a model on examples that already carry the right answer. Nearly all the machine learning you will do in this master is this kind.",
	clustering: "Letting a program group similar records together without being told what the groups are. It tells you what the natural piles look like, not what to call them.",
	overfitting: "When a model learns the particulars of its training examples — the noise, the grey backdrop, the quirks — instead of the pattern. It scores beautifully on data it has seen and falls apart on anything new.",
	prompting: "Getting an existing model to do something by describing it in words, often with a few examples in the message. Nothing is learned: the model's numbers stay fixed and your prompt is only input.",
	"synthetic data": "Records that were generated rather than observed. Useful for filling a prototype before real data exists, and never evidence — any pattern in it describes the model that produced it, not the world.",

	// added from 9
	"design thinking": "An umbrella name for the problem-first design process: understand the situation, frame the problem, explore many options, narrow to one. The label is a convention rather than a fixed method — every school teaches a slightly different diagram of it.",
	"double diamond": "A four-step diagram of a design process — discover, define, develop, deliver — drawn as two diamonds, because each half widens to explore and then narrows to decide. The first diamond is about the problem, the second about the solution.",
	diverge: "To deliberately widen the set of options rather than choose between them. The first half of each diamond in a design process; the opposite move is to converge.",
	converge: "To narrow a set of options down to a decision. The second half of each diamond in a design process; the opposite move is to diverge.",
	"co-design": "Designing with the people who will live with the outcome rather than only for them: they take part in making, not only in being researched. Also called participatory design.",
	"participatory design": "The same practice as co-design, under its older name. It came out of Scandinavian workplace projects in the 1970s and 80s, where people argued for a say in the systems being built around their jobs.",
	"generative session": "A workshop where participants build, draw, collage or arrange something rather than answer questions. The artefact is a prompt — the value is in what people say and do while making it.",
	sensitising: "A small task sent to participants days before a session — photograph this, note when that happens — so they arrive already thinking about the subject instead of warming up in your first twenty minutes.",
	probe: "A set of materials left with someone for a period, designed to provoke and capture fragments of their life. A way of reaching things an interview cannot, not a measuring instrument.",
	stakeholder: "Anyone with an interest in the outcome of a project — staff, clients, whoever pays or is affected. Not the same as a participant, and mixing the two in one room without noticing the power difference distorts everything said in it.",
	participant: "A person taking part in your research or co-design session. Referred to by a code (P1, P2) rather than a name, so the material stays usable outside the team.",
	"research question": "A question about people and their situation that evidence could settle and that you do not already know the answer to. Distinct from the brief, which states an intention, and from a design question, which you answer by building something.",
	"semi-structured interview": "An interview with prepared topics rather than a fixed script, so you can follow what you hear. It tells you how people explain their behaviour, not reliably what their behaviour is.",
	"contextual inquiry": "Watching someone do their real work in their real setting while asking about it as they go. It surfaces the sequence, the workarounds and the context that interviews miss.",
	"diary study": "A method where participants record their own experience over days or weeks. The way to see change over time and rare events; the entries are thin, and people drop out.",
	"usability test": "Watching a person attempt real tasks on something that exists. It tells you where a specific design fails and how people recover — never whether the thing was worth building.",
	screener: "The short set of questions used to sort suitable research participants from unsuitable ones. Good screeners filter on things people have actually done, within a stated timeframe.",
	saturation: "The point where new research sessions stop producing new material, and therefore the honest place to stop. Reaching it is a reason to finish; still being surprised is a reason to keep going.",
	"research plan": "A one- or two-page document written before any research happens: the decision it informs, the research questions, the method and why, participants and recruitment, schedule, materials, analysis approach and risks.",
	"discussion guide": "The prepared topics and questions for an interview session. It plans the shape of the hour rather than scripting it word for word.",
	"informed consent": "A participant's agreement, in writing, given after being told what the session is for, what is being recorded, who will see it, how long it is kept, and that they can stop at any time without giving a reason.",
	finding: "A pattern that appears across participants, stated descriptively and with a count. One striking quote is an observation, not a finding.",
	insight: "A statement that explains findings, names the tension underneath them and implies a direction. It has to be traceable to evidence and it has to change a decision, or it is a wall poster.",
	"affinity mapping": "Putting every observation on its own note and clustering the notes by what they have in common, letting the categories emerge from the pile rather than deciding them first.",
	verbatim: "A participant's exact words, quoted rather than paraphrased. Verbatims survive the meeting and get repeated; your summary of them does not.",
	readout: "The session where research is presented to the people who have to act on it. Led by the insights, with the method in an appendix.",
	"user flow": "A diagram of one task inside a system you control, drawn as states and the transitions between them. Boxes are states, diamonds are decisions, and every branch — including the failures — gets drawn.",
	"task flow": "A user flow with no branches: the single path where everything goes right. Useful for agreeing scope quickly, useless for working out what has to be built.",
	wireflow: "A user flow drawn with small wireframes in place of the boxes, for when the argument is about what is on each screen rather than what the sequence is.",
	"journey map": "A map of one person's experience of a service over a stretch of real time, including everything that happens outside your product. Rows usually cover actions, thoughts, feelings, touchpoints, pain points and opportunities.",
	touchpoint: "Any moment of contact between a person and a service — a screen, an email, a printed sheet, a room, a package, a member of staff, a notification.",
	channel: "The medium a touchpoint arrives through: app, web, phone, in person, post, voice, physical space. Designing across channels rather than across screens is the shift the master expects.",
	"service blueprint": "A journey map extended downwards into what the organisation does to make each moment happen, separated into front-stage, back-stage and support processes by horizontal lines.",
	"front-stage": "Everything in a service that the person can perceive: the screens, the emails, the staff they speak to. The layer above the line of visibility in a service blueprint.",
	"back-stage": "The work that makes a service possible and that the person never sees — the staff task, the overnight sync, the spreadsheet someone updates. Below the line of visibility, and where experience failures often actually live.",
	"line of visibility": "The line in a service blueprint separating what the person can see from what they cannot. The most useful line on the diagram, because it is where 'nothing on the front is broken' stops being a mystery.",
	modality: "The form an interaction takes: a graphical interface, text conversation, speech, gesture, a physical control, an ambient signal, or delegation to an agent. Choosing one is now a design decision made per task.",
	multimodal: "Using more than one modality in a single experience — either together (point and speak) or in sequence (start by voice, confirm on a screen). It only works if every modality reads and writes the same state.",
	"ambient interface": "An interface that conveys something without asking for attention or interaction — a light, a sound, a vibration, a change in a physical object. Right when what is needed is status rather than a conversation.",
	"adaptive interface": "An interface that changes with the user, their history or their context. Useful, and it costs you repeatability, spatial memory and the ability for two people to see the same thing.",
	personalisation: "The person chooses a setting and the system remembers it. Distinct from adaptation, where the system decides on the person's behalf from inferred signals.",
	agent: "A system that pursues a goal on your behalf, taking actions in the world, rather than responding to one instruction at a time. What separates it from a tool is initiative and consequence.",
	agentic: "Describing a system that acts on the user's behalf rather than only responding. Autonomy is a scale, not a switch, and it is set per action: suggesting, drafting, acting after confirmation, acting and reporting, acting silently.",
	"wizard of oz": "A test where a person plays the system from behind the scenes while the participant believes it is automatic. Still the cheapest way to test how people delegate to an agent that does not exist yet.",
	"cold start": "The state of an adaptive or personalised system before it knows anything about the person. A real state with real users in it, and the one most often left undesigned.",
	"trust calibration": "Matching a person's trust in a system to how reliable it actually is. Over-trust is a design failure of the same size as under-trust, and it is the one that ships, because in testing it looks like satisfaction.",
	"design token": "A name given to a single design decision — a colour, a spacing step, a type size, a duration — so it can be referred to instead of repeated. In CSS it is a custom property such as --space-3, used with var().",
	variant: "A version of a design component that differs in a defined way: a button in primary and secondary, small and large. In code, usually an extra class or attribute rather than a separate component.",
	"design system": "The agreed set of components, tokens and rules an interface is built from, held in both a design file and code. Its value is that the two sides use the same names for the same things.",
	handoff: "The point where a design becomes something a developer builds. What travels well is component names, tokens, states and layout rules; what travels badly is pixel coordinates and a single width with perfect content.",
	"focus state": "The visible indication of where the keyboard currently is on a page. Not the same as hover, which follows a pointer and does not exist on touch, and required for anyone using an interface without a mouse.",
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
