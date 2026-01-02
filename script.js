document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Contact Form Handling (Demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const lang = document.documentElement.lang || 'es';
        const messages = {
            es: {
                sending: 'Enviando...',
                success: '¡Gracias! Su mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.',
                error: 'Hubo un problema al enviar el formulario. Por favor, inténtelo de nuevo o contáctenos por teléfono.',
                connection_error: 'Hubo un error de conexión al enviar el formulario.'
            },
            en: {
                sending: 'Sending...',
                success: 'Thank you! Your message has been sent successfully. We will be in touch soon.',
                error: 'There was a problem sending the form. Please try again or contact us by phone.',
                connection_error: 'There was a connection error while sending the form.'
            }
        };
        const m = messages[lang] || messages.es;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = m.sending;
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formspree.io/f/mnjqlvle', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert(m.success);
                    contactForm.reset();
                } else {
                    alert(m.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert(m.connection_error);
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });
});
