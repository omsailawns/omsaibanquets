// Calendar functionality
let banquetDate = new Date();
let lawnDate = new Date();

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Sample booked dates for banquet hall
const banquetBookedDates = {
    '2026-01': [24,25],
    '2026-02': [6, 19, 20],
    '2026-03': [7,8],
    '2026-04': [26,21,28],
    '2026-05': [13,14]
};

// Sample booked dates for lawn area
const lawnBookedDates = {
    '2026-01': [1, 2, 10, 11, 12, 19, 24, 25, 26, 28, 29],
    '2026-02': [1, 3, 5, 6, 7, 8, 10, 13, 20, 22, 25],
    '2026-03': [1, 8, 10, 15, 16,17],
    '2026-04': [9, 29, 26, 30, 28, 21],
    '2026-05': [23, 10, 9, 1, 8, 7, 13, 14]
};

function generateCalendar(type) {
    const calendar = document.getElementById(`${type}Calendar`);
    const monthDisplay = document.getElementById(
        `currentMonth${type.charAt(0).toUpperCase() + type.slice(1)}`
    );

    // If this page doesn't have the calendar, do nothing
    if (!calendar || !monthDisplay) return;

    const currentDate = type === 'banquet' ? banquetDate : lawnDate;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;

    monthDisplay.textContent = `${months[month]} ${year}`;

    calendar.innerHTML = '';

    // Day headers
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // First day and days in month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day';
        calendar.appendChild(emptyCell);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;

        const bookedDates = type === 'banquet' ? banquetBookedDates : lawnBookedDates;
        const booked = bookedDates[monthKey] && bookedDates[monthKey].includes(day);
        dayCell.classList.add(booked ? 'booked' : 'available');

        dayCell.addEventListener('click', () => {
            if (!booked) {
                selectDate(year, month + 1, day, type);
            }
        });

        calendar.appendChild(dayCell);
    }
}

function previousMonth(type) {
    if (type === 'banquet') {
        banquetDate.setMonth(banquetDate.getMonth() - 1);
    } else {
        lawnDate.setMonth(lawnDate.getMonth() - 1);
    }
    generateCalendar(type);
}

function nextMonth(type) {
    if (type === 'banquet') {
        banquetDate.setMonth(banquetDate.getMonth() + 1);
    } else {
        lawnDate.setMonth(lawnDate.getMonth() + 1);
    }
    generateCalendar(type);
}

function selectDate(year, month, day, type) {
    const venue = type === 'banquet' ? 'Banquet Hall' : 'Lawn Area';
    const selectedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    alert(`You selected ${selectedDate} for ${venue}. Contact us on WhatsApp to book this date!`);
    contactWhatsApp(type);
}

function showCalendar(type) {
    const tabs = document.querySelectorAll('.calendar-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = document.querySelector(`.calendar-tab[onclick="showCalendar('${type}')"]`);
    if (activeTab) activeTab.classList.add('active');

    const containers = document.querySelectorAll('.calendar-container');
    containers.forEach(c => c.classList.remove('active'));

    const activeCalendar = document.querySelector(`.${type}-calendar`);
    if (activeCalendar) activeCalendar.classList.add('active');
}

function contactWhatsApp(type = 'banquet') {
    const venue = type === 'banquet' ? 'Banquet Hall' : 'Lawn Area';
    const phoneNumber = '919822658766';
    const message = encodeURIComponent(
        `Hi! I would like to inquire about booking the ${venue} at Om Sai Banquets for my event.`
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Mobile menu
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.remove('active');
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll(
        '.about, .gallery, .videos, .availability, .testimonials, .contact'
    );

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Only init calendars on Availability page
    if (document.getElementById('banquetCalendar')) {
        generateCalendar('banquet');
        generateCalendar('lawn');
    }

    // Gallery clicks (if gallery exists)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`Opening gallery image ${index}`);
        });
    });

    // Map click (if exists)
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function () {
            window.open('https://maps.app.goo.gl/ku52cmujDqPNVMS3A?g_st=aw', '_blank');
        });
    }

    // Navbar scroll effect
    const topNav = document.getElementById('topNav');
    if (topNav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                topNav.classList.add('scrolled');
            } else {
                topNav.classList.remove('scrolled');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
});
function showGallerySection(type) {
    const sections = document.querySelectorAll('.gallery-section');
    sections.forEach(section => section.classList.remove('active'));

    const lawns = document.getElementById('gallery-lawns');
    const banquet = document.getElementById('gallery-banquet');

    if (type === 'lawns' && lawns) {
        lawns.classList.add('active');
    }
    if (type === 'banquet' && banquet) {
        banquet.classList.add('active');
    }

    const tabs = document.querySelectorAll('.gallery-switch .calendar-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = document.querySelector(
        `.gallery-switch .calendar-tab[onclick="showGallerySection('${type}')"]`
    );
    if (activeTab) {
        activeTab.classList.add('active');
    }
    /**
 * 1. Mobile Menu Toggle Functionality
 */
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
    // Optional: Add a class to the body to prevent background scrolling
    document.body.classList.toggle('menu-open'); 
}

function closeMobileMenu() {
    document.getElementById('mobileNav').classList.remove('active');
    document.body.classList.remove('menu-open');
}

/**
 * 2. Sticky Navigation Transition on Scroll
 */
document.addEventListener('DOMContentLoaded', () => {
    const topNav = document.getElementById('topNav');

    window.addEventListener('scroll', () => {
        // Check if the user has scrolled past a certain point (e.g., 50px)
        if (window.scrollY > 50) {
            topNav.classList.add('scrolled');
        } else {
            topNav.classList.remove('scrolled');
        }
    });
});

/**
 * 3. WhatsApp Contact Function
 */
function contactWhatsApp() {
    // Replace '919876543210' with the actual WhatsApp number
    const phoneNumber = '919822658766'; 
    const message = encodeURIComponent('नमस्कार! माझ्या आगामी कार्यक्रमासाठी ओम साई बॅन्क्वेट हॉल बुक करण्याबाबत मला चौकशी करायची आहे कृपया उपलब्धता, भाडे, सुविधा आणि बुकिंग प्रक्रिया याबाबत सविस्तर माहिती द्यावी आपला प्रतिसाद अपेक्षित आहे धन्यवाद.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}
}




