document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  const faqItems = document.querySelectorAll(".faq-item");
  const offerLinks = document.querySelectorAll('a[href="#oferta"]');
  const offerSection = document.querySelector("#oferta");
  const testimonialToggles = document.querySelectorAll(".testimonial-toggle");

  // ÍCONES REDES SOCIAIS
  const socialIcons = document.querySelectorAll(".social-icon");

  // BOTÃO WHATSAPP (rastreamento)
  const whatsappButton = document.querySelector(".whatsapp-float");

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

  // ANIMAÇÃO DOS ÍCONES SOCIAIS
  socialIcons.forEach((icon, index) => {
    icon.style.opacity = "0";
    icon.style.transform = "translateY(20px)";

    setTimeout(() => {
      icon.style.transition = "0.6s ease";
      icon.style.opacity = "1";
      icon.style.transform = "translateY(0)";
    }, 250 + index * 150);
  });

  // FAQ ACCORDION
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

  // SCROLL PARA OFERTA
  offerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (!offerSection) return;

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

  // SCROLL SUAVE PARA ÂNCORAS
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;
      if (targetId === "#oferta") return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // EXPANDIR/COLAPSAR DEPOIMENTOS
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

  // PIXEL FACEBOOK - clique no WhatsApp
  if (whatsappButton) {
    whatsappButton.addEventListener("click", () => {
      if (typeof fbq !== "undefined") {
        fbq("trackCustom", "WhatsAppClick");
      }
    });
  }
});
