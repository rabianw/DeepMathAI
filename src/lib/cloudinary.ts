/**
 * Helper to generate Cloudinary image URLs or fall back to local URLs.
 * Assumes that local image paths start with '/' (e.g. '/images/team/rabian.jpg')
 */
export function getImageUrl(path: string): string {
  // If it's already an absolute URL (e.g. Unsplash), return it as is.
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return path;
  }

  // Normalize path: remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Return Cloudinary URL with auto format and quality for browser compatibility
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${normalizedPath}`;
}
