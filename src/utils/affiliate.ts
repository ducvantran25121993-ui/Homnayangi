import { AffiliateConfig, Dish, UserLocation } from '../types';
import { getStoredUserLocation } from './location';

export const DEFAULT_AFFILIATE_CONFIG: AffiliateConfig = {
  shopeeAffiliateId: '17307790541',
  shopeeSubId: 'homnayangi_web',
  shopeeBaseUrl: 'https://shopeefood.vn',
  grabfoodAffiliateId: 'GRAB_AFF_VN_777',
  grabfoodWebUrl: 'https://food.grab.com/vn/vi/',
  befoodPartnerId: 'BEFOOD_VN_666',
  befoodWebUrl: 'https://be.com.vn/dich-vu/be-food/',
  averageCommissionRate: 5.5,
  defaultCity: 'TP. Hồ Chí Minh',
};

/**
 * Clean and optimize dish search query for Food delivery apps
 */
export function cleanDishSearchQuery(dishName: string): string {
  if (!dishName) return 'món ngon';
  // Remove markdown, extra annotations like (Hot), [Mới], etc.
  let cleaned = dishName
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/✦/g, '')
    .trim();
  return cleaned;
}

export function buildAffiliateUrl(
  platform: 'shopeefood' | 'grabfood' | 'befood' | 'googlemaps',
  dishName: string,
  config: AffiliateConfig = DEFAULT_AFFILIATE_CONFIG,
  userLocation?: UserLocation
): string {
  const loc = userLocation || getStoredUserLocation();
  const cleanedQuery = cleanDishSearchQuery(dishName);
  const query = encodeURIComponent(cleanedQuery);
  const encodedSubId = encodeURIComponent(config.shopeeSubId || 'homnayangi');

  switch (platform) {
    case 'shopeefood': {
      // ShopeeFood Vietnam search link: localized by city slug if available
      // Both desktop and mobile ShopeeFood recognize /search?q= and /{city}/search?q=
      const cityPath = loc?.citySlug ? `${loc.citySlug}/` : '';
      return `https://shopeefood.vn/${cityPath}search?q=${query}&utm_source=affiliate&utm_medium=cpa&utm_campaign=${encodedSubId}&aff_id=${config.shopeeAffiliateId}`;
    }

    case 'grabfood': {
      // GrabFood web / universal link automatically opens the Grab app on mobile with dish search
      // Passing lat & lng pins the search right at the user's location
      if (loc?.latitude && loc?.longitude) {
        return `https://food.grab.com/vn/vi/restaurants?search=${query}&lat=${loc.latitude}&lng=${loc.longitude}&utm_source=affiliate_partner&utm_medium=${config.grabfoodAffiliateId}&utm_campaign=grab_food_suggest`;
      }
      if (loc?.address) {
        const encodedAddr = encodeURIComponent(loc.address);
        return `https://food.grab.com/vn/vi/restaurants?search=${query}&location=${encodedAddr}&utm_source=affiliate_partner&utm_medium=${config.grabfoodAffiliateId}&utm_campaign=grab_food_suggest`;
      }
      return `https://food.grab.com/vn/vi/restaurants?search=${query}&utm_source=affiliate_partner&utm_medium=${config.grabfoodAffiliateId}&utm_campaign=grab_food_suggest`;
    }

    case 'befood': {
      const locParam = loc?.city ? `&city=${encodeURIComponent(loc.city)}` : '';
      return `https://be.com.vn/dich-vu/be-food/?search=${query}${locParam}&ref=${config.befoodPartnerId}&utm_source=affiliate`;
    }

    case 'googlemaps': {
      const lat = loc?.latitude || 10.7769;
      const lng = loc?.longitude || 106.7009;
      return `https://www.google.com/maps/search/${encodeURIComponent(cleanedQuery + ' quán ăn ngon gần đây')}/@${lat},${lng},14.5z`;
    }

    default:
      return `https://shopeefood.vn/search?q=${query}`;
  }
}

/**
 * Bulletproof external link opening that avoids popup blockers in browsers,
 * webviews, and iframes, ensuring the food delivery app or search page opens reliably.
 */
export function safeOpenExternalUrl(targetUrl: string): boolean {
  if (!targetUrl) return false;

  // 1. Synthetic native anchor click (bypasses most mobile & desktop popup blockers)
  try {
    const link = document.createElement('a');
    link.href = targetUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 150);
    return true;
  } catch (e) {
    console.warn('Anchor click error, attempting window.open', e);
  }

  // 2. Direct window.open fallback
  try {
    const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
    if (newWindow && !newWindow.closed) {
      return true;
    }
  } catch (e) {
    console.warn('window.open blocked, trying top navigation', e);
  }

  // 3. In-frame or same-window fallback if popup was completely blocked
  try {
    if (window.top && window.top !== window) {
      window.top.location.href = targetUrl;
    } else {
      window.location.href = targetUrl;
    }
    return true;
  } catch {
    window.location.href = targetUrl;
    return true;
  }
}

export async function trackAndOpenAffiliateLink(
  platform: 'shopeefood' | 'grabfood' | 'befood' | 'googlemaps',
  dish: { id?: string; name: string; estimatedPrice?: number },
  config: AffiliateConfig = DEFAULT_AFFILIATE_CONFIG,
  customLocation?: UserLocation
): Promise<string> {
  const activeLocation = customLocation || getStoredUserLocation();
  const targetUrl = buildAffiliateUrl(platform, dish.name, config, activeLocation);

  // Immediately launch navigation to prevent browser popup block heuristics
  safeOpenExternalUrl(targetUrl);

  // Dispatch interactive notification event for instant feedback
  try {
    window.dispatchEvent(
      new CustomEvent('affiliate-order-opened', {
        detail: {
          dishName: cleanDishSearchQuery(dish.name),
          platform,
          location: activeLocation,
          url: targetUrl,
        },
      })
    );
  } catch {
    // ignore
  }

  // Send telemetry beacon to backend asynchronously
  try {
    fetch('/api/affiliate/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dishId: dish.id || dish.name.toLowerCase().replace(/\s+/g, '-'),
        dishName: cleanDishSearchQuery(dish.name),
        platform: platform === 'googlemaps' ? 'grabfood' : platform,
        priceEstimate: dish.estimatedPrice || 50000,
        userLocation: {
          city: activeLocation.city,
          district: activeLocation.district,
          source: activeLocation.source,
          latitude: activeLocation.latitude,
          longitude: activeLocation.longitude,
        },
      }),
    }).catch(() => {
      // silent fallback
    });
  } catch (err) {
    console.warn('Click tracking beacon failed', err);
  }

  return targetUrl;
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}
