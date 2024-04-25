import Footer from "../_components/footer";

const LegalLayout = ({ children } : { children : React.ReactNode }) => {
    return ( 
        <div>
            
            {children}
            
            <div>
                <Footer/>
            </div>
        </div>
     );
}
 
export default LegalLayout;