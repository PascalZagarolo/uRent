

import { CaravanIcon, WeightIcon } from "lucide-react";
import { LuAxis3D } from "react-icons/lu";
import { PiCouchFill } from "react-icons/pi";
import { FaGears } from "react-icons/fa6";
import {  TbCrane } from "react-icons/tb";
import { GiResize, GiStoneWheel } from "react-icons/gi";
import { RiCaravanFill } from "react-icons/ri";
import { trailerAttribute } from "@/db/schema";
import { HiCubeTransparent } from "react-icons/hi";

interface TrailerAttributeRenderProps {
    attributes: typeof trailerAttribute.$inferSelect

}


const TrailerAttributeRender: React.FC<TrailerAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return ( 
        <div className="w-full grid grid-cols-2 gap-4 mt-4 text-gray-200">
            {attributes?.type && (
                
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <CaravanIcon className="w-4 h-4 mr-2" />    {attributes?.type?.substring(0,1)}{attributes?.type?.substring(1).toLowerCase()}
                </div>
            )}
            {attributes?.extraType && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <RiCaravanFill  className="w-4 h-4 mr-2" />    {attributes?.extraType?.substring(0,1)}{attributes?.extraType?.substring(1).toLowerCase()}
                </div>
            )}
            {attributes?.coupling && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <FaGears  className="w-4 h-4 mr-2" />    {attributes?.coupling?.substring(0,1)}{attributes?.coupling?.substring(1).toLowerCase()}
                </div>
            )}
            {attributes?.loading && (
                
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <TbCrane   className="w-4 h-4 mr-2" />    {attributes?.loading?.substring(0,1)}{attributes?.loading?.substring(1).toLowerCase()}   
                </div>
            )}
            {attributes?.axis && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <LuAxis3D  className="w-4 h-4 mr-2" />    { 
                        {
                            '1' : "Einachser",
                            '2' : "Zweiachser",
                            '3' : "Dreiachser",
                            '4' : "Vierachser",
                            '5' : " > 4 Achsen"
                        }[attributes?.axis]
                    }
                </div>
            )}
            {attributes?.weightClass && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <WeightIcon className="w-4 h-4 mr-2" />  
                    { 
                        {
                            '75' : " bis 0,75 t",
                            '150' : " bis 1,5 t",
                            '280' : " bis 2,8 t",
                            '350' : " bis 3,5 t",
                            '750' : " bis 7,5 t",
                            '1200' : " bis 12 t",
                            '1800' : " bis 18 t",
                            '2600' : " bis 26 t",
                            '3200' : " bis 32 t",
                            '3900' : " bis 39 t",
                            '5000' : " {'>'} 39 t",
                        }[attributes?.weightClass]
                    }

                </div>
            )}

            {attributes?.brake && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <GiStoneWheel  className="w-4 h-4 mr-2" />    {String(attributes?.brake) === "true" ? "Hat Auflaufbremse" : "Keine Bremse"}
                </div>
            )}
            
            {attributes?.loading_volume && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                <HiCubeTransparent  className="w-4 h-4 mr-2" />    {attributes.loading_volume} l
            </div>
            )}

            {attributes?.loading_l || attributes?.loading_b || attributes?.loading_h && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                <GiResize  className="w-4 h-4 mr-2" />    {attributes?.loading_l } x {attributes?.loading_b } x {attributes?.loading_h } m
            </div>
            )}
        </div>
     );
}
 
export default TrailerAttributeRender;