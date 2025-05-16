<template>
  <section class="features-section">
    <div class="container">
      <div class="text-center">
        <h2 class="section-subtitle">Fonctionnalités</h2>
        <p class="section-title">Tout ce dont vous avez besoin en un seul endroit</p>
        <p class="section-description">
          Une solution complète pour gérer efficacement tous les aspects de votre entreprise.
        </p>
      </div>

      <div class="features-grid">
        <div v-for="feature in features" :key="feature.id" class="feature-card">
          <div class="feature-icon">
            <icon-base :icon="feature.icon" :size="24" color="var(--color-white)" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { IconBase } from '@/modules/ui';

  interface Feature {
    id: string;
    icon: string;
    title: string;
    description: string;
  }

  defineProps<{
    features: Feature[];
  }>();
</script>

<style lang="scss" scoped>
  .features-section {
    padding: 48px 20px;
    background-color: var(--color-background-white);

    @media (min-width: 640px) {
      // sm
      padding: 60px 20px;
    }

    @media (min-width: 1024px) {
      // lg
      padding: 80px 20px;
    }
  }

  .features-section .container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .features-section .text-center {
    text-align: center;
  }

  .features-section .section-subtitle {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-primary-600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .features-section .section-title {
    margin-top: 8px;
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 1.1;
    color: var(--color-text-primary);

    @media (min-width: 640px) {
      // sm
      font-size: 2.625rem;
    }
  }

  .features-section .section-description {
    margin-top: 16px;
    max-width: 800px;
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    margin-left: auto;
    margin-right: auto;
  }

  .features-section .features-grid {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 40px;

    @media (min-width: 640px) {
      // sm
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
      // lg
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .features-section .feature-card {
    background-color: var(--color-background-white);
    padding: 24px;
    border-radius: 8px;
    box-shadow: var(--box-shadow-m);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--box-shadow-xl);
    }
  }

  .features-section .feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 48px;
    border-radius: 6px;
    background-color: var(--color-primary-500);
    color: var(--color-white);

    svg {
      height: 24px;
      width: 24px;
    }
  }

  .features-section .feature-title {
    margin-top: 20px;
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .features-section .feature-description {
    margin-top: 8px;
    font-size: 1rem;
    color: var(--color-text-secondary);
  }
</style>
