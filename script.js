document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  const faqItems = document.querySelectorAll(".faq-item");
  const offerLinks = document.querySelectorAll('a[href="#oferta"]');
  const offerSection = document.querySelector("#oferta");

  // Reveal on scroll
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

  // FAQ accordion
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        const faqAnswer = faq.querySelector(".faq-answer");
        faqAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Smooth scroll + highlight offer
  offerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      if (offerSection) {
        offerSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        offerSection.classList.add("offer-highlighted");

        setTimeout(() => {
          offerSection.classList.remove("offer-highlighted");
        }, 1600);
      }
    });
  });

  // Smooth internal nav for all anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      // Já tratado acima para oferta
      if (targetId === "#oferta") return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
