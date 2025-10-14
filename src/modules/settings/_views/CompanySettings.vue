<template>
  <div class="company-settings">
    <u-sections-with-menu>
      <u-indexed-section :menu-title="$t('settings.company.title')">
        <company-form :model-value="form" :loading="isLoading" @update:model-value="onUpdate" />
      </u-indexed-section>
      <template #menu-illustration>
        <img class="picture" src="@/assets/images/svg/company.svg" alt="company" />
      </template>
    </u-sections-with-menu>

    <u-action-button-bar class="validate-button" placement="mid">
      <u-button
        collapsable
        type="primary"
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

  const isLoading = computed(() => companyStore.isLoading);

  const canSave = computed(() => {
    if (!form.value || !original.value) return false;
    return JSON.stringify(form.value.toAPI()) !== JSON.stringify(original.value.toAPI());
  });

  function onUpdate(value: CompanyModel) {
    form.value = value.clone();
  }

  async function load() {
    try {
      const data = await companyStore.fetchCompany(1);
      form.value = data ? data.clone() : null;
      original.value = data ? data.clone() : null;
    } catch (e) {
      $errorMsg('Failed to load company');
    }
  }

  async function save() {
    if (!form.value) return;
    try {
      const saved = await companyStore.updateCompany(form.value);
      original.value = saved.clone();
      form.value = saved.clone();
      $successMsg('Saved');
    } catch (e) {
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
