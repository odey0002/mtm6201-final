// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-nav");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

// Keep the footer year current.
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Pet search and filtering
const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".pet-card");
const resultCount = document.querySelector("[data-result-count]");
const resultLabel = document.querySelector("[data-result-label]");
const petSearch = document.querySelector("[data-pet-search]");
const searchForm = document.querySelector("[data-pet-search-form]");
const searchClear = document.querySelector("[data-search-clear]");
const noResults = document.querySelector("[data-no-results]");

let activeFilter = "all";

const updatePets = () => {
  const query = petSearch?.value.trim().toLowerCase() || "";
  let count = 0;

  cards.forEach((card) => {
    const matchesType =
      activeFilter === "all" || card.dataset.type === activeFilter;
    const searchableText = card.textContent.toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    const show = matchesType && matchesSearch;

    card.hidden = !show;

    if (show) {
      count += 1;
    }
  });

  if (resultCount) {
    resultCount.textContent = count;
  }

  if (resultLabel) {
    resultLabel.textContent =
      count === 1 ? "featured friend shown" : "featured friends shown";
  }

  if (noResults) {
    noResults.hidden = count !== 0;
  }

  if (searchClear) {
    searchClear.hidden = !query;
  }
};

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    activeFilter = filter.dataset.filter;

    filters.forEach((button) => {
      button.classList.toggle("is-active", button === filter);
    });

    updatePets();
  });
});

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
});

petSearch?.addEventListener("input", updatePets);

searchClear?.addEventListener("click", () => {
  petSearch.value = "";
  petSearch.focus();
  updatePets();
});

if (petSearch) {
  const queryFromUrl = new URLSearchParams(window.location.search).get("q");

  if (queryFromUrl) {
    petSearch.value = queryFromUrl;
  }

  updatePets();
}

// Pet interest modal
const modal = document.querySelector("#pet-modal");

const closeModal = () => {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

document.querySelectorAll("[data-pet]").forEach((button) => {
  button.addEventListener("click", () => {
    const petName = document.querySelector("[data-pet-name]");

    if (petName) {
      petName.textContent = button.dataset.pet;
    }

    if (modal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      modal.querySelector(".modal-close")?.focus();
    }
  });
});

document.querySelector(".modal-close")?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Contact form feedback
document
  .querySelector("[data-contact-form]")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.name.value.trim() || "there";
    const status = form.querySelector(".form-status");

    status.textContent = `Thanks, ${name}! Your message is ready for our team.`;
    form.reset();
  });

// Get Involved form feedback
document
  .querySelector("[data-involvement-form]")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.name.value.trim() || "there";
    const path = form.elements.path.value.toLowerCase();
    const status = form.querySelector(".form-status");

    status.textContent =
      `Thanks, ${name}! Your ${path} interest is ready for our team.`;
    form.reset();
  });
