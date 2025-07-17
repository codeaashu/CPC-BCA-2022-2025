import { v2 as cloudinary } from "cloudinary";
import { verifyToken } from "@/lib/verifyToken";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // ✅ Step 1: Verify seller access
    const decoded = await verifyToken(request);
    const userId = decoded?.userId;
    const role = decoded?.role;

    if (!userId || role !== "seller") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    // ✅ Step 2: Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = parseFloat(formData.get("price"));
    const offerPrice = parseFloat(formData.get("offerPrice"));
    const files = formData.getAll("images");

    // ✅ Debugging Step 1: Confirm file uploads received
    console.log("FILES RECEIVED:", files.map(f => f?.name || "[null]"));

    // ✅ Step 3: Validate input
    if (
      !name ||
      !description ||
      !category ||
      isNaN(price) ||
      isNaN(offerPrice) ||
      files.length === 0 ||
      !files[0] // ensure at least one valid file exists
    ) {
      return NextResponse.json(
        { success: false, message: "All fields and at least one image are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ Step 4: Upload images to Cloudinary
    const imageUrls = [];

    for (const file of files) {
      if (!file) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Error:", error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        ).end(buffer);
      });

      imageUrls.push(imageUrl);
    }

    // ✅ Log final data before saving
console.log("Saving product with data:", {
  userId,
  name,
  description,
  price,
  offerPrice,
  image: imageUrls,
  category,
});
    
// ✅ Log here to confirm Cloudinary uploaded the images
console.log("Image URLs to save:", imageUrls);


    // ✅ Step 5: Save to DB
    const newProduct = await Product.create({
    sellerId: userId,
    name,
    description,
    category,
    price,
    offerPrice,
    image: imageUrls,
    date: Date.now(), 
});

    return NextResponse.json(
      { success: true, message: "Product uploaded successfully", newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product Upload Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
