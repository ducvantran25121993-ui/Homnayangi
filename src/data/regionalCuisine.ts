import { RegionalCuisine, RegionId } from '../types';

export const REGIONAL_CUISINES: RegionalCuisine[] = [
  {
    id: 'bac',
    name: 'Ẩm Thực Miền Bắc',
    title: 'Tinh Hoa Thanh Cảnh & Vị Ngọt Tự Nhiên Của Đất Kinh Kỳ',
    badge: 'Hà Nội & Bắc Bộ',
    path: '/am-thuc-mien-bac',
    metaTitle: 'Ẩm Thực Miền Bắc - Tinh Hoa Hương Vị Thanh Tao Đất Kinh Kỳ | Hôm Nay Ăn Gì',
    metaDescription:
      'Khám phá tinh hoa ẩm thực miền Bắc: Hương vị thanh tao, hài hòa gia vị của phở bò tái lăn, bún chả than hoa, chả cá Lã Vọng, bún thang, xôi xéo và phở cuốn trứ danh.',
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
      'pho-bo-tai-nam-gau',
      'pho-ga-ta-la-chanh',
      'bun-cha-ha-noi',
      'bun-dau-mam-tom',
      'bun-thang-ha-noi',
      'bun-oc-nguoi-ha-noi',
      'bun-suon-moc-doc-mung',
      'bun-moc-ha-noi',
      'bun-ca-cay-hai-phong',
      'banh-da-cua-be',
      'banh-mi-que-hai-phong',
      'pho-cuon-thit-bo',
      'cha-ca-la-vong-ha-noi',
      'banh-cuon-nong-thit-bam',
      'xoi-xeo-ha-noi',
      'xoi-khuc-la-khuc',
      'com-rang-dua-bo',
      'chao-suon-sun-quay',
      'lau-rieu-cua-bap-bo',
      'mien-tron-ngan',
      'mien-luon-gion-xao-lan',
      'nom-bo-kho-ha-noi',
      'nem-chua-ran-ha-noi',
      'doi-sun-nuong-than-hoa',
      'de-tai-chanh-tuong-ban',
      'ga-nuong-com-lam',
    ],
  },
  {
    id: 'trung',
    name: 'Ẩm Thực Miền Trung',
    title: 'Đậm Đà Cay Nồng Nàn & Màu Sắc Rực Rỡ Xứ Cố Đô',
    badge: 'Huế & Duyên Hải Nam Trung Bộ',
    path: '/am-thuc-mien-trung',
    metaTitle: 'Ẩm Thực Miền Trung - Đậm Đà Cay Nồng Nàn Xứ Cố Đô | Hôm Nay Ăn Gì',
    metaDescription:
      'Khám phá ẩm thực miền Trung đặc sắc: Vị cay nồng nàn, đậm đà mắm ruốc của bún bò Huế, mì Quảng, nem nướng Nha Trang, bánh canh chả cá, cơm gà Hội An và bánh bèo chén.',
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
      'bun-bo-hue-dac-biet',
      'mi-quang-tom-thit',
      'com-ga-hoi-an',
      'banh-canh-ca-loc',
      'bun-ca-ngu-phu-yen',
      'banh-mi-cha-ca-nong',
      'nem-lui-nuong-cuon',
      'nem-nuong-nha-trang-cuon',
      'banh-beo',
      'ram-bap-cuon-rau',
      'banh-dap-mam-nem',
      'be-thui',
      'lau-ga-la-e',
      'banh-mi-xiu-mai-da-lat',
      'banh-trang-nuong-da-lat',
      'chao-bo-cau-hat-sen',
      'bun-bo-hue-chay',
      'muc-mot-nang-nuong-sa-te',
      'heo-quay-banh-hoi',
    ],
  },
  {
    id: 'nam',
    name: 'Ẩm Thực Miền Nam & Sài Gòn',
    title: 'Hào Sảng Phóng Khoáng & Vị Béo Ngọt Đậm Chất Đường Phố',
    badge: 'Sài Gòn & Đông Nam Bộ',
    path: '/am-thuc-mien-nam',
    metaTitle: 'Ẩm Thực Miền Nam & Sài Gòn - Hào Sảng & Đậm Vị Phố Thị | Hôm Nay Ăn Gì',
    metaDescription:
      'Thưởng thức ẩm thực miền Nam & Sài Gòn: Hương vị béo ngọt, hào sảng phóng khoáng với cơm tấm sườn bì chả, hủ tiếu Nam Vang, bánh mì chảo, bò kho, phá lấu và gỏi cuốn tôm thịt.',
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
      'hu-tieu-nam-vang-kho',
      'hu-tieu-go-sai-gon',
      'hu-tieu-sa-te-nai',
      'hu-tieu-mi-hoanh-thanh',
      'hu-tieu-muc-tuoi',
      'banh-mi-chao-xiu-mai',
      'banh-mi-thit-nuong',
      'banh-mi-heo-quay-gion',
      'banh-mi-pate-thap-cam',
      'bo-kho-banh-my-nong-gion',
      'pha-lau-bo',
      'com-ga-xoi-mo',
      'bot-chien-gion-trung-doi',
      'nui-xao-bo-ap-chao',
      'nui-gio-heo',
      'goi-cuon-tom-thit',
      'bun-thit-nuong-cha-gio',
      'banh-canh-cua-gio-heo',
      'banh-canh-ghe-nguyen-con',
      'banh-khot-tom-vung-tau',
      'bo-ne-chao-gang',
      'canh-bun-rau-muong',
      'banh-uot',
      'bun-mang-vit',
      'oc-huong-xao-bo-toi',
      'ca-vien-chien-nuoc-mam',
      'banh-trang-tron-sa-te',
    ],
  },
  {
    id: 'mientay',
    name: 'Ẩm Thực Miền Tây Sông Nước',
    title: 'Hương Đồng Gió Nội & Đậm Đà Tình Nghĩa Phù Sa',
    badge: 'Đồng Bằng Sông Cửu Long',
    path: '/am-thuc-mien-tay',
    metaTitle: 'Ẩm Thực Miền Tây Sông Nước - Hương Đồng Gió Nội & Đậm Tình Phù Sa | Hôm Nay Ăn Gì',
    metaDescription:
      'Khám phá ẩm thực miền Tây Nam Bộ: Nét mộc mạc dân dã, thơm ngon ngây ngất với lẩu mắm miền Tây, cá kho tộ, canh chua cá lóc, lẩu cá kèo lá giang và bánh xèo giòn rụm.',
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
      'bun-mam-mien-tay',
      'bun-nuoc-leo-soc-trang',
      'canh-chua-ca-loc',
      'lau-mam-mien-tay',
      'com-ca-kho-to',
      'com-chay-kho-quet',
      'chao-ca-loc-rau-dang',
      'lau-ca-keo-la-giang',
      'vit-nau-chao-can-tho',
      'ca-loc-nuong-trui',
      'goi-xoai-xanh-ca-sac',
      'goi-ngo-sen-tom-thit',
      'com-chien-ca-man',
      'banh-xeo-tom-thit-gion',
      'com-thit-kho-tau',
      'bao-tu-ham-tieu',
      'che-buoi-an-giang',
      'banh-chuoi-nuong-nuoc-cot-dua',
      'com-nieu-kho-quet-chay',
      'canh-chua-chay',
      'banh-xeo-chay',
    ],
  },
];

export function getRegionById(id: RegionId): RegionalCuisine | undefined {
  return REGIONAL_CUISINES.find((r) => r.id === id);
}

export function getRegionByPath(path: string): RegionalCuisine | undefined {
  const clean = path.replace(/\/$/, '') || '/';
  return REGIONAL_CUISINES.find((r) => r.path === clean);
}

export function getRegionFromUrl(): RegionId | null {
  if (typeof window === 'undefined') return null;
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  if (pathname === '/am-thuc-mien-bac' || pathname === '/am-thuc-vung-mien/mien-bac') {
    return 'bac';
  }
  if (pathname === '/am-thuc-mien-trung' || pathname === '/am-thuc-vung-mien/mien-trung') {
    return 'trung';
  }
  if (
    pathname === '/am-thuc-mien-nam' ||
    pathname === '/am-thuc-vung-mien/mien-nam' ||
    pathname === '/am-thuc-mien-nam-sai-gon'
  ) {
    return 'nam';
  }
  if (
    pathname === '/am-thuc-mien-tay' ||
    pathname === '/am-thuc-vung-mien/mien-tay' ||
    pathname === '/am-thuc-mien-tay-song-nuoc'
  ) {
    return 'mientay';
  }
  return null;
}

export function isRegionPath(path: string): boolean {
  const clean = path.replace(/\/$/, '') || '/';
  return (
    clean === '/am-thuc-mien-bac' ||
    clean === '/am-thuc-mien-trung' ||
    clean === '/am-thuc-mien-nam' ||
    clean === '/am-thuc-mien-tay' ||
    clean === '/am-thuc-vung-mien/mien-bac' ||
    clean === '/am-thuc-vung-mien/mien-trung' ||
    clean === '/am-thuc-vung-mien/mien-nam' ||
    clean === '/am-thuc-vung-mien/mien-tay' ||
    clean === '/am-thuc-mien-nam-sai-gon' ||
    clean === '/am-thuc-mien-tay-song-nuoc'
  );
}
