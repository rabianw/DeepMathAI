require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const artifactDir = '/Users/rabianwangkeeree/.gemini/antigravity-ide/brain/59bbd534-d474-4db9-8544-247a255ded04';

const images = [
  { file: 'pub1_neural_network_cone_1782380326101.png', publicId: 'publications/pub1_graphical_abstract' },
  { file: 'pub2_projection_neural_delay_1782380347852.png', publicId: 'publications/pub2_graphical_abstract' },
  { file: 'pub3_variational_inequality_1782380370459.png', publicId: 'publications/pub3_graphical_abstract' },
  { file: 'pub4_solution_maps_1782380396421.png', publicId: 'publications/pub4_graphical_abstract' },
  { file: 'pub5_glaucoma_ai_1782380418106.png', publicId: 'publications/pub5_graphical_abstract' },
  { file: 'pub6_halpern_image_restoration_1782380444060.png', publicId: 'publications/pub6_graphical_abstract' },
  { file: 'pub7_inertial_forward_backward_1782380468049.png', publicId: 'publications/pub7_graphical_abstract' },
  { file: 'pub8_multiview_svm_1782380492333.png', publicId: 'publications/pub8_graphical_abstract' },
  { file: 'pub9_compact_neural_svr_1782380520195.png', publicId: 'publications/pub9_graphical_abstract' },
];

async function uploadAll() {
  for (const img of images) {
    const filePath = path.join(artifactDir, img.file);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: img.publicId,
        overwrite: true,
      });
      console.log(`✅ Uploaded: ${img.publicId} → ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Failed: ${img.publicId} — ${err.message}`);
    }
  }
}

uploadAll();
