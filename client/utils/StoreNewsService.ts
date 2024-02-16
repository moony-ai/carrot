import { GenerateStoreNewsRequest, GenerateStoreNewsResponse } from './service';

export class StoreNewsService {
  generateStoreNews = async (
    request: GenerateStoreNewsRequest
  ): Promise<GenerateStoreNewsResponse> => {
    const response = await fetch('https://carrotai-78c894cc2746.herokuapp.com/api/v1/genai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.text();
    console.log('API Response:', response);
    console.log('API Response Body:', result);
    return { message: result };
  };
}

export const storeNewsService = new StoreNewsService();
