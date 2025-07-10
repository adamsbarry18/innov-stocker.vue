<template>
  <section class="hero-section">
    <div class="container">
      <div class="content">
        <div class="title">
          <span class="block">Gérez votre stock </span><br />
          <span class="block text-primary">avec simplicité</span>
        </div>
        <p class="subtitle">
          La solution tout-en-un pour optimiser vos achats, ventes, stocks et finances. Prenez le contrôle de
          votre entreprise avec Innov Stocker.
        </p>
        <div class="actions">
          <u-button type="primary" size="large" @click="redirectToLogin"> Essai gratuit </u-button>
          <u-button type="default" size="large" @click="scrollToSection('features')">
            En savoir plus
          </u-button>
        </div>
      </div>
      <div class="illustration">
        <u-lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_5tkzkblw.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></u-lottie-player>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { UButton, ULottiePlayer } from '@/modules/ui';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const redirectToLogin = async () => {
    await router.push({ name: 'login' });
  };

  /**
   * Scrolls to a specific section on the page.
   * @param id The ID of the section to scroll to.
   */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<style lang="scss" scoped>
  .hero-section {
    background-color: var(--color-primary-200);
    color: var(--color-text-primary);
    padding: 60px 20px;
    text-align: center;

    @media (min-width: 1024px) {
      // lg
      text-align: left;
    }
  }

  .hero-section .container {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 48px;

    @media (min-width: 1024px) {
      // lg
      flex-direction: row;
      align-items: center;
    }
  }

  .hero-section .content {
    flex: 1;
    max-width: 800px;
    margin: 0 auto;

    @media (min-width: 1024px) {
      // lg
      margin: 0;
    }
  }

  .hero-section .title {
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-text-primary);
    margin-bottom: 1.5rem;

    span {
      font-size: 60px;
    }
  }

  .hero-section .title .text-primary {
    color: var(--color-primary-600);
  }

  .hero-section .subtitle {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: var(--color-text-secondary);
    margin-bottom: 2.5rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 1024px) {
      // lg
      margin-left: 0;
      margin-right: 0;
    }
  }

  .hero-section .actions {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    @media (min-width: 640px) {
      // sm
      flex-direction: row;
      justify-content: center;
    }

    @media (min-width: 1024px) {
      // lg
      justify-content: flex-start;
    }
  }

  .hero-section .actions .u-button {
    width: 100%;
    @media (min-width: 640px) {
      // sm
      width: auto;
    }
  }

  .hero-section .illustration {
    flex: 1;
    margin-top: 3rem;
    position: relative;
    max-width: 576px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 1024px) {
      // lg
      margin-top: 0;
      max-width: none;
      margin-left: 0;
      margin-right: 0;
      flex: none;
      width: 50%;
    }
  }

  .hero-section .illustration lottie-player {
    background-color: var(--color-white);
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: var(--box-shadow-xl);
  }
</style>
