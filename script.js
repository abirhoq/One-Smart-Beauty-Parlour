/**
 * One Smart Beauty Parlour - Interactive Client Logic & Experience
 * Features:
 *  - Scroll reveal animations
 *  - Service category filter
 *  - Lightbox modal for transformations
 *  - Pre-selected service booking modal trigger
 *  - On-page & modal appointment forms with direct WhatsApp link generator
 *  - Mobile drawer navigation
 *  - FAQ accordion
 *  - Sticky header & back-to-top behavior
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. ANNOUNCEMENT BAR DISMISSAL
  // --------------------------------------------------------------------------
  const announcementBar = document.getElementById('announcementBar');
  const closeAnnouncementBtn = document.getElementById('closeAnnouncement');

  if (closeAnnouncementBtn && announcementBar) {
    closeAnnouncementBtn.addEventListener('click', () => {
      announcementBar.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        announcementBar.style.display = 'none';
      }, 300);
    });
  }

  // --------------------------------------------------------------------------
  // 2. HEADER SCROLL & ACTIVE SECTION NAVIGATION
  // --------------------------------------------------------------------------
  const mainHeader = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }

    // Active link highlighting based on scroll position
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. MOBILE DRAWER NAVIGATION
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --------------------------------------------------------------------------
  // 4. SERVICES CATEGORY FILTER
  // --------------------------------------------------------------------------
  const serviceTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. GALLERY FILTER & INTERACTIVE LIGHTBOX
  // --------------------------------------------------------------------------
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemFilter = item.getAttribute('data-filter');
        if (filter === 'all' || itemFilter === filter) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal Logic
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxBtns = document.querySelectorAll('.lightbox-btn');

  function openLightbox(src, title, desc) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      openLightbox(src, title, desc);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  // --------------------------------------------------------------------------
  // 6. APPOINTMENT MODAL & PRE-SELECTION
  // --------------------------------------------------------------------------
  const appointmentModal = document.getElementById('appointmentModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalTriggers = document.querySelectorAll('.book-modal-trigger');
  const serviceSelectBtns = document.querySelectorAll('.select-service-btn');
  const modalServiceSelect = document.getElementById('modalService');

  function openModal(preselectedService = '') {
    if (!appointmentModal) return;
    if (preselectedService && modalServiceSelect) {
      // Find matching option
      for (let i = 0; i < modalServiceSelect.options.length; i++) {
        if (modalServiceSelect.options[i].value.toLowerCase().includes(preselectedService.toLowerCase()) ||
            preselectedService.toLowerCase().includes(modalServiceSelect.options[i].value.toLowerCase())) {
          modalServiceSelect.selectedIndex = i;
          break;
        }
      }
    }
    appointmentModal.classList.add('active');
    appointmentModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!appointmentModal) return;
    appointmentModal.classList.remove('active');
    appointmentModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => openModal());
  });

  serviceSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      openModal(serviceName);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // --------------------------------------------------------------------------
  // 7. KEYBOARD ESCAPE LISTENER FOR MODALS
  // --------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeModal();
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 8. FAQ ACCORDION LOGIC
  // --------------------------------------------------------------------------
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        currentItem.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 9. ON-PAGE APPOINTMENT FORM SUBMISSION
  // --------------------------------------------------------------------------
  const appointmentForm = document.getElementById('appointmentForm');
  const bookingSuccessBox = document.getElementById('bookingSuccessBox');
  const successSummary = document.getElementById('successSummary');
  const whatsappDirectLink = document.getElementById('whatsappDirectLink');

  if (appointmentForm) {
    // Set default min date to today
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = document.getElementById('serviceSelect').value;
      const date = document.getElementById('preferredDate').value;
      const timeSlot = document.getElementById('timeSlot').value;
      const notes = document.getElementById('clientNotes').value.trim();

      // WhatsApp message construction
      const waText = encodeURIComponent(
        `👑 *New Appointment Request - One Smart Beauty Parlour*\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `✨ *Treatment:* ${service}\n` +
        `📅 *Date:* ${date}\n` +
        `⏰ *Time Slot:* ${timeSlot}\n` +
        (notes ? `📝 *Notes:* ${notes}\n` : '') +
        `\n_Sent via One Smart Beauty Parlour Website_`
      );

      const waUrl = `https://wa.me/8801618554197?text=${waText}`;

      // Update success message
      successSummary.innerHTML = `
        Dear <strong>${name}</strong>, your request for <strong>${service}</strong> on <strong>${date}</strong> (${timeSlot}) has been prepared.
        Click below to dispatch your booking details directly to our parlour via WhatsApp or call us at <strong>01618554197</strong>.
      `;

      whatsappDirectLink.href = waUrl;
      appointmentForm.style.display = 'none';
      bookingSuccessBox.style.display = 'block';
    });
  }

  // --------------------------------------------------------------------------
  // 10. MODAL APPOINTMENT FORM SUBMISSION
  // --------------------------------------------------------------------------
  const modalAppointmentForm = document.getElementById('modalAppointmentForm');
  const modalSuccessBox = document.getElementById('modalSuccessBox');
  const modalSuccessText = document.getElementById('modalSuccessText');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  if (modalAppointmentForm) {
    const modalDate = document.getElementById('modalDate');
    if (modalDate) {
      const today = new Date().toISOString().split('T')[0];
      modalDate.min = today;
      modalDate.value = today;
    }

    modalAppointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modalClientName').value.trim();
      const phone = document.getElementById('modalClientPhone').value.trim();
      const service = document.getElementById('modalService').value;
      const date = document.getElementById('modalDate').value;
      const time = document.getElementById('modalTime').value;

      const waText = encodeURIComponent(
        `👑 *New Appointment Request - One Smart Beauty Parlour*\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `✨ *Treatment:* ${service}\n` +
        `📅 *Date:* ${date}\n` +
        `⏰ *Time Slot:* ${time}\n\n` +
        `_Sent via One Smart Beauty Parlour Website_`
      );

      const waUrl = `https://wa.me/8801618554197?text=${waText}`;

      modalSuccessText.innerHTML = `
        Thank you <strong>${name}</strong>! We've prepared your slot for <strong>${service}</strong> on <strong>${date} (${time})</strong>. Send via WhatsApp to finalize instantly!
      `;

      modalWhatsAppBtn.href = waUrl;
      modalAppointmentForm.style.display = 'none';
      modalSuccessBox.style.display = 'block';
    });
  }

  // --------------------------------------------------------------------------
  // 11. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --------------------------------------------------------------------------
  // 12. DYNAMIC YEAR IN FOOTER
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
