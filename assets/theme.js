/**
 * Cossa Rave Shopify Theme - JavaScript
 */

(function() {
  'use strict';

  // --- Accordion ---
  function initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        var item = this.closest('.accordion-item');
        var isOpen = item.classList.contains('is-open');
        
        // Close others in same parent (optional)
        var parent = item.parentElement;
        parent.querySelectorAll('.accordion-item.is-open').forEach(function(openItem) {
          if (openItem !== item) {
            openItem.classList.remove('is-open');
            openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('is-open');
        this.setAttribute('aria-expanded', !isOpen);
      });
    });
  }

  // --- Quantity Selector ---
  function initQuantitySelectors() {
    document.querySelectorAll('[data-quantity-minus]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var input = this.parentElement.querySelector('input[type="number"]');
        var val = parseInt(input.value, 10);
        if (val > 1) {
          input.value = val - 1;
          input.dispatchEvent(new Event('change'));
        }
      });
    });

    document.querySelectorAll('[data-quantity-plus]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var input = this.parentElement.querySelector('input[type="number"]');
        var val = parseInt(input.value, 10);
        input.value = val + 1;
        input.dispatchEvent(new Event('change'));
      });
    });
  }

  // --- Mobile Menu ---
  function initMobileMenu() {
    var toggle = document.querySelector('.site-header__menu-toggle');
    var nav = document.getElementById('mobile-nav');
    
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
      var isOpen = nav.classList.contains('is-open');
      nav.classList.toggle('is-open');
      nav.setAttribute('aria-hidden', isOpen);
      toggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  // --- Newsletter Popup ---
  function initNewsletterPopup() {
    var popup = document.getElementById('newsletter-popup');
    if (!popup) return;

    var dismissed = sessionStorage.getItem('newsletter-dismissed');
    if (dismissed) return;

    var delay = parseInt(popup.closest('[data-section-id]')?.dataset?.delay || '3', 10) * 1000;

    setTimeout(function() {
      popup.classList.add('is-open');
      popup.setAttribute('aria-hidden', 'false');
    }, delay);

    popup.querySelectorAll('[data-close-popup]').forEach(function(el) {
      el.addEventListener('click', function() {
        popup.classList.remove('is-open');
        popup.setAttribute('aria-hidden', 'true');
        sessionStorage.setItem('newsletter-dismissed', 'true');
      });
    });
  }

  // --- Variant Selector ---
  function initVariantSelector() {
    var selects = document.querySelectorAll('.product-page__option-select');
    var variantSelect = document.getElementById('variant-select');
    
    if (!selects.length || !variantSelect) return;

    selects.forEach(function(select) {
      select.addEventListener('change', function() {
        var selectedOptions = [];
        document.querySelectorAll('.product-page__option-select').forEach(function(s) {
          selectedOptions.push(s.value);
        });

        var options = variantSelect.querySelectorAll('option');
        for (var i = 0; i < options.length; i++) {
          if (options[i].textContent.trim().indexOf(selectedOptions.join(' / ')) !== -1) {
            variantSelect.value = options[i].value;
            break;
          }
        }
      });
    });
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
    initQuantitySelectors();
    initMobileMenu();
    initNewsletterPopup();
    initVariantSelector();
  });
})();
