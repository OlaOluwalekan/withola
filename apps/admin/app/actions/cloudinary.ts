"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteCloudinaryFile(url: string) {
  try {
    // URL example: https://res.cloudinary.com/dz9.../image/upload/v172.../folder/file.jpg
    const urlParts = url.split("/");
    const uploadIndex = urlParts.findIndex((part) => part === "upload");

    if (uploadIndex === -1) {
      console.warn("Invalid Cloudinary URL structure", url);
      return { success: false, error: "Invalid URL structure" };
    }

    // Combine everything after the version identifier (which comes right after "upload")
    // e.g., ["v172...", "folder", "file.jpg"]
    const pathParts = urlParts.slice(uploadIndex + 2);
    const fullPath = pathParts.join("/");

    // Check if the resource type is raw (PDFs are often uploaded as raw)
    let resourceType = "image";
    if (urlParts.includes("raw")) {
        resourceType = "raw";
    }

    let publicId = fullPath;

    // For image types, Cloudinary doesn't include the extension in the public_id
    // But for raw types, the extension must be included
    if (resourceType === "image") {
      const lastDotIndex = fullPath.lastIndexOf(".");
      publicId = lastDotIndex !== -1 ? fullPath.substring(0, lastDotIndex) : fullPath;
    }

    if (!publicId) {
      console.warn("Could not extract public ID from URL", url);
      return { success: false, error: "Could not extract public ID" };
    }

    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return { success: true };
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return { success: false, error: "Failed to delete file from Cloudinary" };
  }
}
