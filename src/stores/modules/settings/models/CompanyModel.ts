import dayjs from 'dayjs';
import { deepCopy } from '@/libs/utils/Object';

export default class CompanyModel {
  id: number;
  name: string;
  tradingName: string | null;
  addressId: number;
  address?: any;
  vatNumber: string | null;
  siretNumber: string | null;
  registrationNumber: string | null;
  email: string;
  phoneNumber: string | null;
  website: string | null;
  logoUrl: string | null;
  defaultCurrencyId: number;
  defaultCurrency?: any;
  defaultVatRatePercentage: number | null;
  fiscalYearStartMonth: number | null;
  fiscalYearStartDay: number | null;
  timezone: string;
  termsAndConditionsDefaultPurchase: string | null;
  termsAndConditionsDefaultSale: string | null;
  bankAccountDetailsForInvoices: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(data?: Partial<CompanyModel>) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? '';
    this.tradingName = data?.tradingName ?? null;
    this.addressId = data?.addressId ?? 0;
    this.address = data?.address;
    this.vatNumber = data?.vatNumber ?? null;
    this.siretNumber = data?.siretNumber ?? null;
    this.registrationNumber = data?.registrationNumber ?? null;
    this.email = data?.email ?? '';
    this.phoneNumber = data?.phoneNumber ?? null;
    this.website = data?.website ?? null;
    this.logoUrl = data?.logoUrl ?? null;
    this.defaultCurrencyId = data?.defaultCurrencyId ?? 0;
    this.defaultCurrency = data?.defaultCurrency;
    this.defaultVatRatePercentage = data?.defaultVatRatePercentage ?? null;
    this.fiscalYearStartMonth = data?.fiscalYearStartMonth ?? null;
    this.fiscalYearStartDay = data?.fiscalYearStartDay ?? null;
    this.timezone = data?.timezone ?? 'Europe/Paris';
    this.termsAndConditionsDefaultPurchase = data?.termsAndConditionsDefaultPurchase ?? null;
    this.termsAndConditionsDefaultSale = data?.termsAndConditionsDefaultSale ?? null;
    this.bankAccountDetailsForInvoices = data?.bankAccountDetailsForInvoices ?? null;
    this.createdAt = data?.createdAt ? dayjs(data.createdAt).toDate() : new Date();
    this.updatedAt = data?.updatedAt ? dayjs(data.updatedAt).toDate() : new Date();
  }

  /**
   * Transform API object into CompanyModel instance (dates as string or Date)
   */
  static fromAPI(company: any): CompanyModel {
    const modelData = {
      id: company.id ?? 0,
      name: company.name ?? '',
      tradingName: company.tradingName ?? null,
      addressId: company.address?.id ?? company.addressId ?? 0,
      address: company.address ?? null,
      vatNumber: company.vatNumber ?? null,
      siretNumber: company.siretNumber ?? null,
      registrationNumber: company.registrationNumber ?? null,
      email: company.email ?? '',
      phoneNumber: company.phoneNumber ?? null,
      website: company.website ?? null,
      logoUrl: company.logoUrl ?? null,
      defaultCurrencyId: company.defaultCurrency?.id ?? company.defaultCurrencyId ?? 0,
      defaultCurrency: company.defaultCurrency ?? null,
      defaultVatRatePercentage: company.defaultVatRatePercentage !== null ? Number(company.defaultVatRatePercentage) : null,
      fiscalYearStartMonth: company.fiscalYearStartMonth !== null ? Number(company.fiscalYearStartMonth) : null,
      fiscalYearStartDay: company.fiscalYearStartDay !== null ? Number(company.fiscalYearStartDay) : null,
      timezone: company.timezone ?? 'Europe/Paris',
      termsAndConditionsDefaultPurchase: company.termsAndConditionsDefaultPurchase ?? null,
      termsAndConditionsDefaultSale: company.termsAndConditionsDefaultSale ?? null,
      bankAccountDetailsForInvoices: company.bankAccountDetailsForInvoices ?? null,
      createdAt: company.createdAt ? dayjs(company.createdAt).toDate() : new Date(),
      updatedAt: company.updatedAt ? dayjs(company.updatedAt).toDate() : new Date(),
    };

    return new CompanyModel(modelData);
  }

  /**
   * Returns the display name (trading name if available, otherwise name)
   */
  get displayName(): string {
    return this.tradingName || this.name;
  }

  /**
   * Prepare object for API (convert dates to ISO string, remove frontend-only fields)
   */
  toAPI(): any {
    return {
      name: this.name,
      tradingName: this.tradingName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      website: this.website,
      vatNumber: this.vatNumber,
      siretNumber: this.siretNumber,
      registrationNumber: this.registrationNumber,
      logoUrl: this.logoUrl,
      addressId: this.addressId,
      defaultCurrencyId: this.defaultCurrencyId,
      defaultVatRatePercentage: this.defaultVatRatePercentage !== null ? Number(this.defaultVatRatePercentage) : null,
      fiscalYearStartMonth: this.fiscalYearStartMonth !== null ? Number(this.fiscalYearStartMonth) : null,
      fiscalYearStartDay: this.fiscalYearStartDay !== null ? Number(this.fiscalYearStartDay) : null,
      timezone: this.timezone,
      termsAndConditionsDefaultPurchase: this.termsAndConditionsDefaultPurchase,
      termsAndConditionsDefaultSale: this.termsAndConditionsDefaultSale,
      bankAccountDetailsForInvoices: this.bankAccountDetailsForInvoices,
    };
  }

  clone(): CompanyModel {
    return new CompanyModel(deepCopy(this));
  }

  /**
   * Validate the company model (basic checks)
   */
  isValid(): boolean {
    if (!this.name || !this.name.trim()) {
      return false;
    }
    return true;
  }

  /**
   * Reset company to default values (except id)
   */
  reset(): void {
    this.name = '';
    this.tradingName = null;
    this.addressId = 0;
    this.address = null;
    this.vatNumber = null;
    this.siretNumber = null;
    this.registrationNumber = null;
    this.email = '';
    this.phoneNumber = null;
    this.website = null;
    this.logoUrl = null;
    this.defaultCurrencyId = 0;
    this.defaultCurrency = null;
    this.defaultVatRatePercentage = null;
    this.fiscalYearStartMonth = null;
    this.fiscalYearStartDay = null;
    this.timezone = 'Europe/Paris';
    this.termsAndConditionsDefaultPurchase = null;
    this.termsAndConditionsDefaultSale = null;
    this.bankAccountDetailsForInvoices = null;
    this.createdAt = null;
    this.updatedAt = null;
  }
}
