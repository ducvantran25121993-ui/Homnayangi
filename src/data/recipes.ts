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
  'bao-tu-ham-tieu': {
    dishId: 'bao-tu-ham-tieu',
    dishName: 'Bao Tử Hầm Tiêu Xanh',
    prepTime: '30 phút (sơ chế kỹ)',
    cookTime: '45 - 60 phút',
    difficulty: 'Trung bình',
    servings: '4 - 5 người',
    ingredients: [
      {
        category: 'Nguyên liệu chính',
        items: [
          '1 cái bao tử heo tươi (khoảng 700g - 900g, chọn loại dày mình, màu hồng tươi)',
          '50g - 70g tiêu xanh tươi nguyên chùm (chọn chùm hạt tròn bóng)',
          '1 trái dừa xiêm lấy nước ngọt tự nhiên (khoảng 500ml)',
          '100g nấm rơm búp tươi cạo sạch chân',
          '1 củ sen nhỏ (hoặc củ cải trắng, cà rốt tỉa hoa)',
        ],
      },
      {
        category: 'Gia vị sơ chế & khử mùi bao tử',
        items: [
          '1 củ gừng già giã nát, 2 quả chanh tươi, 1 chén giấm gạo',
          '3 thìa canh muối hạt trắng, 1/2 chén rượu trắng',
        ],
      },
      {
        category: 'Gia vị ướp & nấu nước dùng',
        items: [
          '3 củ hành tím đập dập, 1 củ tỏi băm nhuyễn',
          'Gia vị: 2 thìa canh nước mắm nhĩ, 1 thìa canh hạt nêm, 1 thìa đường phèn, 1 thìa cà phê tiêu sọ trắng đập giập',
          'Rau mồng tơi, rau xà lách xoong, cải bẹ xanh, mì trứng hoặc bún tươi ăn kèm',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Bí quyết sơ chế bao tử heo giòn sần sật, không hôi',
        description:
          'Lộn trái bao tử, cạo sạch màng nhầy dưới vòi nước. Bóp kỹ lần 1 với muối hạt và nước cốt chanh. Cho bao tử vào chảo gang khô không dầu áp chảo đảo nhanh 2-3 phút cho săn lại và ra bọt tanh rồi vớt ra cạo sạch lần nữa. Rửa lại lần cuối với rượu trắng và gừng đập dập, sau đó chần qua nước sôi rồi ngâm ngay vào thau nước đá lạnh để bao tử giữ độ giòn trắng.',
        tip: 'Khâu áp chảo khô với muối và giấm/rượu là bí quyết của đầu bếp nhà hàng giúp khử mùi hôi tuyệt đối và tạo độ giòn sần sật.',
      },
      {
        step: 2,
        title: 'Ướp bao tử và xào thơm',
        description:
          'Cắt bao tử thành từng miếng vừa ăn (bản dày khoảng 1.5 - 2 ngón tay). Ướp cùng 1 thìa canh nước mắm, hành tỏi băm, tiêu đập dập và một nửa số tiêu xanh giã dập trong 20 phút. Phi thơm hành tỏi trên chảo, cho bao tử vào xào săn với lửa lớn để ngấm gia vị.',
      },
      {
        step: 3,
        title: 'Ninh chậm cùng nước dừa và tiêu xanh',
        description:
          'Cho bao tử đã xào vào nồi cùng 500ml nước dừa xiêm và 700ml nước dùng hầm xương (hoặc nước lọc). Thả các chùm tiêu xanh nguyên hạt, củ sen và đun sôi rồi hạ nhỏ lửa ninh liu riu trong 40 - 45 phút đến khi bao tử chín mềm vừa tới nhưng vẫn giữ độ giòn sần sật đặc trưng. Cho nấm rơm vào đun thêm 5 phút, nêm đường phèn và nước mắm vừa khẩu vị.',
      },
      {
        step: 4,
        title: 'Thưởng thức nóng hổi theo kiểu lẩu',
        description:
          'Múc bao tử và nước hầm tiêu xanh ra nồi lẩu hoặc thố đất giữ nhiệt. Đặt lên bếp gas mini liu riu, rắc thêm hành lá, ngò rí và tiêu sọ thơm nức. Nhúng rau mồng tơi, cải bẹ xanh hoặc xà lách xoong ăn kèm mì trứng hoặc bún tươi.',
      },
    ],
    chefSecret:
      'Không nên ninh bao tử quá lâu trên lửa lớn sẽ bị dai nhũn mất độ giòn. Ninh lửa nhỏ cùng nước dừa tươi giúp thịt mềm mọng ngọt tự nhiên, nước dùng trong vắt thơm cay the ngát của tiêu xanh.',
    recommendedSauce:
      'Chấm từng miếng bao tử giòn sần sật vào chén nước mắm mặn nguyên chất dầm ớt hiểm xanh hoặc muối tiêu chanh ớt cay nồng.',
  },
  'long-nuong': {
    dishId: 'long-nuong',
    dishName: 'Lòng Nướng Sa Tế Cay Giòn Than Hoa',
    prepTime: '25 phút (sơ chế sạch)',
    cookTime: '15 - 20 phút nướng than hoa',
    difficulty: 'Dễ',
    servings: '3 - 4 người lai rai',
    ingredients: [
      {
        category: 'Nguyên liệu chính',
        items: [
          '500g lòng non heo (chọn lòng bé, ống tròn đều, màu trắng hồng căng mọng)',
          '300g dồi trường hoặc bao tử heo kèm theo',
          'Khử mùi: Muối hạt, nước cốt chanh, gừng đập dập, rượu trắng',
        ],
      },
      {
        category: 'Sốt ướp sa tế nướng than hoa',
        items: [
          '2 thìa canh sa tế tôm hoặc sa tế ớt hiểm cay nồng',
          '1 thìa canh dầu hào, 1 thìa canh mật ong rừng',
          '1 thìa canh nước mắm nhĩ ngon, 1/2 thìa ngũ vị hương',
          '2 củ sả băm nhuyễn, 1 củ tỏi và 2 củ hành tím băm nhỏ, 1 thìa dầu màu điều',
        ],
      },
      {
        category: 'Rau ăn kèm & Nước chấm bén mồi',
        items: [
          'Rau húng quế, ngò gai, dưa leo, chuối chát, khế chua',
          'Nước chấm: Chao đỏ pha đường ớt sa tế, sốt me chua ngọt hoặc muối ớt xanh sữa đặc',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế lòng non giòn ngọt, không bị đắng hay dai',
        description:
          'Dùng tay vuốt nhẹ lòng non từ đầu tới cuối dưới vòi nước (không vuốt quá kỹ làm mất chất ngọt). Bóp nhẹ với muối hạt và nước cốt chanh để khử nhớt. Chần lòng qua nồi nước sôi có gừng đập dập và rượu trắng trong đúng 30 giây rồi vớt ngay ra thả vào âu nước đá lạnh để lòng giòn sần sật và giữ màu trắng sáng.',
        tip: 'Tuyệt đối không luộc lòng quá lâu lúc sơ chế vì nhiệt độ cao sẽ khiến lòng bị dai teo lại.',
      },
      {
        step: 2,
        title: 'Cắt khúc và tẩm ướp sốt sa tế óng ả',
        description:
          'Cắt lòng thành từng đoạn vừa ăn (dài khoảng 4-5cm). Trộn đều sa tế, dầu hào, mật ong, dầu điều, sả, hành tỏi băm. Đeo găng tay xoa đều sốt vào từng miếng lòng, ướp trong 20 - 30 phút cho ngấm sâu gia vị.',
      },
      {
        step: 3,
        title: 'Nướng xèo xèo trên than hoa đỏ rực',
        description:
          'Kẹp lòng vào vỉ hoặc xiên que tre nướng trên bếp than hoa đỏ rực. Trong lúc nướng, liên tục phết phần nước sốt ướp còn lại lên bề mặt để lòng không bị khô. Nướng đến khi lòng vàng óng, mặt ngoài xèo xèo phồng rộp dậy mùi thơm nức mũi.',
      },
      {
        step: 4,
        title: 'Bày đĩa và thưởng thức cùng bia lạnh',
        description:
          'Gắp lòng nướng ra đĩa, rắc thêm chút mè rang vàng thơm phức. Ăn kèm dưa leo giòn rụm, rau răm, khế chua và chấm đẫm vào chén chao sa tế béo cay.',
      },
    ],
    chefSecret:
      'Chần nhanh lòng 30 giây rồi ngâm đá lạnh trước khi nướng than là bí quyết vàng để lòng nướng ngoài giòn rụm, trong béo mềm ngọt ngào mà không hề bị dai.',
    recommendedSauce:
      'Chấm cùng sốt chao sa tế béo cay hoặc chén muối ớt chanh chua cay mặn ngọt bùng nổ hương vị.',
  },
  'buffet': {
    dishId: 'buffet',
    dishName: 'Đại Tiệc Buffet Nướng Lẩu Hải Sản Thả Ga Tại Nhà',
    prepTime: '35 - 40 phút (chuẩn bị đồ tươi & sốt ướp)',
    cookTime: 'Nướng & nhúng lẩu ăn lai rai không giới hạn',
    difficulty: 'Dễ',
    servings: '4 - 6 người tụ tập bia bọt',
    ingredients: [
      {
        category: 'Thịt tươi nướng lẩu thượng hạng',
        items: [
          '500g ba chỉ bò Mỹ thái mỏng cuộn nấm kim châm',
          '400g thăn bò hoặc dẻ sườn ướp sốt tiêu đen',
          '400g ba chỉ heo rút sườn ướp sốt cay Hàn Quốc',
          '300g sụn non heo hoặc lòng nướng',
        ],
      },
      {
        category: 'Hải sản tươi sống thả ga',
        items: [
          '400g tôm sú tươi nhảy tanh tách',
          '400g mực trứng hoặc bạch tuộc giòn sần sật',
          '500g ngao hai cùi hoặc hàu nướng mỡ hành phô mai',
        ],
      },
      {
        category: 'Nước dùng lẩu Thái & Rau nấm quầy line',
        items: [
          'Nước cốt lẩu Thái Tomyum chua cay thơm nồng lá chanh sả ớt',
          'Nấm kim châm, nấm đùi gà, ngô ngọt, đậu phụ non, rau muống, cải thảo',
          'Bún tươi, mì tôm ăn lẩu',
        ],
      },
      {
        category: 'Sốt chấm chuẩn quán nhậu',
        items: [
          'Sốt chấm thịt nướng Hàn Quốc (Ssamjang mè rang)',
          'Muối ớt xanh sữa đặc chấm hải sản đậm đà tê cay',
          'Xà lách, kim chi cay giòn ăn giải ngấy',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế quầy line nguyên liệu thịt và hải sản tươi rói',
        description:
          'Thịt bò và ba chỉ heo rửa sạch, thấm khô. Thịt bò cuộn chặt từng cuộn nấm kim châm; dẻ sườn ướp sốt tiêu đen dầu hào; ba chỉ ướp sốt sa tế cay mật ong. Hải sản tôm cắt râu, mực làm sạch khứa vảy rồng ướp chút sốt sa tế hành tỏi.',
        tip: 'Khứa vảy rồng trên thân mực giúp mực khi nướng cong tròn đẹp mắt và ngấm trọn gia vị.',
      },
      {
        step: 2,
        title: 'Nấu nước dùng lẩu Thái chua cay thơm nức',
        description:
          'Hầm nước xương heo hoặc gà cho ngọt nước. Phi thơm sả đập dập, riềng, hành tím và ớt rồi trút cà chua băm vào xào mềm. Đổ nước dùng vào đun sôi, nêm gia vị lẩu Thái, nước cốt me, nước mắm ngon và vò nhẹ lá chanh Thái thả vào tạo hương thơm quyến rũ đặc trưng.',
      },
      {
        step: 3,
        title: 'Bày biện bàn tiệc buffet nướng lẩu và sốt chấm',
        description:
          'Đặt bếp nướng lẩu 2 trong 1 (hoặc 1 bếp nướng và 1 bếp lẩu) ở giữa bàn. Bày các đĩa thịt, hải sản, rau nấm xung quanh thành vòng tròn rực rỡ. Rót sẵn các loại sốt chấm: muối ớt xanh cho hải sản và sốt tương đậu mè rang cho thịt nướng.',
      },
      {
        step: 4,
        title: 'Bật bếp, khai tiệc nướng xèo xèo và nâng ly',
        description:
          'Phết chút bơ lên vỉ nướng, lần lượt thả ba chỉ bò cuộn nấm, mực, tôm xèo xèo thơm nức mũi. Thả ngao, nấm và rau vào nồi lẩu Thái đang sôi sùng sục. Nâng ly bia mát lạnh chúc tụng nhau trong tiếng xèo xèo vui tai.',
      },
    ],
    chefSecret:
      'Kết hợp song song cả nướng than/chảo bơ và nhúng lẩu chua cay giúp bữa tiệc buffet không bao giờ bị ngấy, ai thích ăn nướng đậm đà hay nhúng lẩu thanh ngọt đều thỏa sức lựa chọn.',
    recommendedSauce:
      'Muối ớt xanh Nha Trang sánh quyện cho hải sản và chén sốt tương đậu Hàn Quốc rắc mè rang thơm bùi cuốn cùng xà lách kim chi.',
  },
  'be-thui': {
    dishId: 'be-thui',
    dishName: 'Bê Thui Cầu Mống Chấm Mắm Nêm Chuẩn Vị Xứ Quảng',
    prepTime: '20 phút (chuẩn bị rau rừng & pha mắm nêm)',
    cookTime: '30 - 45 phút (thui rơm/nướng giòn da)',
    difficulty: 'Trung bình',
    servings: '3 - 4 người lai rai mồi nhậu',
    ingredients: [
      {
        category: 'Thịt bê tươi ngon',
        items: [
          '600g - 800g thịt đùi bê còn nguyên da (chọn thịt bê tơ non mềm, da mỏng)',
          'Sả cây đập dập, gừng, rượu trắng để hấp và tạo mùi thơm',
          'Mè (vừng) trắng rang vàng thơm lừng',
        ],
      },
      {
        category: 'Rau sống ăn kèm & Bánh tráng cuốn',
        items: [
          'Bánh tráng Đại Lộc nhúng nước dẻo dai',
          'Bánh tráng nướng mè giòn rụm bóp vụn ăn cùng',
          'Chuối chát thái mỏng ngâm chanh, khế chua, dưa leo',
          'Rau thơm: Húng quế, ngò tàu, tía tô, rau thơm, diếp cá, cải mầm hoặc rau rừng',
        ],
      },
      {
        category: 'Chén mắm nêm bí truyền xứ Quảng',
        items: [
          '1 chén mắm nêm cá cơm nguyên chất thơm nồng',
          '1/3 quả dứa (thơm) băm nhuyễn vắt lấy nước cốt ngọt thanh',
          'Tỏi băm, ớt xiêm xanh đập dập, đường phèn, nước cốt chanh',
          '1 thìa dầu mè hoặc mè rang rắc lên mặt chén chấm',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Thui da bê giòn rụm và hấp chín tái hồng mọng nước',
        description:
          'Dùng khò nhiệt hoặc nướng da bê trên than hoa/rơm rạ cho phần da phồng rộp, vàng óng giòn sần sật. Sau đó đặt miếng thịt bê lên xửng hấp cùng sả đập dập và gừng tươi trong khoảng 15-20 phút đến khi thịt chín tới (bên ngoài chín đều, thớ thịt bên trong phớt hồng đào ngọt lịm mọng nước).',
        tip: 'Thịt bê thui ngon nhất là khi vừa chín tới hai tầng thịt - da giòn, thịt hồng mềm mọng nước, tuyệt đối không hấp quá kỹ làm thịt khô dai.',
      },
      {
        step: 2,
        title: 'Thái lát thịt bê điêu luyện',
        description:
          'Dùng dao thật sắc thái thịt bê thành từng lát mỏng, dính liền cả phần da vàng ruộm giòn tan và thớ thịt hồng tươi. Xếp thịt xoay tròn đều trên đĩa rồi rắc mè rang vàng thơm phức lên bề mặt.',
      },
      {
        step: 3,
        title: 'Pha chén mắm nêm cá cơm trứ danh xứ Quảng',
        description:
          'Cho mắm nêm vào bát, thêm nước cốt dứa băm nhuyễn, đường phèn, nước cốt chanh khuấy tan đều vị chua ngọt mặn mà. Thêm thật nhiều tỏi băm, ớt hiểm xanh cay xé lưỡi và rắc chút mè rang lên trên.',
      },
      {
        step: 4,
        title: 'Cuốn bánh tráng Đại Lộc và thưởng thức mồi nhậu bén bia',
        description:
          'Trải miếng bánh tráng dẻo, đặt lên vài cọng rau thơm, lát chuối chát, khế chua, gắp 1-2 miếng thịt bê thui hồng hào cuộn chặt tay. Chấm ngập chén mắm nêm đậm đà, cắn ngập miệng cảm nhận vị ngọt thơm, giòn rụm xốn xang.',
      },
    ],
    chefSecret:
      'Linh hồn của món bê thui nằm ở chén mắm nêm: Dứa băm giúp giảm vị mặn gắt của mắm, tạo độ sánh sánh và hương thơm thanh dịu hòa cùng tỏi ớt cay nồng cực kỳ kích thích vị giác.',
    recommendedSauce:
      'Chén mắm nêm cá cơm pha dứa, tỏi ớt xiêm xanh cay nồng nàn không thể thay thế của người miền Trung.',
  },
  'banh-beo': {
    dishId: 'banh-beo',
    dishName: 'Bánh Bèo Chén Tôm Chấy Tóp Mỡ Chuẩn Vị Huế',
    prepTime: '25 phút (pha bột & làm tôm chấy)',
    cookTime: '15 - 20 phút (hấp bánh)',
    difficulty: 'Dễ',
    servings: '15 - 20 chén nhỏ (3 - 4 người ăn)',
    ingredients: [
      {
        category: 'Phần bột bánh bèo xoáy lòng',
        items: [
          '150g bột gạo tẻ nguyên chất',
          '30g bột năng (tạo độ dai nhẹ mềm mướt)',
          '250ml nước lạnh + 250ml nước sôi ấm',
          '1/2 thìa cà phê muối tinh, 1 thìa canh dầu ăn',
        ],
      },
      {
        category: 'Nhân tôm chấy & Tóp mỡ vàng giòn',
        items: [
          '200g tôm tươi (hoặc tôm khô ngâm mềm) giã nhuyễn sao vàng tơi xốp',
          '150g mỡ gáy heo thái hạt lựu rán vàng giòn thành tóp mỡ',
          'Hành lá cắt nhỏ phi mỡ thơm lừng (mỡ hành)',
          'Bánh mì khô cắt hạt lựu chiên giòn (tùy thích)',
        ],
      },
      {
        category: 'Nước mắm ngọt ấm chan bánh',
        items: [
          'Nước luộc tôm tươi ngọt thanh',
          'Nước mắm ngon, đường cát vàng, chút giấm hoặc nước cốt chanh',
          'Ớt sừng hoặc ớt chỉ thiên cắt khoanh cay tê đầu lưỡi',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Pha bột và ủ để bánh tạo xoáy đẹp mắt',
        description:
          'Khuấy đều bột gạo, bột năng, muối với nước lạnh cho tan hoàn toàn. Sau đó từ từ châm nước sôi ấm vào quấy đều tay, thêm thìa dầu ăn. Để bột nghỉ khoảng 30 - 45 phút trước khi đổ chén giúp bánh khi hấp tạo thành hình xoáy lõm chính giữa chuẩn điệu.',
        tip: 'Tỷ lệ bột gạo và bột năng chuẩn kết hợp nước ấm sẽ giúp bánh mềm mướt không bị nát cũng không bị cứng.',
      },
      {
        step: 2,
        title: 'Làm tôm chấy đỏ au và mỡ hành, tóp mỡ giòn rụm',
        description:
          'Tôm bóc vỏ luộc chín (giữ lại nước luộc làm nước mắm), đem giã nhuyễn rồi cho vào chảo chống dính sao nhỏ lửa đến khi sợi tôm khô tơi xốp, màu cam đỏ tự nhiên. Mỡ heo thắng vàng giòn vớt tóp mỡ ra, trút hành lá cắt nhỏ vào dầu nóng làm mỡ hành óng ả.',
      },
      {
        step: 3,
        title: 'Hấp bánh bèo từng chén nóng hổi',
        description:
          'Xếp các chén sành nhỏ vào xửng hấp, đun sôi nước cho chén nóng lên trong 3 phút. Quấy đều thau bột rồi múc bột đổ vào từng chén (khoảng 1/2 đến 2/3 chén). Đậy nắp hấp lửa lớn trong 7 - 8 phút đến khi bánh chín trắng đục, giữa chén xoáy lõm sâu là đạt.',
      },
      {
        step: 4,
        title: 'Trang trí và thưởng thức nóng',
        description:
          'Lấy chén bánh ra, phết một thìa mỡ hành óng ả, rắc tôm chấy đỏ au và vài hạt tóp mỡ giòn rụm lên trên. Khi ăn chan 1 thìa nước mắm ngọt ấm pha ớt cay, dùng thìa tre xắn từng góc bánh thưởng thức trọn vẹn sự dẻo mềm, béo ngậy giòn tan.',
      },
    ],
    chefSecret:
      'Làm nóng chén trong nồi hấp trước khi đổ bột vào là bí quyết vàng để bánh bèo nở xoáy sâu ở giữa lòng chén và không hề bị dính chén khi xắn bánh.',
    recommendedSauce:
      'Nước mắm ngọt pha từ nước luộc tôm tươi, có vị mặn ngọt thanh nhẹ, điểm xuyết vài lát ớt tươi cay nồng.',
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
