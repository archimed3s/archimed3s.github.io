function slider() {
	let slider = document.getElementById(`js-sliderContent`),
		sliderElem = document.querySelectorAll(`.slider__elem`),
		windowWidth = document.querySelector(`.slider`).offsetWidth,
		sliderElemWidth = windowWidth - 48,
		sliderWidth = sliderElemWidth * 3;

	for(let i = 0; sliderElem.length > i; i++) {
		sliderElem[i].style.width = `${sliderElemWidth}px`;
	}
	slider.style.width = `${sliderWidth}px`;
	slider.style.marginLeft += `-${sliderElemWidth - 24}px`;
}

export default slider();