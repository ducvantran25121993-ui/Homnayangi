import { UserLocation } from '../types';

export const LOCATION_STORAGE_KEY = 'homnayangi_user_location_v1';

export interface CityPreset {
  id: string;
  name: string;
  shortName: string;
  citySlug: string; // for ShopeeFood
  latitude: number;
  longitude: number;
  districts: string[];
}

export const POPULAR_CITIES: CityPreset[] = [
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    shortName: 'TP. HCM',
    citySlug: 'ho-chi-minh',
    latitude: 10.7769,
    longitude: 106.7009,
    districts: [
      'Quận 1',
      'Quận 3',
      'Quận 5',
      'Quận 7',
      'Quận 10',
      'Bình Thạnh',
      'Phú Nhuận',
      'Tân Bình',
      'Gò Vấp',
      'TP. Thủ Đức',
      'Tân Phú',
      'Bình Tân',
    ],
  },
  {
    id: 'hn',
    name: 'Hà Nội',
    shortName: 'Hà Nội',
    citySlug: 'ha-noi',
    latitude: 21.0285,
    longitude: 105.8542,
    districts: [
      'Hoàn Kiếm',
      'Cầu Giấy',
      'Đống Đa',
      'Ba Đình',
      'Hai Bà Trưng',
      'Tây Hồ',
      'Thanh Xuân',
      'Nam Từ Liêm',
      'Bắc Từ Liêm',
      'Hà Đông',
    ],
  },
  {
    id: 'dn',
    name: 'Đà Nẵng',
    shortName: 'Đà Nẵng',
    citySlug: 'da-nang',
    latitude: 16.0544,
    longitude: 108.2022,
    districts: [
      'Hải Châu',
      'Thanh Khê',
      'Sơn Trà',
      'Ngũ Hành Sơn',
      'Liên Chiểu',
      'Cẩm Lệ',
    ],
  },
  {
    id: 'ct',
    name: 'Cần Thơ',
    shortName: 'Cần Thơ',
    citySlug: 'can-tho',
    latitude: 10.0452,
    longitude: 105.7469,
    districts: ['Ninh Kiều', 'Cái Răng', 'Bình Thủy', 'Ô Môn'],
  },
  {
    id: 'hp',
    name: 'Hải Phòng',
    shortName: 'Hải Phòng',
    citySlug: 'hai-phong',
    latitude: 20.8449,
    longitude: 106.6881,
    districts: ['Hồng Bàng', 'Ngô Quyền', 'Lê Chân', 'Hải An'],
  },
  {
    id: 'bd',
    name: 'Bình Dương',
    shortName: 'Bình Dương',
    citySlug: 'binh-duong',
    latitude: 10.9804,
    longitude: 106.6745,
    districts: ['Thủ Dầu Một', 'Thuận An', 'Dĩ An', 'Bến Cát'],
  },
  {
    id: 'dnai',
    name: 'Đồng Nai (Biên Hòa)',
    shortName: 'Biên Hòa',
    citySlug: 'dong-nai',
    latitude: 10.9574,
    longitude: 106.8427,
    districts: ['Biên Hòa', 'Long Thành', 'Nhơn Trạch'],
  },
  {
    id: 'vt',
    name: 'Bà Rịa - Vũng Tàu',
    shortName: 'Vũng Tàu',
    citySlug: 'vung-tau',
    latitude: 10.346,
    longitude: 107.0843,
    districts: ['Vũng Tàu', 'Bà Rịa', 'Phú Mỹ'],
  },
  {
    id: 'nt',
    name: 'Khánh Hòa (Nha Trang)',
    shortName: 'Nha Trang',
    citySlug: 'khanh-hoa',
    latitude: 12.2388,
    longitude: 109.1967,
    districts: ['Nha Trang', 'Cam Ranh'],
  },
  {
    id: 'hue',
    name: 'Thừa Thiên Huế',
    shortName: 'Huế',
    citySlug: 'hue',
    latitude: 16.4637,
    longitude: 107.5909,
    districts: ['TP. Huế', 'Hương Thủy', 'Hương Trà'],
  },
];

export const DEFAULT_USER_LOCATION: UserLocation = {
  city: 'TP. Hồ Chí Minh',
  citySlug: 'ho-chi-minh',
  district: 'Quận 1',
  address: 'Quận 1, TP. Hồ Chí Minh',
  latitude: 10.7769,
  longitude: 106.7009,
  source: 'default',
};

export const DISTRICT_COORDINATES: Record<string, Record<string, { latitude: number; longitude: number }>> = {
  hcm: {
    'Quận 1': { latitude: 10.7769, longitude: 106.7009 },
    'Quận 3': { latitude: 10.7843, longitude: 106.6843 },
    'Quận 4': { latitude: 10.7578, longitude: 106.7013 },
    'Quận 5': { latitude: 10.7554, longitude: 106.6644 },
    'Quận 6': { latitude: 10.7464, longitude: 106.6353 },
    'Quận 7': { latitude: 10.7340, longitude: 106.7218 },
    'Quận 8': { latitude: 10.7241, longitude: 106.6286 },
    'Quận 10': { latitude: 10.7684, longitude: 106.6669 },
    'Quận 11': { latitude: 10.7630, longitude: 106.6502 },
    'Quận 12': { latitude: 10.8672, longitude: 106.6413 },
    'Bình Thạnh': { latitude: 10.8010, longitude: 106.7110 },
    'Phú Nhuận': { latitude: 10.7992, longitude: 106.6803 },
    'Tân Bình': { latitude: 10.8015, longitude: 106.6526 },
    'Gò Vấp': { latitude: 10.8387, longitude: 106.6664 },
    'TP. Thủ Đức': { latitude: 10.8494, longitude: 106.7719 },
    'Tân Phú': { latitude: 10.7904, longitude: 106.6280 },
    'Bình Tân': { latitude: 10.7654, longitude: 106.6039 },
    'Hóc Môn': { latitude: 10.8847, longitude: 106.5919 },
    'Bình Chánh': { latitude: 10.6874, longitude: 106.5929 },
    'Nhà Bè': { latitude: 10.6953, longitude: 106.7323 },
    'Củ Chi': { latitude: 11.0067, longitude: 106.5132 },
  },
  hn: {
    'Hoàn Kiếm': { latitude: 21.0285, longitude: 105.8542 },
    'Ba Đình': { latitude: 21.0341, longitude: 105.8242 },
    'Đống Đa': { latitude: 21.0181, longitude: 105.8239 },
    'Hai Bà Trưng': { latitude: 21.0076, longitude: 105.8519 },
    'Cầu Giấy': { latitude: 21.0333, longitude: 105.7899 },
    'Tây Hồ': { latitude: 21.0713, longitude: 105.8234 },
    'Thanh Xuân': { latitude: 20.9937, longitude: 105.8078 },
    'Nam Từ Liêm': { latitude: 21.0135, longitude: 105.7645 },
    'Bắc Từ Liêm': { latitude: 21.0631, longitude: 105.7594 },
    'Hà Đông': { latitude: 20.9723, longitude: 105.7773 },
    'Hoàng Mai': { latitude: 20.9754, longitude: 105.8576 },
    'Long Biên': { latitude: 21.0362, longitude: 105.8927 },
  },
  dn: {
    'Hải Châu': { latitude: 16.0678, longitude: 108.2208 },
    'Thanh Khê': { latitude: 16.0601, longitude: 108.1884 },
    'Sơn Trà': { latitude: 16.0847, longitude: 108.2435 },
    'Ngũ Hành Sơn': { latitude: 16.0028, longitude: 108.2573 },
    'Liên Chiểu': { latitude: 16.0792, longitude: 108.1489 },
    'Cẩm Lệ': { latitude: 15.9988, longitude: 108.1963 },
  },
  ct: {
    'Ninh Kiều': { latitude: 10.0342, longitude: 105.7883 },
    'Cái Răng': { latitude: 9.9961, longitude: 105.7538 },
    'Bình Thủy': { latitude: 10.0707, longitude: 105.7369 },
    'Ô Môn': { latitude: 10.1171, longitude: 105.6264 },
  },
  hp: {
    'Hồng Bàng': { latitude: 20.8653, longitude: 106.6749 },
    'Ngô Quyền': { latitude: 20.8524, longitude: 106.6993 },
    'Lê Chân': { latitude: 20.8402, longitude: 106.6781 },
    'Hải An': { latitude: 20.8353, longitude: 106.7214 },
  },
  bd: {
    'Thủ Dầu Một': { latitude: 10.9804, longitude: 106.6745 },
    'Thuận An': { latitude: 10.9234, longitude: 106.6989 },
    'Dĩ An': { latitude: 10.9067, longitude: 106.7719 },
    'Bến Cát': { latitude: 11.1342, longitude: 106.6022 },
  },
  dnai: {
    'Biên Hòa': { latitude: 10.9574, longitude: 106.8427 },
    'Long Thành': { latitude: 10.7853, longitude: 106.9632 },
    'Nhơn Trạch': { latitude: 10.6728, longitude: 106.8794 },
  },
  vt: {
    'Vũng Tàu': { latitude: 10.346, longitude: 107.0843 },
    'Bà Rịa': { latitude: 10.4962, longitude: 107.1729 },
    'Phú Mỹ': { latitude: 10.5983, longitude: 107.0543 },
  },
  nt: {
    'Nha Trang': { latitude: 12.2388, longitude: 109.1967 },
    'Cam Ranh': { latitude: 11.9214, longitude: 109.1591 },
  },
  hue: {
    'TP. Huế': { latitude: 16.4637, longitude: 107.5909 },
    'Hương Thủy': { latitude: 16.3986, longitude: 107.6542 },
    'Hương Trà': { latitude: 16.4354, longitude: 107.5147 },
  },
};

export function getDistrictCoordinates(
  cityIdOrSlugOrName: string,
  districtName?: string
): { latitude: number; longitude: number } | null {
  if (!districtName) return null;

  let cityKey = 'hcm';
  const c = cityIdOrSlugOrName.toLowerCase();
  if (c === 'hcm' || c.includes('ho-chi-minh') || c.includes('hồ chí minh')) cityKey = 'hcm';
  else if (c === 'hn' || c.includes('ha-noi') || c.includes('hà nội')) cityKey = 'hn';
  else if (c === 'dn' || c.includes('da-nang') || c.includes('đà nẵng')) cityKey = 'dn';
  else if (c === 'ct' || c.includes('can-tho') || c.includes('cần thơ')) cityKey = 'ct';
  else if (c === 'hp' || c.includes('hai-phong') || c.includes('hải phòng')) cityKey = 'hp';
  else if (c === 'bd' || c.includes('binh-duong') || c.includes('bình dương')) cityKey = 'bd';
  else if (c === 'dnai' || c.includes('dong-nai') || c.includes('đồng nai') || c.includes('biên hòa')) cityKey = 'dnai';
  else if (c === 'vt' || c.includes('vung-tau') || c.includes('vũng tàu') || c.includes('bà rịa')) cityKey = 'vt';
  else if (c === 'nt' || c.includes('nha-trang') || c.includes('khánh hòa')) cityKey = 'nt';
  else if (c === 'hue' || c.includes('huế')) cityKey = 'hue';

  const cityDistricts = DISTRICT_COORDINATES[cityKey];
  if (!cityDistricts) return null;

  if (cityDistricts[districtName]) {
    return cityDistricts[districtName];
  }

  const normDist = districtName.toLowerCase().replace('quận ', 'q').replace(/\s+/g, '');
  for (const [dName, coords] of Object.entries(cityDistricts)) {
    const keyNorm = dName.toLowerCase().replace('quận ', 'q').replace(/\s+/g, '');
    if (
      keyNorm === normDist ||
      dName.toLowerCase().includes(districtName.toLowerCase()) ||
      districtName.toLowerCase().includes(dName.toLowerCase())
    ) {
      return coords;
    }
  }

  return null;
}

// Calculate distance in km between two lat/lng points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find closest city preset given lat and lng
export function findClosestCity(latitude: number, longitude: number): CityPreset {
  let closest = POPULAR_CITIES[0];
  let minDistance = Infinity;

  for (const city of POPULAR_CITIES) {
    const dist = calculateDistance(latitude, longitude, city.latitude, city.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closest = city;
    }
  }
  return closest;
}

export function getStoredUserLocation(): UserLocation {
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.city && parsed.citySlug) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_USER_LOCATION;
}

export function saveUserLocation(loc: UserLocation): void {
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(loc));
    // Dispatch custom event for cross-component update
    window.dispatchEvent(new CustomEvent('user-location-updated', { detail: loc }));
  } catch {
    // ignore
  }
}

/**
 * Reverse geocode coordinates using OpenStreetMap Nominatim with graceful fallback
 */
async function reverseGeocodeCoordinates(
  lat: number,
  lng: number
): Promise<{ address?: string; district?: string; city?: string; citySlug?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
      {
        signal: controller.signal,
        headers: { 'Accept-Language': 'vi,en;q=0.8' },
      }
    );
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const district =
        addr.suburb ||
        addr.city_district ||
        addr.district ||
        addr.quarter ||
        addr.county;
      const city =
        addr.city ||
        addr.state ||
        addr.province ||
        addr.town;

      let addressParts = [district, city].filter(Boolean);
      let address = addressParts.length > 0 ? addressParts.join(', ') : data.display_name;

      const matchedCity = findClosestCity(lat, lng);
      return {
        address: address || `${matchedCity.name}`,
        district: district || matchedCity.districts[0],
        city: matchedCity.name,
        citySlug: matchedCity.citySlug,
      };
    }
  } catch {
    // Network or abort timeout
  }

  // Fallback to geometric closest city
  const closestCity = findClosestCity(lat, lng);
  return {
    address: `${closestCity.name}`,
    district: closestCity.districts[0],
    city: closestCity.name,
    citySlug: closestCity.citySlug,
  };
}

/**
 * Detect user's current GPS position via browser Geolocation API
 */
export async function detectGpsLocation(): Promise<UserLocation> {
  if (!navigator.geolocation) {
    throw new Error('Trình duyệt của bạn không hỗ trợ định vị GPS.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        try {
          const geoInfo = await reverseGeocodeCoordinates(latitude, longitude);
          const locationResult: UserLocation = {
            city: geoInfo.city || 'TP. Hồ Chí Minh',
            citySlug: geoInfo.citySlug || 'ho-chi-minh',
            district: geoInfo.district,
            address: geoInfo.address || `${geoInfo.city} (GPS)`,
            latitude,
            longitude,
            source: 'gps',
            updatedAt: new Date().toISOString(),
          };

          saveUserLocation(locationResult);
          resolve(locationResult);
        } catch {
          const closest = findClosestCity(latitude, longitude);
          const locationResult: UserLocation = {
            city: closest.name,
            citySlug: closest.citySlug,
            district: closest.districts[0],
            address: `${closest.name} (GPS)`,
            latitude,
            longitude,
            source: 'gps',
            updatedAt: new Date().toISOString(),
          };
          saveUserLocation(locationResult);
          resolve(locationResult);
        }
      },
      (error) => {
        let msg = 'Không thể lấy vị trí hiện tại.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Bạn chưa cấp quyền truy cập vị trí. Vui lòng cho phép hoặc chọn thủ công.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Vị trí hiện không khả dụng.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Quá thời gian kết nối GPS.';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60000,
      }
    );
  });
}

export function formatLocationDisplay(location?: UserLocation): string {
  if (!location) return 'Chưa xác định';
  if (location.district && location.city) {
    // If district already includes city name, prevent duplication
    if (location.district.toLowerCase().includes(location.city.toLowerCase())) {
      return location.district;
    }
    const shortCity = location.city.replace('Thành phố ', 'TP. ').replace('Tỉnh ', '');
    return `${location.district}, ${shortCity}`;
  }
  return location.address || location.city || 'Việt Nam';
}
