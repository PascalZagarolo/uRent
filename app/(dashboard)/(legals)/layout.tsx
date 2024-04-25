import Footer from "../_components/footer";

const LegalLayout = ({ children } : { children : React.ReactNode }) => {
    return ( 
        <div>
            <div>
            {children}
            </div>
            <div>
                <Footer/>
            </div>
        </div>
     );
}
 
export default LegalLayout;