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
    name: 'Canh Sườn Hầm Bí Đỏ Đậu Phộng',
    roleTag: 'Canh Bổ Dưỡng',
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
    name: 'Cải Thìa Xào Nấm Đông Cô Dầu Hào',
    roleTag: 'Rau Xanh Giòn',
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
    name: 'Kim Chi Chua Cay & Xoài Cát Hòa Lộc',
    roleTag: 'Kèm Đưa Cơm',
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
