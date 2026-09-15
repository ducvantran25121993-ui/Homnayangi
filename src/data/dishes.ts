import { Dish, Voucher } from '../types';
import { COM_XOI_DISHES } from './dishes/com_xoi';
import { BUN_PHO_MI_DISHES } from './dishes/bun_pho_mi';
import { BANHMI_CUON_DISHES } from './dishes/banhmi_cuon';
import { NUONG_CHIEN_DISHES } from './dishes/nuong_chien';
import { SALAD_MONNHE_DISHES } from './dishes/salad_monnhe';
import { LAU_CHAO_DISHES } from './dishes/lau_chao';
import { PIZZA_PASTA_DISHES } from './dishes/pizza_pasta';
import { DO_CHAY_DISHES } from './dishes/do_chay';
import { DO_UONG_DISHES } from './dishes/do_uong';
import { DO_AN_VAT_DISHES } from './dishes/do_an_vat';
import { MON_NHAU_DISHES } from './dishes/mon_nhau';

export {
  DO_UONG_DISHES,
  DO_AN_VAT_DISHES,
  MON_NHAU_DISHES,
};

// Total dishes matching taxonomy categories
export const INITIAL_DISHES: Dish[] = [
  ...COM_XOI_DISHES,
  ...BUN_PHO_MI_DISHES,
  ...BANHMI_CUON_DISHES,
  ...NUONG_CHIEN_DISHES,
  ...SALAD_MONNHE_DISHES,
  ...LAU_CHAO_DISHES,
  ...PIZZA_PASTA_DISHES,
  ...DO_CHAY_DISHES,
  ...DO_AN_VAT_DISHES,
  ...DO_UONG_DISHES,
  ...MON_NHAU_DISHES,
];

export interface WheelPreset {
  id: string;
  name: string;
  badge: string;
  group: 'categories' | 'themes';
  iconName:
    | 'Sparkles'
    | 'Flame'
    | 'Briefcase'
    | 'Coins'
    | 'Coffee'
    | 'Salad'
    | 'PartyPopper'
    | 'Utensils'
    | 'Soup'
    | 'Sandwich'
    | 'Drumstick'
    | 'Pizza'
    | 'Cookie'
    | 'Leaf';
  items: string[];
}

export const WHEEL_PRESETS: WheelPreset[] = [
  // 1. Tất cả món
  {
    id: 'tat_ca_all',
    name: 'Toàn Bộ Món Ăn',
    badge: `${INITIAL_DISHES.length} Món Đầy Đủ`,
    group: 'categories',
    iconName: 'Sparkles',
    items: INITIAL_DISHES.map((d) => d.vietnameseName || d.name),
  },
  // 2. Cơm & Xôi
  {
    id: 'com_xoi_all',
    name: 'Cơm & Xôi',
    badge: `${COM_XOI_DISHES.length} Món Đầy Đủ`,
    group: 'categories',
    iconName: 'Utensils',
    items: COM_XOI_DISHES.map((d) => d.vietnameseName || d.name),
  },
  // 3. Bún, Phở & Mì
  {
    id: 'bun_pho_mi_all',
    name: 'Bún, Phở & Mì',
    badge: `${BUN_PHO_MI_DISHES.length} Món Đầy Đủ`,
    group: 'categories',
    iconName: 'Soup',
    items: BUN_PHO_MI_DISHES.map((d) => d.vietnameseName || d.name),
  },
  // 4. Bánh Mì & Cuốn
  {
    id: 'banhmi_cuon_all',
    name: 'Bánh Mì & Cuốn',
    badge: `${BANHMI_CUON_DISHES.length} Món Đầy Đủ`,
    group: 'categories',
    iconName: 'Sandwich',
    items: BANHMI_CUON_DISHES.map((d) => d.vietnameseName || d.name),
  },
  // 5. Nướng & Chiên
  {
    id: 'nuong_chien_all',
    name: 'Nướng & Chiên',
    badge: `${NUONG_CHIEN_DISHES.length} Món Đầy Đủ`,
    group: 'categories',
    iconName: 'Drumstick',
    items: NUONG_CHIEN_DISHES.map((d) => d.vietnameseName || d.name),
  },
  // 6. Salad & Món Nhẹ
  {
    id: 'salad_monnhe_all',
    name: 'Salad & Món Nhẹ',
    badge: `${SALAD_MONNHE_DISHES.length} Món Healthy`,
    group: 'categories',
    iconName: 'Salad',
    items: SALAD_MONNHE_DISHES.map((d) => d.vietnameseName || d.name),
  },
  // 7. Lẩu & Cháo
  {
    id: 'lau_chao_all',
    name: 'Lẩu & Cháo',
    badge: `${LAU_CHAO_DISHES.length} Món Nóng Hổi`,
    group: 'categories',
    iconName: 'Flame',
    items: LAU_CHAO_DISHES.map((d) => d.vietnameseName || d.name),
  },
  // 8. Pizza & Pasta
  {
    id: 'pizza_pasta_all',
    name: 'Pizza & Pasta',
    badge: `${PIZZA_PASTA_DISHES.length} Món Á - Âu`,
    group: 'categories',
    iconName: 'Pizza',
    items: PIZZA_PASTA_DISHES.map((d) => d.vietnameseName || d.name),
  },
  // 9. Đồ Chay Thanh Tịnh
  {
    id: 'do_chay_all',
    name: 'Đồ Chay Thanh Tịnh',
    badge: `${DO_CHAY_DISHES.length} Món Thanh Đạm`,
    group: 'categories',
    iconName: 'Leaf',
    items: DO_CHAY_DISHES.map((d) => d.vietnameseName || d.name),
  },

  // 9. Chủ đề phong cách: Đại tiệc siêu to
  {
    id: 'sieu_to_khong_lo',
    name: 'Đại Tiệc Siêu To',
    badge: '20 Món Ngon',
    group: 'themes',
    iconName: 'Flame',
    items: [
      'Cơm tấm sườn bì chả',
      'Phở bò sốt vang',
      'Bún bò giò gân',
      'Gà rán giòn cay',
      'Bún đậu mẹt đầy đủ',
      'Bánh mì chảo xíu mại',
      'Cơm gà sốt teriyaki',
      'Lẩu Thái mini chua cay',
      'Mì trộn xá xíu trứng lòng đào',
      'Bánh mì thịt nướng',
      'Hủ tiếu Nam Vang',
      'Cơm chiên kim chi',
      'Xôi gà xé mỡ hành',
      'Mì xào bò rau cải',
      'Bánh ướt lòng gà',
      'Bánh canh ghẹ bột lọc',
      'Bột chiên giòn đôi trứng',
      'Bún chả que tre',
      'Cơm thố bò xào nấm',
      'Nem nướng Nha Trang',
    ],
  },
  {
    id: 'van_phong',
    name: 'Dân Văn Phòng',
    badge: '16 Món Trưa',
    group: 'themes',
    iconName: 'Briefcase',
    items: [
      'Cơm tấm sườn bì chả',
      'Bún bò Huế đặc biệt',
      'Bún đậu mắm tôm',
      'Cơm gà xối mỡ giòn da',
      'Bánh mì chảo xíu mại',
      'Phở bò tái lăn Hà Nội',
      'Bún chả que tre nướng than',
      'Cơm rang dưa bò giòn sần sật',
      'Hủ tiếu Nam Vang thập cẩm',
      'Mì cay Hàn Quốc cấp độ 2',
      'Cơm niêu xèo xèo Singapore',
      'Bún thịt nướng chả giò giòn rụm',
      'Bánh canh cua giò heo béo ngậy',
      'Cơm rang kim chi thịt bò',
      'Bún riêu cua bắp bò ốc giòn',
      'Cơm sườn cốt lết nướng mật ong',
    ],
  },
  {
    id: 'tiet_kiem',
    name: 'Sinh Viên Tiết Kiệm',
    badge: '16 Món < 35k',
    group: 'themes',
    iconName: 'Coins',
    items: [
      'Bánh mì pate thịt nướng',
      'Hủ tiếu gõ giò heo',
      'Cơm chiên trứng xúc xích',
      'Xôi gà xé mỡ hành',
      'Mì tôm xào bò rau cải',
      'Bánh ướt chả lụa nem chua',
      'Bánh canh bột lọc chả cá',
      'Bột chiên giòn đôi trứng',
      'Bánh mì chả cá Nha Trang',
      'Bún xào chay đậu hũ',
      'Xôi xéo đậu xanh ruốc hành',
      'Cháo sườn quẩy giòn nóng hổi',
      'Bánh cuốn nóng thịt băm',
      'Bánh giò nóng thịt mộc nhĩ',
      'Cơm nắm muối vừng ruốc',
      'Mì xào trứng xúc xích hành hoa',
    ],
  },
  {
    id: 'tra_sua',
    name: 'Trà Sữa & Đồ Uống',
    badge: '20 Món Hot Trend',
    group: 'themes',
    iconName: 'Coffee',
    items: [
      'Trà sữa trân châu đường đen',
      'Trà đào cam sả thanh mát',
      'Trà vải lài thơm dịu',
      'Trà xoài macchiato kem cheese',
      'Cà phê muối béo ngậy',
      'Cà phê sữa đá Sài Gòn',
      'Trà sen vàng kem cheese',
      'Trà dâu tằm tuyết mát lạnh',
      'Matcha đậu đỏ kem sữa',
      'Trà ổi hồng xí muội giải nhiệt',
      'Sữa tươi trân châu đường đen',
      'Rau má đậu xanh cốt dừa',
      'Nước ép cam cà rốt tươi',
      'Sinh tố bơ dừa béo mịn',
      'Trà măng cụt hoa đậu biếc',
      'Trà chanh giã tay Quảng Đông',
      'Trà tắc xí muội mát lạnh',
      'Cacao dầm trân châu phô mai',
      'Trà ô long sữa nướng trân châu',
      'Sữa chua dẻo dâu tây',
    ],
  },
  {
    id: 'an_vat',
    name: 'Ăn Vặt Đường Phố',
    badge: '20 Món Chiều Giòn Ngon',
    group: 'themes',
    iconName: 'Cookie',
    items: [
      'Bánh tráng trộn tôm khô sa tế',
      'Bánh tráng nướng Đà Lạt sốt me',
      'Nem chua rán giòn phố cổ',
      'Chân gà sả tắc rút xương giòn cay',
      'Bột chiên giòn đôi trứng hành hoa',
      'Cá viên chiên sốt mắm tỏi ớt',
      'Xiên que chiên giòn rụm chấm tương',
      'Khoai tây lắc phô mai giòn rụm',
      'Xoài non lắc muối tôm giòn chua',
      'Trứng cút lộn xào me chua ngọt',
      'Bắp xào bơ tép mỡ hành',
      'Bò bía ngọt dừa nạo mè đen',
      'Bánh flan caramen béo ngậy',
      'Tàu hũ trân châu nước cốt dừa',
      'Chè khúc bạch thanh mát ngọt thanh',
      'Sữa chua trân châu Hạ Long',
      'Bingsu dâu tây tuyết mịn',
      'Ốc hương xào bơ tỏi thơm lừng',
      'Bánh tráng cuốn bơ sốt me cay',
      'Gỏi cuốn tôm thịt sốt tương bơ',
    ],
  },
  {
    id: 'do_chay_theme',
    name: 'Đồ Chay Thanh Tịnh',
    badge: '16 Món Thanh Khiết',
    group: 'themes',
    iconName: 'Leaf',
    items: [
      'Cơm chay sườn non kho tiêu',
      'Bún bò Huế chay nấm đậu hũ',
      'Phở chay nấm đùi gà rau thơm',
      'Bún riêu cua chay ngập riêu',
      'Hủ tiếu chay rau củ nấm tuyết',
      'Bún chả giò chay rau sống',
      'Cơm chiên nấm hạt sen',
      'Cơm niêu nấm rơm kho quẹt chay',
      'Đậu hũ sốt cà nấm hương',
      'Canh chua nấm đậu bắp',
      'Bánh xèo nấm chay giòn rụm',
      'Lẩu nấm chay thập cẩm',
      'Mì xào giòn chay nấm rơm',
      'Gỏi ngó sen chay đậu phộng',
      'Chả giò chay nấm khoai môn',
      'Bánh canh nấm đậu hũ chay',
    ],
  },
  {
    id: 'healthy',
    name: 'Eat Clean & Giữ Dáng',
    badge: '16 Món Healthy',
    group: 'themes',
    iconName: 'Salad',
    items: [
      'Salad ức gà sốt mè rang',
      'Cơm gạo lứt cá hồi Nauy áp chảo',
      'Gỏi cuốn tôm thịt chấm sốt bơ đậu phộng',
      'Poke bowl cá ngừ đại dương tươi rói',
      'Bún gạo lứt trộn thịt nướng healthy',
      'Cháo yến mạch hạt sen nấm hương',
      'Nước ép cần tây táo xanh thanh lọc',
      'Sữa chua Hy Lạp hạt granola hoa quả',
      'Salad bơ trứng lòng đào sốt chanh leo',
      'Bánh mì đen kẹp bơ trứng luộc',
      'Bún nứt thịt nướng than rau mầm',
      'Cơm súp lơ xào tôm nõn thanh đạm',
      'Canh rong biển đậu hũ non thanh mát',
      'Smoothie việt quất chuối bơ lạc',
      'Cá chẽm áp chảo thì là thảo mộc',
      'Salad cá ngừ ngô ngọt sốt sữa chua',
    ],
  },
  {
    id: 'cuoi_tuan',
    name: 'Cuối Tuần Tụ Tập',
    badge: '32 Món Nhậu & Mồi Bén Lai Rai',
    group: 'themes',
    iconName: 'PartyPopper',
    items: [
      'Lẩu Thái Hải Sản Chua Cay',
      'Lẩu Riêu Cua Bắp Bò Sườn Sụn',
      'Lẩu Bò Nhúng Dấm Ba Toa',
      'Lẩu Gà Lá É Đà Lạt',
      'Lẩu Ếch Măng Cay Sa Tế',
      'Lẩu Gà Tiềm Ớt Hiểm',
      'Bò Tơ Củ Chi Nướng Ngói',
      'Bò Tơ Nướng Tảng Sốt Trứng Muối',
      'Dẻ Sườn Heo Nướng Tảng BBQ',
      'Bò Cuộn Nấm Nướng Ngói',
      'Chân Gà Nướng Mật Ong',
      'Dồi Sụn Nướng Than Hoa',
      'Chim Cút Quay Mật Ong',
      'Gà Nướng Cơm Lam Tây Bắc',
      'Chân Gà Sả Tắc Rút Xương',
      'Sụn Gà Chiên Giòn Rang Muối',
      'Dê Tái Chanh Ninh Bình',
      'Lòng Bò Giòn Xào Dưa Chua',
      'Tai Heo Sốt Thái Cóc Non',
      'Bắp Bò Hoa Ngâm Mắm Chua Ngọt',
      'Hàu Sữa Nướng Mỡ Hành & Phô Mai',
      'Bạch Tuộc Nướng Sa Tế Giòn',
      'Mực Trứng Nướng Muối Ớt',
      'Mực Một Nắng Nướng Than Hoa',
      'Ốc Hương Cồ Xào Bơ Tỏi',
      'Chả Cá Lã Vọng Thì Là',
      'Nem Chua Rán Giòn Rụm',
      'Heo Quay Da Giòn Bánh Hỏi',
      'Gỏi Xoài Xanh Khô Cá Sặc',
      'Trứng Cút Lộn Xào Me',
      'Cơm Cháy Kho Quẹt Tôm Khô',
      'Nem Nướng Nha Trang Cuốn Ram',
    ],
  },
];

export const HOT_VOUCHERS: Voucher[] = [
  {
    id: 'v_shopee_30k',
    platform: 'shopeefood',
    code: 'SPF30KNEW',
    discountText: 'Giảm 30.000đ cho đơn từ 0đ',
    minOrder: 'Đơn từ 0đ (Khách hàng mới)',
    expireDate: 'Còn 2 ngày',
    description: 'Áp dụng cho toàn bộ quán đối tác ShopeeFood trên toàn quốc khi thanh toán qua ShopeePay.',
    affiliateUrl: 'https://shopeefood.vn',
  },
  {
    id: 'v_shopee_free',
    platform: 'shopeefood',
    code: 'FREESHIPXTRA',
    discountText: 'Freeship đơn từ 50.000đ',
    minOrder: 'Đơn từ 50.000đ',
    expireDate: 'Hôm nay',
    description: 'Miễn phí vận chuyển đến 15.000đ cho các quán có logo Xtra.',
    affiliateUrl: 'https://shopeefood.vn',
  },
  {
    id: 'v_grab_40k',
    platform: 'grabfood',
    code: 'GRABFOOD40',
    discountText: 'Giảm ngay 40.000đ',
    minOrder: 'Đơn từ 120.000đ',
    expireDate: 'Hạn cuối tuần',
    description: 'Mã vạn năng áp dụng cho tất cả nhà hàng Quán Ngon GrabFood.',
    affiliateUrl: 'https://food.grab.com/vn/vi/',
  },
  {
    id: 'v_grab_chieu',
    platform: 'grabfood',
    code: 'ANVATCHIEU',
    discountText: 'Giảm 25% trà sữa & ăn vặt',
    minOrder: 'Đơn từ 60.000đ',
    expireDate: '14h - 17h mỗi ngày',
    description: 'Khao deal trà sữa trân châu, bánh tráng, đồ ăn vặt giờ xế chiều.',
    affiliateUrl: 'https://food.grab.com/vn/vi/',
  },
  {
    id: 'v_be_35k',
    platform: 'befood',
    code: 'BEFOOD35',
    discountText: 'Giảm 35.000đ đơn đầu',
    minOrder: 'Đơn từ 70.000đ',
    expireDate: 'Còn hiệu lực',
    description: 'Áp dụng khi đặt đồ ăn giao qua BeFood tại Hà Nội và TP.HCM.',
    affiliateUrl: 'https://be.com.vn/dich-vu/be-food/',
  },
];

export const FOOD_TAROT_CARDS = [
  {
    id: 'tarot_1',
    title: 'Lá Bài: Vua Cơm Tấm',
    quote: '"Vũ trụ mách bảo bạn đang hao hụt calo nghiêm trọng. Hãy nạp ngay một đĩa Cơm Tấm sườn bì chả để lấy lại vị thế đỉnh cao!"',
    recommendedDish: 'Cơm Tấm Sườn Bì Chả',
    luckyNumber: 8,
    appPick: 'shopeefood',
  },
  {
    id: 'tarot_2',
    title: 'Lá Bài: Nước Dùng Chữa Lành',
    quote: '"Tâm hồn bạn hôm nay cần được ủi an bằng một bát nước dùng bốc khói đậm vị. Một tô Phở Bò Tái Lăn ngập hành sẽ cứu rỗi ngày hôm nay!"',
    recommendedDish: 'Phở Bò Tái Lăn Hà Nội',
    luckyNumber: 12,
    appPick: 'grabfood',
  },
  {
    id: 'tarot_3',
    title: 'Lá Bài: Phép Màu Mắm Tôm',
    quote: '"Hãy dũng cảm đối diện với đam mê! Một mẹt Bún Đậu ngập topping chả cốm chấm mắm tôm đánh sủi bọt sẽ xua tan mọi mệt mỏi!"',
    recommendedDish: 'Bún Đậu Mắm Tôm Thập Cẩm',
    luckyNumber: 27,
    appPick: 'shopeefood',
  },
  {
    id: 'tarot_4',
    title: 'Lá Bài: Năng Lượng Ngọt Ngào',
    quote: '"Đừng cố gắng chịu đựng cơn buồn ngủ lúc 3 giờ chiều. Một ly Trà Sữa full trân châu đường đen 70% đường 50% đá là chân ái!"',
    recommendedDish: 'Trà Sữa Trân Châu Đường Đen',
    luckyNumber: 5,
    appPick: 'grabfood',
  },
  {
    id: 'tarot_5',
    title: 'Lá Bài: Chiến Binh Da Giòn',
    quote: '"Cuộc đời quá ngắn để ăn đồ luộc nhạt nhẽo. Cơm Gà Xối Mỡ da giòn rụm chấm nước sốt mặn ngọt đang chờ bạn chốt đơn!"',
    recommendedDish: 'Cơm Gà Xối Mỡ Da Giòn',
    luckyNumber: 99,
    appPick: 'befood',
  },
  {
    id: 'tarot_6',
    title: 'Lá Bài: Thanh Lọc Cơ Thể',
    quote: '"Vũ trụ nhắc nhở bạn đã nạp quá nhiều tinh bột và dầu mỡ tuần qua. Hãy lắng nghe cơ thể với một đĩa Salad ức gà áp chảo healthy!"',
    recommendedDish: 'Salad Ức Gà Áp Chảo Eat Clean',
    luckyNumber: 1,
    appPick: 'grabfood',
  },
];
