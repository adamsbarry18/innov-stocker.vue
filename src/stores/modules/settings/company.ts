import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApiStore } from '@/stores/modules/api';
import { ServerError } from '@/libs/utils/Errors';
import CompanyModel from './models/CompanyModel';

// Export the model for use in components
export { CompanyModel };

export const useCompanyStore = defineStore('company', () => {
  const apiStore = useApiStore();

  const company = ref<CompanyModel | null>(null);
  const isLoading = ref(false);

  const hasCompany = computed(() => !!company.value);

  async function fetchCompany(id: number = 1): Promise<CompanyModel | null> {
    isLoading.value = true;
    try {
      const response = await apiStore.api.get(`/api/v1/company/${id}`);
      const data = response.data?.data || response.data;
      const normalized = CompanyModel.fromAPI(data);
      company.value = normalized;
      return normalized;
    } catch (error) {
      throw new ServerError('company', 'fetchCompany', error, { id });
    } finally {
      isLoading.value = false;
    }
  }

  async function updateCompany(companyData: CompanyModel): Promise<CompanyModel> {
    isLoading.value = true;
    try {
      const dataToSend = companyData.toAPI();
      const response = await apiStore.api.put(`/api/v1/company/${companyData.id}`, { data: dataToSend });
      const updated = response.data?.data || response.data;
      const normalized = CompanyModel.fromAPI(updated);
      company.value = normalized;
      return normalized;
    } catch (error) {
      throw new ServerError('company', 'updateCompany', error, { companyData });
    } finally {
      isLoading.value = false;
    }
  }

  return { company, isLoading, hasCompany, fetchCompany, updateCompany };
});
