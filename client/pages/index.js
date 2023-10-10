import { useState } from 'react';

export default function NewsInput() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [submittedImage, setSubmittedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "An error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">사진 및 문구 입력</h1>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium mb-3">사진 업로드:</label>
                <input type="file" onChange={handleImageChange} />
              </div>
              <div>
                <label className="text-sm font-medium mb-3">문구 입력:</label>
                <textarea 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  placeholder="문구를 입력하세요."
                  className="resize-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading} 
                className="inline-flex justify-center max-w-[200px] mx-auto w-full"
              >
                {isLoading ? '로딩 중...' : '소식 생성하기'}
              </button>
              
              {error && (
                <div className="mt-4">
                  오류: {error}
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="col-span-1">
          {submittedImage && (
            <>
              <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 sm:text-center text-left">
                업로드된 사진
              </h1>
              <div className="flex flex-col justify-center relative h-auto items-center">
                <img src={submittedImage} alt="업로드된 사진" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
