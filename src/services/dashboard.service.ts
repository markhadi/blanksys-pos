import { DashboardResponse } from '@/types/dashboard';
import generalData from '@/data/dashboard-general-card.json';
import inventoryData from '@/data/dashboard-inventory-card.json';
import cashierData from '@/data/dashboard-cashier-card.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createResponse = (data: any): DashboardResponse => ({
  success: true,
  message: 'Data retrieved successfully',
  data,
});

export const dashboardService = {
  // getGeneralCards: async (year: string): Promise<DashboardResponse> => {
  //   const { data } = await axios.get(`/api/dashboard/general?year=${year}`);
  //   return data;
  // }

  getGeneralCards: async (year: string): Promise<DashboardResponse> => {
    try {
      await delay(800);
      return createResponse(generalData);
    } catch (error) {
      console.error('Error fetching general cards:', error);
      throw error;
    }
  },

  getInventoryCards: async (year: string): Promise<DashboardResponse> => {
    try {
      await delay(1000);
      return createResponse(inventoryData);
    } catch (error) {
      console.error('Error fetching inventory cards:', error);
      throw error;
    }
  },

  getCashierCards: async (year: string): Promise<DashboardResponse> => {
    try {
      await delay(600);
      return createResponse(cashierData);
    } catch (error) {
      console.error('Error fetching cashier cards:', error);
      throw error;
    }
  },
};
