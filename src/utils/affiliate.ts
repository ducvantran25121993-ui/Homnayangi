import { AffiliateConfig, Dish } from '../types';

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

export function buildAffiliateUrl(
  platform: 'shopeefood' | 'grabfood' | 'befood',
  dishName: string,
  config: AffiliateConfig = DEFAULT_AFFILIATE_CONFIG
): string {
  const query = encodeURIComponent(dishName.trim());
  const encodedSubId = encodeURIComponent(config.shopeeSubId || 'homnayangi');

  switch (platform) {
    case 'shopeefood': {
      // ShopeeFood search URL with Shopee Affiliate CPA tracking
      return `https://shopeefood.vn/search?q=${query}&utm_source=affiliate&utm_medium=cpa&utm_campaign=${encodedSubId}&aff_id=${config.shopeeAffiliateId}`;
    }
    case 'grabfood': {
      // GrabFood web / app deep link with partner tracking
      return `https://food.grab.com/vn/vi/restaurants?search=${query}&utm_source=affiliate_partner&utm_medium=${config.grabfoodAffiliateId}&utm_campaign=grab_food_suggest`;
    }
    case 'befood': {
      // BeFood deep link / web partner
      return `https://be.com.vn/dich-vu/be-food/?search=${query}&ref=${config.befoodPartnerId}&utm_source=affiliate`;
    }
    default:
      return `https://shopeefood.vn/search?q=${query}`;
  }
}

export async function trackAndOpenAffiliateLink(
  platform: 'shopeefood' | 'grabfood' | 'befood',
  dish: { id?: string; name: string; estimatedPrice?: number },
  config: AffiliateConfig = DEFAULT_AFFILIATE_CONFIG
): Promise<void> {
  const targetUrl = buildAffiliateUrl(platform, dish.name, config);

  // Send telemetry to server
  try {
    fetch('/api/affiliate/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dishId: dish.id || dish.name.toLowerCase().replace(/\s+/g, '-'),
        dishName: dish.name,
        platform,
        priceEstimate: dish.estimatedPrice || 50000,
      }),
    }).catch(() => {
      // silent fallback
    });
  } catch (err) {
    console.warn('Click tracking beacon failed', err);
  }

  // Open the affiliate link in a new tab
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}
