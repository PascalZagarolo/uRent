'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Clock7Icon } from "lucide-react";
import { useState } from "react";


const EditOpenhours = () => {

    const [startMonday, setStartMonday] = useState("");
    const [endMonday, setEndMonday] = useState("");

    return ( 
        <Dialog>
            <DialogTrigger asChild>
            <Button className="ml-auto text-xs" size="sm" variant="ghost">
                       <Clock7Icon className="w-4 h-4 mr-2" /> Öffnungszeiten bearbeiten
                    </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#191919] dark:border-none dark:text-gray-200">
                <div>
                    <h1 className="flex font-semibold">
                        <Clock7Icon className="w-4 h-4 mr-2" /> Öffnungszeiten bearbeiten
                    </h1>
                    <div className="mt-4">
                        <h3 className="font-semibold">
                            Wochentage
                        </h3>
                        <div className="mt-2 space-y-2 text-sm">

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Montag
                                <div className="flex justify-end w-full items-center gap-x-2">
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                onChange={(e) => {
                                    setStartMonday(e.target.value)
                                }}
                                placeholder="9:00"
                                />
                                -
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                 onChange={(e) => {
                                    setEndMonday(e.target.value)
                                }} 
                                placeholder="20:00"/>
                                Uhr
                                    </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-semibold">
                                Dienstag
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                onChange={(e) => {
                                    setStartMonday(e.target.value)
                                }}
                                placeholder="9:00"
                                />
                                -
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                 onChange={(e) => {
                                    setEndMonday(e.target.value)
                                }} 
                                placeholder="20:00"/>
                                Uhr
                                    </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Mittwoch
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                onChange={(e) => {
                                    setStartMonday(e.target.value)
                                }}
                                placeholder="9:00"
                                />
                                -
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                 onChange={(e) => {
                                    setEndMonday(e.target.value)
                                }} 
                                placeholder="20:00"/>
                                Uhr
                                    </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Donnerstag
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                onChange={(e) => {
                                    setStartMonday(e.target.value)
                                }}
                                placeholder="9:00"
                                />
                                -
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                 onChange={(e) => {
                                    setEndMonday(e.target.value)
                                }} 
                                placeholder="20:00"/>
                                Uhr
                                    </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Freitag
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                onChange={(e) => {
                                    setStartMonday(e.target.value)
                                }}
                                placeholder="9:00"
                                />
                                -
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                 onChange={(e) => {
                                    setEndMonday(e.target.value)
                                }} 
                                placeholder="20:00"/>
                                Uhr
                                    </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Samstag
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                onChange={(e) => {
                                    setStartMonday(e.target.value)
                                }}
                                placeholder="9:00"
                                />
                                -
                                <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]"
                                 onChange={(e) => {
                                    setEndMonday(e.target.value)
                                }} 
                                placeholder="20:00"/>
                                Uhr
                                    </div>
                            </div>

                            


                        </div>
                        <div className="mt-4">
                                <Button className="w-full dark:bg-[#1C1C1C]" variant="ghost" size="sm">
                                    Speichern
                                </Button>
                            </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default EditOpenhours;