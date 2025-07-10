<template>
  <div class="landing-page">
    <u-nav-bar
      :items="navItems"
      default-active="home"
      @nav-select="handleNavSelect"
      @action-click="handleActionClick"
    >
      <template #logo>
        <router-link to="/">
          <img src="@/assets/images/logo_stock_app.png" alt="logo" />
          <span>Innov Stocker</span>
        </router-link>
      </template>
    </u-nav-bar>

    <main>
      <div class="main-content-wrapper">
        <section id="hero">
          <LandingHero />
        </section>

        <section id="features">
          <landing-features :features="features" />
        </section>

        <section id="demo">
          <landing-demo />
        </section>

        <section id="pricing">
          <landing-pricing
            :plans="pricingPlans"
            :billing-period="billingPeriod"
            :billing-options="billingOptions"
            @update:billing-period="billingPeriod = $event"
          />
        </section>

        <section id="testimonials">
          <landing-testimonials :testimonials="testimonials" />
        </section>

        <section id="cta">
          <landing-cta />
        </section>
      </div>
    </main>

    <landing-footer />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { UNavBar } from '@/modules/ui';
  import { NavItem } from '@/modules/ui/layout/navbar.types';
  import {
    LandingHero,
    LandingFeatures,
    LandingDemo,
    LandingPricing,
    LandingTestimonials,
    LandingCta,
    LandingFooter,
  } from '../_components';
  import { Plan, BillingOption } from '../_components/LandingPricing.vue';

  const searchQuery = ref('');

  const testimonials = ref([
    {
      id: 't1',
      rating: 5,
      text: "J'ai commandé un casque audio et je suis impressionné par la qualité sonore. La livraison a été ultra rapide et l'emballage soigné. Je recommande vivement!",
      authorImageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
      authorName: 'Sophie Martin',
      authorLocation: 'Paris, France',
    },
    {
      id: 't2',
      rating: 5,
      text: "Service client exceptionnel! J'ai eu un problème avec ma commande et tout a été résolu en moins de 24h. Les produits sont de très bonne qualité.",
      authorImageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
      authorName: 'Thomas Dubois',
      authorLocation: 'Lyon, France',
    },
    {
      id: 't3',
      rating: 4.5,
      text: 'Ma montre connectée est arrivée avant la date prévue. Elle correspond parfaitement à la description et fonctionne impeccablement. Très satisfait!',
      authorImageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      authorName: 'Émilie Leroy',
      authorLocation: 'Marseille, France',
    },
  ]);

  const features = ref([
    {
      id: 'feature1',
      icon: 'icon-ware-house',
      title: 'Gestion des stocks',
      description:
        'Suivez vos produits en temps réel, gérez les niveaux de stock et recevez des alertes pour les réapprovisionnements.',
    },
    {
      id: 'feature2',
      icon: 'icon-shopping',
      title: 'Achats & Ventes',
      description:
        'Créez des bons de commande, factures et devis en quelques clics. Gérez vos fournisseurs et clients efficacement.',
    },
    {
      id: 'feature3',
      icon: 'icon-budget',
      title: 'Multi-devises',
      description:
        'Travaillez avec différentes devises (USD, Euro, etc.) et bénéficiez de taux de change automatiques.',
    },
    {
      id: 'feature4',
      icon: 'icon-store',
      title: 'Multi-entrepôts',
      description:
        'Gérez plusieurs entrepôts et boutiques, effectuez des transferts entre sites et optimisez votre logistique.',
    },
    {
      id: 'feature5',
      icon: 'icon-history',
      title: 'Historique complet',
      description:
        "Consultez l'historique de toutes vos opérations et générez des rapports détaillés pour une meilleure analyse.",
    },
    {
      id: 'feature6',
      icon: 'icon-locked',
      title: 'Sécurité des données',
      description:
        "Vos données sont sécurisées avec chiffrement SSL, sauvegardes automatiques et contrôle d'accès granulaire.",
    },
  ]);

  const billingPeriod = ref<'monthly' | 'annual'>('monthly');

  const billingOptions = ref<BillingOption[]>([
    { label: 'Mensuel', value: 'monthly' },
    { label: 'Annuel', value: 'annual' },
  ]);

  const pricingPlans = ref<Plan[]>([
    {
      id: 'basic',
      title: 'Basique',
      subtitle: 'Idéal pour les petites entreprises',
      price: { monthly: '€29/mois', annual: '€290/an' },
      period: { monthly: '/mois', annual: '/an' },
      buttonText: 'Choisir le plan Basique',
      buttonType: 'tertiary',
      buttonAction: 'contact', // Scroll to contact section
      features: ['Gestion des stocks de base', "Jusqu'à 50 produits", '1 utilisateur', 'Support par email'],
    },
    {
      id: 'pro',
      title: 'Pro',
      subtitle: 'Pour les entreprises en croissance',
      price: { monthly: '€79/mois', annual: '€790/an' },
      period: { monthly: '/mois', annual: '/an' },
      featured: true,
      buttonText: 'Choisir le plan Pro',
      buttonType: 'primary',
      buttonAction: 'contact', // Scroll to contact section
      features: [
        'Gestion avancée des stocks',
        'Produits illimités',
        "Jusqu'à 10 utilisateurs",
        'Support prioritaire par email et chat',
        'Multi-entrepôts',
      ],
    },
    {
      id: 'enterprise',
      title: 'Entreprise',
      subtitle: 'Solution sur mesure pour grandes entreprises',
      price: { monthly: 'Contactez-nous', annual: 'Contactez-nous' },
      buttonText: 'Nous contacter',
      buttonType: 'tertiary',
      buttonAction: 'contact', // Scroll to contact section
      features: [
        'Fonctionnalités personnalisées',
        'Utilisateurs illimités',
        'Support dédié 24/7',
        'Intégrations API',
        'Formation personnalisée',
      ],
    },
  ]);
  // Example data for nav items (adapt as needed)
  const navItems = computed<NavItem[]>(() => [
    { id: 'features', label: 'Fonctionnalités', type: 'link', value: '#features' },
    { id: 'pricing', label: 'Tarifs', type: 'link', value: '#pricing' },
    { id: 'testimonials', label: 'Témoignages', type: 'link', value: '#testimonials' },
    { id: 'contact', label: 'Contact', type: 'link', value: '#demo' },
    {
      id: 'search',
      label: 'Rechercher',
      type: 'search',
      align: 'right',
      action: 'search',
      props: { placeholder: 'Rechercher...', overflowSideShow: true },
    },
    {
      id: 'demo-action',
      label: 'Demander une démo',
      type: 'button',
      align: 'right',
      action: 'scroll-to-demo',
      props: { type: 'primary' },
    },
  ]);

  const handleNavSelect = (value: string) => {
    console.log('Nav selected:', value);
    // Handle navigation logic if using vue-router links or scrolling
    if (value.startsWith('#')) {
      scrollToSection(value.substring(1));
    } else {
      // Example: router.push(value);
      alert(`Navigation vers: ${value} (À implémenter)`);
    }
  };

  const handleActionClick = (action: string, value?: any) => {
    console.log('Action clicked:', action, value);
    if (action === 'scroll-to-demo') {
      scrollToSection('demo');
    } else if (action === 'search') {
      searchQuery.value = value;
      console.log('Search query updated:', searchQuery.value);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<style lang="scss" scoped>
  .landing-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-background-light);
  }
</style>
