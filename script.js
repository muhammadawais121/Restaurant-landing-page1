// ===== LOADER FUNCTIONALITY =====
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    
    // Simulate loading time (minimum 2 seconds for effect)
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        // After loader fades out, show main content
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.classList.add('loaded');
        }, 500);
    }, 2000);
});

// ===== CHATBOT FUNCTIONALITY =====
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            'hours': 'We are open Monday to Sunday from 11:00 AM to 10:00 PM. 🕐',
            'menu': 'Our menu features authentic Oriental cuisine including Spicy Noodles ($12.99), Special Fried Rice ($10.99), and Steamed Dumplings ($8.99). You can view all dishes in our Best Sellers section! 🍜',
            'reservations': 'You can make a reservation by calling us 0325-1831212 or visiting our Contact section. We recommend booking in advance for weekends! 📞',
            'location': 'We are located at shamsabad station rawalpindi . 📍',
            'delivery': 'Yes, we offer delivery! You can place orders through our website or call us directly. Delivery usually takes 30-45 minutes. 🚚',
            'specials': 'Check out our Promo section for current specials! We have weekend discounts, family combos, and first-time customer offers. 🎉',
            'default': 'I\'m here to help! You can ask me about our menu, hours, reservations, location, delivery, or current specials. What would you like to know? 😊'
        };
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        const chatbotBtn = document.getElementById('chatbot-btn');
        const chatbotWindow = document.getElementById('chatbot-window');
        const minimizeBtn = document.getElementById('minimize-chat');
        const sendBtn = document.getElementById('send-btn');
        const chatInput = document.getElementById('chat-input');
        const quickBtns = document.querySelectorAll('.quick-btn');
        
        // Toggle chatbot
        chatbotBtn.addEventListener('click', () => this.toggleChat());
        minimizeBtn.addEventListener('click', () => this.toggleChat());
        
        // Send message
        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Quick questions
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                this.sendUserMessage(question);
                this.generateBotResponse(question);
            });
        });
    }
    
    toggleChat() {
        const chatbotBtn = document.getElementById('chatbot-btn');
        const chatbotWindow = document.getElementById('chatbot-window');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatbotBtn.classList.add('active');
            chatbotWindow.classList.add('active');
        } else {
            chatbotBtn.classList.remove('active');
            chatbotWindow.classList.remove('active');
        }
    }
    
    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (message) {
            this.sendUserMessage(message);
            this.generateBotResponse(message);
            chatInput.value = '';
        }
    }
    
    sendUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    generateBotResponse(userMessage) {
        // Simulate typing delay
        setTimeout(() => {
            const response = this.getBotResponse(userMessage.toLowerCase());
            this.sendBotMessage(response);
        }, 1000);
    }
    
    getBotResponse(message) {
        // Check for keywords in the message
        if (message.includes('hour') || message.includes('time') || message.includes('open')) {
            return this.responses.hours;
        } else if (message.includes('menu') || message.includes('food') || message.includes('dish')) {
            return this.responses.menu;
        } else if (message.includes('reservation') || message.includes('book') || message.includes('table')) {
            return this.responses.reservations;
        } else if (message.includes('location') || message.includes('address') || message.includes('where')) {
            return this.responses.location;
        } else if (message.includes('delivery') || message.includes('order')) {
            return this.responses.delivery;
        } else if (message.includes('special') || message.includes('promo') || message.includes('discount')) {
            return this.responses.specials;
        } else {
            return this.responses.default;
        }
    }
    
    sendBotMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot
const chatbot = new Chatbot();

// ===== EXISTING FUNCTIONALITY =====
// Dish data
const dishData = {
    'spicy-noodles': {
        name: 'Spicy Noodles',
        description: 'Authentic spicy noodles with fresh vegetables and aromatic spices.',
        price: '$12.99',
        rating: '⭐ 4.8',
        ingredients: 'Wheat noodles, chili oil, vegetables, soy sauce, garlic, ginger',
        image: '/placeholder.svg?height=300&width=400'
    },
    'fried-rice': {
        name: 'Special Fried Rice',
        description: 'Traditional fried rice with premium ingredients and secret sauce.',
        price: '$10.99',
        rating: '⭐ 4.7',
        ingredients: 'Jasmine rice, eggs, vegetables, soy sauce, sesame oil, green onions',
        image: '/placeholder.svg?height=300&width=400'
    },
    'dumplings': {
        name: 'Steamed Dumplings',
        description: 'Handmade dumplings filled with fresh meat and vegetables.',
        price: '$8.99',
        rating: '⭐ 4.9',
        ingredients: 'Flour wrapper, pork, cabbage, ginger, soy sauce, sesame oil',
        image: '/placeholder.svg?height=300&width=400'
    }
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Dish card functionality
document.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('click', function() {
        const dishId = this.getAttribute('data-dish');
        const dish = dishData[dishId];
        
        if (dish) {
            showDishModal(dish);
        }
    });
});

// Show dish modal
function showDishModal(dish) {
    const modal = document.getElementById('dishModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalRating = document.getElementById('modalRating');
    const modalIngredients = document.getElementById('modalIngredients');
    
    modalImage.src = dish.image;
    modalImage.alt = dish.name;
    modalTitle.textContent = dish.name;
    modalDescription.textContent = dish.description;
    modalPrice.textContent = dish.price;
    modalRating.textContent = dish.rating;
    modalIngredients.textContent = dish.ingredients;
    
    // Reset quantity
    document.getElementById('quantity').textContent = '1';
    
    modal.style.display = 'block';
}

// Quantity selector
let quantity = 1;

function changeQuantity(change) {
    quantity += change;
    if (quantity < 1) quantity = 1;
    if (quantity > 10) quantity = 10;
    document.getElementById('quantity').textContent = quantity;
}

// Add to cart functionality
document.querySelector('.add-to-cart').addEventListener('click', function() {
    const dishName = document.getElementById('modalTitle').textContent;
    const dishPrice = document.getElementById('modalPrice').textContent;
    
    alert(`Added ${quantity} x ${dishName} (${dishPrice}) to cart!`);
    document.getElementById('dishModal').style.display = 'none';
});

// Subscription form modal
const subscriptionForm = document.querySelector('.subscription-form');
const subscriptionModal = document.getElementById('subscriptionModal');

subscriptionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        subscriptionModal.style.display = 'block';
        this.reset();
    }
});

// Contact form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Modal close functionality
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.dish-card, .stat-item, .promo-card, .feature').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header .container');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                background: none;
                border: none;
                color: #ffd700;
                font-size: 1.5rem;
                cursor: pointer;
                display: block;
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            `;
            
            toggle.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
            });
            
            header.style.position = 'relative';
            header.appendChild(toggle);
        }
    } else {
        const toggle = document.querySelector('.mobile-toggle');
        if (toggle) {
            toggle.remove();
            nav.style.display = 'flex';
        }
    }
}

// Initialize mobile menu
window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Initialize active nav link
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
});
