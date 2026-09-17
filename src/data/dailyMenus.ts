import { DailyMealOption, FamilyMealTray } from '../types';

/**
 * THỰC ĐƠN NẤU ĂN GIA ĐÌNH - MÂM CƠM 3 MÓN MỖI NGÀY KHÁC NHAU
 * Mỗi ngày mang đến mâm cơm gia đình hoàn chỉnh gồm:
 * 1. Món mặn chính (thịt/cá/tôm kho, rim, ram đậm đà đưa cơm)
 * 2. Món canh ngọt mát (canh rau củ, canh chua, canh sườn/thịt băm thanh nhiệt)
 * 3. Món xào / rau xanh (rau xào tỏi giòn ngọt, rau luộc kho quẹt)
 * Kèm gợi ý món ăn kèm/tráng miệng đưa cơm (cà pháo, dưa chua, hoa quả).
 */
export const DAILY_DAY_MENUS: DailyMealOption[] = [
  // ==========================================
  // THỨ HAI: Bữa cơm khởi đầu tuần thanh ngọt, dễ nấu
  // ==========================================
  {
    id: 't2',
    dayName: 'Thứ Hai',
    title: 'Mâm Cơm Thanh Ngọt - Cá Kho Tộ & Canh Chua Cá Lóc',
    tagline: 'Mâm cơm 3 món ấm cúng với cá kho tộ đậm vị, đĩa rau muống xào xanh giòn và tô canh chua cá lóc giải nhiệt.',
    targetAudience: 'Gia đình 3 - 5 người, công thức nhanh gọn sau giờ tan làm.',
    estimatedTotalCalories: '~620 kcal / người',
    avgBudget: '85.000đ - 110.000đ / mâm',
    familyLunch: {
      trayName: 'Mâm Cơm Trưa 3 Món Tiện Lợi',
      slot: 'Trưa',
      trayImage: '/images/mam_com_gia_dinh.jpg',
      servings: '3 - 4 người ăn',
      description: 'Bữa trưa nhanh gọn, giàu đạm và vitamin nạp năng lượng tiếp tục công việc.',
      ingredients: [
        {
          category: '🥩 Thực phẩm đạm chính',
          items: [
            '400g sườn non heo tươi (chặt khúc 3 - 4cm)',
            '150g thịt nạc dăm xay nhuyễn (nấu canh)',
          ],
        },
        {
          category: '🥬 Rau củ quả tươi',
          items: [
            '1 bó rau ngót vườn non sạch (vò dập nhẹ)',
            '350g đậu que non tước sạch xơ hai bên',
            '3 củ hành tím, 1 củ tỏi khô, ớt hiểm',
          ],
        },
        {
          category: '🧂 Gia vị & Phụ liệu nấu',
          items: [
            '2 thìa canh nước mắm truyền thống cốt nhĩ',
            '1 thìa canh đường vàng / đường thốt nốt',
            'Tiêu sọ xay nhuyễn, hạt nêm, dầu ăn sạch',
            'Cà pháo muối chua giòn & dưa hấu tráng miệng',
          ],
        },
      ],
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'suon-heo-rim-man-ngot',
          name: 'Sườn Heo Rim Mặn Ngọt Vàng Óng',
          description: 'Từng miếng sườn non chặt khúc vừa ăn, rim nước mắm tỏi ớt kẹo sền sệt quyện từng hạt cơm dẻo.',
          cookingTime: '25 phút',
          calories: '280 kcal',
          image: '/images/suon_heo_rim_man_ngot.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'canh-rau-ngot-thit-bam',
          name: 'Canh Rau Ngót Thịt Nạc Băm',
          description: 'Rau ngót vườn vò dập nấu cùng thịt nạc dăm ngọt lịm tự nhiên, giải độc thanh nhiệt hiệu quả.',
          cookingTime: '15 phút',
          calories: '95 kcal',
          image: '/images/canh_rau_ngot_thit_bam.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Giòn',
          dishId: 'dau-que-xao-toi',
          name: 'Đậu Que Xào Tỏi Giòn Ngọt',
          description: 'Đậu que tước xơ xào to lửa giữ màu xanh mướt, tỏi đập dập thơm lừng dậy mùi hấp dẫn.',
          cookingTime: '10 phút',
          calories: '85 kcal',
          image: '/images/dau_que_xao_toi.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Ăn Kèm Đưa Cơm',
          dishId: 'ca-phao-muoi-dua-hau',
          name: 'Cà Pháo Muối Giòn & Dưa Hấu Tráng Miệng',
          description: 'Cà pháo giòn rụm chấm mắm tôm hoặc mắm ớt, tráng miệng vài miếng dưa hấu mát ngọt.',
          cookingTime: '5 phút',
          calories: '60 kcal',
          image: '/images/ca_phao_muoi_dua_hau.jpg',
        },
      ],
    },
    familyDinner: {
      trayName: 'Mâm Cơm Tối 3 Món Sum Vầy Đầu Tuần',
      slot: 'Tối',
      trayImage: '/images/mam_com_gia_dinh.jpg',
      servings: '3 - 5 người ăn',
      description: 'Bữa tối quây quần với món cá kho tộ đậm đà và canh chua giải nhiệt ngày làm việc.',
      ingredients: [
        {
          category: '🥩 Thực phẩm đạm chính',
          items: [
            '500g cá lóc tươi sống (hoặc cá bống tươi, cắt khúc dày)',
            '100g thịt ba chỉ heo thái mỏng (kho cùng cá ngậy thơm)',
          ],
        },
        {
          category: '🥬 Rau củ quả tươi',
          items: [
            '1/2 quả dứa (thơm) chín gọt mắt thái lát',
            '2 quả cà chua chín mọng bổ múi cau',
            '1 cây dọc mùng (bạc hà), 100g giá đỗ tươi',
            '1 bó rau muống nước non ngắt ngọn',
            'Rau thơm ngò ôm (rau ngổ), ngò gai (mùi tàu)',
          ],
        },
        {
          category: '🧂 Gia vị & Phụ liệu nấu',
          items: [
            '1 vắt me chua lọc lấy nước cốt me',
            'Nước màu dừa Bến Tre nâu cánh gián',
            '3 thìa canh nước mắm cốt cá cơm đậm đà',
            'Tỏi khô 1 củ phi thơm, ớt hiểm đỏ, tiêu sọ xay',
            'Chuối cau tráng miệng thơm ngọt tự nhiên',
          ],
        },
      ],
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'com-ca-kho-to',
          name: 'Cá Bống / Cá Lóc Kho Tộ Tiêu Đen',
          description: 'Khúc cá săn chắc thấm đượm nước màu dừa cánh gián cay nồng tiêu sọ, mỡ hành óng ả cực kỳ hao cơm.',
          cookingTime: '35 phút',
          calories: '260 kcal',
          image: '/images/com_ca_kho_to.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'canh-chua-ca-loc',
          name: 'Canh Chua Cá Nấu Dứa & Cà Chua',
          description: 'Nước canh chua thanh dịu vị me dốt, dứa chín thơm ngọt, bạc hà giòn xốp và giá đỗ tươi sạch.',
          cookingTime: '20 phút',
          calories: '120 kcal',
          image: '/images/canh_chua_ca_loc.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Giòn',
          dishId: 'rau-muong-xao-toi',
          name: 'Rau Muống Xào Tỏi Lửa Lớn Xanh Mướt',
          description: 'Rau muống non ngắt ngọn xào mỡ tỏi lửa bốc khói, giữ trọn độ giòn ngọt tự nhiên không bị thâm.',
          cookingTime: '8 phút',
          calories: '90 kcal',
          image: '/images/rau_muong_xao_toi.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'chen-mam-nhi-chuoi-cau',
          name: 'Chén Mắm Nhĩ Ớt Xiêm & Chuối Cau Tráng Miệng',
          description: 'Nước mắm nhỉ dầm ớt hiểm chấm rau muống luộc hoặc cá kho, chuối cau ngọt thanh thơm lừng.',
          cookingTime: '3 phút',
          calories: '70 kcal',
          image: '/images/chen_mam_nhi_chuoi_cau.jpg',
        },
      ],
    },
  },

  // ==========================================
  // THỨ BA: Mâm cơm đậm đà, đổi vị thơm lừng
  // ==========================================
  {
    id: 't3',
    dayName: 'Thứ Ba',
    title: 'Mâm Cơm Đậm Đà - Thịt Kho Trứng & Canh Cua Mồng Tơi',
    tagline: 'Mâm cơm 3 món chuẩn vị mẹ nấu với nồi thịt kho tàu béo mềm, canh cua đồng mướp hương mát rượi và tép rang.',
    targetAudience: 'Gia đình có trẻ nhỏ và người lớn tuổi, mềm ngọt dễ ăn.',
    estimatedTotalCalories: '~680 kcal / người',
    avgBudget: '90.000đ - 120.000đ / mâm',
    familyLunch: {
      trayName: 'Mâm Cơm Trưa 3 Món Thanh Đạm',
      slot: 'Trưa',
      trayImage: '/images/mam_com_gia_dinh.jpg',
      servings: '3 - 4 người ăn',
      description: 'Thanh nhẹ, dễ tiêu hóa với món tôm rim thịt và rau củ luộc kho quẹt.',
      ingredients: [
        {
          category: '🥩 Thực phẩm đạm chính',
          items: [
            '250g tôm đồng hoặc tôm thẻ tươi (cắt râu ráo nước)',
            '250g thịt ba chỉ heo thái con chì nhỏ',
          ],
        },
        {
          category: '🥬 Rau củ quả tươi',
          items: [
            '1 quả bí đao non (500g) gọt vỏ thái mỏng',
            '1/2 cái bắp cải trắng giòn thái sợi',
            '2 quả cà chua chín đỏ, hành hoa, ngò rí',
          ],
        },
        {
          category: '🧂 Gia vị & Phụ liệu nấu',
          items: [
            'Nước mắm ngon, đường thốt nốt rim keo tôm thịt',
            'Tỏi băm, tiêu sọ cay ấm, dầu ăn',
            'Dưa giá đỗ hẹ chua giòn & quýt đường tráng miệng',
          ],
        },
      ],
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'tom-dong-rim-ba-chi',
          name: 'Tôm Đồng Rim Thịt Ba Chỉ Cháy Cạnh',
          description: 'Vỏ tôm giòn bóng màu đường thốt nốt, thịt ba chỉ săn xém cạnh thơm nức mùi hành phi tỏi ớt.',
          cookingTime: '25 phút',
          calories: '290 kcal',
          image: '/images/tom_dong_rim_ba_chi.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'canh-bi-xanh-tom-tuoi',
          name: 'Canh Bí Xanh Nấu Tôm Tươi',
          description: 'Bí đao xanh cắt lát mỏng nấu nước tôm tươi giã nhỏ ngọt thanh dịu mát, rắc chút hành ngò tiêu sọ.',
          cookingTime: '15 phút',
          calories: '80 kcal',
          image: '/images/canh_bi_xanh_tom.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Củ Quả',
          dishId: 'bap-cai-xao-ca-chua',
          name: 'Bắp Cải Xào Cà Chua Chua Ngọt',
          description: 'Bắp cải thái sợi giòn xào vừa chín tới cùng cà chua chín mọng, tạo vị chua dịu đưa cơm.',
          cookingTime: '10 phút',
          calories: '75 kcal',
          image: '/images/bap_cai_xao_ca_chua.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'dua-gia-do-he',
          name: 'Dưa Giá Đỗ Hẹ Chua Giòn & Quýt Đường',
          description: 'Dưa giá đỗ muối chua ngọt cùng hẹ và cà rốt chống ngấy tuyệt đối, tráng miệng quýt ngọt.',
          cookingTime: '5 phút',
          calories: '55 kcal',
          image: '/images/dua_gia_he_quyt_duong.jpg',
        },
      ],
    },
    familyDinner: {
      trayName: 'Mâm Cơm Tối 3 Món Chuẩn Cơm Mẹ Nấu',
      slot: 'Tối',
      trayImage: '/images/mam_com_gia_dinh.jpg',
      servings: '3 - 5 người ăn',
      description: 'Nồi thịt kho tàu nước dừa óng ả ăn cùng tô canh cua đồng mướp hương ngọt thơm ngào ngạt.',
      ingredients: [
        {
          category: '🥩 Thực phẩm đạm chính',
          items: [
            '500g thịt ba rọi heo (ba chỉ ngon, cắt miếng vuông)',
            '15 quả trứng cút (luộc bóc vỏ) hoặc 4 quả trứng gà ta',
            '350g cua đồng tươi giã nhuyễn lọc lấy nước riêu',
            '50g tôm khô loại ngon và 50g mỡ phần làm tóp mỡ',
          ],
        },
        {
          category: '🥬 Rau củ quả tươi',
          items: [
            '1 bó rau mồng tơi non rửa sạch ngắt lá',
            '1 quả mướp hương thơm ngát gọt vỏ thái vát',
            '1 quả bầu sao non gọt vỏ cắt khúc dài luộc',
            'Hành tím 4 củ, ớt hiểm đỏ, tỏi khô',
          ],
        },
        {
          category: '🧂 Gia vị & Phụ liệu nấu',
          items: [
            '1 quả dừa xiêm ngọt lấy nước dừa kho thịt',
            'Nước mắm nhỉ cốt nhĩ 40 độ đạm đậm đà',
            'Hạt tiêu đen xay nồng, đường phèn, dầu ăn',
            'Cà pháo muối giòn rụm & đĩa ổi giòn xí muội tráng miệng',
          ],
        },
      ],
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'thit-kho-tau',
          name: 'Thịt Kho Tàu Nước Dừa Trứng Cút',
          description: 'Thịt ba rọi mềm rục tan béo ngậy, trứng cút ngấm nước dừa xiêm vàng nâu bóng mượt đậm đà.',
          cookingTime: '45 phút',
          calories: '340 kcal',
          image: '/images/thit_kho_tau.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'canh-cua-dong',
          name: 'Canh Cua Đồng Mồng Tơi & Mướp Hương',
          description: 'Riêu cua đóng tảng béo bùi nổi trên mặt nồi canh mồng tơi xanh mướt, mướp hương thơm ngát nức mũi.',
          cookingTime: '20 phút',
          calories: '110 kcal',
          image: '/images/canh_cua_dong.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Giòn',
          dishId: 'bau-luoc-kho-quet',
          name: 'Bầu Luộc Chấm Kho Quẹt Tôm Khô',
          description: 'Từng khúc bầu non ngọt mát chấm vào tộ kho quẹt tóp mỡ tôm khô cay the hạt tiêu sọ.',
          cookingTime: '12 phút',
          calories: '95 kcal',
          image: '/images/bau_luoc_kho_quet.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'ca-phao-oi-xi-muoi',
          name: 'Cà Pháo Muối Trắng & Đĩa Ổi Giòn Rắc Xí Muội',
          description: 'Cà pháo cắn giòn rôm rốp hoà cùng vị canh cua, ổi gọt vỏ rắc xí muội tráng miệng.',
          cookingTime: '5 phút',
          calories: '65 kcal',
          image: '/images/ca_phao_oi_xi_muoi.jpg',
        },
      ],
    },
  },

  // ==========================================
  // THỨ TƯ: Mâm cơm dân dã miền quê, kích thích vị giác
  // ==========================================
  {
    id: 't4',
    dayName: 'Thứ Tư',
    title: 'Mâm Cơm Dân Dã - Sườn Xào Chua Ngọt & Canh Sườn Hầm',
    tagline: 'Mâm cơm giữa tuần rộn rã vị giác với sườn xào chua ngọt óng ả, bí đỏ hầm đậu phộng béo bùi và cải thìa xào nấm.',
    targetAudience: 'Mọi gia đình yêu thích hương vị sốt chua ngọt đậm đà cuốn hút.',
    estimatedTotalCalories: '~650 kcal / người',
    avgBudget: '95.000đ - 125.000đ / mâm',
    familyLunch: {
      trayName: 'Mâm Cơm Trưa 3 Món Đổi Gió',
      slot: 'Trưa',
      description: 'Món chả cá rim sốt cà và đĩa canh rau dền giải nhiệt trưa hè.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'cha-ca-thu-sot-ca',
          name: 'Chả Cá Thu Sốt Cà Chua Hành Thì Là',
          description: 'Chả cá chiên vàng dai giòn sốt cà chua đỏ thắm, rắc thì là và hành hoa thơm nồng nàn.',
          cookingTime: '20 phút',
          calories: '240 kcal',
          image: '/images/cha_ca_sot_ca.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'canh-rau-den-tom-kho',
          name: 'Canh Rau Dền Đỏ Nấu Tôm Khô',
          description: 'Màu nước canh hồng tía mát mắt, tôm khô giã nhuyễn tiết nước ngọt đậm đà bổ máu.',
          cookingTime: '15 phút',
          calories: '85 kcal',
          image: '/images/canh_rau_den_tom.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Giòn',
          dishId: 'su-su-xao-toi',
          name: 'Su Su Xào Tỏi Giòn Ngọt',
          description: 'Su su non thái sợi mỏng xào lửa lớn cùng tỏi phi, giữ trọn vị ngọt tự nhiên không đọng nước.',
          cookingTime: '10 phút',
          calories: '70 kcal',
          image: '/images/su_su_xao_toi.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Ăn Kèm',
          dishId: 'dua-leo-man-hau',
          name: 'Dưa Leo Cắt Lát Chấm Nước Sốt & Mận Hậu',
          description: 'Dưa leo giòn mát chấm sốt chả cá, tráng miệng mận hậu chấm muối tôm chua ngọt.',
          cookingTime: '5 phút',
          calories: '50 kcal',
          image: '/images/dua_leo_man_hau.jpg',
        },
      ],
    },
    familyDinner: {
      trayName: 'Mâm Cơm Tối 3 Món Trọn Vị Sườn Non',
      slot: 'Tối',
      description: 'Sườn xào chua ngọt vàng rộm cùng canh sườn hầm rau củ thanh bổ.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'suon-heo-rim-man-ngot',
          name: 'Sườn Non Xào Chua Ngọt Óng Ả',
          description: 'Sườn chặt miếng vuông vức tẩm bột chiên vàng, rim đẫm sốt giấm đường tỏi ớt bóng bẩy quyến rũ.',
          cookingTime: '30 phút',
          calories: '310 kcal',
          image: '/images/suon_heo_rim_man_ngot.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Bổ Dưỡng',
          dishId: 'canh-suon-bi-do',
          name: 'Canh Sườn Hầm Bí Đỏ Đậu Phộng',
          description: 'Bí đỏ hồ lô dẻo ngọt, đậu phộng bùi béo hầm cùng nước sườn heo ngọt thanh bổ não bổ huyết.',
          cookingTime: '35 phút',
          calories: '150 kcal',
          image: '/images/canh_suon_bi_do.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Giòn',
          dishId: 'cai-thia-xao-nam',
          name: 'Cải Thìa Xào Nấm Đông Cô Dầu Hào',
          description: 'Cải thìa xanh mướt xếp cánh hoa, nấm đông cô ngấm sốt dầu hào sền sệt thơm mùi vừng.',
          cookingTime: '12 phút',
          calories: '90 kcal',
          image: '/images/cai_thia_xao_nam.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'kim-chi-xoai-cat',
          name: 'Kim Chi Chua Cay & Xoài Cát Hòa Lộc',
          description: 'Kim chi chua cay giòn tan kích thích vị giác, xoài chín ngọt lịm thơm ngát.',
          cookingTime: '5 phút',
          calories: '75 kcal',
          image: '/images/kim_chi_xoai_cat.jpg',
        },
      ],
    },
  },

  // ==========================================
  // THỨ NĂM: Mâm cơm đậm chất vị biển miền Trung
  // ==========================================
  {
    id: 't5',
    dayName: 'Thứ Năm',
    title: 'Mâm Cơm Đậm Vị Biển - Cá Nục Kho Thơm & Mực Xào Chua Ngọt',
    tagline: 'Mâm cơm 3 món vị biển nồng nàn với cá nục kho dứa rục xương, mực tươi xào cần tỏi và canh cải nấu thịt băm.',
    targetAudience: 'Người thích các món cá biển kho săn thịt và hải sản xào giòn.',
    estimatedTotalCalories: '~610 kcal / người',
    avgBudget: '100.000đ - 130.000đ / mâm',
    familyLunch: {
      trayName: 'Mâm Cơm Trưa 3 Món Gọn Gàng',
      slot: 'Trưa',
      description: 'Món đùi gà kho sả ớt cay nồng ăn cùng canh khổ qua thanh nhiệt.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'ga-ta-kho-gung-sa-ot',
          name: 'Gà Ta Kho Gừng Sả Ớt Cay Nồng',
          description: 'Thịt gà ta chặt miếng vừa ăn săn chắc, dậy mùi gừng già cay nồng ấm bụng chống cảm lạnh.',
          cookingTime: '25 phút',
          calories: '270 kcal',
          image: '/images/ga_kho_gung_sa_ot.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'canh-kho-qua-don-thit',
          name: 'Canh Khổ Qua Dồn Thịt Băm Nấm Mèo',
          description: 'Vị đắng thanh nhẹ của khổ qua quyện thịt nạc băm nấm mèo ngọt lịm, giải độc gan cực tốt.',
          cookingTime: '25 phút',
          calories: '110 kcal',
          image: '/images/canh_kho_qua_don_thit.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Giòn',
          dishId: 'gia-do-xao-huyet-he',
          name: 'Giá Đỗ Xào Huyết & Hẹ Giòn',
          description: 'Giá đỗ giòn ngọt xào nhanh tay cùng huyết heo mềm mượt và lá hẹ xanh thơm phức.',
          cookingTime: '8 phút',
          calories: '75 kcal',
          image: '/images/gia_xao_huyet_he.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'dua-chua-muoi-xoi',
          name: 'Dưa Chua Muối Xổi & Thơm (Dứa) Chấm Muối Ớt',
          description: 'Dưa cải muối xổi giòn chua đưa cơm, thơm chín chấm muối ớt cay xè sảng khoái.',
          cookingTime: '5 phút',
          calories: '50 kcal',
          image: '/images/dua_chua_thom_muoi_ot.jpg',
        },
      ],
    },
    familyDinner: {
      trayName: 'Mâm Cơm Tối 3 Món Hương Biển Nồng Nàn',
      slot: 'Tối',
      description: 'Nồi cá nục kho thơm cay xè và đĩa mực xào cần tây hành tây giòn sần sật.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'ca-nuc-kho-thom',
          name: 'Cá Nục Kho Thơm (Dứa) Cà Chua Đậm Đà',
          description: 'Cá nục biển tươi kho nhừ rục xương, ngấm trọn vị chua ngọt của thơm chín và ớt hiểm cay the.',
          cookingTime: '40 phút',
          calories: '260 kcal',
          image: '/images/com_ca_kho_to.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'canh-cai-cuc-tom',
          name: 'Canh Cải Cúc (Tần Ô) Nấu Tôm Thịt',
          description: 'Rau tần ô vừa chín tới giữ mùi thơm đặc trưng thanh tao, nước canh tôm thịt trong veo ngọt lịm.',
          cookingTime: '12 phút',
          calories: '90 kcal',
          image: '/images/canh_cai_cuc_tom.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Món Xào Giòn',
          dishId: 'muc-ong-xao-can-tay',
          name: 'Mực Ống Tươi Xào Cần Tây Hành Tây',
          description: 'Mực ống tươi trắng nõn khía vảy rồng xào lửa bốc khói cùng cần tây, hành tây giòn ngọt thơm lừng.',
          cookingTime: '10 phút',
          calories: '150 kcal',
          image: '/images/muc_xao_can_tay.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'ot-xiem-buoi-da-xanh',
          name: 'Ớt Xiêm Xanh Dầm Nước Mắm & Bưởi Da Xanh',
          description: 'Nước mắm nhỉ dầm ớt xiêm thơm nức mũi, tráng miệng bưởi da xanh tép hồng mọng nước.',
          cookingTime: '5 phút',
          calories: '60 kcal',
          image: '/images/mam_ot_xiem_buoi.jpg',
        },
      ],
    },
  },

  // ==========================================
  // THỨ SÁU: Mâm cơm rộn rã chào đón cuối tuần
  // ==========================================
  {
    id: 't6',
    dayName: 'Thứ Sáu',
    title: 'Mâm Cơm Chào Cuối Tuần - Bò Xào Thiên Lý & Trứng Cuộn Thịt',
    tagline: 'Mâm cơm 3 món sum vầy sau tuần làm việc với đĩa thịt bò xào hoa thiên lý ngát hương, trứng cuộn thịt và canh nghêu mồng tơi.',
    targetAudience: 'Gia đình muốn bữa cơm phong phú, tươi mới để xả hơi đón ngày nghỉ.',
    estimatedTotalCalories: '~640 kcal / người',
    avgBudget: '110.000đ - 145.000đ / mâm',
    familyLunch: {
      trayName: 'Mâm Cơm Trưa 3 Món Nhanh Gọn',
      slot: 'Trưa',
      description: 'Món thịt ba chỉ luộc chấm mắm tôm chua cà pháo và canh mướp.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'thit-ba-chi-luoc',
          name: 'Thịt Ba Chỉ Luộc Cuộn Rau Chấm Mắm Nêm / Mắm Tôm',
          description: 'Thịt ba chỉ luộc thái mỏng trong veo giòn sần sật, chấm chén mắm nêm tỏi ớt dứa băm thơm lừng.',
          cookingTime: '20 phút',
          calories: '280 kcal',
          image: '/images/thit_ba_chi_luoc.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'canh-muop-huong-lac',
          name: 'Canh Mướp Hương Nấu Lạc (Đậu Phộng)',
          description: 'Mướp hương thái vát ngọt thanh quyện lạc sống giã giập béo bùi, hương vị đồng quê mộc mạc.',
          cookingTime: '15 phút',
          calories: '110 kcal',
          image: '/images/canh_muop_huong_lac.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Giòn',
          dishId: 'su-hao-ca-rot-muc',
          name: 'Cà Rốt & Su Hào Xào Mực Khô / Thịt Nạc',
          description: 'Su hào cà rốt thái chỉ xào giòn ngọt, điểm xuyết hạt tiêu đen thơm phức.',
          cookingTime: '12 phút',
          calories: '85 kcal',
          image: '/images/su_hao_ca_rot_muc.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'ca-phao-thanh-long',
          name: 'Cà Pháo Dầm Chua Ngọt & Thanh Long Ruột Đỏ',
          description: 'Cà pháo chua cay mặn ngọt rôm rốp, thanh long đỏ thanh mát giàu vitamin.',
          cookingTime: '5 phút',
          calories: '65 kcal',
          image: '/images/ca_phao_thanh_long.jpg',
        },
      ],
    },
    familyDinner: {
      trayName: 'Mâm Cơm Tối 3 Món Thịnh Soạn Cuối Tuần',
      slot: 'Tối',
      description: 'Bò xào hoa thiên lý ngát hương ăn cùng trứng cuộn vân mây và canh nghêu thanh mát.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'trung-cuon-van-may',
          name: 'Thịt Nạc Băm Cuộn Trứng Hấp Vân Mây',
          description: 'Lớp trứng vàng óng cuộn nhân thịt nạc mộc nhĩ nấm hương ngọt ngào, cắt khoanh tròn đẹp mắt.',
          cookingTime: '25 phút',
          calories: '240 kcal',
          image: '/images/trung_cuon_van_may.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Nhiệt',
          dishId: 'canh-ngheu-nau-chua',
          name: 'Canh Nghêu Nấu Chua Cà Chua & Dứa',
          description: 'Thịt nghêu ngọt giòn sần sật, nước canh chua dịu mát vị cà chua, hành thì là rắc đầy mặt bát.',
          cookingTime: '15 phút',
          calories: '95 kcal',
          image: '/images/canh_ngheu_nau_chua.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Món Xào Ngát Hương',
          dishId: 'bo-xao-thien-ly',
          name: 'Thịt Bò Xào Hoa Thiên Lý Giòn Ngọt',
          description: 'Thịt bò thăn mềm ướp tỏi xào lửa lớn cùng chùm hoa thiên lý xanh mướt, dậy mùi thơm thảo mộc dịu dàng.',
          cookingTime: '10 phút',
          calories: '180 kcal',
          image: '/images/bo_xao_thien_ly.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'ot-chuong-dua-leo-nhan',
          name: 'Ớt Chuông Dưa Leo Ngâm Chua & Nhãn Xuồng Cơm Vàng',
          description: 'Dưa chua giòn the kích thích ăn cơm, nhãn xuồng hạt tiêu ngọt lịm tráng miệng.',
          cookingTime: '5 phút',
          calories: '75 kcal',
          image: '/images/ot_chuong_nhan_xuong.jpg',
        },
      ],
    },
  },

  // ==========================================
  // THỨ BẢY: Mâm cơm đoàn viên ấm cúng, cầu kỳ hơn chút
  // ==========================================
  {
    id: 't7',
    dayName: 'Thứ Bảy',
    title: 'Mâm Cơm Đoàn Viên - Nem Rán Giòn Rụm & Canh Sườn Nấu Măng',
    tagline: 'Mâm cơm cuối tuần trọn vẹn tình thân với đĩa nem rán truyền thống vàng ruộm, gà hấp lá chanh và tô canh măng sườn thơm lừng.',
    targetAudience: 'Bữa cơm sum họp đại gia đình cuối tuần ấm áp.',
    estimatedTotalCalories: '~720 kcal / người',
    avgBudget: '130.000đ - 170.000đ / mâm',
    familyLunch: {
      trayName: 'Mâm Cơm Trưa 3 Món Thanh Dịu',
      slot: 'Trưa',
      description: 'Mâm cơm mát mẻ với cá diêu hồng hấp gừng hành và canh rau muống luộc dầm sấu.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'ca-dieu-hong-hap',
          name: 'Cá Diêu Hồng Hấp Gừng Hành Xì Dầu',
          description: 'Cá diêu hồng tươi nguyên con hấp chín mềm mọng nước, xì dầu sánh thơm đượm vị gừng non và hành hoa chẻ.',
          cookingTime: '25 phút',
          calories: '220 kcal',
          image: '/images/ca_dieu_hong_hap.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'nuoc-rau-muong-dam-sau',
          name: 'Nước Rau Muống Luộc Dầm Sấu / Chanh',
          description: 'Nước luộc rau trong vắt đánh sấu chua thanh tao xua tan cái nóng bức rực rỡ.',
          cookingTime: '10 phút',
          calories: '35 kcal',
          image: '/images/nuoc_rau_muong_dam_sau.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Giòn',
          dishId: 'rau-muong-luoc-tuong-ban',
          name: 'Rau Muống Luộc Chấm Tương Bần Hoặc Mắm Tỏi',
          description: 'Rau muống ngọn non xanh mướt luộc giòn, chấm chén tương nếp Bần ngọt bùi thơm nức.',
          cookingTime: '8 phút',
          calories: '60 kcal',
          image: '/images/rau_muong_luoc_tuong_ban.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'ca-bat-bo-sap',
          name: 'Cà Bát Muối Chua Cay & Bơ Sáp Dầm Đường Sữa',
          description: 'Cà bát giòn tan cắn ngập răng, ly bơ dầm mát lạnh kết thúc bữa trưa mỹ mãn.',
          cookingTime: '5 phút',
          calories: '110 kcal',
          image: '/images/ca_bat_bo_sap_dam.jpg',
        },
      ],
    },
    familyDinner: {
      trayName: 'Mâm Cơm Tối 3 Món Đại Tiệc Đoàn Viên',
      slot: 'Tối',
      description: 'Nem rán giòn rụm Hà Nội ăn cùng canh măng tươi sườn heo và gà đồi hấp lá chanh.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'nem-ran-ha-noi',
          name: 'Nem Rán Hà Nội Vàng Ruộm Giòn Tan',
          description: 'Vỏ nem giòn rụm bọc nhân thịt nạc, tôm nõn, mộc nhĩ miến dong và cà rốt thái sợi thơm bùi chấm mắm chua ngọt.',
          cookingTime: '40 phút',
          calories: '320 kcal',
          image: '/images/cha_gio.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Bổ Dưỡng',
          dishId: 'canh-mang-tuoi-suon',
          name: 'Canh Măng Tươi Nấu Sườn Heo Hành Hoa',
          description: 'Măng tươi tước sợi luộc kỹ giòn sần sật ninh cùng sườn heo béo mềm, rắc nhiều hành hoa ngò gai thơm ngát.',
          cookingTime: '35 phút',
          calories: '160 kcal',
          image: '/images/canh_mang_tuoi_suon.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Món Ngon Kèm',
          dishId: 'ga-doi-hap-la-chanh',
          name: 'Gà Đồi Hấp Muối Hột Lá Chanh',
          description: 'Da gà vàng óng giòn sần sật, thịt dai ngọt thơm nức mũi mùi lá chanh tươi thái chỉ chấm muối tiêu chanh ớt.',
          cookingTime: '30 phút',
          calories: '230 kcal',
          image: '/images/ga_doi_hap_la_chanh.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'do-chua-che-sen',
          name: 'Đồ Chua Đu Đủ Cà Rốt & Chè Hạt Sen Long Nhãn',
          description: 'Đồ chua giòn sần sật chống ngấy nem rán, tráng miệng chén chè sen long nhãn thanh ngọt an thần.',
          cookingTime: '15 phút',
          calories: '120 kcal',
          image: '/images/do_chua_che_hat_sen.jpg',
        },
      ],
    },
  },

  // ==========================================
  // CHỦ NHẬT: Mâm cơm thanh lọc bồi bổ, nhẹ bụng chuẩn bị tuần mới
  // ==========================================
  {
    id: 'cn',
    dayName: 'Chủ Nhật',
    title: 'Mâm Cơm Bồi Bổ Thanh Lọc - Canh Gà Hạt Sen & Tôm Cuốn',
    tagline: 'Mâm cơm 3 món thanh tao nhẹ bụng với gà hầm hạt sen táo đỏ bổ dưỡng, nấm rơm kho quẹt và đĩa gỏi cuốn tôm thịt thanh mát.',
    targetAudience: 'Cả gia đình quây quần thong thả, nạp lại năng lượng tinh thần.',
    estimatedTotalCalories: '~620 kcal / người',
    avgBudget: '120.000đ - 160.000đ / mâm',
    familyLunch: {
      trayName: 'Mâm Cơm Trưa 3 Món Thanh Đạm Tươi Mát',
      slot: 'Trưa',
      description: 'Gỏi cuốn tôm thịt tươi giòn và tô bún nước dùng thanh ngọt không dầu mỡ.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'goi-cuon-tom-thit',
          name: 'Gỏi Cuốn Tôm Thịt Chấm Tương Bơ Đậu Phộng',
          description: 'Tôm sú đỏ au, thịt ba chỉ luộc mỏng cùng xà lách hẹ cuốn bánh tráng dẻo, chấm tương bơ đậu phộng béo bùi.',
          cookingTime: '25 phút',
          calories: '220 kcal',
          image: '/images/goi_cuon_tom_thit_chuan.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Thanh Mát',
          dishId: 'canh-moc-nam-huong',
          name: 'Canh Mọc Nấu Nấm Hương Cà Rốt Su Hào',
          description: 'Viên mọc giò sống nấm hương thơm giòn bùi, nước canh củ quả hầm trong veo ngọt lịm tự nhiên.',
          cookingTime: '20 phút',
          calories: '120 kcal',
          image: '/images/canh_moc_nam_huong.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Món Chay Thanh Tịnh',
          dishId: 'nam-dui-ga-xao',
          name: 'Nấm Đùi Gà Xào Húng Quế Tiêu Đen',
          description: 'Nấm đùi gà cắt lát xào áp chảo dai ngọt như thịt, dậy mùi hương thơm the nồng của lá húng quế.',
          cookingTime: '10 phút',
          calories: '95 kcal',
          image: '/images/nam_dui_ga_xao_hung_que.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Kèm Đưa Cơm',
          dishId: 'dua-leo-nho-ninh-thuan',
          name: 'Dưa Leo Gọt Vỏ Chấm Muối Hột & Nho Xanh Ninh Thuận',
          description: 'Dưa leo vườn tươi mát rượi, nho xanh chua ngọt giòn tan mọng nước.',
          cookingTime: '5 phút',
          calories: '60 kcal',
          image: '/images/dua_leo_nho_xanh.jpg',
        },
      ],
    },
    familyDinner: {
      trayName: 'Mâm Cơm Tối 3 Món Bồi Bổ Dưỡng Tâm',
      slot: 'Tối',
      description: 'Gà ác hoặc gà ta hầm hạt sen táo đỏ bồi bổ khí huyết sẵn sàng cho tuần mới rực rỡ.',
      dishes: [
        {
          role: 'Món Mặn',
          roleTag: 'Món Mặn Chính',
          dishId: 'thit-bo-kho-gung-sa',
          name: 'Thịt Bò Kho Gừng Sả Dẻo Mềm Đưa Cơm',
          description: 'Nạm bò hoặc bắp bò kho gừng già đập dập và ớt sừng, từng thớ thịt mềm ngọt ngào đậm vị.',
          cookingTime: '45 phút',
          calories: '280 kcal',
          image: '/images/bo_kho_gung_sa.jpg',
        },
        {
          role: 'Món Canh',
          roleTag: 'Canh Đại Bổ',
          dishId: 'canh-ga-ham-hat-sen',
          name: 'Canh Gà Hầm Hạt Sen Táo Đỏ Kỷ Tử',
          description: 'Hạt sen Huế bở tơi bùi béo, táo đỏ ngọt thanh hầm cùng thịt gà ta bồi bổ thể chất, an giấc ngủ say.',
          cookingTime: '40 phút',
          calories: '180 kcal',
          image: '/images/canh_ga_ham_hat_sen.jpg',
        },
        {
          role: 'Món Xào / Rau',
          roleTag: 'Rau Xanh Giòn',
          dishId: 'rau-cai-xanh-luoc',
          name: 'Rau Cải Xanh Luộc Chấm Trứng Lòng Đào Dầm Nước Mắm',
          description: 'Cải cay non xanh luộc vừa chín tới chấm chén nước mắm nguyên chất dầm trứng gà ta lòng đào béo ngậy.',
          cookingTime: '10 phút',
          calories: '110 kcal',
          image: '/images/rau_cai_luoc_trung_long_dao.jpg',
        },
        {
          role: 'Ăn Kèm / Tráng Miệng',
          roleTag: 'Tráng Miệng',
          dishId: 'cam-sanh-du-du',
          name: 'Cam Sành Vắt Tươi Nguyên Chất & Đu Đủ Chín Cây',
          description: 'Ly nước cam tươi sảng khoái tăng cường đề kháng, đu đủ chín vàng ngọt lịm nhuận tràng.',
          cookingTime: '5 phút',
          calories: '70 kcal',
          image: '/images/cam_sanh_du_du.jpg',
        },
      ],
    },
  },
];

export const THEMATIC_MENUS = [
  {
    id: 'com-nha-me-nau',
    title: 'Mâm Cơm Nhà "Chuẩn Cơm Mẹ Nấu"',
    badge: 'Kinh điển gia đình',
    icon: 'Home',
    description: 'Bữa cơm đủ 1 món mặn rim kẹo + 1 đĩa xào giòn ngọt + 1 tô canh thanh mát và cà pháo giòn tan.',
    calories: '~650 kcal / bữa',
    items: [
      { role: 'Món Mặn', name: 'Thịt Ba Chỉ Kho Tàu Trứng Cút Nước Dừa', dishId: 'thit-kho-tau', image: '/images/thit_kho_tau.jpg' },
      { role: 'Món Xào', name: 'Rau Muống Xào Tỏi Lửa Lớn Giòn Xanh', dishId: 'rau-muong-xao-toi', image: '/images/rau_muong_xao_toi.jpg' },
      { role: 'Món Canh', name: 'Canh Cua Mồng Tơi Mướp Hương Cà Pháo', dishId: 'canh-cua-dong', image: '/images/canh_cua_dong.jpg' },
      { role: 'Tráng Miệng', name: 'Dưa Hấu Đỏ Hoặc Trà Sen Vàng Thơm Mát', dishId: 'dua-hau-do', image: '/images/ca_phao_muoi_dua_hau.jpg' },
    ],
  },
  {
    id: 'van-phong-tiet-kiem',
    title: 'Thực Đơn Trưa Nấu Mang Đi "Ngon - Sạch - Dưới 45K"',
    badge: 'Nấu hộp cơm tiện lợi',
    icon: 'Briefcase',
    description: 'Dành cho ai muốn nấu cơm mang đi làm: nhanh gọn dưới 30 phút, để lâu không hỏng và thơm ngon.',
    calories: '~550 kcal / bữa',
    items: [
      { role: 'Món Chính', name: 'Sườn Heo Rim Mặn Ngọt Vàng Óng', dishId: 'suon-heo-rim-man-ngot', image: '/images/suon_heo_rim_man_ngot.jpg' },
      { role: 'Ăn Kèm', name: 'Trứng Chiên Cuộn Hành Cà Chua', dishId: 'trung-cuon-van-may', image: '/images/thit_kho_tau.jpg' },
      { role: 'Món Canh', name: 'Canh Cải Ngọt Nấu Thịt Nạc Băm', dishId: 'canh-cai-ngot-thit-bam', image: '/images/canh_rau_ngot_thit_bam.jpg' },
      { role: 'Thức Uống', name: 'Nước Ép Cam Táo Mát Lành', dishId: 'nuoc-ep-cam-tao', image: '/images/chen_mam_nhi_chuoi_cau.jpg' },
    ],
  },
  {
    id: 'eat-clean-healthy',
    title: 'Mâm Cơm Gia Đình "Healthy - Ít Dầu Mỡ"',
    badge: 'Cân bằng Dinh dưỡng',
    icon: 'Leaf',
    description: 'Ưu tiên phương pháp hấp, luộc, canh ngọt rau củ quả tự nhiên giúp thanh lọc cơ thể nhẹ bụng.',
    calories: '~480 kcal / bữa',
    items: [
      { role: 'Món Chính', name: 'Cá Diêu Hồng Hấp Gừng Hành Xì Dầu', dishId: 'ca-dieu-hong-hap', image: '/images/com_ca_kho_to.jpg' },
      { role: 'Món Rau', name: 'Rau Củ Quả Luộc Ngũ Sắc Chấm Kho Quẹt', dishId: 'bau-luoc-kho-quet', image: '/images/bau_luoc_kho_quet.jpg' },
      { role: 'Món Canh', name: 'Canh Bí Đao Nấu Tôm Tươi Hạt Sen', dishId: 'canh-bi-xanh-tom-tuoi', image: '/images/canh_cua_dong.jpg' },
      { role: 'Tráng Miệng', name: 'Bưởi Da Xanh & Nước Ép Cần Tây', dishId: 'buoi-da-xanh', image: '/images/chen_mam_nhi_chuoi_cau.jpg' },
    ],
  },
  {
    id: 'lau-nuong-cuoi-tuan',
    title: 'Mâm Cơm Gia Đình Đổi Vị Cuối Tuần',
    badge: 'Sum vầy ấm cúng',
    icon: 'Flame',
    description: 'Thích hợp cho ngày nghỉ sum họp nhiều thế hệ, thưởng thức các món hầm và cuốn tươi ngon.',
    calories: '~750 kcal / bữa',
    items: [
      { role: 'Món Khai Vị', name: 'Gỏi Cuốn Tôm Thịt Bánh Tráng Dẻo', dishId: 'goi-cuon-tom-thit', image: '/images/goi_cuon.jpg' },
      { role: 'Món Mặn', name: 'Gà Đồi Hấp Muối Hột Lá Chanh', dishId: 'ga-doi-hap-la-chanh', image: '/images/com_ga_hoi_an.jpg' },
      { role: 'Món Canh', name: 'Canh Măng Tươi Nấu Sườn Heo Hành Hoa', dishId: 'canh-mang-tuoi-suon', image: '/images/canh_chua_ca_loc.jpg' },
      { role: 'Tráng Miệng', name: 'Chè Hạt Sen Long Nhãn Thanh Mát', dishId: 'che-hat-sen', image: '/images/chen_mam_nhi_chuoi_cau.jpg' },
    ],
  },
];

export const DEFAULT_TRAY_IMAGE = '/images/mam_com_gia_dinh.jpg';

export function getTrayIngredients(tray?: FamilyMealTray | null): { category: string; items: string[] }[] {
  if (!tray) return [];
  if (tray.ingredients && tray.ingredients.length > 0) {
    return tray.ingredients;
  }

  const proteinItems: string[] = [];
  const vegItems: string[] = [];
  const seasoningItems: string[] = [
    'Tỏi khô 1 củ, hành tím 3 củ băm nhuyễn',
    'Nước mắm ngon truyền thống cốt nhĩ, tiêu sọ xay, đường, dầu ăn',
    'Ớt hiểm đỏ hoặc ớt sừng cay nhẹ, hành hoa và ngò thơm',
  ];

  tray.dishes?.forEach((d) => {
    if (d.role === 'Món Mặn') {
      proteinItems.push(`Đạm chính cho món "${d.name}": 450g - 500g nguyên liệu tươi sạch`);
    } else if (d.role === 'Món Canh') {
      vegItems.push(`Rau củ / Xương hầm cho món "${d.name}": 300g - 400g rau xanh tươi`);
    } else if (d.role === 'Món Xào / Rau') {
      vegItems.push(`Rau xào giòn cho món "${d.name}": 350g rau tươi ngon`);
    } else if (d.role === 'Ăn Kèm / Tráng Miệng') {
      seasoningItems.push(`${d.name} (món ăn kèm đưa cơm & tráng miệng)`);
    }
  });

  return [
    {
      category: '🥩 Thực phẩm đạm chính',
      items: proteinItems.length > 0 ? proteinItems : ['400g - 500g thịt heo / cá tươi / tôm sạch'],
    },
    {
      category: '🥬 Rau củ quả tươi',
      items: vegItems.length > 0 ? vegItems : ['Rau xanh theo mùa 1-2 bó, cà chua và dưa non'],
    },
    {
      category: '🧂 Gia vị & Phụ liệu nấu',
      items: seasoningItems,
    },
  ];
}

