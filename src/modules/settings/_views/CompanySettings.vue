<template>
  <div class="company-settings">
    <u-sections-with-menu>
      <u-indexed-section :menu-title="$t('settings.company.title')">
        <company-form :model-value="form" :loading="isLoading" @update:model-value="onUpdate" />
      </u-indexed-section>
      <template #menu-illustration>
        <img class="picture" src="@/assets/images/company.png" alt="company" />
      </template>
    </u-sections-with-menu>

    <u-action-button-bar class="validate-button" placement="mid">
      <u-button
        collapsable
        type="primary"
        round
        icon="icon-validate"
        :icon-size="24"
        :disabled="!canSave"
        :title="$t('commons.form.save')"
        :label="$t('commons.form.save')"
        @click="save"
      />
      <u-button
        collapsable
        type="tertiary"
        round
        icon="icon-arrow-back"
        :icon-size="24"
        :title="$t('commons.form.back')"
        :label="$t('commons.form.back')"
        @click="goBack"
      />
    </u-action-button-bar>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { UButton, UActionButtonBar, UIndexedSection, USectionsWithMenu } from '@/modules/ui';
  import CompanyForm from '../_components/CompanyForm.vue';
  import { useCompanyStore, CompanyModel } from '@/stores/modules/settings/company';
  import { useNotification } from '@/composables/notfication';

  const router = useRouter();
  const { $successMsg, $errorMsg } = useNotification();
  const companyStore = useCompanyStore();

  const form = ref<CompanyModel | null>(null);
  const original = ref<CompanyModel | null>(null);
  const isLoading = ref(false);

  const canSave = computed(() => {
    if (!form.value) return false;

    // Vérifier les champs requis
    const requiredFields = ['name', 'email', 'timezone'] as const;
    const hasRequiredFields = requiredFields.every((field) => {
      const value = form.value?.[field];
      return value && value.trim() !== '';
    });

    if (!hasRequiredFields) return false;

    // Vérifier le format email
    if (form.value.email && form.value.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.value.email)) return false;
    }

    // Vérifier les valeurs numériques
    if (form.value.defaultVatRatePercentage !== null && form.value.defaultVatRatePercentage !== undefined) {
      if (form.value.defaultVatRatePercentage < 0 || form.value.defaultVatRatePercentage > 100) {
        return false;
      }
    }

    if (form.value.fiscalYearStartMonth !== null && form.value.fiscalYearStartMonth !== undefined) {
      if (form.value.fiscalYearStartMonth < 1 || form.value.fiscalYearStartMonth > 12) {
        return false;
      }
    }

    if (form.value.fiscalYearStartDay !== null && form.value.fiscalYearStartDay !== undefined) {
      if (form.value.fiscalYearStartDay < 1 || form.value.fiscalYearStartDay > 31) {
        return false;
      }
    }

    if (!original.value) return true;

    try {
      const formAPI = form.value.toAPI();
      const originalAPI = original.value.toAPI();

      return (
        formAPI.name !== originalAPI.name ||
        formAPI.tradingName !== originalAPI.tradingName ||
        formAPI.email !== originalAPI.email ||
        formAPI.phoneNumber !== originalAPI.phoneNumber ||
        formAPI.website !== originalAPI.website ||
        formAPI.vatNumber !== originalAPI.vatNumber ||
        formAPI.siretNumber !== originalAPI.siretNumber ||
        formAPI.registrationNumber !== originalAPI.registrationNumber ||
        formAPI.logoUrl !== originalAPI.logoUrl ||
        formAPI.timezone !== originalAPI.timezone ||
        formAPI.defaultVatRatePercentage !== originalAPI.defaultVatRatePercentage ||
        formAPI.fiscalYearStartMonth !== originalAPI.fiscalYearStartMonth ||
        formAPI.fiscalYearStartDay !== originalAPI.fiscalYearStartDay
      );
    } catch (error) {
      console.error('Error in canSave comparison:', error);
      return false;
    }
  });

  function onUpdate(value: CompanyModel) {
    if (!isLoading.value && value) {
      form.value = value;
    }
  }

  async function load() {
    if (isLoading.value) return;

    isLoading.value = true;
    try {
      const data = await companyStore.ensureCompanyFetched(1);

      if (data) {
        form.value = data.clone();
        original.value = data.clone();
      } else {
        form.value = null;
        original.value = null;
      }
    } catch (error) {
      console.error('Error loading company:', error);
      $errorMsg('Failed to load company');
    } finally {
      isLoading.value = false;
    }
  }

  async function save() {
    if (!form.value) return;

    try {
      const saved = await companyStore.updateCompany(form.value);
      form.value = saved.clone();
      original.value = saved.clone();
      $successMsg('Saved');
    } catch (error) {
      console.error('Error saving company:', error);
      $errorMsg('Save failed');
    }
  }

  function goBack() {
    router.back();
  }

  onMounted(() => {
    load();
  });
</script>

<style lang="scss">
  .company-settings {
    display: flex;
    background-color: var(--color-background-light);
    height: 100%;
    overflow: hidden;
  }
</style>
