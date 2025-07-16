import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        //file has been uploaded successfull
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        // remove the locally saved temporary file as the upload operation got failed
        if (error) {
            fs.unlinkSync(localFilePath);
            return null;
        }
    }
};

const updateOnCloudinary = async (localFilePath, publicUrl) => {
    // EXP : FOR UPDATE FILE
    try {
        if (!localFilePath) return null;
        // update the file on cloudinary

        const response = await cloudinary.uploader.upload(
            localFilePath,
            { public_id: publicUrl, overwrite: true, invalidate: true },
            (error, result) => {
                if (error) {
                    console.error("Error updating the image:", error);
                } else {
                    console.log("Image updated successfully:", result);
                }
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

const deleteFromCloudinary = async function (publicUrl, options) {
    
    try {
        const x = publicUrl;
        const splitUrl = x.split("/");
        const finalId = splitUrl[splitUrl.length - 1];
        const publicId = finalId.split(".")[0];

        const response = await cloudinary.uploader.destroy(publicId, options);

        return response;
    } catch (error) {
        return error;
    }
};

export { uploadOnCloudinary, updateOnCloudinary, deleteFromCloudinary };
