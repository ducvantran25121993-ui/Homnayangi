import { RegionalCuisine, RegionId } from '../types';

export const REGIONAL_CUISINES: RegionalCuisine[] = [
  {
    id: 'bac',
    slug: 'am-thuc-mien-bac',
    path: '/am-thuc-mien-bac',
    name: 'Ẩm Thực Miền Bắc',
    title: 'Tinh Hoa Thanh Cảnh & Vị Ngọt Tự Nhiên Của Đất Kinh Kỳ',
    badge: 'Hà Nội & Bắc Bộ',
    description:
      'Ẩm thực miền Bắc nổi bật bởi sự tinh tế, cầu kỳ và cân bằng gia vị vừa vặn. Không quá cay nồng như miền Trung cũng không thiên ngọt béo như phương Nam, món Bắc tôn vinh vị ngọt thanh tao của nước hầm xương, hương thơm ấm nồng của tiêu gừng hành hoa và giấm bỗng chua dịu.',
    tasteProfile: ['Thanh tao', 'Hài hòa', 'Dậy mùi tiêu gừng', 'Chua dịu giấm bỗng'],
    iconicKeyIngredients: [
      'Nước mắm cốt truyền thống',
      'Giấm bỗng nếp & mẻ ngấu',
      'Tiêu bắc cay dịu thơm sâu',
      'Hành hoa, thì là, tía tô, kinh giới',
    ],
    highlightTip:
      'Người miền Bắc chú trọng thưởng thức bằng mắt và khứu giác: bát nước phở phải trong veo, dĩa bún chả phải xém cạnh thơm mùi khói than hoa, đĩa xôi xéo phải vàng óng hạt nếp cái hoa vàng.',
    dishIds: [
      'pho-bo-tai-lan',
      'pho-bo-sot-vang',
      'bun-cha-ha-noi',
      'bun-dau-mam-tom',
      'xoi-xeo-ha-noi',
      'pho-cuon-ha-noi',
      'cha-ca-la-vong',
      'bun-thang-ha-noi',
      'nom-bo-kho',
    ],
    metaTitle: 'Ẩm Thực Miền Bắc - Tinh Hoa Hương Vị Thanh Tao Đất Kinh Kỳ | Hôm Nay Ăn Gì',
    metaDescription:
      'Khám phá tinh hoa ẩm thực miền Bắc: Hương vị thanh tao, hài hòa gia vị của phở bò tái lăn, bún chả than hoa, chả cá Lã Vọng, bún thang, xôi xéo và phở cuốn trứ danh.',
    keywords:
      'ẩm thực miền bắc, món ngon miền bắc, đặc sản miền bắc, ẩm thực hà nội, phở bò tái lăn, bún chả hà nội, chả cá lã vọng, bún thang, xôi xéo, phở cuốn',
    ogImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: 'trung',
    slug: 'am-thuc-mien-trung',
    path: '/am-thuc-mien-trung',
    name: 'Ẩm Thực Miền Trung',
    title: 'Đậm Đà Cay Nồng Nàn & Màu Sắc Rực Rỡ Xứ Cố Đô',
    badge: 'Huế & Duyên Hải Nam Trung Bộ',
    description:
      'Địa hình khắc nghiệt với nắng gió biển mặn tạo nên nét ẩm thực miền Trung vô cùng đặc sắc: vị đậm đà sâu thẳm, cay nồng xé lưỡi và màu sắc rực rỡ từ ớt đỏ và dầu màu điều. Ẩm thực Cố Đô Huế tinh xảo cầu kỳ từ cung đình đến đường phố, trong khi Đà Nẵng, Quảng Nam và Nha Trang lại cuốn hút bởi hải sản tươi giòn và bánh tráng cuốn trứ danh.',
    tasteProfile: ['Cay nồng nàn', 'Đậm đà sả ớt', 'Thơm nức mắm ruốc', 'Chua cay giòn ngọt'],
    iconicKeyIngredients: [
      'Mắm ruốc Huế cốt nguyên chất',
      'Sả cây nồng đượm',
      'Ớt chỉ thiên, ớt bột Cố Đô',
      'Dầu màu điều đỏ rực',
      'Bánh tráng phơi sương, mè rang',
    ],
    highlightTip:
      'Món ăn miền Trung luôn dọn kèm chén mắm mặn dầm ớt xanh cay xé hoặc sa tế thơm lừng sả phi. Vị cay không chỉ kích thích vị giác mà còn làm ấm người trong những ngày mưa bão xứ biển.',
    dishIds: [
      'bun-bo-hue',
      'mi-quang',
      'nem-nuong-nha-trang',
      'banh-canh-cha-ca',
      'com-ga-hoi-an',
      'banh-xeo-mien-trung',
      'banh-beo-chen',
      'nem-lui',
    ],
    metaTitle: 'Ẩm Thực Miền Trung - Đậm Đà Cay Nồng Nàn Xứ Cố Đô | Hôm Nay Ăn Gì',
    metaDescription:
      'Khám phá ẩm thực miền Trung đặc sắc: Vị cay nồng nàn, đậm đà mắm ruốc của bún bò Huế, mì Quảng, nem nướng Nha Trang, bánh canh chả cá, cơm gà Hội An và bánh bèo chén.',
    keywords:
      'ẩm thực miền trung, món ngon miền trung, đặc sản miền trung, ẩm thực huế, ẩm thực đà nẵng, bún bò huế, mì quảng, nem nướng nha trang, cơm gà hội an, bánh bèo chén',
    ogImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: 'nam',
    slug: 'am-thuc-mien-nam',
    path: '/am-thuc-mien-nam',
    name: 'Ẩm Thực Miền Nam & Sài Gòn',
    title: 'Hào Sảng Phóng Khoáng & Vị Béo Ngọt Đậm Chất Đường Phố',
    badge: 'Sài Gòn & Đông Nam Bộ',
    description:
      'Là vùng đất trù phú và điểm giao thoa văn hóa rực rỡ, ẩm thực Sài Gòn và miền Nam mang tính cách hào sảng, phóng khoáng của con người nơi đây. Món ăn miền Nam rõ vị: ngọt ra ngọt, cay ra cay, béo ngậy nước cốt dừa và rực rỡ sắc màu của các loại rau sống phong phú. Bữa ăn Sài Gòn tiện lợi, nhanh gọn nhưng luôn tràn đầy năng lượng tích cực.',
    tasteProfile: ['Ngọt béo đậm đà', 'Thơm ngậy mỡ hành', 'Hào sảng', 'Phong phú rau sống'],
    iconicKeyIngredients: [
      'Nước dừa xiêm tươi mát',
      'Nước cốt dừa béo ngậy',
      'Đường thốt nốt',
      'Mỡ hành tóp mỡ giòn rụm',
      'Nước mắm tỏi ớt kẹo chua ngọt',
    ],
    highlightTip:
      'Đĩa cơm tấm Sài Gòn không thể thiếu chén nước mắm kẹo bồng bềnh ớt tỏi băm và mui mỡ hành xanh mướt rưới lên miếng sườn nướng mọng nước.',
    dishIds: [
      'com-tam-suon-bi-cha',
      'hu-tieu-nam-vang',
      'banh-mi-thit-nuong',
      'banh-mi-chao',
      'pha-lau-bo',
      'com-ga-xoi-mo',
      'bo-kho-banh-mi',
      'goi-cuon-tom-thit',
    ],
    metaTitle: 'Ẩm Thực Miền Nam & Sài Gòn - Hào Sảng & Đậm Vị Phố Thị | Hôm Nay Ăn Gì',
    metaDescription:
      'Thưởng thức ẩm thực miền Nam & Sài Gòn: Hương vị béo ngọt, hào sảng phóng khoáng với cơm tấm sườn bì chả, hủ tiếu Nam Vang, bánh mì chảo, bò kho, phá lấu và gỏi cuốn tôm thịt.',
    keywords:
      'ẩm thực miền nam, ẩm thực sài gòn, món ngon miền nam, món ngon sài gòn, cơm tấm sườn bì chả, hủ tiếu nam vang, bánh mì thịt nướng, phá lấu bò, gỏi cuốn tôm thịt',
    ogImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: 'mientay',
    slug: 'am-thuc-mien-tay',
    path: '/am-thuc-mien-tay',
    name: 'Ẩm Thực Miền Tây Sông Nước',
    title: 'Hương Đồng Gió Nội & Đậm Đà Tình Nghĩa Phù Sa',
    badge: 'Đồng Bằng Sông Cửu Long',
    description:
      'Vùng châu thổ Cửu Long hào phóng ban tặng cho miền Tây nguồn thủy sản dồi dào và vô số loại rau đồng hoa dại: bông điên điển, bông súng, rau đắng, lục bình. Ẩm thực miền Tây mộc mạc, đậm chất thiên nhiên nhưng để lại dư vị khó phai nhờ vị mặn mà của các loại mắm cá linh, cá sặc và vị chua thanh mát lành của me dốt mùa nước nổi.',
    tasteProfile: ['Chua thanh me chín', 'Đậm đà mắm đồng', 'Mộc mạc dân dã', 'Bùi béo ngọt tự nhiên'],
    iconicKeyIngredients: [
      'Mắm cá linh, mắm cá sặc',
      'Bông điên điển, bông súng',
      'Cá lóc đồng, cá kèo tươi sống',
      'Me chua chín cây, dừa nước',
      'Rau đắng đất, rau ngò ôm',
    ],
    highlightTip:
      'Nồi lẩu mắm miền Tây sôi sùng sục giữa rổ rau rừng hơn 20 loại là đỉnh cao của sự hòa quyện đất trời sông nước Cửu Long.',
    dishIds: [
      'canh-chua-ca-loc',
      'lau-mam-mien-tay',
      'ca-kho-to',
      'lau-ca-keo-la-giang',
      'banh-xeo-mien-tay',
      'bun-nuoc-leo-soc-trang',
      'com-chay-kho-quet',
    ],
    metaTitle: 'Ẩm Thực Miền Tây Sông Nước - Hương Đồng Gió Nội & Đậm Tình Phù Sa | Hôm Nay Ăn Gì',
    metaDescription:
      'Khám phá ẩm thực miền Tây Nam Bộ: Nét mộc mạc dân dã, thơm ngon ngây ngất với lẩu mắm miền Tây, cá kho tộ, canh chua cá lóc, lẩu cá kèo lá giang và bánh xèo giòn rụm.',
    keywords:
      'ẩm thực miền tây, ẩm thực miền tây sông nước, đặc sản miền tây, món ngon miền tây, lẩu mắm miền tây, canh chua cá lóc, cá kho tộ, lẩu cá kèo, bánh xèo miền tây',
    ogImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&auto=format&fit=crop&q=80',
  },
];

export function getRegionById(id: string): RegionalCuisine | undefined {
  return REGIONAL_CUISINES.find((r) => r.id === id);
}

export function getRegionByPath(path: string): RegionalCuisine | undefined {
  const clean = path.replace(/\/$/, '') || '/';
  if (clean === '/am-thuc-mien-bac' || clean === '/am-thuc-vung-mien/mien-bac') {
    return REGIONAL_CUISINES.find((r) => r.id === 'bac');
  }
  if (clean === '/am-thuc-mien-trung' || clean === '/am-thuc-vung-mien/mien-trung') {
    return REGIONAL_CUISINES.find((r) => r.id === 'trung');
  }
  if (
    clean === '/am-thuc-mien-nam' ||
    clean === '/am-thuc-mien-nam-sai-gon' ||
    clean === '/am-thuc-vung-mien/mien-nam'
  ) {
    return REGIONAL_CUISINES.find((r) => r.id === 'nam');
  }
  if (
    clean === '/am-thuc-mien-tay' ||
    clean === '/am-thuc-mien-tay-song-nuoc' ||
    clean === '/am-thuc-vung-mien/mien-tay'
  ) {
    return REGIONAL_CUISINES.find((r) => r.id === 'mientay');
  }
  return undefined;
}

export function isRegionPath(path: string): boolean {
  return Boolean(getRegionByPath(path));
}

export function getRegionFromUrl(): RegionId | undefined {
  if (typeof window === 'undefined') return undefined;
  const match = getRegionByPath(window.location.pathname);
  return match?.id;
}

