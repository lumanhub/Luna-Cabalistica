document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  const faqItems = document.querySelectorAll(".faq-item");
  const offerLinks = document.querySelectorAll('a[href="#oferta"]');
  const offerSection = document.querySelector("#oferta");
  const testimonialToggles = document.querySelectorAll(".testimonial-toggle");

  // ANIMAÇÃO DE ENTRADA
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("visible")) {
      revealObserver.observe(element);
    }
  });

  // FAQ (abre e fecha)
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        const faqAnswer = faq.querySelector(".faq-answer");
        if (faqAnswer) faqAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // SCROLL SUAVE PARA OFERTA (só se ainda existir #oferta)
  offerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!offerSection) return;

      e.preventDefault();

      offerSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      offerSection.classList.add("offer-highlighted");

      setTimeout(() => {
        offerSection.classList.remove("offer-highlighted");
      }, 1600);
    });
  });

  // SCROLL SUAVE GERAL
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target || targetId === "#oferta") return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // EXPANDIR DEPOIMENTOS
  testimonialToggles.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".testimonial-card");
      if (!card) return;

      const content = card.querySelector(".testimonial-content");
      if (!content) return;

      const isExpanded = content.classList.contains("expanded");

      if (isExpanded) {
        content.classList.remove("expanded");
        content.classList.add("collapsed");
        button.textContent = "Ver mais avaliação";
      } else {
        content.classList.remove("collapsed");
        content.classList.add("expanded");
        button.textContent = "Ver menos";
      }
    });
  });
});
