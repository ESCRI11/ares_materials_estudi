# Images wanted

A shopping list of screenshots and photographs the lessons would be better with. Work
through it whenever you have time — nothing here blocks the site, every lesson already
stands on its own in prose.

## How to hand them over

1. Drop the files in `src/assets/screenshots/` using the exact filename from the tables below.
2. Tell me which ones you added.

I write the alt text, place them in the right lesson, and check they render. Don't worry
about resizing or optimising — Astro converts and compresses them at build time.

## Rules of thumb

- **Crop tight.** The interesting part, not the whole 27-inch monitor.
- **Capture at 2× / Retina** if your machine offers it, so it stays sharp when zoomed.
- **Check for personal information** before sending: your name in file paths, other repos,
  email addresses, browser tabs, client work, Slack notifications.
- **Your own photos are safest.** For anything you didn't shoot or screenshot yourself, we
  need a licence that allows reuse — send the source link and I'll check it rather than
  assume.
- **Failures teach.** A drooping overhang or a warped corner is worth more than a perfect
  print. Photograph your mistakes.
- **A terminal command is not a screenshot.** Those stay as code blocks — text you can copy,
  search and have read aloud. Only screenshot a terminal when the *interface* is the point.

---

## Priority 1 — do these first

Seven images where the prose is genuinely doing worse than a picture would.

| Filename | Lesson | What it must show |
|---|---|---|
| `vscode-wsl-folder.png` | Your machine → VS Code | Whole VS Code window with a folder open (`~/ind-prep`), the Explorer tree on the left, and the **green `WSL: Ubuntu` badge in the bottom-left corner**. That badge is the whole point and is invisible in writing. |
| `devtools-elements-styles.png` | HTML & CSS → The browser dev tools | Just the devtools panel. Elements tab, one element selected and highlighted, Styles pane on the right — ideally with a **struck-through overridden declaration** visible, because that strikethrough is what teaches the cascade. |
| `fusion-interface.png` | Digital fabrication → Getting into Fusion 360 | Whole Fusion window with any simple part open (a cube with a hole is perfect). Must show the **browser tree top-left**, the **timeline along the bottom**, and the toolbar. Hardest interface on the site to describe. |
| `github-pages-settings.png` | Git & GitHub → Publishing with GitHub Pages | Repo → Settings → Pages, cropped to the Source section, with **Source set to "GitHub Actions"**. This exact step broke our first deploy, so it's worth showing. |
| `3dprint-layer-lines.png` | Digital fabrication → Designing for 3D printing | Close-up photo of a printed part where the **layer lines are clearly visible**. Raking light helps. This is what makes "printed in layers" stop being an abstraction. |
| `schematic-vs-photo.png` | Documenting work → Schematics and source files | A real schematic beside a photo of the same breadboard. Documentation is **mandatory to pass two 5-ECTS modules**, and this is the distinction the deliverable turns on. |
| `spreadsheet-messy-vs-tidy.png` | Data → Spreadsheets, CSV and JSON | A spreadsheet breaking the rules — **merged cells, colour used to mean something, two headers** — ideally beside a tidy version of the same data. The single clearest image on the whole list. |

---

## By section

### 1 · Design methods

| Filename | Lesson | What it must show |
|---|---|---|
| `figma-components-variants.png` | UI, components and the handoff to code | A component with its **variants panel** open. Your own work, or a scratch file — not a client's. |
| `figma-inspect-css.png` | UI, components and the handoff to code | The inspect / dev panel showing the **CSS a developer would copy**, which is the handoff point the lesson is about. |
| `journey-map-example.png` | Flows, journeys and blueprints | A real journey map or service blueprint, yours or anonymised. Only if you have one you're happy to publish. |

### 2 · Your machine

| Filename | Lesson | What it must show |
|---|---|---|
| `vscode-wsl-folder.png` | VS Code | *Priority 1 — see above* |
| `windows-file-extensions.png` | Files, folders and paths | Windows File Explorer's View menu with **"File name extensions" ticked**, or the folder before/after. The lesson tells them to turn this on and it's a hunt. |
| `vscode-extensions-wsl.png` | VS Code | The Extensions panel showing an extension with an **"Install in WSL: Ubuntu"** button — the distinction that confuses everyone. |
| `terminal-first-open.png` | The terminal | Windows Terminal freshly opened on the Ubuntu tab, showing the prompt. Low priority; the prose covers it. |

### 3 · Git & GitHub

| Filename | Lesson | What it must show |
|---|---|---|
| ~~`github-repo-page.png`~~ | Putting a repository on GitHub | **Done** — I captured this one, it's already live. |
| `github-pages-settings.png` | Publishing with GitHub Pages | *Priority 1 — see above* |
| `github-new-repo.png` | Putting a repository on GitHub | The "create a new repository" form filled in, before pressing the button. Show that **"Add a README" is unticked** — ticking it is a classic first-push conflict. |
| `github-pull-request.png` | Branches and pull requests | An open pull request on the **Files changed** tab, so the green/red diff is visible. Any real PR of yours. |
| `github-commit-history.png` | Your first repository | The commit list of a repo with a few real commits, showing messages and authors. Optional — the repo page image partly covers it. |

### 4 · HTML & CSS

| Filename | Lesson | What it must show |
|---|---|---|
| `devtools-elements-styles.png` | The browser dev tools | *Priority 1 — see above* |
| `devtools-box-model.png` | The box model | The **box-model diagram** in the Computed pane, with content, padding, border and margin numbered. This lesson has no diagram — mermaid can't draw nested rectangles — so a real one fills a genuine gap. |
| `devtools-device-toolbar.png` | Responsive design | The device toolbar on, page rendered at a narrow width, with the pixel dimensions readable. |
| `vscode-two-file-project.png` | Build a page from two files | The VS Code Explorer showing `index.html` and `style.css` side by side inside a `portfolio` folder, with the editor open. The new lesson has the reader create both by hand and there is currently no picture of the result. |
| `devtools-hover-state.png` | CSS and selectors | Dev tools with `:hov` open and `:hover` forced on, so the reader can see the state being simulated rather than only read about it. |

### 5 · JavaScript

| Filename | Lesson | What it must show |
|---|---|---|
| `console-error-stack.png` | When it breaks | A **real error in the browser console**, expanded to show the stack trace and the clickable file:line link. Break something on purpose — an undefined variable is ideal. |
| `console-first-line.png` | The console | The console open with an expression typed and its value returned underneath. Low priority. |

### 6 · Physical computing

Photographs, mostly. The Wokwi simulator is embedded live in these lessons, so screenshots
of *it* aren't needed — but the real components are not on screen anywhere.

| Filename | Lesson | What it must show |
|---|---|---|
| `breadboard-rows.png` | Circuits and breadboards | A breadboard photographed straight-on, ideally with the **backing peeled off or an annotated overlay showing which holes are connected**. This is the number-one beginner confusion and words consistently fail at it. High value. |
| `arduino-board-pins.png` | What a microcontroller is | The board you're issued in class, close enough that the **pin labels are legible**. Also settles the open question of which board the course actually uses. |
| `led-polarity.png` | Blink | An LED close-up where the **long leg and short leg** are clearly different, ideally next to a resistor for scale. |
| `resistor-bands.png` | Electricity for designers | A resistor close-up with the colour bands sharp. |
| `breadboard-built-circuit.png` | Buttons and digital input | A real wired-up circuit — LED, resistor, button — so they see what the tidy diagram looks like in the world. |

### 7 · Digital fabrication

The heaviest section for images, because most of it is physical and none of it is on screen.

| Filename | Lesson | What it must show |
|---|---|---|
| `fusion-interface.png` | Getting into Fusion 360 | *Priority 1 — see above* |
| `fusion-timeline-edit.png` | Parametric modelling | The timeline with **a dimension being edited and the model updated** — ideally a before/after pair (`fusion-timeline-before.png`, `fusion-timeline-after.png`). The whole argument of the lesson is "change something early and everything downstream re-runs", which one static frame can't show. |
| `fusion-sketch-constraints.png` | Parametric modelling | A sketch showing **constrained versus under-constrained geometry** — the colour difference Fusion uses. |
| `3dprint-layer-lines.png` | Designing for 3D printing | *Priority 1 — see above* |
| `3dprint-supports.png` | Designing for 3D printing | Slicer preview with **support material generated** under an overhang, so supports stop being an abstract setting. |
| `3dprint-overhang-fail.png` | Designing for 3D printing | A **failed overhang** — drooping, stringing, or a collapsed bridge. Failure photos teach faster than successes. |
| `3dprint-warping.png` | Designing for 3D printing | A corner **lifted off the bed**. Optional but good. |
| `slicer-interface.png` | Designing for 3D printing | PrusaSlicer / Bambu Studio / Cura with a model loaded and sliced, layer preview visible, settings panel readable. |
| `laser-kerf.png` | Designing for laser cutting | Two cut pieces showing **the gap the beam removed** — a part next to the sheet it came from is ideal. Kerf is pure abstraction in prose and obvious in a photo. |
| `laser-finger-joints.png` | Designing for laser cutting | A finger-jointed box, assembled or mid-assembly. |
| `fablab-machines.png` | What a Fablab is | The actual machines at Fablab SUPSI. Not strictly necessary, but a photo of the room they'll walk into is worth something. |

### 8 · Documenting work

| Filename | Lesson | What it must show |
|---|---|---|
| `wokwi-diagram-panel.png` | Schematics and source files | The Wokwi `diagram.json` view showing a wired circuit, which is what the lesson tells the reader to submit as their wiring diagram. |
| `photo-lit-vs-unlit.png` | Photographing a prototype | A pair: the same LED prototype exposed for the object, then exposed for the light. The lesson explains the trade-off and a pair makes it obvious in a second. |
| `schematic-vs-photo.png` | Schematics and source files | **The most valuable image on this list.** A proper schematic beside a photograph of the same breadboard circuit. The whole lesson turns on "a photo of a breadboard is not a schematic", and one pair settles it faster than three paragraphs. |
| `project-page-example.png` | The project page | A documented project page you are happy with — yours or a classmate's, with permission. Optional; only if you have one that models the structure well. |

### 9 · Data

| Filename | Lesson | What it must show |
|---|---|---|
| `spreadsheet-messy-vs-tidy.png` | Spreadsheets, CSV and JSON | *Priority 1 — see above* |
| `csv-in-text-editor.png` | Spreadsheets, CSV and JSON | The **same CSV opened in a text editor**, so they see the commas. Pairs with the spreadsheet image; the two together make the point in one glance. |

### 10 · Python & SQL

**None needed.** Everything in this section is terminal output or code, which belongs in a
code block a reader can copy and a screen reader can read — not in a picture of text.

### 11 · AI as a material

Mostly conceptual and already carried by diagrams. Low priority throughout.

| Filename | Lesson | What it must show |
|---|---|---|
| `ollama-model-list.png` | Running a model locally | The model list on ollama.com with **download sizes visible**, supporting the "look at the file size, not the parameter count" rule. |

### 12 · Claude Code

You can capture all of these yourself once it's installed, and they'd improve the section
a lot — it currently describes an interface entirely in words.

| Filename | Lesson | What it must show |
|---|---|---|
| `claudecode-permission-prompt.png` | Permissions | A **real approval prompt** — the proposed action and the allow/deny options. The lesson's central idea, currently unillustrated. |
| `claudecode-diff.png` | Working in a real project | A proposed file edit shown as a **diff in the terminal**, waiting for approval. |
| `claudecode-first-run.png` | Installing it | The screen right after `claude` starts: version, model, working directory, prompt. |
| `claudecode-plan-mode.png` | Having a conversation with it | Plan mode having produced a plan, before anything is edited. |

---

## Lessons checked and deliberately left out

Every lesson has been through this list. These ones were considered and don't get a row, so
nobody has to work it out twice:

- **Array methods · Randomness · Working with files · SQL basics · Python on your laptop** —
  all output is text. It belongs in a code block the reader can copy, not in a picture of one.
- **What not to commit** — a `.gitignore` is a text file; the lesson already prints it.
- **Outside the browser** — a terminal running `node` is the interface being *avoided*, not taught.
- **Screen and video** — the deliverable is a recording, and the lesson links to real examples.
- **Anything in Physical Computing that happens in Wokwi** — the simulator is embedded live in
  the page, so a screenshot of it would be a worse copy of something already on screen.

---

## Things I can capture myself

Tell me and I'll do these without you lifting a finger — they're public web pages:

- Wokwi's part-picker and wiring interface
- The ollama.com model list
- Any public GitHub page (repo views, public PRs, docs)

## Things I will not do

Generate an imitation of an interface I can't reach. A fabricated screenshot of Fusion 360
or VS Code would look plausible and be wrong, and the reader would go looking for something
that isn't there. Where an image doesn't exist, the lesson describes what you'll see instead.
