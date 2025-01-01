import { RegisterForm } from "../_components/register-form";


const RegisterPage = () => {
  return (
    <>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16814367985"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-16814367985');
        `
        }} async>

        </script>
      </head>
      <div className="w-full flex justify-center">
        <RegisterForm />
      </div>
    </>
  );
}

export default RegisterPage;