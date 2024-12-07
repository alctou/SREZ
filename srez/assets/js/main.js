const makeRequestModal = document.querySelector("#make_request");

document.querySelectorAll(".accordion").forEach((accordion) => {
  const trigger = accordion.querySelector(".accordion__trigger");
  trigger.addEventListener("click", () => {
    accordion.classList.toggle("open");
  });
});

const form = document.getElementById("make_request_form");
const modal = document.getElementById("make_request");
const openModalBtns = document.querySelectorAll("button");
const closeModalBtn = modal.querySelector(".close");

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.showModal();
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

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
