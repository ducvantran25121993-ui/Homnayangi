import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { getAllSeoRoutes } from "./src/data/seoRoutes";

dotenv.config();

// Compile-time define replaced by esbuild for the production bundle
declare const __IS_PRODUCTION_BUILD__: boolean | undefined;

const app = express();
const isBundled =
  typeof __IS_PRODUCTION_BUILD__ !== "undefined" && __IS_PRODUCTION_BUILD__ === true;
const isProduction =
  process.env.NODE_ENV === "production" ||
  isBundled ||
  (typeof __filename !== "undefined" && (__filename.endsWith(".cjs") || __filename.includes("dist")));

if (isProduction && process.env.NODE_ENV !== "production") {
  process.env.NODE_ENV = "production";
}

const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: "25mb" }));

// In-memory click tracking & stats
interface ClickEvent {
  id: string;
  dishId: string;
  dishName: string;
  platform: "shopeefood" | "grabfood" | "befood";
  timestamp: string;
  estimatedCommission: number;
}

let clickHistory: ClickEvent[] = [
  {
    id: "clk_1",
    dishId: "com-tam",
    dishName: "Cơm tấm sườn bì chả",
    platform: "shopeefood",
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    estimatedCommission: 3500,
  },
  {
    id: "clk_2",
    dishId: "bun-bo-hue",
    dishName: "Bún bò Huế đặc biệt",
    platform: "grabfood",
    timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    estimatedCommission: 4200,
  },
  {
    id: "clk_3",
    dishId: "tra-sua",
    dishName: "Trà sữa trân châu đường đen",
    platform: "shopeefood",
    timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    estimatedCommission: 2800,
  },
  {
    id: "clk_4",
    dishId: "pho-bo",
    dishName: "Phở bò tái lăn",
    platform: "befood",
    timestamp: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
    estimatedCommission: 3800,
  },
];

let affiliateConfig = {
  shopeeAffiliateId: "17307790541",
  shopeeSubId: "homnayangi_web",
  shopeeBaseUrl: "https://shopeefood.vn",
  shopeeAffiliateUrl: "https://s.shopee.vn/aff_food_homnayangi",
  
  grabfoodAffiliateId: "GRAB_AFF_VN_777",
  grabfoodDeepLink: "grab://food/search",
  grabfoodWebUrl: "https://food.grab.com/vn/vi/",
  
  befoodPartnerId: "BEFOOD_VN_666",
  befoodWebUrl: "https://be.com.vn/dich-vu/be-food/",
  
  averageCommissionRate: 5.5, // 5.5%
  defaultCity: "TP. Hồ Chí Minh",
};

// Lazy Gemini SDK client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key.startsWith("MY_") || key === "placeholder" || key.trim() === "") {
    return null;
  }
  if (!genAIClient) {
    try {
      genAIClient = new GoogleGenAI({
        apiKey: key,
      });
    } catch {
      genAIClient = null;
    }
  }
  return genAIClient;
}

// Contextual Vietnamese culinary suggestion generator for resilient fallback
function getContextualDishes(params: {
  mealTime: string;
  budget: string;
  mood: string;
  weather: string;
  cravings: string;
  location: string;
  partySize: number;
  dietary?: string;
}) {
  const { mealTime, budget, weather, cravings, location, partySize, dietary } = params;
  const isColdOrRainy = weather.includes("Mưa") || weather.includes("Lạnh");
  const isHot = weather.includes("Nắng") || weather.includes("Nóng");
  const isVegetarian = dietary === "Ăn chay" || (cravings && cravings.toLowerCase().includes("chay"));

  if (isVegetarian) {
    return {
      suggestions: [
        {
          name: "Cơm Hạt Sen Nấm Đông Cô Chay",
          tagline: "Hạt sen bùi thơm, nấm ngọt thanh, thanh tịnh trọn vẹn",
          category: "Healthy / Món Chay",
          estimatedPrice: "40.000đ - 60.000đ",
          reason: `Bữa ${mealTime} thanh đạm, giàu dinh dưỡng tự nhiên, giúp cơ thể nhẹ nhõm và an yên.`,
          searchKeyword: "Cơm chay hạt sen",
          tags: ["Thuần chay", "Thanh đạm", "Tốt cho sức khỏe"],
          calories: "~460 kcal",
          pairWith: "Canh rong biển đậu hũ & trà hoa cúc",
        },
        {
          name: "Bún Riêu Cua Chay Tàu Hũ Ky",
          tagline: "Nước dùng chua thanh vị cà chua, chả chay béo ngậy giòn rụm",
          category: "Bún / Phở Chay",
          estimatedPrice: "35.000đ - 50.000đ",
          reason: "Nước dùng cà chua thanh mát hòa quyện cùng đậu hũ mềm mướt, ăn giải nhiệt cực thích.",
          searchKeyword: "Bún riêu chay",
          tags: ["Chua ngọt", "Ấm bụng", "Dễ ăn"],
          calories: "~420 kcal",
          pairWith: "Rau ghém xà lách & nước mía",
        },
        {
          name: "Gỏi Cuốn Ngũ Sắc Chay Sốt Bơ Đậu Phộng",
          tagline: "Rau củ tươi giòn thanh mát chấm sốt tương đậu phộng béo bùi",
          category: "Món Cuốn Chay",
          estimatedPrice: "30.000đ - 45.000đ",
          reason: "Nhiều chất xơ, màu sắc hấp dẫn, không sợ ngấy hay nặng bụng.",
          searchKeyword: "Gỏi cuốn chay",
          tags: ["Thanh mát", "Nhiều rau", "Ít calo"],
          calories: "~320 kcal",
          pairWith: "Nước dừa tươi",
        },
      ],
      advice: `Mẹo nhỏ: Nhóm ${partySize} người tại ${location} có thể đặt thêm lẩu nấm dưỡng sinh nếu ăn cùng nhau!`,
    };
  }

  if (isColdOrRainy) {
    return {
      suggestions: [
        {
          name: "Bún Bò Huế Chả Cua Thịt Bắp Nạm",
          tagline: "Nước dùng sả ruốc cay nồng nghi ngút khói, xì xụp ấm lòng",
          category: "Bún / Mì / Phở",
          estimatedPrice: "50.000đ - 70.000đ",
          reason: `Trời ${weather.toLowerCase()} húp một tô bún bò cay thơm sả ớt là cách tốt nhất để sưởi ấm cơ thể.`,
          searchKeyword: "Bún bò Huế",
          tags: ["Cay nồng", "Ấm bụng", "Húp nước xì xụp"],
          calories: "~590 kcal",
          pairWith: "Quẩy giòn & trà gừng mật ong",
        },
        {
          name: "Cơm Niêu Bò Xào Sốt Tiêu Đen",
          tagline: "Cơm cháy giòn rụm đáy niêu, thịt bò xèo xèo sốt tiêu ấm nóng",
          category: "Cơm Niêu",
          estimatedPrice: "55.000đ - 80.000đ",
          reason: `Vị tiêu đen cay tê kích thích tuần hoàn máu, ăn no chắc bụng cho bữa ${mealTime}.`,
          searchKeyword: "Cơm niêu bò sốt tiêu đen",
          tags: ["Nóng hổi", "Cơm cháy", "Đậm vị"],
          calories: "~650 kcal",
          pairWith: "Canh cải thịt băm nóng",
        },
        {
          name: "Cháo Sườn Sụn Quẩy Giòn Ruốc Thịt",
          tagline: "Cháo mịn như nhung, sườn sụn giòn sần sật rắc tiêu thơm lừng",
          category: "Cháo Nóng",
          estimatedPrice: "35.000đ - 50.000đ",
          reason: "Dễ tiêu hóa, làm dịu bao tử và tiếp thêm năng lượng nhanh chóng.",
          searchKeyword: "Cháo sườn sụn",
          tags: ["Dễ nuốt", "Ấm bao tử", "Vừa túi tiền"],
          calories: "~440 kcal",
          pairWith: "Sữa hạt đậu nành nóng",
        },
      ],
      advice: `Trời ${weather.toLowerCase()}, các quán ship thường đông khách. Bạn nên đặt sớm 15 phút để đồ ăn giao tới còn nóng hổi nhé!`,
    };
  }

  if (isHot) {
    return {
      suggestions: [
        {
          name: "Bún Chả Hà Nội Than Hoa Nước Chấm Thanh",
          tagline: "Chả nướng thơm xém cạnh, nước mắm đu đủ cà rốt chua ngọt mát lành",
          category: "Bún / Món Nước Thanh",
          estimatedPrice: "45.000đ - 65.000đ",
          reason: `Nước mắm chua ngọt dịu mát, nhiều rau sống, ăn không lo ngấy trong ngày ${weather.toLowerCase()}.`,
          searchKeyword: "Bún chả Hà Nội",
          tags: ["Chua ngọt", "Thanh mát", "Nhiều rau"],
          calories: "~540 kcal",
          pairWith: "Trà tắc nha đam hoặc nước sấu ngâm",
        },
        {
          name: "Gỏi Cuốn Tôm Thịt Chấm Sốt Tương Bơ",
          tagline: "Tôm luộc đỏ au, thịt ba chỉ tươi ngon cuốn bánh tráng rau sống",
          category: "Món Cuốn",
          estimatedPrice: "35.000đ - 50.000đ",
          reason: "Rất nhẹ bụng, không dùng dầu mỡ chiên rán, giải nhiệt sảng khoái.",
          searchKeyword: "Gỏi cuốn tôm thịt",
          tags: ["Healthy", "Ít dầu mỡ", "Ăn nhẹ"],
          calories: "~380 kcal",
          pairWith: "Nước chanh tuyết hoặc sinh tố dưa hấu",
        },
        {
          name: "Cơm Gà Xé Phay Hội An Trộn Rau Răm",
          tagline: "Cơm nấu nước luộc gà vàng ươm, thịt gà ta dai ngọt trộn hành tây chua ngọt",
          category: "Cơm",
          estimatedPrice: "45.000đ - 65.000đ",
          reason: `Cơm thơm dẻo, gà bóp chua ngọt kích thích khẩu vị bữa ${mealTime}.`,
          searchKeyword: "Cơm gà Hội An",
          tags: ["Chua ngọt", "Đặc sản", "Dễ ăn"],
          calories: "~560 kcal",
          pairWith: "Trà đào chanh sả đá lạnh",
        },
      ],
      advice: `Thời tiết ${weather.toLowerCase()}, hãy chọn kèm nước giải nhiệt mát lạnh và tận dụng voucher freeship trên các app!`,
    };
  }

  // Default balanced Vietnamese specialties
  return {
    suggestions: [
      {
        name: "Cơm Tấm Sườn Bì Chả Mỡ Hành Trứng Ốp La",
        tagline: "Kinh điển món ngon Sài Gòn, thơm lừng sườn nướng than hoa mật ong",
        category: "Cơm",
        estimatedPrice: "45.000đ - 65.000đ",
        reason: `Món ăn quốc dân phù hợp mọi lúc: no chắc bụng cho bữa ${mealTime}, hương vị đậm đà và giao nhanh.`,
        searchKeyword: "Cơm tấm sườn bì chả",
        tags: ["Chắc bụng", "Giao nhanh", "Kinh điển"],
        calories: "~680 kcal",
        pairWith: "Canh khổ qua dồn thịt & trà đá hoa lài",
      },
      {
        name: "Phở Bò Tái Lăn Hà Nội Nước Trong",
        tagline: "Thịt bò xào lăn thơm mùi tỏi gừng, nước dùng ninh xương ngọt tự nhiên",
        category: "Bún / Mì / Phở",
        estimatedPrice: "50.000đ - 70.000đ",
        reason: "Hương vị thanh lịch, thơm nồng thảo mộc quế hồi, đánh thức vị giác tức thì.",
        searchKeyword: "Phở bò tái lăn",
        tags: ["Tinh hoa", "Nước dùng ngọt", "Bổ dưỡng"],
        calories: "~510 kcal",
        pairWith: "Quẩy giòn & trứng chần",
      },
      {
        name: "Nem Nướng Nha Trang Cuốn Rau Sống Sốt Tương Gan",
        tagline: "Nem nướng thơm phức xém cạnh, cuốn bánh tráng giòn và sốt chấm độc quyền",
        category: "Món Cuốn / Ăn Chơi",
        estimatedPrice: "40.000đ - 60.000đ",
        reason: `Mức giá ${budget} hợp lý, đổi vị thơm bùi vui miệng, rất hợp cho ${partySize > 1 ? `nhóm ${partySize} người` : "bữa ăn thư thái"}.`,
        searchKeyword: "Nem nướng Nha Trang",
        tags: ["Nhiều rau", "Sốt đặc biệt", "Ăn vui"],
        calories: "~490 kcal",
        pairWith: "Nước mía cốt tắc tươi mát",
      },
    ],
    advice: `Tại ${location}, bạn có thể dễ dàng tìm thấy các quán ngon này trên ShopeeFood, GrabFood hoặc Google Maps quanh đây!`,
  };
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "HomNayAnGi-Affiliate-Engine" });
});

// Direct Logo Upload API to support original image placement without alterations
app.post("/api/upload-logo", (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "Chưa có dữ liệu hình ảnh." });
    }
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    const publicLogo = path.join(process.cwd(), "public", "logo.png");
    if (fs.existsSync(path.join(process.cwd(), "public"))) {
      fs.writeFileSync(publicLogo, buffer);
    }

    const distLogo = path.join(process.cwd(), "dist", "logo.png");
    if (fs.existsSync(path.join(process.cwd(), "dist"))) {
      fs.writeFileSync(distLogo, buffer);
    }

    const srcLogo = path.join(process.cwd(), "src", "assets", "images", "logo.png");
    if (fs.existsSync(path.join(process.cwd(), "src", "assets", "images"))) {
      fs.writeFileSync(srcLogo, buffer);
    }

    return res.json({ success: true, message: "Logo đã được cập nhật thành công!" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Không thể lưu logo" });
  }
});

// Affiliate config API
app.get("/api/affiliate/config", (_req, res) => {
  res.json({
    success: true,
    config: affiliateConfig,
    stats: {
      totalClicks: clickHistory.length,
      estimatedTotalCommission: clickHistory.reduce((acc, curr) => acc + curr.estimatedCommission, 0),
      clicksByPlatform: {
        shopeefood: clickHistory.filter((c) => c.platform === "shopeefood").length,
        grabfood: clickHistory.filter((c) => c.platform === "grabfood").length,
        befood: clickHistory.filter((c) => c.platform === "befood").length,
      },
      recentClicks: clickHistory.slice(0, 15),
    },
  });
});

app.post("/api/affiliate/config", (req, res) => {
  const newConfig = req.body;
  if (newConfig && typeof newConfig === "object") {
    affiliateConfig = { ...affiliateConfig, ...newConfig };
    res.json({ success: true, config: affiliateConfig });
  } else {
    res.status(400).json({ error: "Invalid configuration object" });
  }
});

// Record affiliate link click
app.post("/api/affiliate/track-click", (req, res) => {
  const { dishId, dishName, platform, priceEstimate } = req.body;
  const price = Number(priceEstimate) || 50000;
  // Commission 5% - 7%
  const rate = affiliateConfig.averageCommissionRate / 100;
  const estimatedCommission = Math.round(price * rate);

  const event: ClickEvent = {
    id: `clk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    dishId: dishId || "unknown",
    dishName: dishName || "Món ăn ngon",
    platform: platform === "grabfood" || platform === "befood" ? platform : "shopeefood",
    timestamp: new Date().toISOString(),
    estimatedCommission,
  };

  clickHistory.unshift(event);
  if (clickHistory.length > 200) {
    clickHistory = clickHistory.slice(0, 200);
  }

  // Generate real tracked affiliate URLs with UTM and deep link schemas
  const encodedQuery = encodeURIComponent(dishName || "food");
  let redirectUrl = "";

  if (event.platform === "shopeefood") {
    // ShopeeFood affiliate link pattern
    redirectUrl = `https://shopeefood.vn/search?q=${encodedQuery}&utm_source=affiliate&utm_medium=cpa&utm_campaign=${affiliateConfig.shopeeSubId}&aff_id=${affiliateConfig.shopeeAffiliateId}`;
  } else if (event.platform === "grabfood") {
    // GrabFood deep link / web search with partner tracking
    redirectUrl = `https://food.grab.com/vn/vi/restaurants?search=${encodedQuery}&utm_source=affiliate_partner&utm_medium=${affiliateConfig.grabfoodAffiliateId}`;
  } else {
    // BeFood partner URL
    redirectUrl = `https://be.com.vn/dich-vu/be-food/?search=${encodedQuery}&ref=${affiliateConfig.befoodPartnerId}`;
  }

  res.json({
    success: true,
    trackedEvent: event,
    redirectUrl,
  });
});

// AI Food Suggestion Endpoint with Gemini Multi-Model Resilience & Contextual Fallback
app.post("/api/ai/suggest", async (req, res) => {
  const {
    mealTime = "Trưa",
    budget = "35k - 60k",
    mood = "Bình thường",
    weather = "Mát mẻ",
    cravings = "",
    location = "TP. Hồ Chí Minh",
    dietary = "Bình thường",
    partySize = 1,
  } = req.body;

  let suggestions: any[] | null = null;
  let advice = "";
  let source = "smart_curated_chef";

  try {
    const ai = getGeminiClient();

    if (ai) {
      const prompt = `Bạn là chuyên gia ẩm thực Việt Nam thông minh và am hiểu khẩu vị của ứng dụng "Hôm Nay Ăn Gì".
Nhiệm vụ: Gợi ý 3 món ăn chuẩn vị, hấp dẫn, dễ đặt trên các ứng dụng giao thức ăn (ShopeeFood, GrabFood, BeFood) tại Việt Nam dựa trên tiêu chí sau:
- Bữa ăn: ${mealTime}
- Ngân sách: ${budget}
- Tâm trạng: ${mood}
- Thời tiết: ${weather}
- Cơn thèm / Ghi chú đặc biệt: ${cravings || "Không có"}
- Địa điểm: ${location}
- Chế độ ăn: ${dietary}
- Số người: ${partySize}

Yêu cầu trả về đúng định dạng JSON:
{
  "suggestions": [
    {
      "name": "Tên món ăn hấp dẫn chuẩn quán Việt",
      "tagline": "Một câu miêu tả ngắn gọn, kích thích thèm ăn",
      "category": "Cơm | Bún/Phở | Món Cuốn | Đồ Nóng/Lẩu | Đồ Ăn Vặt | Healthy",
      "estimatedPrice": "Khoảng giá (VD: 40.000đ - 60.000đ)",
      "reason": "Lý do món này hoàn hảo cho tâm trạng và thời tiết hiện tại",
      "searchKeyword": "Từ khóa chính xác nhất để tìm kiếm quán ngon trên ShopeeFood/GrabFood (VD: Bún chả Hà Nội)",
      "tags": ["Từ khóa 1", "Từ khóa 2", "Từ khóa 3"],
      "calories": "Ước tính calo (VD: ~550 kcal)",
      "pairWith": "Món phụ hoặc nước uống khuyên gọi kèm"
    }
  ],
  "advice": "Lời khuyên vui vẻ hoặc mẹo săn mã giảm giá cho bữa ăn này"
}`;

      // Resilience: Try primary gemini-3.8-flash, fallback to gemini-flash-latest if 503/load spike occurs
      const modelsToTry = ["gemini-3.8-flash", "gemini-flash-latest"];

      for (const modelName of modelsToTry) {
        try {
          const generatePromise = ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              systemInstruction:
                "Bạn là trợ lý tư vấn món ăn Việt Nam dí dỏm, tinh tế, am hiểu khẩu vị giới trẻ và dân văn phòng.",
            },
          });

          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("AI generation timeout")), 7000)
          );

          const response = await Promise.race([generatePromise, timeoutPromise]);
          if (response && response.text) {
            const parsed = JSON.parse(response.text);
            if (Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0) {
              suggestions = parsed.suggestions;
              advice = parsed.advice || "Chúc bạn có một bữa ăn ngon miệng và nhiều niềm vui!";
              source = modelName;
              break;
            }
          }
        } catch {
          // Model temporarily unavailable (503 spike, rate limit, or timeout), try next model
        }
      }
    }
  } catch {
    // Top-level catch for resilience
  }

  // If AI generation is unavailable, smoothly serve tailored contextual Vietnamese dishes
  if (!suggestions || suggestions.length === 0) {
    const contextualFallback = getContextualDishes({
      mealTime,
      budget,
      mood,
      weather,
      cravings,
      location,
      partySize,
      dietary,
    });
    suggestions = contextualFallback.suggestions;
    advice = advice || contextualFallback.advice;
    source = "smart_curated_chef";
  }

  return res.json({
    success: true,
    source,
    suggestions,
    advice,
  });
});

async function startServer() {
  // 301 Permanent Redirects for SEO: clean flat URLs
  app.get([
    "/mon-ngon/lich-an-theo-tuan",
    "/mon-ngon/lich-an-theo-tuan/",
    "/len-lich-an",
    "/len-lich-an/",
    "/thuc-don-tuan",
    "/thuc-don-tuan/",
    "/meal-planner",
    "/meal-planner/",
  ], (_req, res) => {
    res.redirect(301, "/lich-an-theo-tuan");
  });

  app.get([
    "/kham-pha-am-thuc",
    "/kham-pha-am-thuc/",
    "/kham-pha-am-thuc/am-thuc-vung-mien",
    "/kham-pha-am-thuc/am-thuc-vung-mien/",
    "/kham-pha",
    "/kham-pha/",
    "/cam-nang",
    "/cam-nang/",
    "/cam-nang-am-thuc",
    "/cam-nang-am-thuc/",
  ], (_req, res) => {
    res.redirect(301, "/am-thuc-vung-mien");
  });

  // Regional cuisine subpaths redirects
  app.get([
    "/am-thuc-vung-mien/mien-bac",
    "/am-thuc-vung-mien/mien-bac/",
  ], (_req, res) => {
    res.redirect(301, "/am-thuc-mien-bac");
  });

  app.get([
    "/am-thuc-vung-mien/mien-trung",
    "/am-thuc-vung-mien/mien-trung/",
  ], (_req, res) => {
    res.redirect(301, "/am-thuc-mien-trung");
  });

  app.get([
    "/am-thuc-vung-mien/mien-nam",
    "/am-thuc-vung-mien/mien-nam/",
    "/am-thuc-mien-nam-sai-gon",
    "/am-thuc-mien-nam-sai-gon/",
  ], (_req, res) => {
    res.redirect(301, "/am-thuc-mien-nam");
  });

  app.get([
    "/am-thuc-vung-mien/mien-tay",
    "/am-thuc-vung-mien/mien-tay/",
    "/am-thuc-mien-tay-song-nuoc",
    "/am-thuc-mien-tay-song-nuoc/",
  ], (_req, res) => {
    res.redirect(301, "/am-thuc-mien-tay");
  });

  app.get([
    "/kham-pha-am-thuc/thuc-don-moi-ngay",
    "/kham-pha-am-thuc/thuc-don-moi-ngay/",
  ], (_req, res) => {
    res.redirect(301, "/thuc-don-moi-ngay");
  });

  app.get([
    "/kham-pha-am-thuc/cach-nau-mon-ngon",
    "/kham-pha-am-thuc/cach-nau-mon-ngon/",
  ], (_req, res) => {
    res.redirect(301, "/cach-nau-mon-ngon");
  });

  // Static SEO routes for Googlebot and search crawlers
  app.get("/robots.txt", (_req, res) => {
    const distFile = path.join(process.cwd(), "dist", "robots.txt");
    const pubFile = path.join(process.cwd(), "public", "robots.txt");
    const target = fs.existsSync(distFile) ? distFile : pubFile;
    if (fs.existsSync(target)) {
      res.type("text/plain").sendFile(target);
    } else {
      res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: https://www.angigio.com/sitemap.xml\n");
    }
  });

  app.get("/sitemap.xml", (_req, res) => {
    const distFile = path.join(process.cwd(), "dist", "sitemap.xml");
    const pubFile = path.join(process.cwd(), "public", "sitemap.xml");
    const target = fs.existsSync(distFile) ? distFile : pubFile;
    if (fs.existsSync(target)) {
      res.type("application/xml").sendFile(target);
    } else {
      res.status(404).send("Sitemap not found");
    }
  });

  // 301 Permanent Redirect for legacy nested recipe URLs to international clean root URLs (/cach-nau-mon-ngon/:slug -> /:slug)
  app.get("/cach-nau-mon-ngon/:slug", (req, res) => {
    const slug = req.params.slug;
    if (slug) {
      return res.redirect(301, `/${slug}`);
    }
    return res.redirect(301, "/cach-nau-mon-ngon");
  });

  // Comprehensive dynamic SEO routes config for server-rendered HTML meta tags
  const SEO_ROUTES_CONFIG = getAllSeoRoutes();

  function injectSeoMeta(html: string, requestedPath: string): string {
    const cleanPath = requestedPath.replace(/\/$/, "") || "/";
    const isRecipeRoute =
      cleanPath.startsWith("/cach-nau-") ||
      cleanPath.startsWith("/cach-lam-") ||
      cleanPath.startsWith("/cach-nau-mon-ngon/");
    let meta = SEO_ROUTES_CONFIG[cleanPath];

    if (!meta && cleanPath.startsWith("/cach-nau-mon-ngon/")) {
      const slug = cleanPath.replace("/cach-nau-mon-ngon/", "");
      meta = SEO_ROUTES_CONFIG[`/${slug}`];
    }

    if (!meta && (cleanPath.startsWith("/cach-nau-") || cleanPath.startsWith("/cach-lam-"))) {
      const slug = cleanPath.replace(/^\//, "");
      const normalizedName = slug
        .replace(/^cach-(?:nau|lam)-/, "")
        .split("-")
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
        .join(" ")
        .trim();
      meta = {
        path: cleanPath,
        title: `Cách Nấu ${normalizedName} Thơm Ngon Chuẩn Vị | Hôm Nay Ăn Gì`,
        description: `Hướng dẫn chi tiết từng bước nấu món ${normalizedName} thơm ngon, chuẩn vị gia đình Việt Nam: Định lượng nguyên liệu, mẹo sơ chế và bí quyết nêm nếm.`,
        keywords: `cách nấu ${normalizedName.toLowerCase()}, công thức nấu ${normalizedName.toLowerCase()}, hướng dẫn làm ${normalizedName.toLowerCase()}, món ngon mỗi ngày, ẩm thực việt nam`,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop&q=80",
        imageAlt: `Cách Nấu ${normalizedName} Thơm Ngon Chuẩn Vị`,
      };
    }

    if (!meta) {
      meta = SEO_ROUTES_CONFIG["/"];
    }
    const fullUrl = `https://www.angigio.com${meta.path === "/" ? "/" : meta.path}`;

    let updatedHtml = html
      .replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`)
      .replace(/<meta\s+name="title"\s+content=".*?"\s*\/?>/i, `<meta name="title" content="${meta.title}" />`)
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${meta.description}" />`)
      .replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${meta.keywords}" />`)
      .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${fullUrl}" />`)
      .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${meta.title}" />`)
      .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${meta.description}" />`)
      .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${fullUrl}" />`)
      .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${meta.image}" />`)
      .replace(/<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/i, `<meta property="og:image:alt" content="${meta.imageAlt}" />`)
      .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${meta.title}" />`)
      .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${meta.description}" />`)
      .replace(/<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:url" content="${fullUrl}" />`)
      .replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${meta.image}" />`);

    if (isRecipeRoute) {
      updatedHtml = updatedHtml.replace(
        /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:type" content="article" />\n    <meta property="article:published_time" content="2024-01-15T08:00:00+07:00" />\n    <meta property="article:modified_time" content="2026-09-21T00:00:00+07:00" />\n    <meta property="article:author" content="Hôm Nay Ăn Gì" />\n    <meta property="article:section" content="Món ngon" />`
      );
    }

    return updatedHtml;
  }

  const httpServer = http.createServer(app);

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true" ? { server: httpServer } : false,
      },
      appType: "spa",
    });

    // Handle HTML requests in dev mode to inject route-specific SEO meta tags
    app.use(async (req, res, next) => {
      if (
        req.method === "GET" &&
        !req.path.startsWith("/api") &&
        !req.path.startsWith("/@") &&
        !req.path.includes(".")
      ) {
        try {
          const rawHtml = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
          const transformedHtml = await vite.transformIndexHtml(req.originalUrl, rawHtml);
          const seoHtml = injectSeoMeta(transformedHtml, req.path);
          return res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).end(seoHtml);
        } catch (e) {
          return next(e);
        }
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(process.cwd(), "dist", "index.html"))
      ? path.join(process.cwd(), "dist")
      : fs.existsSync(path.join(__dirname, "index.html"))
      ? __dirname
      : path.resolve(process.cwd(), "dist");

    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        const rawHtml = fs.readFileSync(indexPath, "utf-8");
        const seoHtml = injectSeoMeta(rawHtml, req.path);
        res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).send(seoHtml);
      } else {
        res.status(404).send("Application dist index.html not found");
      }
    });
  }

  // Primary listener binds to internal port 3000 (required for reverse proxy routing in AI Studio containers)
  httpServer.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Primary port ${DEFAULT_PORT} is already in use by another process.`);
    } else {
      console.error(`Server error on primary port ${DEFAULT_PORT}:`, err);
    }
  });

  httpServer.listen(DEFAULT_PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${DEFAULT_PORT} (${isProduction ? "production" : "development"} mode)`);
  });

  // Graceful shutdown handling for container platforms (Cloud Run / Docker)
  const shutdown = () => {
    console.log("Shutting down servers gracefully...");
    try {
      httpServer.close();
    } catch {
      // ignore
    }
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
