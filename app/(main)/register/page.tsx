import { RegisterForm } from "../_components/register-form";


const RegisterPage = () => {
  return (
    <>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16814367985"></script>
        <script dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                        }
                    gtag('js', new Date());

                    gtag('config', 'AW-16814367985');
                    `
                }} async>
                    
                </script>
                <script dangerouslySetInnerHTML={{
          __html: `
                    !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1328385231485028');
fbq('track', 'PageView');
                    `
        }} async>

        </script>
        <noscript><img height="1" width="1" className="display:none"
          src="https://www.facebook.com/tr?id=1328385231485028&ev=PageView&noscript=1"
        /></noscript>
      </head>
      <div className="w-full flex justify-center">
        <RegisterForm />
      </div>
    </>
  );
}

export default RegisterPage;