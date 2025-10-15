<template>
  <u-card>
    <div class="grid">
      <u-form-input v-model="local.name" :label="$t('commons.form.name')" required @input="handleUpdate" />
      <u-form-input v-model="local.legalName" :label="$t('company.form.legalName')" @input="handleUpdate" />
      <u-form-input v-model="local.email" :label="$t('commons.form.email')" @input="handleUpdate" />
      <u-form-input v-model="local.phone" :label="$t('company.form.phone')" @input="handleUpdate" />
      <u-form-input v-model="local.website" :label="$t('company.form.website')" @input="handleUpdate" />
      <u-form-input v-model="local.vatNumber" :label="$t('company.form.vat')" @input="handleUpdate" />
      <u-form-input v-model="local.siret" :label="$t('company.form.siret')" @input="handleUpdate" />

      <u-form-input v-model="local.addressLine1" :label="$t('company.form.address1')" @input="handleUpdate" />
      <u-form-input v-model="local.addressLine2" :label="$t('company.form.address2')" @input="handleUpdate" />
      <u-form-input v-model="local.postalCode" :label="$t('company.form.postalCode')" @input="handleUpdate" />
      <u-form-input v-model="local.city" :label="$t('company.form.city')" @input="handleUpdate" />
      <u-form-input v-model="local.country" :label="$t('company.form.country')" @input="handleUpdate" />
    </div>
  </u-card>
</template>

<script setup lang="ts">
  import { watch, reactive, ref } from 'vue';
  import { UCard } from '@/modules/ui';
  import { UFormInput } from '@/modules/ui';
  import { CompanyModel } from '@/stores/modules/settings/company';

  const props = defineProps<{ modelValue: CompanyModel | null; loading?: boolean }>();
  const emit = defineEmits<{ (e: 'update:model-value', value: CompanyModel): void }>();

  const isInternalUpdate = ref(false);

  const local = reactive<Partial<CompanyModel>>({
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
    (newValue) => {
      if (newValue && !isInternalUpdate.value) {
        Object.assign(local, newValue);
      }
    },
    { immediate: true }
  );

  function handleUpdate() {
    if (props.modelValue) {
      isInternalUpdate.value = true;
      const updated = new CompanyModel({ ...props.modelValue, ...local });
      emit('update:model-value', updated);

      setTimeout(() => {
        isInternalUpdate.value = false;
      }, 0);
    }
  }
</script>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
</style>
