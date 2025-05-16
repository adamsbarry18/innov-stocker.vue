<template>
  <section class="testimonials-section">
    <div class="container">
      <div class="text-center">
        <h2 class="section-subtitle">Témoignages</h2>
        <p class="section-title">Ce que nos clients disent</p>
      </div>

      <div class="testimonials-grid">
        <testimonial-card
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :testimonial="testimonial"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import TestimonialCard from './TestimonialCard.vue';

  interface TestimonialData {
    id: string | number;
    rating: number;
    text: string;
    authorImageUrl: string;
    authorName: string;
    authorLocation: string;
  }

  defineProps<{
    testimonials: TestimonialData[];
  }>();
</script>

<style lang="scss" scoped>
  .testimonials-section {
    padding: 60px 20px;
    background-color: var(--color-neutral-50);
    overflow: hidden;

    @media (min-width: 640px) {
      // sm
      padding: 80px 20px;
    }

    @media (min-width: 1024px) {
      // lg
      padding: 100px 20px;
    }
  }

  .testimonials-section .container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .testimonials-section .text-center {
    text-align: center;
  }

  .testimonials-section .section-subtitle {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-primary-600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .testimonials-section .section-title {
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

  .testimonials-section .testimonials-grid {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 32px; // gap-8

    @media (min-width: 640px) {
      // sm
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
      // lg
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
