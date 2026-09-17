import { FamilyMealDish } from '../types';

export interface FamilyDishRecipe {
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: string[];
  steps: { step: number; title: string; desc: string }[];
  tip: string;
}

export const FAMILY_DISH_RECIPES: Record<string, FamilyDishRecipe> = {
  // --- THỨ HAI ---
  'com-ca-kho-to': {
    prepTime: '15 phút',
    cookTime: '30 phút',
    servings: '3 - 4 người',
    ingredients: [
      '500g cá lóc hoặc cá bống làm sạch, cắt khúc vừa ăn',
      '100g thịt ba chỉ heo thái con chì (kho cùng cá ngậy béo)',
      '2 thìa canh nước mắm ngon, 1 thìa nước màu dừa Bến Tre',
      'Tỏi băm, hành tím, ớt hiểm đỏ, tiêu sọ đập dập, hành lá',
    ],
    steps: [
      {
        step: 1,
        title: 'Ướp cá & thịt',
        desc: 'Ướp cá và thịt ba chỉ với 2 thìa mắm, 1 thìa đường, nước màu dừa, hành tỏi băm và tiêu sọ trong 20 phút cho ngấm sâu.',
      },
      {
        step: 2,
        title: 'Áp chảo thịt & xếp cá',
        desc: 'Làm nóng tộ đất với chút dầu ăn, cho thịt ba chỉ vào đảo cháy cạnh xém vàng, sau đó xếp từng khúc cá vào áp chảo 2 mặt.',
      },
      {
        step: 3,
        title: 'Kho liu riu kẹo sốt',
        desc: 'Châm nước sôi (hoặc nước dừa tươi) sâm sấp mặt cá. Đun sôi rồi hạ nhỏ lửa liu riu 25 phút cho nước sốt keo sánh, rắc ớt hiểm và hành hoa.',
      },
    ],
    tip: 'Kho bằng tộ đất trên lửa liu riu giúp thịt cá săn chắc, đậm đà màu cánh gián mà không bị bở nát.',
  },

  'canh-chua-ca-loc': {
    prepTime: '15 phút',
    cookTime: '15 phút',
    servings: '3 - 4 người',
    ingredients: [
      '300g cá lóc tươi cắt khúc (đầu hoặc thân cá)',
      '1/4 quả dứa chín gọt mắt thái lát, 2 quả cà chua bổ múi',
      '1 cây bạc hà (dọc mùng), 5 quả đậu bắp, 100g giá đỗ',
      '1 vắt me chua lọc lấy nước cốt, rau ngổ, ngò gai, tỏi phi',
    ],
    steps: [
      {
        step: 1,
        title: 'Nấu nước dùng chua thanh',
        desc: 'Đun sôi 1 lít nước, cho nước cốt me dốt cùng dứa và cà chua vào nấu 3 phút để nước canh ra vị chua ngọt tự nhiên.',
      },
      {
        step: 2,
        title: 'Nấu chín ngọt cá',
        desc: 'Thả cá lóc vào nồi canh đang sôi nhẹ. Nấu trong 5-7 phút cho cá vừa chín tới, vớt bọt thường xuyên để nước trong veo.',
      },
      {
        step: 3,
        title: 'Thêm rau & hoàn tất',
        desc: 'Cho đậu bắp, bạc hà và giá đỗ vào đun sôi bùng 1 phút. Nêm 2 thìa nước mắm ngon, tắt bếp rồi rắc ngò gai, rau ngổ và tỏi phi vàng thơm.',
      },
    ],
    tip: 'Cho bạc hà và giá đỗ sau cùng ngay trước khi tắt bếp để giữ trọn độ giòn xốp mát lành.',
  },

  'rau-muong-xao-toi': {
    prepTime: '10 phút',
    cookTime: '5 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 bó rau muống non nhặt ngọn, rửa sạch để ráo',
      '1 củ tỏi ta (1/2 băm nhuyễn, 1/2 đập dập nguyên tép)',
      '2 thìa mỡ heo (hoặc dầu ăn), 1 thìa nước mắm, hạt nêm, tiêu',
    ],
    steps: [
      {
        step: 1,
        title: 'Phi thơm tỏi giòn',
        desc: 'Đặt chảo gang lên bếp cho thật nóng già, cho mỡ heo vào rồi phi phần tỏi băm đến khi vàng giòn dậy mùi thơm phức.',
      },
      {
        step: 2,
        title: 'Xào lửa bốc khói',
        desc: 'Bật lửa cực đại, trút rau muống vào đảo nhanh và đều tay trong 2-3 phút để rau chín đều mà vẫn xanh mướt.',
      },
      {
        step: 3,
        title: 'Nêm vị & hoàn tất',
        desc: 'Nêm nước mắm cốt và hạt nêm vừa ăn, thả nốt phần tỏi đập dập vào đảo nhanh 30 giây rồi trút ngay ra đĩa.',
      },
    ],
    tip: 'Bí quyết rau muống xanh giòn là chảo phải thật nóng, lửa bốc khói và xào nhanh dưới 4 phút, không đậy nắp vung.',
  },

  'chen-mam-nhi-chuoi-cau': {
    prepTime: '3 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '3 thìa canh nước mắm nhỉ truyền thống nguyên chất (40 độ đạm)',
      '3 quả ớt xiêm xanh/đỏ cay nồng dầm nhẹ',
      '1 nải chuối cau chín vàng ươm, vỏ mỏng ngọt thơm',
    ],
    steps: [
      {
        step: 1,
        title: 'Dầm ớt nước mắm nhỉ',
        desc: 'Rót nước mắm nhỉ hảo hạng ra chén sứ nhỏ, dùng đầu đũa dầm nhẹ quả ớt xiêm để tinh dầu ớt cay thơm hòa quyện.',
      },
      {
        step: 2,
        title: 'Bày đĩa chuối cau',
        desc: 'Chuối cau tách từng quả hoặc để nguyên nải nhỏ, rửa sạch vỏ ngoài, lau khô và bày lên đĩa thưởng thức sau bữa ăn.',
      },
    ],
    tip: 'Nước mắm nhỉ chuẩn độ đạm cao dầm ớt tươi chấm rau muống luộc hay cá kho đều cực kỳ bén cơm.',
  },

  'suon-heo-rim-man-ngot': {
    prepTime: '15 phút',
    cookTime: '25 phút',
    servings: '3 - 4 người',
    ingredients: [
      '500g sườn non heo chặt khúc 3cm vừa ăn',
      '2 thìa canh nước mắm cốt, 1.5 thìa đường thốt nốt/đường trắng',
      'Tỏi băm, hành tím băm, ớt băm, tiêu sọ, hành hoa',
    ],
    steps: [
      {
        step: 1,
        title: 'Chần & ướp sườn',
        desc: 'Chần sườn qua nước sôi khử sạch bọt. Ướp sườn với hành tỏi băm, 1 thìa mắm, hạt nêm và tiêu trong 15 phút.',
      },
      {
        step: 2,
        title: 'Thắng màu caramel',
        desc: 'Đun nóng 1 thìa dầu với 1 thìa đường đến khi ngả màu cánh gián, cho sườn vào xào săn trên lửa lớn để áo đều màu vàng óng.',
      },
      {
        step: 3,
        title: 'Rim sánh keo',
        desc: 'Châm 1/2 chén nước ấm, nêm thêm mắm và đường cho vị mặn ngọt đậm đà. Đậy vung rim nhỏ lửa 20 phút cho nước sốt keo sánh quyện đều.',
      },
    ],
    tip: 'Khi nước sốt bắt đầu cạn, hạ lửa thật nhỏ và đảo liên tục để sườn bám đều lớp sốt bóng mượt mà không bị khét.',
  },

  'canh-rau-ngot-thit-bam': {
    prepTime: '10 phút',
    cookTime: '10 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 bó rau ngót non tuốt lá sạch, rửa ráo',
      '150g thịt nạc dăm heo băm nhỏ',
      '1 củ hành tím băm, nước mắm ngon, hạt nêm, muối, tiêu',
    ],
    steps: [
      {
        step: 1,
        title: 'Vò nhẹ rau ngót',
        desc: 'Dùng tay vò nhẹ các lá rau ngót để lá hơi giập giúp khi nấu nước canh tiết ra vị ngọt thanh tự nhiên và lá mềm dễ ăn.',
      },
      {
        step: 2,
        title: 'Xào săn thịt băm',
        desc: 'Phi thơm hành tím với 1 thìa dầu ăn, cho thịt băm vào xào săn, nêm 1/2 thìa nước mắm cho dậy mùi thơm.',
      },
      {
        step: 3,
        title: 'Nấu canh thanh mát',
        desc: 'Đổ 1 lít nước lọc vào đun sôi, trút rau ngót vào nấu sôi bùng khoảng 3-4 phút, nêm nếm gia vị vừa ăn rồi múc ra tô.',
      },
    ],
    tip: 'Vò nhẹ rau ngót trước khi nấu là bí quyết gia truyền giúp nước canh trong veo, ngọt lịm mà không bị chát cứng.',
  },

  'dau-que-xao-toi': {
    prepTime: '10 phút',
    cookTime: '7 phút',
    servings: '3 - 4 người',
    ingredients: [
      '350g đậu que non tước xơ 2 bên mép, bẻ đôi',
      '1 củ tỏi đập dập thơm lừng',
      '1 thìa mỡ heo/dầu ăn, hạt nêm, nước mắm, tiêu xay',
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế đậu',
        desc: 'Đậu que tước xơ kỹ, rửa sạch để ráo nước.',
      },
      {
        step: 2,
        title: 'Phi tỏi thơm',
        desc: 'Đun nóng chảo dầu, phi thơm 1/2 lượng tỏi đập dập cho vàng óng.',
      },
      {
        step: 3,
        title: 'Xào giòn ngọt',
        desc: 'Trút đậu que vào xào lửa lớn trong 4-5 phút, nêm hạt nêm và chút mắm, cho phần tỏi còn lại vào đảo đều rồi tắt bếp.',
      },
    ],
    tip: 'Xào lửa to nhanh tay giúp đậu giữ được màu xanh bóng và độ ngọt giòn sần sật.',
  },

  'ca-phao-muoi-dua-hau': {
    prepTime: '5 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 bát cà pháo muối trắng giòn rụm',
      '1/4 quả dưa hấu mát lạnh ngọt nước',
      'Ớt tươi xắt lát, mắm tôm hoặc nước mắm chấm kèm',
    ],
    steps: [
      {
        step: 1,
        title: 'Bày đĩa cà pháo',
        desc: 'Gắp cà pháo muối giòn ra bát nhỏ, thêm vài lát ớt hiểm tươi đỏ rực.',
      },
      {
        step: 2,
        title: 'Gọt dưa hấu tráng miệng',
        desc: 'Dưa hấu bỏ vỏ, cắt miếng tam giác hoặc thanh dài vừa miệng bày ra đĩa ăn tráng miệng sau bữa cơm.',
      },
    ],
    tip: 'Cà pháo giòn rụm ăn cùng canh cua, canh rau ngót là nét văn hóa ẩm thực mộc mạc đưa cơm bậc nhất.',
  },

  // --- THỨ BA ---
  'thit-kho-tau': {
    prepTime: '20 phút',
    cookTime: '45 phút',
    servings: '4 - 5 người',
    ingredients: [
      '600g thịt ba chỉ hoặc thịt đùi heo cắt vuông 4cm',
      '10 quả trứng cút hoặc 4 quả trứng vịt luộc bóc vỏ',
      '1 quả dừa xiêm lấy nước ngọt thanh',
      'Nước mắm cốt cá cơm, hành tím, tỏi băm, ớt sừng',
    ],
    steps: [
      {
        step: 1,
        title: 'Ướp thịt',
        desc: 'Ướp thịt với 3 thìa nước mắm ngon, 1 thìa đường, tiêu, hành tỏi băm trong 30 phút.',
      },
      {
        step: 2,
        title: 'Nấu nước dừa',
        desc: 'Cho nước dừa tươi vào nồi đun sôi, trút thịt đã ướp vào đun lửa lớn, hớt sạch bọt.',
      },
      {
        step: 3,
        title: 'Kho rục trứng cút',
        desc: 'Hạ lửa nhỏ liu riu kho trong 35 phút, thả trứng cút vào kho cùng cho thấm đẫm vị nước dừa ngả màu nâu hổ phách.',
      },
    ],
    tip: 'Kho bằng 100% nước dừa tươi giúp mỡ thịt trong veo, phần nạc mềm tan trong miệng mà không bị khô.',
  },

  'canh-cua-dong': {
    prepTime: '25 phút',
    cookTime: '15 phút',
    servings: '4 người',
    ingredients: [
      '300g cua đồng tươi giã nhuyễn lọc lấy nước cốt',
      '1 bó rau mồng tơi ngắt lá non, 1 quả mướp hương gọt vỏ thái vát',
      '1 thìa mắm tôm ngon khử tanh, muối hạt, hành tím phi',
    ],
    steps: [
      {
        step: 1,
        title: 'Nấu thịt cua nổi tảng',
        desc: 'Khuấy đều nước cua với chút muối, đun lửa vừa. Khi thịt cua bắt đầu đông lại thành tảng lớn nổi lên mặt nước thì gạt nhẹ sang một bên.',
      },
      {
        step: 2,
        title: 'Nấu rau mồng tơi & mướp',
        desc: 'Hạ nhỏ lửa, thả mướp hương và rau mồng tơi vào nồi, nêm thìa mắm tôm ngon và gia vị vừa vặn.',
      },
      {
        step: 3,
        title: 'Hoàn tất & chưng gạch cua',
        desc: 'Canh sôi bùng 2 phút rau vừa chín xanh thì tắt bếp, chưng gạch cua với hành phi rưới lên trên mặt tô canh.',
      },
    ],
    tip: 'Không khuấy mạnh khi nước cua đang sôi để tảng riêu cua kết tụ nguyên vẹn vàng óng ngậy béo.',
  },

  'bau-luoc-kho-quet': {
    prepTime: '10 phút',
    cookTime: '12 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 quả bầu sao non (500g) gọt vỏ, cắt khúc dài ngón tay',
      '50g tôm khô loại ngon ngâm nước ấm cho mềm nở',
      '50g mỡ heo phần gáy thái hạt lựu thắng lấy tóp mỡ giòn rụm',
      '3 thìa nước mắm ngon, 2 thìa đường thốt nốt, ớt hiểm, tiêu sọ đập dập',
    ],
    steps: [
      {
        step: 1,
        title: 'Nấu kho quẹt quánh kẹo',
        desc: 'Thắng mỡ lấy tóp giòn. Phi thơm hành tỏi với tôm khô, đổ hỗn hợp mắm đường tiêu ớt vào tộ đất đun liu riu cho keo sánh, trút tóp mỡ giòn vào.',
      },
      {
        step: 2,
        title: 'Luộc bầu xanh mướt',
        desc: 'Đun sôi nước với chút muối hạt, thả bầu vào luộc 3-4 phút trên lửa lớn cho chín tới ngọt mềm mà vẫn giữ màu xanh mát mắt.',
      },
      {
        step: 3,
        title: 'Bày đĩa & thưởng thức',
        desc: 'Vớt bầu ra đĩa, đặt tộ kho quẹt nóng hổi rắc tiêu sọ ở giữa, chấm miếng bầu ngập trong sốt kho quẹt đậm đà.',
      },
    ],
    tip: 'Bầu non chỉ luộc vừa chín tới để giữ độ giòn ngọt mọng nước, không đậy nắp vung khi luộc để bầu không bị sậm màu.',
  },

  'ca-phao-oi-xi-muoi': {
    prepTime: '5 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 bát con cà pháo muối trắng giòn rôm rốp, cắt đôi nếu quả to',
      '2 quả ổi lê/ổi nữ hoàng tươi giòn, rửa sạch gọt vỏ khía múi cau',
      '1 thìa muối xí muội mặn ngọt chua cay, vài lát ớt sừng đỏ tươi',
    ],
    steps: [
      {
        step: 1,
        title: 'Bày cà pháo muối giòn',
        desc: 'Vớt cà pháo muối trắng giòn ra chén sứ nhỏ, rưới chút nước muối cà và thêm vài lát ớt hiểm tươi đỏ rực.',
      },
      {
        step: 2,
        title: 'Gọt ổi & rắc xí muội',
        desc: 'Ổi rửa sạch, cắt miếng cau vừa miệng xếp ra đĩa sứ rồi rắc đều bột muối xí muội lên trên.',
      },
    ],
    tip: 'Cà pháo giòn tan ăn kèm canh cua mồng tơi đưa cơm tuyệt đối, tráng miệng ổi xí muội thanh mát ngọt giọng.',
  },

  'tom-dong-rim-ba-chi': {
    prepTime: '15 phút',
    cookTime: '20 phút',
    servings: '3 - 4 người',
    ingredients: [
      '300g tôm đồng tươi cắt bỏ râu và ngạnh nhọn',
      '200g thịt ba chỉ heo thái con chì nhỏ',
      '2 thìa mắm nhĩ, 1 thìa đường thốt nốt, tỏi ớt băm, hành hoa, tiêu',
    ],
    steps: [
      {
        step: 1,
        title: 'Xào cháy cạnh ba chỉ',
        desc: 'Cho thịt ba chỉ vào chảo đảo săn trên lửa vừa cho tiết bớt mỡ và xém cạnh vàng thơm.',
      },
      {
        step: 2,
        title: 'Rim tôm đồng giòn bóng',
        desc: 'Trút tôm vào đảo đều đến khi vỏ tôm chuyển đỏ hồng, nêm mắm đường và chút tiêu đun liu riu cho nước sốt bám đều bóng bẩy.',
      },
      {
        step: 3,
        title: 'Rắc hành tiêu hoàn tất',
        desc: 'Khi nước sốt keo lại sền sệt, rắc hành hoa thái nhỏ và tiêu sọ đập dập, tắt bếp trút ra đĩa ăn với cơm nóng.',
      },
    ],
    tip: 'Rim lửa liu riu cuối giai đoạn để vỏ tôm giòn rụm mà thịt ba chỉ ngấm sâu vị mặn ngọt đậm đà.',
  },

  'canh-bi-xanh-tom-tuoi': {
    prepTime: '10 phút',
    cookTime: '10 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 quả bí xanh (bí đao) non nạo vỏ, thái lát mỏng',
      '150g tôm tươi bóc vỏ giã dập hoặc băm nhỏ',
      'Hành tím phi, hành lá, ngò rí, nước mắm, tiêu sọ',
    ],
    steps: [
      {
        step: 1,
        title: 'Xào ngọt tôm tươi',
        desc: 'Phi thơm hành tím, cho tôm băm vào xào săn với chút mắm cho dậy mùi thơm ngọt.',
      },
      {
        step: 2,
        title: 'Nấu nước dùng thanh trong',
        desc: 'Châm 1 lít nước sôi, đun lửa vừa và vớt sạch bọt cho nước canh trong veo.',
      },
      {
        step: 3,
        title: 'Thả bí đao & hoàn tất',
        desc: 'Thả bí đao thái lát vào đun sôi bùng 2 phút cho bí vừa chín tới trong veo, nêm gia vị, rắc hành ngò tiêu sọ rồi tắt bếp.',
      },
    ],
    tip: 'Bí đao cắt lát mỏng nấu nhanh chín, không nấu quá lâu bí sẽ bị nát và chua nước.',
  },

  'bap-cai-xao-ca-chua': {
    prepTime: '8 phút',
    cookTime: '7 phút',
    servings: '3 - 4 người',
    ingredients: [
      '350g bắp cải trắng thái sợi mỏng vừa',
      '2 quả cà chua chín đỏ bổ múi cau',
      'Hành hoa, tỏi băm, nước mắm ngon, hạt nêm, tiêu',
    ],
    steps: [
      {
        step: 1,
        title: 'Xào cà chua nhuyễn',
        desc: 'Phi thơm tỏi, cho 1/2 cà chua vào xào mềm tạo màu và vị chua thanh dịu.',
      },
      {
        step: 2,
        title: 'Xào bắp cải lửa lớn',
        desc: 'Trút bắp cải vào đảo đều tay trên lửa to trong 3-4 phút, nêm nước mắm và hạt nêm.',
      },
      {
        step: 3,
        title: 'Thêm cà chua múi & hành hoa',
        desc: 'Cho nốt phần cà chua còn lại cùng hành lá vào đảo nhanh 30 giây để cà chua còn nguyên múi đẹp mắt rồi tắt bếp.',
      },
    ],
    tip: 'Xào bắp cải trên lửa lớn để sợi bắp cải giữ độ giòn sần sật và vị ngọt tự nhiên.',
  },

  'dua-gia-do-he': {
    prepTime: '10 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '200g dưa giá đỗ muối chua giòn cùng hẹ và cà rốt bào sợi',
      '3-4 quả quýt đường mọng nước, vỏ mỏng ngọt lịm',
      'Nước mắm chấm kèm nếu thích',
    ],
    steps: [
      {
        step: 1,
        title: 'Bày đĩa dưa giá',
        desc: 'Gắp dưa giá đỗ hẹ chua ngọt ra đĩa nhỏ, ăn kèm tôm rim thịt chống ngấy tuyệt hảo.',
      },
      {
        step: 2,
        title: 'Bày quýt đường tráng miệng',
        desc: 'Quýt đường rửa sạch vỏ ngoài, khía nhẹ vỏ hoặc bóc sẵn múi bày đĩa dùng tráng miệng sau bữa cơm.',
      },
    ],
    tip: 'Vị chua thanh mát của dưa giá cân bằng hoàn hảo vị béo ngọt của các món thịt kho, tôm rim.',
  },
  'canh-suon-bi-do': {
    prepTime: '15 phút',
    cookTime: '30 phút',
    servings: '3 - 5 người',
    ingredients: [
      '400g sườn non heo tươi, chặt khúc vừa ăn',
      '400g bí đỏ hồ lô gọt vỏ, cắt miếng quân cờ dày',
      '80g đậu phộng (lạc tươi hoặc ngâm nước ấm 20 phút)',
      'Hành lá, ngò gai (mùi tàu) thái nhỏ',
      'Gia vị: 1 thìa mắm cốt, hạt nêm, tiêu xay, hành tím băm',
    ],
    steps: [
      {
        step: 1,
        title: 'Chần & ninh sườn non cùng đậu phộng',
        desc: 'Chần sườn qua nước sôi khử sạch mùi hôi. Cho sườn và đậu phộng vào nồi với 1.2 lít nước, đun sôi rồi hạ lửa nhỏ ninh trong 20 phút cho sườn mềm ngọt nước.',
      },
      {
        step: 2,
        title: 'Nấu bí đỏ dẻo bùi',
        desc: 'Cho bí đỏ vào nấu cùng sườn thêm 7-10 phút cho bí chín mềm dẻo nhưng không bị nát. Nêm 1 thìa hạt nêm và nước mắm vừa miệng.',
      },
      {
        step: 3,
        title: 'Hoàn thiện & rắc rau thơm',
        desc: 'Múc canh ra tô lớn, rắc ngò gai, hành hoa thái nhỏ và chút tiêu xay. Bí đỏ bở bùi, đậu phộng ngậy thơm, nước canh thanh ngọt tự nhiên.',
      },
    ],
    tip: 'Ninh đậu phộng cùng lúc với sườn để hạt đậu mềm bùi hòa quyện trọn vẹn vị ngọt vào nước dùng.',
  },
  'cai-thia-xao-nam': {
    prepTime: '10 phút',
    cookTime: '8 phút',
    servings: '3 - 4 người',
    ingredients: [
      '350g cải thìa non nhặt sạch, chẻ đôi theo chiều dọc',
      '10-12 tai nấm đông cô tươi (hoặc nấm khô ngâm nở khía chữ thập)',
      '2 thìa canh dầu hào ngon, 1 thìa xì dầu (nước tương)',
      '3 tép tỏi đập dập băm nhỏ, 1 thìa dầu mè thơm, mè rang',
    ],
    steps: [
      {
        step: 1,
        title: 'Chần sơ cải thìa xanh mướt',
        desc: 'Đun nồi nước sôi với chút muối và vài giọt dầu ăn, chần cải thìa trong 45 giây rồi vớt ra xả ngay qua nước lạnh để giữ màu xanh bóng giòn.',
      },
      {
        step: 2,
        title: 'Xào nấm đông cô sốt dầu hào',
        desc: 'Phi thơm tỏi băm với dầu ăn, trút nấm đông cô vào xào trên lửa lớn. Thêm dầu hào, nước tương và 2 thìa nước lọc đảo đều cho nấm ngấm sốt nâu óng ánh.',
      },
      {
        step: 3,
        title: 'Xào cải & bày đĩa cánh hoa',
        desc: 'Cho cải thìa vào đảo nhanh tay 1 phút ngấm sốt, rưới dầu mè. Xếp cải thìa quanh đĩa tạo hình cánh hoa, múc nấm lên giữa và rắc mè rang thơm lừng.',
      },
    ],
    tip: 'Chần cải có thêm chút dầu ăn giúp cọng cải xanh mướt bóng bẩy và giòn ngọt chuẩn vị nhà hàng.',
  },
  'kim-chi-xoai-cat': {
    prepTime: '5 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '150g kim chi cải thảo chua cay giòn',
      '1 quả xoài cát Hòa Lộc chín vàng ươm, ngọt thơm lịm',
      'Muối ớt hoặc muối tôm Tây Ninh (tùy khẩu vị)',
    ],
    steps: [
      {
        step: 1,
        title: 'Bày kim chi đưa cơm',
        desc: 'Cắt kim chi thành miếng vừa ăn, gắp ra chén nhỏ. Vị chua cay giòn rụm giúp kích thích vị giác và chống ngấy hoàn hảo cho món sườn xào.',
      },
      {
        step: 2,
        title: 'Gọt & cắt xoài tráng miệng',
        desc: 'Xoài cát gọt vỏ khéo léo, thái má xoài thành các khối vuông đẹp mắt hoặc khía quân cờ bày ra đĩa thưởng thức sau bữa ăn.',
      },
    ],
    tip: 'Xoài cát Hòa Lộc ngọt lịm mọng nước là món tráng miệng thanh mát hoàn hảo sau bữa cơm đậm vị.',
  },
  'cha-ca-thu-sot-ca': {
    prepTime: '10 phút',
    cookTime: '15 phút',
    servings: '3 - 4 người',
    ingredients: [
      '400g chả cá thu tươi chiên vàng, thái miếng vừa ăn',
      '3 quả cà chua chín đỏ mọng, thái hạt lựu hoặc múi cau',
      '1 nắm thì là tươi rửa sạch, cắt khúc 3cm',
      '3 nhánh hành hoa, 2 tép tỏi băm, 1 củ hành tím băm',
      'Gia vị: 1.5 thìa nước mắm ngon, 1 thìa đường, hạt nêm, tiêu xay',
    ],
    steps: [
      {
        step: 1,
        title: 'Làm sốt cà chua đỏ thắm',
        desc: 'Phi thơm hành tím và tỏi băm, cho cà chua vào xào nhuyễn cùng 1 thìa nước mắm và chút đường cho cà chua nhanh mềm nhừ lên màu đỏ sánh mịn.',
      },
      {
        step: 2,
        title: 'Rim chả cá ngấm vị',
        desc: 'Cho từng miếng chả cá thu vào đảo đều với sốt cà, châm 3 thìa nước lọc đun sôi liu riu 5-7 phút cho chả cá hút đẫm vị chua ngọt đậm đà.',
      },
      {
        step: 3,
        title: 'Rắc thì là & hành hoa',
        desc: 'Khi nước sốt sền sệt, trút thì là và hành hoa cắt khúc vào đảo nhanh tay rồi tắt bếp ngay. Múc ra đĩa, rắc hạt tiêu thơm nức mũi.',
      },
    ],
    tip: 'Thì là cho vào bước cuối cùng rồi tắt bếp ngay để giữ trọn màu xanh mướt và tinh dầu thơm đặc trưng.',
  },
  'canh-rau-den-tom-kho': {
    prepTime: '10 phút',
    cookTime: '10 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 bó rau dền đỏ tươi non (khoảng 300g), nhặt lá non rửa sạch để ráo',
      '40g tôm khô loại ngon, ngâm nước ấm 15 phút rồi giã dập',
      '1 củ hành tím đập dập băm nhỏ',
      'Gia vị: Nước mắm cốt, muối, bột ngọt/hạt nêm, tiêu sọ',
    ],
    steps: [
      {
        step: 1,
        title: 'Xào thơm tôm khô',
        desc: 'Phi thơm hành tím với 1 thìa dầu ăn, trút tôm khô giã dập vào đảo săn thơm dậy mùi đặc trưng.',
      },
      {
        step: 2,
        title: 'Nấu nước dùng ngọt thanh',
        desc: 'Chế 1 lít nước lọc vào đun sôi bùng, vớt bọt nếu có để nước canh trong veo, nêm 1/2 thìa muối và 1 thìa hạt nêm.',
      },
      {
        step: 3,
        title: 'Nấu rau dền vừa chín tới',
        desc: 'Thả rau dền đỏ vào nồi nước đang sôi, ấn nhẹ cho rau ngập nước. Đun sôi bùng lại 2 phút là rau chín mềm, tắt bếp múc ra tô có sắc nước hồng tía bắt mắt.',
      },
    ],
    tip: 'Rau dền nấu rất nhanh chín, không đậy nắp nồi khi nấu để giữ màu nước canh đỏ tím rực rỡ và rau không bị nồng.',
  },
  'su-su-xao-toi': {
    prepTime: '10 phút',
    cookTime: '7 phút',
    servings: '3 - 4 người',
    ingredients: [
      '2 quả su su non gọt vỏ sạch nhựa, thái sợi mỏng đều tay',
      '1 củ tỏi ta băm nhỏ (chia làm 2 phần phi và xào)',
      'Hành hoa, ngò rí, tiêu sọ xay',
      'Gia vị: 1 thìa dầu ăn, 1 thìa dầu hào, 1/2 thìa hạt nêm',
    ],
    steps: [
      {
        step: 1,
        title: 'Phi thơm tỏi ta',
        desc: 'Cho dầu ăn vào chảo làm nóng, phi một nửa lượng tỏi băm đến khi vàng thơm giòn rụm rồi vớt ra để riêng.',
      },
      {
        step: 2,
        title: 'Xào su su trên lửa lớn',
        desc: 'Dùng chảo đó phi nốt phần tỏi còn lại, trút su su thái sợi vào xào nhanh tay trên lửa lớn. Nêm dầu hào và hạt nêm đảo đều tay 3-5 phút.',
      },
      {
        step: 3,
        title: 'Hoàn thiện đĩa rau giòn ngọt',
        desc: 'Su su vừa chín tới trong bóng vẫn giữ được độ giòn ngọt tự nhiên thì tắt bếp. Múc ra đĩa, rắc tỏi phi vàng và tiêu xay lên trên.',
      },
    ],
    tip: 'Xào trên lửa thật to và đảo liên tục để sợi su su giòn ngọt, bóng bẩy mà không bị ra nước.',
  },
  'dua-leo-man-hau': {
    prepTime: '5 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '2 quả dưa leo non tươi giòn, rửa sạch ngâm nước muối',
      '300g mận hậu chín mọng (mận đỏ Sơn La/Mộc Châu)',
      '1 chén nhỏ muối ớt Tây Ninh hoặc muối tôm chua cay',
    ],
    steps: [
      {
        step: 1,
        title: 'Thái dưa leo ăn kèm',
        desc: 'Cắt bỏ 2 đầu dưa leo xoa nhẹ cho ra bớt nhựa, thái lát chéo vừa ăn xếp ra góc đĩa để chấm cùng nước sốt cà chua của chả cá.',
      },
      {
        step: 2,
        title: 'Bổ mận hậu tráng miệng',
        desc: 'Mận hậu rửa sạch ngâm nước muối loãng, dùng dao khía đôi hoặc bổ tư bày đĩa, chấm cùng muối ớt chua cay ngọt dịu mọng nước.',
      },
    ],
    tip: 'Dưa leo chấm sốt cà chua chả cá rất giòn ngọt đưa cơm, còn mận hậu chua ngọt chấm muối tôm giúp tráng miệng thanh mát hoàn hảo.',
  },
  'ga-ta-kho-gung-sa-ot': {
    prepTime: '15 phút',
    cookTime: '20 phút',
    servings: '3 - 5 người',
    ingredients: [
      '600g thịt gà ta thả vườn chặt miếng vuông vừa ăn',
      '1 củ gừng già cạo vỏ thái sợi chỉ',
      '2 cây sả tươi đập dập băm nhỏ, 2 quả ớt hiểm thái lát',
      '2 tép tỏi băm, 2 củ hành tím băm nhuyễn',
      'Gia vị: 2 thìa canh nước mắm cá cơm truyền thống, 1 thìa đường phèn, 1 thìa nước màu dừa, tiêu sọ đập dập',
    ],
    steps: [
      {
        step: 1,
        title: 'Ướp thịt gà săn ngấm',
        desc: 'Ướp thịt gà với 2 thìa mắm, nước màu dừa, 1/2 lượng gừng sợi, sả băm, hành tỏi băm và tiêu sọ trong 15-20 phút cho ngấm sâu vào từng thớ thịt.',
      },
      {
        step: 2,
        title: 'Xào săn & đảo cháy cạnh',
        desc: 'Phi thơm phần sả băm và gừng sợi còn lại trong nồi đất với 1 thìa dầu ăn. Trút thịt gà vào xào trên lửa lớn cho thịt săn chắc và xém vàng đều bề mặt.',
      },
      {
        step: 3,
        title: 'Kho keo sốt ấm nồng',
        desc: 'Chế thêm 4-5 thìa nước nóng sâm sấp thịt, hạ lửa vừa đun liu riu trong 15 phút đến khi nước kho sánh kẹo bám chặt miếng gà bóng bẩy. Thêm ớt hiểm và tiêu sọ trước khi tắt bếp.',
      },
    ],
    tip: 'Xào thật săn thịt gà với gừng già trên lửa lớn trước khi kho giúp miếng gà chắc thịt, thơm lừng và không còn mùi hôi.',
  },
  'canh-kho-qua-don-thit': {
    prepTime: '20 phút',
    cookTime: '20 phút',
    servings: '3 - 5 người',
    ingredients: [
      '3-4 trái khổ qua (mướp đắng) vừa gai nở to, khoét ruột cắt khúc hoặc rạch dọc',
      '250g thịt nạc dăm heo xay nhuyễn',
      '2 tai nấm mèo (mộc nhĩ) ngâm nở băm nhuyễn',
      'Hành lá (trần sơ cọng để buộc), ngò rí, tiêu sọ trắng',
      'Gia vị: 1 thìa nước mắm ngon, 1 thìa hạt nêm, củ hành tím băm nhuyễn',
    ],
    steps: [
      {
        step: 1,
        title: 'Trộn nhân thịt nấm mèo',
        desc: 'Trộn đều thịt nạc xay cùng nấm mèo băm nhỏ, hành tím, 1 thìa mắm cốt, 1/2 thìa hạt nêm và nhiều tiêu sọ. Quết đều tay cho nhân dẻo dai.',
      },
      {
        step: 2,
        title: 'Nhồi nhân khổ qua',
        desc: 'Khổ qua rửa sạch, nhồi chặt phần nhân thịt vào giữa ruột. Dùng cọng hành lá trần sơ cột ngang khúc khổ qua để nhân không bị rơi ra khi nấu.',
      },
      {
        step: 3,
        title: 'Nấu nước dùng thanh ngọt',
        desc: 'Đun sôi 1.2 lít nước luộc gà hoặc nước xương hầm, thả khổ qua dồn thịt vào nấu sôi bùng rồi hạ lửa nhỏ hầm 15-20 phút. Vớt bọt kỹ để nước canh trong veo, nêm vừa ăn rồi rắc ngò rí và tiêu.',
      },
    ],
    tip: 'Chọn khổ qua có gai to, nở tròn đều sẽ bớt đắng hơn; không đậy nắp nồi khi nấu để khổ qua giữ được màu xanh mướt mát mắt.',
  },
  'gia-do-xao-huyet-he': {
    prepTime: '5 phút',
    cookTime: '5 phút',
    servings: '3 - 4 người',
    ingredients: [
      '300g giá đỗ sạch cọng mập rửa ráo nước',
      '200g huyết heo luộc chín, thái khối vuông con cờ vừa ăn',
      '1 bó lá hẹ non rửa sạch, cắt khúc 4-5cm',
      '3 tép tỏi băm thơm, hành hoa, tiêu xay',
      'Gia vị: 1 thìa dầu hào, 1/2 thìa hạt nêm, 1 thìa dầu ăn',
    ],
    steps: [
      {
        step: 1,
        title: 'Chần sơ huyết heo',
        desc: 'Chần nhẹ các khối huyết heo qua nước sôi với chút muối loãng trong 1 phút rồi vớt ra để ráo, giúp huyết sạch mùi và không bị vỡ khi xào.',
      },
      {
        step: 2,
        title: 'Xào nhanh trên lửa lớn',
        desc: 'Phi thơm tỏi băm với dầu ăn trong chảo lớn. Cho huyết heo vào đảo nhẹ tay 1 phút, tiếp tục trút giá đỗ và lá hẹ vào xào đảo thật nhanh trên lửa lớn.',
      },
      {
        step: 3,
        title: 'Nêm gia vị & tắt bếp',
        desc: 'Nêm 1 thìa dầu hào và chút hạt nêm, đảo đều trong 1-2 phút cho giá đỗ vừa chín tới vẫn giữ độ giòn sần sật ngọt nước thì trút ngay ra đĩa, rắc hạt tiêu.',
      },
    ],
    tip: 'Xào trên lửa cực lớn đảo nhanh tay trong vòng 2 phút để giá đỗ giữ độ giòn ngọt mọng nước mà không bị ỉu rũ hay ra nhiều nước.',
  },
  'dua-chua-muoi-xoi': {
    prepTime: '5 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '200g dưa cải chua muối xổi giòn vàng, vắt ráo bớt nước',
      '1/2 quả thơm (dứa) mật chín vàng ươm, gọt mắt thái lát mỏng',
      '1 chén nhỏ muối ớt rang Tây Ninh hoặc muối tiêu chanh',
      'Ớt sừng đỏ thái lát, chút đường cát làm dịu vị chua',
    ],
    steps: [
      {
        step: 1,
        title: 'Bày dưa chua chống ngấy',
        desc: 'Trộn nhẹ dưa cải chua muối xổi với chút đường và ớt sừng lát để cân bằng vị chua gắt, gắp ra chén nhỏ ăn kèm thịt gà kho.',
      },
      {
        step: 2,
        title: 'Thái thơm chấm muối ớt',
        desc: 'Thơm chín gọt mắt cắt tỉa hình cánh quạt bày ra đĩa cùng chén muối ớt đỏ cay xè, vừa làm món ăn kèm đậm đà vừa là món tráng miệng thanh mát ngọt lịm.',
      },
    ],
    tip: 'Vị chua giòn của dưa cải và vị ngọt thanh chấm muối ớt của thơm chín là cặp đôi hoàn hảo giúp giải ngấy cho các món kho đậm vị.',
  },
  'ca-nuc-kho-thom': {
    prepTime: '15 phút',
    cookTime: '35 phút',
    servings: '3 - 5 người',
    ingredients: [
      '500g cá nục hoa biển tươi làm sạch mang ruột, cắt khúc hoặc để nguyên con',
      '1/2 quả thơm (dứa) chín vừa thái lát tam giác dày',
      '2 quả cà chua chín bổ múi cau, 3 quả ớt hiểm đập dập',
      '2 củ hành tím, 3 tép tỏi đập dập băm nhỏ, 1 nhánh hành lá',
      'Gia vị: 2.5 thìa nước mắm ngon, 1 thìa đường phèn, 1 thìa nước màu dừa, hạt nêm, tiêu sọ xay',
    ],
    steps: [
      {
        step: 1,
        title: 'Ướp cá nục đượm vị',
        desc: 'Ướp cá nục với 2 thìa nước mắm cốt, nước màu dừa, hành tỏi băm và hạt tiêu trong 20 phút cho thịt cá săn chắc, thấm đều gia vị.',
      },
      {
        step: 2,
        title: 'Xếp thơm cà & kho cá',
        desc: 'Lót một lớp thơm và cà chua dưới đáy nồi đất hoặc chảo đáy dày, xếp từng khúc cá nục lên trên, phủ nốt phần thơm và ớt hiểm lên mặt. Đun sôi bùng 3 phút cho thịt cá co săn lại.',
      },
      {
        step: 3,
        title: 'Kho rục xương sánh kẹo',
        desc: 'Chế nước dừa tươi hoặc nước sôi sâm sấp mặt cá, hạ nhỏ lửa đun liu riu 30-35 phút đến khi nước kho sánh đỏ au, cá chín mềm rục xương hòa quyện vị chua ngọt dịu của thơm.',
      },
    ],
    tip: 'Kho cá nục cùng thơm và cà chua trên lửa nhỏ liu riu không những khử sạch mùi tanh mà còn giúp xương cá mềm rục, thịt cá bùi béo đậm đà đưa cơm.',
  },
  'canh-cai-cuc-tom': {
    prepTime: '10 phút',
    cookTime: '10 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 bó rau cải cúc (tần ô) non tươi, ngắt khúc rửa sạch để ráo',
      '150g tôm thẻ tươi bóc vỏ giã dập hoặc băm nhỏ',
      '100g thịt nạc dăm băm nhuyễn',
      '1 củ hành tím băm nhỏ, hành hoa, tiêu sọ',
      'Gia vị: 1.5 thìa nước mắm ngon, 1 thìa hạt nêm, muối tinh',
    ],
    steps: [
      {
        step: 1,
        title: 'Xào thơm tôm thịt',
        desc: 'Phi thơm hành tím băm với 1 thìa dầu ăn, cho tôm giã dập và thịt nạc băm vào đảo săn thơm dậy mùi ngọt tự nhiên, nêm 1/2 thìa mắm.',
      },
      {
        step: 2,
        title: 'Nấu sôi nước dùng trong ngọt',
        desc: 'Châm 1 lít nước lọc vào đun sôi bùng, hớt sạch bọt để nước canh trong veo, nêm 1 thìa hạt nêm và chút muối vừa miệng.',
      },
      {
        step: 3,
        title: 'Thả rau tần ô vừa chín tới',
        desc: 'Khi nước đang sôi sùng sục, thả rau cải cúc vào nhấn chìm xuống nước sôi khoảng 1-2 phút là rau vừa chín tới. Tắt bếp ngay, múc ra tô rắc hành tiêu thơm phức.',
      },
    ],
    tip: 'Rau cải cúc (tần ô) rất nhanh chín và dễ bị nồng nếu nấu lâu; chỉ cần nước sôi bùng thả rau vào đun 1-2 phút là tắt bếp ngay để giữ trọn mùi thơm thanh tao đặc trưng.',
  },
  'muc-ong-xao-can-tay': {
    prepTime: '10 phút',
    cookTime: '8 phút',
    servings: '3 - 4 người',
    ingredients: [
      '400g mực ống tươi dày mình, làm sạch khía vảy rồng cắt miếng vừa ăn',
      '2 nhánh cần tây rửa sạch cắt khúc 4cm',
      '1 củ hành tây bổ múi cau, 1 quả cà chua bổ múi cau',
      '1 củ tỏi băm nhuyễn, 1 nhánh gừng đập dập',
      'Gia vị: 1 thìa dầu hào, 1 thìa nước mắm, tiêu sọ xay, chút rượu trắng khử tanh',
    ],
    steps: [
      {
        step: 1,
        title: 'Chần sơ mực ống',
        desc: 'Chần nhanh miếng mực ống đã khía vảy rồng qua nồi nước sôi có gừng đập dập và chút rượu trắng trong 20 giây rồi vớt ra ngâm ngay vào thau nước đá để mực giòn sần sật.',
      },
      {
        step: 2,
        title: 'Xào rau củ giòn thơm',
        desc: 'Phi thơm tỏi băm với dầu ăn trên chảo lớn, cho hành tây và cà chua vào đảo nhanh 1 phút trên lửa lớn.',
      },
      {
        step: 3,
        title: 'Xào mực lửa bốc khói',
        desc: 'Trút mực ống và cần tây vào đảo đều tay trên lửa cực lớn, nêm 1 thìa dầu hào và nước mắm. Đảo nhanh trong 2 phút đến khi mực xoăn giòn bóng bẩy thì tắt bếp, rắc tiêu xay.',
      },
    ],
    tip: 'Khía vảy rồng và chần nhanh qua nước sôi rồi ngâm nước đá giúp mực khi xào không bị ra nước và giữ được độ giòn ngọt sần sật tuyệt đối.',
  },
  'ot-xiem-buoi-da-xanh': {
    prepTime: '5 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '3-4 trái ớt xiêm rừng xanh tươi cay nồng',
      '3 thìa canh nước mắm nhĩ cá cơm nguyên chất',
      '1/2 quả bưởi da xanh ruột hồng chín mọng, tách múi bóc sạch vỏ lụa',
    ],
    steps: [
      {
        step: 1,
        title: 'Dầm nước mắm ớt xiêm xanh',
        desc: 'Cho ớt xiêm xanh vào chén nhỏ dùng muỗng dầm nhẹ cho nứt vỏ tiết tinh dầu thơm cay nồng, rót nước mắm nhĩ cá cơm nguyên chất vào ngập ớt để chấm cá kho và mực xào.',
      },
      {
        step: 2,
        title: 'Bày bưởi da xanh tráng miệng',
        desc: 'Tách từng tép bưởi da xanh hồng hào mọng nước xếp đều lên đĩa, giữ trong ngăn mát tủ lạnh trước khi dùng để múi bưởi giòn ngọt thanh mát.',
      },
    ],
    tip: 'Ớt xiêm xanh dầm mắm nhĩ có vị thơm cay nồng ấm bụng rất hợp với hải sản, kết hợp cùng tráng miệng bưởi da xanh chua ngọt mọng nước giúp bữa ăn trọn vẹn hài hòa.',
  },
  'trung-cuon-van-may': {
    prepTime: '15 phút',
    cookTime: '15 phút',
    servings: '3 - 4 người',
    ingredients: [
      '3 quả trứng gà ta tươi đánh tan cùng chút xíu muối và hạt tiêu',
      '250g thịt nạc vai heo xay nhuyễn',
      '2 tai nấm mèo (mộc nhĩ) & 3 tai nấm hương ngâm nở thái chỉ nhỏ',
      '1 củ hành tím băm, 1 cọng hành lá, tiêu sọ xay',
      'Gia vị: 1 thìa nước mắm ngon, 1/2 thìa dầu mè, hạt nêm',
    ],
    steps: [
      {
        step: 1,
        title: 'Tráng trứng vàng óng mỏng mịn',
        desc: 'Đánh tan trứng với chút nước lọc và tiêu để trứng dai mềm. Quét một lớp dầu mỏng lên chảo chống dính, đổ trứng tráng đều thành lớp mỏng tròn vàng ươm, chín tới rồi nhẹ nhàng lấy ra đĩa.',
      },
      {
        step: 2,
        title: 'Trộn nhân thịt nấm & cuộn vân mây',
        desc: 'Trộn đều thịt nạc xay cùng nấm mèo, nấm hương, hành tím băm, nước mắm ngon, tiêu và dầu mè. Trải đều nhân thịt lên mặt lá trứng, cuộn tròn chặt tay như cuộn gimbap.',
      },
      {
        step: 3,
        title: 'Hấp chín & cắt khoanh vân mây',
        desc: 'Đặt cuộn trứng vào xửng hấp cách thủy trong 12-15 phút là thịt chín thơm lừng. Lấy ra để nguội bớt rồi dùng dao bén cắt thành các khoanh tròn dày 1.5cm, lộ ra hoa văn vân mây vàng trắng bắt mắt.',
      },
    ],
    tip: 'Tráng trứng trên lửa nhỏ và thêm 1 thìa nước lọc giúp lớp trứng mềm dẻo, dễ cuộn chặt tay mà không bị rách.',
  },
  'canh-ngheu-nau-chua': {
    prepTime: '15 phút',
    cookTime: '12 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1kg nghêu (ngao) tươi sống ngâm nước ớt nhả sạch cát',
      '2 quả cà chua chín mọng bổ múi cau, 1/4 quả dứa (thơm) thái lát',
      '1 nắm thì là, 3 nhánh hành hoa, 1 củ hành tím băm',
      '1 quả ớt sừng thái lát, 1 mẩu gừng đập dập',
      'Gia vị: 1 thìa nước mắm ngon, hạt nêm, muối, tiêu xay',
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc nghêu lấy nước ngọt thanh',
        desc: 'Cho nghêu vào nồi cùng 800ml nước và gừng đập dập, đun sôi đến khi nghêu vừa hé miệng thì vớt ngay ra. Tách lấy ruột nghêu, gạn lấy phần nước luộc trong veo.',
      },
      {
        step: 2,
        title: 'Xào cà chua & dứa thơm ngọt',
        desc: 'Phi thơm hành tím, cho cà chua và dứa vào xào thơm mềm tạo màu đỏ cam đẹp mắt. Chế phần nước luộc nghêu vào đun sôi bùng, nêm nước mắm và hạt nêm vừa vị chua ngọt thanh mát.',
      },
      {
        step: 3,
        title: 'Thả thịt nghêu & thì là',
        desc: 'Trút phần thịt nghêu vào nồi canh đun sôi lại 1 phút, thả ngập thì là và hành hoa cắt khúc rồi tắt bếp ngay. Múc canh ra tô rắc chút tiêu xay.',
      },
    ],
    tip: 'Nghêu vừa hé miệng phải vớt ra ngay để thịt không bị dai teo; thì là rắc vào lúc sôi bùng tắt bếp ngay để nước canh thơm ngát giải nhiệt.',
  },
  'bo-xao-thien-ly': {
    prepTime: '10 phút',
    cookTime: '6 phút',
    servings: '3 - 4 người',
    ingredients: [
      '250g thịt bò thăn mềm thái lát mỏng ngang thớ',
      '250g hoa thiên lý tươi xanh nhặt sạch cuống ngâm nước muối',
      '1 củ tỏi ta băm nhỏ (chia nửa ướp và phi thơm)',
      'Gia vị: 1 thìa dầu hào, 1 thìa nước tương, 1 thìa dầu ăn, tiêu sọ xay',
    ],
    steps: [
      {
        step: 1,
        title: 'Ướp thịt bò thăn mềm mọng',
        desc: 'Ướp thịt bò với 1/2 tỏi băm, 1 thìa dầu hào, nước tương, chút dầu ăn và tiêu trong 10 phút để từng lát thịt bò mềm mượt thấm đượm.',
      },
      {
        step: 2,
        title: 'Xào nhanh thịt bò lửa lớn',
        desc: 'Làm nóng chảo với dầu ăn, phi thơm tỏi băm rồi trút thịt bò vào đảo nhanh tay trên lửa cực lớn khoảng 1-2 phút cho thịt vừa chín tái thì trút riêng ra đĩa.',
      },
      {
        step: 3,
        title: 'Xào hoa thiên lý & hòa quyện',
        desc: 'Cho hoa thiên lý vào chảo xào nhanh trên lửa lớn khoảng 1 phút cho hoa vừa chín tới xanh mướt. Trút thịt bò trở lại đảo đều 30 giây rồi tắt bếp, rắc tiêu xay thơm lừng.',
      },
    ],
    tip: 'Hoa thiên lý và thịt bò đều cần xào lửa thật lớn trong thời gian cực ngắn để hoa giữ được vị giòn ngọt thanh và thịt bò mềm mọng nước không dai.',
  },
  'ot-chuong-dua-leo-nhan': {
    prepTime: '10 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 quả ớt chuông đỏ/vàng rửa sạch cắt miếng vuông vừa ăn',
      '2 quả dưa leo non giòn thái lát mỏng',
      'Hỗn hợp ngâm chua ngọt: Giấm gạo, đường cát, chút muối tinh',
      '400g nhãn xuồng cơm vàng Vũng Tàu chín ngọt mọng nước',
    ],
    steps: [
      {
        step: 1,
        title: 'Ngâm chua ngọt ớt chuông dưa leo',
        desc: 'Trộn ớt chuông và dưa leo với giấm đường pha chua ngọt vừa miệng, để ngấm 10 phút cho dưa chua giòn the kích thích vị giác ăn cùng cơm.',
      },
      {
        step: 2,
        title: 'Bày nhãn xuồng cơm vàng tráng miệng',
        desc: 'Nhãn xuồng cơm vàng rửa sạch, cắt chùm bày ra đĩa. Cơm nhãn dày, giòn sần sật ngọt lịm như mật ong là món tráng miệng thượng hạng.',
      },
    ],
    tip: 'Ớt chuông ngâm giấm đường chua ngọt giòn the cân bằng vị giác hoàn hảo với món xào và món cuốn trứng.',
  },
  'thit-ba-chi-luoc': {
    prepTime: '10 phút',
    cookTime: '20 phút',
    servings: '3 - 4 người',
    ingredients: [
      '500g thịt ba chỉ quế rút sườn tươi ngon, thớ nạc mỡ đều nhau',
      '1 củ gừng nhỏ đập dập, 2 củ hành tím, 1 thìa giấm gạo',
      'Rau ăn kèm: Xà lách xoăn, kinh giới, húng quế, tía tô, dưa leo',
      'Pha mắm nêm: 4 thìa mắm nêm nguyên chất, 2 thìa dứa (thơm) băm nhỏ, 1 thìa đường, tỏi ớt băm, nước cốt chanh',
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc thịt ba chỉ trắng giòn',
        desc: 'Đun sôi nước với gừng đập dập, củ hành tím và 1 thìa giấm gạo. Thả miếng thịt ba chỉ vào luộc lửa vừa trong 18-20 phút đến khi dùng đũa xiên không thấy tiết đỏ thì vớt ra ngay.',
      },
      {
        step: 2,
        title: 'Ngâm nước đá & thái mỏng trong veo',
        desc: 'Thả miếng thịt vừa luộc vào âu nước đá lạnh ngập 5 phút để da thịt giòn sần sật và không bị thâm xỉn. Dùng dao sắc thái lát mỏng trong veo đều tăm tắp, xếp xòe hình cánh hoa lên đĩa.',
      },
      {
        step: 3,
        title: 'Pha chén mắm nêm thơm nức',
        desc: 'Hòa mắm nêm với dứa băm nhuyễn, đường cát, tỏi ớt và nước cốt chanh, khuấy đều dậy mùi thơm chua ngọt cay nồng đậm đà để cuộn cùng rau sống.',
      },
    ],
    tip: 'Luộc thịt cùng chút giấm và ngâm ngay vào âu nước đá lạnh giúp phần mỡ trong veo giòn tan, phần thịt nạc mềm ngọt không bị khô ráp.',
  },
  'canh-muop-huong-lac': {
    prepTime: '10 phút',
    cookTime: '12 phút',
    servings: '3 - 4 người',
    ingredients: [
      '2 quả mướp hương non vỏ xanh phấn ngát hương, gọt vỏ thái vát',
      '100g hạt lạc sống (đậu phộng tươi) ngâm nước ấm bóc vỏ lụa',
      '2 củ hành tím băm, 2 nhánh hành hoa, ngò rí',
      'Gia vị: 1 thìa nước mắm ngon, hạt nêm, muối tinh, chút tiêu xay',
    ],
    steps: [
      {
        step: 1,
        title: 'Giã dập lạc tươi',
        desc: 'Cho hạt lạc sống đã bóc vỏ vào cối đá giã dập (không giã quá nhuyễn vụn) để khi nấu lạc tiết ra vị ngọt béo bùi tự nhiên.',
      },
      {
        step: 2,
        title: 'Nấu sôi nước dùng lạc béo ngậy',
        desc: 'Phi thơm hành tím với chút dầu ăn, trút lạc giã dập vào đảo sơ rồi châm 800ml nước lọc. Đun sôi hạ lửa nhỏ ninh 8-10 phút cho hạt lạc mềm bùi, nước canh sánh trắng đục nhẹ.',
      },
      {
        step: 3,
        title: 'Thả mướp hương vừa chín tới',
        desc: 'Nêm 1 thìa hạt nêm và nước mắm vừa ăn. Thả mướp hương thái vát vào đun sôi bùng 2 phút cho mướp vừa chín tới giữ trọn màu xanh và hương thơm đồng quê. Tắt bếp, rắc hành hoa.',
      },
    ],
    tip: 'Lạc tươi giã dập ninh trước cho mềm bùi và ngọt nước; mướp hương chỉ nấu sôi bùng 2 phút là tắt bếp ngay để mướp ngọt giòn không bị thâm úa.',
  },
  'su-hao-ca-rot-muc': {
    prepTime: '15 phút',
    cookTime: '8 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 củ su hào non gọt vỏ, thái sợi chỉ',
      '1 củ cà rốt nhỏ gọt vỏ, thái sợi chỉ',
      '1 con mực khô cỡ vừa nướng sơ xé sợi nhỏ (hoặc 150g thịt nạc thái chỉ)',
      '1 củ tỏi băm nhuyễn, 2 nhánh hành hoa, ngò gai',
      'Gia vị: 1 thìa dầu hào, 1 thìa nước mắm ngon, hạt tiêu sọ xay',
    ],
    steps: [
      {
        step: 1,
        title: 'Xào thơm mực khô xé sợi',
        desc: 'Phi thơm tỏi băm với dầu ăn trên chảo nóng, trút mực khô xé sợi nhỏ vào đảo nhanh tay khoảng 1 phút đến khi sợi mực xoăn vàng thơm phức thì trút ra đĩa.',
      },
      {
        step: 2,
        title: 'Xào su hào cà rốt giòn ngọt',
        desc: 'Tiếp tục dùng chảo đó, cho su hào và cà rốt thái chỉ vào xào trên lửa lớn trong 2-3 phút, nêm 1 thìa dầu hào và nước mắm cho sợi rau củ bóng bẩy, ngấm gia vị.',
      },
      {
        step: 3,
        title: 'Hòa quyện & rắc tiêu thơm',
        desc: 'Trút mực khô trở lại chảo đảo đều tay cùng hành hoa cắt khúc trong 1 phút rồi tắt bếp. Múc ra đĩa rắc ngập tiêu sọ xay thơm nức mũi.',
      },
    ],
    tip: 'Thái sợi chỉ đều tay và xào trên lửa lớn giúp su hào cà rốt chín giòn ngọt sần sật, hòa quyện vị thơm đậm đà của mực khô.',
  },
  'ca-phao-thanh-long': {
    prepTime: '5 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '150g cà pháo muối chua giòn trắng phau',
      'Gia vị dầm: 1 thìa tương ớt rim, 1/2 thìa đường cát, 1 tép tỏi và 1 quả ớt băm, chút nước cốt chanh',
      '1/2 quả thanh long ruột đỏ thẫm chín ngọt, gọt vỏ cắt miếng tam giác',
    ],
    steps: [
      {
        step: 1,
        title: 'Dầm cà pháo chua cay mặn ngọt',
        desc: 'Bổ đôi từng quả cà pháo muối giòn, trộn đều cùng tương ớt, tỏi ớt băm, đường và chanh. Để ngấm 5 phút cho từng miếng cà thấm đẫm vị chua cay ngọt rôm rốp.',
      },
      {
        step: 2,
        title: 'Bày thanh long ruột đỏ tráng miệng',
        desc: 'Thanh long ruột đỏ cắt lát vừa ăn xếp ra đĩa sứ trắng tạo màu sắc rực rỡ, để mát tủ lạnh trước khi dùng giúp giải nhiệt hoàn hảo sau bữa cơm.',
      },
    ],
    tip: 'Cà pháo dầm tương ớt chua cay rôm rốp là cặp đôi ăn kèm số một với thịt luộc và canh mướp nấu lạc.',
  },

  // --- THỨ BẢY - TỐI (Đại Tiệc Đoàn Viên) ---
  'canh-mang-tuoi-suon': {
    prepTime: '20 phút',
    cookTime: '35 phút',
    servings: '3 - 4 người',
    ingredients: [
      '400g sườn non heo chặt khúc vừa ăn',
      '300g măng tươi củ tước sợi hoặc cắt móng bò giòn ngọt',
      'Hành tím phi thơm, hành hoa chẻ, ngò gai (mùi tàu)',
      'Nước mắm ngon Phú Quốc, muối hạt, tiêu sọ xay nhuyễn',
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc măng & chần sườn',
        desc: 'Măng tươi tước sợi luộc qua 2 lần nước sôi có chút muối mở vung để khử sạch vị đắng và độc tố tự nhiên. Sườn heo chần nước sôi rửa sạch bọt.',
      },
      {
        step: 2,
        title: 'Xào săn sườn & măng',
        desc: 'Phi thơm hành củ đập dập với chút dầu ăn, cho sườn vào xào săn với thìa mắm cốt. Trút măng vào xào cùng cho măng thấm vị ngọt béo của sườn.',
      },
      {
        step: 3,
        title: 'Ninh canh trong ngọt',
        desc: 'Châm 1.2 lít nước sôi vào nồi, đun sôi rồi hạ lửa vừa hầm trong 25 phút cho sườn mềm róc xương. Nêm nước mắm cốt vừa ăn, tắt bếp rắc hành hoa ngò gai thái nhỏ.',
      },
    ],
    tip: 'Luộc măng mở vung giúp măng giòn vàng, nước canh giữ được độ trong veo thanh ngọt tự nhiên của xương sườn.',
  },

  'ga-doi-hap-la-chanh': {
    prepTime: '15 phút',
    cookTime: '30 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1/2 con gà ta hoặc gà đồi thả vườn (khoảng 800g - 1kg)',
      '1 nắm lá chanh bánh tẻ tươi xanh, rửa sạch để ráo',
      'Muối hột thô, tiêu chín Phú Quốc, ớt hiểm đỏ, quả chanh mọng nước',
      'Gừng tươi đập dập, 1 củ sả cây lót đáy xửng hấp',
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế & ướp da gà',
        desc: 'Xoa đều một chút muối hạt và bột nghệ lên da gà để khi hấp da căng bóng vàng ươm đẹp mắt, thoa nhẹ chút tiêu sọ vào bên trong bụng gà.',
      },
      {
        step: 2,
        title: 'Hấp gà cùng muối & lá chanh',
        desc: 'Xếp sả đập dập và lớp lá chanh dưới đáy xửng hấp, đặt gà lên trên. Hấp cách thủy trên lửa vừa trong 25-30 phút đến khi dùng tăm xiên không còn ứa nước hồng.',
      },
      {
        step: 3,
        title: 'Chặt gà & pha muối tiêu chanh',
        desc: 'Để gà nguội bớt rồi chặt miếng vuông vức dứt khoát. Rắc lá chanh thái chỉ mỏng như sợi tơ lên trên đĩa gà. Ăn kèm muối tiêu chanh ớt hiểm giã nhuyễn.',
      },
    ],
    tip: 'Không hấp lửa quá lớn làm rách da gà. Để gà nguội hẳn mới chặt giúp miếng thịt gà vuông vức, da giòn sần sật không nát vụn.',
  },

  'do-chua-che-sen': {
    prepTime: '15 phút',
    cookTime: '20 phút',
    servings: '3 - 4 người',
    ingredients: [
      '100g đu đủ xanh & 1 củ cà rốt nhỏ tỉa hoa thái lát mỏng',
      'Giấm gạo, đường phèn, tỏi ớt băm nhuyễn',
      '100g hạt sen tươi Huế đã thông tâm sen',
      '50g long nhãn Hưng Yên thơm dẻo ngọt ngào',
    ],
    steps: [
      {
        step: 1,
        title: 'Làm đồ chua giòn sần sật',
        desc: 'Trộn đu đủ và cà rốt với chút muối rồi vắt ráo. Ngâm vào hỗn hợp giấm đường tỉ lệ 1:1, thêm tỏi ớt băm trong 15 phút là có đĩa đồ chua giòn tan giải ngấy.',
      },
      {
        step: 2,
        title: 'Nấu chè sen long nhãn',
        desc: 'Hạt sen ninh nhỏ lửa cùng đường phèn đến khi chín bở tơi bùi ngậy. Lồng hạt sen vào từng quả long nhãn rồi cho vào nồi nước đường sen đun sôi lại 2 phút.',
      },
    ],
    tip: 'Hạt sen ninh chín mềm mới cho đường phèn để hạt sen không bị sượng cứng.',
  },

  // --- CHỦ NHẬT - TRƯA (Thanh Dịu) ---
  'ca-dieu-hong-hap': {
    prepTime: '15 phút',
    cookTime: '25 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 con cá diêu hồng tươi sống 800g - 1kg làm sạch, khứa vảy nhẹ',
      'Gừng non thái chỉ, hành hoa chẻ sợi mảnh, ớt sừng sợi',
      'Nước sốt hấp: 3 thìa xì dầu ngon, 1 thìa dầu hào, 1 thìa dầu mè, tiêu',
      'Cần tây, thì là, nấm hương ngâm nở (tùy thích)',
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế & lót khay hấp',
        desc: 'Khứa xéo 3 đường trên thân cá, nhét gừng thái sợi vào bụng và khe khứa cá để khử sạch mùi tanh và tạo mùi thơm thanh.',
      },
      {
        step: 2,
        title: 'Hấp cá cùng sốt xì dầu',
        desc: 'Rưới đều sốt xì dầu dầu hào lên thân cá. Hấp cách thủy lửa lớn trong 18-20 phút cho thịt cá chín mềm mọng nước ngấm đượm sốt sánh.',
      },
      {
        step: 3,
        title: 'Dội dầu sôi thơm lừng',
        desc: 'Rải hành hoa chẻ sợi và ớt sừng lên mặt cá. Đun 2 thìa dầu ăn thật sôi già rồi dội nhẹ lên hành gừng để dậy mùi thơm nức mũi.',
      },
    ],
    tip: 'Dội dầu nóng già lên hành hoa và gừng sau cùng giúp màu xanh của hành sáng bóng và thơm nức gian bếp.',
  },

  'nuoc-rau-muong-dam-sau': {
    prepTime: '5 phút',
    cookTime: '8 phút',
    servings: '3 - 4 người',
    ingredients: [
      'Nước luộc từ ngọn rau muống non xanh trong vắt',
      '3-4 quả sấu bánh tẻ cạo vỏ (hoặc 1 quả chanh mọng nước vắt lấy cốt)',
      '1 thìa cà phê muối hạt tinh khiết, 1/2 thìa bột ngọt / hạt nêm',
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc sấu trong nước rau',
        desc: 'Sau khi vớt đĩa rau muống ra đĩa, thả sấu cạo sạch vỏ vào nồi nước luộc rau đun sôi 3 phút cho quả sấu mềm tơi.',
      },
      {
        step: 2,
        title: 'Dầm sấu chua thanh',
        desc: 'Vớt sấu ra bát con, dầm nát quả sấu rồi hòa ngược lại vào bát nước luộc, gạn bỏ hạt. Nêm chút muối hạt và bột canh cho vừa vặn thanh mát.',
      },
    ],
    tip: 'Nếu dùng chanh thay sấu, hãy đợi nước luộc nguội bớt mới vắt chanh để nước canh không bị đắng chát.',
  },

  'rau-muong-luoc-tuong-ban': {
    prepTime: '10 phút',
    cookTime: '6 phút',
    servings: '3 - 4 người',
    ingredients: [
      '1 bó rau muống ngọn non tươi xanh ngắt, nhặt sạch cọng già',
      '1 thìa muối hạt to (cho vào nước luộc giữ màu xanh ngọc)',
      '1 bát con tương nếp Bần thơm ngọt dịu',
      'Tỏi ta giã nhuyễn, ớt hiểm đỏ thái lát mỏng',
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc rau lửa lớn ngập nước',
        desc: 'Đun nồi nước sôi bùng với thìa muối hạt. Thả rau muống ngập nước, lật nhanh 1 lần trong 3 phút trên lửa lớn nhất.',
      },
      {
        step: 2,
        title: 'Vớt rau ráo nước xanh mướt',
        desc: 'Vớt rau ra đĩa sứ hoặc xả nhanh qua âu nước đá lạnh giúp ngọn rau muống giòn rụm và giữ nguyên màu xanh non mướt.',
      },
      {
        step: 3,
        title: 'Pha chén tương Bần',
        desc: 'Rót tương Bần ra chén, cho tỏi băm thơm lừng và ớt cay vào khuấy đều, thêm chút đường nếu thích vị ngọt dịu.',
      },
    ],
    tip: 'Luộc lửa thật to và mở vung suốt quá trình luộc để rau giữ nguyên chất diệp lục xanh ngắt giòn ngọt.',
  },

  'ca-bat-bo-sap': {
    prepTime: '10 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '3-4 quả cà bát muối nén chua cay giòn sần sật',
      '1-2 quả bơ sáp Đắk Lắk dẻo vàng béo ngậy',
      'Sữa đặc có đường Ông Thọ, đá bào nhuyễn',
    ],
    steps: [
      {
        step: 1,
        title: 'Thái lát cà bát muối',
        desc: 'Cà bát muối chua cay cắt lát mỏng vừa ăn, rưới thìa nước muối tỏi ớt chua ngọt bày ra đĩa ăn kèm cơm canh thanh mát.',
      },
      {
        step: 2,
        title: 'Dầm bơ sáp ngọt béo',
        desc: 'Bơ sáp lột vỏ cắt miếng vuông quân cờ cho vào ly, rưới 2 thìa sữa đặc thơm béo và đá bào nhuyễn, trộn đều mát lạnh.',
      },
    ],
    tip: 'Bơ sáp dẻo vàng kết hợp sữa đặc lạnh là món tráng miệng giải nhiệt tuyệt vời sau mâm cơm cá hấp thanh mát.',
  },

  // --- CHỦ NHẬT - TỐI (Bồi Bổ Dưỡng Tâm) ---
  'thit-bo-kho-gung-sa': {
    prepTime: '20 phút',
    cookTime: '45 phút',
    servings: '3 - 4 người',
    ingredients: [
      '500g bắp bò hoa hoặc nạm bò có gân giòn dẻo',
      '2 củ gừng già thái lát dày đập dập thơm cay nồng',
      '3 cây sả tươi đập dập cắt khúc 4cm',
      '2 thìa nước mắm cốt, 1 thìa nước màu, ớt hiểm, tiêu sọ đập dập',
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế & ướp thịt bò',
        desc: 'Thịt bò rửa sạch, cắt miếng vuông quân cờ 3x3cm. Ướp cùng 2 thìa mắm, tiêu sọ, nước màu, 1/2 lượng gừng và sả đập dập trong 25 phút.',
      },
      {
        step: 2,
        title: 'Đảo săn thơm lừng',
        desc: 'Làm nóng nồi đất với thìa dầu ăn, phi thơm phần gừng sả còn lại cho thơm nức rồi trút thịt bò vào xào săn trên lửa lớn.',
      },
      {
        step: 3,
        title: 'Kho nhỏ lửa dẻo mềm',
        desc: 'Châm nước sôi sâm sấp thịt. Đun sôi bùng, vớt bọt rồi hạ lửa liu riu 35-40 phút cho thịt bò dẻo quánh, nước sốt keo sánh màu cánh gián.',
      },
    ],
    tip: 'Chọn bắp bò có gân khi kho sẽ dẻo mềm giòn sần sật, hòa quyện vị cay ấm của gừng già cực kỳ đưa cơm.',
  },

  'canh-ga-ham-hat-sen': {
    prepTime: '15 phút',
    cookTime: '40 phút',
    servings: '3 - 4 người',
    ingredients: [
      '400g thịt gà ta chặt miếng vừa ăn (hoặc đùi cánh gà)',
      '150g hạt sen tươi Huế thơm bở bùi ngậy',
      '8-10 quả táo đỏ Tân Cương, 1 thìa nhỏ hạt kỷ tử đỏ',
      'Hành hoa, ngò rí, gia vị: muối hạt, nước mắm ngon, tiêu xay',
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế gà & hạt sen',
        desc: 'Gà ta chần nước sôi rửa sạch bọt. Hạt sen tươi rửa sạch để ráo, táo đỏ khía nhẹ thân quả để ngấm ngọt vào nước hầm.',
      },
      {
        step: 2,
        title: 'Hầm gà cùng hạt sen',
        desc: 'Cho gà và hạt sen vào nồi với 1.2 lít nước lạnh. Đun sôi bùng, hớt sạch bọt rồi hạ lửa nhỏ hầm liu riu 25 phút.',
      },
      {
        step: 3,
        title: 'Cho táo đỏ, kỷ tử hoàn tất',
        desc: 'Thêm táo đỏ và kỷ tử vào hầm tiếp 10 phút cho nước canh ngọt thanh thơm dịu. Nêm muối hạt vừa ăn, rắc hành hoa ngò rí.',
      },
    ],
    tip: 'Táo đỏ và kỷ tử nên cho vào 10 phút cuối để giữ nguyên độ ngọt giòn mọng nước, không bị nát nhừ.',
  },

  'rau-cai-xanh-luoc': {
    prepTime: '10 phút',
    cookTime: '8 phút',
    servings: '3 - 4 người',
    ingredients: [
      '400g rau cải canh non (hoặc cải cay, cải ngồng) nhặt sạch',
      '2 quả trứng gà ta tươi ngon',
      'Chén nước mắm cốt nhĩ cá cơm Phú Quốc, ớt hiểm thái lát',
      '1 lát gừng tươi thái sợi nhỏ thả vào nước luộc',
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc trứng gà lòng đào',
        desc: 'Luộc 2 quả trứng gà ta trong nước sôi đúng 6 phút, vớt ra ngâm ngay vào âu nước đá lạnh 5 phút rồi bóc vỏ.',
      },
      {
        step: 2,
        title: 'Luộc rau cải xanh giòn ngọt',
        desc: 'Đun nồi nước sôi có lát gừng và hạt muối, thả rau cải vào luộc nhanh 3 phút cho rau chín tới xanh mướt, vớt ra đĩa.',
      },
      {
        step: 3,
        title: 'Dầm trứng lòng đào vào nước mắm',
        desc: 'Cho trứng luộc vào chén nước mắm ngon, dùng thìa dầm nhẹ cho lòng đào đỏ cam sánh béo chảy ra hòa quyện cùng nước mắm cốt.',
      },
    ],
    tip: 'Rau cải non nhúng vào chén nước mắm dầm trứng lòng đào béo ngậy ngọt đượm là món ngon dân dã đỉnh cao của người Việt.',
  },

  'cam-sanh-du-du': {
    prepTime: '10 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '2 quả cam sành Tiền Giang mọng nước vỏ xanh lòng vàng',
      '1/2 quả đu đủ chín cây ngọt thơm lừng',
      'Đường mía hoặc mật ong nguyên chất (tùy thích)',
    ],
    steps: [
      {
        step: 1,
        title: 'Vắt nước cam sành tươi',
        desc: 'Cam sành bổ đôi, vắt lấy nước cốt tươi nguyên chất, khuấy nhẹ với thìa mật ong hoặc uống thanh mát tự nhiên.',
      },
      {
        step: 2,
        title: 'Cắt đu đủ chín cây',
        desc: 'Đu đủ gọt vỏ bỏ hạt, cắt thành các thanh vuông dài xếp so le đẹp mắt trên đĩa sứ trắng, để mát trước khi thưởng thức.',
      },
    ],
    tip: 'Nước cam tươi dồi dào Vitamin C kết hợp đu đủ ngọt mát bổ sung chất xơ nhuận tràng, phục hồi thể lực hoàn hảo.',
  },

  // --- CHỦ NHẬT - TRƯA (Thanh Đạm Gỏi Cuốn) ---
  'goi-cuon-tom-thit': {
    prepTime: '20 phút',
    cookTime: '15 phút',
    servings: '3 - 4 người',
    ingredients: [
      '300g tôm sú tươi luộc bóc vỏ chẻ đôi dọc sống lưng',
      '300g thịt ba chỉ heo luộc chín tới ngâm nước đá, thái lát mỏng',
      'Bánh tráng dẻo phơi sương, bún tươi sợi nhỏ',
      'Rau sống: xà lách, hẹ tươi nguyên cọng, rau thơm, húng lủi',
      'Sốt chấm: tương đen hosin, bơ đậu phộng béo ngậy, đậu phộng rang giã dập',
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc tôm thịt chuẩn vị',
        desc: 'Thịt ba chỉ luộc với củ hành tím cho thơm, vớt ra ngâm nước đá cho thịt trắng giòn. Tôm luộc chín bóc vỏ bỏ chỉ đen.',
      },
      {
        step: 2,
        title: 'Cuốn gỏi chặt tay',
        desc: 'Lau ẩm bánh tráng, xếp xà lách, bún tươi, rau thơm, thịt ba chỉ, cuộn 1 vòng rồi xếp tôm đỏ au và cọng hẹ thò đầu ra ngoài, cuộn chặt tay.',
      },
      {
        step: 3,
        title: 'Pha tương bơ đậu phộng',
        desc: 'Phi thơm tỏi băm, xào thơm 3 thìa tương hosin và 1 thìa bơ đậu phộng cùng chút nước dừa, đun sánh rắc đậu phộng rang và ớt băm.',
      },
    ],
    tip: 'Thoa nhẹ nước ấm lên bánh tráng để bánh dẻo dai dễ cuốn mà không bị rách hay dính tay.',
  },

  'canh-moc-nam-huong': {
    prepTime: '15 phút',
    cookTime: '20 phút',
    servings: '3 - 4 người',
    ingredients: [
      '200g giò sống tươi dẻo mịn',
      '50g mộc nhĩ, nấm hương khô ngâm nở thái nhỏ trộn vào giò sống',
      '1 củ cà rốt tỉa hoa thái mỏng, 1/2 củ su hào cắt khúc quân cờ',
      'Nước hầm xương ngọt thanh, hành lá, ngò gai, tiêu xay',
    ],
    steps: [
      {
        step: 1,
        title: 'Viên mọc nấm hương',
        desc: 'Trộn giò sống với mộc nhĩ nấm hương băm nhỏ và chút tiêu. Dùng thìa vo thành từng viên tròn nhỏ vừa miệng.',
      },
      {
        step: 2,
        title: 'Thả mọc & củ quả',
        desc: 'Đun sôi nồi nước dùng trong veo, thả từng viên mọc vào. Khi mọc nổi lên mặt nước thì cho cà rốt và su hào vào đun 5 phút.',
      },
      {
        step: 3,
        title: 'Hoàn tất bát canh thanh ngọt',
        desc: 'Nêm nước mắm cốt và hạt nêm cho vừa miệng. Múc ra tô rắc hành ngò thái nhỏ và chút tiêu sọ xay thơm nức.',
      },
    ],
    tip: 'Khi viên mọc nổi hoàn toàn lên bề mặt nước dùng là mọc đã chín giòn ngon nhất.',
  },

  'nam-dui-ga-xao': {
    prepTime: '10 phút',
    cookTime: '10 phút',
    servings: '3 - 4 người',
    ingredients: [
      '300g nấm đùi gà tươi, rửa nhanh qua nước muối cắt lát xéo dày 0.5cm',
      '1 nắm lá rau húng quế tươi xanh thơm ngát',
      'Tỏi ta băm nhuyễn, ớt sừng cắt lát, tiêu đen xay dập',
      'Gia vị: 2 thìa xì dầu ngon, 1 thìa dầu hào chay, dầu mè',
    ],
    steps: [
      {
        step: 1,
        title: 'Khía lát nấm & áp chảo',
        desc: 'Khía nhẹ hình vảy cá lên miếng nấm đùi gà để thấm sốt. Cho vào chảo không dầu áp chảo 2 mặt cho nấm se lại xém vàng.',
      },
      {
        step: 2,
        title: 'Xào sốt xì dầu thơm nồng',
        desc: 'Phi thơm tỏi băm với dầu mè, cho nấm vào đảo đều cùng xì dầu, dầu hào và chút tiêu đen trên lửa lớn trong 3 phút.',
      },
      {
        step: 3,
        title: 'Cho húng quế bốc khói',
        desc: 'Tắt bếp, cho ngay nắm lá húng quế vào đảo nhanh tay để hương thơm the mát của húng quế quyện chặt vào miếng nấm dai ngọt.',
      },
    ],
    tip: 'Cho rau húng quế vào ngay sau khi tắt bếp để giữ trọn tinh dầu thơm dịu mà không bị úa đen.',
  },

  'dua-leo-nho-ninh-thuan': {
    prepTime: '5 phút',
    cookTime: '0 phút',
    servings: '3 - 4 người',
    ingredients: [
      '2 quả dưa leo vườn non giòn, gọt vỏ cắt lát xéo',
      '1 chén nhỏ muối hột rang giã dập cùng ớt xiêm xanh cay nồng',
      '200g nho xanh Ninh Thuận tươi mọng nước chua ngọt giòn tan',
    ],
    steps: [
      {
        step: 1,
        title: 'Cắt dưa leo vườn',
        desc: 'Dưa leo rửa sạch gọt vỏ, thái lát xéo bày lên đĩa sứ cùng chén muối hột ớt chấm kèm giúp giải nhiệt thanh mát.',
      },
      {
        step: 2,
        title: 'Rửa nho xanh Ninh Thuận',
        desc: 'Nho xanh ngâm nước muối loãng 5 phút, để ráo nước và bày ra đĩa tráng miệng giòn mọng ngọt dịu.',
      },
    ],
    tip: 'Dưa leo ướp lạnh chấm muối hột ớt ăn cùng gỏi cuốn và nấm xào tạo nên bữa trưa thanh lọc nhẹ bụng trọn vẹn.',
  },
};

/**
 * Universal recipe getter that returns a structured recipe for any family meal dish.
 */
export function getFamilyMealDishRecipe(dish: FamilyMealDish): FamilyDishRecipe {
  // Check exact key match
  if (FAMILY_DISH_RECIPES[dish.dishId]) {
    return FAMILY_DISH_RECIPES[dish.dishId];
  }

  // Check matching by name keyword
  const name = dish.name.toLowerCase();

  if (name.includes('măng tươi') || (name.includes('măng') && name.includes('sườn'))) {
    return FAMILY_DISH_RECIPES['canh-mang-tuoi-suon'];
  }
  if (name.includes('gà đồi') || (name.includes('gà') && (name.includes('muối hột') || name.includes('lá chanh')))) {
    return FAMILY_DISH_RECIPES['ga-doi-hap-la-chanh'];
  }
  if (name.includes('chè hạt sen') || (name.includes('long nhãn') && name.includes('đồ chua'))) {
    return FAMILY_DISH_RECIPES['do-chua-che-sen'];
  }
  if (name.includes('diêu hồng') && (name.includes('hấp') || name.includes('xì dầu') || name.includes('gừng'))) {
    return FAMILY_DISH_RECIPES['ca-dieu-hong-hap'];
  }
  if (name.includes('nước rau muống') || (name.includes('dầm sấu') || (name.includes('rau muống') && name.includes('sấu')))) {
    return FAMILY_DISH_RECIPES['nuoc-rau-muong-dam-sau'];
  }
  if (name.includes('rau muống') && (name.includes('tương bần') || name.includes('luộc'))) {
    return FAMILY_DISH_RECIPES['rau-muong-luoc-tuong-ban'];
  }
  if (name.includes('cà bát') || (name.includes('bơ sáp') && name.includes('dầm'))) {
    return FAMILY_DISH_RECIPES['ca-bat-bo-sap'];
  }
  if (name.includes('bò') && (name.includes('kho gừng') || (name.includes('gừng') && name.includes('sả')))) {
    return FAMILY_DISH_RECIPES['thit-bo-kho-gung-sa'];
  }
  if (name.includes('gà') && (name.includes('hạt sen') || name.includes('táo đỏ') || name.includes('kỷ tử'))) {
    return FAMILY_DISH_RECIPES['canh-ga-ham-hat-sen'];
  }
  if (name.includes('cải xanh') || (name.includes('trứng') && name.includes('lòng đào'))) {
    return FAMILY_DISH_RECIPES['rau-cai-xanh-luoc'];
  }
  if (name.includes('cam sành') || name.includes('đu đủ chín')) {
    return FAMILY_DISH_RECIPES['cam-sanh-du-du'];
  }
  if (name.includes('gỏi cuốn') && (name.includes('tôm thịt') || name.includes('tương bơ') || name.includes('đậu phộng'))) {
    return FAMILY_DISH_RECIPES['goi-cuon-tom-thit'];
  }
  if (name.includes('mọc') && (name.includes('nấm hương') || name.includes('su hào') || name.includes('cà rốt'))) {
    return FAMILY_DISH_RECIPES['canh-moc-nam-huong'];
  }
  if (name.includes('nấm đùi gà') && (name.includes('húng quế') || name.includes('tiêu đen'))) {
    return FAMILY_DISH_RECIPES['nam-dui-ga-xao'];
  }
  if (name.includes('nho xanh') || (name.includes('dưa leo') && name.includes('muối hột'))) {
    return FAMILY_DISH_RECIPES['dua-leo-nho-ninh-thuan'];
  }

  if (name.includes('ba chỉ') && (name.includes('luộc') || name.includes('mắm nêm') || name.includes('mắm tôm'))) {
    return FAMILY_DISH_RECIPES['thit-ba-chi-luoc'];
  }
  if (name.includes('mướp') && (name.includes('lạc') || name.includes('đậu phộng'))) {
    return FAMILY_DISH_RECIPES['canh-muop-huong-lac'];
  }
  if ((name.includes('su hào') || name.includes('cà rốt')) && (name.includes('mực khô') || name.includes('thái chỉ'))) {
    return FAMILY_DISH_RECIPES['su-hao-ca-rot-muc'];
  }
  if (name.includes('thanh long') || (name.includes('cà pháo') && name.includes('dầm'))) {
    return FAMILY_DISH_RECIPES['ca-phao-thanh-long'];
  }

  if (name.includes('cuộn trứng') || name.includes('vân mây') || (name.includes('trứng') && name.includes('thịt nạc băm'))) {
    return FAMILY_DISH_RECIPES['trung-cuon-van-may'];
  }
  if (name.includes('nghêu') || name.includes('ngao')) {
    return FAMILY_DISH_RECIPES['canh-ngheu-nau-chua'];
  }
  if (name.includes('thiên lý') || (name.includes('bò') && name.includes('hoa'))) {
    return FAMILY_DISH_RECIPES['bo-xao-thien-ly'];
  }
  if (name.includes('nhãn xuồng') || (name.includes('ớt chuông') && name.includes('ngâm chua'))) {
    return FAMILY_DISH_RECIPES['ot-chuong-dua-leo-nhan'];
  }

  if (name.includes('cá nục') && (name.includes('kho') || name.includes('thơm') || name.includes('dứa'))) {
    return FAMILY_DISH_RECIPES['ca-nuc-kho-thom'];
  }
  if (name.includes('cải cúc') || name.includes('tần ô')) {
    return FAMILY_DISH_RECIPES['canh-cai-cuc-tom'];
  }
  if (name.includes('mực') && (name.includes('cần tây') || name.includes('hành tây') || name.includes('xào'))) {
    return FAMILY_DISH_RECIPES['muc-ong-xao-can-tay'];
  }
  if ((name.includes('ớt xiêm') || name.includes('bưởi')) && (name.includes('mắm') || name.includes('da xanh'))) {
    return FAMILY_DISH_RECIPES['ot-xiem-buoi-da-xanh'];
  }

  if (name.includes('gà') && (name.includes('gừng') || name.includes('sả') || name.includes('kho'))) {
    return FAMILY_DISH_RECIPES['ga-ta-kho-gung-sa-ot'];
  }
  if (name.includes('khổ qua') || name.includes('mướp đắng')) {
    return FAMILY_DISH_RECIPES['canh-kho-qua-don-thit'];
  }
  if (name.includes('huyết') || (name.includes('giá') && name.includes('hẹ'))) {
    return FAMILY_DISH_RECIPES['gia-do-xao-huyet-he'];
  }
  if ((name.includes('dưa chua') || name.includes('dưa cải')) && (name.includes('thơm') || name.includes('dứa') || name.includes('muối xổi'))) {
    return FAMILY_DISH_RECIPES['dua-chua-muoi-xoi'];
  }

  if (name.includes('chả cá') || (name.includes('cá thu') && name.includes('sốt cà'))) {
    return FAMILY_DISH_RECIPES['cha-ca-thu-sot-ca'];
  }
  if (name.includes('rau dền') || (name.includes('dền đỏ') && name.includes('tôm khô'))) {
    return FAMILY_DISH_RECIPES['canh-rau-den-tom-kho'];
  }
  if (name.includes('su su') && (name.includes('tỏi') || name.includes('xào'))) {
    return FAMILY_DISH_RECIPES['su-su-xao-toi'];
  }
  if (name.includes('dưa leo') || name.includes('mận hậu')) {
    return FAMILY_DISH_RECIPES['dua-leo-man-hau'];
  }

  if (name.includes('bí đỏ') || (name.includes('sườn') && name.includes('đậu phộng'))) {
    return FAMILY_DISH_RECIPES['canh-suon-bi-do'];
  }
  if (name.includes('cải thìa') || (name.includes('nấm') && name.includes('dầu hào'))) {
    return FAMILY_DISH_RECIPES['cai-thia-xao-nam'];
  }
  if (name.includes('kim chi') || (name.includes('xoài') && name.includes('hòa lộc'))) {
    return FAMILY_DISH_RECIPES['kim-chi-xoai-cat'];
  }

  if (name.includes('bầu') && (name.includes('kho quẹt') || name.includes('luộc'))) {
    return FAMILY_DISH_RECIPES['bau-luoc-kho-quet'];
  }
  if (name.includes('ổi') || (name.includes('cà pháo') && name.includes('xí muội'))) {
    return FAMILY_DISH_RECIPES['ca-phao-oi-xi-muoi'];
  }
  if (name.includes('tôm') && (name.includes('rim') || name.includes('cháy cạnh'))) {
    return FAMILY_DISH_RECIPES['tom-dong-rim-ba-chi'];
  }
  if (name.includes('bí xanh') || name.includes('bí đao')) {
    return FAMILY_DISH_RECIPES['canh-bi-xanh-tom-tuoi'];
  }
  if (name.includes('bắp cải') && name.includes('cà chua')) {
    return FAMILY_DISH_RECIPES['bap-cai-xao-ca-chua'];
  }
  if (name.includes('dưa giá') || name.includes('quýt')) {
    return FAMILY_DISH_RECIPES['dua-gia-do-he'];
  }
  if (name.includes('cà pháo')) {
    return FAMILY_DISH_RECIPES['ca-phao-muoi-dua-hau'];
  }
  if (name.includes('cá') && (name.includes('kho') || name.includes('tộ'))) {
    return FAMILY_DISH_RECIPES['com-ca-kho-to'];
  }
  if (name.includes('canh') && (name.includes('chua') || name.includes('cá'))) {
    return FAMILY_DISH_RECIPES['canh-chua-ca-loc'];
  }
  if (name.includes('rau muống') && name.includes('xào')) {
    return FAMILY_DISH_RECIPES['rau-muong-xao-toi'];
  }
  if (name.includes('sườn') && (name.includes('rim') || name.includes('xào chua ngọt'))) {
    return FAMILY_DISH_RECIPES['suon-heo-rim-man-ngot'];
  }
  if (name.includes('rau ngót') || name.includes('rau dền') || name.includes('cải')) {
    return FAMILY_DISH_RECIPES['canh-rau-ngot-thit-bam'];
  }
  if (name.includes('đậu que') || name.includes('xào tỏi') || name.includes('su su')) {
    return FAMILY_DISH_RECIPES['dau-que-xao-toi'];
  }
  if (name.includes('thịt kho') || name.includes('kho tàu')) {
    return FAMILY_DISH_RECIPES['thit-kho-tau'];
  }
  if (name.includes('canh cua') || name.includes('mồng tơi')) {
    return FAMILY_DISH_RECIPES['canh-cua-dong'];
  }
  if (name.includes('mắm') || name.includes('chuối')) {
    return FAMILY_DISH_RECIPES['chen-mam-nhi-chuoi-cau'];
  }

  // Smart dynamic recipe fallback
  const isSoup = dish.role.includes('Canh') || name.includes('canh');
  const isStirFry = dish.role.includes('Xào') || name.includes('xào');
  const isSide = dish.role.includes('Ăn Kèm') || dish.role.includes('Tráng Miệng');

  if (isSoup) {
    return {
      prepTime: '10 phút',
      cookTime: '15 phút',
      servings: '3 - 4 người',
      ingredients: [
        `Nguyên liệu chính cho món ${dish.name} tươi sạch`,
        'Nước dùng xương hầm hoặc nước luộc tôm thịt thanh ngọt',
        'Hành hoa, ngò rí, gia vị: nước mắm cốt, muối hạt, tiêu',
      ],
      steps: [
        {
          step: 1,
          title: 'Sơ chế nguyên liệu',
          desc: `Rửa sạch và cắt khúc vừa ăn các thành phần của ${dish.name}.`,
        },
        {
          step: 2,
          title: 'Nấu nước dùng ngọt thanh',
          desc: 'Đun sôi nước, phi thơm chút hành tím rồi cho phần đạm/thịt vào nấu ngọt nước.',
        },
        {
          step: 3,
          title: 'Cho rau & nêm nếm',
          desc: 'Cho các loại rau củ vào đun sôi bùng, nêm nước mắm ngon vừa khẩu vị rồi tắt bếp.',
        },
      ],
      tip: 'Nêm nước mắm sau cùng ngay trước khi tắt bếp để giữ trọn vị thơm đặc trưng của canh cơm nhà.',
    };
  }

  if (isStirFry) {
    return {
      prepTime: '8 phút',
      cookTime: '6 phút',
      servings: '3 - 4 người',
      ingredients: [
        `Các loại rau củ tươi non cho món ${dish.name}`,
        'Tỏi ta đập dập thơm lừng, dầu ăn hoặc mỡ heo',
        'Nước mắm ngon, hạt nêm, tiêu xay nhuyễn',
      ],
      steps: [
        {
          step: 1,
          title: 'Sơ chế & ráo nước',
          desc: 'Rau củ rửa sạch để thật ráo nước trước khi cho vào chảo xào.',
        },
        {
          step: 2,
          title: 'Phi thơm tỏi lửa lớn',
          desc: 'Đun chảo thật nóng già, phi thơm tỏi vàng giòn dậy mùi thơm.',
        },
        {
          step: 3,
          title: 'Xào nhanh lửa bốc khói',
          desc: 'Đảo nhanh tay trên lửa cực lớn trong 3-4 phút, nêm gia vị vừa ăn rồi trút ra đĩa ngay.',
        },
      ],
      tip: 'Chảo phải thật nóng và xào lửa to liên tục để món xào giữ được màu sắc tươi tắn và độ giòn ngọt tự nhiên.',
    };
  }

  if (isSide) {
    return {
      prepTime: '5 phút',
      cookTime: '0 phút',
      servings: '3 - 4 người',
      ingredients: [
        `Phần ăn kèm chuẩn vị cho ${dish.name}`,
        'Gia vị chấm hoặc đồ chua ngâm giòn',
        'Trái cây tráng miệng rửa sạch mát lành',
      ],
      steps: [
        {
          step: 1,
          title: 'Sơ chế sạch sẽ',
          desc: 'Rửa sạch bằng nước muối loãng, để ráo nước.',
        },
        {
          step: 2,
          title: 'Bày ra đĩa sứ',
          desc: 'Cắt lát trang trí đẹp mắt và bày kèm mâm cơm để thưởng thức giải ngấy.',
        },
      ],
      tip: 'Món ăn kèm giúp cân bằng vị giác hoàn hảo, giúp bữa cơm gia đình thêm phần ngon miệng và ấm cúng.',
    };
  }

  // Default Main dish
  return {
    prepTime: '15 phút',
    cookTime: '20 phút',
    servings: '3 - 4 người',
    ingredients: [
      `Thực phẩm chính tươi ngon cho ${dish.name}`,
      'Hành tím băm, tỏi khô, tiêu sọ xay',
      'Nước mắm cốt cá cơm đậm đà, nước màu, đường, ớt hiểm',
    ],
    steps: [
      {
        step: 1,
        title: 'Ướp gia vị đậm đà',
        desc: 'Ướp nguyên liệu với nước mắm ngon, tiêu, hành tỏi trong 15-20 phút cho thấm vị.',
      },
      {
        step: 2,
        title: 'Chế biến nhiệt',
        desc: 'Xào săn nguyên liệu trên lửa vừa để áo đều màu sắc óng ánh bắt mắt.',
      },
      {
        step: 3,
        title: 'Hoàn tất thơm ngon',
        desc: 'Đun nhỏ lửa cho ngấm sâu gia vị, rắc thêm hành hoa và tiêu xay trước khi dọn ra mâm.',
      },
    ],
    tip: 'Nêm nếm cân bằng mặn ngọt hài hòa sẽ giúp món ăn rất đưa cơm và thơm ngon tròn vị.',
  };
}
