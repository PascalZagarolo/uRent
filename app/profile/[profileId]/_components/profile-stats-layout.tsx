const ProfileStatsLayout = () => {
    return ( 
        <div className="flex justify-center mb-16">
            <div className="items-center justify-center mr-8 outline outline-offset-8 outline-2">
                <div className="flex justify-center">
                <p className="font-bold text-lg text-blue-800">32</p>
                </div>
                <p className="text-base flex justify-center ml-4 mr-4 "> Anzeigen  </p>
            </div>

            <div className="items-center justify-center ml-8 outline outline-offset-8 outline-2">
                <div className="flex justify-center">
                <p className="font-bold text-lg text-blue-800"> {'>'}300 </p>
                </div>
                <p className="text-base flex justify-center ml-6 mr-6"> Kunden </p>
            </div>
           
        </div>
     );
}
 
export default ProfileStatsLayout;