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
	sketch:
		'In creative coding and on Arduino, a single small program — one thing that runs. Not a drawing in the pencil sense.',
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
	prompt: "The line a shell writes before it waits for you, usually ending in %, $ or >. It tells you who you are, which machine, and which folder you are standing in. When documentation shows a command starting with $, that dollar sign is the prompt and you do not type it.",
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
	workspace: "The folder you have open in VS Code, which almost every feature is scoped to: the file tree, search across files, the terminal and later git.",
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
	parameter: "The name a function gives to a value it will be handed. It lives in the function's declaration and behaves like a variable inside it.",
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
	context: "On a canvas, the object holding every drawing command — the brush, where the canvas is the paper. You get one with canvas.getContext(\"2d\").",
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
	"api key": "A password identifying you to an API, so the service can count and limit your requests. Never commit one to a public repository.",
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
