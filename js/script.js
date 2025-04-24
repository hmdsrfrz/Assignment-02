document.addEventListener('DOMContentLoaded', function() {
    // Welcome notification
    const welcomeBanner = document.createElement('div');
    welcomeBanner.className = 'welcome-banner';
    welcomeBanner.innerHTML = `
        <p>Welcome to our Tech Blog! Explore the latest in technology.</p>
        <button class="close-banner">&times;</button>
    `;
    document.body.prepend(welcomeBanner);
    
    // Close banner functionality
    document.querySelector('.close-banner').addEventListener('click', () => {
        welcomeBanner.style.display = 'none';
    });
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '&uarr;';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--error)';
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.color = 'var(--error)';
                    input.after(errorMsg);
                } else {
                    input.style.borderColor = 'var(--border)';
                    const existingError = input.nextElementSibling;
                    if (existingError && existingError.className === 'error-message') {
                        existingError.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
    // Current date in footer
    const footer = document.querySelector('footer');
    if (footer) {
        const dateElement = document.createElement('div');
        dateElement.className = 'current-date';
        dateElement.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        footer.prepend(dateElement);
    }
    
    // Show more/less functionality for articles
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        const content = article.querySelector('p');
        if (content.textContent.length > 150) {
            const shortText = content.textContent.substring(0, 150) + '...';
            const fullText = content.textContent;
            content.textContent = shortText;
            
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-content';
            toggleBtn.textContent = 'Show More';
            article.appendChild(toggleBtn);
            
            toggleBtn.addEventListener('click', () => {
                if (content.textContent === shortText) {
                    content.textContent = fullText;
                    toggleBtn.textContent = 'Show Less';
                } else {
                    content.textContent = shortText;
                    toggleBtn.textContent = 'Show More';
                }
            });
        }
    });
});