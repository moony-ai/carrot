'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { GenerateStoreNewsRequest, GenerateStoreNewsResponse } from '@/utils/service';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import LoadingDots from '@/components/ui/loadingdots';
import va from '@vercel/analytics';
import { PromptSuggestion } from '@/components/ContentSuggestionProps';
//import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { storeNewsService } from '@/utils/StoreNewsService';
import { ResultProps } from '@/components/ResultProps';

const contentSuggestions = [
  '자연의 맛을 담은 [가게 이름]',
  '일상의 특별함, [가게 이름]의 선물',
  '아름다운 하루의 시작, [가게 이름]에서',
  '[가게 이름], 일상 속의 아트 갤러리',
];



const generateFormSchema = z.object({
  url: z.string().min(1),
  prompt: z.string().min(3).max(160),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const Body = ({ message }: { message?:string; }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<GenerateStoreNewsResponse | null>(null);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>(contentSuggestions);

  // const router = useRouter();

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',

    defaultValues: {
      url: '',
      prompt: '',
    },
  });

  useEffect(() => {
    if (message) {
      setResponse({
        message: message,
      });
    }
  }, [message, form]);


  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      form.setValue('prompt', suggestion);
    },
    [form],
  );

  const handleSubmit = useCallback(
    async (values: GenerateFormValues) => {

      setIsLoading(true);
      setResponse(null);

      try {
        const request: GenerateStoreNewsRequest = {
          name: values.url,
          purpose: "introduce",
          contents: values.prompt,
        };
        console.log("Calling generateStoreNews");

        const responseMessage = await storeNewsService.generateStoreNews(request);
        console.log("Response from generateStoreNews:", responseMessage);

        setResponse(responseMessage);

        va.track('Generated Store News', {
          prompt: values.prompt,
        });
        
      } catch (error) {
        va.track('Failed to generate', {
          prompt: values.prompt,
        });
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );


  useEffect(() => {
      if (form.watch().url) {
          setDynamicSuggestions(
              contentSuggestions.map(suggestion => suggestion.replace('[가게 이름]', form.watch().url))
          );
      } else {
          setDynamicSuggestions(contentSuggestions);
      }
  }, [form.watch().url]);

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">Generate a Business News</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>가게 이름</FormLabel>
                      <FormControl>
                        <Input placeholder="베이커리, 과일가게 등" {...field} />
                      </FormControl>
                      <FormDescription>
                        가게 이름을 입력해주세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>키워드</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="건강한 유럽식 빵을 만드는 더브레드입니다."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="">
                        새로운 소식 생성을 위한 키워드를 입력해주세요.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="my-2">
                  <p className="text-sm font-medium mb-3">키워드 추천</p>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 text-center text-gray-500 text-sm">
                  {dynamicSuggestions.map((suggestion) => (
                    <PromptSuggestion
                      key={suggestion}
                      suggestion={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      isLoading={isLoading}
                    />
                  ))}
                </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center
                 max-w-[200px] mx-auto w-full"
                >
                  {isLoading ? (
                    <LoadingDots color="white" />
                  ) : response ? (
                    '✨ Regenerate'
                  ) : (
                    'Generate'
                  )}
                </Button>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </Form>
        </div>
        <div className="col-span-1">
  { (
    <>
      <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 sm:text-center text-left">
        Business News
      </h1>
      <div>
        <div className="flex flex-col justify-center relative h-auto items-center">
          {response ? (
                    <ResultProps
                    message={response.message}
                  />
          ) : (
            <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto animate-pulse bg-gray-400 aspect-square max-w-full" />
          )}
        </div>
        {response && (
          <div className="flex justify-center gap-5 mt-4">
            <Button
              onClick={() =>
                console.log("Implement the relevant action for Download here")
              }
            >
              Download
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(
                  response.message
                );
                toast.success('Link copied to clipboard');
              }}
            >
              ✂️ Share
            </Button>
          </div>
        )}
      </div>
    </>
  )}
</div>
      </div>
      <Toaster />
    </div>
  );
};

export default Body;
