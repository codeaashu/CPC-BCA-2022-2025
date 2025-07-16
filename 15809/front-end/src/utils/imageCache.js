// src/utils/imageCache.js
const IMAGE_CACHE_PREFIX = 'intube_cache_';
const MAX_CACHE_SIZE = 10 * 1024 * 1024; // 10MB max cache size

/**
 * Converts an image URL or import to a Base64 string
 */
export const imageToBase64 = async (imageUrl) => {
  try {
    // Handle various types of image sources
    if (!imageUrl) {
      console.error('No image URL provided');
      return null;
    }

    // Convert import.meta.url assets or module objects to string URLs
    let url = imageUrl;
    
    // Handle Vite imports that return objects with default property
    if (typeof imageUrl === 'object' && imageUrl !== null) {
      if (imageUrl.default) {
        url = imageUrl.default;
      } else if (imageUrl.src) {
        url = imageUrl.src;
      }
    }

    console.log('Fetching image from:', url);
    
    // Fetch the image
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    // Convert to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert image to Base64:', error);
    return null;
  }
};

/**
 * Caches an image in localStorage
 */
export const cacheImage = async (key, imageUrl) => {
  try {
    // Check if we have enough space
    if (!hasEnoughStorage()) {
      // If not enough space, clear some old caches
      clearOldestCache();
    }
    
    const base64Image = await imageToBase64(imageUrl);
    if (base64Image) {
      console.log(`Caching image with key: ${key}`);
      localStorage.setItem(`${IMAGE_CACHE_PREFIX}${key}`, JSON.stringify({
        data: base64Image,
        timestamp: Date.now()
      }));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to cache image:', error);
    return false;
  }
};

/**
 * Gets a cached image from localStorage
 */
export const getCachedImage = (key) => {
  try {
    const cachedItem = localStorage.getItem(`${IMAGE_CACHE_PREFIX}${key}`);
    if (cachedItem) {
      const { data } = JSON.parse(cachedItem);
      return data;
    }
    return null;
  } catch (error) {
    console.error('Failed to get cached image:', error);
    return null;
  }
};

/**
 * Precaches important images that should be available offline
 * @param {Object} images - Object with key-value pairs of image name and import
 * @returns {Promise<boolean>} - Whether all images were cached successfully
 */
export const precacheImportantImages = async (images = {}) => {
  console.log('Precaching important images');
  const results = [];
  
  try {
    // Import default images if none provided
    if (Object.keys(images).length === 0) {
      try {
        // Dynamic imports for common assets
        const defaultImages = {
          logo: await import('../assets/logo.png'),
          noInternet: await import('../assets/noInternetConnection.png'),
          emptyContent: await import('../assets/emptyContent.png'),
          notFound: await import('../assets/404.png'),
          defaultAvatar: await import('../assets/defaultAvatar.png'),
          playlist: await import('../assets/playlist.png')
        };
        
        // Cache each default image
        for (const [key, importedImg] of Object.entries(defaultImages)) {
          results.push(await cacheImage(key, importedImg.default || importedImg));
        }
      } catch (error) {
        console.error('Error importing default images:', error);
      }
    } else {
      // Cache provided images
      for (const [key, imageUrl] of Object.entries(images)) {
        results.push(await cacheImage(key, imageUrl));
      }
    }
    
    const allSuccessful = results.every(result => result === true);
    console.log(`Precached ${results.filter(r => r).length}/${results.length} images`);
    return allSuccessful;
  } catch (error) {
    console.error('Error precaching images:', error);
    return false;
  }
};

/**
 * Check if we have enough storage space
 */
const hasEnoughStorage = () => {
  try {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(IMAGE_CACHE_PREFIX)) {
        totalSize += localStorage.getItem(key)?.length || 0;
      }
    }
    
    // localStorage size is measured in char length - roughly 2 bytes per char
    return totalSize * 2 < MAX_CACHE_SIZE;
  } catch (error) {
    console.error('Error checking storage:', error);
    return false;
  }
};

/**
 * Clear the oldest cached items
 */
const clearOldestCache = () => {
  try {
    const cacheItems = [];
    
    // Collect all cache items with timestamps
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(IMAGE_CACHE_PREFIX)) {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          cacheItems.push({
            key,
            timestamp: item.timestamp || 0
          });
        } catch (e) {
          // If item can't be parsed, consider it old
          cacheItems.push({ key, timestamp: 0 });
        }
      }
    }
    
    // Sort by timestamp (oldest first)
    cacheItems.sort((a, b) => a.timestamp - b.timestamp);
    
    // Remove the oldest 20% of items or at least one item
    const itemsToRemove = Math.max(Math.ceil(cacheItems.length * 0.2), 1);
    cacheItems.slice(0, itemsToRemove).forEach(item => {
      localStorage.removeItem(item.key);
      console.log(`Removed old cache item: ${item.key}`);
    });
    
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

/**
 * Clears all image caches
 */
export const clearAllImageCache = () => {
  try {
    const keysToRemove = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(IMAGE_CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error clearing all caches:', error);
    return false;
  }
};