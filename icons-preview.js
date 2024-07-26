const iconSize = 30; // px
let iconsCount = 0;

const iconsCountEl = document.querySelector(".icons-count");
const spritesContainer = document.querySelector(".sprites-container");
const wrapper = document.querySelector(".wrapper");
const sprites = ['icons'];

async function fetchSvg(sprite) {
	const response = await fetch(`./${sprite}.svg`);
	return response.text();
}

async function addSvgSpritesToDOM() {
	const fragment = document.createDocumentFragment();

	for (const sprite of sprites) {
		const svgContent = await fetchSvg(sprite);
		const div = document.createElement("div");
		div.classList.add(sprite);
		div.innerHTML = svgContent;
		fragment.appendChild(div);
	}

	spritesContainer.appendChild(fragment);
	renderIcons();
}

function renderIcons() {
	for (const sprite of sprites) {
		const svgSprite = document.querySelector(`.${sprite}`);
		const symbols = svgSprite.querySelectorAll("symbol");

		const sectionTemplate = document.getElementById("section").content;
		const figureTemplate = document.getElementById("figure").content;

		const section = sectionTemplate.cloneNode(true);
		const heading = section.querySelector("h2");
		const iconsContainer = section.querySelector(".icons-container");

		heading.innerHTML = `${sprite.charAt(0).toUpperCase() + sprite.slice(1)}.svg sprite (${symbols.length} icons)`;

		symbols.forEach(symbol => {
			const figure = figureTemplate.cloneNode(true);
			const svg = figure.querySelector("svg");
			const use = figure.querySelector("use");
			const figCaption = figure.querySelector("figcaption");

			figCaption.innerHTML = symbol.id;
			svg.setAttribute("width", iconSize);
			svg.setAttribute("height", iconSize);
			use.setAttribute("xlink:href", `/${sprite}.svg#${symbol.id}`);

			iconsContainer.appendChild(figure);
		});

		iconsCount += symbols.length;
		wrapper.appendChild(section);
	}

	iconsCountEl.textContent = iconsCount;
}

window.addEventListener('DOMContentLoaded', addSvgSpritesToDOM);
