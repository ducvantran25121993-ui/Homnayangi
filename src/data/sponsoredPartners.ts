import { SponsoredPartner } from '../types';

/**
 * SAMPLE SPONSORED PARTNERS (Quán Đối Tác Được Đề Xuất)
 * Cho phép các quán ăn / chuỗi ẩm thực book quảng cáo theo từng món hoặc khu vực.
 */
export const SAMPLE_SPONSORED_PARTNERS: SponsoredPartner[] = [
  {
    id: 'partner-com-tam-ba-ghien',
    restaurantName: 'Cơm Tấm Ba Ghiền - Đặng Văn Ngữ',
    verifiedBadge: 'Quán Ngon Đề Xuất',
    dishIds: ['com-tam-suon-bi-cha', 'com-tam-suon-trung', 'com-tam', 'com-tam-suon-nuong'],
    logo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=120&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 2450,
    address: '84 Đặng Văn Ngữ, P. 10, Q. Phú Nhuận, TP.HCM',
    district: 'Quận Phú Nhuận',
    city: 'TP. Hồ Chí Minh',
    promoBadge: 'Tặng 1 canh rong biển + Giảm 15k',
    phone: '0903 123 456',
    shopeeFoodUrl: 'https://shopeefood.vn/ho-chi-minh/com-tam-ba-ghien-dang-van-ngu',
    grabFoodUrl: 'https://food.grab.com/vn/vi/restaurant/com-tam-ba-ghien',
    directBookingUrl: 'tel:0903123456',
    googleMapsUrl: 'https://maps.google.com/?q=Cơm+Tấm+Ba+Ghiền+84+Đặng+Văn+Ngữ',
    isActive: true,
  },
  {
    id: 'partner-pho-thin-lo-duc',
    restaurantName: 'Phở Thìn Lò Đúc Gia Truyền',
    verifiedBadge: 'Đối Tác Nổi Bật',
    dishIds: ['pho-bo-tai-lan', 'pho-bo', 'pho-ga-ta-la-chanh'],
    logo: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=120&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 1890,
    address: '13 Lò Đúc, P. Phạm Đình Hổ, Q. Hai Bà Trưng, Hà Nội',
    district: 'Quận Hai Bà Trưng',
    city: 'Hà Nội',
    promoBadge: 'Miễn phí thêm quẩy giòn & Trà đá',
    phone: '0912 345 678',
    shopeeFoodUrl: 'https://shopeefood.vn/ha-noi/pho-thin-lo-duc',
    grabFoodUrl: 'https://food.grab.com/vn/vi/restaurant/pho-thin',
    directBookingUrl: 'tel:0912345678',
    googleMapsUrl: 'https://maps.google.com/?q=Phở+Thìn+13+Lò+Đúc',
    isActive: true,
  },
  {
    id: 'partner-bun-bo-hue-o-xuan',
    restaurantName: 'Bún Bò Huế O Xuân - Chuẩn Vị Cố Đô',
    verifiedBadge: 'Quán Ngon Đề Xuất',
    dishIds: ['bun-bo-hue-dac-biet', 'bun-bo-hue'],
    logo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=120&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 1120,
    address: '5D Quang Trung, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội',
    district: 'Quận Hoàn Kiếm',
    city: 'Hà Nội',
    promoBadge: 'Giảm 20% khi đọc mã ANGIGIO',
    phone: '0988 776 554',
    shopeeFoodUrl: 'https://shopeefood.vn/ha-noi/bun-bo-hue-o-xuan',
    grabFoodUrl: 'https://food.grab.com/vn/vi/restaurant/bun-bo-o-xuan',
    directBookingUrl: 'tel:0988776554',
    googleMapsUrl: 'https://maps.google.com/?q=Bún+Bò+Huế+O+Xuân+Quang+Trung',
    isActive: true,
  },
  {
    id: 'partner-banh-mi-huynh-hoa',
    restaurantName: 'Bánh Mì Huỳnh Hoa - Sài Gòn',
    verifiedBadge: 'Quán Đang Rất Hot',
    dishIds: ['banh-mi-pate-thit-nguoi', 'banh-mi-thit-nuong-sa-te', 'banh-mi-chao-xa-xiu'],
    logo: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=120&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 3900,
    address: '26 Lê Thị Riêng, P. Bến Thành, Quận 1, TP.HCM',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    promoBadge: 'Giao hỏa tốc 15 phút',
    phone: '028 3925 0885',
    shopeeFoodUrl: 'https://shopeefood.vn/ho-chi-minh/banh-mi-huynh-hoa-le-thi-rieng',
    grabFoodUrl: 'https://food.grab.com/vn/vi/restaurant/banh-mi-huynh-hoa',
    directBookingUrl: 'tel:02839250885',
    googleMapsUrl: 'https://maps.google.com/?q=Bánh+Mì+Huỳnh+Hoa+Lê+Thị+Riêng',
    isActive: true,
  },
  {
    id: 'partner-salad-poke-green',
    restaurantName: 'Green Poke & Healthy Salad Bowl',
    verifiedBadge: 'Đối Tác Healthy',
    dishIds: ['salad-uc-ga-sot-me-rang', 'salad-ca-hoi-sot-chanh-leo', 'com-ga-xoi-mo'],
    logo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=120&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 860,
    address: '45 Thảo Điền, P. Thảo Điền, TP. Thủ Đức, TP.HCM',
    district: 'TP. Thủ Đức',
    city: 'TP. Hồ Chí Minh',
    promoBadge: 'Freeship đơn từ 100k',
    phone: '0938 990 112',
    shopeeFoodUrl: 'https://shopeefood.vn/ho-chi-minh/green-poke-healthy-salad',
    grabFoodUrl: 'https://food.grab.com/vn/vi/restaurant/green-poke',
    directBookingUrl: 'tel:0938990112',
    googleMapsUrl: 'https://maps.google.com/?q=Green+Poke+Thao+Dien',
    isActive: true,
  }
];

/**
 * Tìm kiếm quán đối tác phù hợp cho món ăn và khu vực của người dùng
 */
export function findSponsoredPartnerForDish(
  dishId: string,
  userCity?: string
): SponsoredPartner | undefined {
  if (!dishId) return undefined;

  // 1. Tìm quán tài trợ đúng món này
  const matches = SAMPLE_SPONSORED_PARTNERS.filter(
    (p) => p.isActive && p.dishIds.includes(dishId)
  );

  if (matches.length === 0) return undefined;

  // 2. Ưu tiên quán cùng thành phố của người dùng nếu có
  if (userCity) {
    const cityMatch = matches.find((p) =>
      p.city.toLowerCase().includes(userCity.toLowerCase()) ||
      userCity.toLowerCase().includes(p.city.toLowerCase())
    );
    if (cityMatch) return cityMatch;
  }

  // 3. Mặc định trả về đối tác đầu tiên
  return matches[0];
}
