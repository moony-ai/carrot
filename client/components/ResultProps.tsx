type ResultProps = {
  message?: string;
};

export const ResultProps: React.FC<ResultProps> = ({ message }) => {
  if (!message) {
    return (
      <div>
        <p>result not provided</p>
      </div>
    );
  }

  const displayMessage = message.split('\\n').join('<br/>');

  return (
    <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto max-w-full">
      <div className="text-gray-400 text-sm "     style={{ fontSize: '0.875rem', color: '#7c7c7c' }} dangerouslySetInnerHTML={{ __html: displayMessage }}></div>
    </div>
  );
};
