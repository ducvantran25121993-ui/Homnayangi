import { Dish, DishRecipe } from '../types';

export const CURATED_RECIPES: Record<string, DishRecipe> = {
  'pho-bo-tai-lan': {
    dishId: 'pho-bo-tai-lan',
    dishName: 'Phở Bò Tái Lăn Hà Nội',
    seoTitle: 'Cách Nấu Phở Bò Tái Lăn Hà Nội Thơm Nức, Đậm Đà Chuẩn Vị Phố Cổ',
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
        time: '3 - 4 giờ',
        heat: 'Lửa liu riu (nhỏ nhất)',
        goal: 'Nước dùng trong veo, vị ngọt sâu tự nhiên từ tủy xương bò, dậy mùi quế hồi thơm nức',
        actionPoints: [
          'Chần 1.5kg xương ống bò trong nồi nước sôi có gừng đập dập và 1 thìa muối hạt khoảng 5 phút để khử sạch cặn bọt bẩn và mùi gây.',
          'Vớt xương ra rửa lại thật sạch dưới vòi nước lạnh, cho vào nồi lớn cùng 4 lít nước lọc.',
          'Thêm 1 củ gừng già và 3 củ hành tím đã nướng thơm cháy xém đập dập.',
          'Đun sôi bùng rồi hạ ngay lửa liu riu, hớt bọt liên tục trong 30 phút đầu. Tuyệt đối không đậy kín vung.',
          'Nướng thơm 2 hoa hồi, 1 thanh quế, 1 thảo quả cho vào túi vải lọc, thả vào nồi ninh trong 60 phút cuối.',
          'Nêm 3 thìa canh nước mắm cốt nhĩ, 1 thìa canh đường phèn và 1 thìa muối hạt cho vừa vị thanh ngọt.',
        ],
        description:
          'Xương bò chần qua nước sôi cùng gừng và muối để khử sạch bọt bẩn. Rửa lại thật sạch rồi cho vào nồi hầm cùng 4 lít nước, gừng và hành tím nướng. Ninh lửa liu riu, hớt bọt liên tục. Cho túi hoa hồi, quế, thảo quả vào nồi ninh trong 1 tiếng cuối rồi nêm nước mắm cốt và đường phèn vừa miệng.',
        tip: 'Không đậy kín vung và tuyệt đối không ninh lửa lớn để nước dùng giữ được độ trong veo thanh ngọt.',
      },
      {
        step: 2,
        title: 'Sơ chế thịt bò và rau thơm',
        time: '15 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Thịt bò thái mỏng dính ngang thớ, ngấm nhẹ gia vị mà không bị chảy nước',
        actionPoints: [
          'Thịt bò thăn dùng dao sắc thái mỏng tang ngang thớ để khi xào thịt mềm tơi, không bị dai.',
          'Ướp thịt với 1/2 phần tỏi băm nhuyễn, gừng già thái chỉ, 1/2 thìa cà phê tiêu bắc và 1/2 thìa canh nước mắm cốt.',
          'Đầu hành lá chẻ sợi dài ngâm ngay vào âu nước đá lạnh 5 phút cho cong tròn giòn rụm.',
          'Phần lá hành hoa, ngò gai (mùi tàu) và rau mùi rửa sạch, vẩy ráo nước rồi cắt nhỏ 1cm.',
        ],
        description:
          'Thịt bò thăn thái lát mỏng tang, ướp cùng 1/2 phần tỏi băm, gừng thái chỉ, chút tiêu và nửa thìa mắm. Hành hoa phần cọng chẻ sợi ngâm nước đá cho cong nhẹ, phần lá cắt khúc ngắn.',
      },
      {
        step: 3,
        title: 'Kỹ thuật xào tái lăn chảo gang bốc khói',
        time: '45 - 60 giây',
        heat: 'Lửa cực đại (chảo bốc khói)',
        goal: 'Thịt bò vừa chín tới tái hồng, mềm mọng nước, dậy mùi khói xém chảo đặc trưng',
        actionPoints: [
          'Đặt chảo gang dày lên bếp, bật lửa lớn nhất cho chảo thật nóng già đến khi hơi bốc khói nhẹ.',
          'Cho 2 thìa canh mỡ lợn (hoặc dầu ăn) vào láng đều lòng chảo, trút phần tỏi băm còn lại vào phi nhanh 5 giây.',
          'Trút toàn bộ thịt bò và gừng chỉ vào, dùng muôi đảo cực nhanh tay với lực mạnh liên tục.',
          'Khi thịt vừa chuyển màu tái hồng (khoảng 45 - 60 giây), rắc một nắm đầu hành chẻ vào đảo lướt 5 giây rồi trút ngay ra đĩa.',
        ],
        description:
          'Đặt chảo gang lên bếp lửa cực lớn cho chảo thật nóng già. Cho mỡ lợn hoặc dầu ăn vào, phi thơm nhanh tỏi băm. Trút thịt bò vào đảo cực nhanh tay trong khoảng 45 - 60 giây cho thịt vừa chín tới tái hồng thì trút ra đĩa ngay.',
        tip: 'Lửa phải thật to để thịt bò giữ nguyên độ ngọt mềm, dậy mùi thơm khói xém đặc trưng mà không bị ra nước hay dai.',
      },
      {
        step: 4,
        title: 'Trần bánh phở và chan nước dùng nóng hổi',
        time: '3 - 5 phút',
        heat: 'Nồi nước dùng sôi sùng sục',
        goal: 'Bát phở bốc khói nghi ngút, bánh phở mềm mướt không nát, nước dùng ngập thơm lừng',
        actionPoints: [
          'Đun một nồi nước sôi riêng, cho bánh phở vào rây chần nhanh trong 15 - 20 giây rồi vẩy thật ráo nước.',
          'Cho bánh phở vào bát tô lớn, xếp thịt bò tái lăn lên trên bề mặt.',
          'Rải đều hành hoa, đầu hành chẻ cong và ngò gai thái nhỏ quanh bát.',
          'Múc nước dùng đang sôi sùng sục trên bếp chan đều từ từ quanh bát ngập bánh phở và thịt bò.',
        ],
        description:
          'Trần bánh phở qua nước sôi, vẩy ráo cho vào bát tô. Xếp thịt bò tái lăn lên trên, thêm nhiều đầu hành, hành hoa và ngò gai. Múc nước dùng đang sôi sùng sục chan đều ngập bánh phở.',
      },
    ],
    chefSecret:
      'Linh hồn của phở tái lăn là mùi khói chảo gang và gừng tỏi phi già. Dùng mỡ lợn thay cho dầu ăn thực vật sẽ giúp tô phở bóng đẹp, béo ngậy và thơm lừng đúng chuẩn phố Lò Đúc.',
    recommendedSauce: 'Ăn kèm giấm tỏi ớt ngâm chua cay, quẩy giòn rụm và chanh tươi.',
  },

  'pho-bo-sot-vang': {
    dishId: 'pho-bo-sot-vang',
    dishName: 'Phở Bò Sốt Vang Gia Truyền',
    seoTitle: 'Cách Nấu Phở Bò Sốt Vang Nước Dùng Thanh Ngọt Chuẩn Vị Gia Đình',
    prepTime: '30 phút',
    cookTime: '2.5 - 3 giờ (ninh xương bò & hầm sốt vang)',
    difficulty: 'Trung bình',
    servings: '4 - 6 người',
    ingredients: [
      {
        category: 'Thịt bò & Xương ninh nước dùng',
        items: [
          '800g nạm bò, dẻ sườn hoặc bắp hoa bò có chút gân dẻo (thái quân cờ 2.5 - 3cm)',
          '1.2kg xương ống bò (hoặc xương bay) ninh nước dùng ngọt thanh sâu',
          '1kg bánh phở tươi sợi mỏng mềm',
        ],
      },
      {
        category: 'Gia vị ướp sốt vang & Hương liệu thảo mộc',
        items: [
          '120ml - 150ml rượu vang đỏ (vang Đà Lạt hoặc Bordeaux)',
          '3 - 4 quả cà chua chín đỏ mọng (băm nhuyễn) + 1 thìa canh tomato paste (tương cà đậm đặc)',
          '2 hoa hồi, 1 thanh quế, 1 quả thảo quả (nướng thơm đập dập)',
          '1/2 thìa cà phê bột ngũ vị hương (không cho quá nhiều)',
          '2 thìa canh dầu màu điều (tạo màu đỏ cam sóng sánh tự nhiên)',
          '1 củ gừng già, 2 củ tỏi khô, 3 củ hành khô tím băm nhuyễn',
          'Gia vị: Nước mắm cốt nhĩ truyền thống, muối hạt, tiêu sọ xay, đường phèn, hạt nêm',
        ],
      },
      {
        category: 'Rau thơm & Đồ ăn kèm',
        items: [
          'Hành hoa (phần lá thái nhỏ, gốc hành trắng chẻ sợi ngâm nước đá)',
          'Rau mùi ta (ngò rí), mùi tàu (ngò gai) rửa sạch thái nhỏ',
          'Giấm ngâm tỏi ớt, tương ớt sa tế chưng cay nồng, chanh tươi, quẩy giòn',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Ninh nước dùng xương bò ngọt thanh tự nhiên',
        time: '2 - 3 giờ',
        heat: 'Lửa liu riu sau khi sôi',
        goal: 'Nước dùng trong vắt, ngọt sâu từ tủy xương bò, thơm dịu hành gừng nướng',
        actionPoints: [
          'Chần 1.2kg xương ống bò qua nước sôi có gừng đập dập và 1 thìa muối hạt khoảng 5 phút để khử sạch mùi gây và bọt cặn.',
          'Vớt xương ra rửa thật sạch dưới vòi nước lạnh rồi cho vào nồi lớn cùng 3.5 - 4 lít nước sạch.',
          'Thêm 1 củ gừng già và 2 củ hành tím đã nướng thơm đập dập vào nồi hầm.',
          'Đun sôi bùng rồi hạ ngay lửa nhỏ nhất ninh liu riu, hé nắp vung và vớt bọt liên tục để nước dùng luôn trong veo thanh khiết.',
        ],
        description:
          'Xương ống bò chần qua nước sôi cùng gừng và muối để khử sạch bọt bẩn. Rửa lại thật sạch rồi cho vào nồi hầm cùng 4 lít nước, gừng và hành tím nướng thơm. Ninh lửa liu riu, hớt bọt liên tục để nước dùng trong ngọt làm cốt nền cho phở.',
        tip: 'Mở hé nắp vung và ninh lửa liu riu, không đậy kín để nước dùng trong veo, không bị đục ngầu.',
      },
      {
        step: 2,
        title: 'Sơ chế và ướp thịt bò sốt vang',
        time: '30 - 45 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Thịt bò ngấm sâu hương rượu vang, gia vị và thảo mộc, thớ thịt đỏ hồng thơm phức',
        actionPoints: [
          'Dẻ sườn hoặc bắp gân bò chần sơ qua nước sôi gừng khử mùi, rửa sạch, cắt miếng vuông quân cờ khoảng 2.5 - 3cm.',
          'Ướp thịt với: 1/2 lượng rượu vang đỏ (khoảng 70ml), 1/2 thìa cà phê bột ngũ vị hương, 1 thìa canh tỏi băm, 1 thìa canh gừng băm, 1.5 thìa canh nước mắm cốt nhĩ, 1 thìa cà phê tiêu sọ xay, 1 thìa cà phê hạt nêm và 1 thìa canh dầu màu điều.',
          'Trộn bóp đều tay cho thịt ngấm đều gia vị, bọc kín âu để nghỉ trong 30 - 45 phút.',
        ],
        description:
          'Thịt dẻ sườn/gân bắp bò sơ chế sạch, thái miếng vuông quân cờ vừa ăn. Ướp thịt cùng một nửa phần rượu vang đỏ, tỏi gừng băm, ngũ vị hương, nước mắm, tiêu sọ và dầu màu điều trong 30 - 45 phút cho ngấm đậm.',
        tip: 'Chọn thịt dẻ sườn hoặc bắp bò có dải gân trong xen kẽ. Khi hầm lâu, gân mềm dẻo như thạch béo bùi, thịt ngậm nước không bị khô xác.',
      },
      {
        step: 3,
        title: 'Xào sốt cà chua và xào săn thịt bò',
        time: '10 - 12 phút',
        heat: 'Lửa lớn',
        goal: 'Thịt bò săn chắc, áo đều lớp sốt cà chua màu điều đỏ cam óng ả thơm lừng',
        actionPoints: [
          'Bắc nồi gang hoặc chảo sâu lòng lên bếp, cho 2 thìa canh dầu màu điều vào phi thơm hành tím và tỏi băm.',
          'Trút cà chua băm nhuyễn và 1 thìa tương cà (tomato paste) vào xào chín mềm, dầm nhuyễn tạo thành hỗn hợp sốt đỏ sánh mịn tự nhiên.',
          'Trút toàn bộ thịt bò đã ướp vào xào đảo nhanh tay trên lửa lớn trong 5 - 7 phút cho các mặt thịt se lại, ngấm đẫm sốt cà chua thơm nức mũi.',
        ],
        description:
          'Phi thơm hành tỏi với dầu màu điều, cho cà chua băm và tương cà vào xào chín nhuyễn thành sốt đỏ óng. Trút thịt bò vào đảo lửa lớn cho thịt săn lại và quyện đều lớp sốt đậm đà.',
      },
      {
        step: 4,
        title: 'Hầm thịt bò sốt vang mềm nhừ & hòa quyện nước dùng',
        time: '50 - 60 phút',
        heat: 'Lửa nhỏ liu riu',
        goal: 'Thịt bò chín mềm nhừ tan trên đầu lưỡi, gân dẻo trong, nước sốt vang đỏ sánh thơm ngát mùi thảo mộc',
        actionPoints: [
          'Nướng thơm 2 hoa hồi, 1 thanh quế và 1 thảo quả, cho vào túi lọc gia vị rồi thả vào nồi thịt bò.',
          'Chắt khoảng 1.8 - 2 lít nước ninh xương bò trong ngọt từ Bước 1 chế ngập nồi thịt bò.',
          'Đun sôi bùng, hớt sạch bọt rồi hạ lửa liu riu, đậy vung hầm khoảng 50 - 60 phút đến khi thịt bò mềm nhừ, gân bò dẻo trong.',
          'Trước khi tắt bếp 10 phút, rưới 70ml rượu vang đỏ còn lại vào nồi, nêm thêm 1 thìa canh nước mắm cốt nhĩ và 1 thìa đường phèn cho vị ngọt hậu hài hòa.',
        ],
        description:
          'Cho túi hoa hồi, quế, thảo quả nướng vào nồi thịt bò. Chế nước ninh xương bò vào ngập thịt, đun sôi rồi hạ lửa hầm liu riu 50 - 60 phút đến khi thịt mềm nhừ. Thêm phần rượu vang còn lại vào 10 phút cuối và nêm lại nước mắm, đường phèn cho tròn vị.',
        tip: 'Chia rượu vang làm 2 đợt: Đợt đầu ướp giúp thịt mềm và khử mùi; đợt hai cho vào cuối giai đoạn hầm giúp bát phở giữ trọn vẹn hương nồng nàn quyến rũ của vang đỏ.',
      },
      {
        step: 5,
        title: 'Trần bánh phở và thưởng thức tô phở bò sốt vang bốc khói',
        time: '5 phút',
        heat: 'Nồi nước phở sôi sùng sục',
        goal: 'Tô phở nóng hổi nghi ngút khói, màu hổ phách sóng sánh, thịt bò mềm dẻo, nước dùng thanh ngọt đậm đà',
        actionPoints: [
          'Chần bánh phở tươi qua nồi nước sôi trong 15 - 20 giây, xóc thật ráo nước rồi chia vào các tô sứ.',
          'Gắp từng miếng thịt bò sốt vang và gân dẻo xếp lên giữa mặt tô phở.',
          'Rải đều hành hoa, rau mùi ta, mùi tàu thái nhỏ và vài cọng đầu hành trắng chẻ sợi xung quanh.',
          'Múc nước sốt vang nóng hổi đang sôi lục bục trên bếp chan đều ngập bánh phở, nước dùng màu nâu đỏ hổ phách sánh mịn óng ả.',
          'Thưởng thức ngay khi còn bốc khói cùng giấm tỏi ớt, sa tế chưng cay nồng, chanh tươi và đĩa quẩy giòn rụm.',
        ],
        description:
          'Chần bánh phở tươi qua nước sôi, cho vào tô. Xếp thịt bò sốt vang lên trên, rắc hành hoa, mùi tàu và đầu hành chẻ. Chan nước dùng sốt vang nóng hổi ngập bánh phở. Ăn kèm giấm tỏi, ớt sa tế và quẩy nóng.',
      },
    ],
    chefSecret:
      'Bí quyết phở bò sốt vang chuẩn vị gia đình là sự hòa quyện giữa nước dùng xương bò ninh ngọt thanh và thịt dẻ sườn bò hầm rượu vang đỏ. Tuyệt đối không dùng bột sắn hay bột năng làm sánh đặc như món bò kho bánh mì; nước phở phải giữ được độ thanh mướt, sóng sánh tự nhiên từ cà chua chín và tủy bò.',
    recommendedSauce:
      'Ăn kèm giấm tỏi ớt truyền thống Hà Nội, tương ớt xào (sa tế chưng cay), vài cọng đầu hành chẻ và đĩa quẩy giòn tan.',
  },

  'com-tam-suon-bi-cha': {
    dishId: 'com-tam-suon-bi-cha',
    dishName: 'Cơm Tấm Sườn Bì Chả Đặc Biệt Sài Gòn',
    seoTitle: 'Cách Làm Cơm Tấm Sườn Bì Chả Sài Gòn Nướng Mềm Mọng Chuẩn Vị Quán',
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
        time: '15 phút (ướp ít nhất 2 giờ hoặc qua đêm)',
        heat: 'Ướp trong ngăn mát tủ lạnh',
        goal: 'Thớ thịt sườn mềm tơi, ngấm trọn vị mặn ngọt béo ngậy từ sữa đặc và mật ong',
        actionPoints: [
          'Rửa sạch sườn với nước muối loãng, thấm khô bằng khăn giấy.',
          'Dùng búa dần thịt (hoặc sống dao) gõ nhẹ đều 2 mặt miếng sườn giúp đứt các sợi gân co rút khi nướng.',
          'Hành tím, tỏi và sả giã nhuyễn, vắt lấy phần nước cốt (bỏ xác để nướng không bị khét lấm tấm).',
          'Trộn đều nước cốt hành sả cùng 2 thìa sữa đặc, 1 thìa mật ong, 2 thìa mắm nhĩ, 1 thìa nước tương, 1 thìa dầu hào và tiêu.',
          'Thoa đều sốt lên 4 miếng sườn, bọc kín cất ngăn mát tủ lạnh tối thiểu 2 tiếng hoặc qua đêm.',
        ],
        description:
          'Dùng búa dần thịt gõ nhẹ cả 2 mặt miếng sườn cho thớ thịt mềm tơi. Ướp sườn với hỗn hợp sữa đặc, mật ong, nước mắm, nước cốt hành tỏi sả trong ít nhất 2 tiếng (ngon nhất là để ngăn mát qua đêm).',
        tip: 'Ướp bằng nước cốt hành tỏi vắt (bỏ xác) sẽ giúp sườn khi nướng không bị cháy khét lấm tấm đen.',
      },
      {
        step: 2,
        title: 'Hấp chả trứng vàng ươm chuẩn tiệm',
        time: '25 phút',
        heat: 'Lửa vừa (hấp cách thủy)',
        goal: 'Chả chín chắc mềm, mặt chả vàng bóng rực rỡ không bị rỗ hay khô',
        actionPoints: [
          'Trộn 200g thịt nạc dăm xay với mộc nhĩ nấm mèo băm nhỏ, miến dong cắt khúc 2cm và hành tím băm.',
          'Đập 1 quả trứng vịt nguyên + 1 lòng trắng vào âu thịt, nêm 1 thìa cà phê hạt nêm, 1/2 thìa tiêu sọ xay nhuyễn.',
          'Thoa một lớp dầu ăn mỏng vào khuôn, trút hỗn hợp chả vào dàn phẳng mặt.',
          'Đem hấp cách thủy 20 phút trên lửa vừa. Thỉnh thoảng mở nắp lau sạch hơi nước đọng.',
          'Đánh tan 2 lòng đỏ trứng vịt với 1/2 thìa dầu màu điều, quét đều lên mặt chả rồi hấp mở vung thêm 5 phút cho mặt se bóng vàng ruộm.',
        ],
        description:
          'Trộn đều thịt xay, mộc nhĩ, miến, hành tím và 1 quả trứng vịt. Nêm chút hạt nêm, tiêu sọ. Cho vào khuôn thoa dầu đem hấp cách thủy 20 phút. Quét 2 lòng đỏ trứng vịt lên mặt, hấp mở nắp thêm 5 phút cho mặt chả se vàng rực rỡ.',
      },
      {
        step: 3,
        title: 'Nướng sườn trên than hoa hoặc nồi chiên không dầu',
        time: '15 - 20 phút',
        heat: 'Than hồng vừa / Nồi chiên 180°C',
        goal: 'Miếng sườn màu cánh gián óng ả, riềm mỡ vàng giòn, bên trong thịt mọng nước',
        actionPoints: [
          'Chuẩn bị bếp than hồng (hoặc làm nóng nồi chiên không dầu ở 180°C trong 5 phút).',
          'Đặt sườn lên vỉ nướng, nướng mỗi mặt khoảng 5 - 7 phút.',
          'Hòa phần nước sốt ướp còn lại với 1 thìa mỡ nước, dùng chổi quét liên tục lên 2 mặt sườn trong quá trình nướng.',
          'Khi hai mặt sườn chín vàng đều, cạnh riềm mỡ hơi xém thơm lừng thì gắp ra đĩa ngay để sườn giữ độ ẩm mọng.',
        ],
        description:
          'Nướng sườn trên bếp than đỏ rực lửa vừa. Thường xuyên quét nước ướp và mỡ hành lên mặt thịt để miếng sườn óng ả, mềm mọng nước không bị khô xác.',
      },
      {
        step: 4,
        title: 'Nấu cơm tấm & pha nước mắm kẹo bồng bềnh',
        time: '15 phút',
        heat: 'Lửa nhỏ (đun sốt mắm)',
        goal: 'Cơm tấm tơi ráo từng hạt, nước mắm sánh kẹo tỏi ớt nổi bồng bềnh đẹp mắt',
        actionPoints: [
          'Vo sạch gạo tấm, nấu với tỷ lệ 1 bát gạo : 1.1 bát nước cùng 1 thìa cà phê dầu ăn để cơm tơi xốp bóng bẩy.',
          'Pha nước mắm kẹo: Đun 1 chén nước mắm ngon + 1 chén đường cát vàng + 1 chén nước dừa tươi trên lửa nhỏ cho sánh lại rồi để nguội.',
          'Vắt nước cốt 1/2 quả chanh, cho tỏi ớt băm nhuyễn vào khuấy đều (tỏi ớt sẽ nổi 100% lên mặt nước mắm).',
          'Làm mỡ hành: Đun sôi dầu ăn hoặc mỡ nước, trút vào bát hành lá thái nhỏ cùng chút xíu muối đường cho xanh mướt.',
        ],
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
    seoTitle: 'Cách Nấu Bún Bò Huế Chả Cua Đậm Đà Chuẩn Vị Cố Đô Tại Nhà',
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
        time: '15 phút',
        heat: 'Lửa nhỏ rồi để lắng',
        goal: 'Thu được nước ruốc trong veo, thơm sâu lắng, không còn cặn đen hay mùi tanh gắt',
        actionPoints: [
          'Hòa tan 3 thìa canh mắm ruốc Huế cốt nguyên chất với 1 bát tô nước lạnh (khoảng 300ml).',
          'Cho vào nồi nhỏ đun sôi lăn tăn trên lửa nhỏ trong 2 phút rồi tắt bếp.',
          'Để yên cho nồi mắm ruốc lắng cặn hoàn toàn trong 15 phút.',
          'Nhẹ nhàng gạn lấy phần nước trong thơm nồng bên trên, bỏ phần cặn đen đọng dưới đáy nồi.',
        ],
        description:
          'Khuấy đều mắm ruốc với 1 bát nước lạnh trong nồi nhỏ, đun sôi nhẹ rồi tắt bếp để lắng cặn 15 phút. Chỉ gạn lấy phần nước trong thơm nồng, bỏ cặn đen dưới đáy.',
        tip: 'Lọc kỹ nước ruốc giúp nước lèo thơm sâu lắng mà không hề bị đục hay tanh.',
      },
      {
        step: 2,
        title: 'Ninh nước dùng xương bò và sả cây',
        time: '2 - 2.5 giờ',
        heat: 'Lửa liu riu sau khi sôi',
        goal: 'Nước xương ngọt thanh, bắp bò và giò heo mềm giòn vừa tới, thoang thoảng mùi sả',
        actionPoints: [
          'Chần sạch 1kg xương ống, 500g bắp bò và móng giò heo qua nước sôi pha muối và gừng đập dập 5 phút, rửa lại nước lạnh.',
          'Lót 8 - 10 cây sả đập dập dưới đáy nồi lớn, xếp xương và thịt lên trên, đổ 4 lít nước lọc.',
          'Đun sôi bùng, vớt sạch bọt rồi hạ lửa liu riu ninh.',
          'Sau 45 - 50 phút, dùng đũa xiên qua bắp bò thấy vừa mềm tới thì vớt bắp bò và móng giò ra ngâm vào thau nước đá lạnh để thịt săn giòn không bị thâm đen, sau đó thái lát mỏng.',
          'Tiếp tục ninh phần xương thêm 1.5 - 2 giờ để lấy trọn vị ngọt tủy.',
        ],
        description:
          'Chần sạch xương, bắp bò và móng giò. Cho vào nồi hầm cùng 4 lít nước, gừng và bó sả đập dập. Khi bắp bò và móng giò vừa chín tới (khoảng 45 phút), vớt ra ngâm nước đá lạnh rồi thái mỏng. Tiếp tục ninh xương cho ngọt nước.',
      },
      {
        step: 3,
        title: 'Nấu sốt sa tế dầu điều và nêm nếm nồi nước lèo',
        time: '15 phút',
        heat: 'Lửa vừa',
        goal: 'Nước lèo lên màu đỏ rực óng ả của dầu điều, dậy mùi thơm nức sả ớt mắm ruốc',
        actionPoints: [
          'Phi thơm 2 củ hành tím và 1 củ tỏi băm với 3 thìa dầu màu điều cho thơm phức.',
          'Thêm 2 cây sả băm nhuyễn và 2 thìa ớt bột Huế xào nhanh 1 phút tạo thành sốt sa tế cay nồng đỏ rực.',
          'Đổ 1/2 phần sốt sa tế này cùng toàn bộ phần nước mắm ruốc đã lắng trong ở Bước 1 vào nồi nước dùng.',
          'Nêm 2 thìa canh đường phèn, 2 thìa nước mắm ngon, 1.5 thìa muối hạt sao cho vị đậm đà sâu thẳm vừa miệng.',
        ],
        description:
          'Phi thơm hành tím, tỏi, ớt sừng băm cùng dầu màu điều và ớt bột Huế cho đỏ rực. Trút một nửa vào nồi nước dùng cùng phần nước mắm ruốc trong đã lắng. Nêm đường phèn, muối, hạt nêm vừa miệng.',
      },
      {
        step: 4,
        title: 'Thả chả cua và hoàn thiện tô bún bò Cố Đô',
        time: '5 - 7 phút',
        heat: 'Nước dùng sôi nhẹ',
        goal: 'Tô bún đầy đặn, viên chả cua nổi bồng bềnh vàng ruộm, nước lèo bốc khói cay nồng',
        actionPoints: [
          'Dùng thìa múc từng viên chả cua thả vào nồi nước dùng đang sôi lăn tăn, nấu 4 phút cho chả cua chín nổi lên mặt nước.',
          'Thả huyết luộc cắt khối vuông và chả lụa Huế vào đun nóng.',
          'Chần sợi bún bò to qua nước sôi cho nóng, vẩy ráo cho vào bát tô lớn.',
          'Xếp thịt bắp bò thái lát, móng giò giòn sần sật, múc chả cua và huyết đặt lên mặt.',
          'Rắc hành tây thái mỏng, hành lá và ngò gai cắt nhỏ, chan nước dùng cay nồng ngập bún.',
        ],
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
    seoTitle: 'Cách Nấu Thịt Kho Tàu Nước Dừa Trứng Cút Mềm Rục, Màu Cánh Gián Óng Ả',
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
        time: '10 phút',
        heat: 'Nước sôi chần thịt',
        goal: 'Thịt sạch hết chất bẩn, cắt miếng vuông vức 3 - 4cm đẹp mắt',
        actionPoints: [
          'Cạo sạch da heo, xát muối hạt và nước cốt chanh lên toàn bộ tảng thịt rồi xả sạch dưới vòi nước.',
          'Chần thịt trong nồi nước sôi có vài lát gừng trong 2 phút để sạch bọt cặn và định hình thớ thịt.',
          'Vớt ra rửa nước lạnh, dùng dao bén cắt thịt thành từng khối vuông to khoảng 3 - 4cm (khoảng bao diêm).',
        ],
        description:
          'Rửa sạch thịt bằng muối và giấm, chần qua nước sôi 2 phút rồi vớt ra xả nước lạnh. Cắt thịt thành từng khối vuông to khoảng 3 - 4cm.',
      },
      {
        step: 2,
        title: 'Ướp thịt ngấm gia vị và phơi mỡ trong',
        time: '30 - 45 phút',
        heat: 'Nhiệt độ phòng hoặc phơi nắng nhẹ',
        goal: 'Gia vị ngấm đều vào từng thớ nạc, lớp mỡ se lại để khi kho sẽ trong veo như thạch',
        actionPoints: [
          'Ướp 600g thịt với 3 thìa canh nước mắm ngon, 1 thìa canh đường thốt nốt, 1 thìa hạt nêm, hành tỏi băm nhuyễn và 1 thìa tiêu sọ giã giập.',
          'Đảo đều tay và để thịt nghỉ khoảng 30 - 45 phút cho thấm gia vị.',
          'Mẹo dân gian Nam Bộ: Đem đĩa thịt ra hong nơi thoáng gió hoặc phơi nắng nhẹ 20 phút cho phần mỡ trong lại.',
        ],
        description:
          'Ướp thịt với nước mắm, đường, hành tỏi băm và chút tiêu trong 30 - 45 phút. Mẹo nhỏ: mang đĩa thịt ra phơi nắng nhẹ 20 phút cho phần mỡ trong veo khi kho.',
      },
      {
        step: 3,
        title: 'Thắng nước màu và kho thịt cùng nước dừa tươi',
        time: '40 phút',
        heat: 'Lửa vừa rồi hạ liu riu',
        goal: 'Thịt săn bóng bẩy màu cánh gián, nước dừa ngấm làm thớ thịt bắt đầu mềm rục',
        actionPoints: [
          'Cho 1 thìa canh đường vào nồi, đun lửa vừa đến khi đường tan chảy ngả màu cánh gián đẹp mắt.',
          'Trút toàn bộ thịt vào đảo nhanh tay khoảng 3 - 4 phút cho các mặt thịt săn lại và bám đều màu nâu óng ả.',
          'Đổ 500ml nước dừa xiêm tươi vào ngập mặt thịt (nếu chưa ngập thêm chút nước lọc).',
          'Đun sôi bùng lên rồi hạ ngay lửa liu riu. Hớt sạch bọt trắng nổi lên và tuyệt đối không đậy nắp nồi.',
        ],
        description:
          'Thắng đường cho ngả màu cánh gián đẹp mắt, cho thịt vào đảo săn đều các mặt. Đổ nước dừa tươi ngập thịt, đun sôi bùng rồi hạ lửa nhỏ liu riu, hớt bọt cẩn thận.',
      },
      {
        step: 4,
        title: 'Thêm trứng và kho sánh mềm rục',
        time: '25 - 30 phút',
        heat: 'Lửa nhỏ liu riu',
        goal: 'Nước kho sánh kẹo màu hổ phách, thịt mềm tan trong miệng, lòng trắng trứng dai giòn đậm vị',
        actionPoints: [
          'Sau 40 phút ninh thịt mềm, thả 10 - 12 quả trứng cút đã bóc vỏ (hoặc trứng vịt) vào kho cùng.',
          'Nêm nếm lại với 1 thìa nước mắm cho vị mặn ngọt hài hòa, đậm đà béo ngậy.',
          'Tiếp tục kho liu riu thêm 25 phút đến khi nước kho cạn bớt sánh lại, bao bọc quanh miếng thịt óng ả.',
          'Thả 1 quả ớt sừng nguyên trái vào nồi để tạo mùi thơm dịu nhẹ mà không bị quá cay.',
        ],
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
    seoTitle: 'Cách Làm Nem Nướng Nha Trang Cuốn Bánh Tráng & Nước Sốt Tương Gan Chuẩn Vị',
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
        title: 'Quết giò sống và mỡ hạt lựu dai giòn tự nhiên',
        time: '15 phút',
        heat: 'Nhiệt độ phòng (lạnh)',
        goal: 'Hỗn hợp nem dẻo quánh, dính chặt, phân bổ đều hạt mỡ li ti',
        actionPoints: [
          '200g mỡ heo luộc chín, thái hạt lựu thật nhỏ, trộn cùng 1 thìa đường rồi phơi gió 20 phút cho hạt mỡ trong veo.',
          'Cho 500g giò sống lạnh vào âu, thêm mỡ hạt lựu, 1 thìa tỏi phi thơm, 1 thìa tiêu giã dập, 1 thìa mắm ngon và 1 thìa dầu màu điều.',
          'Dùng muôi gỗ hoặc găng tay miết quết liên tục theo 1 chiều trong 10 phút cho khối thịt dẻo dai kết dính bóng bẩy.',
        ],
        description:
          'Trộn đều giò sống với mỡ heo thái hạt lựu, tỏi phi, tiêu, nước mắm và chút dầu màu điều. Dùng muôi quết đều tay theo 1 chiều cho hỗn hợp thật dẻo dai kết dính.',
      },
      {
        step: 2,
        title: 'Nắn nem vào xiên tre & nướng xém vàng',
        time: '15 - 20 phút',
        heat: 'Than hoa đỏ vừa / Nồi chiên không dầu 180°C',
        goal: 'Nem chín vàng ruộm xém cạnh, tươm mỡ thơm nức, bên trong dai giòn ngọt thịt',
        actionPoints: [
          'Xiên tre ngâm nước 30 phút trước khi dùng để không bị cháy đen khi nướng.',
          'Thoa chút dầu ăn lên lòng bàn tay, lấy lượng thịt vừa phải bọc tròn đều quanh que xiên (dài khoảng 10 - 12cm).',
          'Đặt xiên nem lên vỉ nướng than hoa (hoặc xếp vào nồi chiên không dầu nướng 180°C trong 12 phút).',
          'Trở mặt đều tay và quét chút dầu màu điều lên mặt cho nem bóng bẩy, xém vàng cánh gián dậy mùi thơm nức.',
        ],
        description:
          'Thoa chút dầu ăn lên tay, nắn thịt bao quanh que xiên tre. Nướng trên than hoa đỏ hoặc nồi chiên không dầu ở 180°C trong 15 phút, trở mặt liên tục cho nem xém vàng óng mỡ.',
      },
      {
        step: 3,
        title: 'Nấu sốt chấm tương gan nếp sánh mịn béo bùi',
        time: '15 phút',
        heat: 'Lửa nhỏ khuấy đều',
        goal: 'Nước chấm sánh dẻo màu vàng cam óng ả, vị ngọt bùi béo ngậy khó cưỡng',
        actionPoints: [
          'Phi thơm tỏi băm với 2 thìa dầu màu điều, cho 100g thịt heo xay và 50g gan heo băm nhuyễn vào xào chín săn.',
          'Đổ 2 thìa tương hột băm và 1 bát con cháo nếp xay nhuyễn vào khuấy đều tay trên lửa nhỏ.',
          'Nêm 2 thìa đường cát, 1 thìa hạt nêm, đun sôi liu riu khuấy liên tục cho sốt sánh mịn đặc sệt màu cam đất hấp dẫn.',
          'Múc sốt ra bát, rắc đậu phộng rang giã dập và ớt băm lên bề mặt khi còn ấm nóng.',
        ],
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
    seoTitle: 'Cách Nấu Canh Chua Cá Lóc Nam Bộ Thanh Mát, Đậm Đà Không Tanh',
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
        title: 'Khử tanh và ướp cá lóc đồng',
        time: '10 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Cá sạch hoàn toàn nhớt và mùi tanh, thớ thịt săn chắc ngấm nhẹ gia vị',
        actionPoints: [
          'Chà xát muối hạt và nước cốt chanh thật kỹ lên da cá lóc để sạch hết lớp nhớt đen, rửa lại nước lạnh rồi để ráo.',
          'Cắt cá thành từng khúc dày khoảng 2.5 - 3cm.',
          'Ướp cá với 1 thìa canh nước mắm ngon, 1/2 thìa cà phê tiêu xay và đầu hành lá băm nhuyễn trong 10 phút.',
        ],
        description:
          'Xát muối và chanh lên da cá để sạch nhớt. Rửa sạch khứa cá để ráo. Ướp cá với chút nước mắm, tiêu và đầu hành băm.',
      },
      {
        step: 2,
        title: 'Nấu nước dùng chua thanh ngọt dịu',
        time: '10 phút',
        heat: 'Lửa lớn đun sôi',
        goal: 'Nước canh sôi trong vắt, cá chín tới ngọt mềm không bị nát',
        actionPoints: [
          'Đun sôi 1.2 lít nước lọc trong nồi lớn, dầm vắt me chín vào bát nước ấm lọc lấy nước cốt me chua đổ vào nồi.',
          'Thả dứa thái lát và cà chua bổ múi cau vào đun sôi bùng để tiết vị chua ngọt thanh khiết.',
          'Nhẹ nhàng thả từng khứa cá lóc vào nồi, hạ lửa vừa nấu chín trong 8 - 10 phút. Hớt bọt thường xuyên cho nước trong veo.',
        ],
        description:
          'Đun sôi 1.2 lít nước, cho nước cốt me và cà chua, dứa vào đun sôi bùng. Thả từng khúc cá lóc vào nấu chín trong 8 - 10 phút rồi vớt bọt liên tục.',
      },
      {
        step: 3,
        title: 'Nêm nếm gia vị và nấu chín rau ghém',
        time: '5 phút',
        heat: 'Lửa vừa',
        goal: 'Nước canh tròn vị chua - ngọt - mặn Nam Bộ, đậu bắp và dọc mùng giòn sần sật',
        actionPoints: [
          'Nêm 2 thìa canh đường phèn, 2 thìa canh nước mắm nhĩ cốt và 1 thìa cà phê muối hạt sao cho vị chua ngọt đậm đà thanh tao.',
          'Cho đậu bắp cắt chéo và dọc mùng đã bóp muối rửa sạch vào nấu sôi 2 phút cho vừa chín tới giữ độ giòn.',
          'Tắt bếp rồi mới thả giá đỗ sống vào để giá giữ trọn độ tươi giòn không bị nhũn.',
        ],
        description:
          'Nêm nước mắm nhĩ và đường phèn sao cho vị chua - ngọt - mặn cân bằng hài hòa. Cho đậu bắp, dọc mùng vào nấu vừa chín tới rồi thêm giá đỗ sống.',
      },
      {
        step: 4,
        title: 'Bày tô và rắc ngò ôm, tỏi phi thơm nức',
        time: '3 phút',
        heat: 'Múc canh nóng',
        goal: 'Tô canh rực rỡ sắc màu, dậy mùi thơm đặc trưng của ngò ôm, ngò gai và tỏi phi giòn',
        actionPoints: [
          'Múc cá lóc ra giữa bát tô lớn, xếp đều rau ghém xung quanh rồi chan nước canh chua nóng hổi lên trên.',
          'Rắc ngò ôm (rau ngổ), ngò gai thái nhỏ và vài lát ớt sừng đỏ tươi.',
          'Rắc 2 thìa tỏi phi vàng giòn rụm lên mặt tô canh tạo hương thơm nức mũi chuẩn vị miền Tây.',
        ],
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
    seoTitle: 'Cách Nấu Bao Tử Hầm Tiêu Xanh Giòn Sần Sật, Nước Dùng Cay Nồng Ngọt Thanh',
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
        time: '15 phút',
        heat: 'Chảo gang khô nóng & nước đá lạnh',
        goal: 'Bao tử trắng phau, sạch 100% màng nhầy và mùi gây, giòn sần sật',
        actionPoints: [
          'Lộn mặt trong bao tử ra ngoài, cạo bỏ sạch các mảng mỡ thừa và màng nhầy dưới vòi nước chảy.',
          'Bóp kỹ bao tử với 2 thìa muối hạt và nước cốt 2 quả chanh trong 3 phút, rửa sạch.',
          'Đặt chảo không dầu lên bếp cho thật nóng, cho bao tử vào áp chảo đảo nhanh 2 phút cho săn lại và bong hết chất nhớt còn sót, vớt ra cạo sạch.',
          'Bóp lại lần cuối với 1/2 chén rượu trắng và gừng giã nát, chần nước sôi rồi thả ngay vào thau nước đá lạnh ngâm 5 phút.',
        ],
        description:
          'Lộn trái bao tử, cạo sạch màng nhầy dưới vòi nước. Bóp kỹ lần 1 với muối hạt và nước cốt chanh. Cho bao tử vào chảo gang khô không dầu áp chảo đảo nhanh 2-3 phút cho săn lại và ra bọt tanh rồi vớt ra cạo sạch lần nữa. Rửa lại lần cuối với rượu trắng và gừng đập dập, sau đó chần qua nước sôi rồi ngâm ngay vào thau nước đá lạnh để bao tử giữ độ giòn trắng.',
        tip: 'Khâu áp chảo khô với muối và giấm/rượu là bí quyết của đầu bếp nhà hàng giúp khử mùi hôi tuyệt đối và tạo độ giòn sần sật.',
      },
      {
        step: 2,
        title: 'Thái miếng vừa ăn và xào săn đậm vị',
        time: '10 phút',
        heat: 'Lửa lớn',
        goal: 'Từng miếng bao tử săn đều, ngấm trọn vị thơm cay của tiêu sọ và hành tỏi',
        actionPoints: [
          'Dùng dao bén cắt bao tử thành từng miếng dày khoảng 2 ngón tay (3x5cm).',
          'Ướp bao tử với 1 thìa canh mắm nhĩ, 1 thìa hạt nêm, tỏi băm, tiêu sọ giã giập và 2 nhánh tiêu xanh đập dập trong 15 phút.',
          'Phi thơm 3 củ hành tím đập dập với 1 thìa dầu ăn, trút bao tử vào xào với lửa lớn trong 3 phút cho săn giòn thơm phức.',
        ],
        description:
          'Cắt bao tử thành từng miếng vừa ăn (bản dày khoảng 1.5 - 2 ngón tay). Ướp cùng 1 thìa canh nước mắm, hành tỏi băm, tiêu đập dập và một nửa số tiêu xanh giã dập trong 20 phút. Phi thơm hành tỏi trên chảo, cho bao tử vào xào săn với lửa lớn để ngấm gia vị.',
      },
      {
        step: 3,
        title: 'Ninh chậm cùng nước dừa tươi và chùm tiêu xanh',
        time: '40 - 45 phút',
        heat: 'Lửa nhỏ liu riu',
        goal: 'Nước dùng trong veo ngọt thanh tự nhiên, tiêu xanh thơm lừng the cay, bao tử mềm mà giòn sần sật',
        actionPoints: [
          'Trút bao tử đã xào vào nồi, đổ 500ml nước dừa xiêm ngọt mát cùng 700ml nước dùng hầm xương (hoặc nước lọc).',
          'Thả các chùm tiêu xanh tươi nguyên hạt và củ sen cắt khoanh vào nồi.',
          'Đun sôi bùng, vớt sạch bọt rồi hạ lửa liu riu ninh trong 35 - 40 phút.',
          'Thả nấm rơm búp và nêm 1 thìa đường phèn, 1 thìa nước mắm cho vị nước thanh ngọt cay the ấm bụng.',
        ],
        description:
          'Cho bao tử đã xào vào nồi cùng 500ml nước dừa xiêm và 700ml nước dùng hầm xương (hoặc nước lọc). Thả các chùm tiêu xanh nguyên hạt, củ sen và đun sôi rồi hạ nhỏ lửa ninh liu riu trong 40 - 45 phút đến khi bao tử chín mềm vừa tới nhưng vẫn giữ độ giòn sần sật đặc trưng. Cho nấm rơm vào đun thêm 5 phút, nêm đường phèn và nước mắm vừa khẩu vị.',
      },
      {
        step: 4,
        title: 'Bày thố đất hoặc lẩu nóng hổi',
        time: '5 phút',
        heat: 'Nồi lẩu sôi liu riu',
        goal: 'Thố bao tử bốc khói ngào ngạt hương tiêu cay nồng, ăn kèm rau xanh mướt và mì tươi',
        actionPoints: [
          'Múc bao tử và nước hầm tiêu xanh ra thố đất giữ nhiệt hoặc nồi lẩu nhỏ đặt trên bếp cồn/bếp từ mini.',
          'Rắc hành hoa, ngò rí và vài nhánh tiêu xanh tươi lên mặt cho bắt mắt.',
          'Bày đĩa rau mồng tơi, xà lách xoong, cải bẹ xanh tươi non và mì trứng (hoặc bún tươi) để nhúng ăn nóng.',
        ],
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
    seoTitle: 'Cách Làm Lòng Nướng Sa Tế Cay Giòn Rụm Than Hoa Thơm Lừng Mồi Nhậu',
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
        time: '10 phút',
        heat: 'Nước sôi 30 giây & nước đá lạnh',
        goal: 'Lòng non sạch thơm, màu trắng sáng, giữ trọn độ giòn sần sật và vị ngọt béo ngậy',
        actionPoints: [
          'Dùng tay vuốt nhẹ một lần từ đầu đến cuối dưới vòi nước (không vuốt ép quá mạnh làm rách màng mỡ sữa bên trong).',
          'Bóp nhẹ với 1 thìa muối hạt và nước cốt chanh rồi rửa sạch ngay.',
          'Đun sôi nồi nước có gừng đập dập và 1 chén rượu trắng, thả lòng vào chần đúng 30 giây.',
          'Vớt lòng ra ngay lập tức thả vào âu nước đá lạnh có vắt chanh để lòng giòn rụm và trắng phau.',
        ],
        description:
          'Dùng tay vuốt nhẹ lòng non từ đầu tới cuối dưới vòi nước (không vuốt quá kỹ làm mất chất ngọt). Bóp nhẹ với muối hạt và nước cốt chanh để khử nhớt. Chần lòng qua nồi nước sôi có gừng đập dập và rượu trắng trong đúng 30 giây rồi vớt ngay ra thả vào âu nước đá lạnh để lòng giòn sần sật và giữ màu trắng sáng.',
        tip: 'Tuyệt đối không luộc lòng quá lâu lúc sơ chế vì nhiệt độ cao sẽ khiến lòng bị dai teo lại.',
      },
      {
        step: 2,
        title: 'Cắt khúc và tẩm ướp sốt sa tế óng ả',
        time: '20 - 30 phút',
        heat: 'Nhiệt độ phòng mát',
        goal: 'Từng đoạn lòng áo đều lớp sốt sa tế đỏ cam óng ả, thơm lừng mật ong và ngũ vị hương',
        actionPoints: [
          'Cắt lòng thành từng khúc vừa ăn dài khoảng 4 - 5cm.',
          'Pha hỗn hợp sốt: 2 thìa sa tế cay, 1 thìa dầu hào, 1 thìa mật ong, 1 thìa mắm nhĩ, 1/2 thìa ngũ vị hương, sả tỏi hành băm và 1 thìa dầu màu điều.',
          'Đeo găng tay xoa bóp đều sốt vào từng miếng lòng, ướp trong 20 - 30 phút cho ngấm sâu.',
        ],
        description:
          'Cắt lòng thành từng đoạn vừa ăn (dài khoảng 4-5cm). Trộn đều sa tế, dầu hào, mật ong, dầu điều, sả, hành tỏi băm. Đeo găng tay xoa đều sốt vào từng miếng lòng, ướp trong 20 - 30 phút cho ngấm sâu gia vị.',
      },
      {
        step: 3,
        title: 'Nướng xèo xèo trên than hoa đỏ rực',
        time: '15 phút',
        heat: 'Than hoa đỏ rực vừa',
        goal: 'Lòng phồng rộp xèo xèo, viền ngoài vàng óng xém thơm khói, bên trong béo ngậy ngọt giòn',
        actionPoints: [
          'Kẹp lòng vào vỉ nướng hoặc xiên que tre đã ngâm nước.',
          'Đặt lên bếp than hoa đỏ rực nướng đảo mặt liên tục mỗi 1 - 2 phút.',
          'Dùng chổi quét đều nước sốt ướp còn lại lên bề mặt miếng lòng trong suốt quá trình nướng để lòng luôn mọng dầu không bị khô.',
          'Khi thấy lòng phồng căng, viền hơi xém vàng thơm nức mùi sả ớt thì nhấc vỉ ra đĩa.',
        ],
        description:
          'Kẹp lòng vào vỉ hoặc xiên que tre nướng trên bếp than hoa đỏ rực. Trong lúc nướng, liên tục phết phần nước sốt ướp còn lại lên bề mặt để lòng không bị khô. Nướng đến khi lòng vàng óng, mặt ngoài xèo xèo phồng rộp dậy mùi thơm nức mũi.',
      },
      {
        step: 4,
        title: 'Bày đĩa và thưởng thức cùng bia lạnh',
        time: '3 phút',
        heat: 'Thưởng thức nóng hổi',
        goal: 'Đĩa mồi nướng bốc khói ngào ngạt, rắc mè rang thơm lừng, chấm đẫm sốt chao béo cay',
        actionPoints: [
          'Gắp lòng nướng ra đĩa lót rau răm và húng quế.',
          'Rắc 1 thìa mè trắng rang vàng thơm lừng lên mặt đĩa lòng nướng.',
          'Bày kèm dưa leo, chuối chát thái mỏng và khế chua giải ngấy.',
          'Dọn kèm chén chao đỏ tán nhuyễn pha đường ớt hoặc muối ớt xanh tê cay.',
        ],
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
    seoTitle: 'Cách Làm Bàn Tiệc Buffet Lẩu Nướng Hải Sản Tại Nhà Thả Ga, Tiết Kiệm',
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
        time: '25 phút',
        heat: 'Nhiệt độ phòng mát',
        goal: 'Các khay thịt và hải sản được tẩm ướp sốt riêng biệt, bày trí bắt mắt như quầy buffet nhà hàng',
        actionPoints: [
          'Trải từng dải ba chỉ bò Mỹ, cuộn chặt từng bó nấm kim châm nhỏ rồi xếp ngay ngắn lên đĩa.',
          'Dẻ sườn hoặc thăn bò ướp với sốt tiêu đen dầu hào trong 20 phút.',
          'Tôm sú cắt bỏ râu nhọn; mực trứng làm sạch, khứa vảy rồng chéo nhẹ trên lưng rồi ướp sốt sa tế cay.',
          'Rửa sạch các loại rau nấm: nấm đùi gà cắt lát, ngô ngọt cắt khoanh, rau muống và cải thảo cắt khúc vừa ăn.',
        ],
        description:
          'Thịt bò và ba chỉ heo rửa sạch, thấm khô. Thịt bò cuộn chặt từng cuộn nấm kim châm; dẻ sườn ướp sốt tiêu đen dầu hào; ba chỉ ướp sốt sa tế cay mật ong. Hải sản tôm cắt râu, mực làm sạch khứa vảy rồng ướp chút sốt sa tế hành tỏi.',
        tip: 'Khứa vảy rồng trên thân mực giúp mực khi nướng cong tròn đẹp mắt và ngấm trọn gia vị.',
      },
      {
        step: 2,
        title: 'Nấu nước dùng lẩu Thái chua cay thơm nức',
        time: '20 phút',
        heat: 'Lửa lớn đun sôi rồi hạ vừa',
        goal: 'Nước lẩu Tomyum màu đỏ cam rực rỡ, vị chua cay mặn ngọt béo ngậy hài hòa',
        actionPoints: [
          'Phi thơm 3 cây sả đập dập, 1 nhánh riềng thái lát, 3 củ hành tím và 2 quả ớt với 2 thìa dầu màu điều.',
          'Cho 2 quả cà chua bổ múi cau vào xào mềm tạo màu đỏ tự nhiên.',
          'Đổ 1.5 lít nước hầm xương vào đun sôi, nêm gói gia vị lẩu Thái, 2 thìa nước mắm ngon, 1 thìa đường phèn.',
          'Vò nhẹ 5 lá chanh Thái thả vào nồi để nước lẩu dậy mùi thơm thanh dịu đặc trưng chuẩn vị.',
        ],
        description:
          'Hầm nước xương heo hoặc gà cho ngọt nước. Phi thơm sả đập dập, riềng, hành tím và ớt rồi trút cà chua băm vào xào mềm. Đổ nước dùng vào đun sôi, nêm gia vị lẩu Thái, nước cốt me, nước mắm ngon và vò nhẹ lá chanh Thái thả vào tạo hương thơm quyến rũ đặc trưng.',
      },
      {
        step: 3,
        title: 'Bày biện bàn tiệc buffet nướng lẩu và sốt chấm',
        time: '10 phút',
        heat: 'Bật bếp nóng trước 3 phút',
        goal: 'Bàn tiệc tròn trịa, bếp 2 trong 1 ở trung tâm tỏa nhiệt ấm cúng, chén sốt chấm chuẩn vị',
        actionPoints: [
          'Đặt bếp nướng lẩu tích hợp (hoặc 1 bếp nướng và 1 nồi lẩu) ngay giữa bàn ăn gia đình.',
          'Xếp các đĩa ba chỉ cuộn nấm, mực trứng, tôm sú, ngao và rau nấm vây quanh bếp.',
          'Rót sốt muối ớt xanh sữa đặc vào đĩa nhỏ cho hải sản.',
          'Rót sốt đậu tương Hàn Quốc (Ssamjang) trộn mè rang và dầu mè cho thịt nướng.',
          'Chuẩn bị rổ xà lách tươi giòn, lá mè (tía tô Hàn Quốc) và đĩa kim chi cay giòn giải ngấy.',
        ],
        description:
          'Đặt bếp nướng lẩu 2 trong 1 (hoặc 1 bếp nướng và 1 bếp lẩu) ở giữa bàn. Bày các đĩa thịt, hải sản, rau nấm xung quanh thành vòng tròn rực rỡ. Rót sẵn các loại sốt chấm: muối ớt xanh cho hải sản và sốt tương đậu mè rang cho thịt nướng.',
      },
      {
        step: 4,
        title: 'Bật bếp, khai tiệc nướng xèo xèo và nâng ly',
        time: 'Thưởng thức tự do suốt bữa tiệc',
        heat: 'Vỉ nướng nóng xèo xèo / Lẩu sôi sùng sục',
        goal: 'Món nướng thơm nức bơ tỏi, món nhúng lẩu ngọt nước đậm đà, không khí sum vầy rôm rả',
        actionPoints: [
          'Thoa một lớp bơ nhạt lên vỉ nướng, lần lượt gắp ba chỉ bò cuộn nấm, dẻ sườn, mực xèo xèo trên lửa.',
          'Thả ngao hai cùi, ngô ngọt và nấm vào nồi lẩu Thái đang sôi sùng sục để nước lẩu thêm ngọt đậm.',
          'Thịt chín vàng thơm cuốn cùng xà lách, kim chi chấm ngập sốt tương đậu bùi ngậy.',
          'Hải sản nướng chín chấm muối ớt xanh tê cay chua ngọt bùng nổ vị giác.',
        ],
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
    seoTitle: 'Cách Làm Bê Thui Cầu Mống Da Giòn Thịt Mềm & Bí Quyết Pha Mắm Nêm Xứ Quảng',
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
        time: '25 - 30 phút',
        heat: 'Khò nhiệt giòn da & hấp lửa vừa',
        goal: 'Lớp da ngoài phồng rộp vàng óng giòn sần sật, thớ thịt bên trong chín tới màu hồng đào mọng ngọt',
        actionPoints: [
          'Dùng đầu khò gas nhiệt (hoặc nướng than rơm rạ) khò đều quanh phần da miếng thịt đùi bê đến khi da phồng rộp lấm tấm vàng óng giòn tan.',
          'Rửa sạch tảng thịt bê, để ráo.',
          'Lót sả cây đập dập và gừng thái lát dưới xửng hấp, đặt thịt bê lên trên, rưới 1 thìa canh rượu trắng.',
          'Hấp cách thủy trên lửa vừa trong 18 - 20 phút. Dùng que tăm xiên thử vào giữa miếng thịt thấy nước ứa ra phớt hồng nhạt là thịt vừa chín tới hoàn hảo.',
        ],
        description:
          'Dùng khò nhiệt hoặc nướng da bê trên than hoa/rơm rạ cho phần da phồng rộp, vàng óng giòn sần sật. Sau đó đặt miếng thịt bê lên xửng hấp cùng sả đập dập và gừng tươi trong khoảng 15-20 phút đến khi thịt chín tới (bên ngoài chín đều, thớ thịt bên trong phớt hồng đào ngọt lịm mọng nước).',
        tip: 'Thịt bê thui ngon nhất là khi vừa chín tới hai tầng thịt - da giòn, thịt hồng mềm mọng nước, tuyệt đối không hấp quá kỹ làm thịt khô dai.',
      },
      {
        step: 2,
        title: 'Thái lát thịt bê hai tầng da giòn thịt hồng',
        time: '10 phút',
        heat: 'Nhiệt độ phòng (thịt nguội bớt)',
        goal: 'Lát thịt thái mỏng tang, dính liền mép da vàng giòn, thớ thịt hồng hào bóng bẩy',
        actionPoints: [
          'Để miếng thịt bê nghỉ khoảng 5 phút cho nước ngọt phân bổ đều lại trong thớ thịt.',
          'Dùng dao bản mỏng thật sắc thái thịt thành từng lát thật mỏng ngang thớ.',
          'Mỗi lát thịt bắt buộc phải dính liền cả phần da vàng giòn bên ngoài và lớp thịt nạc hồng tươi mọng nước bên trong.',
          'Xếp thịt xoay tròn hình cánh hoa trên đĩa lớn, rắc mè trắng rang vàng thơm lừng lên bề mặt.',
        ],
        description:
          'Dùng dao thật sắc thái thịt bê thành từng lát mỏng, dính liền cả phần da vàng ruộm giòn tan và thớ thịt hồng tươi. Xếp thịt xoay tròn đều trên đĩa rồi rắc mè rang vàng thơm phức lên bề mặt.',
      },
      {
        step: 3,
        title: 'Pha chén mắm nêm cá cơm trứ danh xứ Quảng',
        time: '10 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Mắm nêm sánh mịn thơm ngát dứa chín, vị mặn mòi ngọt sâu, tỏi ớt xiêm xanh cay nồng xé lưỡi',
        actionPoints: [
          'Cho 1 chén mắm nêm cá cơm nguyên chất vào bát lớn.',
          'Dứa (thơm) băm nhuyễn vắt lấy cả nước lẫn xác thả vào bát mắm nêm (giúp giảm vị mặn gắt và tạo độ sánh dịu).',
          'Nêm 2 thìa canh đường phèn (hoặc đường cát vàng), 1 thìa nước cốt chanh khuấy tan đều.',
          'Thêm 1 củ tỏi băm nhỏ, 4-5 trái ớt xiêm xanh đập dập thả nổi lên trên cùng chút mè rang thơm nức.',
        ],
        description:
          'Cho mắm nêm vào bát, thêm nước cốt dứa băm nhuyễn, đường phèn, nước cốt chanh khuấy tan đều vị chua ngọt mặn mà. Thêm thật nhiều tỏi băm, ớt hiểm xanh cay xé lưỡi và rắc chút mè rang lên trên.',
      },
      {
        step: 4,
        title: 'Cuốn bánh tráng Đại Lộc và thưởng thức mồi nhậu bén bia',
        time: '3 phút',
        heat: 'Thưởng thức trực tiếp',
        goal: 'Cuốn bánh tráng tròn trịa, chấm ngập chén mắm nêm đậm đà béo ngọt giòn tan',
        actionPoints: [
          'Nhúng ướt nhẹ bánh tráng Đại Lộc cho dẻo dai trải lên đĩa phẳng.',
          'Xếp rau thơm các loại: húng quế, diếp cá, ngò tàu, tía tô, lát chuối chát ngâm chanh và khế chua.',
          'Đặt 2 lát thịt bê thui hồng mềm lên trên, rắc thêm một nhúm vụn bánh tráng nướng giòn rụm.',
          'Cuộn tròn chặt tay, chấm ngập vào chén mắm nêm cay xé lưỡi thưởng thức trọn vẹn tinh hoa ẩm thực Cầu Mống.',
        ],
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
    seoTitle: 'Cách Làm Bánh Bèo Chén Tôm Chấy Tóp Mỡ Xoáy Lòng Chuẩn Vị Huế',
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
        time: '45 phút (pha & ủ bột)',
        heat: 'Nhiệt độ phòng',
        goal: 'Bột tan mịn hoàn toàn, không vón cục, ủ lắng tạo độ dẻo mềm mướt chuẩn xoáy lõm',
        actionPoints: [
          'Cho 150g bột gạo tẻ, 30g bột năng và 1/2 thìa cà phê muối vào âu lớn.',
          'Rót 250ml nước lạnh vào khuấy tan đều hoàn toàn.',
          'Từ từ châm 250ml nước sôi ấm vào quấy đều tay theo 1 chiều, thêm 1 thìa canh dầu ăn cho bánh mướt.',
          'Để bột nghỉ yên tĩnh trong 30 - 45 phút trước khi đổ chén (bí quyết giúp bánh hấp tạo xoáy sâu chính giữa chén).',
        ],
        description:
          'Khuấy đều bột gạo, bột năng, muối với nước lạnh cho tan hoàn toàn. Sau đó từ từ châm nước sôi ấm vào quấy đều tay, thêm thìa dầu ăn. Để bột nghỉ khoảng 30 - 45 phút trước khi đổ chén giúp bánh khi hấp tạo thành hình xoáy lõm chính giữa chuẩn điệu.',
        tip: 'Tỷ lệ bột gạo và bột năng chuẩn kết hợp nước ấm sẽ giúp bánh mềm mướt không bị nát cũng không bị cứng.',
      },
      {
        step: 2,
        title: 'Làm tôm chấy đỏ au và mỡ hành, tóp mỡ giòn rụm',
        time: '15 phút',
        heat: 'Lửa nhỏ sao tôm & lửa vừa thắng mỡ',
        goal: 'Tôm chấy tơi xốp đỏ au tự nhiên, tóp mỡ vàng giòn rụm, mỡ hành xanh mướt óng ả',
        actionPoints: [
          'Tôm tươi bóc vỏ, luộc chín (giữ lại nước luộc tôm để pha nước mắm ngọt).',
          'Cho tôm vào cối giã nhuyễn rồi trút vào chảo chống dính sao nhỏ lửa đến khi sợi tôm khô tơi xốp, màu cam đỏ rực rỡ.',
          'Thái 150g mỡ heo hạt lựu nhỏ, cho vào chảo rán lửa vừa đến khi tóp mỡ vàng giòn thì vớt ra để ráo dầu.',
          'Lấy 3 thìa mỡ nóng đang sôi trút vào bát hành lá thái nhỏ với chút xíu đường tạo thành mỡ hành xanh bóng mướt.',
        ],
        description:
          'Tôm bóc vỏ luộc chín (giữ lại nước luộc làm nước mắm), đem giã nhuyễn rồi cho vào chảo chống dính sao nhỏ lửa đến khi sợi tôm khô tơi xốp, màu cam đỏ tự nhiên. Mỡ heo thắng vàng giòn vớt tóp mỡ ra, trút hành lá cắt nhỏ vào dầu nóng làm mỡ hành óng ả.',
      },
      {
        step: 3,
        title: 'Làm nóng chén và hấp bánh bèo xoáy lòng sâu',
        time: '10 phút mỗi mẻ',
        heat: 'Lửa lớn hơi nước bốc mạnh',
        goal: 'Bánh bèo chín trắng đục, chính giữa chén xoáy lõm sâu hút mắt, róc chén không dính',
        actionPoints: [
          'Xếp các chén sành nhỏ vào xửng hấp, đậy vung đun sôi nước 3 phút cho chén thật nóng già.',
          'Khuấy đều âu bột lên cho đều, múc bột đổ vào từng chén (khoảng 1/2 đến 2/3 chén sành).',
          'Đậy kín nắp xửng, hấp trên lửa lớn liên tục trong 7 - 8 phút.',
          'Khi thấy bánh chín chuyển màu trắng đục, giữa chén xoáy lõm một vòng tròn sâu hoắm là bánh đã đạt độ chín hoàn mỹ.',
        ],
        description:
          'Xếp các chén sành nhỏ vào xửng hấp, đun sôi nước cho chén nóng lên trong 3 phút. Quấy đều thau bột rồi múc bột đổ vào từng chén (khoảng 1/2 đến 2/3 chén). Đậy nắp hấp lửa lớn trong 7 - 8 phút đến khi bánh chín trắng đục, giữa chén xoáy lõm sâu là đạt.',
      },
      {
        step: 4,
        title: 'Trang trí tôm chấy, chan nước mắm ngọt ấm & thưởng thức',
        time: '5 phút',
        heat: 'Nước mắm ngọt ấm',
        goal: 'Mỗi chén bánh bèo đẹp như tranh vẽ, mềm tan béo ngậy, ngọt thanh cay nồng đầu lưỡi',
        actionPoints: [
          'Nhấc chén bánh ra khỏi xửng, phết 1 thìa mỡ hành óng ả vào giữa lòng xoáy bánh.',
          'Rắc 1 thìa tôm chấy đỏ au phủ đều mặt và thả vài hạt tóp mỡ giòn rụm (hoặc bánh mì chiên giòn).',
          'Pha nước mắm: Lấy nước luộc tôm hòa cùng nước mắm ngon, đường cát vàng theo tỷ lệ ngọt thanh, thêm ớt hiểm cắt khoanh cay tê.',
          'Khi ăn chan 1 thìa nước mắm ngọt ấm vào chén, dùng thìa tre xắn từng miếng bánh thưởng thức nóng hổi.',
        ],
        description:
          'Lấy chén bánh ra, phết một thìa mỡ hành óng ả, rắc tôm chấy đỏ au và vài hạt tóp mỡ giòn rụm lên trên. Khi ăn chan 1 thìa nước mắm ngọt ấm pha ớt cay, dùng thìa tre xắn từng góc bánh thưởng thức trọn vẹn sự dẻo mềm, béo ngậy giòn tan.',
      },
    ],
    chefSecret:
      'Làm nóng chén trong nồi hấp trước khi đổ bột vào là bí quyết vàng để bánh bèo nở xoáy sâu ở giữa lòng chén và không hề bị dính chén khi xắn bánh.',
    recommendedSauce:
      'Nước mắm ngọt pha từ nước luộc tôm tươi, có vị mặn ngọt thanh nhẹ, điểm xuyết vài lát ớt tươi cay nồng.',
  },

  'com-ga-xoi-mo': {
    dishId: 'com-ga-xoi-mo',
    dishName: 'Cơm Gà Xối Mỡ Da Giòn',
    seoTitle: 'Cách Làm Cơm Gà Xối Mỡ Thơm Ngon Đậm Đà Chuẩn Quán',
    prepTime: '35 phút',
    cookTime: '30 phút',
    difficulty: 'Trung bình',
    servings: '2 - 3 người',
    ingredients: [
      {
        category: 'Nguyên liệu cần chuẩn bị',
        items: [
          'Thịt gà: 2 cái đùi gà (hoặc phần ức tùy thích).',
          'Gạo: 250g.',
          'Gia vị: Hạt nêm, bột nghệ (hoặc dầu điều), nước tương, ngũ vị hương, tỏi, gừng, hành tím.',
          'Ăn kèm: Dưa leo, cà chua, rau xà lách.',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế và ướp gà',
        time: '30 phút',
        heat: 'Nhiệt độ phòng (ướp ngấm)',
        goal: 'Khử sạch mùi hôi, đùi gà ngấm sâu gia vị ngũ vị hương và nước cốt tỏi gừng thơm lừng',
        actionPoints: [
          'Rửa sạch đùi gà với muối và gừng để khử mùi hôi.',
          'Khứa vài đường trên đùi gà để nhanh thấm gia vị.',
          'Ướp gà với: 1 muỗng cà phê hạt nêm, 1 muỗng canh nước gừng, 1 muỗng canh nước cốt tỏi, 1 muỗng canh nước tương và chút ngũ vị hương. Trộn đều và để ngấm trong 30 phút.',
        ],
        description:
          'Rửa sạch đùi gà với muối và gừng để khử mùi hôi. Khứa vài đường trên đùi gà để nhanh thấm gia vị. Ướp gà với: 1 muỗng cà phê hạt nêm, 1 muỗng canh nước gừng, 1 muỗng canh nước cốt tỏi, 1 muỗng canh nước tương và chút ngũ vị hương. Trộn đều và để ngấm trong 30 phút.',
        tip: 'Vắt lấy nước cốt gừng và tỏi để ướp gà giúp gia vị ngấm đều mà khi xối mỡ không bị cháy xém lấm tấm.',
      },
      {
        step: 2,
        title: 'Nấu cơm màu vàng nghệ',
        time: '20 - 25 phút',
        heat: 'Nồi cơm điện',
        goal: 'Hạt cơm chín vàng óng ả, thơm dẻo, ngậy vị nước luộc gà và đậm đà hạt nêm',
        actionPoints: [
          'Vo sạch gạo.',
          'Cho gạo vào nồi cơm điện, thêm nước (hoặc nước luộc gà nếu bạn luộc sơ gà trước), 1 muỗng cà phê hạt nêm và 1/2 muỗng cà phê bột nghệ để tạo màu vàng đẹp mắt.',
          'Bấm nút nấu như bình thường.',
        ],
        description:
          'Vo sạch gạo. Cho gạo vào nồi cơm điện, thêm nước (hoặc nước luộc gà nếu bạn luộc sơ gà trước), 1 muỗng cà phê hạt nêm và 1/2 muỗng cà phê bột nghệ để tạo màu vàng đẹp mắt. Bấm nút nấu như bình thường.',
        tip: 'Dùng nước luộc gà nấu cơm sẽ giúp từng hạt cơm bóng bẩy, thơm phức và béo ngọt tự nhiên.',
      },
      {
        step: 3,
        title: 'Luộc sơ và chiên xối mỡ gà',
        time: '15 - 20 phút',
        heat: 'Lửa vừa - Dầu sôi già',
        goal: 'Lớp da gà vàng rụm, giòn tan rôm rốp, thịt bên trong chín mềm mọng nước',
        actionPoints: [
          'Đem đùi gà đã ướp hấp hoặc luộc sơ cho gà chín tới, sau đó để ráo hoàn toàn nước (da khô giúp khi xối mỡ không bị bắn dầu và giòn hơn).',
          'Đun nóng chảo dầu sâu lòng. Dùng vá múc dầu nóng xối liên tục lên phần da gà cho đến khi da chuyển màu vàng rụm, giòn tan thì vớt ra giấy thấm dầu.',
        ],
        description:
          'Đem đùi gà đã ướp hấp hoặc luộc sơ cho gà chín tới, sau đó để ráo hoàn toàn nước (da khô giúp khi xối mỡ không bị bắn dầu và giòn hơn). Đun nóng chảo dầu sâu lòng. Dùng vá múc dầu nóng xối liên tục lên phần da gà cho đến khi da chuyển màu vàng rụm, giòn tan thì vớt ra giấy thấm dầu.',
        tip: 'Da gà càng khô ráo trước khi cho vào chảo thì khi xối mỡ da càng nổ bung phồng giòn rụm và không lo bị bắn dầu.',
      },
      {
        step: 4,
        title: 'Thành phẩm',
        time: '5 phút',
        goal: 'Bày đĩa cơm gà xối mỡ hoàn mỹ: đùi gà vàng giòn, cơm vàng óng và rau dưa tươi mát',
        actionPoints: [
          'Múc cơm vàng ra đĩa, đặt đùi gà xối mỡ lên trên.',
          'Ăn kèm dưa leo, cà chua và một chén nước mắm chua ngọt hoặc xì dầu tùy sở thích.',
        ],
        description:
          'Múc cơm vàng ra đĩa, đặt đùi gà xối mỡ lên trên. Ăn kèm dưa leo, cà chua và một chén nước mắm chua ngọt hoặc xì dầu tùy sở thích.',
        tip: 'Nên thưởng thức ngay khi đùi gà vừa xối mỡ xong để lớp da giữ trọn độ giòn tan rôm rốp tuyệt hảo.',
      },
    ],
    chefSecret:
      'Hấp hoặc luộc sơ gà cho vừa chín tới rồi để da thật khô ráo là bí quyết bất bại giúp khi xối mỡ lớp da nổ giòn tan màu cánh gián mà phần thịt đùi bên trong vẫn giữ nguyên độ ẩm ngọt mọng nước.',
    recommendedSauce:
      'Nước mắm chua ngọt tỏi ớt hoặc xì dầu (nước tương) tỏi ớt, ăn kèm dưa leo, cà chua và xà lách tươi.',
  },
};

/**
 * Generate standard SEO Title for Recipe Articles ("Cách Nấu Món Ngon")
 * Follows Vietnamese search-intent best practices (Cách nấu / Cách làm + Tên món + Đặc tính hấp dẫn chuẩn vị)
 */
export function getRecipeArticleTitle(dish: Dish, recipe?: DishRecipe): string {
  if (recipe?.seoTitle) {
    return recipe.seoTitle;
  }
  if (CURATED_RECIPES[dish.id]?.seoTitle) {
    return CURATED_RECIPES[dish.id].seoTitle!;
  }

  const rawName = dish.vietnameseName || dish.name || '';
  const cleanName = rawName
    .replace(/^cách nấu\s+/i, '')
    .replace(/^cách làm\s+/i, '')
    .replace(/^hướng dẫn nấu\s+/i, '')
    .replace(/^hướng dẫn làm\s+/i, '')
    .trim();

  const lowerName = cleanName.toLowerCase();
  const cat = dish.category;

  // 0. Món chay
  if (cat === 'do_chay' || lowerName.includes('chay')) {
    return `Cách Làm ${cleanName} Thanh Đạm, Đậm Đà Chuẩn Cơm Chay`;
  }

  // 1. Phở, Bún, Miến, Mì, Hủ tiếu, Bánh canh
  if (lowerName.includes('bún chả') && !lowerName.includes('chả giò') && !lowerName.includes('chả cá')) {
    return `Cách Làm ${cleanName} Thịt Nướng Than Hoa, Nước Chấm Đậm Đà Chuẩn Vị`;
  }
  if (lowerName.includes('chả cá') || lowerName.includes('bún chả cá')) {
    return `Cách Nấu ${cleanName} Thơm Ngon Đậm Đà Chuẩn Vị`;
  }
  if (lowerName.includes('bún đậu')) {
    return `Cách Làm ${cleanName} Thơm Ngon, Đầy Đủ Topping Chuẩn Vị Hà Thành`;
  }
  if (lowerName.includes('bún thịt nướng') || lowerName.includes('bún nem nướng')) {
    return `Cách Làm ${cleanName} Đậm Đà, Nước Mắm Chua Ngọt Chuẩn Vị Nam Bộ`;
  }
  if (
    lowerName.includes('trộn') ||
    lowerName.includes('hủ tiếu khô') ||
    lowerName.includes('mì khô') ||
    lowerName.includes('phở khô')
  ) {
    return `Cách Làm ${cleanName} Sốt Chua Ngọt Đậm Đà Chuẩn Vị`;
  }
  if (
    cat === 'bun_pho_mi' ||
    cat === 'bun_pho' ||
    lowerName.includes('bún') ||
    lowerName.includes('phở') ||
    lowerName.includes('miến') ||
    lowerName.includes('mì') ||
    lowerName.includes('hủ tiếu') ||
    lowerName.includes('bánh canh')
  ) {
    return `Cách Nấu ${cleanName} Nước Dùng Thanh Ngọt Chuẩn Vị Gia Đình`;
  }

  // 2. Lẩu
  if (cat === 'lau_chao' && lowerName.includes('lẩu')) {
    return `Cách Nấu ${cleanName} Chua Cay Đậm Đà Chuẩn Vị Gia Đình`;
  }

  // 3. Cháo, Súp
  if (lowerName.includes('cháo') || lowerName.includes('súp')) {
    return `Cách Nấu ${cleanName} Bổ Dưỡng, Thơm Ngon Cho Cả Nhà`;
  }

  // 4. Canh
  if (lowerName.includes('canh')) {
    return `Cách Nấu ${cleanName} Thanh Mát, Đậm Đà Chuẩn Cơm Nhà`;
  }

  // 5. Kho, Hầm, Rim, Tiềm, Om, Sốt cà
  if (
    lowerName.includes('kho') ||
    lowerName.includes('hầm') ||
    lowerName.includes('rim') ||
    lowerName.includes('tiềm') ||
    lowerName.includes('om') ||
    lowerName.includes('sốt cà')
  ) {
    return `Cách Nấu ${cleanName} Đậm Đà, Mềm Mọng Chuẩn Vị Mẹ Nấu`;
  }

  // 6. Cơm chiên / Cơm rang
  if (lowerName.includes('cơm rang') || lowerName.includes('cơm chiên')) {
    return `Cách Làm ${cleanName} Hạt Cơm Săn Giòn, Thơm Ngon Chuẩn Vị`;
  }

  // 7. Cơm tấm, Cơm niêu, Cơm gà, Xôi
  if (lowerName.includes('xôi')) {
    return `Cách Nấu ${cleanName} Dẻo Thơm Óng Ả Chuẩn Vị Truyền Thống`;
  }
  if (cat === 'com_xoi' || cat === 'com' || lowerName.includes('cơm')) {
    return `Cách Làm ${cleanName} Thơm Ngon Đậm Đà Chuẩn Quán`;
  }

  // 8. Bánh mì, Bánh xèo, Bánh cuốn, Bánh khọt, Nem rán, Chả giò
  if (lowerName.includes('nem rán') || lowerName.includes('chả giò') || lowerName.includes('nem chua rán')) {
    return `Cách Làm ${cleanName} Vàng Ruộm, Giòn Rụm Bất Bại Tại Nhà`;
  }
  if (lowerName.includes('bánh xèo') || lowerName.includes('bánh khọt')) {
    return `Cách Làm ${cleanName} Vàng Giòn Rụm, Chuẩn Vị Nam Bộ`;
  }
  if (lowerName.includes('bánh mì')) {
    return `Cách Làm ${cleanName} Giòn Rụm, Đậm Đà Chuẩn Vị Đường Phố`;
  }
  if (
    cat === 'banhmi_cuon' ||
    lowerName.includes('cuốn') ||
    lowerName.includes('gỏi cuốn') ||
    lowerName.includes('nem cuốn')
  ) {
    return `Cách Làm ${cleanName} Tươi Ngon, Nước Chấm Đậm Đà Chuẩn Vị`;
  }
  if (lowerName.includes('bánh')) {
    return `Cách Làm ${cleanName} Thơm Ngon, Đơn Giản Dễ Làm Tại Nhà`;
  }

  // 9. Nộm, Gỏi, Salad
  if (cat === 'salad_monnhe' || lowerName.includes('gỏi') || lowerName.includes('nộm') || lowerName.includes('salad')) {
    return `Cách Làm ${cleanName} Chua Ngọt Giòn Tan, Giải Ngấy Cực Tốt`;
  }

  // 10. Nướng, Quay, Chiên, Rán, Xào
  if (lowerName.includes('nướng') || lowerName.includes('quay')) {
    return `Cách Làm ${cleanName} Da Giòn Thịt Mềm, Thơm Lừng Khói Than`;
  }
  if (lowerName.includes('chiên') || lowerName.includes('rán')) {
    return `Cách Làm ${cleanName} Vàng Giòn Rụm, Thơm Ngon Bất Bại`;
  }
  if (lowerName.includes('xào')) {
    return `Cách Làm ${cleanName} Giòn Ngon, Xanh Mướt Chuẩn Bếp Trưởng`;
  }

  // 11. Món nhậu, Ăn vặt
  if (cat === 'mon_nhau' || cat === 'an_vat' || lowerName.includes('ốc') || lowerName.includes('chân gà') || lowerName.includes('lòng')) {
    return `Cách Làm ${cleanName} Đậm Đà Cay Nồng, Bén Mồi Chuẩn Quán`;
  }

  // 12. Đồ uống, Chè, Trà
  if (cat === 'do_uong' || lowerName.includes('chè') || lowerName.includes('trà') || lowerName.includes('cà phê') || lowerName.includes('sinh tố')) {
    return `Cách Làm ${cleanName} Thơm Mát Giải Nhiệt, Đơn Giản Tại Nhà`;
  }

  // Default fallback
  return `Cách Nấu ${cleanName} Thơm Ngon Chuẩn Vị Gia Đình`;
}

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
      seoTitle: getRecipeArticleTitle(dish),
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
          title: 'Sơ chế sạch nguyên liệu và ninh nước dùng ngọt thanh',
          time: '45 - 60 phút',
          heat: 'Lửa liu riu sau khi sôi',
          goal: 'Nước dùng trong veo thanh khiết, tủy xương tiết vị ngọt tự nhiên, không lẫn bọt cặn',
          actionPoints: [
            'Chần xương và thịt qua nước sôi có gừng đập dập trong 3 phút để khử sạch cặn bọt bẩn và mùi tanh.',
            'Rửa lại thật sạch dưới vòi nước lạnh rồi cho vào nồi hầm cùng 3 - 4 lít nước lọc.',
            'Thêm hành tím nướng thơm đập dập, đun sôi bùng rồi hạ lửa liu riu, hớt bọt thường xuyên.',
          ],
          description:
            'Chần xương và các loại thịt qua nước sôi có gừng đập dập để khử sạch cặn bọt. Rửa lại nước lạnh rồi cho vào nồi ninh liu riu cùng hành tím nướng.',
          tip: 'Hớt bọt thường xuyên và không đậy kín nắp để nước dùng luôn trong và thanh ngọt.',
        },
        {
          step: 2,
          title: 'Chế biến phần thịt / nhân món mọng nước',
          time: '15 phút',
          heat: 'Lửa vừa',
          goal: 'Thịt hoặc hải sản chín tới mềm ngọt, đượm vị tiêu mắm, giữ nguyên độ tươi',
          actionPoints: [
            `Tẩm ướp thịt/hải sản của ${dish.vietnameseName} với 1 thìa nước mắm ngon, tiêu sọ, hành tím băm.`,
            'Xào săn nhanh tay trên lửa lớn hoặc luộc vừa chín tới trong nồi nước dùng rồi vớt ra ngâm nước nguội.',
            'Thái lát mỏng hoặc xếp gọn ra đĩa để chuẩn bị bày tô.',
          ],
          description:
            `Tẩm ướp thịt hoặc hải sản với chút nước mắm ngon, tiêu và hành tỏi băm. Xào săn hoặc luộc vừa chín tới để giữ trọn vị ngọt mọng nước của ${dish.vietnameseName}.`,
        },
        {
          step: 3,
          title: 'Nêm nếm nồi nước lèo chuẩn tỷ lệ vàng',
          time: '10 phút',
          heat: 'Lửa vừa sôi lăn tăn',
          goal: 'Vị nước lèo đậm đà vừa vặn, thơm nức mũi mùi đầu hành và gia vị truyền thống',
          actionPoints: [
            'Nêm nước mắm cốt nhĩ, đường phèn và muối hạt vào nồi nước dùng theo khẩu vị gia đình.',
            'Thả một ít đầu hành chẻ hoặc hành tây thái mỏng vào nồi để nước lèo dậy hương ngào ngạt.',
            'Giữ nồi nước lèo luôn sôi nhẹ trên bếp sẵn sàng chan tô.',
          ],
          description:
            'Nêm nước mắm cốt nhĩ, đường phèn và muối hạt cho vừa miệng. Cho một ít đầu hành chẻ vào nồi để nước dùng dậy mùi thơm ngào ngạt.',
        },
        {
          step: 4,
          title: 'Trần sợi bún/phở và chan nước dùng thưởng thức',
          time: '5 phút',
          heat: 'Nước sôi sùng sục',
          goal: 'Tô bún phở bốc khói ngùn ngụt, sợi mì bún nóng dẻo, nước ngập thơm nức',
          actionPoints: [
            'Chần sợi bún/phở qua nước sôi trong 15 giây, vẩy thật ráo nước rồi cho vào tô lớn.',
            'Xếp thịt, chả, hải sản và rau thơm cắt nhỏ lên mặt tô.',
            'Múc nước dùng đang sôi sùng sục chan đều ngập mặt bún và thưởng thức ngay khi còn nóng hổi.',
          ],
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
      seoTitle: getRecipeArticleTitle(dish),
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
          title: 'Nấu cơm dẻo tơi xốp / Hấp xôi thơm lừng',
          time: '30 phút',
          heat: 'Nồi cơm điện hoặc xửng hấp lửa vừa',
          goal: 'Từng hạt cơm/xôi bóng bẩy, dẻo thơm nguyên hạt, không bị khô sượng hay nhão nát',
          actionPoints: [
            'Vo sạch gạo, đong nước vừa vặn theo loại gạo (thêm 1 thìa cà phê dầu ăn để hạt cơm bóng bẩy).',
            'Nếu là xôi: ngâm nếp trước 4 - 6 tiếng, để ráo rồi hấp cách thủy 30 phút cho hạt xôi căng mọng dẻo dai.',
          ],
          description:
            'Vo sạch gạo, canh lượng nước vừa vặn để hạt cơm chín tới nở đều, tơi xốp và không bị nhão. Nếu là xôi, ngâm nếp trước 4 - 6 tiếng để hạt dẻo dai mọng căng.',
        },
        {
          step: 2,
          title: 'Tẩm ướp phần đạm ngấm gia vị sâu',
          time: '20 - 30 phút',
          heat: 'Nhiệt độ phòng mát',
          goal: 'Gia vị thấm đều vào từng thớ thịt, dậy mùi thơm mắm tỏi hành sả',
          actionPoints: [
            `Ướp phần thịt hoặc nguyên liệu chính của ${dish.vietnameseName} với sốt gia vị: nước mắm nhĩ, tiêu, dầu hào, hành tỏi băm.`,
            'Đảo đều tay và để nghỉ 20 - 30 phút cho ngấm sâu gia vị trước khi chế biến nhiệt.',
          ],
          description:
            `Ướp thịt hoặc nguyên liệu chính của ${dish.vietnameseName} với sốt gia vị mắm tỏi tiêu trong 30 phút để ngấm sâu vào từng thớ thịt.`,
        },
        {
          step: 3,
          title: 'Chế biến phần nhân vàng óng kẹo sốt',
          time: '15 - 20 phút',
          heat: 'Lửa vừa rồi hạ nhỏ',
          goal: 'Thịt xém vàng hấp dẫn, nước sốt sánh mịn bao quanh bề mặt óng ánh',
          actionPoints: [
            'Nướng hoặc áp chảo, rim đảo thịt trên lửa vừa cho săn đều hai mặt.',
            'Rưới phần nước sốt ướp vào đun liu riu cho nước sốt keo lại bám đều quanh từng miếng thịt óng ả.',
          ],
          description:
            'Nướng hoặc rim đảo thịt trên lửa vừa cho ngấm sốt sánh kẹo, dậy mùi thơm nức mũi và có màu vàng óng ả hấp dẫn.',
        },
        {
          step: 4,
          title: 'Bày đĩa, rưới mỡ hành thơm nức & thưởng thức',
          time: '5 phút',
          heat: 'Thưởng thức khi cơm nóng sốt',
          goal: 'Đĩa cơm đầy đặn màu sắc, hạt cơm bóng bẩy mỡ hành, đồ chua thanh mát kích thích vị giác',
          actionPoints: [
            'Xới cơm/xôi nóng ra đĩa hoặc mẹt tre, bày phần thịt lên trên.',
            'Rưới mỡ hành lá óng ả, rắc hành phi vàng giòn và xếp dưa leo, đồ chua bên cạnh.',
            'Dọn kèm chén nước mắm chua ngọt sánh tỏi ớt hoặc nước tương tỏi cay.',
          ],
          description:
            'Xới cơm ra đĩa hoặc mẹt tre, bày thịt nướng/rim lên trên. Rưới thêm một thìa mỡ hành tóp mỡ béo ngậy và rắc hành phi vàng giòn.',
        },
      ],
      chefSecret:
        'Thêm một thìa cà phê dầu ăn hoặc mỡ gà khi nấu cơm sẽ giúp từng hạt cơm bóng bẩy, thơm dẻo và giữ được độ mềm suốt cả ngày.',
      recommendedSauce: 'Nước mắm chua ngọt sánh tỏi ớt băm bồng bềnh hoặc nước tương tỏi ớt đậm đà.',
    };
  }

  if (isRollOrBanhMi) {
    return {
      dishId: dish.id,
      dishName: dish.name,
      seoTitle: getRecipeArticleTitle(dish),
      prepTime: '20 phút',
      cookTime: '15 - 20 phút',
      difficulty: 'Dễ',
      servings: '2 - 4 người',
      ingredients: [
        {
          category: 'Vỏ bánh & Nhân chính',
          items: [
            'Bánh mì giòn rụm hoặc bánh tráng dẻo mỏng cuốn',
            `Thịt / Tôm / Chả đặc trưng của ${dish.vietnameseName}`,
            'Pate thơm béo, bơ trứng gà hoặc sốt mayonnaise',
          ],
        },
        {
          category: 'Rau tươi & Đồ chua kèm theo',
          items: [
            'Rau răm, ngò rí, húng quế, xà lách, dưa leo giòn mát',
            'Đồ chua củ cải cà rốt ngâm giấm đường chua ngọt',
            'Ớt sừng cắt lát cay tê kích thích vị giác',
          ],
        },
      ],
      steps: [
        {
          step: 1,
          title: 'Sơ chế rau sống và đồ chua giòn rụm',
          time: '10 phút',
          heat: 'Nhiệt độ phòng mát',
          goal: 'Rau sống tươi xanh mướt, ráo sạch nước hoàn toàn, đồ chua giòn tan chua ngọt vừa vặn',
          actionPoints: [
            'Rửa sạch các loại rau sống, ngâm nước muối loãng 5 phút rồi vẩy thật ráo nước.',
            'Dưa chuột chẻ thanh dài hoặc thái lát mỏng.',
            'Làm đồ chua: Cà rốt và củ cải bào sợi bóp muối, xả sạch rồi ngâm giấm đường tỷ lệ 1:1 trong 15 phút.',
          ],
          description:
            'Rửa sạch các loại rau sống và vẩy ráo. Làm đồ chua củ cải cà rốt giòn ngọt để cân bằng vị béo của món ăn.',
        },
        {
          step: 2,
          title: 'Chế biến nhân thịt đượm vị thơm lừng',
          time: '15 phút',
          heat: 'Lửa vừa hoặc nướng than hoa',
          goal: 'Nhân thịt chín tới mềm ngọt, dậy mùi tiêu tỏi, màu sắc hấp dẫn',
          actionPoints: [
            `Tẩm ướp thịt/tôm đặc trưng của ${dish.vietnameseName} với mắm ngon, tiêu và tỏi băm.`,
            'Xào săn hoặc nướng xém cạnh cho thịt thơm nức mùi khói.',
          ],
          description:
            'Chế biến phần nhân đạm cho chín tới, dậy mùi thơm đặc trưng và ngấm đều gia vị đậm đà.',
        },
        {
          step: 3,
          title: 'Pha nước chấm đặc sánh hoặc làm sốt bánh mì',
          time: '5 phút',
          heat: 'Nhiệt độ phòng',
          goal: 'Nước chấm tương bơ đậu phộng béo bùi sánh quyện hoặc sốt nước mắm chua ngọt bồng bềnh',
          actionPoints: [
            'Pha nước chấm phù hợp: Sốt tương bơ đậu phộng sánh béo hoặc nước mắm chua ngọt tỏi ớt nổi bề mặt.',
            'Nếm lại gia vị cân bằng vị mặn ngọt thanh nhẹ.',
          ],
          description:
            'Pha chế phần nước sốt chấm hoặc nước chan đậm đà, quyết định 50% độ ngon của món ăn.',
        },
        {
          step: 4,
          title: 'Cuốn bánh đẹp mắt hoặc kẹp bánh mì giòn tan',
          time: '5 phút',
          heat: 'Thưởng thức tươi giòn',
          goal: 'Cuốn chắc tay không rách vỏ, hoặc ổ bánh mì giòn rụm đầy ắp nhân hấp dẫn',
          actionPoints: [
            'Trải bánh tráng hoặc xẻ dọc ổ bánh mì giòn nướng nóng.',
            'Phết sốt, xếp đều rau thơm, đồ chua và nhân thịt vào giữa.',
            'Cuốn chặt tay hoặc kẹp kín bánh mì, thưởng thức ngay với chén nước sốt đậm đà.',
          ],
          description:
            'Gói ghém các nguyên liệu hài hòa, thưởng thức từng miếng cắn giòn rụm tươi mát hòa quyện.',
        },
      ],
      chefSecret:
        'Thấm khô hoàn toàn nước ở rau sống trước khi cuốn hoặc kẹp bánh mì để bánh luôn giữ được độ giòn rụm và bánh tráng không bị nhũn rách.',
      recommendedSauce: 'Nước chấm tương đậu phộng béo ngậy hoặc nước mắm chua ngọt tỏi ớt.',
    };
  }

  // Fallback for grilled, snack or general dish
  return {
    dishId: dish.id,
    dishName: dish.name,
    seoTitle: getRecipeArticleTitle(dish),
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
        time: '10 phút',
        heat: 'Nhiệt độ phòng mát',
        goal: 'Nguyên liệu sạch sẽ, ráo nước hoàn toàn để khi chế biến không bị bắn dầu hay ra nước',
        actionPoints: [
          `Rửa sạch thịt/hải sản và rau củ của món ${dish.vietnameseName} dưới vòi nước chảy.`,
          'Dùng khăn giấy thấm thật ráo nước bề mặt thịt cá.',
          'Thái miếng vừa ăn đều nhau để chín đồng đều khi nấu.',
        ],
        description:
          `Rửa sạch thịt/hải sản và rau củ. Thấm ráo nước hoàn toàn để khi chế biến ${dish.vietnameseName} không bị bắn dầu và giữ trọn dưỡng chất.`,
      },
      {
        step: 2,
        title: 'Tẩm ướp gia vị cân bằng chuẩn tỷ lệ',
        time: '20 phút',
        heat: 'Nhiệt độ phòng mát',
        goal: 'Gia vị ngấm sâu vào từng thớ thịt, dậy mùi thơm mắm tiêu hành tỏi',
        actionPoints: [
          'Trộn đều nguyên liệu với 1 thìa nước mắm ngon, 1/2 thìa tiêu sọ, chút dầu hào và tỏi băm.',
          'Để nghỉ trong 20 phút cho gia vị hòa quyện sâu vào nguyên liệu.',
        ],
        description:
          'Trộn đều nguyên liệu với nước mắm, tiêu sọ, chút dầu hào và tỏi băm. Để nghỉ trong 20 phút cho thấm sâu.',
      },
      {
        step: 3,
        title: 'Chế biến đúng độ lửa chuẩn đầu bếp',
        time: '15 phút',
        heat: 'Lửa vừa đến lớn tùy công đoạn',
        goal: 'Bên ngoài chín vàng thơm nức, bên trong giữ trọn vị ngọt mọng nước tự nhiên',
        actionPoints: [
          'Căn chỉnh nhiệt độ chảo/bếp nướng chuẩn xác.',
          'Đảo đều hoặc lật mặt đúng thời điểm để mặt ngoài xém thơm vàng óng mà không bị khô cứng.',
        ],
        description:
          'Căn chỉnh nhiệt độ lửa chuẩn xác để bề ngoài vàng giòn hoặc thơm ngậy mà bên trong vẫn mọng nước, giữ nguyên độ ngọt tự nhiên.',
        tip: 'Không nấu quá lâu để tránh làm khô thịt hoặc mất đi độ giòn tươi của rau củ.',
      },
      {
        step: 4,
        title: 'Bày biện đẹp mắt & Thưởng thức nóng',
        time: '5 phút',
        heat: 'Thưởng thức khi còn nóng hổi',
        goal: 'Đĩa món ăn bắt mắt, trang trí hài hòa, chấm kèm sốt chuẩn vị thơm ngon khó cưỡng',
        actionPoints: [
          'Gắp món ăn ra đĩa lớn có lót rau xanh tươi mát.',
          'Trang trí ớt tỉa hoa hoặc rắc chút tiêu xay, hành lá lên bề mặt.',
          'Dọn kèm chén nước chấm chua ngọt hoặc muối tiêu chanh cay nồng.',
        ],
        description:
          'Gắp ra đĩa có lót rau xanh tươi mát, trang trí ớt tỉa hoa và dọn kèm chén nước chấm chua ngọt chuẩn bài.',
      },
    ],
    chefSecret:
      'Độ tươi ngon của nguyên liệu quyết định 80% thành công của món ăn. Hãy chọn nguyên liệu có nguồn gốc sạch sẽ và chế biến khi còn tươi mới.',
    recommendedSauce: 'Nước chấm pha tỏi ớt chua ngọt hoặc sốt chấm tương bơ đậu phộng béo bùi.',
  };
}

/**
 * Danh sách các món ăn hiển thị bài viết công thức trong trang "/cach-nau-mon-ngon".
 * Chỉ hiển thị 2 bài công thức chuẩn vị: Cơm Tấm Sườn Bì Chả & Cơm Gà Xối Mỡ.
 * Tất cả các món ăn khác trên các trang khác (Vòng quay, Thực đơn tuần, Món ngon, Ẩm thực vùng miền...) vẫn giữ nguyên đầy đủ.
 */
export const ACTIVE_RECIPE_DISH_IDS: string[] = [
  'com-tam-suon-bi-cha',
  'com-ga-xoi-mo',
];

export function getActiveRecipeDishes(allDishes: Dish[]): Dish[] {
  const activeSet = new Set(ACTIVE_RECIPE_DISH_IDS);
  return allDishes
    .filter((d) => activeSet.has(d.id))
    .sort((a, b) => {
      const idxA = ACTIVE_RECIPE_DISH_IDS.indexOf(a.id);
      const idxB = ACTIVE_RECIPE_DISH_IDS.indexOf(b.id);
      return idxA - idxB;
    });
}

export const FEATURED_RECIPE_IDS = [
  'com-tam-suon-bi-cha',
  'com-ga-xoi-mo',
];

/**
 * Generate standard SEO slug for a dish recipe
 * Example: 'pho-bo-tai-lan' -> 'cach-nau-pho-bo-tai-lan'
 */
export function getRecipeSlug(dish: Dish): string {
  if (dish.id.startsWith('cach-nau-') || dish.id.startsWith('cach-lam-')) {
    return dish.id;
  }
  return `cach-nau-${dish.id}`;
}

/**
 * Generate absolute SEO path for a dish recipe
 * Clean URL format: /cach-nau-pho-bo-tai-lan
 */
export function getRecipePath(dish: Dish): string {
  return `/${getRecipeSlug(dish)}`;
}

/**
 * Find a dish from dishes list by recipe slug or hash
 */
export function findDishByRecipeSlug(slugOrHash: string, dishes: Dish[]): Dish | undefined {
  if (!slugOrHash) return undefined;
  const clean = slugOrHash
    .replace(/^#recipe-/, '')
    .replace(/^#/, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .replace(/^cach-nau-mon-ngon\//, '');

  return dishes.find((d) => {
    const slug = getRecipeSlug(d);
    return (
      d.id === clean ||
      slug === clean ||
      clean === `cach-nau-${d.id}` ||
      clean === `cach-lam-${d.id}` ||
      clean.replace(/^(cach-nau-|cach-lam-)/, '') === d.id.replace(/^(cach-nau-|cach-lam-)/, '')
    );
  });
}

/**
 * Format SEO title for recipe article
 */
export function formatRecipeSeoTitle(dishNameOrRecipeTitle: string): string {
  const trimmed = dishNameOrRecipeTitle.trim();
  if (trimmed.toLowerCase().startsWith('cách nấu') || trimmed.toLowerCase().startsWith('cách làm')) {
    return `${trimmed} | Hôm Nay Ăn Gì`;
  }
  return `Cách Nấu ${trimmed} Thơm Ngon Chuẩn Vị Gia Đình | Hôm Nay Ăn Gì`;
}

