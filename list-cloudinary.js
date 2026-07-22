require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listAllFolders() {
  try {
    // List all folders
    const foldersResult = await cloudinary.api.root_folders();
    console.log("Root folders:");
    foldersResult.folders.forEach(f => console.log(" -", f.path));

    // Also list subfolders
    const subResult = await cloudinary.api.sub_folders("AI HealthcareSumit2026").catch(() => null);
    if (subResult) {
      console.log("\nSubfolders:");
      subResult.folders.forEach(f => console.log(" -", f.path));
    }

    // Try searching recent uploads
    const result = await cloudinary.search
      .sort_by('created_at', 'desc')
      .max_results(20)
      .execute();
    console.log("\nMost recent 20 uploads:");
    result.resources.forEach(r => console.log(" -", r.public_id, `(${r.format})`));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listAllFolders();
