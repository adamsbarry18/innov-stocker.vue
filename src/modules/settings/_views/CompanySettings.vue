<template>
  <div class="company-settings">
    <u-sections-with-menu>
      <u-indexed-section :menu-title="$t('settings.company.title')">
        <company-form :model-value="form" @update:model-value="onUpdate" />
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

  const canSave = computed(() => {
    if (!form.value) return false;

    const requiredFields = ['name'] as const;
    const hasRequiredFields = requiredFields.every((field) => {
      const value = form.value?.[field];
      return value && value.trim() !== '';
    });

    if (!hasRequiredFields) return false;

    if (form.value.email && form.value.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.value.email)) return false;
    }

    if (!original.value) return true;

    try {
      const formAPI = form.value.toAPI();
      const originalAPI = original.value.toAPI();

      return (
        formAPI.name !== originalAPI.name ||
        formAPI.email !== originalAPI.email ||
        formAPI.phone !== originalAPI.phone ||
        formAPI.website !== originalAPI.website ||
        formAPI.legalName !== originalAPI.legalName ||
        formAPI.vatNumber !== originalAPI.vatNumber ||
        formAPI.siret !== originalAPI.siret ||
        formAPI.addressLine1 !== originalAPI.addressLine1 ||
        formAPI.addressLine2 !== originalAPI.addressLine2 ||
        formAPI.city !== originalAPI.city ||
        formAPI.postalCode !== originalAPI.postalCode ||
        formAPI.country !== originalAPI.country
      );
    } catch (error) {
      console.error('Error in canSave comparison:', error);
      return false;
    }
  });

  // Accepter directement la valeur mise à jour
  function onUpdate(value: CompanyModel) {
    form.value = value;
  }

  async function load() {
    try {
      const data = await companyStore.fetchCompany(1);

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

  onMounted(load);
</script>

<style lang="scss">
  .company-settings {
    display: flex;
    background-color: var(--color-background-light);
    height: 100%;
    overflow: hidden;
  }
</style>
