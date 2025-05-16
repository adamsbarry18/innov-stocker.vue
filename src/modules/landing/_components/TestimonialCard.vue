<template>
  <div class="testimonial-card">
    <div class="rating-container">
      <u-rate :model-value="testimonial.rating" disabled size="small" class="testimonial-stars" />
    </div>
    <p class="testimonial-text">"{{ testimonial.text }}"</p>
    <div class="author-info">
      <img :src="testimonial.authorImageUrl" :alt="testimonial.authorName" class="author-image" />
      <div>
        <h4 class="author-name">{{ testimonial.authorName }}</h4>
        <p class="author-location">{{ testimonial.authorLocation }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { URate } from '@/modules/ui';

  interface Testimonial {
    id: string | number;
    rating: number;
    text: string;
    authorImageUrl: string;
    authorName: string;
    authorLocation: string;
  }

  defineProps({
    testimonial: {
      type: Object as PropType<Testimonial>,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .testimonial-card {
    background-color: var(--color-grey-50);
    padding: 1.5rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: var(--box-shadow-s);

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--box-shadow-xl);
    }

    .rating-container {
      margin-bottom: 1rem;
      .testimonial-stars {
        :deep(.el-rate__icon) {
          color: var(--color-yellow-400);
        }
      }
    }

    .testimonial-text {
      color: var(--color-text-secondary);
      margin-bottom: 1.5rem;
      font-style: italic;
      flex-grow: 1;
      line-height: 1.6;
    }

    .author-info {
      display: flex;
      align-items: center;

      .author-image {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 1rem;
      }

      .author-name {
        font-weight: 700;
        color: var(--color-text-primary);
      }

      .author-location {
        font-size: 0.875rem;
        color: var(--color-text-secondary);
      }
    }
  }
</style>
