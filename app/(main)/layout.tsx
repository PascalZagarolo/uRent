import Link from "next/link";


const LoginLayout = async (
    { children }: { children: React.ReactNode }
) => {



    return (
        <div className="min-w-screen min-h-screen flex flex-col  dark:bg-[#0F0F0F]">
    <h3 className="font-semibold text-5xl mt-8 rounded-md flex justify-center">
        <Link href="/" className="flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] text-[#414c78] dark:text-gray-100">
            <p className="dark:text-[#414c78]">u</p> Rent
        </Link>
    </h3>

    <div className="mt-8 flex-grow">
        {children}
    </div>
</div>

    );
}

export default LoginLayout;