<template>
  <u-card>
    <div class="grid">
      <u-form-input v-model="local.name" :label="$t('commons.form.name')" :error="errors.name" required />
      <u-form-input v-model="local.tradingName" :label="$t('company.form.tradingName')" />
      <u-form-input v-model="local.email" :label="$t('commons.form.email')" :error="errors.email" required />
      <u-form-input v-model="local.phoneNumber" :label="$t('company.form.phone')" />
      <u-form-input v-model="local.website" :label="$t('company.form.website')" />
      <u-form-input v-model="local.vatNumber" :label="$t('company.form.vat')" />
      <u-form-input v-model="local.siretNumber" :label="$t('company.form.siret')" />
      <u-form-input v-model="local.registrationNumber" :label="$t('company.form.registrationNumber')" />
      <u-form-input v-model="local.logoUrl" :label="$t('company.form.logoUrl')" />
      <u-form-input
        v-model="local.timezone"
        :label="$t('company.form.timezone')"
        :error="errors.timezone"
        required
      />
      <u-form-input
        v-model="local.defaultVatRatePercentage"
        type="number"
        :label="$t('company.form.defaultVatRate')"
        :error="errors.defaultVatRatePercentage"
        :min="0"
        :max="100"
        :step="0.01"
      />
      <u-form-input
        v-model="local.fiscalYearStartMonth"
        type="number"
        :min="1"
        :max="12"
        :label="$t('company.form.fiscalYearStartMonth')"
        :error="errors.fiscalYearStartMonth"
      />
      <u-form-input
        v-model="local.fiscalYearStartDay"
        type="number"
        :min="1"
        :max="31"
        :label="$t('company.form.fiscalYearStartDay')"
        :error="errors.fiscalYearStartDay"
      />
    </div>
  </u-card>
</template>

<script setup lang="ts">
  import { watch, reactive, computed, onUnmounted } from 'vue';
  import { UCard, UFormInput } from '@/modules/ui';
  import { CompanyModel } from '@/stores/modules/settings/company';

  const props = defineProps<{ modelValue: CompanyModel | null; loading?: boolean }>();
  const emit = defineEmits<{ (e: 'update:model-value', value: CompanyModel): void }>();

  const local = reactive<Partial<CompanyModel>>({
    name: '',
    tradingName: null,
    email: '',
    phoneNumber: null,
    website: null,
    vatNumber: null,
    siretNumber: null,
    registrationNumber: null,
    logoUrl: null,
    addressId: 0,
    address: null,
    defaultCurrencyId: 0,
    defaultCurrency: null,
    defaultVatRatePercentage: null,
    fiscalYearStartMonth: null,
    fiscalYearStartDay: null,
    timezone: 'Europe/Paris',
    termsAndConditionsDefaultPurchase: null,
    termsAndConditionsDefaultSale: null,
    bankAccountDetailsForInvoices: null,
    createdAt: null,
    updatedAt: null,
  });

  const errors = computed(() => {
    const err: Record<string, string | undefined> = {};

    if (!local.name || local.name.trim() === '') {
      err.name = 'Le nom de la compagnie est requis';
    }

    if (!local.email || local.email.trim() === '') {
      err.email = "L'adresse email est requise";
    } else if (local.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(local.email)) {
      err.email = 'Veuillez saisir une adresse email valide';
    }

    if (!local.timezone || local.timezone.trim() === '') {
      err.timezone = 'Le fuseau horaire est requis';
    }

    if (
      local.defaultVatRatePercentage !== null &&
      local.defaultVatRatePercentage !== undefined &&
      (local.defaultVatRatePercentage < 0 || local.defaultVatRatePercentage > 100)
    ) {
      err.defaultVatRatePercentage = 'Le taux de TVA doit être entre 0 et 100';
    }

    if (
      local.fiscalYearStartMonth !== null &&
      local.fiscalYearStartMonth !== undefined &&
      (local.fiscalYearStartMonth < 1 || local.fiscalYearStartMonth > 12)
    ) {
      err.fiscalYearStartMonth = 'Le mois doit être entre 1 et 12';
    }

    if (
      local.fiscalYearStartDay !== null &&
      local.fiscalYearStartDay !== undefined &&
      (local.fiscalYearStartDay < 1 || local.fiscalYearStartDay > 31)
    ) {
      err.fiscalYearStartDay = 'Le jour doit être entre 1 et 31';
    }

    return err;
  });

  watch(
    () => props.modelValue,
    (v) => {
      if (props.loading) return;

      if (v) {
        Object.assign(local, {
          ...v,
          defaultVatRatePercentage: v.defaultVatRatePercentage !== null ? Number(v.defaultVatRatePercentage) : null,
          fiscalYearStartMonth: v.fiscalYearStartMonth !== null ? Number(v.fiscalYearStartMonth) : null,
          fiscalYearStartDay: v.fiscalYearStartDay !== null ? Number(v.fiscalYearStartDay) : null,
        });
      }
    },
    { immediate: true, flush: 'post' }
  );

  let updateTimer: number | null = null;

  watch(
    () => ({ ...local }),
    (v) => {
      if (props.loading) return;

      if (updateTimer) {
        clearTimeout(updateTimer);
      }

      updateTimer = window.setTimeout(() => {
        if (props.modelValue && v) {
          const updated = new CompanyModel({
            ...props.modelValue,
            ...v,
            defaultVatRatePercentage: v.defaultVatRatePercentage !== null && v.defaultVatRatePercentage !== undefined ? Number(v.defaultVatRatePercentage) : null,
            fiscalYearStartMonth: v.fiscalYearStartMonth !== null && v.fiscalYearStartMonth !== undefined ? Number(v.fiscalYearStartMonth) : null,
            fiscalYearStartDay: v.fiscalYearStartDay !== null && v.fiscalYearStartDay !== undefined ? Number(v.fiscalYearStartDay) : null,
          });
          emit('update:model-value', updated);
        }
      }, 100);
    },
    { deep: true, flush: 'post' }
  );

  onUnmounted(() => {
    if (updateTimer) {
      window.clearTimeout(updateTimer);
    }
  });
</script>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
</style>
