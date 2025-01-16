const makeRequestModal = document.querySelector("#make_request");


document.querySelectorAll(".accordion").forEach((accordion) => {
  const trigger = accordion.querySelector(".accordion__trigger");
  trigger.addEventListener("click", () => {
    accordion.classList.toggle("open");
  });
});

const form = document.getElementById("make_request_form");
const modal = document.getElementById("make_request");
const openModalBtns = document.querySelectorAll("footer");
const closeModalBtn = modal.querySelector(".close");

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.showModal();
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

// Функция для обновления слайдов
function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('main', index === currentIndex);
  });
}

// Обработчик кнопки "Следующий"
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length; // Переход к следующему слайду
  updateSlides();
});

// Обработчик кнопки "Предыдущий"
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Переход к предыдущему слайду
  updateSlides();
});

function openMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.add('openburger');
}

function closeMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.remove('openburger');
}

// Автоматическое переключение слайдов
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides();
}, 1000); // Интервал 5 секунд

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = form.querySelector('input[name="email"]');
  const email = emailInput.value.trim();

  if (!email) {
    alert("Введите email");
    return;
  }

  try {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert("Заявка успешно отправлена!");
      form.reset();
      modal.close();
    } else {
      alert("Ошибка при отправке заявки. Попробуйте позже.");
    }
  } catch (error) {
    alert("Сетевая ошибка. Попробуйте позже.");
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      modal.showModal();
      observer.unobserve;
    }
  });
}, {});
observer.observe(document.querySelector("#point"));

const favor = document.getElementById("favors");
const link = document.getElementById("link_expand__content");
const header = document.getElementById("container header__content");

favor.addEventListener("mouseenter", () => {
  link.style.display = "block";
});

header.addEventListener("mouseleave", () => {
  link.style.display = "none";
});
