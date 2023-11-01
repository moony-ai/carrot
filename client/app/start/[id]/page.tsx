'use client';

import { GenerateStoreNewsRequest, GenerateStoreNewsResponse } from '@/utils/service';
import {storeNewsService} from '@/utils/StoreNewsService'
import { useEffect, useState } from 'react';
import Body from '@/components/Body';

export default function StoreNewsPage() {
  const [newsMessage, setNewsMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request: GenerateStoreNewsRequest = {
          name: "복복식당",
          purpose: "introduce",
          contents: "신메뉴출시, 매콤하게 맛있는, 순두부찌개, 11월 20일 출시, 많은 관심 바랍니다.",
        };
        
        const data: GenerateStoreNewsResponse = await storeNewsService.generateStoreNews(request);
        setNewsMessage(data.message);
      } catch (error) {
        console.error("Error generating store news:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Body
      message={newsMessage}
    />
  );
}
