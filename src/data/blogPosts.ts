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

export const BLOG_SLUG_ALIASES: Record<string, string> = {};

/**
 * Danh sách bài viết Blog ẩm thực
 * Để trống để bạn có thể tự viết các bài viết mới theo ý thích.
 */
export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'lam-mon-ngon-bang-noi-chien-khong-dau-goi-y-mon-de-lam-tai-nha',
    slug: 'lam-mon-ngon-bang-noi-chien-khong-dau-goi-y-mon-de-lam-tai-nha',
    title: 'Làm Món Ngon Bằng Nồi Chiên Không Dầu - Gợi Ý Món Dễ Làm Tại Nhà',
    excerpt: 'Tổng hợp các món ngon bằng nồi chiên không dầu dễ làm tại nhà: thịt ba chỉ giòn bì, cánh gà chiên mắm, sườn nướng BBQ kèm bảng nhiệt độ thời gian chuẩn bất bại.',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
    category: 'Bí Quyết Nấu Ăn',
    tags: [
      'Nồi chiên không dầu',
      'Món ngon mỗi ngày',
      'Thịt heo quay giòn bì',
      'Sườn nướng BBQ',
      'Mẹo nhà bếp',
      'Công thức nấu ăn',
    ],
    author: {
      name: 'Bếp Trưởng Hôm Nay Ăn Gì',
      role: 'Chuyên gia Ẩm thực & Dinh dưỡng',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&auto=format&fit=crop&q=80',
    },
    publishDate: '28/09/2026',
    readTime: '8 phút đọc',
    featured: true,
    relatedDishIds: ['suon-nuong-bbq'],
    content: `Nồi chiên không dầu (Air Fryer) từ lâu đã trở thành "trợ thủ đắc lực" không thể thiếu trong mọi gian bếp gia đình hiện đại. Không chỉ giúp tiết kiệm đến 70% thời gian nấu nướng, thiết bị này còn cắt giảm từ **80% - 90% lượng dầu mỡ thừa**, mang lại bữa ăn vừa thơm ngon, chuẩn vị vừa tốt cho sức khỏe tim mạch.

Nếu bạn đang băn khoăn chưa biết hôm nay làm món gì với chiếc nồi chiên không dầu sẵn có, hãy cùng khám phá ngay cẩm nang toàn diện: từ **bảng nhiệt độ vàng**, **top 5 món ăn bất bại** đến những **mẹo nướng thực phẩm giòn rụm bên ngoài, mọng nước bên trong** dưới đây!

> **Tóm tắt nhanh cẩm nang:**
> - Nắm vững bảng nhiệt độ & thời gian chuẩn cho từng loại thịt, cá, hải sản và rau củ.
> - Hướng dẫn công thức 5 món đỉnh cao: Ba chỉ giòn bì nổ xốp, sườn nướng tảng BBQ, cánh gà mật ong, cá nướng giấy bạc và đậu hũ chiên phồng.
> - Bí quyết bất bại: Luôn làm nóng nồi trước 3 - 5 phút và thấm khô hoàn toàn bề mặt bì thịt.

## 1. Bảng Nhiệt Độ & Thời Gian "Vàng" Cho Nồi Chiên Không Dầu

Mỗi dòng thực phẩm đòi hỏi mức nhiệt và thời gian chuẩn xác để không bị cháy ngoài mà sống trong, hoặc nướng quá tay khiến thịt bị khô xác. Dưới đây là bảng thông số tiêu chuẩn đã được đội ngũ đầu bếp kiểm nghiệm thực tế:

| Loại Thực Phẩm | Nhiệt Độ Chuẩn | Thời Gian Nướng | Mẹo Canh Lửa Bất Bại |
| Thịt ba chỉ heo quay giòn bì | 160°C rồi lên 200°C | 20 phút + 15 phút | Thấm khô bì, xăm đều, quét giấm muối nổ rộp |
| Sườn heo nướng tảng BBQ | 170°C rồi lên 185°C | 15 phút + 8 phút | Bọc giấy bạc 15p đầu, quét sốt nướng 8p sau |
| Cánh gà / Đùi gà nướng mật ong | 175°C rồi lên 190°C | 15 phút + 5 phút | Phết mật ong ở 5 phút cuối để không bị cháy đen |
| Cá hồi / Cá diêu hồng nướng | 180°C | 12 - 15 phút | Lót giấy nến hoặc gói giấy bạc giữ trọn vị ngọt |
| Đậu hũ chiên giòn / Khoai tây | 185°C - 190°C | 12 - 18 phút | Xịt một lớp dầu ăn mỏng để vỏ ngoài phồng giòn |
| Tôm nướng muối ớt / Mực nướng | 180°C | 8 - 10 phút | Trở mặt giữa chừng, không nướng quá lâu kẻo dai |

## 2. Gợi Ý Top 5 Món Ngon Bất Bại Dễ Làm Bằng Nồi Chiên Không Dầu

### 1. Thịt Ba Chỉ Heo Quay Giòn Bì Nổ Rộp Rộp

Món ăn "quốc dân" khiến mọi tín đồ ẩm thực mê mẩn chính là món thịt heo quay với lớp bì nổ vàng ươm, giòn rụm tan ngay đầu lưỡi trong khi phần thịt bên dưới vẫn mềm ngọt ngậy mỡ.

- **Nguyên liệu:** 600g thịt ba chỉ nguyên tảng tươi ngon, hành tím băm, ngũ vị hương, tiêu trắng, muối hạt, giấm trắng.
- **Cách làm:**
- 1. Luộc sơ phần bì trong nước sôi khoảng 3 phút, vớt ra ngâm nước đá lạnh.
- 2. Dùng xiên hoặc nĩa xăm thật đều lên lớp bì (không xăm sâu vào mỡ). Thấm giấy thật khô ráo.
- 3. Khía thịt thành từng dải, ướp mặt dưới với ngũ vị hương, hạt nêm và nước mắm (tuyệt đối không để dính vào bì).
- 4. Quét một lớp giấm mỏng và rải muối hạt lên bì. Cho vào nồi nướng ở 160°C trong 20 phút.
- 5. Gạt sạch lớp muối, tăng nhiệt lên 200°C nướng thêm 10 - 15 phút cho bì nổ phồng rôm rốp.
- **Thưởng thức:** Món này ăn kèm dưa leo, bánh hỏi hoặc chấm nước tương tỏi ớt cực kỳ cuốn hút, ngon không kém gì heo quay ngoài tiệm.

### 2. Dẻ Sườn Heo Nướng Tảng BBQ Sốt Khói Đậm Đà

Nếu cuối tuần bạn muốn đổi vị cho cả nhà một bữa tiệc nướng chuẩn nhà hàng Âu, món [Dẻ sườn heo nướng BBQ](/suon-nuong-bbq) làm bằng nồi chiên không dầu là sự lựa chọn số một.

- **Bí quyết ướp:** Sườn non rửa sạch, ướp cùng sốt BBQ đóng chai, mật ong, tỏi băm, một muỗng dầu hào và chút tiêu đen trong ít nhất 1 giờ.
- **Nướng 2 giai đoạn:**
- Giai đoạn 1: Bọc kín sườn trong giấy bạc, nướng 170°C trong 18 phút để sườn chín mềm từ trong xương mà không bị mất nước.
- Giai đoạn 2: Mở giấy bạc, quét thêm một lớp sốt BBQ mật ong đậm đà lên mặt trên, nướng 185°C trong 6 - 8 phút đến khi bề mặt sườn ánh lên màu cánh gián caramen thơm nức mũi.
- Khi dọn ra đĩa, thịt sườn róc xương mềm tan, rất hợp ăn cùng cơm nóng hoặc mâm cơm gia đình ấm cúng.

### 3. Cánh Gà Nướng Mật Ong Tỏi Ớt Vàng Óng

Một món ăn vặt lẫn món mặn đưa cơm mà các bạn nhỏ và cả người lớn đều yêu thích. Cánh gà nướng bằng nồi chiên không dầu có lớp da mỏng giòn, mỡ gà tự chảy ra giúp món ăn không hề ngấy.

- **Mẹo nướng:** Ướp cánh gà với tỏi, ớt bột paprika, dầu hào và nước mắm. Nướng lần đầu ở 175°C trong 15 phút cho chín đều. Sau đó phết hỗn hợp mật ong pha chút dầu mè rồi nướng tiếp ở 190°C trong 5 phút.
- Món gà này thơm lừng, thịt dai ngọt và màu sắc óng ả vô cùng hấp dẫn.

### 4. Cá Hồi / Cá Diêu Hồng Nướng Giấy Bạc Thảo Mộc

Nhiều người ngại nướng cá bằng nồi chiên vì sợ khô hoặc vỡ nát. Tuy nhiên, nếu bạn áp dụng phương pháp **nướng bọc giấy bạc**, thịt cá sẽ giữ được 100% độ ngọt tự nhiên và độ béo ngậy thanh tao.

- Lót giấy bạc, xếp một lớp thì là, sả đập dập và gừng thái sợi bên dưới. Đặt cá lên trên, rưới chút xốt dầu hào, tiêu sọ và bơ nhạt. Gấp kín mép giấy bạc và nướng ở 180°C trong 15 phút.
- Bữa cơm có món cá nướng ăn kèm một bát canh chua thanh mát sẽ mang lại cảm giác dễ chịu, cân bằng dinh dưỡng tuyệt vời cho cả nhà.

### 5. Đậu Hũ Chiên Giòn Rụm Lắc Phô Mai Ăn Vặt Lành Mạnh

Muốn ăn đồ chiên mà sợ tăng cân? Món đậu hũ chiên giòn bằng nồi chiên không dầu chính là chân ái cho thực đơn eat clean và ăn chay.

- Đậu hũ cắt miếng vuông vừa ăn, dùng khăn sạch thấm khô nước. Xịt một lớp dầu oliu siêu mỏng quanh miếng đậu rồi xếp vào nồi nướng ở 190°C trong 15 phút, trở mặt sau 8 phút.
- Thành phẩm là từng miếng đậu phồng to, vỏ ngoài giòn tan kêu rôm rốp, bên trong mềm béo bùi ngậy chấm cùng tương ớt hoặc mắm tôm sủi bọt.

## 3. 4 Bí Quyết "Vàng" Giúp Món Nướng Giòn Tan, Mọng Nước Không Bị Khô

- **1. Luôn làm nóng nồi trước khi nướng (Preheat):** Bật nồi ở nhiệt độ cần nướng trong 3 - 5 phút trước khi xếp thực phẩm vào. Việc này tạo ra một "sốc nhiệt" tức thì, giúp bề mặt thịt se lại ngay lập tức, giữ trọn nước ngọt bên trong.
- **2. Không xếp chồng chéo thực phẩm:** Nồi chiên hoạt động dựa trên cơ chế luồng khí nóng đối lưu tuần hoàn. Nếu bạn xếp thức ăn quá dày, luồng khí không thể lưu thông, món ăn sẽ bị hấp chín ỉu xìu thay vì nướng giòn.
- **3. Thấm khô ráo bề mặt thịt cá:** Nước đọng trên bề mặt thực phẩm chính là kẻ thù số một của độ giòn. Hãy luôn dùng khăn giấy đa năng thấm thật khô ráo trước khi cho vào nồi.
- **4. Quét một lớp dầu ăn mỏng đối với thực phẩm ít mỡ:** Với ức gà, khoai tây, đậu hũ hay rau củ, một lớp dầu mỏng từ bình xịt sẽ giúp truyền nhiệt đều hơn và tạo lớp vỏ vàng ruộm bắt mắt.

## 4. Gợi Ý Thực Đơn Bữa Cơm Gia Đình Kết Hợp Nồi Chiên Không Dầu

Một bữa cơm ấm cúng và đầy đủ dưỡng chất nên có sự kết hợp hài hòa giữa món nướng mặn đậm đà, món canh thanh mát và rau xào giòn ngọt. Bạn có thể kết hợp món thịt heo quay giòn bì hoặc sườn nướng cùng một đĩa rau muống xào tỏi và một tô canh cua đồng rau đay mồng tơi để có mâm cơm chuẩn vị quê hương. Chúc bạn thực hiện thành công những món ngon hấp dẫn cùng chiếc nồi chiên không dầu của gia đình!`,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return INITIAL_BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.replace(/^\/?blog\//, '').replace(/^\//, '').replace(/\/$/, '');
  const canonicalSlug = BLOG_SLUG_ALIASES[cleanSlug] || cleanSlug;
  return INITIAL_BLOG_POSTS.find((p) => p.slug === canonicalSlug || p.id === canonicalSlug || p.slug === cleanSlug);
}

export function isBlogPostSlug(slug: string): boolean {
  if (!slug) return false;
  const clean = slug.replace(/^\/?blog\//, '').replace(/^\//, '').replace(/\/$/, '');
  const canonical = BLOG_SLUG_ALIASES[clean] || clean;
  return INITIAL_BLOG_POSTS.some((p) => p.slug === canonical || p.id === canonical || p.slug === clean);
}

export function getBlogPostUrl(post: BlogPost): string {
  return `/${post.slug}`;
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return INITIAL_BLOG_POSTS.filter((p) => p.featured);
}
