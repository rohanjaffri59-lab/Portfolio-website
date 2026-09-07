// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});


// Close mobile menu after clicking a navigation link

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.style.color = "#ff7070";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.style.color = "#ff7070";
            return;
        }

        const whatsappMessage =
            `Hello Rohan, I would like to discuss a project.%0A%0A` +
            `Name: ${encodeURIComponent(name)}%0A` +
            `Email: ${encodeURIComponent(email)}%0A` +
            `Subject: ${encodeURIComponent(subject)}%0A` +
            `Message: ${encodeURIComponent(message)}`;

        const whatsappUrl =
            `https://wa.me/923182119763?text=${whatsappMessage}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

        formMessage.textContent =
            "Opening WhatsApp to send your message...";
        formMessage.style.color = "#7fa2ff";

        contactForm.reset();
    });
}


// ================= SCROLL REVEAL =================

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .service-card, .about-content, .about-image, .contact-info, .contact-form, .cv-card"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});