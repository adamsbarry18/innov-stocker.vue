<template>
  <u-card>
    <div class="grid">
      <u-form-input v-model="local.name" :label="$t('commons.form.name')" required />
      <u-form-input v-model="local.legalName" :label="$t('company.form.legalName')" />
      <u-form-input v-model="local.email" :label="$t('commons.form.email')" />
      <u-form-input v-model="local.phone" :label="$t('company.form.phone')" />
      <u-form-input v-model="local.website" :label="$t('company.form.website')" />
      <u-form-input v-model="local.vatNumber" :label="$t('company.form.vat')" />
      <u-form-input v-model="local.siret" :label="$t('company.form.siret')" />

      <u-form-input v-model="local.addressLine1" :label="$t('company.form.address1')" />
      <u-form-input v-model="local.addressLine2" :label="$t('company.form.address2')" />
      <u-form-input v-model="local.postalCode" :label="$t('company.form.postalCode')" />
      <u-form-input v-model="local.city" :label="$t('company.form.city')" />
      <u-form-input v-model="local.country" :label="$t('company.form.country')" />
    </div>
  </u-card>
</template>

<script setup lang="ts">
  import { watch, reactive } from 'vue';
  import { UCard } from '@/modules/ui';
  import { UFormInput } from '@/modules/ui';
  import { CompanyModel } from '@/stores/modules/settings/company';

  const props = defineProps<{ modelValue: CompanyModel | null; loading?: boolean }>();
  const emit = defineEmits<{ (e: 'update:model-value', value: CompanyModel): void }>();

  const local = reactive<Partial<CompanyModel>>({
    id: 1,
    name: '',
    legalName: null,
    email: null,
    phone: null,
    website: null,
    vatNumber: null,
    siret: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    postalCode: null,
    country: null,
    logoUrl: null,
    currencyCode: null,
    createdAt: null,
    updatedAt: null,
  });

  watch(
    () => props.modelValue,
    (v) => {
      if (v) {
        Object.assign(local, v);
      }
    },
    { immediate: true }
  );

  watch(
    () => ({ ...local }),
    (v) => {
      if (props.modelValue) {
        const updated = new CompanyModel({ ...props.modelValue, ...v });
        emit('update:model-value', updated);
      }
    },
    { deep: true }
  );
</script>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
</style>
