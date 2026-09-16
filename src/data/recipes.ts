import { Dish, DishRecipe } from '../types';

export const CURATED_RECIPES: Record<string, DishRecipe> = {
  'pho-bo-tai-lan': {
    dishId: 'pho-bo-tai-lan',
    dishName: 'Phở Bò Tái Lăn Hà Nội',
    prepTime: '25 phút',
    cookTime: '3 - 4 giờ (nước dùng) / 5 phút (xào bò)',
    difficulty: 'Trung bình',
    servings: '4 - 5 người',
    ingredients: [
      {
        category: 'Nguyên liệu chính',
        items: [
          '500g thịt bò thăn mềm (thái mỏng ngang thớ)',
          '1kg bánh phở tươi',
          '1.5kg xương ống bò hoặc xương đuôi',
          'Hành lá (cắt khúc 3cm và đầu hành chẻ), ngò gai, rau mùi',
        ],
      },
      {
        category: 'Hương liệu nấu nước dùng',
        items: [
          '1 củ gừng già nướng thơm đập dập',
          '3 củ hành tím nướng',
          '2 hoa hồi, 1 thanh quế, 1 thảo quả nướng thơm',
          'Gia vị: Nước mắm ngon, muối hạt, đường phèn, hạt nêm',
        ],
      },
      {
        category: 'Gia vị xào tái lăn',
        items: [
          '2 củ tỏi băm nhuyễn',
          '1 củ gừng thái chỉ nhỏ',
          '2 thìa canh mỡ nước (hoặc dầu ăn)',
          '1 thìa cà phê tiêu bắc xay, 1 thìa canh nước mắm cốt',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Hầm nước dùng chuẩn vị Phở Bắc',
        description:
          'Xương bò chần qua nước sôi cùng gừng và muối để khử sạch bọt bẩn. Rửa lại thật sạch rồi cho vào nồi hầm cùng 4 lít nước, gừng và hành tím nướng. Ninh lửa liu riu, hớt bọt liên tục. Cho túi hoa hồi, quế, thảo quả vào nồi ninh trong 1 tiếng cuối rồi nêm nước mắm cốt và đường phèn vừa miệng.',
        tip: 'Không đậy kín vung và tuyệt đối không ninh lửa lớn để nước dùng giữ được độ trong veo thanh ngọt.',
      },
      {
        step: 2,
        title: 'Sơ chế thịt bò và rau thơm',
        description:
          'Thịt bò thăn thái lát mỏng tang, ướp cùng 1/2 phần tỏi băm, gừng thái chỉ, chút tiêu và nửa thìa mắm. Hành hoa phần cọng chẻ sợi ngâm nước đá cho cong nhẹ, phần lá cắt khúc ngắn.',
      },
      {
        step: 3,
        title: 'Kỹ thuật xào tái lăn lửa bốc khói',
        description:
          'Đặt chảo gang lên bếp lửa cực lớn cho chảo thật nóng già. Cho mỡ lợn hoặc dầu ăn vào, phi thơm nhanh tỏi băm. Trút thịt bò vào đảo cực nhanh tay trong khoảng 45 - 60 giây cho thịt vừa chín tới tái hồng thì trút ra đĩa ngay.',
        tip: 'Lửa phải thật to để thịt bò giữ nguyên độ ngọt mềm, dậy mùi thơm khói xém đặc trưng mà không bị ra nước hay dai.',
      },
      {
        step: 4,
        title: 'Trần phở và chan nước dùng',
        description:
          'Trần bánh phở qua nước sôi, vẩy ráo cho vào bát tô. Xếp thịt bò tái lăn lên trên, thêm nhiều đầu hành, hành hoa và ngò gai. Múc nước dùng đang sôi sùng sục chan đều ngập bánh phở.',
      },
    ],
    chefSecret:
      'Linh hồn của phở tái lăn là mùi khói chảo gang và gừng tỏi phi già. Dùng mỡ lợn thay cho dầu ăn thực vật sẽ giúp tô phở bóng đẹp, béo ngậy và thơm lừng đúng chuẩn phố Lò Đúc.',
    recommendedSauce: 'Ăn kèm giấm tỏi ớt ngâm chua cay, quẩy giòn rụm và chanh tươi.',
  },

  'com-tam-suon-bi-cha': {
    dishId: 'com-tam-suon-bi-cha',
    dishName: 'Cơm Tấm Sườn Bì Chả Đặc Biệt Sài Gòn',
    prepTime: '40 phút (ướp thịt qua đêm)',
    cookTime: '35 phút',
    difficulty: 'Trung bình',
    servings: '3 - 4 người',
    ingredients: [
      {
        category: 'Nguyên liệu chính',
        items: [
          '4 miếng sườn cốt lết heo có riềm mỡ dày khoảng 1.5cm',
          '300g gạo tấm thơm dẻo',
          '150g bì heo trộn thính gạo rang',
          'Dưa leo, cà chua, mỡ hành phi, tóp mỡ giòn',
        ],
      },
      {
        category: 'Sốt ướp sườn nướng mật ong',
        items: [
          '2 thìa canh sữa đặc (hoặc nước cốt dừa)',
          '1 thìa canh mật ong rừng',
          '2 thìa canh nước mắm nhĩ, 1 thìa canh nước tương, 1 thìa dầu hào',
          'Hành tím, tỏi, gốc sả băm nhuyễn vắt lấy nước cốt',
          '1 thìa cà phê tiêu, 1 thìa canh mỡ nước',
        ],
      },
      {
        category: 'Thành phần Chả Trứng Hấp',
        items: [
          '200g thịt nạc dăm xay, 1 quả trứng vịt nguyên, 2 lòng đỏ trứng vịt',
          'Miến dong ngâm mềm cắt khúc, mộc nhĩ nấm mèo băm nhỏ',
          'Hành tím băm, tiêu sọ, hạt nêm',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Dần mềm sườn và ướp nước sốt thần thánh',
        description:
          'Dùng búa dần thịt gõ nhẹ cả 2 mặt miếng sườn cho thớ thịt mềm tơi. Ướp sườn với hỗn hợp sữa đặc, mật ong, nước mắm, nước cốt hành tỏi sả trong ít nhất 2 tiếng (ngon nhất là để ngăn mát qua đêm).',
        tip: 'Ướp bằng nước cốt hành tỏi vắt (bỏ xác) sẽ giúp sườn khi nướng không bị cháy khét lấm tấm đen.',
      },
      {
        step: 2,
        title: 'Hấp chả trứng vàng ươm',
        description:
          'Trộn đều thịt xay, mộc nhĩ, miến, hành tím và 1 quả trứng vịt. Nêm chút hạt nêm, tiêu sọ. Cho vào khuôn thoa dầu đem hấp cách thủy 20 phút. Quét 2 lòng đỏ trứng vịt lên mặt, hấp mở nắp thêm 5 phút cho mặt chả se vàng rực rỡ.',
      },
      {
        step: 3,
        title: 'Nướng sườn trên than hoa',
        description:
          'Nướng sườn trên bếp than đỏ rực lửa vừa. Thường xuyên quét nước ướp và mỡ hành lên mặt thịt để miếng sườn óng ả, mềm mọng nước không bị khô xác.',
      },
      {
        step: 4,
        title: 'Pha nước mắm tỏi ớt kẹo',
        description:
          'Đun sôi hỗn hợp nước mắm : đường : nước lọc theo tỷ lệ vàng 1 : 1 : 1 cho đường tan sánh kẹo lại. Để nguội rồi cho nước cốt chanh, tỏi và ớt sừng băm nhuyễn nổi bồng bềnh lên mặt.',
      },
    ],
    chefSecret:
      'Cho 1 thìa sữa đặc vào sốt ướp là bí quyết nhà nghề của các quán cơm tấm Sài Gòn lâu năm giúp thớ sườn nướng mềm tan mọng nước, dậy mùi thơm lừng khó cưỡng.',
    recommendedSauce: 'Nước mắm kẹo chua ngọt, đồ chua củ cải cà rốt và mỡ hành tóp mỡ béo giòn.',
  },

  'bun-bo-hue': {
    dishId: 'bun-bo-hue',
    dishName: 'Bún Bò Huế Chả Cua Thịt Nạm',
    prepTime: '35 phút',
    cookTime: '2.5 - 3 giờ',
    difficulty: 'Cầu kỳ',
    servings: '5 - 6 người',
    ingredients: [
      {
        category: 'Phần thịt và xương',
        items: [
          '1kg xương ống bò hoặc xương heo',
          '500g bắp bò hoa hoặc nạm bò',
          '1 cái móng giò heo chặt khoanh vừa ăn',
          '200g chả cua hoặc chả lụa Huế, huyết bò luộc',
        ],
      },
      {
        category: 'Hương liệu tạo mùi Cố Đô',
        items: [
          '8 - 10 cây sả tươi đập dập bó chặt',
          '3 thìa canh mắm ruốc Huế cốt nguyên chất',
          '1 củ gừng đập dập, ớt bột cay Huế',
          '2 thìa dầu màu điều, tỏi và hành tím băm',
        ],
      },
      {
        category: 'Rau ghém ăn kèm',
        items: ['Bắp chuối bào mỏng, giá đỗ sống, rau muống chẻ, húng quế, chanh ớt tươi'],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Lọc mắm ruốc Huế khử nồng',
        description:
          'Khuấy đều mắm ruốc với 1 bát nước lạnh trong nồi nhỏ, đun sôi nhẹ rồi tắt bếp để lắng cặn 15 phút. Chỉ gạn lấy phần nước trong thơm nồng, bỏ cặn đen dưới đáy.',
        tip: 'Lọc kỹ nước ruốc giúp nước lèo thơm sâu lắng mà không hề bị đục hay tanh.',
      },
      {
        step: 2,
        title: 'Ninh nước dùng xương bò và sả cây',
        description:
          'Chần sạch xương, bắp bò và móng giò. Cho vào nồi hầm cùng 4 lít nước, gừng và bó sả đập dập. Khi bắp bò và móng giò vừa chín tới (khoảng 45 phút), vớt ra ngâm nước đá lạnh rồi thái mỏng. Tiếp tục ninh xương cho ngọt nước.',
      },
      {
        step: 3,
        title: 'Nấu sốt sa tế dầu điều và nêm nếm',
        description:
          'Phi thơm hành tím, tỏi, ớt sừng băm cùng dầu màu điều và ớt bột Huế cho đỏ rực. Trút một nửa vào nồi nước dùng cùng phần nước mắm ruốc trong đã lắng. Nêm đường phèn, muối, hạt nêm vừa miệng.',
      },
      {
        step: 4,
        title: 'Hoàn thiện tô bún bò Huế',
        description:
          'Thả chả cua vo viên, chả Huế và huyết luộc vào nồi nước dùng cho nổi lên. Chần sợi bún to, xếp thịt bắp bò, giò heo, múc chả cua và chan nước dùng cay nồng thơm lừng ngút khói.',
      },
    ],
    chefSecret:
      'Sả cây đập dập lót dưới đáy nồi nước dùng và nước mắm ruốc lọc trong chính là chìa khóa tạo nên hương vị bún bò Huế thanh tao đặc trưng không lẫn vào đâu được.',
    recommendedSauce: 'Ăn kèm sa tế cay xé lưỡi, chanh tươi và ớt xanh Cố Đô dầm nước mắm mặn.',
  },

  'thit-kho-tau': {
    dishId: 'thit-kho-tau',
    dishName: 'Thịt Kho Tàu Nước Dừa Trứng Cút',
    prepTime: '20 phút',
    cookTime: '60 - 75 phút',
    difficulty: 'Dễ',
    servings: '4 người',
    ingredients: [
      {
        category: 'Nguyên liệu',
        items: [
          '600g thịt ba chỉ (ba rọi) hoặc thịt nạc dăm mỡ liền nạc',
          '10 - 12 quả trứng cút luộc bóc vỏ (hoặc 4 quả trứng vịt)',
          '500ml nước dừa tươi xiêm ngọt mát',
          '3 tép tỏi, 2 củ hành tím băm nhuyễn, 1 quả ớt sừng',
          'Gia vị: 3 thìa canh nước mắm cốt, 1 thìa canh đường thốt nốt, 1 thìa hạt nêm, tiêu',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế thịt ba chỉ vuông vức',
        description:
          'Rửa sạch thịt bằng muối và giấm, chần qua nước sôi 2 phút rồi vớt ra xả nước lạnh. Cắt thịt thành từng khối vuông to khoảng 3 - 4cm.',
      },
      {
        step: 2,
        title: 'Ướp thịt ngấm gia vị và phơi mỡ trong',
        description:
          'Ướp thịt với nước mắm, đường, hành tỏi băm và chút tiêu trong 30 - 45 phút. Mẹo nhỏ: mang đĩa thịt ra phơi nắng nhẹ 20 phút cho phần mỡ trong veo khi kho.',
      },
      {
        step: 3,
        title: 'Kho thịt cùng nước dừa tươi',
        description:
          'Thắng đường cho ngả màu cánh gián đẹp mắt, cho thịt vào đảo săn đều các mặt. Đổ nước dừa tươi ngập thịt, đun sôi bùng rồi hạ lửa nhỏ liu riu, hớt bọt cẩn thận.',
      },
      {
        step: 4,
        title: 'Thêm trứng và kho sánh mềm',
        description:
          'Khi thịt đã mềm (sau 40 phút), cho trứng cút luộc vào kho chung. Đun lửa nhỏ đến khi nước kho sánh lại màu hổ phách óng ả, miếng thịt mềm rục tan trong miệng.',
      },
    ],
    chefSecret:
      'Không đậy nắp nồi khi kho thịt với nước dừa để nước kho trong veo và miếng mỡ có độ trong giòn rụm mà không hề bị ngấy.',
    recommendedSauce: 'Ăn cùng cơm trắng nóng hổi, dưa giá chua giòn hoặc rau luộc chấm nước kho thịt.',
  },

  'nem-nuong-nha-trang': {
    dishId: 'nem-nuong-nha-trang',
    dishName: 'Nem Nướng Nha Trang Cuốn Bánh Tráng',
    prepTime: '30 phút',
    cookTime: '25 phút',
    difficulty: 'Trung bình',
    servings: '4 người',
    ingredients: [
      {
        category: 'Nguyên liệu làm nem',
        items: [
          '500g giò sống (mọc heo) dẻo quánh',
          '200g mỡ heo luộc chín thái hạt lựu nhỏ trộn đường',
          'Tỏi băm, hạt tiêu giã dập, nước mắm ngon, dầu màu điều',
          'Que xiên tre ngâm nước tránh cháy',
        ],
      },
      {
        category: 'Nguyên liệu làm Nước Chấm Tương Gan thần thánh',
        items: [
          '100g thịt nạc heo xay, 50g gan heo ngâm sữa tươi khử tanh băm nhuyễn',
          '50g gạo nếp nấu thành cháo xay nhuyễn tạo độ sánh',
          '2 thìa canh tương đậu nành (tương hột băm nhuyễn)',
          'Dầu màu điều, tỏi băm, đường, hạt nêm',
        ],
      },
      {
        category: 'Rau cuốn và bánh tráng',
        items: ['Bánh tráng cuốn, ram chiên giòn rụm, xoài xanh bào sợi, dưa chuột, xà lách, rau thơm các loại'],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Quết nem dai giòn tự nhiên',
        description:
          'Trộn đều giò sống với mỡ heo thái hạt lựu, tỏi phi, tiêu, nước mắm và chút dầu màu điều. Dùng muôi quết đều tay theo 1 chiều cho hỗn hợp thật dẻo dai kết dính.',
      },
      {
        step: 2,
        title: 'Nắn nem vào xiên và nướng than',
        description:
          'Thoa chút dầu ăn lên tay, nắn thịt bao quanh que xiên tre. Nướng trên than hoa đỏ hoặc nồi chiên không dầu ở 180°C trong 15 phút, trở mặt liên tục cho nem xém vàng óng mỡ.',
      },
      {
        step: 3,
        title: 'Nấu nước sốt tương gan béo bùi',
        description:
          'Phi thơm tỏi với dầu điều, cho thịt xay và gan băm vào xào chín săn. Đổ tương hột và cháo nếp xay nhuyễn vào khuấy đều tay lửa nhỏ cho sốt sánh mịn, béo ngậy màu cam đất quyến rũ.',
      },
    ],
    chefSecret:
      'Bí quyết nước chấm nem nướng Nha Trang thơm bùi gây nghiện nằm ở cháo nếp xay nhuyễn kết hợp gan heo ngâm sữa tươi và tương hột, tạo độ sánh dẻo tự nhiên không cần bột năng.',
    recommendedSauce: 'Nước chấm tương gan ấm nóng rắc đậu phộng rang giã dập và ớt sa tế.',
  },

  'canh-chua-ca-loc': {
    dishId: 'canh-chua-ca-loc',
    dishName: 'Canh Chua Cá Lóc Nam Bộ',
    prepTime: '20 phút',
    cookTime: '20 phút',
    difficulty: 'Dễ',
    servings: '4 người',
    ingredients: [
      {
        category: 'Nguyên liệu',
        items: [
          '1 con cá lóc đồng (khoảng 700g) làm sạch cắt khứa',
          'Vắt me chín ngâm nước ấm lấy nước cốt chua thanh',
          '1/4 quả dứa (thơm) thái lát, 2 quả cà chua bổ múi cau',
          'Dọc mùng (bạc hà) tước vỏ bóp muối, đậu bắp cắt chéo, giá đỗ sống',
          'Rau ngò ôm (ngổ), ngò gai (mùi tàu), tỏi phi vàng giòn',
          'Nước mắm ngon, đường phèn, ớt sừng cắt lát',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Khử tanh cá lóc',
        description:
          'Xát muối và chanh lên da cá để sạch nhớt. Rửa sạch khứa cá để ráo. Ướp cá với chút nước mắm, tiêu và đầu hành băm.',
      },
      {
        step: 2,
        title: 'Nấu nước canh chua ngọt thanh',
        description:
          'Đun sôi 1.2 lít nước, cho nước cốt me và cà chua, dứa vào đun sôi bùng. Thả từng khúc cá lóc vào nấu chín trong 8 - 10 phút rồi vớt bọt liên tục.',
      },
      {
        step: 3,
        title: 'Nêm nếm gia vị chuẩn Nam Bộ',
        description:
          'Nêm nước mắm nhĩ và đường phèn sao cho vị chua - ngọt - mặn cân bằng hài hòa. Cho đậu bắp, dọc mùng vào nấu vừa chín tới rồi thêm giá đỗ sống.',
      },
      {
        step: 4,
        title: 'Hoàn thiện với rau thơm và tỏi phi',
        description:
          'Múc canh ra tô lớn, rải ngò ôm, ngò gai cắt nhỏ, ớt sừng và rắc thật nhiều tỏi phi thơm giòn lên mặt.',
      },
    ],
    chefSecret:
      'Dùng đường phèn thay đường cát trắng giúp nước canh chua có hậu vị ngọt thanh dịu mát, không bị gắt cổ.',
    recommendedSauce: 'Ăn cùng cơm nóng hoặc bún tươi, chấm cá vào chén nước mắm mặn dầm ớt hiểm cay xé lưỡi.',
  },
};

/**
 * Intelligent Recipe Generator for any dish from INITIAL_DISHES
 * If a hand-crafted recipe exists in CURATED_RECIPES, returns it.
 * Otherwise, generates a structured, culturally accurate Vietnamese recipe based on the dish characteristics.
 */
export function getDishRecipe(dish: Dish): DishRecipe {
  if (CURATED_RECIPES[dish.id]) {
    return CURATED_RECIPES[dish.id];
  }

  // Derive cooking method & ingredients intelligently based on categories and tags
  const isSoupOrNoodle =
    dish.category === 'bun_pho_mi' ||
    dish.category === 'bun_pho' ||
    dish.category === 'lau_chao' ||
    dish.name.toLowerCase().includes('bún') ||
    dish.name.toLowerCase().includes('phở') ||
    dish.name.toLowerCase().includes('hủ tiếu') ||
    dish.name.toLowerCase().includes('mì') ||
    dish.name.toLowerCase().includes('canh');

  const isRiceOrStickyRice =
    dish.category === 'com_xoi' ||
    dish.category === 'com' ||
    dish.name.toLowerCase().includes('cơm') ||
    dish.name.toLowerCase().includes('xôi');

  const isRollOrBanhMi =
    dish.category === 'banhmi_cuon' ||
    dish.name.toLowerCase().includes('bánh mì') ||
    dish.name.toLowerCase().includes('cuốn') ||
    dish.name.toLowerCase().includes('nem');

  const isGrillOrFried =
    dish.category === 'nuong_chien' ||
    dish.category === 'mon_nhau' ||
    dish.name.toLowerCase().includes('nướng') ||
    dish.name.toLowerCase().includes('chiên') ||
    dish.name.toLowerCase().includes('xào');

  // Generic customized template tailored to the dish
  if (isSoupOrNoodle) {
    return {
      dishId: dish.id,
      dishName: dish.name,
      prepTime: '25 phút',
      cookTime: '60 - 90 phút (nước dùng ngọt thanh)',
      difficulty: 'Trung bình',
      servings: '3 - 4 người',
      ingredients: [
        {
          category: 'Thành phần món chính',
          items: [
            `Phần đạm chính: Thịt/Hải sản tươi ngon đặc trưng cho ${dish.vietnameseName}`,
            'Sợi bún/phở/mì tươi sạch hoặc hủ tiếu dai ngon',
            'Xương ống heo hoặc xương gà hầm lấy nước dùng ngọt tự nhiên',
          ],
        },
        {
          category: 'Rau thơm & Gia vị nước lèo',
          items: [
            'Hành tím nướng, gừng đập dập khử mùi tanh',
            'Hành lá chẻ sợi, rau mùi (ngò rí), ngò gai, húng quế',
            'Gia vị: Nước mắm cốt truyền thống, muối hạt, đường phèn, tiêu sọ xay',
          ],
        },
        {
          category: 'Rau ăn kèm & Đồ chấm',
          items: ['Giá đỗ tươi chần hoặc sống', 'Chanh tươi, ớt hiểm, ớt sa tế tự chưng cay nồng'],
        },
      ],
      steps: [
        {
          step: 1,
          title: 'Sơ chế sạch nguyên liệu và ninh nước dùng',
          description:
            'Chần xương và các loại thịt qua nước sôi có gừng đập dập để khử sạch cặn bọt. Rửa lại nước lạnh rồi cho vào nồi ninh liu riu cùng hành tím nướng.',
          tip: 'Hớt bọt thường xuyên và không đậy kín nắp để nước dùng luôn trong và thanh ngọt.',
        },
        {
          step: 2,
          title: 'Chế biến phần thịt / nhân món',
          description:
            `Tẩm ướp thịt hoặc hải sản với chút nước mắm ngon, tiêu và hành tỏi băm. Xào săn hoặc luộc vừa chín tới để giữ trọn vị ngọt mọng nước của ${dish.vietnameseName}.`,
        },
        {
          step: 3,
          title: 'Nêm nếm nước lèo chuẩn tỷ lệ',
          description:
            'Nêm nước mắm cốt nhĩ, đường phèn và muối hạt cho vừa miệng. Cho một ít đầu hành chẻ vào nồi để nước dùng dậy mùi thơm ngào ngạt.',
        },
        {
          step: 4,
          title: 'Trình bày và thưởng thức nóng hổi',
          description:
            `Trần sợi bún/phở qua nước sôi, xếp vào tô. Xếp các loại thịt và rau thơm lên mặt rồi chan nước dùng sôi sùng sục. Thưởng thức ngay khi còn bốc khói!`,
        },
      ],
      chefSecret:
        'Dùng một chút đường phèn kết hợp xương hầm nhiều giờ sẽ tạo ra vị ngọt hậu sâu lắng cho nước dùng mà không cần dùng đến mì chính hay bột ngọt.',
      recommendedSauce: 'Ăn kèm chén nước mắm mặn dầm ớt xiêm xanh và một góc chanh tươi thơm mát.',
    };
  }

  if (isRiceOrStickyRice) {
    return {
      dishId: dish.id,
      dishName: dish.name,
      prepTime: '20 phút',
      cookTime: '30 - 45 phút',
      difficulty: 'Dễ',
      servings: '3 - 4 người',
      ingredients: [
        {
          category: 'Nguyên liệu chính',
          items: [
            'Gạo dẻo thơm hạt dài hoặc nếp cái hoa vàng chuẩn vị',
            `Thịt / Hải sản / Topping đặc trưng của ${dish.vietnameseName}`,
            'Mỡ hành lá phi thơm hoặc hành phi giòn rụm',
          ],
        },
        {
          category: 'Gia vị tẩm ướp',
          items: [
            'Nước mắm nhĩ, dầu hào, tiêu xay, đường thốt nốt',
            'Tỏi và hành tím băm nhuyễn vắt lấy nước cốt',
            'Một chút mật ong hoặc dầu màu điều cho màu sắc óng ả',
          ],
        },
        {
          category: 'Đồ ăn kèm giải ngấy',
          items: ['Dưa leo, cà chua thái lát mỏng', 'Đồ chua củ cải cà rốt ngâm giấm đường giòn rụm'],
        },
      ],
      steps: [
        {
          step: 1,
          title: 'Nấu cơm dẻo / Hấp xôi thơm lừng',
          description:
            'Vo sạch gạo, canh lượng nước vừa vặn để hạt cơm chín tới nở đều, tơi xốp và không bị nhão. Nếu là xôi, ngâm nếp trước 4 - 6 tiếng để hạt dẻo dai mọng căng.',
        },
        {
          step: 2,
          title: 'Tẩm ướp phần đạm đậm đà',
          description:
            `Ướp thịt hoặc nguyên liệu chính của ${dish.vietnameseName} với sốt gia vị mắm tỏi tiêu trong 30 phút để ngấm sâu vào từng thớ thịt.`,
        },
        {
          step: 3,
          title: 'Chế biến phần nhân / Món ăn kèm',
          description:
            'Nướng hoặc rim đảo thịt trên lửa vừa cho ngấm sốt sánh kẹo, dậy mùi thơm nức mũi và có màu vàng óng ả hấp dẫn.',
        },
        {
          step: 4,
          title: 'Xới cơm nóng và rưới sốt',
          description:
            'Xới cơm ra đĩa hoặc mẹt tre, bày thịt nướng/rim lên trên. Rưới thêm một thìa mỡ hành tóp mỡ béo ngậy và rắc hành phi vàng giòn.',
        },
      ],
      chefSecret:
        'Thêm một thìa cà phê dầu ăn hoặc mỡ gà khi nấu cơm sẽ giúp từng hạt cơm bóng bẩy, thơm dẻo và giữ được độ mềm suốt cả ngày.',
      recommendedSauce: 'Nước mắm chua ngọt sánh tỏi ớt băm bồng bềnh hoặc nước tương tỏi ớt đậm đà.',
    };
  }

  // Fallback for roll, grilled, snack or general dish
  return {
    dishId: dish.id,
    dishName: dish.name,
    prepTime: '20 phút',
    cookTime: '25 phút',
    difficulty: 'Dễ',
    servings: '2 - 4 người',
    ingredients: [
      {
        category: 'Nguyên liệu cốt lõi',
        items: [
          `Nguyên liệu tươi sạch đặc trưng: ${dish.vietnameseName}`,
          'Rau sống các loại: Xà lách xoăn, tía tô, kinh giới, dưa chuột tươi giòn',
          'Gia vị: Tỏi, ớt sừng, chanh tươi, nước mắm ngon, tiêu thơm',
        ],
      },
      {
        category: 'Gia vị tẩm ướp & Nấu',
        items: [
          'Hành tím băm nhỏ, dầu hào, đường, hạt nêm nguyên chất',
          'Dầu ăn sạch hoặc mỡ nước thơm',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế nguyên liệu tươi sạch',
        description:
          `Rửa sạch thịt/hải sản và rau củ. Thấm ráo nước hoàn toàn để khi chế biến ${dish.vietnameseName} không bị bắn dầu và giữ trọn dưỡng chất.`,
      },
      {
        step: 2,
        title: 'Tẩm ướp gia vị cân bằng',
        description:
          'Trộn đều nguyên liệu với nước mắm, tiêu sọ, chút dầu hào và tỏi băm. Để nghỉ trong 20 phút cho thấm sâu.',
      },
      {
        step: 3,
        title: 'Chế biến đúng độ lửa',
        description:
          'Căn chỉnh nhiệt độ lửa chuẩn xác để bề ngoài vàng giòn hoặc thơm ngậy mà bên trong vẫn mọng nước, giữ nguyên độ ngọt tự nhiên.',
        tip: 'Không nấu quá lâu để tránh làm khô thịt hoặc mất đi độ giòn tươi của rau củ.',
      },
      {
        step: 4,
        title: 'Bày biện đẹp mắt & Thưởng thức',
        description:
          'Gắp ra đĩa có lót rau xanh tươi mát, trang trí ớt tỉa hoa và dọn kèm chén nước chấm chua ngọt chuẩn bài.',
      },
    ],
    chefSecret:
      'Độ tươi ngon của nguyên liệu quyết định 80% thành công của món ăn. Hãy chọn nguyên liệu có nguồn gốc sạch sẽ và chế biến khi còn tươi mới.',
    recommendedSauce: 'Nước chấm pha tỏi ớt chua ngọt hoặc sốt chấm tương bơ đậu phộng béo bùi.',
  };
}

export const FEATURED_RECIPE_IDS = [
  'pho-bo-tai-lan',
  'com-tam-suon-bi-cha',
  'bun-bo-hue',
  'nem-nuong-nha-trang',
  'thit-kho-tau',
  'canh-chua-ca-loc',
];
