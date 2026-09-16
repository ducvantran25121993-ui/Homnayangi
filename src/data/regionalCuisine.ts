import { RegionalCuisine } from '../types';

export const REGIONAL_CUISINES: RegionalCuisine[] = [
  {
    id: 'bac',
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
  },
  {
    id: 'trung',
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
  },
  {
    id: 'nam',
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
  },
  {
    id: 'mientay',
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
  },
];
