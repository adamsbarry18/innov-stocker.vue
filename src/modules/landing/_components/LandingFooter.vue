<template>
  <footer class="landing-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Section Logo et Description -->
        <div class="footer-section about-us">
          <div class="logo-container">
            <icon-base icon="icon-ware-house" :size="30" color="var(--color-primary-400)" />
            <span class="logo-text">Innov Stocker</span>
          </div>
          <p class="description">
            La solution tout-en-un pour optimiser vos achats, ventes, stocks et finances.
          </p>
          <div class="social-icons">
            <a href="#" aria-label="Facebook"
              ><icon-base icon="icon-facebook" size="20" color="var(--color-neutral-400)"
            /></a>
            <a href="#" aria-label="Twitter"
              ><icon-base icon="icon-twitter" size="20" color="var(--color-neutral-400)"
            /></a>
            <a href="#" aria-label="LinkedIn"
              ><icon-base icon="icon-linkedin" size="20" color="var(--color-neutral-400)"
            /></a>
          </div>
        </div>

        <!-- Section Solutions -->
        <div class="footer-section links-section">
          <h3 class="section-title">Solutions</h3>
          <ul>
            <li><a href="#">Gestion de stock</a></li>
            <li><a href="#">Achats & Ventes</a></li>
            <li><a href="#">Multi-entrepôts</a></li>
            <li><a href="#">Comptabilité</a></li>
          </ul>
        </div>

        <!-- Section Support -->
        <div class="footer-section links-section">
          <h3 class="section-title">Support</h3>
          <ul>
            <li><a href="#pricing">Prix</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <!-- Section Contact -->
        <div class="footer-section contact-section">
          <h3 class="section-title">Contact</h3>
          <ul>
            <li class="contact-item">
              <icon-base icon="icon-pin" :size="18" class="contact-icon" color="var(--color-primary-400)" />
              <span>123 Rue du Commerce, 75001 Paris, France</span>
            </li>
            <li class="contact-item">
              <icon-base icon="icon-tel" :size="18" class="contact-icon" color="var(--color-primary-400)" />
              <span>+33 1 23 45 67 89</span>
            </li>
            <li class="contact-item">
              <icon-base icon="icon-email" :size="18" class="contact-icon" color="var(--color-primary-400)" />
              <span>contact@Innov Stocker.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">© {{ currentYear }} Innov Stocker. Tous droits réservés.</p>
        <div class="payment-icons">
          <!-- Placeholder images for payment icons -->
          <img src="https://via.placeholder.com/40x25/ffffff/000000?text=Visa" alt="Visa" />
          <img src="https://via.placeholder.com/40x25/ffffff/000000?text=MC" alt="Mastercard" />
          <img src="https://via.placeholder.com/40x25/ffffff/000000?text=PayPal" alt="PayPal" />
          <img src="https://via.placeholder.com/40x25/ffffff/000000?text=APay" alt="Apple Pay" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { IconBase } from '@/modules/ui';

  const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
  .landing-footer {
    background-color: var(--color-neutral-800);
    color: var(--color-neutral-400);
    padding: 40px 20px 20px;
  }

  .landing-footer .container {
    max-width: 1280px; // Adjusted max-width
    margin: 0 auto;
  }

  .landing-footer .footer-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 32px; // gap-8

    @media (min-width: 768px) {
      // md
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
      // lg
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .landing-footer .footer-section {
    .section-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-white);
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px; // gap-2

      li a {
        color: var(--color-neutral-400);
        text-decoration: none;
        &:hover {
          color: var(--color-white);
          text-decoration: underline;
        }
      }
    }
  }

  .landing-footer .about-us {
    .logo-container {
      display: flex;
      align-items: center;
      gap: 8px; // gap-2
      margin-bottom: 1rem;

      .logo-text {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--color-white);
      }
    }
    .description {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    .social-icons {
      display: flex;
      align-items: center;
      gap: 16px; // gap-4
      a {
        color: var(--color-neutral-400);
        &:hover {
          color: var(--color-white);
        }
      }
    }
  }

  .landing-footer .contact-section {
    ul {
      gap: 12px; // gap-3
    }
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 12px; // gap-3
      .contact-icon {
        margin-top: 3px;
        color: var(--color-primary-400);
        flex-shrink: 0;
      }
      span {
        line-height: 1.6;
      }
    }
  }

  .landing-footer .footer-bottom {
    border-top: 1px solid var(--color-neutral-800);
    padding-top: 32px; // pt-8
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px; // gap-4
    @media (min-width: 768px) {
      // md
      flex-direction: row;
      justify-content: space-between;
    }

    .copyright {
      margin-bottom: 1rem;
      font-size: 0.875rem;
      @media (min-width: 768px) {
        // md
        margin-bottom: 0;
      }
    }

    .payment-icons {
      display: flex;
      gap: 24px; // gap-6
      img {
        height: 24px;
        filter: grayscale(100%) contrast(0%) brightness(2);
      }
    }
  }
</style>
