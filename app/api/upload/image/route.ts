import { NextResponse } from "next/server";
const cloudinary = require("cloudinary").v2;

export async function POST(
    req : Request,
) {
    try {
        const values = await req.json();

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true,
          });

        console.log(values);

        const b64 = Buffer.from(values.buffer).toString("base64");
        console.log(values);
        let dataURI = "data:" + values.mimetype + ";base64," + b64;
        console.log(values);
        const response = await cloudinary.uploader.upload(dataURI, {
            folder: "dropzone-images",
          });

          return new NextResponse("Upload erfolgreich", { status: 200 });
    } catch(error) {
        console.log("Fehler beim Upload zu Cloudinary: " + error);
        return new NextResponse("Fehler beim Upload zu Cloudinary", { status: 500 });
    }
}