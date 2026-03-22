const revealElements = document.querySelectorAll(".reveal");

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
  revealObserver.observe(element);
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  const orbs = document.querySelectorAll(".bg-orb");
  const heroCard = document.querySelector(".hero-card");
  const sigil = document.querySelector(".hero-sigil");
  const offerSigil = document.querySelector(".offer-sigil");

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.07;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });

  if (heroCard) {
    heroCard.style.transform = `translateY(${scrolled * 0.035}px)`;
  }

  if (sigil) {
    sigil.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.02}deg)`;
  }

  if (offerSigil) {
    offerSigil.style.transform = `translateY(-50%) rotate(${scrolled * -0.03}deg)`;
  }
});
