const GoogleAnalytics = () => {
    return (
      <>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FHG26Z15HT"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FHG26Z15HT');
            `,
          }}
        />
      </>
    );
  };
  
  export default GoogleAnalytics;
  