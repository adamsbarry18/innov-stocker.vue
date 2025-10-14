import dayjs from 'dayjs';
import { deepCopy } from '@/libs/utils/Object';

export default class CompanyModel {
  id: number;
  name: string;
  legalName: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  vatNumber: string | null;
  siret: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  logoUrl: string | null;
  currencyCode: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(data?: Partial<CompanyModel>) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? '';
    this.legalName = data?.legalName ?? null;
    this.email = data?.email ?? null;
    this.phone = data?.phone ?? null;
    this.website = data?.website ?? null;
    this.vatNumber = data?.vatNumber ?? null;
    this.siret = data?.siret ?? null;
    this.addressLine1 = data?.addressLine1 ?? null;
    this.addressLine2 = data?.addressLine2 ?? null;
    this.city = data?.city ?? null;
    this.postalCode = data?.postalCode ?? null;
    this.country = data?.country ?? null;
    this.logoUrl = data?.logoUrl ?? null;
    this.currencyCode = data?.currencyCode ?? null;
    this.createdAt = data?.createdAt ? dayjs(data.createdAt).toDate() : new Date();
    this.updatedAt = data?.updatedAt ? dayjs(data.updatedAt).toDate() : new Date();
  }

  /**
   * Transform API object into CompanyModel instance (dates as string or Date)
   */
  static fromAPI(company: Partial<CompanyModel>): CompanyModel {
    const modelData = {
      ...company,
      legalName: company.legalName ?? null,
      email: company.email ?? null,
      phone: company.phone ?? null,
      website: company.website ?? null,
      vatNumber: company.vatNumber ?? null,
      siret: company.siret ?? null,
      addressLine1: company.addressLine1 ?? null,
      addressLine2: company.addressLine2 ?? null,
      city: company.city ?? null,
      postalCode: company.postalCode ?? null,
      country: company.country ?? null,
      logoUrl: company.logoUrl ?? null,
      currencyCode: company.currencyCode ?? null,
      createdAt: company.createdAt ? dayjs(company.createdAt).toDate() : new Date(),
      updatedAt: company.updatedAt ? dayjs(company.updatedAt).toDate() : new Date(),
    };

    return new CompanyModel(modelData);
  }

  /**
   * Returns the display name (legal name if available, otherwise name)
   */
  get displayName(): string {
    return this.legalName || this.name;
  }

  /**
   * Returns the full address as a formatted string
   */
  get fullAddress(): string {
    const parts = [
      this.addressLine1,
      this.addressLine2,
      this.postalCode && this.city ? `${this.postalCode} ${this.city}` : this.city,
      this.country,
    ].filter(Boolean);

    return parts.join(', ');
  }

  /**
   * Prepare object for API (convert dates to ISO string, remove frontend-only fields)
   */
  toAPI(): Partial<CompanyModel> {
    const apiData: Partial<CompanyModel> = {};
    const clearFields = ['createdAt', 'updatedAt'];

    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const typedKey = key as keyof CompanyModel;
        if (!clearFields.includes(typedKey)) {
          (apiData as any)[typedKey] = this[typedKey];
        }
      }
    }

    if (this.id === 0 || this.id === null) {
      delete apiData.id;
    }

    return apiData;
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
    this.legalName = null;
    this.email = null;
    this.phone = null;
    this.website = null;
    this.vatNumber = null;
    this.siret = null;
    this.addressLine1 = null;
    this.addressLine2 = null;
    this.city = null;
    this.postalCode = null;
    this.country = null;
    this.logoUrl = null;
    this.currencyCode = null;
    this.createdAt = null;
    this.updatedAt = null;
  }
}
