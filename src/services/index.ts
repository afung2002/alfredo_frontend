import axios from 'axios';

const API_URL = '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User investments
export const getUserInvestments = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error('userId is required');
    }
    const response = await api.get(`/users/${userId}/investments`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    } else {
      console.error('Error fetching user investments:', error);
    }
    throw error;
  }
};

// User funds
export const getUserFunds = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}/funds`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    } else {
      console.error('Error fetching user investments:', error);
    }
    throw error;
  }
};

// Create new investment
export const createInvestment = async (investmentData: any) => {
  try {
    const response = await api.post('/investments', investmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating investment:', error);
    throw error;
  }
};

// Update investment
export const updateInvestment = async (investmentId: string, investmentData: any) => {
  try {
    const response = await api.put(`/investments/${investmentId}`, investmentData);
    return response.data;
  } catch (error) {
    console.error('Error updating investment:', error);
    throw error;
  }
};

// Get investment by id
export const getInvestmentById = async (investmentId: string) => {
  try {
    const response = await api.get(`/investments/${investmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching investment:', error);
    throw error;
  }
};

// Create new fund
export const createFund = async (fundData: any) => {
  try {
    const response = await api.post('/funds', fundData);
    return response.data;
  } catch (error) {
    console.error('Error creating fund:', error);
    throw error;
  }
};

// Update fund
export const updateFund = async (fundId: string, fundData: any) => {
  try {
    const response = await api.put(`/funds/${fundId}`, fundData);
    return response.data;
  } catch (error) {
    console.error('Error updating fund:', error);
    throw error;
  }
};

// Get fund by id
export const getFundById = async (fundId: string) => {
  try {
    const response = await api.get(`/funds/${fundId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fund:', error);
    throw error;
  }
};

// Get fund limited partners
export const getFundLimitedPartners = async (fundId: string) => {
  try {
    const response = await api.get(`/funds/${fundId}/limited-partners`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fund limited partners:', error);
    throw error;
  }
};

// Create new limited partner
export const createLimitedPartner = async (limitedPartnerData: any) => {
  try {
    const response = await api.post('/limited-partners', limitedPartnerData);
    return response.data;
  } catch (error) {
    console.error('Error creating limited partner:', error);
    throw error;
  }
};

// Update limited partner
export const updateLimitedPartner = async (limitedPartnerId: string, limitedPartnerData: any) => {
  try {
    const response = await api.put(`/limited-partners/${limitedPartnerId}`, limitedPartnerData);
    return response.data;
  } catch (error) {
    console.error('Error updating limited partner:', error);
    throw error;
  }
};

// Get limited partner by id
export const getLimitedPartnerById = async (limitedPartnerId: string) => {
  try {
    const response = await api.get(`/limited-partners/${limitedPartnerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching limited partner:', error);
    throw error;
  }
};

// Create new fund update
export const createFundUpdate = async (fundUpdateData: any) => {
  try {
    const response = await api.post('/fund-updates', fundUpdateData);
    return response.data;
  } catch (error) {
    console.error('Error creating fund update:', error);
    throw error;
  }
};

  // Get fund updates by fund id
export const getFundFundUpdates = async (fundId: string) => {
  try {
    const response = await api.get(`/funds/${fundId}/fund-updates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fund updates:', error);
    throw error;
  }
};



// Create new document
export const createDocument = async (documentData: any) => {
  try {
    const formData = new FormData();
    formData.append('file', documentData.file);
    formData.append('companyName', documentData.companyName);
    formData.append('description', documentData.description);
    formData.append('type', documentData.type);

    const response = await api.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
}; 