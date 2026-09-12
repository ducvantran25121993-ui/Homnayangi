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
