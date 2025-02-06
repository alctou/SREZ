'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const sliderBody = document.querySelector('.slider__body');
    const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
    const sliderDots = Array.from(document.querySelectorAll('.slider__dot'));
    const sliderContent = document.querySelector('.slider__content');
    const arrows = document.querySelectorAll('.slider__arrow');
    const sliderDotsContainer = document.querySelector('.slider__dots');

    if (!sliderBody || !sliderContent || !sliderDotsContainer) {
        console.error("Не удалось найти один из элементов слайдера.");
        return;
    }

    // Обработчик для стрелок
    arrows.forEach(arrow => {
        arrow.addEventListener('click', function () {
            let currentActiveIndex = sliderItems.findIndex(item => item.classList.contains('active'));
            
            let newIndex;
            if (arrow.classList.contains('arrow__left')) {
                newIndex = currentActiveIndex === 0 ? sliderItems.length - 1 : currentActiveIndex - 1;
            } else {
                newIndex = currentActiveIndex === sliderItems.length - 1 ? 0 : currentActiveIndex + 1;
            }

            changeActive(newIndex);
        });
    });

    // Обработчик для точек
    sliderDotsContainer.addEventListener('click', function (event) {
        let targetDot = event.target.closest('.slider__dot');
        if (!targetDot || targetDot.classList.contains('active')) return;

        let newIndex = Number(targetDot.dataset.index);
        changeActive(newIndex);
    });

    function changeActive(newIndex) {
        document.querySelector('.slider__item.active')?.classList.remove('active');
        document.querySelector('.slider__dot.active')?.classList.remove('active');

        sliderItems[newIndex].classList.add('active');
        sliderDots[newIndex].classList.add('active');

        scrollSlider(newIndex);
    }

    function scrollSlider(index) {
        sliderContent.style.transform = `translateX(${index * -100}%)`;
    }
});