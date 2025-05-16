<template>
  <section class="demo-section">
    <div class="container">
      <div class="illustration">
        <img src="@/assets/images/try_app_view.jpg" alt="Dashboard StockMaster" />
      </div>
      <div class="content">
        <h2 class="section-title">Essayez StockMaster gratuitement</h2>
        <p class="section-description">
          Découvrez comment StockMaster peut transformer votre gestion d'entreprise. Aucune carte de crédit
          requise.
        </p>
        <div class="demo-form">
          <u-form-input label="Nom complet" placeholder="Votre nom" required />
          <u-form-input label="Email" placeholder="votre.email@example.com" type="email" required />
          <u-form-input label="Entreprise" placeholder="Nom de votre entreprise" required />
          <u-button type="primary" size="large" class="submit-button"> Demander une démo </u-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { UFormInput, UButton } from '@/modules/ui';
</script>

<style lang="scss" scoped>
  .demo-section {
    padding: 60px 20px;
    background-color: var(--color-neutral-100);
    overflow: hidden;

    @media (min-width: 640px) {
      padding: 80px 20px;
    }

    @media (min-width: 1024px) {
      padding: 100px 20px;
    }
  }

  .demo-section .container {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 48px;

    @media (min-width: 1024px) {
      flex-direction: row-reverse;
      align-items: center;
    }
  }

  .demo-section .content {
    flex: 1;
    max-width: 800px;
    margin: 0 auto;

    @media (min-width: 1024px) {
      // lg
      margin: 0;
      padding-right: 32px; // lg:pr-8
    }
  }

  .demo-section .section-title {
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 1.1;
    color: var(--color-text-primary);

    @media (min-width: 640px) {
      // sm
      font-size: 2.625rem;
    }
  }

  .demo-section .section-description {
    margin-top: 12px;
    font-size: 1.125rem;
    color: var(--color-text-secondary);
  }

  .demo-section .demo-form {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px; // space-y-6

    .submit-button {
      width: 100%;
      justify-content: center;
    }
  }

  .demo-section .illustration {
    flex: 1;
    margin-top: 48px; // mt-12
    position: relative;
    max-width: 576px; // sm:max-w-lg
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 1024px) {
      // lg
      margin-top: 0;
      max-width: none; // lg:max-w-none
      margin-left: 0;
      margin-right: 0;
      flex: none;
      width: 50%;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center;
      border-radius: 8px; // rounded-lg
      box-shadow: var(--box-shadow-xl); // shadow-xl
    }
  }
</style>
