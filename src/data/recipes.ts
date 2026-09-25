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

  'pho-bo-tai-nam-gau': {
    dishId: 'pho-bo-tai-nam-gau',
    dishName: 'Phở Bò Tái Nạm Gầu Truyền Thống',
    seoTitle: 'Cách Nấu Phở Bò Tái Nạm Gàu Nước Dùng Thanh Ngọt Chuẩn Vị Gia Đình',
    prepTime: '40 phút',
    cookTime: '3 - 4 giờ (ninh xương & luộc thịt bò)',
    difficulty: 'Cầu kỳ',
    servings: '4 - 6 người',
    ingredients: [
      {
        category: 'Xương & Các loại thịt bò tươi ngon',
        items: [
          '1.5kg xương ống bò (hoặc xương bay/xương đuôi) ninh nước dùng thanh trong',
          '400g gầu bò giòn (chọn miếng gầu hoa có lớp mỡ trắng giòn xen kẽ)',
          '400g nạm bò (phần thịt nạm dải xen gân mềm dẻo ngọt đậm)',
          '300g thịt thăn/phi lê bò tươi thái thật mỏng để chần tái',
          '1kg bánh phở tươi sợi mỏng mềm mướt',
        ],
      },
      {
        category: 'Hương liệu thảo mộc & Gia vị nước dùng phở Bắc',
        items: [
          '2 củ gừng già, 3 củ hành tây, 5 củ hành khô tím (nướng xém vỏ thơm phức)',
          'Bộ thảo mộc phở Bắc: 3 hoa hồi, 1 quả thảo quả, 1 thanh quế, 1 thìa tiểu hồi, 1 thìa hạt mùi rang thơm',
          'Gia vị: Nước mắm cốt nhĩ cá cơm truyền thống hảo hạng, muối hạt, đường phèn, tiêu sọ xay',
        ],
      },
      {
        category: 'Rau thơm & Đồ ăn kèm chuẩn vị',
        items: [
          'Hành hoa (lá thái nhỏ, cọng đầu hành trắng chẻ sợi ngâm nước đá)',
          'Rau mùi ta (ngò rí), mùi tàu (ngò gai), húng Láng',
          'Giấm ngâm tỏi ớt truyền thống, tương ớt phở Bắc, chanh tươi, quẩy giòn tan',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế và khử sạch mùi gây của xương ống bò',
        time: '20 phút',
        heat: 'Lửa lớn',
        goal: 'Khử sạch toàn bộ tiết đọng, bọt bẩn và mùi gây đặc trưng của bò',
        actionPoints: [
          'Xương ống bò ngâm nước muối loãng 30 phút, chặt đôi để lộ tủy.',
          'Cho xương vào nồi ngập nước lạnh cùng 1 củ gừng đập dập và 1 thìa muối hạt, đun sôi bùng trong 5 - 7 phút để bọt bẩn nổi lên hết.',
          'Vớt xương ra xối rửa thật sạch từng ngóc ngách dưới vòi nước lạnh, cạo sạch mảng đen bám quanh xương.',
        ],
        description:
          'Xương bò chần nước sôi gừng muối để tẩy sạch bọt cặn và mùi gây. Rửa lại thật sạch dưới vòi nước lạnh.',
        tip: 'Khâu chần và rửa xương quyết định đến 90% độ trong và thơm của nồi nước dùng phở bò.',
      },
      {
        step: 2,
        title: 'Ninh nước dùng thảo mộc thơm lừng & Luộc nạm gầu giòn ngọt',
        time: '3 - 3.5 giờ',
        heat: 'Lửa liu riu sau khi sôi',
        goal: 'Nước dùng trong veo óng ánh, ngọt sâu từ tủy xương, nạm và gầu chín mềm thơm phức',
        actionPoints: [
          'Cho xương ống đã làm sạch vào nồi lớn cùng 5 lít nước sạch. Thả hành tây, hành tím và gừng đã nướng xém cạo vỏ đập dập vào cùng.',
          'Cho miếng nạm bò và gầu bò đã rửa sạch vào luộc chung trong nồi nước dùng để nước thêm ngọt béo tự nhiên.',
          'Sau khi sôi, hạ lửa nhỏ nhất ninh liu riu, hé nắp vung và vớt bọt liên tục.',
          'Sau khoảng 1.5 - 2 giờ, dùng đũa xiên thử thấy nạm và gầu bò chín tới, mềm nhưng vẫn giữ độ giòn sần sật thì vớt ra ngay.',
          'Rang thơm hoa hồi, thảo quả đập dập, quế, tiểu hồi, hạt mùi rồi cho vào túi lọc gia vị, thả vào nồi nước dùng đun liu riu thêm 1 giờ.',
        ],
        description:
          'Hầm xương ống cùng hành gừng nướng và miếng nạm, gầu bò trên lửa nhỏ liu riu. Vớt nạm gầu khi chín tới. Cho túi thảo mộc nướng vào nồi nước dùng hầm tiếp cho dậy mùi thơm phở truyền thống.',
      },
      {
        step: 3,
        title: 'Ngâm lạnh và thái mỏng nạm gầu, chuẩn bị thịt bò tái',
        time: '15 phút',
        heat: 'Nhiệt độ phòng & nước đá',
        goal: 'Gầu bò giòn sần sật không bị ngấy, nạm bò mềm mọng, thớ thịt thái mỏng bản to',
        actionPoints: [
          'Ngay khi vớt nạm bò và gầu bò ra, thả ngay vào thau nước đá lạnh ngập miếng thịt trong 15 phút để thịt săn chắc, bì gầu giòn và không bị thâm xỉn màu.',
          'Vớt thịt ra để ráo, dùng dao sắc thái lát thật mỏng, bản to đẹp mắt.',
          'Thịt thăn bò tươi lau khô, thái lát thật mỏng ngang thớ, dùng sống dao dần nhẹ cho thịt mềm tơi.',
        ],
        description:
          'Nạm và gầu bò vớt ra ngâm nước đá lạnh cho giòn săn rồi thái lát mỏng. Thịt thăn bò thái mỏng ngang thớ để chần tái.',
        tip: 'Muốn gầu bò thái thật mỏng và giòn, sau khi ngâm đá có thể bọc màng thực phẩm cất vào ngăn mát tủ lạnh 30 phút rồi mới thái.',
      },
      {
        step: 4,
        title: 'Nêm nếm và hoàn thiện nồi nước dùng phở trong veo',
        time: '15 phút',
        heat: 'Lửa nhỏ giữ sôi lăn tăn',
        goal: 'Vị nước dùng thanh ngọt đậm đà, thơm dịu hương hồi quế, không bị mặn gắt',
        actionPoints: [
          'Vớt túi thảo mộc ra (không ngâm thảo mộc quá lâu làm đen nước và nồng gắt).',
          'Nêm vào nồi nước dùng: 3 - 4 thìa canh nước mắm cốt nhĩ hảo hạng, 1 viên đường phèn nhỏ (tạo vị ngọt thanh hậu), muối hạt vừa miệng.',
          'Giữ nồi nước dùng luôn sôi lăn tăn bốc khói nghi ngút trên bếp.',
        ],
        description:
          'Vớt túi thảo mộc ra, nêm nước mắm cốt ngon, đường phèn và muối hạt cho vừa miệng. Nước dùng phải sôi lăn tăn trước khi chan.',
      },
      {
        step: 5,
        title: 'Chần bánh phở, xếp thịt bò và chan nước dùng thưởng thức',
        time: '5 phút',
        heat: 'Nồi nước sôi sùng sục',
        goal: 'Tô phở nóng bỏng tay, bánh phở mềm mướt, thịt bò tái hồng hào mọng nước quyện gầu nạm giòn béo',
        actionPoints: [
          'Chần bánh phở tươi qua nồi nước sôi trong 15 giây, xóc thật ráo nước rồi chia vào từng tô sứ dày giữ nhiệt.',
          'Xếp thịt gầu giòn và nạm mềm sang một góc tô.',
          'Lấy muôi đặt phần thịt bò tái thái mỏng, nhúng nhanh vào nồi nước dùng sôi sùng sục cho thịt se lại chuyển màu hồng phớt rồi trút lên giữa tô phở.',
          'Rắc hành hoa, rau mùi thái nhỏ và đầu hành chẻ sợi lên trên.',
          'Múc nước dùng phở đang sôi sùng sục chan đều ngập bánh phở và tráng đều qua miếng thịt bò tái.',
          'Thưởng thức ngay khi còn bốc khói cùng giấm tỏi ớt, sa tế, chanh tươi và đĩa quẩy giòn tan.',
        ],
        description:
          'Chần bánh phở cho vào tô, xếp nạm gầu và thịt bò chần tái lên trên. Rắc hành mùi, đầu hành chẻ rồi chan nước dùng sôi sùng sục. Ăn kèm giấm tỏi ớt và quẩy giòn.',
      },
    ],
    chefSecret:
      'Phở bò tái nạm gầu chuẩn vị Hà Nội cần sự tinh tế trong việc luộc thịt: Luộc gầu và nạm ngay trong nồi ninh xương để nước dùng có độ béo ngậy tự nhiên, sau đó sốc nhiệt ngay vào nước đá lạnh để giữ độ giòn sần sật của gầu hoa. Nước dùng chỉ nêm nước mắm cốt nhĩ và đường phèn thanh nhẹ, không lạm dụng quế hồi làm át đi vị ngọt nguyên bản của xương tủy bò.',
    recommendedSauce:
      'Ăn kèm giấm tỏi ngâm chua cay, tương ớt phở Hà Nội (tương ớt xay nhuyễn cay thanh), chanh cốm và đĩa quẩy vàng giòn rụm.',
  },

  'pho-ga-ta-la-chanh': {
    dishId: 'pho-ga-ta-la-chanh',
    dishName: 'Phở Gà Ta Lá Chanh Truyền Thống',
    seoTitle: 'Cách Nấu Phở Gà Ta Nước Dùng Thanh Ngọt Chuẩn Vị Gia Đình',
    prepTime: '30 phút',
    cookTime: '1.5 - 2 giờ',
    difficulty: 'Trung bình',
    servings: '4 - 6 người',
    ingredients: [
      {
        category: 'Gà ta & Xương ninh nước dùng',
        items: [
          '1 con gà ta thả vườn (khoảng 1.6 - 1.8kg, gà mái dầu da vàng, thịt chắc ngọt)',
          '500g xương gà (hoặc xương ống heo) ninh thêm cho nước dùng ngọt sâu thanh tao',
          '1kg bánh phở tươi sợi mỏng mềm mướt',
        ],
      },
      {
        category: 'Hương liệu nước dùng phở gà thanh khiết',
        items: [
          '1 củ gừng già, 4 củ hành tím khô (nướng thơm đập dập)',
          '1 củ hành tây nướng ngọt, 1 nắm rễ mùi ta (ngò rí) và rễ hành hoa rửa thật sạch',
          '1 thìa cà phê hạt mùi rang thơm (cho vào túi lọc gia vị)',
          'Gia vị: Nước mắm cốt nhĩ ngon hảo hạng, muối hạt, đường phèn, tiêu sọ xay mịn',
          '1 nhánh nghệ tươi nhỏ giã lấy nước cốt (quét tạo màu da gà vàng ươm óng ả)',
        ],
      },
      {
        category: 'Rau thơm & Đồ ăn kèm chuẩn vị',
        items: [
          '10 - 12 lá chanh bánh tẻ (rửa sạch, lau khô, cuộn tròn thái sợi chỉ siêu mỏng)',
          'Hành hoa (lá thái nhỏ, gốc hành trắng chẻ sợi ngâm nước đá xoăn tít)',
          'Rau mùi ta (ngò rí), rau húng láng',
          'Giấm ngâm tỏi ớt, chanh tươi, ớt hiểm tươi thái lát, quẩy giòn rụm',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế gà ta và quét mỡ nghệ vàng óng',
        time: '15 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Gà sạch hoàn toàn mùi hôi, da vàng ươm bắt mắt',
        actionPoints: [
          'Gà ta mổ sạch, xát muối hạt và gừng đập dập khắp trong ngoài rồi rửa lại thật sạch, để ráo.',
          'Phần mỡ gà áp chảo lấy nước mỡ, hòa cùng chút nước cốt nghệ tươi giã nhuyễn.',
          'Dùng cọ quét một lớp mỡ nghệ mỏng đều lên khắp bề mặt da gà để khi luộc da gà lên màu vàng óng ả đẹp mắt.',
        ],
        description:
          'Gà xát muối gừng rửa sạch, quét một lớp mỡ nghệ mỏng lên da để tạo màu vàng ươm đặc trưng.',
      },
      {
        step: 2,
        title: 'Luộc gà chín tới, giữ da giòn thịt ngọt mọng nước',
        time: '30 - 35 phút',
        heat: 'Lửa vừa rồi hạ nhỏ nhất',
        goal: 'Gà chín tới mềm ngọt, không bị nứt da hay thâm đỏ xương',
        actionPoints: [
          'Đặt gà vào nồi lớn, đổ ngập nước lạnh cùng gừng nướng, hành tím nướng và 1 thìa muối hạt.',
          'Đun sôi bùng, hớt sạch bọt rồi hạ lửa nhỏ nhất đun liu riu trong 20 phút.',
          'Tắt bếp, đậy kín vung ủ gà trong nồi nước nóng thêm 15 phút cho gà chín thấu tận xương mà thịt vẫn ngọt mềm mọng nước.',
          'Vớt gà ra, thả ngay vào thau nước đá lạnh ngâm 10 phút để da gà săn lại, giòn sần sật.',
        ],
        description:
          'Luộc gà với hành gừng nướng và chút muối. Khi sôi hạ lửa nhỏ ninh 20 phút rồi ủ kín vung 15 phút. Vớt gà ngâm nước đá lạnh cho da giòn.',
        tip: 'Ủ gà trong nước nóng giúp thịt chín mềm ngọt mọng mà không làm rách lớp da vàng óng.',
      },
      {
        step: 3,
        title: 'Lọc và thái thịt gà, rắc lá chanh thái chỉ',
        time: '15 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Miếng thịt gà đều đặn, da dính liền thịt, lá chanh thái sợi chỉ như tơ',
        actionPoints: [
          'Vớt gà ra để ráo, dùng dao sắc lọc phần thịt ức và đùi.',
          'Thịt đùi thái miếng vừa ăn; thịt ức có thể thái lát xéo mỏng hoặc xé phay tơi xốp.',
          'Lá chanh xếp chồng, cuộn tròn chặt tay rồi dùng dao sắc thái sợi chỉ thật mỏng.',
          'Phần xương gà đã lọc thịt cho lại vào nồi nước dùng tiếp tục ninh lấy vị ngọt.',
        ],
        description:
          'Lọc thịt đùi và ức gà thái miếng vừa ăn. Cho xương gà lại vào nồi nước dùng ninh tiếp. Thái lá chanh thành sợi chỉ thật mảnh.',
      },
      {
        step: 4,
        title: 'Ninh nước dùng phở gà thanh ngọt trong veo cùng rễ mùi',
        time: '45 - 60 phút',
        heat: 'Lửa liu riu',
        goal: 'Nước dùng trong vắt, ngọt thanh tự nhiên, thơm dịu hương rễ mùi và hạt mùi',
        actionPoints: [
          'Cho thêm rễ mùi ta, rễ hành hoa rửa sạch và túi hạt mùi rang thơm vào nồi nước luộc gà.',
          'Thêm xương gà/xương lợn ninh liu riu hé nắp vung, vớt sạch bọt cặn.',
          'Nêm vào nồi: Nước mắm cốt nhĩ loại ngon, muối hạt và chút đường phèn cho tròn vị thanh ngọt.',
          'Mặt nước dùng điểm xuyết những giọt váng mỡ gà vàng óng ánh thơm ngậy.',
        ],
        description:
          'Ninh nước dùng gà cùng rễ mùi, rễ hành và hạt mùi rang. Nêm nước mắm cốt và đường phèn cho nước dùng thanh ngọt trong veo.',
        tip: 'Rễ mùi ta và hạt mùi rang chính là bí quyết gia truyền tạo nên hương vị phở gà Hà Nội đặc trưng khó lẫn.',
      },
      {
        step: 5,
        title: 'Chần bánh phở, xếp thịt gà và chan nước dùng bốc khói',
        time: '5 phút',
        heat: 'Nồi nước sôi sùng sục',
        goal: 'Bát phở gà bốc khói thơm nức, màu da gà vàng ươm hòa cùng màu xanh lá chanh và hành hoa',
        actionPoints: [
          'Chần bánh phở tươi qua nước sôi trong 15 giây, vẩy thật ráo rồi cho vào tô sứ.',
          'Xếp thịt gà đùi và thịt ức lên mặt bánh phở.',
          'Rắc hành hoa, rau mùi, đầu hành chẻ sợi và đặc biệt là một nhúm lá chanh thái chỉ lên trên miếng thịt gà.',
          'Múc nước dùng phở đang sôi sùng sục chan đều ngập bánh phở.',
          'Ăn kèm đĩa muối tiêu chanh ớt chấm thịt gà, giấm tỏi và quẩy giòn tan.',
        ],
        description:
          'Chần bánh phở cho vào bát, xếp thịt gà lên trên cùng hành mùi và lá chanh thái chỉ. Chan nước dùng sôi nóng hổi và thưởng thức.',
      },
    ],
    chefSecret:
      'Lá chanh là linh hồn của phở gà Hà Nội, phải thái mỏng như sợi tơ và chỉ rắc ngay trước khi chan nước dùng để tinh dầu lá chanh hòa quyện cùng làn khói nóng bốc lên ngào ngạt. Nước dùng phở gà phải ngọt thanh tao từ xương và rễ mùi, không dùng quế hồi hay gia vị nồng của phở bò.',
    recommendedSauce:
      'Đĩa muối tiêu sọ vắt chanh ớt chấm thịt gà; tô phở ăn kèm giấm tỏi ớt ngâm chua và đĩa quẩy vàng giòn rụm.',
  },

  'bun-cha-ha-noi': {
    dishId: 'bun-cha-ha-noi',
    dishName: 'Bún Chả Hà Nội Nướng Than Hoa',
    seoTitle: 'Cách Làm Bún Chả Hà Nội Thịt Nướng Than Hoa, Nước Chấm Đậm Đà Chuẩn Vị',
    prepTime: '45 phút (ướp thịt 1 - 2 giờ)',
    cookTime: '30 phút',
    difficulty: 'Trung bình',
    servings: '4 người',
    ingredients: [
      {
        category: 'Thịt làm chả nướng than hoa',
        items: [
          '500g thịt ba chỉ (ba rọi) có nạc mỡ đều nhau thái lát mỏng làm chả miếng',
          '500g thịt nạc vai heo băm nhỏ (trộn thêm 50g mỡ phần băm nhuyễn để chả viên mềm mọng)',
          '1kg bún tươi sợi nhỏ mượt mà',
        ],
      },
      {
        category: 'Gia vị ướp thịt chuẩn bí quyết phố cổ',
        items: [
          '3 thìa canh nước hàng (nước màu đường vàng thắng chuẩn màu cánh gián đậm)',
          '3 thìa canh nước mắm cốt nhĩ ngon, 2 thìa canh dầu hào, 1 thìa canh mật ong',
          '3 củ hành khô tím và 1 củ tỏi (băm nhuyễn vắt lấy nước cốt để ướp, tránh bị cháy khi nướng)',
          '1 thìa cà phê tiêu sọ xay mịn, 1 thìa canh dầu ăn',
        ],
      },
      {
        category: 'Dưa góp & Nước chấm bún chả ấm nóng',
        items: [
          '1/2 quả đu đủ xanh (gọt vỏ, ngâm xả hết nhựa, thái lát mỏng vuông hoặc lượn sóng)',
          '1 củ cà rốt nhỏ tỉa hoa thái lát mỏng',
          'Gia vị pha nước chấm: Nước mắm cốt ngon, đường cát trắng, giấm gạo thanh dịu, nước lọc ấm (tỉ lệ 1 : 1 : 1 : 4.5)',
          'Tỏi, ớt hiểm băm nhuyễn, tiêu sọ xay',
        ],
      },
      {
        category: 'Rau sống tươi non ăn kèm',
        items: [
          'Xà lách, rau tía tô, kinh giới, rau mùi ta (ngò rí), rau húng láng, giá đỗ tươi',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế thịt và pha nước sốt ướp chả',
        time: '20 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Nước sốt ướp màu nâu cánh gián óng ả, thơm lừng vị mắm và mật ong',
        actionPoints: [
          'Thịt ba chỉ rửa sạch, thái lát mỏng vừa ăn (khoảng 0.3 - 0.4cm).',
          'Thịt nạc vai băm nhỏ trộn cùng mỡ phần băm nhuyễn để khi nướng chả không bị khô xác.',
          'Hành tỏi băm nhuyễn, cho vào khăn mỏng vắt kiệt lấy nước cốt (bí quyết nướng không bị cháy khét).',
          'Trộn đều hỗn hợp sốt ướp: Nước cốt hành tỏi, nước hàng thắng cánh gián, nước mắm ngon, dầu hào, mật ong, tiêu xay và dầu ăn.',
        ],
        description:
          'Thịt ba chỉ thái lát mỏng, thịt nạc vai băm nhỏ. Pha hỗn hợp sốt ướp gồm nước cốt hành tỏi, nước hàng, nước mắm, mật ong, dầu hào và tiêu.',
        tip: 'Dùng nước cốt hành tỏi thay vì bã xác giúp thịt khi nướng trên than hoa không bị lấm tấm cháy khét và đắng.',
      },
      {
        step: 2,
        title: 'Ướp chả miếng và vo viên chả băm',
        time: '1 - 2 giờ',
        heat: 'Nhiệt độ phòng hoặc ngăn mát tủ lạnh',
        goal: 'Thịt ngấm sâu từng thớ cơ, màu sắc óng ả',
        actionPoints: [
          'Chia đều hỗn hợp sốt ướp vào 2 âu: 1 âu ướp chả miếng ba chỉ, 1 âu ướp thịt băm.',
          'Trộn bóp đều tay rồi để thịt ngấm gia vị ít nhất 1 giờ.',
          'Thịt băm vo thành từng viên tròn dẹt vừa ăn, thoa chút dầu ăn lên tay cho đỡ dính.',
        ],
        description:
          'Ướp chả miếng và thịt băm trong 1 - 2 giờ. Sau đó nặn thịt băm thành từng viên tròn dẹt đều nhau.',
      },
      {
        step: 3,
        title: 'Làm dưa góp đu đủ cà rốt chua ngọt giòn tan',
        time: '20 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Đu đủ và cà rốt giòn sần sật, chua ngọt thanh mát giải ngấy',
        actionPoints: [
          'Đu đủ và cà rốt thái lát mỏng, bóp với 1 thìa muối hạt trong 5 phút rồi rửa sạch, vắt kiệt nước để khử nhựa và giữ độ giòn.',
          'Ướp đu đủ, cà rốt với 2 thìa đường, 2 thìa giấm gạo và chút tỏi ớt băm trong 15 phút cho ngấm vị chua ngọt dịu.',
        ],
        description:
          'Đu đủ và cà rốt thái mỏng bóp muối rửa sạch, vắt ráo rồi ướp giấm đường tỏi ớt cho giòn ngon chua ngọt.',
      },
      {
        step: 4,
        title: 'Nướng chả trên than hoa đỏ rực cháy xém cạnh',
        time: '15 - 20 phút',
        heat: 'Than hoa đỏ rực quạt đều tay',
        goal: 'Chả chín vàng óng ả, xém nhẹ các cạnh, thơm lừng mùi khói than đặc trưng',
        actionPoints: [
          'Kẹp chả miếng dàn đều lên vỉ nướng; xếp chả viên lên vỉ riêng.',
          'Quét một lớp dầu ăn mỏng lên bề mặt chả để thịt không dính vỉ nướng.',
          'Đặt vỉ lên bếp than hoa đã bén hồng, lật vỉ liên tục và quạt đều tay để mỡ chảy xèo xèo bốc khói thơm nức.',
          'Khi hai mặt chả vàng ươm, xém cạnh óng ánh màu caramel thì nhấc ra khỏi bếp.',
        ],
        description:
          'Kẹp chả vào vỉ nướng trên than hoa đỏ hồng. Lật đều tay cho chả chín vàng ươm, xém cạnh và dậy mùi khói than nồng nàn.',
        tip: 'Nướng than hoa là linh hồn không thể thay thế của bún chả Hà Nội, tạo nên hương vị khói thơm quyến rũ mà chảo chiên hay nồi chiên không dầu không thể đạt được.',
      },
      {
        step: 5,
        title: 'Pha nước chấm ấm nóng chua ngọt và thưởng thức',
        time: '10 phút',
        heat: 'Lửa nhỏ giữ ấm lăn tăn',
        goal: 'Bát nước chấm ấm nóng thanh dịu, ngập chả nướng và dưa góp thơm nức',
        actionPoints: [
          'Hòa tan nước mắm, đường, giấm thanh và nước lọc ấm theo tỉ lệ vàng 1 : 1 : 1 : 4.5. Đun trên bếp cho ấm lăn tăn.',
          'Múc nước chấm ra từng bát con, thả dưa góp đu đủ cà rốt vào.',
          'Gắp chả miếng và chả viên nướng nóng hổi thả ngập trong bát nước chấm, rắc chút hạt tiêu sọ xay và tỏi ớt băm.',
          'Thưởng thức cùng đĩa bún tươi sợi nhỏ và rổ rau sống tươi non.',
        ],
        description:
          'Pha nước chấm chua ngọt ấm nóng, thả chả nướng và dưa góp vào ngập bát. Rắc tiêu xay, tỏi ớt ăn kèm bún tươi và rau sống.',
      },
    ],
    chefSecret:
      'Chả nướng ngon phải có đủ chả miếng (ba chỉ giòn ngậy) và chả viên (nạc vai mềm mọng). Nước chấm bún chả Hà Nội luôn phải được phục vụ ấm nóng, vị chua thanh ngọt dịu vừa vặn để có thể húp trực tiếp. Khi thả miếng chả nướng than hoa còn nóng hổi vào bát nước chấm, mỡ thơm xì xèo hòa quyện cùng dưa góp tạo nên phong vị khó quên.',
    recommendedSauce:
      'Bát nước chấm ấm nóng chua ngọt thanh dịu thả ngập chả nướng, dưa góp đu đủ và rắc tiêu sọ xay cay nồng.',
  },

  'bun-dau-mam-tom': {
    dishId: 'bun-dau-mam-tom',
    dishName: 'Bún Đậu Mắm Tôm Mẹt Hà Nội',
    seoTitle: 'Cách Làm Bún Đậu Mắm Tôm Thơm Ngon, Đầy Đủ Topping Chuẩn Vị Hà Thành',
    prepTime: '30 phút',
    cookTime: '30 phút',
    difficulty: 'Dễ',
    servings: '3 - 4 người',
    ingredients: [
      {
        category: 'Bún & Topping đầy đặn chuẩn mẹt phố cổ',
        items: [
          '800g bún lá ép chặt cắt miếng vuông vừa ăn',
          '4 bìa đậu phụ Mơ non mềm mịn béo ngậy',
          '350g chả cốm làng Vòng dẻo thơm hạt cốm non',
          '500g thịt chân giò bắp heo (bó tròn bằng chỉ dù chặt tay)',
          '300g nem rán (chả giò) giòn rụm',
          '300g dồi sụn hoặc lòng non heo luộc giòn sần sật (tùy thích)',
        ],
      },
      {
        category: 'Nguyên liệu pha mắm tôm chuẩn vị Hà Thành',
        items: [
          '4 - 5 thìa canh mắm tôm Thanh Hóa/Hậu Lộc nguyên chất màu tím sim',
          '3 thìa canh đường cát trắng',
          '3 - 4 quả quất tươi (hoặc chanh), 1 thìa cà phê rượu trắng ngon (khử tanh, tạo bọt bông mịn màng)',
          '2 quả ớt hiểm thái lát cay nồng',
          '2 thìa canh dầu ăn đang sôi sùng sục vừa chiên đậu',
        ],
      },
      {
        category: 'Rau thơm ăn kèm thanh mát',
        items: [
          'Rau kinh giới (linh hồn bún đậu mắm tôm), tía tô, húng quế, dưa chuột tươi thái lát',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc thịt chân giò bó chỉ săn chắc và thái mỏng',
        time: '35 phút',
        heat: 'Lửa vừa rồi hạ nhỏ',
        goal: 'Thịt chân giò chín tới ngọt mềm, thớ thịt tròn đẹp viền mỡ trong veo',
        actionPoints: [
          'Bắp chân giò rút xương cuộn tròn thật chặt bằng chỉ dù hoặc dây gai.',
          'Chần sơ qua nước sôi bọt bẩn, rửa sạch rồi cho vào nồi luộc cùng 2 củ hành khô đập dập và 1 thìa muối hạt trong 25 - 30 phút.',
          'Vớt thịt ra thả ngay vào thau nước đá lạnh ngâm 10 phút, sau đó cho vào ngăn mát tủ lạnh 30 phút cho khối thịt đông săn chắc lại.',
          'Dùng dao thật sắc thái lát tròn mỏng tang khoe vân thịt hồng hào đẹp mắt.',
        ],
        description:
          'Chân giò bó chỉ luộc chín tới, ngâm đá lạnh rồi cất tủ mát cho săn chắc trước khi thái lát tròn mỏng đẹp.',
        tip: 'Để thịt trong ngăn mát tủ lạnh trước khi thái giúp các lát thịt mỏng đều tăm tắp mà không bị nát.',
      },
      {
        step: 2,
        title: 'Rán đậu phụ vàng giòn vỏ ngoài, mềm béo bên trong',
        time: '15 phút',
        heat: 'Dầu sôi ngập chảo, lửa vừa',
        goal: 'Vỏ ngoài phồng rộp vàng ươm giòn tan, ruột đậu bên trong vẫn mềm béo mọng nước',
        actionPoints: [
          'Đậu phụ Mơ thấm khô nước, cắt thành từng miếng vuông vừa ăn.',
          'Đun sôi nhiều dầu trong chảo sâu lòng, khi đầu đũa sủi bọt tăm thì thả đậu vào chiên ngập dầu.',
          'Chiên lửa vừa đến khi các mặt đậu vàng rụm, phồng xốp thì vớt ra để trên giá ráo dầu.',
        ],
        description:
          'Cắt đậu phụ thành miếng vuông, chiên ngập dầu sôi đến khi vỏ ngoài vàng rụm giòn xốp, vớt ra ráo dầu.',
      },
      {
        step: 3,
        title: 'Chiên chả cốm, nem rán và làm nóng các loại topping',
        time: '12 phút',
        heat: 'Lửa vừa',
        goal: 'Chả cốm dẻo thơm hạt cốm xanh, nem rán vàng ươm giòn rụm',
        actionPoints: [
          'Thả chả cốm vào chảo dầu chiên đến khi hai mặt phồng vàng nhẹ, hạt cốm nở dẻo thơm thì vớt ra thái miếng xéo.',
          'Nem rán chiên lại cho vỏ ngoài giòn tan, cắt làm đôi hoặc ba.',
          'Dồi sụn chiên xém mặt thơm nức, thái lát chéo.',
        ],
        description:
          'Chiên chả cốm, nem rán và dồi sụn cho vàng giòn rồi thái miếng vừa ăn bày lên đĩa.',
      },
      {
        step: 4,
        title: 'Đánh bông mắm tôm sủi bọt mịn màng cùng dầu sôi',
        time: '5 phút',
        heat: 'Nhiệt độ phòng & dầu sôi',
        goal: 'Bát mắm tôm bông xốp trắng mịn, thơm lừng vị quất ớt mà không hề gắt tanh',
        actionPoints: [
          'Múc 4 - 5 thìa mắm tôm ngon ra bát, thêm 3 thìa đường, nước cốt 3 quả quất và 1 thìa cà phê rượu trắng.',
          'Dùng đũa đánh thật nhanh tay liên tục theo một chiều trong 1 - 2 phút đến khi mắm tôm sủi bọt trắng bông xốp mịn màng.',
          'Múc 2 thìa canh dầu ăn đang sôi sùng sục từ chảo rán đậu dội thẳng vào bát mắm tôm, tiếng xèo xèo dậy hương thơm ngậy.',
          'Thả ớt tươi thái lát vào bát mắm tôm quất thơm lừng.',
        ],
        description:
          'Đánh mắm tôm cùng đường, quất và chút rượu trắng đến khi nổi bọt bông mịn. Dội dầu ăn đang sôi sùng sục vào quấy đều và thêm ớt thái lát.',
        tip: 'Thìa dầu sôi dội trực tiếp vào mắm tôm vừa làm chín khử khuẩn, vừa dậy lên hương béo ngậy làm dịu vị mặn gắt.',
      },
      {
        step: 5,
        title: 'Bày biện mẹt bún đậu và thưởng thức',
        time: '5 phút',
        heat: 'Không nấu',
        goal: 'Mẹt bún đậu đầy đặn sắc màu, thơm ngát mùi kinh giới và mắm tôm',
        actionPoints: [
          'Lót lá chuối tươi lên mẹt tre tròn.',
          'Xếp bún lá cắt miếng vuông xung quanh, đặt đĩa đậu rán vàng giòn nóng hổi, thịt chân giò thái mỏng, chả cốm, nem rán và dồi sụn vào từng góc mẹt.',
          'Bày đĩa rau kinh giới, tía tô, dưa chuột tươi bên cạnh.',
          'Chấm miếng bún, miếng đậu nóng giòn hoặc thịt chân giò ngập vào bát mắm tôm sủi bọt quất ớt kèm ngọn kinh giới thơm ngát.',
        ],
        description:
          'Bày bún lá, đậu rán, chả cốm, thịt chân giò và nem rán lên mẹt tre lót lá chuối. Thưởng thức cùng bát mắm tôm đánh bông và rau kinh giới.',
      },
    ],
    chefSecret:
      'Linh hồn của bún đậu mắm tôm nằm ở 2 thứ: Đậu phụ Mơ lướt ván (ngoài giòn tan, trong mềm béo như kem sữa) và bát mắm tôm đánh bông bọt quất dội dầu sôi. Rau ăn kèm nhất định phải có rau kinh giới tía non, vị thơm the the đặc trưng của kinh giới nâng tầm hương vị món ăn lên đỉnh cao.',
    recommendedSauce:
      'Mắm tôm Thanh Hóa đánh sủi bọt bông cùng nước cốt quất, đường, ớt tươi và dầu sôi ngậy béo.',
  },

  'bun-thang-ha-noi': {
    dishId: 'bun-thang-ha-noi',
    dishName: 'Bún Thang Phố Cổ Hà Nội',
    seoTitle: 'Cách Nấu Bún Thang Hà Nội Nước Dùng Thanh Ngọt Chuẩn Vị Gia Đình',
    prepTime: '45 phút',
    cookTime: '1.5 - 2 giờ',
    difficulty: 'Cầu kỳ',
    servings: '4 - 5 người',
    ingredients: [
      {
        category: 'Xương & Nước dùng thanh khiết',
        items: [
          '1/2 con gà ta thả vườn (khoảng 800g, gà mái tơ thịt ngọt)',
          '500g xương ống heo ninh nước ngọt sâu',
          '50g tôm he khô (hoặc tôm khô loại 1) rang thơm ngọt lịm',
          '2 con sá sùng khô nướng thơm (nếu có, tăng vị ngọt hậu tự nhiên như nước suối)',
          '1 củ gừng già, 3 củ hành tím khô (nướng thơm đập dập)',
          'Gia vị: Nước mắm cốt nhĩ ngon hảo hạng, đường phèn, muối hạt',
        ],
      },
      {
        category: 'Topping ngũ sắc thái chỉ tinh tế',
        items: [
          'Thịt gà luộc xé sợi chỉ mỏng manh (giữ cả phần da vàng óng)',
          '150g giò lụa ngon thái sợi chỉ siêu nhỏ đều tăm tắp',
          '2 quả trứng gà ta đánh tan tráng mỏng dính như tờ giấy, cuộn lại thái sợi chỉ mịn',
          '100g tôm sú tươi luộc chín bóc vỏ giã bông làm ruốc tôm (tôm chà bông) đỏ au',
          '50g củ cải khô ngâm nở bóp chua ngọt giòn sần sật (củ cải dầm)',
          '8 - 10 tai nấm hương khô ngâm nở thái chỉ mỏng',
        ],
      },
      {
        category: 'Bún, rau thơm & Gia vị đặc sắc',
        items: [
          '800g bún tươi sợi nhỏ mượt mà',
          'Rau răm, hành hoa (thái nhỏ li ti)',
          '1 giọt tinh dầu cà cuống nguyên chất (tinh hoa bún thang Hà Thành)',
          '1 thìa cà phê mắm tôm ngon, chanh ớt tươi',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc gà ta và ninh nước dùng thanh khiết cùng tôm khô sá sùng',
        time: '1 - 1.5 giờ',
        heat: 'Lửa nhỏ liu riu hé vung',
        goal: 'Nước dùng trong vắt như nước lọc, ngọt thanh sâu tự nhiên, không một gợn đục',
        actionPoints: [
          'Chần xương heo qua nước sôi rửa sạch, cho vào nồi cùng 3.5 lít nước ninh cùng gừng hành nướng.',
          'Cho nửa con gà vào luộc chín tới trong 20 phút rồi vớt ra ngâm nước đá lạnh cho săn thịt.',
          'Tôm he khô ngâm nở, rang thơm; sá sùng nướng vàng thơm cho vào túi vải thả vào nồi nước dùng.',
          'Ninh lửa nhỏ liu riu, hé nắp vung và hớt sạch bọt liên tục để nước dùng đạt độ trong vắt tuyệt đối.',
          'Nêm nước mắm cốt ngon, chút đường phèn và muối hạt cho vị ngọt thanh tao.',
        ],
        description:
          'Ninh xương heo, gà ta cùng tôm khô rang thơm và sá sùng nướng trên lửa nhỏ hé vung. Vớt gà khi chín tới, tiếp tục ninh nước dùng trong vắt ngọt thanh.',
        tip: 'Đầu tôm khô và sá sùng là bí quyết cổ truyền giúp nước dùng bún thang ngọt sâu thanh khiết mà không cần bất kỳ hạt mì chính nào.',
      },
      {
        step: 2,
        title: 'Chuẩn bị các loại nguyên liệu thái chỉ ngũ sắc tinh tế',
        time: '25 phút',
        heat: 'Lửa nhỏ tráng trứng',
        goal: 'Các nguyên liệu thái sợi chỉ đều tăm tắp như những sợi tơ',
        actionPoints: [
          'Thịt gà luộc nguội dùng tay xé hoặc dùng dao thái sợi chỉ mỏng mảnh.',
          'Giò lụa thái lát mỏng tang rồi thái chỉ thật đều tăm tắp.',
          'Trứng gà đánh tan cùng 1 thìa cà phê rượu trắng, tráng trên chảo chống dính thật mỏng như tờ giấy; cuộn tròn lại thái sợi chỉ mịn màng.',
          'Nấm hương ngâm nở luộc sơ thái chỉ mỏng.',
        ],
        description:
          'Xé thịt gà thành sợi chỉ mỏng. Giò lụa thái chỉ. Trứng gà tráng thật mỏng rồi cuộn lại thái sợi chỉ. Nấm hương thái mỏng.',
      },
      {
        step: 3,
        title: 'Làm ruốc tôm đỏ thắm và củ cải dầm chua ngọt giòn rụm',
        time: '15 phút',
        heat: 'Lửa nhỏ sao ruốc',
        goal: 'Ruốc tôm bông xốp màu đỏ cam rực rỡ, củ cải giòn sần sật chua ngọt',
        actionPoints: [
          'Tôm sú luộc bóc vỏ, bỏ chỉ đen, cho vào cối giã nhuyễn rồi cho lên chảo rang lửa nhỏ đến khi tôm khô ráo, bông tơi xốp thành ruốc tôm đỏ au.',
          'Củ cải khô ngâm nước ấm cho nở đều, rửa sạch vắt ráo nước, ướp với chút đường, giấm gạo và nước mắm cho ngấm vị chua ngọt giòn sần sật.',
        ],
        description:
          'Giã tôm sú sao vàng thành ruốc tôm bông xốp đỏ au. Củ cải khô ngâm nở bóp giấm đường cho ngấm vị chua ngọt giòn rụm.',
      },
      {
        step: 4,
        title: 'Hoàn thiện nước dùng bún thang và thả nấm hương',
        time: '10 phút',
        heat: 'Lửa sôi lăn tăn',
        goal: 'Nước dùng trong vắt ngát hương nấm, nóng hổi sẵn sàng phục vụ',
        actionPoints: [
          'Thả nấm hương thái chỉ vào nồi nước dùng đang sôi lăn tăn.',
          'Nếm lại nước dùng: Phải thanh nhẹ, ngọt dịu nơi cuống họng, thơm thoang thoảng hương tôm he và nấm hương.',
        ],
        description:
          'Thả nấm hương vào nồi nước dùng đang sôi lăn tăn, nếm lại gia vị cho thanh ngọt hài hòa.',
      },
      {
        step: 5,
        title: 'Bày bát bún thang ngũ sắc như bông hoa và chan nước dùng',
        time: '5 phút',
        heat: 'Nước dùng sôi bốc khói',
        goal: 'Bát bún thang đẹp tựa bức tranh hoa ngũ sắc, nước dùng trong vắt tỏa hương mê hoặc',
        actionPoints: [
          'Chần bún tươi qua nước sôi, xóc ráo nước rồi chia vào từng bát sứ sâu lòng.',
          'Khéo léo xếp các nguyên liệu thái chỉ lên mặt bún theo từng góc đối xứng như cánh hoa: Góc thịt gà xé, góc giò lụa chỉ, góc trứng vàng ươm, góc ruốc tôm đỏ rực, góc củ cải dầm và góc nấm hương nâu sẫm.',
          'Rắc hành hoa và rau răm thái nhỏ li ti vào tâm giữa bát bún.',
          'Chan nhẹ nhàng từng muôi nước dùng trong vắt đang sôi nóng hổi men theo thành bát để không làm xô lệch các cánh hoa.',
          'Dùng đầu tăm chấm 1 giọt tinh dầu cà cuống vào bát bún, thêm chút mắm tôm ngon ở góc bát và thưởng thức.',
        ],
        description:
          'Xếp bún vào bát, bày 5 loại topping thái chỉ đối xứng nhau như cánh hoa ngũ sắc. Rắc rau răm hành hoa, chan nước dùng trong veo nhẹ nhàng. Điểm 1 giọt cà cuống và mắm tôm rồi thưởng thức.',
      },
    ],
    chefSecret:
      'Bún thang được ví như tác phẩm nghệ thuật đỉnh cao của ẩm thực Tràng An: Mọi thứ từ sợi trứng, giò lụa, thịt gà đều phải thái chỉ mảnh mai, đều tăm tắp. Nước dùng phải trong veo như nước suối đầu nguồn nhưng ngọt lịm vị tôm he khô và sá sùng. Chỉ một đầu tăm tinh dầu cà cuống cùng chút mắm tôm ngon sẽ đánh thức trọn vẹn hương vị tinh túy ngàn năm của phố cổ.',
    recommendedSauce:
      'Chút mắm tôm ngon nguyên chất đánh tan nơi góc bát, giấm tỏi ớt, chanh tươi và giọt tinh dầu cà cuống.',
  },

  'bun-oc-nguoi-ha-noi': {
    dishId: 'bun-oc-nguoi-ha-noi',
    dishName: 'Bún Ốc Nguội Cổ Truyền Hà Nội',
    seoTitle: 'Cách Nấu Bún Ốc Nguội Nước Dùng Thanh Ngọt Chuẩn Vị Gia Đình',
    prepTime: '40 phút',
    cookTime: '45 phút',
    difficulty: 'Cầu kỳ',
    servings: '4 người',
    ingredients: [
      {
        category: 'Ốc tươi giòn ngọt béo múp',
        items: [
          '1.5kg ốc mít hoặc ốc nhồi béo múp, vỏ mỏng bóng',
          '3 củ sả đập dập, 5 lá chanh bánh tẻ',
          '1 thìa muối hạt',
        ],
      },
      {
        category: 'Nước ốc thanh mát từ giấm bỗng nếp',
        items: [
          '1.2 lít nước luộc ốc lắng trong (lọc gạn bỏ cặn cát)',
          '500ml nước ninh xương heo/xương gà thanh dịu (hớt sạch váng mỡ)',
          '250ml - 300ml giấm bỗng nếp cái hoa vàng chuẩn vị men thơm nồng',
          'Nước mắm cốt nhĩ loại ngon hảo hạng, đường phèn, muối hạt',
        ],
      },
      {
        category: 'Ớt chưng cay xè & Đồ ăn kèm',
        items: [
          '50g ớt bột cay và ớt hiểm tươi băm nhỏ',
          '3 thìa canh dầu ăn, 1 thìa canh dầu màu điều, 1 thìa cà phê tỏi băm',
          '800g bún lá đồng xu (bún lá hến) nhỏ xinh trắng muốt',
          'Rau thơm: Tía tô, kinh giới, rau thơm Láng tươi non',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Ngâm ốc nhả sạch bùn và luộc ốc giòn sần sật',
        time: '30 phút (ngâm 2 - 3 giờ)',
        heat: 'Lửa lớn luộc nhanh',
        goal: 'Ốc sạch hoàn toàn nhớt bùn, luộc chín tới giòn sần sật',
        actionPoints: [
          'Ốc mít ngâm trong nước vo gạo cắt thêm vài lát ớt tươi trong 2 - 3 giờ cho nhả sạch bùn nhớt, sau đó cọ rửa từng con thật sạch.',
          'Cho ốc vào nồi cùng sả đập dập, lá chanh và 1 thìa muối hạt, đổ nước xâm xấp đáy nồi.',
          'Đậy vung đun lửa lớn, khi nồi ốc sôi bùng trào bọt thì mở vung, đảo đều trong 2 phút đến khi ốc bong vảy thì tắt bếp ngay.',
        ],
        description:
          'Ngâm ốc sạch bùn nhớt, luộc cùng sả và lá chanh trên lửa lớn đến khi bong vảy là tắt bếp ngay để ốc giữ độ giòn.',
        tip: 'Ốc luộc chín quá sẽ bị teo tóp, dai và tụt sâu vào vỏ rất khó khều; chỉ cần sôi bùng bong vảy là vớt ra ngay.',
      },
      {
        step: 2,
        title: 'Khều thịt ốc, bỏ ruột đen và giữ lại nước luộc ốc trong veo',
        time: '15 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Thịt ốc nguyên vẹn, giòn sần sật, nước ốc lắng trong không một hạt cát',
        actionPoints: [
          'Dùng gai bưởi hoặc que nhọn khều từng con ốc, chỉ lấy phần đầu thịt ốc giòn béo, bỏ phần ruột đen và hoi ở đuôi.',
          'Rửa nhẹ thịt ốc qua nước luộc ốc cho sạch màng vảy.',
          'Nước luộc ốc để lắng cặn cát trong 15 phút, sau đó nhẹ nhàng gạn lấy phần nước trong vắt bên trên qua rây lọc.',
        ],
        description:
          'Khều thịt ốc lấy phần đầu giòn, bỏ ruột đen. Nước luộc ốc để lắng rồi gạn lấy phần nước trong veo.',
      },
      {
        step: 3,
        title: 'Nấu nước dùng ốc nguội chua thanh từ giấm bỗng nếp',
        time: '20 phút',
        heat: 'Lửa vừa rồi để nguội',
        goal: 'Nước dùng trong veo, chua thanh dịu ngọt, thoang thoảng men bỗng nếp nồng nàn',
        actionPoints: [
          'Cho phần nước ốc lắng trong hòa cùng nước ninh xương thanh vào nồi đun sôi nhẹ.',
          'Rót giấm bỗng nếp cái hoa vàng vào nồi, nêm nước mắm cốt nhĩ ngon, muối hạt và 1 thìa nhỏ đường phèn.',
          'Đun sôi lăn tăn khoảng 3 phút cho bỗng nếp chín dịu vị men chua thanh.',
          'Tắt bếp, để nước ốc nguội hẳn tự nhiên về nhiệt độ phòng (hoặc hơi man mát).',
        ],
        description:
          'Đun nước ốc cùng nước ninh xương và giấm bỗng nếp, nêm mắm ngon và chút đường phèn. Đun sôi nhẹ rồi tắt bếp để nguội hẳn.',
        tip: 'Bún ốc nguội tuyệt đối không dùng cà chua, nghệ hay mỡ hành; nước dùng phải giữ độ trong veo và thanh mát từ men bỗng nếp.',
      },
      {
        step: 4,
        title: 'Chưng ớt xào sa tế cay nồng xé lưỡi',
        time: '10 phút',
        heat: 'Lửa nhỏ',
        goal: 'Ớt chưng màu đỏ tươi óng ánh, thơm lừng cay nồng xé lưỡi',
        actionPoints: [
          'Phi thơm tỏi băm với dầu ăn và dầu màu điều trên lửa nhỏ.',
          'Trút ớt bột và ớt tươi băm vào đảo đều tay trên lửa liu riu đến khi ớt chín thơm, dậy màu đỏ au quyến rũ.',
          'Múc ớt chưng ra bát để nguội.',
        ],
        description:
          'Phi tỏi thơm với dầu điều, cho ớt bột và ớt tươi băm vào chưng lửa nhỏ đến khi dậy màu đỏ au cay nồng.',
      },
      {
        step: 5,
        title: 'Để nước nguội tự nhiên và thưởng thức theo phong vị Tràng An',
        time: '5 phút',
        heat: 'Nhiệt độ phòng (thanh mát)',
        goal: 'Vị chua thanh mát rượi, ốc giòn sần sật, cay the bốc hỏa của ớt chưng',
        actionPoints: [
          'Múc nước ốc nguội ra từng chiếc bát sứ nhỏ hoặc chiếc thố đất mộc mạc.',
          'Thả những con ốc béo múp, giòn sần sật vào bát nước giấm bỗng.',
          'Múc 1 thìa ớt chưng cay xè thả nổi trên mặt bát, váng dầu đỏ au hòa cùng nước ốc trong veo.',
          'Bày đĩa bún lá đồng xu nhỏ xinh trắng muốt bên cạnh cùng đĩa tía tô kinh giới.',
          'Gắp miếng bún đồng xu chấm ngập vào bát nước ốc, kèm một con ốc giòn sần sật rồi húp thìa nước chua dịu mát lịm cả người.',
        ],
        description:
          'Múc nước ốc nguội ra bát, thả ốc giòn và ớt chưng lên trên. Chấm bún lá đồng xu vào bát nước ốc thanh mát và thưởng thức.',
      },
    ],
    chefSecret:
      'Bún ốc nguội là khúc hoan ca thanh tao của ẩm thực Hà Nội ngày hè: Nước dùng nguội mát chứ không lạnh ngắt, vị chua thanh thoát từ men giấm bỗng nếp cái hoa vàng không chua gắt như chanh hay giấm công nghiệp. Miếng ốc béo giòn hòa cùng miếng bún đồng xu nhỏ xíu và vị cay bốc hỏa của ớt chưng tạo nên sự cân bằng âm dương đầy mê hoặc.',
    recommendedSauce:
      'Ớt chưng dầu tự làm cay xè nổi màng đỏ trên bát nước giấm bỗng nguội thanh mát.',
  },

  'bun-suon-moc-doc-mung': {
    dishId: 'bun-suon-moc-doc-mung',
    dishName: 'Bún Sườn Mọc Dọc Mùng Thanh Mát',
    seoTitle: 'Cách Nấu Bún Sườn Dọc Mùng Nước Dùng Thanh Ngọt Chuẩn Vị Gia Đình',
    prepTime: '35 phút',
    cookTime: '1 giờ',
    difficulty: 'Trung bình',
    servings: '4 - 5 người',
    ingredients: [
      {
        category: 'Sườn non & Viên mọc nấm hương thơm lừng',
        items: [
          '700g sườn non heo (chọn sườn thăn tươi nhiều nạc, dẻ sườn nhỏ dẹt)',
          '300g giò sống (mọc heo) dẻo mịn',
          '150g thịt nạc vai xay nhuyễn',
          '5 - 6 tai nấm hương khô ngâm nở thái nhỏ, 2 tai mộc nhĩ ngâm nở băm nhỏ',
          '1 thìa cà phê tiêu sọ xay mịn, 1 thìa cà phê hạt nêm, hành tím băm',
          '800g bún tươi sợi vừa mượt mà',
        ],
      },
      {
        category: 'Dọc mùng giòn & Nước dùng chua thanh',
        items: [
          '3 - 4 cây dọc mùng (bạc hà) tươi xanh mập mạp',
          '3 quả cà chua chín đỏ mọng bổ múi cau',
          '2 quả me chua tươi (hoặc 3 quả tai chua khô)',
          'Hành khô băm, 1 thìa cà phê bột nghệ tươi (tạo màu nước dùng vàng ươm dịu mắt)',
          'Gia vị: Nước mắm cốt nhĩ ngon, muối hạt, đường cát, dầu ăn',
        ],
      },
      {
        category: 'Rau thơm & Đồ ăn kèm thanh mát',
        items: [
          'Hành hoa, mùi tàu (ngò gai) rửa sạch thái nhỏ',
          'Giá đỗ tươi, chanh tươi, ớt hiểm thái lát, rau sống các loại',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế dọc mùng sạch nhựa, bóp muối kỹ không lo ngứa',
        time: '20 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Dọc mùng xanh mướt giòn rụm, hết sạch nhựa ngứa tuyệt đối an toàn',
        actionPoints: [
          'Dọc mùng tước sạch lớp vỏ xơ bên ngoài, rửa sạch bụi đất.',
          'Dùng dao thái vát chéo các đoạn dày khoảng 1.5cm.',
          'Rắc 2 thìa canh muối hạt vào âu dọc mùng, đeo găng tay bóp đều và kỹ cho dọc mùng mềm xẹp xuống và tiết hết nước nhựa ngứa.',
          'Để nghỉ 15 phút rồi xả lại dưới vòi nước lạnh nhiều lần, dùng tay vắt thật kiệt nước.',
          'Chần nhanh dọc mùng qua nồi nước sôi trong 30 giây rồi vớt ra xả nước lạnh, vắt ráo để giữ độ giòn sần sật.',
        ],
        description:
          'Tước vỏ dọc mùng, thái vát chéo, bóp kỹ với muối hạt cho ra hết nước ngứa. Rửa lại nhiều lần dưới vòi nước lạnh rồi vắt kiệt.',
        tip: 'Khâu bóp muối và vắt kiệt nước là bí quyết cốt tử để dọc mùng giòn ngọt mà tuyệt đối không bao giờ bị ngứa cổ họng.',
      },
      {
        step: 2,
        title: 'Chần sườn non và ninh nước dùng ngọt lịm',
        time: '45 phút',
        heat: 'Lửa vừa rồi hạ nhỏ liu riu',
        goal: 'Sườn chín mềm róc thịt, nước dùng trong ngọt tự nhiên',
        actionPoints: [
          'Sườn non chặt miếng vừa ăn dài khoảng 3 - 4cm, chần qua nước sôi 3 phút rồi rửa sạch bọt cặn.',
          'Ướp sườn với 1 thìa nước mắm, hành tím băm và chút tiêu xay trong 15 phút.',
          'Phi thơm hành tím, trút sườn vào xào săn rồi đổ 2.5 lít nước vào ninh lửa liu riu, hớt bọt thường xuyên cho sườn mềm nhừ.',
        ],
        description:
          'Chần sạch sườn non, xào săn với hành mắm rồi ninh cùng 2.5 lít nước trên lửa nhỏ liu riu cho sườn chín mềm róc thịt.',
      },
      {
        step: 3,
        title: 'Trộn giò sống làm viên mọc nấm hương thơm lừng',
        time: '15 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Viên mọc dai giòn sần sật, thơm nức mùi nấm hương tiêu sọ',
        actionPoints: [
          'Trộn đều giò sống, thịt nạc vai xay, nấm hương thái nhỏ, mộc nhĩ băm, tiêu sọ xay, chút hạt nêm và hành tím băm.',
          'Dùng thìa quết mạnh tay nhiều lần cho khối mọc dẻo dai kết dính.',
          'Thoa chút dầu ăn lên tay, nặn mọc thành từng viên tròn đều nhau vừa ăn.',
        ],
        description:
          'Trộn giò sống với nạc vai xay, nấm hương, mộc nhĩ băm và tiêu sọ. Quết dẻo rồi nặn thành từng viên tròn vừa miệng.',
      },
      {
        step: 4,
        title: 'Xào cà chua, thả mọc và dọc mùng hoàn thiện nước dùng chua thanh',
        time: '15 phút',
        heat: 'Lửa vừa',
        goal: 'Nước dùng màu vàng đỏ sóng sánh, vị chua thanh dịu ngọt, mọc chín nổi phồng',
        actionPoints: [
          'Phi thơm hành khô, xào chín cà chua cùng chút bột nghệ tạo màu đỏ cam vàng ươm óng ả rồi trút vào nồi nước ninh sườn.',
          'Thả me chua vào nồi, khi me mềm vớt ra dầm nát lấy nước cốt chua thanh dịu rót lại vào nồi.',
          'Thả từng viên mọc vào nồi nước dùng đang sôi lăn tăn, đun đến khi viên mọc chín nổi phồng lên mặt nước.',
          'Nêm nước mắm cốt ngon, hạt nêm, chút đường cho vị chua thanh ngọt đậm đà.',
          'Thả dọc mùng đã sơ chế vào nồi đun sôi bùng lên 1 phút rồi tắt bếp để dọc mùng giữ trọn độ xanh giòn.',
        ],
        description:
          'Xào cà chua trút vào nồi sườn cùng nước cốt me. Thả viên mọc vào đun chín nổi. Nêm nước mắm vừa ăn rồi thả dọc mùng đun sôi bùng 1 phút.',
      },
      {
        step: 5,
        title: 'Trình bày bát bún sườn mọc dọc mùng bốc khói thanh mát',
        time: '5 phút',
        heat: 'Nồi nước dùng sôi sùng sục',
        goal: 'Tô bún rực rỡ sắc màu, thơm ngát mùi sườn mọc, nước dùng chua dịu giải ngấy cực đỉnh',
        actionPoints: [
          'Chần bún tươi qua nước sôi, cho vào từng tô lớn.',
          'Gắp sườn non mềm, viên mọc nấm hương và gắp nhiều dọc mùng xanh giòn xếp lên mặt bún.',
          'Rắc hành hoa và mùi tàu thái nhỏ lên trên.',
          'Múc nước dùng chua thanh nóng hổi kèm vài lát cà chua đỏ mọng chan ngập bát bún.',
          'Ăn kèm đĩa ớt hiểm tươi, chanh cốm và đĩa rau sống thanh mát.',
        ],
        description:
          'Chần bún cho vào tô, xếp sườn, mọc nấm hương và dọc mùng lên trên. Rắc hành mùi tàu rồi chan nước dùng chua thanh nóng hổi và thưởng thức.',
      },
    ],
    chefSecret:
      'Bí quyết của món bún sườn dọc mùng kinh điển Hà Nội là sự cân bằng tuyệt hảo giữa vị béo ngọt của sườn heo, vị giòn thơm của viên mọc nấm hương và vị chua dịu thanh tao của me/tai chua. Dọc mùng chỉ thả vào nồi nước dùng sôi bùng rồi vớt ra bát ngay để giữ được màu xanh non mướt mắt và độ giòn sần sật đặc trưng.',
    recommendedSauce:
      'Nước mắm cốt nguyên chất vắt chanh ớt tươi chấm sườn non và viên mọc nấm hương giòn thơm.',
  },

  'bun-moc-ha-noi': {
    dishId: 'bun-moc-ha-noi',
    dishName: 'Bún Mọc Sườn Nấm Hương Nước Dùng Thanh Ngọt',
    seoTitle: 'Cách Nấu Bún Mọc Hà Nội Nước Dùng Trong Veo Chuẩn Vị Gia Đình',
    prepTime: '30 phút',
    cookTime: '50 phút',
    difficulty: 'Dễ',
    servings: '4 - 5 người',
    ingredients: [
      {
        category: 'Viên mọc nấm hương & Chả quế thơm lừng',
        items: [
          '350g giò sống (mọc heo tươi dẻo mịn, để thật lạnh)',
          '150g thịt nạc vai xay nhuyễn có chút mỡ để mọc mềm mọng không bị khô bã',
          '8 - 10 tai nấm hương khô ngâm nở (thái nhỏ một nửa để trộn mọc, giữ lại vài tai nguyên thả nước dùng)',
          '3 tai mộc nhĩ ngâm nở băm nhỏ tạo độ giòn sần sật',
          '200g chả quế Hà Nội (hoặc chả lụa) thái lát mỏng',
          '1 thìa cà phê tiêu sọ trắng xay thơm nồng, 1 thìa cà phê nước mắm cốt ngon, hành tím băm nhuyễn phi thơm',
        ],
      },
      {
        category: 'Sườn non, Xương ninh & Măng giòn sần sật',
        items: [
          '600g sườn non heo tươi ngon chặt khúc vừa ăn (khoảng 3cm)',
          '500g xương ống hoặc xương bay heo ninh lấy nước cốt ngọt tủy sâu lắng',
          '250g măng củ tươi tước sợi hoặc măng khô ngâm nở luộc kỹ (tùy chọn theo kiểu bún mọc phố cổ Hàng Trống/Cầu Gỗ)',
          '1 củ hành tây bổ đôi nướng thơm, 3 củ hành tím nướng cháy xém',
          'Gia vị: Nước mắm cốt nhĩ cá cơm ngon, muối hạt, đường phèn, hạt nêm',
          '800g bún tươi sợi nhỏ mượt mà',
        ],
      },
      {
        category: 'Rau thơm & Gia vị ăn kèm chuẩn vị phố cổ',
        items: [
          'Hành hoa (phần đầu hành chẻ sợi, lá thái nhỏ), rau mùi ta (ngò rí) thái nhỏ',
          'Hành củ phi vàng giòn ruộm thơm nức mũi',
          'Chanh tươi, ớt hiểm thái lát mỏng, tiêu sọ trắng xay, giấm tỏi ớt hoặc ớt chưng dầu',
          'Quẩy giòn giòn ăn kèm (tùy thích)',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Chần sạch xương sườn và ninh nước dùng trong veo',
        time: '45 phút',
        heat: 'Lửa nhỏ liu riu',
        goal: 'Nước dùng trong vắt tựa hổ phách, vị ngọt thanh sâu lắng từ xương tủy và sườn non',
        actionPoints: [
          'Chặt sườn non miếng vừa ăn; chần sườn và xương ống qua nồi nước sôi có vài lát gừng đập dập và 1 thìa muối hạt trong 3 phút để khử sạch tạp chất và bọt bẩn.',
          'Vớt xương và sườn ra rửa lại thật sạch dưới vòi nước lạnh.',
          'Cho sườn non và xương vào nồi với 2.5 - 3 lít nước lọc, thả hành tây và hành tím đã nướng cháy xém cạo sạch vỏ vào.',
          'Đun sôi bùng rồi lập tức hạ lửa liu riu, hé vung và hớt sạch bọt nổi liên tục trong suốt quá trình ninh.',
          'Nêm 1 thìa canh muối hạt, 1 thìa canh đường phèn để tạo hậu vị ngọt thanh dịu mát.',
        ],
        description:
          'Chần sạch sườn non và xương heo, rửa sạch rồi ninh cùng nước lọc, hành tây và hành tím nướng trên lửa nhỏ liu riu. Hớt bọt thường xuyên và mở hé vung để nước dùng trong vắt ngọt tủy.',
        tip: 'Tuyệt đối không đậy kín vung và không để nước sôi sùng sục để nước dùng bún mọc luôn đạt độ trong veo không một gợn đục.',
      },
      {
        step: 2,
        title: 'Xào măng giòn ngọt và thả vào nồi nước dùng',
        time: '15 phút',
        heat: 'Lửa vừa',
        goal: 'Măng giòn sần sật ngấm đậm gia vị, khử sạch mùi nồng',
        actionPoints: [
          'Măng tươi tước sợi nhỏ, luộc với nước sôi pha chút muối 2 lần mở vung để khử sạch độc tố và vị đắng chát, vớt ra xả nước lạnh rồi vắt ráo.',
          'Phi thơm 1 thìa hành tím băm với chút dầu ăn, trút măng vào xào săn cùng 1 thìa hạt nêm và chút nước mắm.',
          'Trút măng xào thơm và vài tai nấm hương nguyên vào nồi nước ninh xương sườn, đun liu riu cho vị ngọt của sườn và vị giòn thanh của măng hòa quyện.',
        ],
        description:
          'Măng tước sợi luộc kỹ, xào săn thơm với hành mắm rồi trút vào nồi nước ninh sườn cùng vài tai nấm hương.',
      },
      {
        step: 3,
        title: 'Quết giò sống làm viên mọc nấm hương mộc nhĩ giòn dai tự nhiên',
        time: '15 phút',
        heat: 'Nhiệt độ phòng (giữ thịt lạnh)',
        goal: 'Khối mọc dẻo quánh, viên mọc dai giòn sần sật thơm nức nấm hương tiêu sọ',
        actionPoints: [
          'Mẹo vàng: Giò sống mua về bọc kín để ngăn mát tủ lạnh cho thật lạnh trước khi quết, mọc sẽ có độ giòn dai xuất sắc mà không cần dùng hàn the hay bột nở.',
          'Cho giò sống lạnh, thịt nạc vai xay, nấm hương thái hạt lựu, mộc nhĩ băm nhỏ, 1 thìa cà phê tiêu sọ trắng xay thơm, 1 thìa nước mắm cốt nhĩ và hành tím phi thơm vào âu.',
          'Dùng muôi gỗ miết quết thật mạnh tay và đều theo một chiều trong 5 phút đến khi khối mọc dẻo quánh, dính quyện vào nhau.',
          'Thoa chút dầu ăn lên lòng bàn tay hoặc dùng thìa nhúng nước, nặn mọc thành từng viên tròn đều đặn cỡ quả bóng bàn.',
        ],
        description:
          'Trộn giò sống ướp lạnh với nạc vai xay, nấm hương, mộc nhĩ, tiêu sọ, nước mắm và hành phi. Quết dẻo quánh theo một chiều rồi nặn thành từng viên tròn vừa ăn.',
        tip: 'Quết giò sống khi còn lạnh và quết dồn lực theo một chiều là bí quyết gia truyền giúp viên mọc giòn nẩy sần sật.',
      },
      {
        step: 4,
        title: 'Thả viên mọc nấu chín và nêm nếm nước dùng',
        time: '10 phút',
        heat: 'Lửa vừa',
        goal: 'Viên mọc chín nổi tròn căng bóng, nước dùng dậy thơm mùi nấm hương thanh nhã',
        actionPoints: [
          'Khi sườn đã chín mềm róc xương, tăng lửa cho nồi nước dùng sôi lăn tăn rồi nhẹ nhàng thả từng viên mọc vào.',
          'Đun khoảng 5 - 7 phút. Khi viên mọc chín tới sẽ nổi phồng căng tròn lên mặt nước.',
          'Nêm thêm 2 thìa canh nước mắm cốt nhĩ hảo hạng cho dậy mùi thơm nức đặc trưng, rắc chút tiêu trắng xay vào nồi rồi hạ lửa nhỏ nhất giữ nóng.',
        ],
        description:
          'Thả từng viên mọc vào nồi nước sôi lăn tăn đến khi mọc nổi tròn căng bóng. Nêm nước mắm cốt cho vừa miệng đậm đà thanh tao.',
      },
      {
        step: 5,
        title: 'Trình bày bát bún mọc Hà Nội thanh tao, nghi ngút khói',
        time: '5 phút',
        heat: 'Nồi nước dùng sôi lăn tăn',
        goal: 'Bát bún tinh tế, màu sắc hài hòa, viên mọc tròn xinh bóng bẩy, nước trong veo thơm phức',
        actionPoints: [
          'Chần bún tươi qua nước sôi cho nóng tơi sợi, xốc ráo nước rồi chia đều vào từng tô lớn.',
          'Gắp 3 - 4 viên mọc nấm hương giòn sần sật, miếng sườn non mềm róc thịt, gắp măng giòn và xếp vài lát chả quế vàng thơm lên mặt bún.',
          'Rắc đầu hành hoa chẻ sợi, hành hoa thái nhỏ, rau mùi ta và rắc một nhúm hành phi vàng giòn ruộm cùng tiêu sọ cay ấm lên trên.',
          'Múc nước dùng trong veo đang sôi lăn tăn chan ngập bát bún, chan đều lên các lát chả và hành hoa.',
          'Thưởng thức ngay khi còn nóng hổi cùng chanh tươi, vài lát ớt hiểm, ớt chưng cay nồng và quẩy giòn.',
        ],
        description:
          'Chần bún nóng xếp vào tô, xếp sườn, mọc nấm hương, chả quế, măng giòn. Rắc hành hoa, rau mùi, hành phi và tiêu sọ rồi chan nước dùng trong veo bốc khói nghi ngút.',
      },
    ],
    chefSecret:
      'Bún Mọc Hà Nội đích thực là biểu tượng của sự thanh nhã: Nước dùng phải trong vắt ngọt lịm từ xương sườn ninh khéo, hoàn toàn không dùng phẩm màu hay chất tạo chua (không nhầm lẫn với bún sườn dọc mùng). Viên mọc có nấm hương mộc nhĩ tạo độ giòn sần sật và mùi thơm quý phái khó quên, hòa quyện tuyệt vời với lát chả quế thơm lừng và hành phi vàng ruộm.',
    recommendedSauce:
      'Nước mắm cốt nhĩ chanh ớt tươi kèm tiêu bắc xay chấm viên mọc nấm và sườn non.',
  },

  'bun-ca-cay-hai-phong': {
    dishId: 'bun-ca-cay-hai-phong',
    dishName: 'Bún Cá Cay Hải Phòng',
    seoTitle: 'Cách Nấu Bún Cá Cay Hải Phòng Nước Dùng Chua Cay Đậm Đà Chuẩn Vị Đất Cảng',
    prepTime: '45 phút',
    cookTime: '1 giờ',
    difficulty: 'Trung bình',
    servings: '4 - 5 người',
    ingredients: [
      {
        category: 'Cá rô phi chiên giòn, Chả cá & Dạ dày cá sần sật',
        items: [
          '1.2kg cá rô phi tươi sống (hoặc cá thu, cá trắm): lọc riêng thịt phi lê, giữ lại đầu và khung xương cá để ninh nước ngọt',
          '300g chả cá Hải Phòng (hoặc chả cá thu / chả cá thác lác) chiên vàng, thái lát mỏng',
          '200g lòng / dạ dày cá basa (hoặc bao tử cá thu) làm sạch bóp muối giấm, xào giòn sần sật (nét đặc trưng độc nhất của bún cá đất Cảng)',
          '1 gói bột chiên giòn (hoặc bột bắp) để áo lớp mỏng quanh miếng cá',
          '1 thìa canh gừng băm, 1 thìa canh tỏi băm, 1 thìa cà phê bột nghệ (tạo màu vàng óng và khử tanh tuyệt đối), tiêu xay, nước mắm cốt ngon, dầu ăn',
        ],
      },
      {
        category: 'Xương ninh & Nước dùng chua cay đậm đà',
        items: [
          '500g xương ống heo chần sạch ninh cùng đầu và xương cá',
          '4 quả cà chua chín đỏ mọng bổ múi cau',
          '2 quả me chua tươi (hoặc 3 thìa canh giấm bỗng nếp) tạo vị chua thanh dịu mát',
          '1 củ hành tây nướng, 3 củ hành tím nướng thơm cháy xém',
          '2 thìa canh dầu màu điều (tạo màu nước dùng vàng cam sóng sánh)',
          'Gia vị: Nước mắm cốt nhĩ cá cơm, muối hạt, đường phèn, hạt nêm',
          '800g bún tươi sợi vừa',
        ],
      },
      {
        category: 'Rau thơm & Linh hồn ớt cay đất Cảng',
        items: [
          '3 cây dọc mùng (bạc hà) tước vỏ bóp muối vắt kiệt (hoặc rau cần nước chần giòn)',
          'Hành hoa, thì là rửa sạch thái nhỏ (thì là là linh hồn của bún cá khử sạch mùi tanh)',
          'Chí chương Hải Phòng (tương ớt cay lên men gia truyền đất Cảng) hoặc ớt chưng dầu cay xè',
          'Rau sống ăn kèm: hoa chuối thái mỏng, rau muống chẻ, giá đỗ tươi, chanh cốm, quất tươi',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế cá, ướp nghệ gia vị và chiên giòn rụm bên ngoài',
        time: '25 phút',
        heat: 'Lửa vừa đến lớn',
        goal: 'Miếng cá vàng ươm giòn rụm vỏ ngoài, bên trong thịt trắng mềm mọng nước không tanh',
        actionPoints: [
          'Phi lê cá rô phi rửa sạch với nước muối gừng loãng, thấm thật khô bằng khăn giấy, thái miếng con chì hoặc lát vát dày cỡ 1.5cm vừa ăn.',
          'Ướp thịt cá với 1 thìa gừng băm, 1 thìa tỏi băm, 1 thìa cà phê bột nghệ, 1 thìa nước mắm ngon và chút tiêu xay trong 20 phút cho ngấm sâu gia vị.',
          'Lăn từng miếng cá qua một lớp bột chiên giòn thật mỏng để cá giữ phom và giòn tan khi chiên.',
          'Đun sôi dầu ngập chảo, thả từng miếng cá vào chiên vàng ruộm hai mặt rồi vớt ra giá có lót giấy thấm dầu.',
        ],
        description:
          'Thái cá miếng vừa ăn, ướp gừng tỏi, bột nghệ và nước mắm. Áo một lớp bột chiên giòn mỏng rồi chiên ngập dầu cho vàng giòn rụm.',
        tip: 'Ướp bột nghệ giúp cá có màu vàng ươm bắt mắt và khử sạch hoàn toàn mùi tanh của cá đồng.',
      },
      {
        step: 2,
        title: 'Ninh nước dùng kép từ xương heo và đầu xương cá ngọt lịm',
        time: '45 phút',
        heat: 'Lửa nhỏ liu riu',
        goal: 'Nước dùng trong ngọt sâu từ tủy xương và cá, không gợn mùi tanh',
        actionPoints: [
          'Xương ống heo chần qua nước sôi 3 phút, rửa sạch rồi cho vào nồi cùng 2.5 lít nước, thả hành tây và hành tím nướng vào ninh lửa nhỏ.',
          'Phần đầu và xương cá rửa sạch với muối rượu, chiên sơ trên chảo cho săn khô hoặc nướng xém để khử hết mùi tanh.',
          'Cho đầu và xương cá vào túi vải lọc (hoặc cho thẳng vào nồi ninh rồi lọc bỏ bã xương sau), đun liu riu cùng nồi xương heo trong 45 phút.',
          'Hớt sạch bọt liên tục để nước dùng giữ được độ thanh trong.',
        ],
        description:
          'Ninh xương heo cùng đầu và xương cá đã chiên thơm trên lửa nhỏ liu riu, thêm hành nướng và hớt bọt thường xuyên để nước dùng ngọt sâu thanh mát.',
        tip: 'Chiên hoặc nướng sơ đầu xương cá trước khi ninh là bí quyết bắt buộc để nước dùng bún cá ngọt lịm mà không bị tanh cặn.',
      },
      {
        step: 3,
        title: 'Xào cà chua, dạ dày cá sần sật và hoàn thiện nước dùng chua thanh',
        time: '15 phút',
        heat: 'Lửa vừa',
        goal: 'Nước dùng vàng cam sóng sánh, vị chua thanh ngọt dịu, dạ dày cá giòn sần sật',
        actionPoints: [
          'Dạ dày cá bóp kỹ muối hạt và nước cốt chanh/giấm, xả sạch nhớt. Phi thơm tỏi xào săn dạ dày cá với chút hạt nêm, tiêu xay đến khi chín giòn sần sật rồi múc ra đĩa riêng.',
          'Dùng chảo phi thơm hành khô với 2 thìa canh dầu màu điều, cho 1/2 lượng cà chua bổ múi cau vào xào nhuyễn tạo màu vàng cam sóng sánh rồi trút vào nồi nước dùng.',
          'Me chua luộc chín trong nồi nước dùng, dầm nát lọc lấy nước cốt chua thanh đổ lại vào nồi.',
          'Thả nốt 1/2 lượng cà chua còn lại vào nồi giữ nguyên múi. Nêm nước mắm cốt nhĩ ngon, đường phèn, muối hạt cho vị chua thanh ngọt đậm đà vừa miệng.',
        ],
        description:
          'Xào chín giòn dạ dày cá để riêng. Phi thơm dầu điều xào cà chua trút vào nồi nước sườn cá cùng nước cốt me. Nêm nếm nước mắm đường phèn vừa vị chua thanh sóng sánh.',
      },
      {
        step: 4,
        title: 'Sơ chế dọc mùng xanh giòn không ngứa và rau cần',
        time: '10 phút',
        heat: 'Nhiệt độ phòng & Nồi nước sôi',
        goal: 'Dọc mùng xanh mướt giòn sần sật, sạch 100% nhựa ngứa',
        actionPoints: [
          'Dọc mùng tước sạch vỏ xơ, thái vát chéo, bóp thật kỹ với 2 thìa muối hạt cho xẹp mềm tiết hết nước ngứa.',
          'Rửa xả nhiều lần dưới vòi nước lạnh rồi dùng tay vắt thật kiệt nước.',
          'Khi chuẩn bị ăn, chần nhanh dọc mùng (hoặc rau cần cắt khúc) qua nồi nước dùng sôi trong 1 phút rồi vớt ra ngay để giữ độ xanh giòn.',
        ],
        description:
          'Tước vỏ dọc mùng, bóp kỹ muối hạt, xả sạch vắt kiệt nước rồi chần nhanh qua nồi nước dùng sôi giữ độ xanh giòn.',
      },
      {
        step: 5,
        title: 'Trình bày tô bún cá cay Hải Phòng nghi ngút khói, rực rỡ sắc màu',
        time: '5 phút',
        heat: 'Nồi nước dùng sôi sùng sục',
        goal: 'Tô bún rực rỡ vàng đỏ xanh mát mắt, cá giòn rụm, vị cay nồng xé lưỡi đậm chất đất Cảng',
        actionPoints: [
          'Chần bún tươi qua nước sôi, xốc ráo nước rồi chia đều vào từng tô lớn.',
          'Xếp lên mặt bún: những miếng cá rô phi chiên vàng ruộm, lát chả cá Hải Phòng thơm nức, dạ dày cá giòn sần sật, dọc mùng xanh giòn và múi cà chua đỏ mọng.',
          'Rắc hành hoa và thì là thái nhỏ phủ đều lên trên.',
          'Múc nước dùng chua cay óng ả đang sôi sùng sục chan ngập tô bún.',
          'Thêm một thìa chí chương Hải Phòng (tương ớt cay lên men gia truyền), vắt thêm quất tươi và thưởng thức kèm đĩa hoa chuối thái mỏng thanh mát.',
        ],
        description:
          'Chần bún cho vào tô, xếp cá chiên giòn, chả cá, dạ dày cá, dọc mùng, rắc hành thì là rồi chan nước dùng chua ngọt cay nồng. Thêm chí chương Hải Phòng cay xè và thưởng thức.',
      },
    ],
    chefSecret:
      'Linh hồn của bún cá cay Hải Phòng nằm ở 3 điểm cốt tử: Thứ nhất, nước dùng phải là nước ninh kép từ xương heo và đầu/xương cá đã rán thơm để nước ngọt sâu không tanh. Thứ hai, miếng cá chiên giòn rụm vỏ ngoài nhưng thớ thịt mềm ngọt mọng nước, kết hợp dạ dày cá giòn sần sật độc nhất vô nhị. Thứ ba, không thể thiếu thì là dậy mùi và muỗng chí chương (tương ớt gia truyền đất Cảng) đỏ rực cay nồng nàn.',
    recommendedSauce:
      'Chí chương Hải Phòng (tương ớt cổ truyền đất Cảng lên men chua cay đằm vị) và nước mắm cốt nhĩ tỏi ớt chanh.',
  },

  'banh-da-cua-be': {
    dishId: 'banh-da-cua-be',
    dishName: 'Bánh Đa Cua Bể Hải Phòng Chả Lá Lốt',
    seoTitle: 'Cách Nấu Bánh Đa Cua Hải Phòng Nước Dùng Đậm Đà Chuẩn Vị Đất Cảng',
    prepTime: '45 phút',
    cookTime: '1 giờ',
    difficulty: 'Trung bình',
    servings: '4 - 5 người',
    ingredients: [
      {
        category: 'Cua tươi, Tảng riêu béo ngậy & Bánh đa đỏ Dư Hàng Kênh',
        items: [
          '700g cua đồng tươi sống (hoặc kết hợp 1 con cua bể chắc thịt): giã nhuyễn lọc lấy 2.5 lít nước cốt cua, khều riêng gạch cua',
          '200g thịt cua bể (hoặc tôm sú tươi bóc nõn) xào săn thơm ngọt',
          '500g bánh đa đỏ Hải Phòng khô (loại sợi bản dày dẻo dai đặc sản làng Dư Hàng Kênh)',
          'Gạch cua tươi chưng dầu màu điều vàng óng thơm phức',
        ],
      },
      {
        category: 'Xương ninh & Nước dùng riêu cua ngọt thanh sóng sánh',
        items: [
          '500g sườn non hoặc xương ống heo chần sạch hầm lấy nước cốt ngọt sâu',
          '4 quả cà chua chín đỏ mọng bổ múi cau',
          '2 quả me chua tươi (hoặc 3 thìa canh giấm bỗng nếp) tạo vị chua thanh dịu mát',
          '2 thìa canh dầu màu điều (tạo màu nước dùng vàng cam óng ả)',
          'Hành khô Hải Phòng thái mỏng phi vàng giòn ruộm thơm nức mũi',
          'Gia vị: Nước mắm cốt nhĩ cá cơm ngon, muối hạt, đường phèn, hạt nêm, tiêu xay',
        ],
      },
      {
        category: 'Topping Chả lá lốt nướng xém, Chả cá & Rau ăn kèm',
        items: [
          'Chả lá lốt: 250g thịt nạc vai xay nhuyễn, mộc nhĩ nấm hương băm nhỏ, hành tím, tiêu xay cuộn lá lốt tươi chiên xém cạnh thơm lừng',
          '200g chả cá Hải Phòng (hoặc chả mọc viên) chiên vàng thái lát mỏng',
          '1 mớ rau muống xanh non nhặt bớt lá chần giòn (hoặc rau rút theo mùa)',
          'Hành hoa, mùi tàu (ngò gai) rửa sạch thái nhỏ',
          'Chí chương Hải Phòng (tương ớt cay lên men gia truyền đất Cảng) hoặc ớt chưng dầu, quất tươi, chanh cốm',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế cua, giã lọc lấy nước cốt và khều gạch cua',
        time: '20 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Nước cốt cua sánh mịn, thơm tự nhiên, gạch cua tươi sạch',
        actionPoints: [
          'Cua đồng ngâm rửa sạch bùn đất, bóc yếm và tách mai cua. Dùng que tăm khều riêng gạch cua vào chén nhỏ.',
          'Phần mai và thân cua cho vào cối cùng 1 thìa cà phê muối hạt giã nhuyễn (hoặc xay mịn). Muối hạt giúp thịt cua kết tảng dày dặn hơn khi nấu.',
          'Châm 2.5 lít nước sạch vào cua giã, khuấy đều rồi lọc qua rây 2 - 3 lần để lấy sạch nước cốt ngọt lịm, bỏ bã xác cua.',
        ],
        description:
          'Tách mai cua khều gạch để riêng. Thân cua giã nhuyễn cùng chút muối hạt, hòa nước lọc qua rây 2 - 3 lần lấy nước cốt cua trong ngọt.',
        tip: 'Cho chút muối hạt khi giã cua giúp thịt cua nổi lên đóng thành tảng to chắc nịch và béo ngậy hơn.',
      },
      {
        step: 2,
        title: 'Ninh nước dùng sườn và nấu tảng riêu cua béo ngậy',
        time: '40 phút',
        heat: 'Lửa vừa rồi hạ nhỏ liu riu',
        goal: 'Tảng riêu cua nổi dày dặn nguyên khối, nước dùng ngọt sâu từ tủy xương',
        actionPoints: [
          'Sườn non chặt khúc vừa ăn, chần nước sôi 3 phút rồi rửa sạch, ninh cùng 1 lít nước trên lửa nhỏ liu riu cho mềm róc thịt.',
          'Đặt nồi nước lọc cua lên bếp, đun lửa vừa và dùng đũa khuấy nhẹ theo một chiều đáy nồi để thịt cua không bị khê bén đáy.',
          'Khi nước bắt đầu nóng và mảng thịt cua kết tảng nổi dần lên mặt, hạ lửa nhỏ liu riu không khuấy nữa để riêu cua đóng thành từng tảng dày vững chắc.',
          'Dùng muôi lỗ nhẹ nhàng vớt các tảng riêu cua ra đĩa riêng để không bị vỡ nát khi nấu.',
          'Trút phần nước ninh sườn non vào nồi nước riêu cua để tạo vị ngọt sâu thanh mát.',
        ],
        description:
          'Ninh sườn non lấy nước ngọt. Nấu nồi nước cua trên lửa vừa, khuấy nhẹ đáy đến khi thịt cua đóng tảng nổi lên thì vớt ra đĩa riêng rồi trút nước sườn vào hòa chung.',
      },
      {
        step: 3,
        title: 'Cuộn chả lá lốt chiên xém, chưng gạch cua và hoàn thiện nước dùng',
        time: '20 phút',
        heat: 'Lửa vừa',
        goal: 'Chả lá lốt thơm lừng xém cạnh, gạch cua vàng óng, nước dùng chua thanh đậm đà',
        actionPoints: [
          'Trộn thịt nạc vai xay với mộc nhĩ nấm hương băm, hành tím băm, 1 thìa nước mắm ngon và tiêu xay. Đặt lá lốt mặt gân lên trên, cho nhân vào cuộn tròn chặt tay rồi chiên lửa vừa cho xém cạnh thơm nức.',
          'Phi thơm hành khô với 2 thìa dầu màu điều, trút gạch cua tươi vào chưng lửa nhỏ cho gạch chín vàng óng thơm phức, rưới 1/2 lên đĩa tảng riêu cua, 1/2 trút vào nồi nước dùng.',
          'Xào 1/2 lượng cà chua trút vào nồi nước dùng cùng nước cốt me dầm nát. Thả nốt phần cà chua múi cau còn lại vào.',
          'Nêm nước mắm cốt nhĩ hảo hạng, đường phèn, muối hạt cho vị nước dùng có độ chua dịu, ngọt sâu từ thịt cua và xương ninh.',
        ],
        description:
          'Cuộn chả lá lốt chiên xém cạnh thơm lừng. Chưng gạch cua với dầu điều thơm phức rồi rưới lên tảng riêu. Xào cà chua trút vào nồi nước dùng cùng nước cốt me và nêm nếm vừa vị.',
        tip: 'Rưới gạch cua chưng dầu điều lên đĩa tảng riêu giúp riêu cua bóng bẩy, vàng ươm và thơm ngậy đặc sắc.',
      },
      {
        step: 4,
        title: 'Chần rau muống giòn xanh và chần bánh đa đỏ dẻo dai',
        time: '10 phút',
        heat: 'Nồi nước sôi sùng sục',
        goal: 'Rau muống xanh mướt giòn sần sật, sợi bánh đa đỏ dẻo dai không nát',
        actionPoints: [
          'Rau muống non nhặt khúc, chần nhanh qua nồi nước sôi có chút muối trong 40 giây rồi vớt ra ngâm ngay vào âu nước đá lạnh để giữ màu xanh ngọc và độ giòn sần sật.',
          'Bánh đa đỏ Hải Phòng khô ngâm nước lạnh 5 phút cho mềm sợi, vớt ra ráo nước.',
          'Khi chuẩn bị ăn, cho bánh đa đỏ vào vợt chần qua nồi nước sôi trong 30 - 45 giây cho sợi bánh chín dẻo dai rồi xốc ráo nước, chia đều vào từng tô lớn.',
        ],
        description:
          'Chần rau muống ngâm nước đá giữ độ giòn xanh. Bánh đa đỏ ngâm mềm rồi chần qua nước sôi 30 - 45 giây cho sợi dẻo dai.',
      },
      {
        step: 5,
        title: 'Trình bày tô bánh đa cua Hải Phòng đầy ắp, quyến rũ sắc hương',
        time: '5 phút',
        heat: 'Nồi nước dùng sôi sùng sục',
        goal: 'Tô bánh đa rực rỡ sắc màu, sợi đỏ dẻo, riêu béo ngậy, chả thơm nức, ngập tràn hành phi',
        actionPoints: [
          'Xếp lên mặt tô bánh đa đỏ: tảng riêu cua vàng óng, 3 - 4 miếng chả lá lốt xém cạnh, chả cá Hải Phòng thái lát, sườn non mềm róc thịt, thịt cua bể xào, rau muống xanh giòn và múi cà chua đỏ cam.',
          'Rắc hành hoa, mùi tàu thái nhỏ và rắc ngập tràn hành khô phi vàng giòn ruộm lên trên.',
          'Múc nước dùng riêu cua sôi sùng sục chan ngập tô bánh đa.',
          'Thưởng thức ngay khi còn bốc khói cùng đĩa rau sống, vắt quất tươi và thêm một thìa chí chương Hải Phòng cay nồng xé lưỡi.',
        ],
        description:
          'Xếp bánh đa ra tô, bày riêu cua, chả lá lốt, chả cá, sườn non, thịt cua, rau muống, rắc hành phi giòn và chan ngập nước dùng sôi sùng sục. Thêm chí chương cay xè và thưởng thức.',
      },
    ],
    chefSecret:
      'Bí quyết cốt tử của bánh đa cua Hải Phòng nằm ở sợi bánh đa đỏ dẻo dai không bị chua nát, tảng riêu cua đồng nguyên khối béo ngậy được chưng cùng gạch cua phi thơm óng ả, và hương thơm quyến rũ không thể lẫn vào đâu được của chả lá lốt xém cạnh. Nước dùng có vị chua thanh thoát từ me/giấm bỗng, ngọt đậm đà từ cua và xương hầm, khi ăn cùng thìa chí chương đỏ au sẽ bùng nổ trọn vẹn phong vị đất Cảng.',
    recommendedSauce:
      'Chí chương Hải Phòng (tương ớt cay lên men gia truyền Hải Phòng) hoặc ớt chưng dầu xào cay.',
  },

  'banh-mi-que-hai-phong': {
    dishId: 'banh-mi-que-hai-phong',
    dishName: 'Bánh Mì Que Hải Phòng Pate Cay Cay',
    seoTitle: 'Cách Làm Bánh Mì Que Hải Phòng Patê Béo Ngậy Giòn Rụm Chuẩn Vị Đất Cảng',
    prepTime: '30 phút',
    cookTime: '20 phút',
    difficulty: 'Dễ',
    servings: '4 - 5 người (12 - 15 chiếc)',
    ingredients: [
      {
        category: 'Vỏ bánh mì que & Patê Cột Đèn béo ngậy',
        items: [
          '12 - 15 chiếc bánh mì que Hải Phòng (loại bánh mì thon nhỏ dài chừng 2 ngón tay, vỏ mỏng xốp)',
          '300g gan heo tươi (ngâm sữa tươi không đường 30 phút để khử sạch độc tố và mùi tanh)',
          '300g thịt nạc vai heo có chút mỡ xay nhuyễn',
          '200g mỡ phần lợn (thái hạt lựu nhỏ để trộn nhân và lót đáy khuôn hấp patê)',
          '1/2 ổ bánh mì xé nhỏ ngâm sữa tươi (bí quyết gia truyền giúp patê mềm mượt dẻo quánh)',
          '1 củ hành tây băm nhỏ, 4 củ hành tím, 1 củ tỏi băm nhuyễn, 50g bơ lạt (hoặc mỡ lợn)',
          'Gia vị: 1 thìa canh tiêu bắc đập dập cay nồng, 1 thìa canh nước mắm cốt nhĩ ngon, hạt nêm, chút ngũ vị hương',
        ],
      },
      {
        category: 'Chí chương Hải Phòng (Tương ớt cay lên men gia truyền)',
        items: [
          '1 bát nhỏ chí chương Hải Phòng (ớt tươi xay nhuyễn ủ lên men chua cay đằm vị)',
          'Chút mỡ patê vàng óng chảy ra khi hấp để quét lòng bánh',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Làm Patê Cột Đèn Hải Phòng béo ngậy, thơm nức mũi',
        time: '35 phút',
        heat: 'Lửa nhỏ hấp cách thủy',
        goal: 'Khối patê mềm mướt như nhung, màu nâu hồng quyến rũ, ngậy béo hương bơ tiêu',
        actionPoints: [
          'Gan heo ngâm sữa tươi 30 phút, rửa sạch thái lát mỏng. Phi thơm hành tỏi với bơ lạt, trút gan heo, thịt vai xay và bánh mì ngâm sữa vào xào chín tới cùng nước mắm, tiêu đập dập.',
          'Cho hỗn hợp vừa xào vào cối xay nhuyễn mịn.',
          'Xếp một lớp mỡ khổ thái mỏng lót dưới đáy khuôn, trút hỗn hợp patê lên trên, rắc hạt tiêu đập dập rồi đậy kín giấy bạc.',
          'Hấp cách thủy lửa nhỏ trong 2 - 3 tiếng (hoặc hầm nồi áp suất 1 tiếng) cho mỡ tan chảy quyện đều vào từng thớ thịt gan, tạo độ béo ngậy tan chảy trên đầu lưỡi.',
        ],
        description:
          'Xào gan heo ngâm sữa với thịt xay, bơ và bánh mì ngâm sữa rồi xay nhuyễn. Lót mỡ phần đáy khuôn, trút patê vào hấp cách thủy cho chín mềm béo ngậy.',
        tip: 'Lót mỡ phần dưới đáy khuôn khi hấp giúp patê có lớp mỡ trong veo béo ngậy đặc trưng của patê Cột Đèn Hải Phòng.',
      },
      {
        step: 2,
        title: 'Rạch bánh mì và phết nhân patê béo ngậy',
        time: '5 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Nhân patê trải đều dọc thân bánh mì que, không bị rách vỏ',
        actionPoints: [
          'Dùng dao sắc rạch một đường dọc theo thân chiếc bánh mì que.',
          'Dùng thìa phết một lớp patê Cột Đèn dày dặn ngập tràn ruột bánh.',
          'Rưới thêm chút nước mỡ patê vàng óng béo ngậy dọc theo khe bánh để khi nướng bánh thơm nức mũi.',
        ],
        description:
          'Rạch dọc thân bánh mì que, phết lớp patê Cột Đèn mềm mướt đầy đặn kèm chút mỡ patê béo ngậy.',
      },
      {
        step: 3,
        title: 'Nướng bánh mì que vàng giòn rụm',
        time: '5 phút',
        heat: '180°C - 200°C',
        goal: 'Vỏ bánh mì vàng ruộm giòn tan vỡ vụn trong miệng, patê bên trong nóng hổi tan chảy',
        actionPoints: [
          'Làm nóng lò nướng hoặc nồi chiên không dầu ở 180°C trước 5 phút.',
          'Xếp các que bánh mì vào nướng trong 3 - 5 phút đến khi vỏ bánh ngả vàng rộm, sờ vào thấy giòn cứng phát ra tiếng lách tách.',
        ],
        description:
          'Nướng bánh mì que trong nồi chiên không dầu hoặc lò nướng 3 - 5 phút ở 180°C đến khi vỏ ngoài vàng giòn rụm.',
      },
      {
        step: 4,
        title: 'Thưởng thức bánh mì que nóng hổi cùng chí chương cay xè',
        time: '2 phút',
        heat: 'Thưởng thức ngay',
        goal: 'Vỏ giòn rụm, patê béo ngậy quyện vị cay nồng xé lưỡi bùng nổ vị giác',
        actionPoints: [
          'Bơm trực tiếp chí chương đỏ au vào ruột bánh hoặc rót chí chương ra đĩa để chấm.',
          'Cắn một miếng giòn tan rụm, cảm nhận vị béo ngậy đậm đà của patê Cột Đèn hòa quyện hoàn hảo với vị cay nồng đặc trưng của chí chương đất Cảng.',
        ],
        description:
          'Chấm ngập bánh mì que giòn tan vào bát chí chương đỏ rực cay nồng nàn và thưởng thức ngay khi còn nóng hổi.',
      },
    ],
    chefSecret:
      'Bánh mì que Hải Phòng là món ăn vặt khô nướng giòn kinh điển, hoàn toàn không có nước dùng. Bí quyết nằm ở lớp vỏ bánh mì nướng giòn tan phát ra tiếng rôm rốp, nhân patê Cột Đèn béo ngậy tự làm với mỡ phần tan chảy, và không thể thiếu bát chí chương (tương ớt gia truyền Hải Phòng) cay nồng xé lưỡi.',
    recommendedSauce:
      'Chí chương Hải Phòng (tương ớt cay lên men gia truyền Hải Phòng) cay xè đặc trưng.',
  },

  'pho-cuon-thit-bo': {
    dishId: 'pho-cuon-thit-bo',
    dishName: 'Phở Cuốn Thịt Bò Rau Thơm Ngũ Xã',
    seoTitle: 'Cách Làm Phở Cuốn Hà Nội Thịt Bò Tươi Ngon Nước Chấm Chua Ngọt Chuẩn Vị',
    prepTime: '25 phút',
    cookTime: '15 phút',
    difficulty: 'Dễ',
    servings: '3 - 4 người (15 - 20 cuốn)',
    ingredients: [
      {
        category: 'Bánh phở tráng bản to & Rau sống thanh mát',
        items: [
          '500g bánh phở cuốn tráng bản vuông (loại bánh tươi mềm mướt, dẻo dai, không bị rách)',
          '1 cây xà lách tươi giòn rửa sạch vẩy thật ráo nước',
          'Rau thơm phố cổ: rau mùi ta (ngò rí), rau húng láng (húng quế), kinh giới, ngổ hương',
        ],
      },
      {
        category: 'Thịt bò xào lăn thơm nức tỏi',
        items: [
          '400g thịt thăn bò hoặc thịt bắp bò tươi ngon, thái lát mỏng bản to',
          '1 củ hành tây bổ múi cau mỏng xào cùng thịt bò',
          '1 củ tỏi ta băm nhỏ (chia nửa ướp bò, nửa phi thơm)',
          '1 thìa canh dầu hào ngon, 1 thìa canh nước tương, 1 thìa cà phê tiêu xay, dầu ăn',
        ],
      },
      {
        category: 'Nước chấm chua ngọt tỏi ớt chuẩn vị Ngũ Xã',
        items: [
          'Nước mắm cốt nhĩ truyền thống: 3 thìa canh',
          'Đường cát: 2.5 thìa canh, giấm gạo nếp: 2 thìa canh, nước cốt chanh tươi: 1 thìa canh, nước lọc ấm: 6 thìa canh',
          'Tỏi ta băm nhuyễn, ớt hiểm đỏ băm nhỏ (để tỏi ớt nổi bồng bềnh)',
          'Đu đủ xanh và cà rốt tỉa hoa thái lát mỏng ngâm chua ngọt giòn sần sật',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Ướp và xào thịt bò thăn chín tới mềm mọng nước',
        time: '15 phút',
        heat: 'Lửa cực lớn',
        goal: 'Thịt bò chín tới mềm mọng ngọt đậm đà, thơm lừng mùi tỏi phi, không ra nước',
        actionPoints: [
          'Thịt bò thái lát mỏng ngang thớ, ướp với 1/2 lượng tỏi băm, 1 thìa dầu hào, 1 thìa dầu ăn và chút tiêu trong 15 phút.',
          'Đặt chảo lên bếp mở lửa cực lớn, phi thơm lượng tỏi còn lại với 2 thìa dầu ăn.',
          'Trút thịt bò và hành tây vào đảo nhanh tay liên tục trên lửa lớn trong 2 - 3 phút đến khi thịt vừa chín tới tái mềm thì tắt bếp ngay, trút ra đĩa cho nguội bớt.',
        ],
        description:
          'Thái thịt bò mỏng ướp tỏi dầu hào. Xào lửa cực lớn cùng hành tây trong 2 phút cho bò chín mềm mọng ngọt rồi trút ra đĩa.',
        tip: 'Xào lửa thật lớn và đảo nhanh tay là bí quyết vàng để thịt bò mềm ngọt mọng nước mà không bị dai hay ra nước ướt bánh phở khi cuốn.',
      },
      {
        step: 2,
        title: 'Pha bát nước mắm chua ngọt tỏi ớt chuẩn phố Ngũ Xã',
        time: '10 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Bát nước chấm chua ngọt thanh tao hài hòa, tỏi ớt nổi bồng bềnh đẹp mắt',
        actionPoints: [
          'Đu đủ và cà rốt thái lát mỏng bóp chút muối rồi ngâm giấm đường 15 phút cho giòn sần sật.',
          'Hòa tan 6 thìa nước ấm với 2.5 thìa đường, 3 thìa nước mắm cốt ngon, 2 thìa giấm và 1 thìa nước cốt chanh.',
          'Khuấy tan hoàn toàn rồi thả tỏi ớt băm nhuyễn vào (tỏi ớt sẽ nổi bồng bềnh trên mặt bát nước chấm), thả thêm đu đủ cà rốt ngâm chua ngọt.',
        ],
        description:
          'Pha nước mắm cốt với đường, giấm chanh và nước ấm cho vị chua ngọt dịu mát. Thả tỏi ớt băm nổi bồng bềnh cùng đu đủ cà rốt giòn sần sật.',
      },
      {
        step: 3,
        title: 'Cuộn phở cuốn tròn đều, mềm mướt chắc tay',
        time: '10 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Cuốn phở trắng muốt căng tròn bóng bẩy, nhân thịt và rau cuộn chặt tay không rách',
        actionPoints: [
          'Trải từng lá bánh phở cuốn vuông vắn lên mặt phẳng đĩa hoặc thớt sạch.',
          'Xếp lá xà lách tươi xanh, vài cọng rau mùi ta, rau húng láng lên trên.',
          'Gắp một lượng thịt bò xào hành tây vừa vặn đặt ngay ngắn vào giữa phần rau.',
          'Nhẹ nhàng cuộn tròn đều tay thật chắc chắn nhưng khéo léo để lá bánh phở ôm trọn lấy nhân mà không bị rách vỡ.',
        ],
        description:
          'Trải lá bánh phở vuông, xếp xà lách, rau thơm và thịt bò xào lên rồi cuộn tròn chắc tay thành từng cuốn thon dài đẹp mắt.',
      },
      {
        step: 4,
        title: 'Trình bày và thưởng thức phở cuốn Hà Nội tươi mát',
        time: '2 phút',
        heat: 'Thưởng thức ngay',
        goal: 'Đĩa phở cuốn trắng ngần mát mắt, chấm ngập bát mắm chua ngọt thanh vị',
        actionPoints: [
          'Xếp các cuốn phở ngay ngắn ra đĩa tròn, có thể cắt đôi vát chéo.',
          'Chấm ngập cuốn phở vào bát nước chấm chua ngọt thơm nức tỏi ớt, ăn kèm miếng đu đủ giòn sần sật để cảm nhận trọn vẹn sự thanh tao nức tiếng của phố ẩm thực Ngũ Xã.',
        ],
        description:
          'Bày phở cuốn ra đĩa, chấm cùng nước mắm chua ngọt tỏi ớt và đu đủ giòn sần sật. Thưởng thức hương vị tươi mát, thanh tao đậm chất Hà Thành.',
      },
    ],
    chefSecret:
      'Phở cuốn Hà Nội (làng Ngũ Xã) là món cuốn tươi nguội thanh mát, hoàn toàn không có nước dùng chan như phở nước. Bánh phở phải mềm dai không nhão, thịt bò xào lửa lớn ngọt mềm mọng nước, và đặc biệt bát nước mắm chấm phải pha chua ngọt thanh tao, tỏi ớt băm nổi bồng bềnh đẹp mắt.',
    recommendedSauce:
      'Nước mắm chua ngọt tỏi ớt pha thanh vị cùng đu đủ, cà rốt giòn chua ngọt.',
  },

  'cha-ca-la-vong-ha-noi': {
    dishId: 'cha-ca-la-vong-ha-noi',
    dishName: 'Chả Cá Lã Vọng Thì Là Hành Hoa Chảo Gang',
    seoTitle: 'Cách Làm Chả Cá Lã Vọng Hà Nội Nướng Than Hoa, Xèo Xèo Chảo Mỡ Chuẩn Vị Phố Cổ',
    prepTime: '40 phút',
    cookTime: '20 phút',
    difficulty: 'Trung bình',
    servings: '4 - 5 người',
    ingredients: [
      {
        category: 'Cá lăng tươi & Gia vị ướp riềng mẻ nghệ gia truyền',
        items: [
          '1kg cá lăng tươi sống (hoặc cá quả, cá nheo chắc thịt): lọc lấy phi lê thịt nạc dày, thái miếng con chì dày cỡ 1.5 - 2cm',
          '4 thìa canh nước cốt riềng già (riềng củ già giã nhuyễn vắt lấy nước cốt đặc dậy mùi thơm cay ấm)',
          '3 thìa canh mẻ ngấu chua thanh tao (lọc qua rây mịn khử sạch bã)',
          '2 thìa canh mắm tôm ngon hảo hạng (chọn mắm tôm mịn màu hoa cà)',
          '2 thìa canh nước cốt nghệ tươi giã nhuyễn (hoặc 1 thìa cà phê bột nghệ tạo sắc vàng hoàng gia)',
          '1 thìa canh đường phèn giã mịn, 1 thìa cà phê tiêu sọ trắng xay, 2 thìa canh mỡ lợn (hoặc dầu ăn) để ướp ngấm',
        ],
      },
      {
        category: 'Rau thơm, Mỡ lợn & Ăn kèm trên chảo xèo xèo',
        items: [
          '300g thì là tươi non (cắt khúc dài khoảng 4 - 5cm)',
          '300g hành hoa tươi (phần cọng trắng chẻ dọc, phần lá xanh cắt khúc dài bằng thì là)',
          '100g mỡ phần lợn tươi (thắng lấy mỡ nước và tóp mỡ giòn để đảo cá xèo xèo trên chảo gang)',
          '800g bún rối sợi nhỏ trắng muốt mượt mà',
          '150g lạc rang (đậu phộng) vàng giòn rụm, xát sạch vỏ giã dập',
          'Bánh đa nướng mè giòn tan bẻ miếng vừa ăn',
        ],
      },
      {
        category: 'Pha mắm tôm đánh sủi bọt chuẩn Tràng An',
        items: [
          '4 thìa canh mắm tôm ngon nguyên chất',
          '1 thìa canh rượu trắng (khử tanh và giúp mắm tôm bông xốp mịn màng)',
          '1.5 thìa canh đường cát, 1 quả chanh tươi vắt lấy nước cốt',
          'Ớt hiểm đỏ thái lát, 1 - 2 giọt tinh dầu cà cuống (nếu có, linh hồn ẩm thực Hà Thành xưa)',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế phi lê cá lăng và ướp riềng mẻ nghệ đậm đà',
        time: '20 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Từng miếng cá lăng thấm đẫm riềng mẻ, màu vàng óng ả, thịt se chắc không nát',
        actionPoints: [
          'Phi lê cá lăng rửa sạch với nước muối loãng pha chút rượu gừng khử sạch nhớt, thấm thật khô bằng khăn giấy, thái miếng dày 1.5 - 2cm vừa miệng.',
          'Trong bát lớn, trộn đều nước cốt riềng già, mẻ ngấu lọc mịn, mắm tôm ngon, nước cốt nghệ, đường phèn, tiêu trắng xay và 2 thìa mỡ lợn.',
          'Thoa đều hỗn hợp gia vị lên từng miếng cá, dùng tay massage nhẹ rồi ướp trong 30 - 45 phút cho ngấm sâu vào từng thớ thịt cá.',
        ],
        description:
          'Thái cá lăng miếng vừa ăn, ướp nước cốt riềng, mẻ ngấu, mắm tôm, nghệ tươi và mỡ lợn trong 30 phút cho ngấm sâu gia vị.',
        tip: 'Vắt lấy nước cốt riềng thay vì để cả bã giúp khi nướng cá không bị cháy khét bề mặt mà vẫn thơm nức mùi riềng ấm.',
      },
      {
        step: 2,
        title: 'Kẹp vỉ nướng than hoa cho cá vàng ươm xém cạnh',
        time: '15 phút',
        heat: 'Than hoa đỏ rực không khói',
        goal: 'Hai mặt cá nướng vàng ruộm xém cạnh thơm lừng mùi than khói, bên trong thịt chín tới mọng nước',
        actionPoints: [
          'Xếp từng miếng cá lăng ngay ngắn vào vỉ nướng sắt có quét một lớp mỡ lợn mỏng chống dính.',
          'Quạt than hoa cho hồng rực, đặt vỉ cá lên nướng cách mặt than 15cm. Lật trở đều tay liên tục.',
          'Thỉnh thoảng dùng chổi quét thêm chút nước mỡ ướp lên mặt cá để miếng cá không bị khô.',
          'Nướng khoảng 10 - 12 phút đến khi hai mặt cá săn vàng óng, xém cạnh bốc khói ngào ngạt thì gỡ cá ra đĩa.',
        ],
        description:
          'Kẹp cá vào vỉ nướng trên than hoa đỏ rực, lật trở đều tay và phết mỡ liên tục đến khi cá chín xém vàng ươm thơm nức mũi.',
      },
      {
        step: 3,
        title: 'Đánh mắm tôm sủi bọt bông xốp thanh tao',
        time: '5 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Bát mắm tôm sủi bọt trắng bông như tuyết, vị chua ngọt hài hòa dậy mùi thơm dịu',
        actionPoints: [
          'Cho 4 thìa mắm tôm, 1.5 thìa đường, 1 thìa rượu trắng vào bát, vắt nước cốt 1 quả chanh tươi.',
          'Dùng đũa đánh thật nhanh và mạnh tay theo một chiều cho đến khi mắm tôm sủi bọt bông xốp ngập miệng bát.',
          'Thả vài lát ớt hiểm đỏ tươi và nhỏ 1 - 2 giọt tinh dầu cà cuống vào cho dậy mùi thơm quý phái đặc trưng phố cổ.',
        ],
        description:
          'Đánh mắm tôm cùng đường, rượu trắng và nước cốt chanh đến khi nổi bọt bông xốp mịn. Thêm ớt tươi và tinh dầu cà cuống.',
        tip: 'Thêm thìa nhỏ rượu trắng là bí quyết cổ truyền giúp mắm tôm nhanh sủi bọt bông tuyết và khử sạch hoàn toàn vị gắt tanh.',
      },
      {
        step: 4,
        title: 'Đảo cá xèo xèo cùng hành hoa và thì là trên chảo gang',
        time: '5 phút',
        heat: 'Lửa vừa trên bếp tại bàn',
        goal: 'Chảo cá sôi xèo xèo thơm nức mũi, hành thì là chín tái bóng bẩy ngấm mỡ cá',
        actionPoints: [
          'Đặt chảo gang nhỏ lên bếp cồn hoặc bếp từ mini giữa bàn ăn, múc 2 - 3 thìa mỡ lợn (hoặc mỡ thắng tóp giòn) đun sôi xèo xèo.',
          'Gắp từng miếng cá lăng nướng vàng vào chảo, phủ ngập tràn thì là và hành hoa chẻ lên trên.',
          'Dùng đũa đảo nhẹ tay trong 1 - 2 phút cho hành và thì là chín tái, ngấm mỡ cá bóng mượt thơm ngào ngạt.',
        ],
        description:
          'Cho mỡ lợn vào chảo gang đun sôi, thả cá nướng cùng ngập tràn hành hoa và thì là vào đảo xèo xèo 1 - 2 phút cho chín tái thơm lừng.',
      },
      {
        step: 5,
        title: 'Thưởng thức chả cá Lã Vọng chuẩn phong vị người Tràng An',
        time: '2 phút',
        heat: 'Thưởng thức nóng hổi tại bàn',
        goal: 'Bát bún hài hòa màu sắc, cá béo ngậy ngọt mềm, lạc giòn bùi, mắm tôm bốc khói ngất ngây',
        actionPoints: [
          'Gắp một chút bún rối trắng muốt vào bát riêng.',
          'Gắp miếng cá lăng vàng ươm béo ngậy, gắp hành hoa và thì là nóng hổi bóng mỡ từ chảo đặt lên trên sợi bún.',
          'Rắc một nhúm lạc rang vàng giã dập và bẻ chút bánh đa nướng giòn rụm.',
          'Rưới một thìa mắm tôm đánh sủi bọt thơm nức, thêm 1 thìa mỡ sôi nóng hổi từ chảo rưới lên cho bốc khói.',
          'Trộn nhẹ và thưởng thức ngay khi còn nóng bỏng môi để cảm nhận sự giao thoa tinh tế bậc nhất của ẩm thực Hà Thành.',
        ],
        description:
          'Cho bún vào bát, xếp cá nướng, hành thì là từ chảo gang, rắc lạc rang, bánh đa nướng rồi rưới mắm tôm sủi bọt và thìa mỡ sôi nóng hổi. Thưởng thức ngay tại bàn.',
      },
    ],
    chefSecret:
      'Chả cá Lã Vọng là món nướng than hoa kết hợp xào chảo mỡ xèo xèo tại bàn, tuyệt đối không phải món nấu canh hay bún nước dùng chan. Tinh hoa gia truyền số 14 phố Chả Cá xưa nằm ở 4 điểm: Chọn cá lăng thịt chắc ngọt béo không bở; Ướp bằng nước cốt riềng già đậm đặc và mẻ ngấu chua thanh; Nướng vỉ trên than hoa cho xém cạnh thơm nức khói; và ăn kèm ngập tràn thì là, hành hoa cùng bát mắm tôm đánh sủi bọt bông tuyết.',
    recommendedSauce:
      'Mắm tôm đánh sủi bọt bông xốp với rượu trắng, nước cốt chanh, ớt tươi và tinh dầu cà cuống (hoặc nước mắm chanh tỏi ớt cho người không quen ăn mắm tôm).',
  },

  'banh-cuon-nong-thit-bam': {
    dishId: 'banh-cuon-nong-thit-bam',
    dishName: 'Bánh Cuốn Nóng Thịt Băm Mộc Nhĩ Cà Cuống',
    seoTitle: 'Cách Làm Bánh Cuốn Nóng Vỏ Mỏng Mướt, Nước Chấm Ấm Nóng Chuẩn Vị Hà Nội',
    prepTime: '30 phút (ngâm bột)',
    cookTime: '25 phút',
    difficulty: 'Trung bình',
    servings: '4 người (đĩa đầy đặn)',
    ingredients: [
      {
        category: 'Bột bánh cuốn mỏng mướt (pha chảo hoặc nồi hơi)',
        items: [
          '200g bột gạo tẻ ngon (chọn loại bột mới, hạt mịn không có mùi chua)',
          '70g bột năng (tạo độ dai dẻo mướt trong suốt cho vỏ bánh)',
          '30g bột bắp (hoặc bột nếp, giúp bánh giữ độ mềm mượt khi nguội)',
          '800ml nước lọc nguội (ngâm bột 2 - 3 tiếng, chắt bỏ bớt nước trong và bù lại lượng nước tương đương để bánh trong veo không mùi bột cũ)',
          '1 thìa cà phê muối tinh, 1 thìa canh dầu ăn',
        ],
      },
      {
        category: 'Nhân thịt băm mộc nhĩ nấm hương thơm lừng',
        items: [
          '300g thịt nạc vai (nạc dăm) heo có chút mỡ xay nhỏ',
          '30g mộc nhĩ khô ngâm nở, rửa sạch thái sợi nhỏ băm vụn',
          '20g nấm hương khô ngâm nở thái nhỏ thơm ngát',
          '4 củ hành khô băm nhỏ, 1 thìa canh nước mắm cốt nhĩ ngon, 1 thìa cà phê tiêu bắc xay, hạt nêm, dầu ăn',
        ],
      },
      {
        category: 'Hành phi vàng giòn & Topping ăn kèm',
        items: [
          '200g hành tím ta (bào mỏng đều, phơi se mặt rồi phi vàng giòn ruộm; giữ lại phần dầu phi hành)',
          '250g chả quế Hà Nội nướng vàng thơm (thái lát vát mỏng) hoặc chả lụa',
          'Rau thơm ăn kèm: rau mùi ta (ngò rí), rau húng bạc hà tươi non',
        ],
      },
      {
        category: 'Nước chấm bánh cuốn ấm nóng gia truyền',
        items: [
          'Nước mắm cốt nhĩ ngon: 4 thìa canh',
          'Đường cát: 3 thìa canh, giấm gạo nếp (hoặc nước cốt quất tươi): 2 thìa canh',
          'Nước hầm xương heo ấm nóng (hoặc nước lọc ấm): 180ml',
          'Tỏi băm, ớt tươi thái lát, 1 - 2 giọt tinh dầu cà cuống (bí quyết gia truyền thơm quý phái phố cổ)',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Pha bột bánh cuốn và ủ bột mỏng mướt',
        time: '30 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Bột tan hoàn toàn, trong veo mịn màng, không còn mùi bột chua',
        actionPoints: [
          'Hòa tan 200g bột gạo, 70g bột năng, 30g bột bắp với 800ml nước lọc và 1 thìa cà phê muối.',
          'Để bột lắng trong 2 tiếng, khéo léo chắt phần nước trong trên mặt đổ đi, rồi chế thêm lượng nước lọc mới đúng bằng lượng nước vừa chắt ra (thay nước giúp bánh trong veo, mềm dai không mùi chua).',
          'Trước khi tráng, khuấy đều bột và cho vào 1 thìa canh dầu ăn để bánh bóng mượt róc chảo.',
        ],
        description:
          'Hòa bột gạo, bột năng, bột bắp với nước và muối. Để bột lắng, chắt bớt nước trong thay nước mới rồi thêm chút dầu ăn để bánh mỏng mướt.',
        tip: 'Kỹ thuật chắt thay nước trong là bí quyết vàng của làng bánh cuốn Thanh Trì giúp lá bánh tráng ra trong veo, mềm mướt không còn mùi bột cũ.',
      },
      {
        step: 2,
        title: 'Xào nhân thịt băm mộc nhĩ nấm hương đậm đà',
        time: '10 phút',
        heat: 'Lửa vừa',
        goal: 'Thịt chín săn thơm nức mùi hành tiêu nấm hương, nhân ẩm ngọt không bị khô xác',
        actionPoints: [
          'Phi thơm 2 thìa hành khô băm nhỏ với dầu ăn trên chảo nóng.',
          'Trút thịt nạc vai xay vào xào săn trên lửa lớn, dầm tơi thịt không để vón cục.',
          'Cho mộc nhĩ và nấm hương băm nhỏ vào đảo đều trong 3 - 4 phút cho chín thơm ngậy.',
          'Nêm 1 thìa nước mắm cốt nhĩ ngon, hạt nêm và rắc thật nhiều tiêu xay cho dậy mùi thơm lừng rồi tắt bếp trút ra đĩa riêng.',
        ],
        description:
          'Phi thơm hành khô, xào thịt nạc xay cùng mộc nhĩ, nấm hương. Nêm nước mắm cốt nhĩ, tiêu xay thơm lừng và giữ cho nhân ẩm béo.',
      },
      {
        step: 3,
        title: 'Tráng bánh cuốn mỏng tang bằng chảo chống dính',
        time: '15 phút',
        heat: 'Lửa nhỏ vừa',
        goal: 'Lá bánh mỏng trong suốt, mềm dai không rách, cuộn nhân chắc tay',
        actionPoints: [
          'Đặt chảo chống dính lên bếp ở lửa nhỏ vừa, dùng cọ quét một lớp dầu phi hành mỏng tang khắp mặt chảo.',
          'Khuấy đều âu bột, múc một muôi nhỏ bột đổ vào lòng chảo, nghiêng đều tay để bột tráng một lớp mỏng dính khắp đáy chảo.',
          'Đậy vung kín trong 25 - 30 giây đến khi thấy lá bánh chuyển màu trong suốt và phồng rộp nhẹ là bánh đã chín.',
          'Úp nhanh chảo lên một chiếc đĩa to (hoặc mâm) đã quét sẵn dầu phi hành.',
          'Rải một thìa nhân thịt mộc nhĩ vào giữa rồi nhẹ nhàng cuộn tròn lá bánh lại thật khéo léo.',
        ],
        description:
          'Quét lớp dầu mỏng lên chảo chống dính, đổ muôi bột mỏng nghiêng đều, đậy vung 25 giây cho bánh chín trong suốt. Úp ra đĩa, trải nhân thịt rồi cuộn tròn.',
        tip: 'Chảo chỉ cần quét lớp dầu thật mỏng (lau bớt nếu thừa dầu) để bột bám đều mặt chảo không bị trượt co rúm lại.',
      },
      {
        step: 4,
        title: 'Pha bát nước chấm bánh cuốn ấm nóng chuẩn vị Hà Nội',
        time: '5 phút',
        heat: 'Ấm nóng 50°C - 60°C',
        goal: 'Bát nước chấm màu hổ phách ấm nóng, vị chua ngọt thanh tao dịu nhẹ',
        actionPoints: [
          'Hòa tan 180ml nước hầm xương ấm (hoặc nước lọc ấm) với 3 thìa đường cát, 4 thìa nước mắm cốt nhĩ ngon và 2 thìa giấm gạo nếp.',
          'Khuấy đều cho tan đường, nếm thấy vị chua ngọt thanh dịu nhẹ nhàng, không mặn gắt.',
          'Thả thêm vài lát ớt tươi, tỏi băm và nhỏ 1 giọt tinh dầu cà cuống dậy hương thơm nức.',
          'Thả các lát chả quế thái mỏng ngâm trực tiếp vào bát nước mắm ấm nóng để miếng chả quế ngấm vị béo ngọt ấm nồng.',
        ],
        description:
          'Pha nước hầm xương ấm với nước mắm cốt nhĩ, đường, giấm nếp cho vị chua ngọt thanh dịu. Thả ớt tươi, tinh dầu cà cuống và ngâm ngập chả quế vào bát nước chấm nóng.',
      },
      {
        step: 5,
        title: 'Bày đĩa bánh cuốn nóng hổi, rắc hành phi và thưởng thức',
        time: '3 phút',
        heat: 'Thưởng thức nóng hổi ngay',
        goal: 'Đĩa bánh cuốn trắng mướt bóng bẩy, hành phi giòn tan, nước chấm bốc khói nghi ngút',
        actionPoints: [
          'Xếp từng cuộn bánh cuốn nóng hổi ngay ngắn lên đĩa.',
          'Dùng chổi quét một lớp dầu phi hành bóng bẩy lên mặt bánh, rắc thật nhiều hành tím phi vàng giòn ruộm thơm nức mũi.',
          'Bày kèm đĩa rau mùi ta, rau húng bạc hà tươi non xanh mát.',
          'Gắp miếng bánh cuốn nóng mềm mướt chấm ngập vào bát nước chấm ấm nóng có miếng chả quế thơm nức, cảm nhận trọn vẹn vị mềm mượt, béo bùi và giòn rụm tan chảy trong miệng.',
        ],
        description:
          'Quét dầu hành phi lên bánh cuốn, rắc ngập tràn hành phi giòn ruộm. Ăn kèm chả quế ngâm nước chấm ấm nóng và rau mùi ta, húng bạc hà.',
      },
    ],
    chefSecret:
      'Bánh cuốn nóng Hà Nội tinh tế ở 3 điểm vàng: Vỏ bánh mỏng tang trong suốt nhờ kỹ thuật chắt thay nước bột và pha bột năng đúng tỷ lệ; Nhân xào đủ vị ngọt béo từ nấm hương, mộc nhĩ và mỡ lợn phi hành; Đặc biệt bát nước mắm chấm bắt buộc phải pha bằng nước ấm nóng vị chua ngọt thanh dịu, ngâm chả quế vàng thơm và rắc đẫm hành ta tự phi giòn ruộm thơm lừng.',
    recommendedSauce:
      'Nước mắm pha ấm nóng chua ngọt thanh tao thả ớt tươi, ngâm ngập lát chả quế nướng và 1 giọt tinh dầu cà cuống.',
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
  'xoi-xeo-ha-noi': {
    dishId: 'xoi-xeo-ha-noi',
    dishName: 'Xôi Xéo Hà Nội Ruốc Hành Phi',
    seoTitle: 'Cách Nấu Xôi Xéo Hà Nội Dẻo Thơm Óng Ả Chuẩn Vị Truyền Thống Phố Cổ',
    prepTime: '6 - 8 giờ (ngâm gạo & đậu)',
    cookTime: '45 - 50 phút (đồ 2 lửa)',
    difficulty: 'Trung bình',
    servings: '4 - 5 người',
    ingredients: [
      {
        category: 'Nguyên liệu nếp xôi (Hạt dẻo vàng óng)',
        items: [
          '500g gạo nếp cái hoa vàng hạt mẩy tròn đều',
          '1 củ nghệ tươi già giã lấy nước cốt (hoặc 1 thìa cà phê tinh bột nghệ nguyên chất)',
          '1 thìa cà phê muối hạt',
          '3 - 4 thìa canh mỡ gà ta thắng nguyên chất',
        ],
      },
      {
        category: 'Nguyên liệu đậu xanh (Mịn mượt tơi xốp)',
        items: [
          '300g đậu xanh tiêu cà vỏ (loại hạt nhỏ thơm bùi)',
          '1/2 thìa cà phê muối tinh',
          '1 thìa canh mỡ gà nóng (trộn khi giã)',
        ],
      },
      {
        category: 'Hành phi & mỡ gà gia truyền',
        items: [
          '200g mỡ gà ta lá (thắng lấy nước mỡ gà vàng sóng sánh)',
          '250g hành tím khô Bắc (hành Kinh Môn hoặc hành ta thái mỏng)',
          'Dầu ăn hoặc mỡ lợn để phi ngập hành',
        ],
      },
      {
        category: 'Thức ăn kèm truyền thống (Tùy chọn)',
        items: [
          'Ruốc thịt heo (chà bông) sao tơi sợi nhỏ',
          'Chả quế nướng thơm giòn hoặc giò lụa thái lát',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Ngâm gạo nếp tạo màu vàng nghệ tự nhiên & ngâm đậu xanh',
        time: '6 - 8 giờ (ngâm qua đêm)',
        heat: 'Nhiệt độ phòng',
        goal: 'Hạt gạo no nước, ngấm đều màu vàng óng ả từ nghệ tự nhiên, hạt đậu xanh mềm tơi',
        actionPoints: [
          'Nghệ tươi già cạo vỏ, giã nát rồi hòa cùng 1 bát nước ấm, lọc qua rây lấy nước cốt nghệ trong vắt (không để lại bã lợn cợn).',
          'Gạo nếp cái hoa vàng vo nhẹ tay 2 lần cho sạch bụi cám, tuyệt đối không chà xát mạnh làm vỡ hạt gạo.',
          'Ngâm gạo nếp cùng nước cốt nghệ, hòa thêm 1 thìa cà phê muối hạt trong 6 - 8 tiếng (hoặc qua đêm). Muối giúp hạt xôi sau khi đồ đậm đà và lâu thiu.',
          'Đậu xanh tiêu đãi sạch, nhặt bỏ hạt sâu lép rồi ngâm nước ấm 3 - 4 tiếng với 1/2 thìa cà phê muối tinh.',
          'Sau khi ngâm đủ thời gian, đổ nếp và đậu ra rổ riêng, xả nhẹ nước lạnh rồi để ráo nước hoàn toàn trong 15 - 20 phút.',
        ],
        description:
          'Gạo nếp cái hoa vàng vo nhẹ, ngâm cùng nước cốt nghệ tươi pha loãng và 1 thìa muối hạt khoảng 6 - 8 tiếng cho gạo ngậm đủ nước và nhuộm màu vàng rơm tự nhiên. Đậu xanh đãi sạch ngâm nước ấm 3 - 4 tiếng cho mềm.',
        tip: 'Chỉ dùng một lượng nước cốt nghệ vừa đủ để hạt nếp có màu vàng ươm dịu mắt như hoa cúc, tránh cho quá nhiều nghệ sẽ khiến xôi bị nồng hắc mùi nghệ tươi.',
      },
      {
        step: 2,
        title: 'Hấp đậu xanh, giã nhuyễn & nắm đậu xanh thành quả (Bí quyết cốt lõi)',
        time: '25 phút',
        heat: 'Lửa vừa (hơi nước bốc đều)',
        goal: 'Đậu xanh chín bở tơi, giã nhuyễn mịn như nhung và nắm chặt thành quả chắc nịch',
        actionPoints: [
          'Trộn đều đậu xanh đã ráo nước với một chút xíu muối tinh.',
          'Cho đậu vào xửng hấp, dùng ngón tay dùi 4 - 5 lỗ thông hơi để hơi nước bốc lên đều khắp xửng. Hấp khoảng 20 - 25 phút đến khi miết thử hạt đậu thấy tan nát mịn không còn sượng.',
          'Trút ngay đậu ra cối giã hoặc âu lớn khi còn đang nóng bốc khói nghi ngút. Dùng chày giã thật nhuyễn hoặc dùng muôi miết mạnh tay liên tục đến khi đậu mịn mượt không còn hạt lợn cợn.',
          'Rưới 1 thìa canh mỡ gà nóng vào trộn đều cho đậu ngậy và tăng độ kết dính.',
          'Khi đậu còn nóng ấm, dùng hai lòng bàn tay nắm và nén thật chặt tay thành 2 - 3 khối tròn/bầu dục chắc nịch (cỡ quả bưởi nhỏ hoặc quả bóng tennis). Nắm càng chặt thì khi thái xéo lát đậu càng mỏng dính, không bị vỡ vụn.',
        ],
        description:
          'Đậu xanh hấp chín bở, trút ra khi còn đang bốc khói nóng hổi rồi giã thật nhuyễn mịn cùng chút mỡ gà. Nhanh tay dùng lòng bàn tay nén chặt thành những khối tròn chắc nịch.',
        tip: 'Phải giã và nắm đậu ngay khi đậu còn đang nóng bốc khói. Nếu để đậu nguội, đậu sẽ bị khô tơi và hoàn toàn không thể nén thành quả được.',
      },
      {
        step: 3,
        title: 'Thắng mỡ gà vàng ươm & phi hành khô giòn tan thơm nức',
        time: '20 phút',
        heat: 'Lửa nhỏ liu riu (thắng mỡ) & Lửa vừa (phi hành)',
        goal: 'Nước mỡ gà vàng óng thơm ngậy, hành phi màu vàng cánh gián giòn rụm không cháy đắng',
        actionPoints: [
          'Mỡ gà ta rửa sạch với chút muối và gừng, thái hạt lựu hoặc miếng nhỏ. Cho vào chảo gang cùng 2 thìa canh nước lọc, đun lửa vừa cho nước cạn và mỡ bắt đầu tiết ra.',
          'Hạ lửa nhỏ liu riu đun đến khi tóp mỡ gà teo vàng ruộm thì vớt tóp ra, chắt lấy phần mỡ gà lỏng vàng ươm thơm nức mũi.',
          'Hành tím khô bóc vỏ, dùng dao sắc thái lát đều tay theo chiều dọc củ hành (độ dày đồng đều khoảng 1.5mm). Rải hành ra rổ phơi gió hoặc hong quạt 30 phút cho se nhẹ mặt.',
          'Đun sôi chảo dầu ăn/mỡ gà trên lửa vừa, thả hành vào phi. Đảo nhẹ tay đều đặn theo một chiều.',
          'Khi thấy hành chuyển sang màu vàng rơm nhạt (khoảng 80% độ vàng) và cánh hành hơi co lại thì lập tức tắt bếp và dùng muôi thủng vớt ngay ra rây lót giấy thấm dầu.',
          'Sức nóng của dầu còn đọng lại sẽ giúp hành tiếp tục chuyển sang màu vàng cánh gián hoàn hảo, giòn tan rôm rốp và để cả tuần vẫn giòn thơm.',
        ],
        description:
          'Mỡ gà rửa sạch đem thắng lửa nhỏ lấy nước mỡ gà vàng óng. Hành tím thái lát mỏng phơi se mặt rồi phi trên lửa vừa đến khi chớm ngả vàng rơm thì vớt ra ngay vào rây thấm dầu để hành tự vàng giòn cánh gián.',
        tip: 'Không đợi hành vàng sẫm trong chảo mới vớt ra vì dầu nóng sẽ làm hành bị cháy khét và đắng ngắt. Vớt lúc hành vừa chớm vàng rơm nhạt là chuẩn nhất.',
      },
      {
        step: 4,
        title: 'Kỹ thuật đồ xôi 2 lửa - Bí quyết hạt nếp dẻo quánh óng ả',
        time: '35 - 40 phút (2 lần đồ)',
        heat: 'Lửa to nước sôi sùng sục',
        goal: 'Từng hạt nếp căng mẩy bóng bẩy, dẻo mềm không dính bết, để từ sáng đến tối vẫn mềm thơm',
        actionPoints: [
          'Đồ lửa 1 (25 - 30 phút): Đun sôi nước trong nồi đồ xôi. Trút gạo nếp đã ráo nước vào xửng, dùng đũa xăm nhiều lỗ thông hơi từ đáy lên. Đậy nắp kín, đồ khoảng 25 - 30 phút trên lửa lớn đến khi hạt nếp chín tới khoảng 80%, hạt gạo nở trong đều.',
          'Dỡ xôi ra mẹt hoặc mâm sạch, dùng đũa xới tơi đều và quạt cho xôi bay bớt hơi nước. Rưới 2 thìa canh mỡ gà vàng óng vào xôi, dùng đũa đảo đều để mỡ gà bao bọc lấy từng hạt nếp căng mọng.',
          'Để xôi nguội tự nhiên khoảng 20 - 30 phút.',
          'Đồ lửa 2 (10 - 15 phút): Trước khi ăn, cho xôi trở lại xửng hấp thêm 10 - 15 phút. Lúc này hạt nếp hút trọn mỡ gà, trở nên dẻo quánh, bóng mượt như ngọc và dậy mùi thơm nức mũi.',
        ],
        description:
          'Gạo nếp đồ lửa 1 khoảng 25 phút cho chín tới. Dỡ xôi ra mâm, quạt cho bay bớt hơi rồi rưới mỡ gà vào trộn đều. Trước khi ăn cho xôi vào đồ lửa 2 thêm 15 phút giúp xôi dẻo quánh, hạt nếp óng ả và để cả ngày không bị lại gạo.',
        tip: 'Quy trình "Đồ xôi 2 lửa" là bí kíp gia truyền của các gánh xôi phố cổ Hà Nội. Hạt nếp được thẩm thấu mỡ gà giữa 2 lần đồ sẽ mềm dẻo tuyệt đối mà hạt xôi vẫn tơi rời từng hạt, không hề bị nát hay lại gạo.',
      },
      {
        step: 5,
        title: 'Thao tác thái xéo đậu xanh & hoàn thiện gói xôi ấm lòng',
        time: '3 phút',
        heat: 'Xôi và mỡ gà đang nóng hổi',
        goal: 'Đĩa/gói xôi xéo chuẩn mực: nếp vàng ươm, đậu xanh mỏng mịn phủ kín, mỡ gà óng ánh và hành phi ngập tràn',
        actionPoints: [
          'Xới một muôi xôi xéo nóng hổi ra đĩa hoặc đặt lên lá chuối/lá sen tươi.',
          'Tay trái cầm chặt quả đậu xanh, tay phải dùng con dao bài sắc bén đặt nghiêng góc dao, thoăn thoắt thái từng lát đậu mỏng tang rơi xéo phủ đều kín mặt xôi.',
          'Dùng thìa múc một muôi mỡ gà nóng rưới đều lên trên lớp đậu xanh (mỡ gà nóng lập tức làm đậu xanh mềm ngậy và thơm phức).',
          'Rắc một nhúm hành phi giòn rụm màu vàng cánh gián lên trên cùng.',
          'Thêm chút ruốc thịt heo xé sợi và vài lát chả quế nướng thơm nếu thích.',
        ],
        description:
          'Xới xôi nóng ra lá hoặc đĩa, cầm quả đậu xanh dùng dao bén thái xéo từng lát mỏng mịn phủ kín xôi. Rưới muôi mỡ gà vàng óng lên trên, rắc hành phi giòn tan và thêm ruốc thịt chả quế thưởng thức ngay.',
        tip: 'Động tác dùng dao thái xéo quả đậu xanh tạo nên những lát đậu mịn tơi như lụa tan chảy ngay khi chạm vào đầu lưỡi - đó chính là nguồn gốc cái tên "Xôi Xéo" trứ danh đất Hà Thành.',
      },
    ],
    chefSecret:
      '3 bí quyết vàng tạo nên linh hồn Xôi Xéo Hà Nội: 1. Đồ xôi 2 lửa (trộn mỡ gà ở giữa 2 lần đồ giúp xôi để cả ngày vẫn dẻo mềm không cứng lại gạo); 2. Giã và nén đậu xanh khi còn bốc khói nóng rồi dùng dao bén thái xéo thật mỏng; 3. Dùng mỡ gà ta thắng nguyên chất thay cho dầu ăn để rưới lên xôi tạo vị béo ngậy đặc trưng không thể thay thế.',
    recommendedSauce:
      'Mỡ gà ta nguyên chất rưới đẫm, ăn kèm ruốc thịt heo tự làm, chả quế nướng giòn thơm hoặc giò lụa truyền thống.',
  },

  'com-rang-dua-bo': {
    dishId: 'com-rang-dua-bo',
    dishName: 'Cơm Rang Dưa Bò Hà Nội',
    seoTitle: 'Cách Làm Cơm Rang Dưa Bò Hạt Cơm Săn Giòn, Thơm Ngon Chuẩn Vị',
    prepTime: '20 phút',
    cookTime: '15 - 20 phút',
    difficulty: 'Trung bình',
    servings: '2 - 3 người',
    ingredients: [
      {
        category: 'Cơm nguội & Lòng đỏ trứng vàng óng',
        items: [
          '3 - 4 bát con cơm nguội (nấu hơi ráo nước, để ngăn mát tủ lạnh ít nhất 4 tiếng hoặc qua đêm để hạt cơm se mặt)',
          '2 quả trứng gà ta tươi (1 lòng đỏ bóp đều trực tiếp với cơm nguội để tạo màu vàng ruộm, 1 quả đánh tan rang cùng cơm)',
          '1/2 thìa cà phê hạt nêm (trộn đều cùng cơm và lòng đỏ trứng cho đượm vị)',
        ],
      },
      {
        category: 'Thịt bò tươi & Dưa cải muối chua giòn',
        items: [
          '250g - 300g thịt thăn bò tươi hoặc bắp bò hoa (thái lát thật mỏng ngang thớ)',
          '200g - 250g dưa cải muối chua (chọn phần cọng/cuống dày giòn sần sật, xả nhẹ nước rồi vắt thật kiệt nước)',
          '1 thìa canh dầu hào thượng hạng (tạo độ bóng và vị ngọt đượm đậm đà cho thịt bò)',
          '1 thìa cà phê nước tương (xì dầu thượng hạng)',
          '1 thìa canh dầu ăn (bí quyết vàng bao bọc thớ thịt, khóa ẩm giúp bò mềm ngọt không bị dai)',
          '1/2 thìa cà phê đường kính hoặc đường thốt nốt (cân bằng vị chua gắt của dưa muối)',
          '1/2 thìa cà phê hạt tiêu sọ xay thơm nồng',
        ],
      },
      {
        category: 'Hương liệu & Gia vị rang cơm bí truyền',
        items: [
          '1 củ tỏi ta & 4 củ hành tím khô (băm nhỏ, chia đôi để xào dưa bò và rang cơm)',
          '3 nhánh hành hoa tươi (rửa sạch cắt nhỏ) & vài cọng ngò rí',
          '2 - 3 thìa canh mỡ heo sạch (dùng mỡ heo hạt cơm sẽ bóng bẩy, thơm nức mũi chuẩn vị quán xá phố cổ)',
          '1 thìa canh nước mắm cá cơm truyền thống hảo hạng (rưới quanh viền thành chảo nóng già dậy mùi)',
          'Bí quyết quán xá: 2 thìa canh cơm chiên phồng giòn rụm hoặc cốm chiên giòn (trộn cùng cơm săn ở phút cuối)',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế thịt bò và ướp mềm mọng với dầu ăn',
        time: '15 phút',
        heat: 'Nhiệt độ phòng (Ướp ngấm gia vị)',
        goal: 'Thịt bò thái mỏng ngang thớ, ngấm sâu gia vị, khóa trọn nước ngọt tự nhiên bên trong',
        actionPoints: [
          'Thịt bò dùng khăn giấy sạch thấm khô bề mặt, đặt lên thớt dùng dao thật sắc thái lát thật mỏng ngang thớ thịt. Dùng sống dao dần nhẹ lên các miếng thịt để thớ thịt nở mềm tơi.',
          'Cho thịt bò vào tô ướp cùng: 1 thìa cà phê tỏi băm nhỏ, 1 thìa canh dầu hào, 1 thìa cà phê nước tương, 1/2 thìa cà phê hạt nêm, 1/2 thìa cà phê tiêu xay và đặc biệt là 1 thìa canh dầu ăn.',
          'Dùng tay bóp và trộn đều nhẹ nhàng trong 1 - 2 phút rồi để thịt nghỉ 15 phút. Lớp màng dầu ăn bao bọc quanh từng sợi cơ sẽ khóa chặt độ ẩm, giúp thịt bò khi xào trên lửa lớn giữ nguyên độ mềm mọng, không bao giờ bị dai hay khô xác.',
        ],
        description:
          'Thịt bò thái mỏng ngang thớ, dần nhẹ cho mềm. Ướp thịt với tỏi băm, dầu hào, nước tương, hạt nêm, tiêu xay và 1 thìa canh dầu ăn trong 15 phút để giữ thịt luôn mềm ngọt mọng nước.',
        tip: 'Tuyệt đối không ướp nước mắm trực tiếp vào thịt bò tươi sống vì muối trong nước mắm sẽ rút cạn nước ngọt của thịt, khiến thịt bò bị dai cứng và xỉn màu thâm đen khi xào.',
      },
      {
        step: 2,
        title: 'Sơ chế dưa cải chua & kỹ thuật bóp cơm vàng óng ánh',
        time: '10 phút',
        heat: 'Nhiệt độ thường',
        goal: 'Dưa chua giòn rụm bớt mặn gắt; từng hạt cơm tơi rời và được áo một lớp lòng đỏ trứng vàng ươm mượt mà',
        actionPoints: [
          'Dưa cải chua rửa sơ qua 1 - 2 lần nước lọc để giảm bớt độ mặn và độ chua gắt của nước muối dưa. Dùng tay vắt thật kiệt ráo nước rồi thái miếng vừa ăn khoảng 2cm (ưu tiên phần cọng giòn).',
          'Lấy 3 - 4 bát cơm nguội từ ngăn mát tủ lạnh ra, dùng tay đeo găng bóp nhẹ nhàng cho từng hạt cơm tơi rời rạc hoàn toàn, không để vón cục dính vào nhau.',
          'Tách lấy 1 lòng đỏ trứng gà ta cho vào âu cơm cùng 1/2 thìa cà phê hạt nêm. Dùng tay trộn và bóp đều để lớp lòng đỏ trứng gà bao bọc phủ kín một lớp màng vàng ruộm mỏng quanh từng hạt cơm.',
        ],
        description:
          'Dưa cải chua rửa sơ, vắt kiệt ráo nước rồi thái khúc vừa ăn. Cơm nguội lấy trong tủ lạnh ra bóp tơi hạt, trộn đều với 1 lòng đỏ trứng gà và chút hạt nêm để hạt cơm vàng óng và đậm đà.',
        tip: 'Cơm nấu hơi khô một chút và để tủ lạnh qua đêm là yếu tố then chốt. Hơi lạnh giúp hạt cơm se mặt, cứng cáp. Khi bóp lòng đỏ trứng gà vào, trứng bám chặt ngoài vỏ giúp cơm khi rang vừa vàng ruộm tự nhiên vừa không bị dính chảo.',
      },
      {
        step: 3,
        title: 'Xào thịt bò với dưa chua lửa lớn (Xào riêng, tuyệt đối không xào chung với cơm)',
        time: '5 phút',
        heat: 'Lửa cực đại (High heat)',
        goal: 'Thịt bò chín tới mềm mọng ngập sốt đậm đà, dưa chua xào săn giòn sần sật quyện vị chua ngọt thanh tao',
        actionPoints: [
          'Bắc chảo lên bếp mở mức lửa lớn nhất cho chảo thật nóng già. Cho 1 thìa canh dầu ăn vào tráng đều chảo rồi phi thơm 1/2 lượng tỏi hành băm.',
          'Trút toàn bộ thịt bò đã ướp vào chảo, đảo thật nhanh tay liên tục ở lửa lớn trong khoảng 1 đến 1.5 phút cho thịt bò vừa chín tái (vừa hết màu đỏ) thì trút ngay ra đĩa riêng.',
          'Vẫn dùng chảo đó, thêm 1 thìa cà phê dầu ăn phi thơm phần tỏi hành băm còn lại. Cho dưa chua đã vắt ráo vào xào nhanh trên lửa lớn trong 2 phút cho cọng dưa săn giòn lại.',
          'Nêm vào dưa 1/2 thìa cà phê đường và 1 thìa cà phê dầu hào để làm dịu độ chua gắt. Đổ đĩa thịt bò tái cùng toàn bộ nước xào thịt tiết ra trở lại chảo dưa, đảo nhanh tay trong 30 giây cho ngấm đều gia vị rồi tắt bếp, múc ra đĩa giữ ấm.',
        ],
        description:
          'Phi thơm hành tỏi trên lửa lớn, xào nhanh thịt bò trong 1 phút cho vừa chín tái rồi trút ra đĩa riêng. Phi tỏi xào săn dưa chua với chút đường và dầu hào, sau đó trút thịt bò vào đảo đều 30 giây rồi tắt bếp múc ra đĩa.',
        tip: 'Nguyên tắc bất di bất dịch: Phải xào dưa bò riêng và giữ lửa lớn nhất! Nếu xào chung với cơm ngay từ đầu, nước từ dưa chua và thịt bò sẽ ngấm vào làm cơm bị ướt nhão, không thể nào rang giòn được, đồng thời thịt bò sẽ bị ninh lâu dai ngoách.',
      },
      {
        step: 4,
        title: 'Kỹ thuật rang cơm hạt săn nổ lách tách & Bí quyết giòn rụm quán xá',
        time: '12 - 15 phút',
        heat: 'Lửa vừa lớn đến lớn',
        goal: 'Từng hạt cơm săn bóng, khô ráo vàng óng, bên ngoài giòn tan rôm rốp, bên trong dẻo thơm ngậy mỡ heo',
        actionPoints: [
          'Dùng chảo gang sâu lòng hoặc chảo chống dính dày đáy, đun thật nóng chảo rồi cho 2 - 3 thìa canh mỡ heo sạch vào láng đều khắp mặt chảo cho nóng già.',
          'Đổ toàn bộ cơm nguội đã trộn lòng đỏ trứng vào chảo, dàn đều cơm ra mặt chảo rồi dùng muôi miết nhẹ hạt cơm xuống đáy chảo, đảo đều tay liên tục ở lửa vừa lớn.',
          'Đập quả trứng thứ hai vào một góc chảo, dùng đũa đánh tan nhanh rồi đảo đều quyện vào mẻ cơm. Các sợi trứng trắng vàng li ti sẽ bám ôm lấy từng hạt cơm tạo màu sắc cực kỳ bắt mắt.',
          'Đảo và miết cơm liên tục từ 10 - 12 phút để toàn bộ hơi ẩm thoát hết. Hạt cơm bắt đầu săn chắc lại, khô ráo và phát ra tiếng nổ lách tách giòn tan vui tai trên mặt chảo.',
          'Bí quyết vàng quán xá: Trút 2 thìa canh cơm chiên giòn nở phồng (hoặc cốm chiên giòn rụm) vào chảo cơm rang, đảo đều tay thêm 2 phút để tạo kết cấu "hạt mềm dẻo quyện hạt giòn rụm" cực kỳ đã miệng.',
        ],
        description:
          'Làm nóng chảo với mỡ heo, cho cơm đã trộn lòng đỏ vào miết và đảo đều ở lửa vừa lớn. Đập thêm 1 quả trứng vào đảo đều cho trứng bám quanh hạt cơm. Rang đều tay 10 - 15 phút cho hạt cơm săn khô và nổ lách tách. Trộn thêm 2 thìa cơm chiên giòn cho tăng độ rôm rốp.',
        tip: 'Dùng mỡ heo sạch để rang cơm sẽ giúp hạt cơm bóng bẩy, thơm ngậy béo bùi đặc trưng của ẩm thực Hà Nội xưa mà không loại dầu ăn công nghiệp nào có thể thay thế được.',
      },
      {
        step: 5,
        title: 'Rưới nước mắm dậy mùi thành chảo & Thưởng thức trọn vẹn đĩa cơm nóng hổi',
        time: '3 phút',
        heat: 'Chảo thật nóng',
        goal: 'Mùi nước mắm bốc hơi thơm nức mũi thấm trọn hạt cơm, đĩa cơm vàng ruộm phối cùng dưa bò nóng hổi',
        actionPoints: [
          'Khi cơm đã đạt độ săn giòn hoàn hảo, nghiêng nhẹ chảo rồi rưới 1 thìa canh nước mắm ngon quanh mép thành chảo đang nóng già (nhiệt độ kim loại cực cao sẽ khiến nước mắm bốc hơi ngay lập tức, hương thơm ngào ngạt phủ trùm lấy mẻ cơm mà hạt cơm hoàn toàn không bị ướt).',
          'Đảo thật nhanh tay trong 30 giây cho cơm hấp thụ trọn vẹn hương thơm nức mũi của nước mắm, sau đó rắc toàn bộ hành lá cắt nhỏ và chút tiêu xay thơm nồng vào đảo đều 20 giây rồi tắt bếp.',
          'Múc cơm rang vàng ruộm, săn giòn ra đĩa lớn. Gắp phần thịt bò xào dưa chua nóng hổi kèm nước sốt sền sệt rưới lên chóp cơm (hoặc đặt gọn gàng một bên đĩa cơm), điểm xuyết vài nhánh ngò rí và vài lát ớt tươi.',
          'Dọn kèm một chén nước tương (xì dầu) tỏi ớt xắt cay nồng và một bát canh nước dùng thanh ngọt nóng hổi để thưởng thức trọn vẹn.',
        ],
        description:
          'Rưới nước mắm quanh viền thành chảo nóng để dậy mùi thơm nức, đảo nhanh với hành hoa và tiêu xay rồi tắt bếp. Múc cơm vàng óng ra đĩa, xếp thịt bò xào dưa chua lên trên, rắc tiêu ngò rí. Ăn kèm xì dầu tỏi ớt và bát nước dùng nóng hổi.',
        tip: 'Kỹ thuật rưới nước mắm lên thành chảo (chứ không rưới trực tiếp lên cơm) là bí quyết nhà nghề của các đầu bếp: Hơi nóng làm bốc hơi phần nước của mắm chỉ giữ lại tinh dầu thơm nức, giúp mẻ cơm rang ngát hương mà vẫn giữ nguyên độ săn giòn tuyệt đối.',
      },
    ],
    chefSecret:
      '4 nguyên tắc vàng tạo nên đĩa Cơm Rang Dưa Bò Hà Nội giòn tơi chuẩn vị quán xá: 1. Cơm nguội nấu khô ráo, để tủ lạnh qua đêm và bóp đều với 1 lòng đỏ trứng gà tạo màu vàng óng tự nhiên; 2. Luôn xào thịt bò dưa chua riêng trên lửa lớn nhất trong 1 - 2 phút, tuyệt đối không xào chung với cơm rang từ đầu; 3. Dùng mỡ heo sạch rang trên chảo nóng già và đảo miết liên tục đến khi cơm khô săn nổ lách tách; 4. Trộn thêm một nắm nhỏ cơm chiên giòn phồng rụm ở những phút cuối để tạo kết cấu giòn tan đưa miệng không thể cưỡng lại.',
    recommendedSauce:
      'Nước tương (xì dầu) dầm ớt xiêm cay nồng và vài lát tỏi mỏng, ăn kèm một bát nước dùng bò thanh ngọt rắc chút hành hoa bốc khói.',
  },
  'chao-suon-sun-quay': {
    dishId: 'chao-suon-sun-quay',
    dishName: 'Cháo Sườn Sụn Quẩy Giòn Ruốc Thịt Hà Nội',
    seoTitle: 'Cách Nấu Cháo Sườn Sụn Hà Nội Sánh Mịn Chuẩn Vị Phố Cổ, Quẩy Giòn Rụm',
    prepTime: '20 - 30 phút (ngâm gạo & sơ chế sườn sụn)',
    cookTime: '45 - 60 phút (ninh sườn mềm & quấy cháo sánh mịn)',
    difficulty: 'Dễ',
    servings: '4 - 5 người ăn',
    ingredients: [
      {
        category: 'Gạo & sườn non hầm cháo',
        items: [
          '200g gạo tẻ ngon (chọn gạo tám thơm dẻo)',
          '50g gạo nếp cái hoa vàng (tạo độ dẻo quánh, thơm nức và sánh mịn)',
          '500g sườn sụn heo tươi non (chọn phần sụn đầu giòn trắng, nhiều thịt nạc)',
          '300g xương ống hoặc sườn non (hầm lấy nước dùng ngọt đậm đà tự nhiên)',
          '1 củ gừng tươi đập dập',
          '3 củ hành tím khô nướng thơm',
        ],
      },
      {
        category: 'Gia vị nêm nếm nước cháo',
        items: [
          '2 thìa canh nước mắm cốt truyền thống nguyên chất',
          '1 thìa cà phê muối hạt tinh',
          '1 thìa cà phê hạt nêm ngon',
          '1 thìa cà phê tiêu sọ đen hoặc trắng xay mịn (tiêu Bắc thơm nồng)',
          '1/2 thìa cà phê đường phèn (làm dịu ngọt thanh)',
        ],
      },
      {
        category: 'Topping ăn kèm chuẩn vị Hà Nội',
        items: [
          '100g ruốc thịt heo (chà bông heo) sao vàng thơm ngọt dịu',
          '5 - 7 chiếc quẩy giòn vàng rụm cắt khúc nhỏ',
          'Hành hoa, rau mùi (ngò rí) rửa sạch thái nhỏ',
          'Bột ớt khô hoặc tương ớt cay nồng truyền thống',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế & khử mùi sườn sụn, ninh lấy nước dùng ngọt thanh',
        time: '15 phút',
        heat: 'Lửa vừa rồi hạ liu riu',
        goal: 'Sườn sụn sạch tinh, không mùi tanh hôi, nước hầm ngọt trong veo',
        actionPoints: [
          'Sườn sụn và xương ống rửa với nước muối loãng, chặt miếng sườn sụn nhỏ vừa ăn (khoảng 2 - 3cm).',
          'Đun sôi nồi nước có vài lát gừng đập dập và 1 thìa muối hạt, cho sườn sụn và xương vào chần nhanh trong 3 phút để sủi sạch hết bọt bẩn và máu đọng thừa.',
          'Vớt sườn và xương ra, rửa xả thật sạch dưới vòi nước lạnh từng miếng.',
          'Cho xương ống và sườn sụn vào nồi cùng 2 lít nước lọc và 3 củ hành tím nướng. Đun sôi bùng, hớt sạch bọt rồi hạ lửa liu riu ninh khoảng 35 - 40 phút cho sườn sụn chín mềm nhưng vẫn giữ độ giòn sần sật đặc trưng. Vớt xương ống bỏ đi, giữ lại sườn sụn và phần nước hầm ngọt thanh.',
        ],
        description:
          'Chần sườn sụn và xương qua nước sôi gừng muối để khử sạch tạp chất. Rửa sạch lại rồi ninh cùng nước lọc và hành tím nướng trong 40 phút cho sườn mềm giòn và nước ngọt thanh.',
        tip: 'Chặt sườn sụn thành miếng nhỏ vừa ăn trước khi ninh giúp sụn nhanh mềm và khi múc vào bát cháo ăn rất vừa miệng, không bị cứng hay quá to.',
      },
      {
        step: 2,
        title: 'Bí quyết ngâm gạo & xay gạo nấu cháo sánh mịn như nhung',
        time: '15 phút (xay bột gạo)',
        heat: 'Nhiệt độ phòng',
        goal: 'Hạt gạo được ngâm mềm và xay vỡ nhỏ hạt mịn, không bị vón cục khi nấu',
        actionPoints: [
          'Trộn đều gạo tẻ và gạo nếp, vo nhẹ tay 2 lần cho sạch bụi cám, ngâm nước ấm trong 2 - 3 tiếng cho hạt gạo ngậm no nước nở mềm.',
          'Đổ gạo ra rổ để thật ráo nước.',
          'Cách nấu cháo sườn chuẩn Hà Nội: Cho gạo đã ráo vào cối máy xay sinh tố cùng 300ml nước dùng nguội, xay nhuyễn mịn (hoặc dùng bột gạo tẻ xay sẵn pha với nước ninh xương). Lọc hoặc dùng trực tiếp hỗn hợp gạo lỏng sánh mịn này để nấu.',
        ],
        description:
          'Gạo tẻ trộn gạo nếp vo sạch, ngâm 2 - 3 tiếng cho nở mềm rồi đem xay nhuyễn mịn với chút nước hầm xương. Bột gạo xay nhuyễn chính là linh hồn giúp cháo sánh mịn mượt mà như kem.',
        tip: 'Tỷ lệ vàng 4 phần gạo tẻ : 1 phần gạo nếp giúp cháo có độ quánh dẻo thơm ngát mà không hề bị đặc quánh hay tách nước khi để lâu.',
      },
      {
        step: 3,
        title: 'Quấy cháo sườn sánh mượt & nêm nếm gia vị đậm đà',
        time: '20 - 25 phút',
        heat: 'Lửa nhỏ liu riu',
        goal: 'Nồi cháo chín đều trong suốt, sánh mịn óng ả, sườn sụn quyện đều thơm lừng',
        actionPoints: [
          'Đun sôi nồi nước hầm sườn sụn trên bếp ở mức lửa vừa.',
          'Hạ lửa nhỏ, một tay từ từ rót phần bột gạo đã xay vào nồi, một tay dùng phới hoặc đũa lớn khuấy đều liên tục theo một chiều duy nhất để cháo không bị vón cục hay bén khét dưới đáy nồi.',
          'Cho phần sườn sụn non đã ninh mềm vào nồi cháo cùng nấu chung.',
          'Đun liu riu, khuấy nhẹ tay đều đặn trong 20 phút đến khi cháo chín trong, hạt bột chín nở căng mượt, sánh mịn như lụa.',
          'Nêm vào nồi: 2 thìa canh nước mắm cốt nhĩ thơm nức, 1 thìa cà phê hạt nêm, 1/2 thìa cà phê đường phèn và muối cho vừa khẩu vị đậm đà thanh tao của người Hà Nội.',
        ],
        description:
          'Từ từ rót bột gạo vào nồi nước hầm sườn đang sôi lăn tăn, khuấy đều tay theo một chiều để cháo sánh mịn không vón cục. Thả sườn sụn vào đun nhỏ lửa 20 phút cho cháo sánh mượt rồi nêm nước mắm ngon và gia vị.',
        tip: 'Luôn khuấy cháo theo MỘT CHIỀU DUY NHẤT và miết nhẹ sát đáy nồi. Điều này ngăn chặn tinh bột bị vỡ cấu trúc gây chảy nước (vữa cháo) và chống cháy đáy nồi cực kỳ hiệu quả.',
      },
      {
        step: 4,
        title: 'Múc cháo ra bát, hoàn thiện topping quẩy giòn & ruốc thịt',
        time: '5 phút',
        heat: 'Cháo luôn giữ nóng trên bếp',
        goal: 'Bát cháo sườn bốc khói nghi ngút, sụn giòn sần sật, ruốc thịt bông tơi, quẩy giòn rụm tan trong miệng',
        actionPoints: [
          'Quẩy giòn cắt khúc ngắn khoảng 1.5 - 2cm vừa ăn.',
          'Múc cháo sườn sụn nóng hổi, sánh mịn ra từng bát sâu lòng.',
          'Gắp vài miếng sườn sụn non giòn sần sật lên trên.',
          'Rắc một lớp ruốc thịt heo xao bông vàng tơi xốp, xếp quẩy giòn xung quanh thành bát.',
          'Rắc thêm thật nhiều tiêu sọ xay thơm nồng, chút hành hoa thái nhỏ và bột ớt khô cay tê đầu lưỡi.',
          'Thưởng thức ngay khi còn bốc khói ngùn ngụt, trộn nhẹ quẩy với cháo nóng để cảm nhận vị giòn rụm béo bùi.',
        ],
        description:
          'Múc cháo sườn sánh mịn nóng hổi ra bát, xếp sườn sụn, rắc ruốc thịt heo sao thơm, thả quẩy giòn cắt khúc, rắc tiêu xay và ớt bột. Thưởng thức ngay khi còn nóng hổi chuẩn vị Hà Nội.',
        tip: 'Nên cho quẩy vào sau cùng ngay trước khi ăn để quẩy giữ trọn độ giòn rụm, khi chấm đẫm vào thìa cháo sánh mịn sẽ tạo nên sự bùng nổ hương vị khó quên.',
      },
    ],
    chefSecret:
      '3 bí quyết gia truyền nấu Cháo Sườn Sụn Hà Nội chuẩn vị: 1. Ninh sườn sụn riêng với xương ống để lấy nước dùng ngọt tủy trong veo, sườn sụn mềm giòn sần sật không bị nát; 2. Pha tỷ lệ 4 tẻ : 1 nếp, ngâm mềm rồi xay nhuyễn với nước dùng để cháo sánh mịn màng như nhung lụa; 3. Khuấy cháo liên tục theo một chiều trên lửa nhỏ liu riu để cháo không bao giờ bị bén khét hay vữa nước. Ăn kèm quẩy giòn rụm và thật nhiều hạt tiêu sọ Bắc cay nồng nàn.',
    recommendedSauce:
      'Cháo sườn sụn ăn kèm quẩy giòn, ruốc thịt heo đậm đà, tiêu xay thơm nức mũi và chút ớt bột khô cay ấm bụng.',
  },
  'lau-rieu-cua-bap-bo': {
    dishId: 'lau-rieu-cua-bap-bo',
    dishName: 'Lẩu Riêu Cua Bắp Bò Sườn Sụn Hà Nội',
    seoTitle: 'Cách Nấu Lẩu Riêu Cua Bắp Bò Chua Cay Đậm Đà Chuẩn Vị Gia Đình',
    prepTime: '35 - 45 phút (lọc cua đồng, sơ chế bắp bò & sườn sụn)',
    cookTime: '45 - 50 phút (ninh sườn sụn & nấu nước lẩu riêu cua)',
    difficulty: 'Trung bình',
    servings: '4 - 6 người ăn',
    ingredients: [
      {
        category: 'Cua đồng & Nước dùng lẩu ngọt thanh',
        items: [
          '600g - 700g cua đồng tươi sống (chọn cua cái yếm dày, gạch vàng óng, nhiều thịt)',
          '500g sườn sụn heo non tươi giòn (chọn phần sụn đầu giòn trắng, nhiều thịt nạc)',
          '300g xương ống heo (hầm lấy nước dùng ngọt sâu tự nhiên)',
          '4 quả cà chua chín mọng (bổ múi cau đỏ au)',
          '150ml - 200ml giấm bỗng nếp lên men tự nhiên (linh hồn tạo vị chua thanh dịu êm, thơm ngát hương nếp)',
          '1 thìa canh mắm tôm ngon nguyên chất (bí quyết kích mùi riêu cua dậy vị đậm đà chuẩn vị Bắc)',
          '2 thìa canh dầu màu điều (hoặc mỡ heo chưng gạch cua lên màu vàng óng ánh)',
          '4 - 5 củ hành tím khô đập dập băm nhỏ + 1 củ gừng tươi',
        ],
      },
      {
        category: 'Bắp bò, Đậu mơ & Đồ nhúng lẩu tươi ngon',
        items: [
          '500g bắp bò hoa hoặc bắp lõi rùa tươi non (thái lát mỏng tang ngang thớ)',
          '4 bìa đậu phụ làng Mơ mềm béo (cắt vuông nhỏ, rán vàng giòn rụm các mặt)',
          '200g giò sống / mọc thịt nấm hương mộc nhĩ (tùy thích viên tròn thả lẩu)',
          '1kg bún tươi sợi nhỏ sạch mềm (hoặc mì tôm, bánh đa đỏ)',
        ],
      },
      {
        category: 'Rau nhúng lẩu & Gia vị nêm nếm',
        items: [
          'Hoa chuối bào sợi mỏng ngâm nước chanh trắng tinh, rau muống chẻ ngọn',
          'Rau thơm ăn kèm: Tía tô, kinh giới, rau xà lách, ngò gai, hành hoa chẻ sợi',
          'Gia vị: Nước mắm cốt truyền thống, muối hạt tinh, hạt nêm, 1 viên đường phèn nhỏ, tiêu sọ xay',
          'Ớt hiểm tươi thái lát và ớt sa tế chưng cay nồng',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế cua đồng, giã lọc lấy nước cốt & khều gạch cua vàng óng',
        time: '15 - 20 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Nước cốt cua lọc sạch bã trong veo, gạch cua khều nguyên vẹn thơm béo',
        actionPoints: [
          'Cua đồng ngâm rửa nhiều lần và xóc mạnh với muối hạt cho sạch hết bùn đất, sau đó tách bỏ yếm và mai cua.',
          'Dùng tăm hoặc thìa nhỏ khéo léo khều sạch phần gạch cua vàng óng trong mai vào một chén riêng.',
          'Thân cua cho vào cối cùng 1 thìa cà phê muối hạt giã thật nhuyễn (hoặc cho vào máy xay sinh tố xay mịn). Muối hạt là bí quyết quan trọng kích thích protein cua kết dính chặt chẽ thành từng tảng dày khi nấu.',
          'Hòa phần thịt cua xay với 1.5 - 2 lít nước lọc mát, dùng tay bóp kỹ rồi rót qua rây lọc dày 2 - 3 lần để lấy trọn nước cốt cua đậm đà, loại bỏ hoàn toàn phần bã xác cua cứng.',
        ],
        description:
          'Rửa sạch cua đồng, tách mai khều riêng gạch cua. Giã nhuyễn thân cua với 1 thìa cà phê muối hạt, hòa tan với 2 lít nước lọc rồi bóp kỹ và lọc qua rây 2 - 3 lần lấy nước cốt cua trong veo, bỏ sạch bã.',
        tip: 'Nhất định phải thêm chút muối hạt khi giã cua. Muối giúp các phân tử đạm cua liên kết chặt chẽ với nhau, khi đun nóng sẽ kết tụ thành từng mảng riêu to dày béo ngậy mà không hề bị nát vụn hay tan biến trong nước.',
      },
      {
        step: 2,
        title: 'Ninh sườn sụn non ngọt giòn, thái bắp bò hoa & rán đậu mơ',
        time: '25 - 30 phút',
        heat: 'Lửa vừa rồi hạ nhỏ liu riu',
        goal: 'Sườn sụn mềm giòn sần sật, bắp bò hoa thái mỏng mềm mọng nước, đậu phụ vàng ruộm',
        actionPoints: [
          'Sườn sụn chặt miếng nhỏ cỡ 2 - 3cm, chần qua nồi nước sôi có vài lát gừng đập dập và chút muối trong 3 phút để khử sạch tạp chất và mùi tanh, sau đó rửa xả lại thật sạch dưới vòi nước lạnh.',
          'Cho sườn sụn và xương ống vào nồi với 1 lít nước, đun sôi rồi hạ lửa liu riu ninh 25 - 30 phút cho sụn non chín mềm vừa tới nhưng vẫn giữ độ giòn sần sật đặc trưng. Giữ ấm cả sườn và nước hầm thanh ngọt.',
          'Bắp bò hoa rửa sạch, thấm khô ráo, để vào ngăn đá tủ lạnh 15 phút cho thớ thịt hơi se cứng lại rồi dùng dao bén thái lát thật mỏng ngang thớ. Ướp nhẹ với 1 thìa cà phê gừng thái chỉ, 1/2 thìa dầu ăn, chút tiêu xay để thịt mềm ngọt không bị dai khô khi nhúng.',
          'Đậu phụ làng Mơ cắt miếng vuông vừa ăn, thả vào chảo mỡ nóng già rán vàng giòn rụm các mặt, vớt ra đĩa có lót giấy thấm dầu.',
          'Hoa chuối bào sợi mỏng và rau muống chẻ ngâm ngay vào thau nước đá lạnh vắt nửa quả chanh để rau luôn trắng tinh và giữ độ giòn sần sật.',
        ],
        description:
          'Chần sườn sụn rồi ninh mềm giòn cùng xương hầm. Bắp bò hoa thái mỏng tang ướp chút gừng và dầu ăn. Đậu phụ rán vàng giòn rụm. Rau sống ngâm nước đá chanh giữ độ tươi giòn.',
        tip: 'Cho bắp bò vào ngăn đá 15 phút trước khi thái giúp miếng thịt định hình chắc chắn, dễ thái lát mỏng như tờ giấy. Khi nhúng nước lẩu sôi, thịt bò chín tái trong 15 giây, mềm mọng và nở hoa giòn sần sật.',
      },
      {
        step: 3,
        title: 'Nấu nước lẩu riêu cua đóng tảng béo ngậy & chưng gạch cua óng ả',
        time: '15 - 20 phút',
        heat: 'Lửa vừa đến khi riêu nổi thì hạ nhỏ liu riu',
        goal: 'Tảng riêu cua nổi dày bồng bềnh vàng ruộm, nước lẩu chua thanh giấm bỗng nồng ấm',
        actionPoints: [
          'Đổ nồi nước lọc cua lên bếp, nêm thêm 1 thìa cà phê hạt nêm và 1/2 thìa cà phê muối. Đun ở lửa vừa, dùng muôi khuấy nhẹ dưới đáy nồi theo một chiều để thịt cua không bị lắng bén khét đáy.',
          'Khi thấy nước bắt đầu bốc khói ấm và mảng thịt cua kết tụ nổi dần lên mặt nước, NGỪNG KHUẤY NGAY LẬP TỨC và hạ nhỏ lửa liu riu. Nước sôi lăn tăn sẽ đẩy từng mảng riêu cua kết tụ dày cộm, nổi bồng bềnh trên mặt nồi.',
          'Dùng muôi thủng khéo léo vớt toàn bộ mảng riêu cua ra đĩa sâu lòng riêng (bí quyết giữ riêu cua nguyên vẹn, không bị nát vụn khi khách nhúng đồ ăn liên tục).',
          'Trút phần nước ninh sườn sụn trong veo vào nồi nước lẩu cua.',
          'Bắc chảo nhỏ lên bếp, phi thơm hành tím băm với 2 thìa dầu màu điều, trút gạch cua đã khều vào chưng nhanh tay 1 - 2 phút cho thơm nức dậy mùi béo ngậy. Múc một nửa rưới đều lên mặt đĩa riêu cua đã vớt ra để tạo lớp màng gạch vàng óng ả bắt mắt.',
          'Phần chảo còn lại cho cà chua múi cau vào xào chín tới (vẫn giữ nguyên miếng, không làm nát nhừ), trút toàn bộ cà chua và dầu gạch cua vào nồi nước lẩu.',
          'Nêm vào nồi: 150ml - 200ml giấm bỗng nếp (gia giảm vừa độ chua thanh dịu), 1 thìa canh mắm tôm ngon đã khuấy tan với chút nước ấm gạn bỏ cặn, 2 thìa canh nước mắm cốt nhĩ và 1 viên nhỏ đường phèn. Nồi nước lẩu sôi lăn tăn, tỏa hương thơm ngát nức lòng.',
        ],
        description:
          'Đun nước cua trên lửa vừa đến khi thịt cua kết thành tảng dày nổi bồng bềnh, vớt riêu ra đĩa riêng. Chưng gạch cua với hành khô và dầu điều, xào cà chua rồi trút vào nồi cùng nước hầm sườn. Nêm giấm bỗng nếp, mắm tôm ngon và nước mắm cốt cho vị chua thanh đậm đà.',
        tip: 'Tuyệt đối không đậy nắp vung và không để nước lẩu sôi bùng dữ dội khi riêu cua đang nổi, vì nhiệt quá lớn sẽ làm nát vụn tảng riêu. Vớt riêu ra đĩa riêng trước là bí quyết nhà nghề giúp tảng riêu cua luôn nguyên khối đẹp mắt.',
      },
      {
        step: 4,
        title: 'Bày biện nồi lẩu & Thưởng thức lẩu riêu cua bắp bò chua cay',
        time: '5 - 10 phút',
        heat: 'Bếp lẩu sôi lăn tăn trên bàn ăn',
        goal: 'Nồi lẩu thơm lừng nghi ngút khói, bắp bò chín tái giòn sần sật, nước dùng chua cay kích thích vị giác',
        actionPoints: [
          'Đặt bếp lẩu ra giữa bàn ăn. Đổ nước lẩu cà chua giấm bỗng vào nồi, thả sườn sụn non ninh mềm, đậu phụ rán vàng, một phần riêu cua và rắc thêm đầu hành chẻ, mùi tàu, tía tô thái sợi.',
          'Bày xung quanh bàn: Đĩa bắp bò hoa đỏ tươi thái mỏng, đĩa riêu cua chưng gạch óng ả, giò sống mọc thịt, rổ rau muống chẻ, hoa chuối, tía tô, kinh giới và đĩa bún tươi.',
          'Khi nồi lẩu sôi sùng sục, nhúng từng lát bắp bò hoa trong 15 - 20 giây cho chín tái hồng giòn sần sật, thả viên mọc thịt và rau sống nhúng chín tới.',
          'Lấy bún tươi vào bát, múc một miếng riêu cua béo bùi, gắp lát bắp bò giòn sần sật, sườn sụn non và đậu phụ ngấm nước lẩu, rưới nước dùng nóng hổi chua cay thanh dịu từ giấm bỗng và thưởng thức ngay.',
        ],
        description:
          'Bày nồi lẩu sôi lăn tăn với sườn sụn, đậu rán, riêu cua và hành tía tô. Nhúng bắp bò hoa tái giòn, rau muống chẻ và hoa chuối. Ăn kèm bún tươi, chấm nước mắm ớt cay nồng đậm đà.',
        tip: 'Nên thả đậu phụ rán vào nồi lẩu từ sớm để từng miếng đậu ngậm no nước dùng chua thanh béo ngậy của riêu cua. Khi cắn vào, nước lẩu nóng hổi tuôn tràn trong miệng cực kỳ thỏa mãn.',
      },
    ],
    chefSecret:
      '4 bí quyết vàng tạo nên nồi Lẩu Riêu Cua Bắp Bò chua thanh đậm đà chuẩn vị Hà Nội: 1. Thêm muối hạt khi giã lọc cua và chỉ khuấy lúc nước ấm; khi bắt đầu sôi phải hạ lửa nhỏ liu riu để riêu cua kết tụ thành từng mảng to xốp mềm béo ngậy; 2. Vớt tảng riêu cua ra đĩa riêng rồi rưới gạch cua phi hành thơm óng ả lên trên để riêu không bị nát vụn khi nhúng; 3. Dùng giấm bỗng nếp lên men tự nhiên tạo vị chua thanh dịu dàng thơm mùi men nếp, kết hợp 1 thìa mắm tôm ngon khử tanh và dậy vị sâu sắc (tuyệt đối không dùng giấm hóa học hay nước cốt chanh); 4. Bắp bò hoa thái thật mỏng ngang thớ và chỉ nhúng tái trong 15 - 20 giây để thịt giữ nguyên độ giòn ngọt mọng nước sần sật.',
    recommendedSauce:
      'Chén nước mắm cốt nhĩ nguyên chất dầm ớt hiểm cay xé lưỡi vắt chút quất thơm, kèm một đĩa muối tiêu chanh ớt và sa tế tôm tự chưng cay nồng.',
  },
  'mien-luon-gion-xao-lan': {
    dishId: 'mien-luon-gion-xao-lan',
    dishName: 'Miến Lươn Giòn Nước Dùng Hà Nội',
    seoTitle: 'Cách Nấu Miến Lươn Giòn Nước Dùng Thanh Ngọt Chuẩn Vị Gia Đình',
    prepTime: '30 - 40 phút (tuốt nhớt lươn, lọc xương & ướp)',
    cookTime: '45 - 50 phút (ninh nước dùng xương lươn & chiên lươn 2 lửa giòn rụm)',
    difficulty: 'Trung bình',
    servings: '4 - 5 người ăn',
    ingredients: [
      {
        category: 'Lươn đồng & Kỹ thuật tẩm bột chiên giòn tan',
        items: [
          '700g - 800g lươn đồng tươi sống (chọn lươn hoa loại vừa, lưng đen bụng vàng óng, thịt chắc ngọt thơm)',
          'Khử nhớt & khử tanh: 2 nắm muối hạt to, nước cốt 2 quả chanh tươi (hoặc giấm bỗng nếp), khăn sạch lau khô',
          'Gia vị ướp lươn: 1 thìa cà phê bột nghệ vàng nguyên chất (lấy màu vàng ươm), 1 thìa cà phê tiêu sọ xay mịn, 1/2 thìa cà phê hạt nêm, 1 thìa canh nước cốt gừng tỏi chắt lọc',
          'Lớp áo bột chiên giòn 2 lửa: 100g bột chiên giòn mịn pha cùng 30g bột bắp (hoặc bột năng) tạo độ giòn xốp lâu rụm',
          'Dầu ăn ngập chảo để chiên sâu (deep-fry)',
        ],
      },
      {
        category: 'Nước dùng thanh ngọt sâu từ xương lươn & xương heo',
        items: [
          'Toàn bộ đầu và xương sống của lươn sau khi lọc thịt (linh hồn tạo vị ngọt thanh sâu, thơm ngát đặc trưng)',
          '400g xương ống heo hoặc xương bay (chần sạch ninh cùng giúp nước lèo đậm đà tròn vị)',
          '4 củ hành tím khô nướng thơm bóc vỏ đập dập',
          '1 củ gừng tươi nướng thơm cạo sạch đập dập',
          '2 nhánh đầu hành trắng hoặc 1 củ hành tây nhỏ',
          'Gia vị nồi nước lèo: Nước mắm cốt truyền thống nguyên chất, muối hạt tinh, 1 viên nhỏ đường phèn (giúp vị ngọt dịu êm, không dùng đường cát gắt vị)',
        ],
      },
      {
        category: 'Miến dong & Rau gia vị ăn kèm chuẩn vị',
        items: [
          '350g miến dong ta (chọn miến dong sợi xám tro hoặc trắng ngà tự nhiên, dai ngon không bị bở nát)',
          '200g giá đỗ tươi sạch, thân mập giòn ngọt',
          '1 nắm lớn rau răm tươi non (linh hồn không thể thiếu của miến lươn, cay ấm cân bằng tính hàn của lươn)',
          '1 nắm hành hoa (hành lá) và rau ngò gai (mùi tàu) thái nhỏ, đầu hành hoa chẻ sợi',
          '3 - 4 củ hành khô thái mỏng phi vàng giòn rụm',
          'Đồ ăn kèm: Ớt chưng sa tế cay nồng, quất tươi (hoặc chanh), ớt hiểm tươi thái lát và tiêu sọ xay thơm nức',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế lươn sạch bong nhớt, lọc phi lê và xương lươn không tanh',
        time: '15 - 20 phút',
        heat: 'Nhiệt độ phòng',
        goal: 'Lươn sạch bong nhớt hoàn toàn, thịt lươn khô ráo đỏ tươi, giữ trọn vẹn xương và đầu để nấu nước dùng',
        actionPoints: [
          'Cho lươn vào nồi sâu lòng, rắc 2 nắm muối hạt to và vắt 2 quả chanh (hoặc đổ chút giấm bỗng), đậy chặt vung 3 - 5 phút cho lươn quẫy tự nhả sạch nhớt.',
          'Dùng khăn vải khô hoặc lá tre vuốt mạnh dọc thân từ đầu đến đuôi để tuốt sạch toàn bộ lớp màng nhớt trắng.',
          'Rửa nhanh lươn qua nước muối loãng, dùng khăn sạch thấm khô ráo hoàn toàn (tuyệt đối không ngâm nước lã sau khi mổ để thịt lươn không bị tanh).',
          'Cắt rời phần đầu lươn (giữ lại đầu), rạch bụng lấy sạch ruột.',
          'Dùng dao mỏng bén lạng nhẹ hai bên dọc xương sống để tách lấy 2 dải thịt phi lê lươn dài, giữ lại toàn bộ dải xương sống và đầu lươn để ninh nước dùng.',
          'Cắt thịt phi lê lươn thành từng miếng dài cỡ ngón tay (khoảng 4 - 5cm), bản dày khoảng 0.8 - 1cm.',
        ],
        description:
          'Tuốt sạch nhớt lươn bằng muối hạt và nước cốt chanh. Thấm khô bằng khăn sạch, mổ bỏ ruột và lạng tách lấy thịt phi lê cùng xương lươn. Cắt thịt lươn thành miếng vừa ăn.',
        tip: 'Bí quyết nhà nghề là sau khi mổ bỏ ruột chỉ dùng khăn sạch thấm khô máu bầm, tuyệt đối KHÔNG rửa lại bằng nước lã. Nước lã tiếp xúc với thớ thịt lươn sau khi cắt mổ sẽ làm mất vị ngọt tự nhiên và khiến lươn bị tanh nồng.',
      },
      {
        step: 2,
        title: 'Hầm nồi nước dùng xương lươn ngọt thanh trong vắt',
        time: '45 - 60 phút',
        heat: 'Lửa lớn đun sôi rồi hạ liu riu',
        goal: 'Nước dùng trong veo màu vàng hổ phách nhạt, ngọt đậm sâu tự nhiên từ tủy lươn và xương heo, dậy mùi gừng hành nướng ấm nồng',
        actionPoints: [
          'Xương ống heo rửa sạch, chần qua nước sôi 3 phút rồi rửa lại thật sạch dưới vòi nước lạnh.',
          'Toàn bộ đầu và xương lươn cho vào chảo nhỏ xào săn cùng 1 thìa dầu ăn, chút gừng băm và hành tím phi thơm lừng cho dậy mùi béo ngậy.',
          'Cho xương heo và xương lươn vào nồi cùng 2.5 - 3 lít nước lọc. Thả hành tím nướng, gừng nướng đập dập và 1 thìa cà phê muối hạt.',
          'Bật lửa lớn đun sôi bùng, dùng muôi hớt sạch toàn bộ bọt nổi để nước lèo trong vắt. Sau đó hạ lửa liu riu ninh trong 45 - 60 phút.',
          'Vớt bỏ bã xương lươn và xương heo, lọc nước dùng qua rây dày để thu được nồi nước lèo trong veo không dính vụn xương.',
          'Nêm nếm: 2 thìa canh nước mắm cốt nhĩ ngon, 1 viên đường phèn nhỏ (cỡ ngón tay cái) để vị ngọt mềm dịu, 1 thìa hạt nêm. Giữ nồi nước lèo luôn sôi nhẹ lăn tăn trên bếp.',
        ],
        description:
          'Xào thơm xương và đầu lươn với gừng hành, cho vào nồi ninh cùng xương ống heo đã chần sạch. Thêm hành gừng nướng, đun sôi hớt bọt rồi ninh liu riu 1 tiếng. Lọc lấy nước dùng trong veo, nêm mắm cốt và đường phèn thanh ngọt.',
        tip: 'Xương lươn chứa hàm lượng canxi và vị ngọt umami cực kỳ đậm đà. Việc xào thơm xương lươn với gừng hành trước khi ninh giúp triệt tiêu hoàn toàn mùi tanh, đồng thời chiết xuất tối đa vị ngọt thanh khiết đặc trưng.',
      },
      {
        step: 3,
        title: 'Tẩm ướp và chiên lươn 2 lửa giòn tan rụm vàng óng',
        time: '20 - 25 phút',
        heat: 'Lửa vừa (160°C lần 1) & Lửa lớn (180°C - 190°C lần 2)',
        goal: 'Lươn chiên giòn tan rụm màu vàng nâu óng ánh, thơm nức mùi nghệ tiêu, để lâu vẫn giòn xốp không bị dai ỉu hay ngấm dầu',
        actionPoints: [
          'Cho thịt lươn vào tô ướp cùng: 1 thìa cà phê bột nghệ vàng, 1 thìa cà phê tiêu sọ xay mịn, 1/2 thìa cà phê hạt nêm, 1 thìa canh nước cốt gừng tỏi chắt lọc. Trộn đều ướp trong 15 phút cho ngấm gia vị.',
          'Trộn đều 100g bột chiên giòn với 30g bột bắp. Cho từng mẻ lươn vào âu bột xóc đều tay để bột áo một lớp mỏng tang quanh từng miếng lươn. Sau đó cho lươn qua rây lắc nhẹ để rơi hết bột thừa (tránh làm cháy và đục dầu chiên).',
          'Chiên lần 1 (định hình & chín thịt): Đun nóng ngập dầu ở nhiệt độ 160°C (thả đầu đũa vào thấy sủi tăm mạnh), thả từng miếng lươn vào chảo (không thả dính chùm). Chiên lửa vừa khoảng 5 - 7 phút đến khi lươn săn cứng lại, ngả màu vàng nhạt thì vớt ra rổ thưa để ráo dầu trong 5 - 10 phút.',
          'Chiên lần 2 (ép dầu & tạo độ giòn xốp rụm): Tăng nhiệt độ dầu lên 180°C - 190°C (dầu nóng già). Thả lươn đã ráo vào chiên nhanh trong 2 - 3 phút. Lớp vỏ lươn lập tức phồng giòn rôm rốp, chuyển màu vàng nâu cánh gián óng ả. Vớt ra ngay đặt lên khay có lót giấy thấm dầu.',
        ],
        description:
          'Ướp lươn với nghệ, tiêu và nước cốt gừng tỏi. Áo một lớp bột chiên giòn mỏng pha bột bắp rồi rây sạch bột thừa. Chiên 2 lần lửa: lần 1 lửa vừa cho chín se, nghỉ 10 phút, lần 2 chiên lửa lớn giúp lươn giòn tan rụm, vàng ươm và không bị ngấm dầu.',
        tip: 'Bí quyết vàng để lươn chiên giòn rụm hàng giờ không ỉu chính là kỹ thuật chiên 2 lửa kết hợp bột bắp. Lần 1 làm chín kiệt nước bên trong; nghỉ 10 phút để hơi ẩm thoát ra; lần 2 chiên nhiệt cao giúp bốc hơi hoàn toàn hơi nước bề mặt và đẩy hết dầu thừa ra ngoài.',
      },
      {
        step: 4,
        title: 'Trần miến dong dẻo dai & Hoàn thiện tô miến lươn nước thanh ngọt',
        time: '5 - 10 phút',
        heat: 'Nước lèo sôi sùng sục',
        goal: 'Tô miến lươn nghi ngút khói, miến dong dai mướt trong veo, lươn giòn rụm nằm trên mặt, nước lèo ngọt thơm nức mũi',
        actionPoints: [
          'Miến dong ngâm nước ấm 10 - 15 phút cho sợi miến mềm mại, vớt ra cắt khúc vừa ăn cỡ 15 - 20cm, để ráo.',
          'Nhúng giá đỗ tươi qua nồi nước sôi trong 10 giây rồi rải đều dưới đáy từng bát tô lớn.',
          'Cho miến dong vào muôi lưới/vợt trần, nhúng trực tiếp vào nồi nước dùng lươn đang sôi khoảng 30 - 45 giây cho sợi miến chín tới, ngậm trọn vị ngọt đậm đà của nước lèo rồi trút vào bát tô trên lớp giá đỗ.',
          'Xếp hành hoa, rau răm thái nhỏ và đầu hành chẻ sợi lên trên miến. Rắc một nhúm hành phi vàng giòn rụm thơm nức mũi.',
          'Gắp một phần lươn giòn rụm đặt gọn gàng ở một góc trên mặt tô (tránh để lươn ngập chìm dưới nước ngay từ đầu để giữ tối đa độ giòn tan).',
          'Múc nước dùng đang sôi sùng sục chan nhẹ nhàng men theo thành tô ngập xâm xấp mặt miến. Rắc thêm chút tiêu sọ xay mịn lên trên.',
          'Thưởng thức ngay lập tức khi còn nóng hổi! Vắt thêm chút nước cốt quất tươi hoặc chanh, kèm ớt tươi hoặc ớt sa tế chưng cay tê đầu lưỡi.',
        ],
        description:
          'Trần giá đỗ lót đáy bát, trần miến dong trực tiếp bằng nước dùng lươn cho ngậm vị ngọt rồi cho vào tô. Xếp rau răm, hành hoa, hành phi và lươn chiên giòn lên trên. Chan nước lèo sôi sùng sục, rắc tiêu thơm và thưởng thức ngay.',
        tip: 'Miến dong nhất định phải trần trực tiếp bằng nước dùng lươn thay vì trần nước sôi thường. Sợi miến dong hút nước cực tốt, khi nở trong nước dùng sẽ hút no vị ngọt tủy xương đậm đà từ sâu bên trong từng sợi miến!',
      },
    ],
    chefSecret:
      '4 bí quyết vàng nấu Miến Lươn Giòn nước dùng thanh ngọt chuẩn vị: 1. Tuốt sạch nhớt lươn bằng muối hạt và nước cốt chanh, lau khô bằng khăn sạch và tuyệt đối không rửa lại bằng nước lã sau khi mổ; 2. Đừng bỏ đầu và xương lươn: Sao thơm xương lươn với gừng hành nướng rồi ninh lấy nước dùng là linh hồn tạo vị ngọt sâu thanh khiết đặc trưng; 3. Kỹ thuật chiên lươn 2 lửa: Lần 1 chiên lửa vừa cho chín se kiệt nước, nghỉ 10 phút, lần 2 chiên lửa lớn giòn rụm vàng ruộm, giúp miếng lươn giòn tan dù chan nước dùng vẫn giữ trọn độ giòn rôm rốp; 4. Rau răm và quất tươi là cặp đôi hoàn hảo cân bằng tính hàn của lươn, mang lại hương vị thơm ấm nồng nàn chuẩn vị Hà Nội.',
    recommendedSauce:
      'Ớt chưng sa tế cay nồng, quất tươi Hà Nội (hoặc chanh tươi), vài lát ớt hiểm và chén nước mắm nhĩ ngon rắc tiêu sọ xay mịn.',
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
  const curated = CURATED_RECIPES[dish.id] || (RECIPE_SLUG_ALIASES[dish.id] ? CURATED_RECIPES[RECIPE_SLUG_ALIASES[dish.id]] : undefined) || (Object.keys(RECIPE_SLUG_ALIASES).find((k) => RECIPE_SLUG_ALIASES[k] === dish.id) ? CURATED_RECIPES[Object.keys(RECIPE_SLUG_ALIASES).find((k) => RECIPE_SLUG_ALIASES[k] === dish.id)!] : undefined);
  if (curated?.seoTitle) {
    return curated.seoTitle;
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

  // 1. Món bánh mì, gỏi cuốn, phở cuốn, nem (Ưu tiên kiểm tra trước bún/phở/mì để tránh dính chữ 'mì' trong 'bánh mì' hay 'phở' trong 'phở cuốn')
  if (lowerName.includes('bánh mì que')) {
    return `Cách Làm ${cleanName} Patê Béo Ngậy Giòn Rụm Chuẩn Vị Đất Cảng`;
  }
  if (lowerName.includes('bánh mì')) {
    return `Cách Làm ${cleanName} Giòn Rụm, Đậm Đà Chuẩn Vị Đường Phố`;
  }
  if (lowerName.includes('bánh cuốn')) {
    return `Cách Làm ${cleanName} Vỏ Mỏng Mướt, Nước Chấm Ấm Nóng Chuẩn Vị Hà Nội`;
  }
  if (
    cat === 'banhmi_cuon' ||
    lowerName.includes('phở cuốn') ||
    lowerName.includes('gỏi cuốn') ||
    lowerName.includes('bò bía') ||
    lowerName.includes('nem cuốn')
  ) {
    return `Cách Làm ${cleanName} Tươi Ngon, Nước Chấm Chua Ngọt Chuẩn Vị`;
  }

  // 2. Phở, Bún, Miến, Mì, Hủ tiếu, Bánh canh
  if (lowerName.includes('bún chả') && !lowerName.includes('chả giò') && !lowerName.includes('chả cá')) {
    return `Cách Làm ${cleanName} Thịt Nướng Than Hoa, Nước Chấm Đậm Đà Chuẩn Vị`;
  }
  if (lowerName.includes('chả cá lã vọng')) {
    return `Cách Làm ${cleanName} Nướng Than Hoa, Xèo Xèo Chảo Mỡ Chuẩn Vị Phố Cổ`;
  }
  if (lowerName.includes('bún chả cá')) {
    return `Cách Nấu ${cleanName} Thơm Ngon Đậm Đà Chuẩn Vị`;
  }
  if (lowerName.includes('chả cá')) {
    return `Cách Làm ${cleanName} Dai Giòn Thơm Ngon Chuẩn Vị`;
  }
  if (lowerName.includes('bún đậu')) {
    return `Cách Làm ${cleanName} Thơm Ngon, Đầy Đủ Topping Chuẩn Vị Hà Thành`;
  }
  if (lowerName.includes('bún thịt nướng') || lowerName.includes('bún nem nướng')) {
    return `Cách Làm ${cleanName} Đậm Đà, Nước Mắm Chua Ngọt Chuẩn Vị Nam Bộ`;
  }
  if (lowerName.includes('phở xào') || lowerName.includes('mì xào') || lowerName.includes('hủ tiếu xào')) {
    return `Cách Làm ${cleanName} Thơm Lừng, Đậm Đà Chuẩn Bếp Trưởng`;
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
    (lowerName.includes('phở') && !lowerName.includes('cuốn')) ||
    lowerName.includes('miến') ||
    (lowerName.includes('mì') && !lowerName.includes('bánh mì')) ||
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
  const aliasId = RECIPE_SLUG_ALIASES[dish.id] || Object.keys(RECIPE_SLUG_ALIASES).find((k) => RECIPE_SLUG_ALIASES[k] === dish.id);
  if (aliasId && CURATED_RECIPES[aliasId]) {
    return CURATED_RECIPES[aliasId];
  }

  // Derive cooking method & ingredients intelligently based on categories and tags
  const isRollOrBanhMi =
    dish.category === 'banhmi_cuon' ||
    dish.name.toLowerCase().includes('bánh mì') ||
    dish.name.toLowerCase().includes('cuốn') ||
    dish.name.toLowerCase().includes('gỏi cuốn') ||
    dish.name.toLowerCase().includes('bò bía') ||
    dish.name.toLowerCase().includes('nem');

  const isHotpot =
    !isRollOrBanhMi &&
    (dish.name.toLowerCase().includes('lẩu') || (dish.category === 'lau_chao' && dish.id.startsWith('lau')));

  const isSoupOrNoodle =
    !isRollOrBanhMi &&
    !isHotpot &&
    (dish.category === 'bun_pho_mi' ||
      dish.category === 'bun_pho' ||
      dish.category === 'lau_chao' ||
      dish.name.toLowerCase().includes('bún') ||
      (dish.name.toLowerCase().includes('phở') && !dish.name.toLowerCase().includes('cuốn')) ||
      dish.name.toLowerCase().includes('hủ tiếu') ||
      (dish.name.toLowerCase().includes('mì') && !dish.name.toLowerCase().includes('bánh mì')) ||
      dish.name.toLowerCase().includes('canh'));

  const isRiceOrStickyRice =
    dish.category === 'com_xoi' ||
    dish.category === 'com' ||
    dish.name.toLowerCase().includes('cơm') ||
    dish.name.toLowerCase().includes('xôi');

  const isGrillOrFried =
    dish.category === 'nuong_chien' ||
    dish.category === 'mon_nhau' ||
    dish.name.toLowerCase().includes('nướng') ||
    dish.name.toLowerCase().includes('chiên') ||
    dish.name.toLowerCase().includes('xào');

  // Hotpot fallback template
  if (isHotpot) {
    return {
      dishId: dish.id,
      dishName: dish.name,
      seoTitle: getRecipeArticleTitle(dish),
      prepTime: '30 phút (sơ chế thịt & nhặt rau nấm)',
      cookTime: '45 - 60 phút (ninh nước dùng lẩu)',
      difficulty: 'Trung bình',
      servings: '4 - 6 người ăn',
      ingredients: [
        {
          category: 'Đồ nhúng lẩu chính',
          items: [
            `Phần thịt / hải sản tươi ngon đặc trưng của ${dish.vietnameseName}`,
            'Xương ống heo hoặc xương gà hầm lấy nước dùng ngọt thanh tự nhiên',
            'Đậu phụ tươi, nấm các loại (nấm kim châm, nấm đùi gà, nấm rơm)',
          ],
        },
        {
          category: 'Gia vị & Hương liệu nước lẩu',
          items: [
            'Hành tím nướng, gừng tươi đập dập, sả cây, cà chua chín đỏ',
            'Gia vị chua cay đặc trưng (giấm bỗng, me hoặc sa tế chua cay)',
            'Nước mắm cốt truyền thống, muối hạt, đường phèn, tiêu sọ',
          ],
        },
        {
          category: 'Rau nhúng & Đồ ăn kèm',
          items: [
            'Rau muống, cải cúc, cải ngọt, hoa chuối hoặc các loại rau đồng nội',
            'Bún tươi sợi nhỏ hoặc mì gói, bánh đa ăn kèm',
            'Nước mắm ớt cay, muối tiêu chanh hoặc sa tế tôm chấm lẩu',
          ],
        },
      ],
      steps: [
        {
          step: 1,
          title: 'Ninh nước dùng xương ngọt thanh tự nhiên',
          time: '45 phút',
          heat: 'Lửa liu riu sau khi sôi',
          goal: 'Nước hầm xương trong veo, ngọt đậm đà từ tủy xương, không lẫn mùi tanh',
          actionPoints: [
            'Chặt xương ống thành khúc, chần qua nước sôi gừng muối trong 3 phút rồi rửa xả lại thật sạch.',
            'Cho xương vào nồi cùng 2.5 - 3 lít nước lọc, đun sôi bùng rồi hớt sạch bọt.',
            'Hạ lửa nhỏ liu riu ninh trong 45 phút cùng hành tím nướng để nước dùng có vị ngọt thanh sâu lắng.',
          ],
          description:
            'Chần xương qua nước sôi gừng muối để khử sạch bọt bẩn. Rửa lại nước lạnh rồi cho vào nồi ninh liu riu cùng hành nướng cho nước dùng ngọt thanh.',
          tip: 'Không đậy kín vung và hớt bọt thường xuyên để nước dùng luôn trong suốt.',
        },
        {
          step: 2,
          title: 'Sơ chế thịt, hải sản và rau nấm nhúng lẩu',
          time: '20 phút',
          heat: 'Nhiệt độ phòng',
          goal: 'Đồ nhúng tươi ngon, sạch sẽ, thái lát mỏng đẹp mắt sẵn sàng lên bàn',
          actionPoints: [
            `Thịt và hải sản cho ${dish.vietnameseName} rửa sạch, thái lát mỏng vừa ăn để nhúng nhanh chín mềm.`,
            'Rau nhúng và các loại nấm nhặt rửa sạch, ngâm nước muối loãng 10 phút rồi vớt ra vẩy ráo nước.',
            'Bày biện các loại thịt, hải sản, đậu phụ và rau nấm ra từng đĩa riêng đẹp mắt.',
          ],
          description:
            `Thịt và hải sản rửa sạch thái mỏng vừa ăn. Rau nấm ngâm rửa sạch ráo nước. Xếp gọn gàng ra từng đĩa riêng để chuẩn bị nhúng lẩu.`,
          tip: 'Thịt bò hoặc thịt nạc nhúng lẩu thái thật mỏng ngang thớ để khi nhúng vào nước sôi chín tái mềm mọng, không bị dai.',
        },
        {
          step: 3,
          title: 'Nấu nước lẩu chuẩn vị đậm đà thơm lừng',
          time: '15 phút',
          heat: 'Lửa vừa',
          goal: 'Nước lẩu dậy mùi thơm nức, màu sắc óng ả, vị chua cay mặn ngọt hài hòa',
          actionPoints: [
            'Phi thơm hành tỏi và ớt với chút dầu màu điều, xào cà chua chín tới cho lên màu đẹp.',
            'Trút phần nước hầm xương vào nồi lẩu, đun sôi lăn tăn.',
            'Nêm nếm gia vị chua cay, nước mắm ngon, hạt nêm và chút đường phèn cho tròn vị đậm đà.',
          ],
          description:
            'Phi thơm hành tỏi xào cà chua lấy màu óng ả. Đổ nước dùng xương vào đun sôi rồi nêm nếm gia vị chua cay, nước mắm ngon vừa khẩu vị gia đình.',
          tip: 'Đường phèn giúp làm dịu vị chua và tạo hậu vị ngọt thanh tao cho nồi nước lẩu.',
        },
        {
          step: 4,
          title: 'Bày bàn tiệc lẩu & Thưởng thức quây quần nóng hổi',
          time: '5 phút',
          heat: 'Bếp lẩu sôi nhẹ trên bàn ăn',
          goal: 'Nồi lẩu sôi sùng sục nghi ngút khói, đồ nhúng tươi giòn ngọt tự nhiên',
          actionPoints: [
            'Đặt nồi nước lẩu lên bếp từ/bếp cồn giữa bàn ăn, thả đậu phụ và nấm vào trước.',
            'Khi nước sôi, gắp từng miếng thịt, hải sản và rau xanh nhúng vừa chín tới.',
            'Gắp đồ ăn kèm bún tươi, chan nước lẩu chua cay nóng hổi và chấm đẫm nước chấm gia vị đậm đà.',
          ],
          description:
            'Đặt bếp lẩu giữa bàn ăn. Nước lẩu sôi thì nhúng thịt, hải sản và rau nấm ăn kèm bún tươi. Thưởng thức nóng hổi cùng gia đình!',
          tip: 'Nhúng đồ ăn đến đâu ăn đến đó để thịt giữ được độ ngọt mọng và rau giữ nguyên độ giòn tươi xanh.',
        },
      ],
      chefSecret:
        'Bí quyết nồi lẩu ngon bất bại: Ninh xương lấy nước ngọt tự nhiên thay vì dùng bột ngọt, phi hành tỏi xào cà chua lấy màu đỏ óng ả, và luôn giữ nước lẩu sôi nhẹ trên bàn để đồ nhúng chín tới hoàn hảo.',
      recommendedSauce:
        'Nước mắm mặn ớt xiêm cay xé lưỡi hoặc đĩa muối tiêu chanh ớt và sa tế tôm tự chưng.',
    };
  }

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
  'com-rang-dua-bo',
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
  'com-rang-dua-bo',
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

export const RECIPE_SLUG_ALIASES: Record<string, string> = {
  'bun-bo-hue': 'bun-bo-hue-dac-biet',
  'cach-nau-bun-bo-hue': 'bun-bo-hue-dac-biet',
  'thit-kho-tau': 'com-thit-kho-tau',
  'cach-nau-thit-kho-tau': 'com-thit-kho-tau',
  'nem-nuong-nha-trang': 'nem-nuong-nha-trang-cuon',
  'cach-nau-nem-nuong-nha-trang': 'nem-nuong-nha-trang-cuon',
  'cach-lam-nem-nuong-nha-trang': 'nem-nuong-nha-trang-cuon',
  'com-rang-dua-bo': 'com-rang-dua-bo',
  'cach-nau-com-rang-dua-bo': 'com-rang-dua-bo',
  'cach-lam-com-rang-dua-bo': 'com-rang-dua-bo',
  'cong-thuc/com-rang-dua-bo': 'com-rang-dua-bo',
  'chao-suon-sun': 'chao-suon-sun-quay',
  'chao-suon-sun-bo-duong': 'chao-suon-sun-quay',
  'cach-nau-chao-suon-sun': 'chao-suon-sun-quay',
  'cach-nau-chao-suon-sun-bo-duong': 'chao-suon-sun-quay',
  'lau-rieu-cua': 'lau-rieu-cua-bap-bo',
  'cach-nau-lau-rieu-cua': 'lau-rieu-cua-bap-bo',
  'lau-rieu-cua-bap-bo': 'lau-rieu-cua-bap-bo',
  'cach-nau-lau-rieu-cua-bap-bo': 'lau-rieu-cua-bap-bo',
  'cach-nau-lau-rieu-cua-bap-bo-chua-cay': 'lau-rieu-cua-bap-bo',
  'lau-rieu-cua-bap-bo-suon-sun': 'lau-rieu-cua-bap-bo',
  'cach-nau-lau-rieu-cua-bap-bo-suon-sun': 'lau-rieu-cua-bap-bo',
  'mien-luon': 'mien-luon-gion-xao-lan',
  'mien-luon-gion': 'mien-luon-gion-xao-lan',
  'cach-nau-mien-luon': 'mien-luon-gion-xao-lan',
  'cach-nau-mien-luon-gion': 'mien-luon-gion-xao-lan',
  'cach-nau-mien-luon-gion-nuoc-dung': 'mien-luon-gion-xao-lan',
  'cach-nau-mien-luon-gion-nuoc-dung-thanh-ngot': 'mien-luon-gion-xao-lan',
  'cach-nau-mien-luon-gion-xao-lan': 'mien-luon-gion-xao-lan',
};

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

  const resolvedClean = RECIPE_SLUG_ALIASES[clean] || clean;

  return dishes.find((d) => {
    const slug = getRecipeSlug(d);
    return (
      d.id === clean ||
      d.id === resolvedClean ||
      slug === clean ||
      slug === resolvedClean ||
      clean === `cach-nau-${d.id}` ||
      clean === `cach-lam-${d.id}` ||
      resolvedClean === `cach-nau-${d.id}` ||
      resolvedClean === `cach-lam-${d.id}` ||
      clean.replace(/^(cach-nau-|cach-lam-)/, '') === d.id.replace(/^(cach-nau-|cach-lam-)/, '') ||
      resolvedClean.replace(/^(cach-nau-|cach-lam-)/, '') === d.id.replace(/^(cach-nau-|cach-lam-)/, '')
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

