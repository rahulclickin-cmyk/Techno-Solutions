import { MCPClient } from './mcp-client.js';
import fs from 'fs';

const headerStyle = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --ts-primary: #0F2D63;
  --ts-accent: #E5AF2B;
  --ts-dark: #1B1B1B;
  --ts-slate: #5B6470;
  --ts-soft-blue: #F8F9FC;
  --ts-border: #ECECEC;
  --ts-white: #FFFFFF;
}

header.ts-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  background: rgba(6, 24, 59, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 18px 0;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transition: all 0.3s ease;
}

header.ts-header.scrolled {
  background: rgba(6, 24, 59, 0.92);
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

header.ts-header * {
  box-sizing: border-box;
}

.ts-header-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ts-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.ts-logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: transform 0.3s ease;
}

.ts-logo:hover .ts-logo-box {
  transform: scale(1.05);
}

.ts-logo-text {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.ts-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.ts-nav-link {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  padding: 4px 0;
  position: relative;
  transition: color 0.2s ease;
}

.ts-nav-link:hover, .ts-nav-link.active {
  color: #FFFFFF;
}

.ts-nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--ts-accent);
  transition: width 0.3s ease;
}

.ts-nav-link:hover::after, .ts-nav-link.active::after {
  width: 100%;
}

.ts-dropdown {
  position: relative;
}

.ts-dropdown-btn {
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  padding: 4px 0;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;
}

.ts-dropdown:hover .ts-dropdown-btn {
  color: #FFFFFF;
}

.ts-chevron {
  transition: transform 0.3s ease;
}

.ts-dropdown:hover .ts-chevron {
  transform: rotate(180deg);
}

.ts-dropdown-content {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: #0A224E;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  border-radius: 16px;
  padding: 12px;
  width: 260px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  z-index: 100000;
}

.ts-dropdown:hover .ts-dropdown-content {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(5px);
}

.ts-dropdown-item {
  display: block;
  padding: 10px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;
}

.ts-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--ts-accent);
}

.ts-cta {
  display: block;
}

.ts-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--ts-accent);
  color: #06183B;
  text-decoration: none;
  font-weight: 700;
  font-size: 13px;
  padding: 10px 22px;
  border-radius: 30px;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  border: none;
  cursor: pointer;
}

.ts-btn:hover {
  background: #f3c043;
  box-shadow: 0 4px 15px rgba(229, 175, 43, 0.3);
}

.ts-btn:active {
  transform: scale(0.97);
}

.ts-arrow {
  transition: transform 0.3s ease;
}

.ts-btn:hover .ts-arrow {
  transform: translate(3px);
}

.ts-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.ts-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.05);
}

.ts-mobile-menu {
  display: none;
  background: #0A224E;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 20px;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  flex-direction: column;
  gap: 12px;
}

.ts-mobile-link {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: color 0.2s ease;
}

.ts-mobile-link:hover {
  color: #FFFFFF;
}

.ts-mobile-accordion-btn {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.ts-mobile-accordion-content {
  display: none;
  flex-direction: column;
  padding-left: 16px;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.ts-mobile-sub-link {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  padding: 6px 0;
}

.ts-mobile-sub-link:hover {
  color: var(--ts-accent);
}

@media (max-width: 991px) {
  .ts-nav, .ts-cta {
    display: none;
  }
  
  .ts-menu-toggle {
    display: block;
  }
  
  .ts-mobile-menu.open {
    display: flex;
  }
}
</style>
`;

const headerHTML = `
${headerStyle}
<header class="ts-header">
  <div class="ts-header-container">
    <a href="/" class="ts-logo">
      <div class="ts-logo-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E5AF2B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>
      </div>
      <span class="ts-logo-text">TECHNO-SOLUTIONS</span>
    </a>
    <nav class="ts-nav">
      <a href="/" class="ts-nav-link active">Home</a>
      <a href="/about/" class="ts-nav-link">About</a>
      <div class="ts-dropdown">
        <button class="ts-dropdown-btn">
          Services
          <svg class="ts-chevron" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="ts-dropdown-content">
          <a href="/digital-transformation/" class="ts-dropdown-item">Digital Transformation</a>
          <a href="/business-automation/" class="ts-dropdown-item">Business Automation</a>
          <a href="/artificial-intelligence/" class="ts-dropdown-item">Artificial Intelligence</a>
          <a href="/blockchain-crypto/" class="ts-dropdown-item">Blockchain & Crypto</a>
          <a href="/smart-home/" class="ts-dropdown-item">Smart Home Installation</a>
          <a href="/solar-energy/" class="ts-dropdown-item">Solar Panel Installation</a>
        </div>
      </div>
      <a href="/blog/" class="ts-nav-link">Blog</a>
      <a href="/contact/" class="ts-nav-link">Contact</a>
    </nav>
    <div class="ts-cta">
      <a href="/contact/" class="ts-btn">Book Consultation <svg class="ts-arrow" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
    </div>
    <button class="ts-menu-toggle" id="ts-menu-toggle">
      <svg class="ts-menu-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
  </div>
  <div class="ts-mobile-menu" id="ts-mobile-menu">
    <a href="/" class="ts-mobile-link">Home</a>
    <a href="/about/" class="ts-mobile-link">About</a>
    <div class="ts-mobile-accordion">
      <button class="ts-mobile-accordion-btn">
        Services
        <svg class="ts-chevron-mob" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="ts-mobile-accordion-content" id="ts-mobile-accordion-content">
        <a href="/digital-transformation/" class="ts-mobile-sub-link">Digital Transformation</a>
        <a href="/business-automation/" class="ts-mobile-sub-link">Business Automation</a>
        <a href="/artificial-intelligence/" class="ts-mobile-sub-link">Artificial Intelligence</a>
        <a href="/blockchain-crypto/" class="ts-mobile-sub-link">Blockchain & Crypto</a>
        <a href="/smart-home/" class="ts-mobile-sub-link">Smart Home Installation</a>
        <a href="/solar-energy/" class="ts-mobile-sub-link">Solar Panel Installation</a>
      </div>
    </div>
    <a href="/blog/" class="ts-mobile-link">Blog</a>
    <a href="/contact/" class="ts-mobile-link">Contact</a>
    <a href="/contact/" class="ts-btn" style="margin-top: 15px; text-align: center; justify-content: center;">Book Consultation</a>
  </div>
</header>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('ts-menu-toggle');
  const mobileMenu = document.getElementById('ts-mobile-menu');
  const accordionBtn = document.querySelector('.ts-mobile-accordion-btn');
  const accordionContent = document.getElementById('ts-mobile-accordion-content');
  const chevron = document.querySelector('.ts-chevron-mob');
  const header = document.querySelector('.ts-header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  });
  
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
    });
  }
  
  if (accordionBtn && accordionContent) {
    accordionBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (accordionContent.style.display === 'flex') {
        accordionContent.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        accordionContent.style.display = 'flex';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  }
  
  document.addEventListener('click', function() {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
    }
  });
});
</script>
<div style="height: 70px;"></div> <!-- Spacer to prevent sticky header from overlapping content -->
`;

const footerStyle = `
<style>
footer.ts-footer {
  background: #06183B;
  color: #ffffff;
  padding: 80px 0 40px 0;
  font-family: 'Inter', sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

footer.ts-footer * {
  box-sizing: border-box;
}

.ts-footer-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
}

.ts-footer-grid {
  display: grid;
  grid-template-cols: repeat(12, 1fr);
  gap: 48px;
  padding-bottom: 64px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.ts-footer-col-4 {
  grid-column: span 4;
}

.ts-footer-col-2 {
  grid-column: span 2;
}

.ts-footer-col-3 {
  grid-column: span 3;
}

.ts-footer-brand-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-bottom: 24px;
}

.ts-footer-brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--ts-white);
}

.ts-footer-brand-text {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--ts-white);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.ts-footer-desc {
  font-size: 13px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
}

.ts-footer-socials {
  display: flex;
  gap: 12px;
}

.ts-footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  text-decoration: none;
}

.ts-footer-social-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ts-accent);
  border-color: var(--ts-accent);
}

.ts-footer-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ts-accent);
  margin-bottom: 24px;
  margin-top: 0;
}

.ts-footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ts-footer-links a {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s ease;
}

.ts-footer-links a:hover {
  color: var(--ts-white);
}

.ts-footer-contact-item {
  display: flex;
  gap: 12px;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
}

.ts-footer-contact-item svg {
  color: var(--ts-accent);
  flex-shrink: 0;
}

.ts-footer-contact-item a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s ease;
}

.ts-footer-contact-item a:hover {
  color: var(--ts-white);
}

.ts-footer-bottom {
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.ts-footer-legal-links {
  display: flex;
  gap: 24px;
}

.ts-footer-legal-links a {
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: color 0.2s ease;
}

.ts-footer-legal-links a:hover {
  color: var(--ts-white);
}

@media (max-width: 991px) {
  .ts-footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .ts-footer-col-4, .ts-footer-col-3, .ts-footer-col-2 {
    grid-column: span 1;
  }
}

@media (max-width: 575px) {
  .ts-footer-grid {
    grid-template-columns: 1fr;
  }
  .ts-footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  .ts-footer-legal-links {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
}
</style>
`;

const footerHTML = `
${footerStyle}
<footer class="ts-footer">
  <div class="ts-footer-container">
    <div class="ts-footer-grid">
      <div class="ts-footer-col-4">
        <a href="/" class="ts-footer-brand-link">
          <div class="ts-footer-brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F2D63" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>
          </div>
          <span class="ts-footer-brand-text">TECHNO-SOLUTIONS</span>
        </a>
        <p class="ts-footer-desc">
          An elite technology partner offering custom-engineered business automation, enterprise cloud systems, digital transformation, secure Web3 blockchain consensus, and high-conversion solar energy grids.
        </p>
        <div class="ts-footer-socials">
          <a href="https://linkedin.com" target="_blank" class="ts-footer-social-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="https://facebook.com" target="_blank" class="ts-footer-social-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          <a href="https://instagram.com" target="_blank" class="ts-footer-social-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
          <a href="https://youtube.com" target="_blank" class="ts-footer-social-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
        </div>
      </div>
      <div class="ts-footer-col-2">
        <h3 class="ts-footer-title">Quick Links</h3>
        <ul class="ts-footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about/">About Us</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
      <div class="ts-footer-col-3">
        <h3 class="ts-footer-title">Our Services</h3>
        <ul class="ts-footer-links">
          <li><a href="/digital-transformation/">Digital Transformation</a></li>
          <li><a href="/business-automation/">Business Automation</a></li>
          <li><a href="/artificial-intelligence/">Artificial Intelligence</a></li>
          <li><a href="/blockchain-crypto/">Blockchain & Crypto</a></li>
          <li><a href="/smart-home/">Smart Home Installation</a></li>
          <li><a href="/solar-energy/">Solar Panel Installation</a></li>
        </ul>
      </div>
      <div class="ts-footer-col-3">
        <h3 class="ts-footer-title">Contact Desk</h3>
        <div style="font-size: 13px; font-weight: bold; color: rgba(255,255,255,0.9); margin-bottom: 12px;">Sanjeev Goel</div>
        <div class="ts-footer-contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092 | India</span>
        </div>
        <div class="ts-footer-contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <a href="tel:+919811841782">+91 9811841782</a>
        </div>
        <div class="ts-footer-contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <a href="mailto:info2sanjeev@gmail.com">info2sanjeev@gmail.com</a>
        </div>
      </div>
    </div>
    <div class="ts-footer-bottom">
      <p>© 2026 Techno-Solutions. All Rights Reserved.</p>
      <div class="ts-footer-legal-links">
        <a href="/contact/">SLA Assurance</a>
        <a href="/contact/">Privacy Shield</a>
        <a href="/contact/">Terms of Node Deployment</a>
      </div>
    </div>
  </div>
</footer>
`;

async function main() {
  const client = new MCPClient();
  try {
    console.log('Connecting to Elementor MCP...');
    await client.connect();

    console.log('Setting page layout template to "Elementor Canvas" to hide default theme headers and sitemaps...');
    await client.callTool('elementor-mcp-update-page-settings', {
      post_id: 8,
      settings: {
        template: 'elementor_canvas',
        page_template: 'elementor_canvas'
      }
    });
    
    console.log('Scanning page structure for existing headers and footers to clean up first...');
    const result = await client.callTool('elementor-mcp-get-page-structure', { post_id: 8 });
    const structure = result.structuredContent?.structure || result.structure || [];
    
    const elementsToRemove = [];
    function scan(element) {
      if (!element) return false;
      if (element.elType === 'widget' && element.widgetType === 'html') {
        const html = element.settings_summary?.html || '';
        if (html.includes('ts-header') || html.includes('ts-footer')) {
          return true;
        }
      }
      if (element.elements && Array.isArray(element.elements)) {
        for (const child of element.elements) {
          if (scan(child)) return true;
        }
      }
      return false;
    }

    for (const item of structure) {
      if (item.elType === 'container' || item.elType === 'section') {
        if (scan(item)) {
          console.log(`Found existing header/footer inside top-level element ${item.id}`);
          elementsToRemove.push(item.id);
        }
      }
    }

    if (elementsToRemove.length > 0) {
      console.log(`Removing ${elementsToRemove.length} existing header/footer elements to prevent duplicates...`);
      for (const id of elementsToRemove) {
        await client.callTool('elementor-mcp-remove-element', {
          post_id: 8,
          element_id: id
        });
      }
    }
    
    console.log('Creating top-level container for Header at position 0...');
    const headerContainer = await client.callTool('elementor-mcp-add-container', {
      post_id: 8,
      position: 0,
      settings: {
        content_width: 'full',
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      }
    });
    console.log('Header Container Created:', headerContainer);
    
    const headerId = headerContainer.structuredContent?.element_id || 
                     (headerContainer.content && JSON.parse(headerContainer.content[0].text).element_id) || 
                     headerContainer.element_id;
    console.log('Extracted Header Container ID:', headerId);
    
    console.log('Adding Header HTML widget inside Header container...');
    const headerResult = await client.callTool('elementor-mcp-add-html', {
      post_id: 8,
      parent_id: headerId,
      position: 0,
      html: headerHTML
    });
    console.log('Header Widget Add Result:', headerResult);
    
    console.log('Creating top-level container for Footer at position -1...');
    const footerContainer = await client.callTool('elementor-mcp-add-container', {
      post_id: 8,
      position: -1,
      settings: {
        content_width: 'full',
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      }
    });
    console.log('Footer Container Created:', footerContainer);
    
    const footerId = footerContainer.structuredContent?.element_id || 
                     (footerContainer.content && JSON.parse(footerContainer.content[0].text).element_id) || 
                     footerContainer.element_id;
    console.log('Extracted Footer Container ID:', footerId);
    
    console.log('Adding Footer HTML widget inside Footer container...');
    const footerResult = await client.callTool('elementor-mcp-add-html', {
      post_id: 8,
      parent_id: footerId,
      position: 0,
      html: footerHTML
    });
    console.log('Footer Widget Add Result:', footerResult);
    
    console.log('Home page elements successfully updated.');
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    client.close();
  }
}

main();
