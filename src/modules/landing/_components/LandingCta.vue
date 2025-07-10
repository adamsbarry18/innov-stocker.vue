<template>
  <section class="cta-section">
    <div class="container">
      <div class="section-title">
        <span class="block">Prêt à transformer votre gestion d'entreprise?</span>
        <span class="block">Commencez avec Innov Stocker aujourd'hui.</span>
      </div>
      <p class="section-description">
        Essayez gratuitement pendant 14 jours. Aucune carte de crédit requise.
      </p>
      <u-button type="default" size="large" class="cta-button" @click="redirectToLogin">
        Démarrer l'essai gratuit
      </u-button>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { UButton } from '@/modules/ui';

  import { useRouter } from 'vue-router';

  const router = useRouter();

  const redirectToLogin = async () => {
    await router.push({ name: 'login' });
  };
</script>

<style lang="scss" scoped>
  .cta-section {
    background-color: var(--color-primary-700);
    padding: 64px 20px;

    @media (min-width: 640px) {
      // sm
      padding: 80px 24px;
    }

    @media (min-width: 1024px) {
      // lg
      padding: 80px 32px;
    }
  }

  .cta-section .container {
    max-width: 896px;
    margin: 0 auto;
    text-align: center;
  }

  .cta-section .section-title {
    font-size: 1.875rem;
    font-weight: 800;
    color: var(--color-white);

    span {
      font-size: 30px;
    }

    @media (min-width: 640px) {
      // sm
      font-size: 2.25rem;
    }

    .block {
      display: block;
    }
  }

  .cta-section .section-description {
    margin-top: 16px;
    font-size: 1.125rem;
    line-height: 1.5rem;
    color: var(--color-primary-200);
  }

  .cta-section .cta-button {
    margin-top: 32px;
    width: 100%;
    justify-content: center;
    padding: 12px 20px;
    border: 1px solid transparent;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-primary-600);
    background-color: var(--color-white);
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--color-primary-50);
    }

    @media (min-width: 640px) {
      // sm
      width: auto;
    }
  }
</style>
