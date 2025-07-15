export const uploadToCloudinary = async (pics:any)=> {
    const cloud_name = "douwlisxt"
    const upload_preset = "shubh_code"

    if(pics){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/douwlisxt/image/upload",{
                method: "POST",
                body: data,
            })

            const fileData = await res.json();
            console.log("Cloudinary Response:", fileData); // ✅ Check what you receive
            return fileData.secure_url;

        }
        else{
            console.log("Error: No image provided");
        }
    }