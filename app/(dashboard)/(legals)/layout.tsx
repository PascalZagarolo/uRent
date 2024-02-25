import Footer from "../_components/footer";

const LegalLayout = ({ children } : { children : React.ReactNode }) => {
    return ( 
        <div className="">
            {children}
            <div>
                <Footer/>
            </div>
        </div>
     );
}
 
export default LegalLayout;