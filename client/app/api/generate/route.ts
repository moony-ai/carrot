import { GenerateStoreNewsRequest, GenerateStoreNewsResponse } from '@/utils/service';
import { NextRequest } from 'next/server';
import { storeNewsService } from '@/utils/StoreNewsService';

const validateRequest = (request: GenerateStoreNewsRequest) => {
  if (!request.name) {
    throw new Error('Name is required');
  }
  if (!request.purpose) {
    throw new Error('Purpose is required');
  }
  if (!request.contents) {
    throw new Error('Contents is required');
  }
};

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as GenerateStoreNewsRequest;

  try {
    validateRequest(reqBody);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 });
    }
  }

  let response: GenerateStoreNewsResponse;

  try {
    response = await storeNewsService.generateStoreNews(reqBody);
  } catch (error) {
      if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('Internal Server Error', { status: 500 });
    }
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
