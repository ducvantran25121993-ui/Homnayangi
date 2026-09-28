export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: 'Mẹo Nhà Bếp' | 'Văn Hóa Ẩm Thực' | 'Bí Quyết Nấu Ăn' | 'Dinh Dưỡng & Sức Khỏe' | 'Gợi Ý Thực Đơn';
  tags: string[];
  author: BlogAuthor;
  publishDate: string;
  readTime: string;
  featured?: boolean;
  relatedDishIds?: string[];
  content: string;
}

export const BLOG_CATEGORIES = [
  'Tất Cả',
  'Mẹo Nhà Bếp',
  'Bí Quyết Nấu Ăn',
  'Văn Hóa Ẩm Thực',
  'Dinh Dưỡng & Sức Khỏe',
  'Gợi Ý Thực Đơn',
] as const;

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'bi-quyet-chon-thuc-pham-tuoi-ngon',
    slug: 'bi-quyet-chon-thuc-pham-tuoi-ngon-cho-bua-com-gia-dinh',
    title: 'Bí Quyết Đi Chợ Chọn Thực Phẩm Tươi Ngon Chuẩn Đầu Bếp Cho Bữa Cơm Gia Đình',
    excerpt:
      'Làm thế nào để chọn được miếng thịt heo dẻo dính, con cá tươi mắt trong veo hay bó rau củ quả không ngâm thuốc? Bỏ túi ngay kinh nghiệm đi chợ truyền thống và siêu thị chuẩn không cần chỉnh.',
    coverImage:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    category: 'Mẹo Nhà Bếp',
    tags: ['Mẹo đi chợ', 'Thực phẩm sạch', 'Bữa cơm gia đình', 'Kinh nghiệm nội trợ'],
    author: {
      name: 'Bếp Trưởng An',
      role: 'Chuyên gia ẩm thực & Dinh dưỡng',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&fit=crop&q=80',
    },
    publishDate: '28/09/2026',
    readTime: '6 phút đọc',
    featured: true,
    relatedDishIds: ['thit-kho-tau', 'canh-chua-ca-loc', 'suon-xao-chua-ngot'],
    content: `
### 1. Bí quyết chọn thịt heo, thịt bò tươi ngon, không ngâm hóa chất

Một món ăn ngon bắt đầu từ khâu tuyển chọn nguyên liệu tươi sạch. Khi mua thịt, đừng chỉ nhìn vào màu sắc bên ngoài:

- **Thịt heo tươi:** Màu hồng tươi sáng tự nhiên, thớ thịt săn chắc, màng ngoài khô ráo. Dùng ngón tay ấn nhẹ vào miếng thịt, nếu thịt có độ đàn hồi tốt, vết lõm nhanh chóng phẳng trở lại và không dính nhớt thì đó là miếng thịt tươi mới mổ. Phần mỡ có màu trắng ngà hoặc hơi hồng, không có mùi lạ.
- **Thịt bò ta:** Chọn thịt có màu đỏ tươi (không phải đỏ thẫm), thớ thịt nhỏ mịn, mỡ bò màu vàng nhạt thơm đặc trưng. Miếng thịt dẻo dính tay khi chạm vào là thịt bò ngon, mềm mọng khi chế biến.

### 2. Mẹo chọn cá tôm và hải sản tươi sống

- **Cá tươi:** Quan sát mắt cá đầu tiên – mắt phải lồi nhẹ, trong veo, thấy rõ con ngươi đen láy. Mang cá có màu đỏ tươi hoặc hồng hào, khép chặt. Vảy cá bám chặt vào thân, sáng bóng, khi ấn vào bụng cá thấy săn chắc, không bị mềm nhũn hoặc phình to.
- **Tôm sống:** Thân tôm uốn cong tự nhiên, vỏ cứng cáp bóng bẩy, các khớp vỏ khít chặt vào nhau. Tránh mua tôm có phần đầu tách rời thân hoặc thân căng tròn mọng nước bất thường (dấu hiệu bơm tạp chất).

### 3. Cách chọn rau củ quả theo mùa, an toàn cho sức khỏe

- **Ưu tiên rau củ đúng mùa vụ:** Rau củ trái mùa thường phải dùng nhiều thuốc bảo vệ thực vật và chất kích thích sinh trưởng. Mùa nào thức nấy vừa ngon ngọt, dồi dào dinh dưỡng lại có mức giá tốt nhất.
- **Không chọn rau củ quá bóng bẩy mướt mát:** Bó rau có màu xanh sẫm bóng loáng, cọng vươn dài mập mạp bất thường thường chứa lượng đạm nitrat cao. Hãy chọn rau có kích thước vừa phải, màu sắc tự nhiên, lá lành lặn và củ quả có cuống còn tươi xanh ứa nhựa.

> **Lời khuyên từ bếp trưởng:** Khi đi chợ, hãy ưu tiên mua đồ khô và gia vị trước, sau đó đến rau củ quả, và cuối cùng mới mua thịt cá tươi sống để tránh thực phẩm tươi bị ôi hỏng trong thời tiết nóng ẩm.
`,
  },
  {
    id: 'van-hoa-mam-com-gia-dinh-viet-nam',
    slug: 'van-hoa-mam-com-gia-dinh-viet-nam-qua-ba-mien',
    title: 'Mâm Cơm Gia Đình Việt Nam: Nét Đẹp Văn Hóa & Tình Thân Gắn Kết Ba Miền',
    excerpt:
      'Dù cuộc sống hiện đại có bận rộn đến đâu, mâm cơm nhà vẫn là nơi chốn bình yên nhất để trở về. Cùng khám phá triết lý ngũ hành âm dương và nét độc đáo trong văn hóa ẩm thực gia đình Việt.',
    coverImage:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    category: 'Văn Hóa Ẩm Thực',
    tags: ['Văn hóa Việt', 'Cơm nhà mẹ nấu', 'Ẩm thực ba miền', 'Tình thân'],
    author: {
      name: 'Ngọc Mai',
      role: 'Cây bút văn hóa ẩm thực',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    },
    publishDate: '26/09/2026',
    readTime: '7 phút đọc',
    featured: true,
    relatedDishIds: ['pho-bo-tai-lan', 'bun-bo-hue', 'ca-loc-kho-to'],
    content: `
### 1. Triết lý "Ngũ hành" và sự cân bằng trong mâm cơm Việt

Khác với văn hóa ẩm thực phương Tây chú trọng vào từng khẩu phần riêng lẻ của từng cá nhân, mâm cơm truyền thống của người Việt Nam luôn mang tính cộng đồng sâu sắc. Một chiếc mâm tròn đặt giữa nhà, mọi thành viên cùng quây quần bên bát cơm nóng hổi, cùng sẻ chia những món ăn chung.

Trong mâm cơm Việt, sự hài hòa giữa ngũ vị (Chua - Cay - Mặn - Ngọt - Đắng) và ngũ sắc (Xanh - Đỏ - Vàng - Trắng - Đen) luôn được đặt lên hàng đầu:
- **Món mặn đậm đà:** Thịt kho tàu, cá kho tộ hay sườn rim đưa cơm.
- **Bát canh thanh mát:** Canh chua giải nhiệt, canh rau ngót thịt băm ngọt dịu.
- **Đĩa xào / luộc tươi giòn:** Rau muống luộc chấm tương hoặc xào tỏi thơm nức.
- **Chén nước mắm ớt đồng tâm:** Đặt chính giữa mâm cơm, biểu trưng cho sự gắn kết hòa hợp của cả gia đình.

### 2. Sự khác biệt tinh tế giữa ẩm thực ba miền

- **Miền Bắc thanh tao, chuẩn mực:** Mâm cơm miền Bắc thường chú trọng vào vị thanh nhẹ, hài hòa, không quá cay nồng cũng không ngọt gắt. Nước chấm thanh đượm hương tinh dầu cà cuống hoặc giấm bỗng, ớt tươi điểm xuyết nhẹ nhàng.
- **Miền Trung đậm đà, cay nồng:** Dải đất miền Trung với khí hậu khắc nghiệt đã tôi luyện nên phong cách ẩm thực đậm đà, nồng nàn. Mắm ruốc, củ nén, ớt chỉ thiên và tiêu sọ luôn là những gia vị không thể vắng bóng.
- **Miền Nam phóng khoáng, ngọt lành:** Đất đai trù phú, sông nước phù sa mang lại nguồn sản vật dồi dào. Mâm cơm người miền Nam đậm đà hương nước cốt dừa, đường thốt nốt, cá đồng tươi rói và vô vàn thứ rau rừng hoang dã.

> **Tâm sự bữa cơm nhà:** "Bữa cơm ngon nhất không nằm ở sơn hào hải vị đắt tiền, mà là khoảnh khắc cả nhà cùng ngồi lại bên nhau sau một ngày dài mỏi mệt, lắng nghe nhau chuyện trò và cùng gắp cho nhau miếng ngon nhất trên mâm."
`,
  },
  {
    id: 'meo-nau-nuoc-dung-pho-bo-trong-veo',
    slug: 'meo-nau-nuoc-dung-pho-bo-trong-veo-ngot-lim-chuan-pho-co',
    title: 'Tuyệt Kỹ Ninh Nước Dùng Phở Bò Trong Veo, Ngọt Thanh Không Cần Mì Chính',
    excerpt:
      'Học hỏi kinh nghiệm gia truyền từ các nghệ nhân phở Hà Nội: Cách chọn xương bò, khử hôi tủy xương, nướng gừng hành hoa hồi và canh lửa liu riu cho nồi nước dùng trong vắt, thơm nức mũi.',
    coverImage:
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1200&auto=format&fit=crop&q=80',
    category: 'Bí Quyết Nấu Ăn',
    tags: ['Phở Hà Nội', 'Bí quyết nấu ăn', 'Nước dùng phở', 'Món ngon phố cổ'],
    author: {
      name: 'Bếp Trưởng An',
      role: 'Chuyên gia ẩm thực & Dinh dưỡng',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&fit=crop&q=80',
    },
    publishDate: '24/09/2026',
    readTime: '8 phút đọc',
    relatedDishIds: ['pho-bo-tai-lan', 'pho-ga-ha-noi', 'bun-bo-hue'],
    content: `
### 1. Khâu chọn xương và khử hôi tủy bò

Linh hồn của một bát phở bò xuất sắc nằm trọn vẹn ở nồi nước dùng (nước lèo). Nếu nước dùng bị đục hoặc có mùi hôi gây, bát phở coi như thất bại một nửa.

- **Chọn xương ống bò tươi:** Xương ống bò tươi có tủy trắng ngà, màu đỏ hồng tự nhiên. Kết hợp xương ống với xương đuôi bò hoặc gầu hoa bò để nước dùng vừa ngọt thanh tủy lại vừa thơm béo ngậy.
- **Ngâm nước muối và gừng:** Ngâm xương bò trong nước lạnh có pha muối hạt và rượu trắng ít nhất 2 giờ để ép hết máu đọng trong tủy ra ngoài.
- **Luộc trần lần 1 (Bắt buộc):** Cho xương vào nồi nước lạnh ngập mặt, đun sôi bùng trong 5 - 7 phút với vài nhánh gừng đập dập. Vớt xương ra, dùng bàn chải nhỏ cọ rửa thật sạch từng kẽ xương dưới vòi nước lạnh, đổ bỏ toàn bộ nước luộc đầu tiên.

### 2. Rang nướng hương liệu thảo mộc chuẩn tỷ lệ

Hương thơm quyến rũ lan tỏa khắp góc phố của phở đến từ sự kết hợp hài hòa của các vị thảo mộc thiên nhiên:
- **Gừng và hành tím:** Nướng nguyên củ trên than hoa hoặc nồi chiên không dầu đến khi vỏ ngoài cháy xém, cạo sạch lớp than đen rồi đập dập. Hành nướng giúp nước dùng thơm dịu và có màu vàng hổ phách trong veo.
- **Thảo quả, hoa hồi, quế chi, hạt mùi và đinh hương:** Rang nhỏ lửa trên chảo khô đến khi tỏa hương ngào ngạt thì cho vào túi vải lọc cột chặt thả vào nồi nước dùng trong 2 giờ cuối, không thả quá sớm kẻo nước dùng bị đen và hắc nồng.

### 3. Kỹ thuật canh lửa và hớt bọt

- **Quy tắc đun lửa liu riu:** Sau khi nước sôi bùng, hạ lửa xuống mức nhỏ nhất sao cho mặt nước chỉ sủi tăm lăn tăn nhẹ ở một góc nồi. Tuyệt đối không đậy nắp vung kín mít khi ninh xương, vì đậy nắp sẽ làm nhiệt độ quá cao khiến bọt bẩn cuộn ngược vào trong, làm nước phở bị đục ngầu.
- **Hớt bọt liên tục trong 1 giờ đầu:** Lớp bọt nâu nổi lên chính là tạp chất còn sót lại. Hớt thật nhẹ tay để lấy đi bọt bẩn mà không làm mất đi lớp váng mỡ vàng óng ả phía trên.
- **Vị ngọt thanh từ đường phèn và nước mắm cốt:** Thay vì dùng bột ngọt hay mì chính, hãy nêm nước dùng bằng muối hạt tinh khiết, chút đường phèn thanh nhẹ và một thìa nước mắm cốt nhĩ loại ngon vào thời điểm chuẩn bị chan bát.
`,
  },
  {
    id: 'thuc-don-eat-clean-7-ngay-du-chat',
    slug: 'thuc-don-eat-clean-7-ngay-du-chat-khong-lo-tang-can',
    title: 'Lên Thực Đơn Eat Clean 7 Ngày Cho Dân Văn Phòng: Đủ Chất, Đẹp Dáng, Tiết Kiệm',
    excerpt:
      'Gợi ý thực đơn ăn sạch - sống khỏe chuẩn khoa học từ Thứ 2 đến Chủ Nhật. Đầy đủ tinh bột chậm, protein nạc và chất xơ tươi ngon, dễ dàng chuẩn bị hộp cơm trưa chỉ trong 20 phút.',
    coverImage:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80',
    category: 'Dinh Dưỡng & Sức Khỏe',
    tags: ['Eat Clean', 'Giảm cân lành mạnh', 'Thực đơn văn phòng', 'Healthy lifestyle'],
    author: {
      name: 'Thanh Hằng',
      role: 'Huấn luyện viên dinh dưỡng',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    publishDate: '22/09/2026',
    readTime: '5 phút đọc',
    relatedDishIds: ['salad-uc-ga', 'com-ga-hoi-an', 'canh-chua-ca-loc'],
    content: `
### 1. Hiểu đúng về Eat Clean: Không phải ăn kiêng kham khổ

Rất nhiều người lầm tưởng "Eat Clean" là chỉ ăn ức gà luộc nhạt nhẽo và rau xanh luộc không gia vị. Thực chất, Eat Clean là phương pháp ăn uống hướng tới:
- Sử dụng thực phẩm nguyên bản, ít qua chế biến công nghiệp.
- Cân bằng đủ 4 nhóm dưỡng chất: Tinh bột tốt (Carb chậm), Đạm sạch (Protein nạc), Chất béo tốt (Healthy fats) và Vitamin/Khoáng chất (Rau củ quả).
- Nấu nướng đa dạng phương pháp: Áp chảo dầu ô liu, nướng giấy bạc, hấp thảo mộc, xào lăn sốt mè rang thơm phức.

### 2. Thực đơn 7 ngày gợi ý cho dân công sở bận rộn

- **Thứ 2 - Khởi đầu tuần mới nhẹ nhàng:** Cơm gạo lứt dẻo + Ức gà áp chảo sốt tiêu đen + Bông cải xanh và cà rốt hấp chấm sốt mè rang.
- **Thứ 3 - Nạp năng lượng với hải sản:** Khoai lang mật nướng + Tôm sú hấp sả chanh + Salad xà lách dưa leo trộn dầu giấm táo.
- **Thứ 4 - Thanh lọc cơ thể:** Bún nưa hoặc miến dong xào bò nạc + Ớt chuông đỏ vàng xào nấm đùi gà + Canh bí đao nấu tôm tươi.
- **Thứ 5 - Bổ sung chất béo tốt Omega-3:** Cá hồi hoặc cá basa nướng nồi chiên không dầu + Bắp ngọt luộc + Salad mầm cải cà chua bi.
- **Thứ 6 - Hương vị đậm đà cuối tuần:** Trứng cuộn rong biển rau củ + Cơm gạo lứt huyết rồng + Canh rong biển đậu hũ non.
- **Thứ 7 & Chủ Nhật - Thảnh thơi đổi bữa:** Bún chả cá áp chảo nước dùng cà chua thanh mát hoặc Lẩu gà nấm thanh đạm quây quần cùng người thân.
`,
  },
  {
    id: 'cach-bao-quan-rau-cu-thit-ca-tuoi-lau',
    slug: 'cach-bao-quan-rau-cu-thit-ca-trong-tu-lanh-luon-tuoi-xanh',
    title: 'Cách Sơ Chế & Bảo Quản Rau Củ, Thịt Cá Trong Tủ Lạnh Tươi Ngon Suốt Cả Tuần',
    excerpt:
      'Đi chợ một lần ăn cả tuần mà thực phẩm vẫn giữ nguyên độ tươi non và hàm lượng vitamin quý giá? Áp dụng ngay phương pháp chia hộp thông minh và kiểm soát độ ẩm chuẩn khoa học.',
    coverImage:
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=1200&auto=format&fit=crop&q=80',
    category: 'Mẹo Nhà Bếp',
    tags: ['Bảo quản thực phẩm', 'Mẹo tủ lạnh', 'Meal Prep', 'Tiết kiệm thời gian'],
    author: {
      name: 'Bếp Trưởng An',
      role: 'Chuyên gia ẩm thực & Dinh dưỡng',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&fit=crop&q=80',
    },
    publishDate: '20/09/2026',
    readTime: '6 phút đọc',
    content: `
### 1. Nguyên tắc vàng khi bảo quản rau xanh

Kẻ thù lớn nhất của rau xanh khi để trong tủ lạnh là **độ ẩm đọng nước**:
- **Không rửa rau trước khi cất tủ lạnh:** Nếu rau bị ướt, nước đọng sẽ làm lá rau nhanh chóng bị dập úng và thối rữa chỉ sau 2 ngày. Chỉ rửa rau ngay trước khi nấu.
- **Phương pháp bọc giấy thấm dầu:** Nhặt bỏ các lá sâu, úa vàng. Dùng khăn giấy ăn hoặc giấy báo sạch bọc quanh mớ rau rồi mới cho vào túi zip hoặc hộp nhựa có nắp đậy kín. Lớp giấy sẽ hút hết hơi ẩm dư thừa, giữ rau tươi xanh giòn rụm từ 7 đến 10 ngày.
- **Các loại rau thơm (ngò, húng, hành lá):** Cắt bớt phần rễ bẩn, cắm vào một ly nước nhỏ như cắm hoa rồi chụp nhẹ một túi nilon lên ngọn, để ở cánh cửa tủ lạnh. Hành ngò sẽ luôn tươi rói như vừa hái ngoài vườn.

### 2. Cách cấp đông thịt cá giữ trọn dưỡng chất

- **Chia nhỏ khẩu phần từng bữa:** Trước khi cho thịt cá vào ngăn đá, hãy chia thành từng phần vừa đủ cho 1 bữa ăn của gia đình (khoảng 300g - 500g). Tuyệt đối tránh việc rã đông cả tảng thịt lớn rồi lại cấp đông trở lại phần thừa, vì vi khuẩn sẽ sinh sôi rất nhanh và làm thịt mất hết vị ngọt tự nhiên.
- **Hút chân không hoặc ép hết không khí:** Dùng màng bọc thực phẩm bọc thật chặt miếng thịt hoặc dùng túi zip miết sạch không khí ra ngoài để tránh hiện tượng "cháy đông" (freezer burn) làm miếng thịt bị khô cứng và chuyển màu xám xịt.
- **Rã đông chuẩn:** Chuyển phần thịt từ ngăn đông xuống ngăn mát trước nửa ngày, hoặc ngâm túi thịt kín trong âu nước lạnh. Không ngâm trực tiếp thịt trong nước ấm nóng.
`,
  },
  {
    id: 'gia-vi-truyen-thong-viet-nam',
    slug: 'gia-vi-truyen-thong-viet-nam-linh-hon-cua-moi-mon-ngon',
    title: 'Hành Tăm, Nước Mắm Nhĩ, Hạt Tiêu: Những Gia Vị Làm Nên Linh Hồn Bếp Việt',
    excerpt:
      'Gia vị trong ẩm thực Việt Nam không chỉ để nêm nếm mặn ngọt, mà còn là phương thuốc dân gian điều hòa hàn nhiệt, âm dương. Cùng khám phá chiều sâu văn hóa đằng sau từng loại gia vị thân thương.',
    coverImage:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&auto=format&fit=crop&q=80',
    category: 'Văn Hóa Ẩm Thực',
    tags: ['Gia vị Việt', 'Nước mắm truyền thống', 'Văn hóa ẩm thực', 'Bí quyết đầu bếp'],
    author: {
      name: 'Ngọc Mai',
      role: 'Cây bút văn hóa ẩm thực',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    },
    publishDate: '18/09/2026',
    readTime: '7 phút đọc',
    relatedDishIds: ['banh-canh-ca-loc', 'nem-lui-nuong-cuon', 'thit-kho-tau'],
    content: `
### 1. Nước mắm nhĩ truyền thống: Giọt ngọc của biển cả

Trong căn bếp của bất kỳ gia đình người Việt nào, chai nước mắm luôn ngự trị ở vị trí trang trọng nhất. Khác với các loại nước chấm công nghiệp pha hương liệu, nước mắm truyền thống được ủ chượp ròng rã từ 12 đến 24 tháng chỉ từ 2 nguyên liệu: Cá cơm tươi rói và muối hạt tinh khiết.

Giọt nước mắm nhĩ cốt đầu tiên sánh vàng cánh gián, tỏa hương thơm nồng nàn đặc trưng và để lại hậu vị ngọt đượm sâu lắng nơi cuống họng. Người Việt dùng nước mắm không chỉ để chấm, mà còn để ướp thịt săn chắc, nêm canh thanh dịu và kho cá đượm màu.

### 2. Củ nén (Hành tăm): Linh hồn cay ấm miền Trung

Nếu miền Bắc chuộng hành hoa và thì là, miền Nam say đắm vị thơm của rau răm và lá é, thì miền Trung nắng rát lại gửi trọn tâm tình vào củ nén bé nhỏ.
- Củ nén nhỏ chỉ bằng đầu ngón tay út, vỏ trắng tinh khiết nhưng khi đập dập và phi thơm với dầu lạc, hương thơm cay nồng ấm lập tức lan tỏa ngào ngạt khắp xóm ngõ.
- Trong món bánh canh cá lóc, cháo lươn hay củ nén xào gà ta, củ nén đóng vai trò như một vị thần khử sạch hoàn toàn mùi tanh của cá đồng và thủy sản, đồng thời là phương thuốc giải cảm, ấm tỳ vị tuyệt vời của ông bà xưa.

### 3. Hạt tiêu sọ Phú Quốc: Vị cay thơm nồng nàn

Hạt tiêu đen cay tê đầu lưỡi, thơm đượm nồng nàn được rang sơ rồi giã dập là nét chấm phá cuối cùng giúp đánh thức mọi giác quan trong các món kho, xào và súp hầm.
`,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return INITIAL_BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const cleanSlug = slug.replace(/^\/?blog\//, '').replace(/^\//, '');
  return INITIAL_BLOG_POSTS.find((p) => p.slug === cleanSlug || p.id === cleanSlug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return INITIAL_BLOG_POSTS.filter((p) => p.featured);
}
