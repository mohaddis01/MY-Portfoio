  // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      });
    });

    // Form validation
    document.querySelector("form")?.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const name = this.querySelector('input[type="text"]');
      const email = this.querySelector('input[type="email"]');
      const message = this.querySelector("textarea");
      let isValid = true;

      // Clear previous errors
      document.querySelectorAll('.error').forEach(el => el.remove());

      // Name validation
      if (!name.value.trim()) {
        showError(name, "Name is required");
        isValid = false;
      }

      // Email validation
      if (!email.value.trim()) {
        showError(email, "Email is required");
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError(email, "Please enter a valid email");
        isValid = false;
      }

      // Message validation
      if (!message.value.trim()) {
        showError(message, "Message is required");
        isValid = false;
      }

      if (isValid) {
        // Form is valid - you can add AJAX submission here
        alert("Thank you for your message! I'll get back to you soon.");
        this.reset();
      }
    });

    function showError(input, message) {
      const error = document.createElement('div');
      error.className = 'error';
      error.style.color = 'red';
      error.style.marginTop = '-0.5rem';
      error.style.marginBottom = '1rem';
      error.style.fontSize = '0.9rem';
      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
      input.style.borderColor = 'red';
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Example: Trigger after form submit
const form = document.querySelector('.contact form');
const sentBox = document.getElementById('sentAnimation');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent actual submission for demo
  sentBox.style.display = 'flex';

  // Optional: Hide the form
  form.style.display = 'none';

  // You can reset or hide animation after few seconds
  setTimeout(() => {
    sentBox.style.display = 'none';
    form.style.display = 'block'; // optional
    form.reset(); // clear form inputs
  }, 30000);
});
