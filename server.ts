import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

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
    genAIClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "HomNayAnGi-Affiliate-Engine" });
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

// AI Food Suggestion Endpoint using Gemini 3.8 Flash
app.post("/api/ai/suggest", async (req, res) => {
  try {
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

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback with rich default curated dish suggestions if no API key
      return res.json({
        success: true,
        source: "curated_fallback",
        suggestions: [
          {
            name: "Cơm Tấm Sườn Bì Chả Đặc Biệt",
            tagline: "Kinh điển món ngon Sài Gòn, nạp năng lượng trọn vẹn",
            category: "Cơm",
            estimatedPrice: "45.000đ - 65.000đ",
            reason: `Phù hợp bữa ${mealTime}, no lâu, chuẩn hương vị và dễ dàng đặt ship ngay trên ShopeeFood / GrabFood.`,
            searchKeyword: "Cơm tấm sườn bì chả",
            tags: ["Ăn chắc bụng", "Giao nhanh", "Phổ biến"],
            calories: "~680 kcal",
            pairWith: "Canh khổ qua hoặc trà đá",
          },
          {
            name: "Bún Bò Huế Chả Cua Thịt Nạm",
            tagline: "Nước dùng cay nồng thơm mùi sả ruốc, xì xụp cực đã",
            category: "Bún / Mì / Phở",
            estimatedPrice: "50.000đ - 70.000đ",
            reason: `Rất hợp với thời tiết ${weather} và tâm trạng ${mood}. Thơm lừng, kích thích vị giác.`,
            searchKeyword: "Bún bò Huế",
            tags: ["Đậm đà", "Ấm bụng", "Best-seller"],
            calories: "~580 kcal",
            pairWith: "Rau ghém bắp chuối & nước mía",
          },
          {
            name: "Bánh Mì Chảo Xíu Mại Trứng Lòng Đào",
            tagline: "Nóng hổi sốt cà đậm đà, chấm bánh mì giòn rụm",
            category: "Bánh mì / Ăn nhanh",
            estimatedPrice: "35.000đ - 55.000đ",
            reason: `Vừa vặn ngân sách ${budget}, ăn đổi vị cực ngon miệng và tiện lợi.`,
            searchKeyword: "Bánh mì chảo",
            tags: ["Tiết kiệm", "Nóng hổi", "Dễ ăn"],
            calories: "~520 kcal",
            pairWith: "Sữa đậu nành",
          },
        ],
        advice: `Gợi ý dành cho nhóm ${partySize} người tại ${location}. Hãy dùng voucher freeship trên các app để tiết kiệm thêm 20k - 30k!`,
      });
    }

    const prompt = `Bạn là chuyên gia ẩm thực Việt Nam thông minh và hài hước của ứng dụng "Hôm Nay Ăn Gì".
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

    const generatePromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Bạn là trợ lý tư vấn món ăn Việt Nam dí dỏm, tinh tế, am hiểu khẩu vị giới trẻ và dân văn phòng.",
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("AI generation timed out")), 4000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const responseText = response.text || "{}";
    const parsedData = JSON.parse(responseText);

    res.json({
      success: true,
      source: "gemini-3.8-flash",
      suggestions: parsedData.suggestions || [],
      advice: parsedData.advice || "Chúc bạn có một bữa ăn ngon miệng và tìm được deal hời!",
    });
  } catch (error: any) {
    console.warn("Gemini API spike / fallback:", error?.message || error);
    // Return high quality curated suggestions so users never face a dead-end
    const fallbackDishes = [
      {
        name: "Cơm Tấm Sườn Bì Chả Đặc Biệt",
        tagline: "Kinh điển món ngon Sài Gòn, nạp năng lượng trọn vẹn",
        category: "Cơm",
        estimatedPrice: "45.000đ - 65.000đ",
        reason: "Món ăn quốc dân chắc bụng, thơm lừng sườn nướng mật ong và mắm tỏi ớt kẹo.",
        searchKeyword: "Cơm tấm sườn bì chả",
        tags: ["Ăn chắc bụng", "Giao nhanh", "Phổ biến"],
        calories: "~680 kcal",
        pairWith: "Canh khổ qua hoặc trà đá hoa lài",
      },
      {
        name: "Bún Bò Huế Chả Cua Thịt Nạm",
        tagline: "Nước dùng cay nồng thơm mùi sả ruốc, xì xụp cực đã",
        category: "Bún / Mì / Phở",
        estimatedPrice: "50.000đ - 70.000đ",
        reason: "Hương vị sả ớt nồng ấm, giúp kích thích vị giác và đánh tan uể oải ngay tức thì.",
        searchKeyword: "Bún bò Huế",
        tags: ["Đậm đà", "Ấm bụng", "Best-seller"],
        calories: "~580 kcal",
        pairWith: "Rau ghém bắp chuối & nước mía",
      },
      {
        name: "Nem Nướng Nha Trang Cuốn Rau",
        tagline: "Nem nướng thơm lừng, chấm nước sốt tương gan thần thánh",
        category: "Món Cuốn",
        estimatedPrice: "45.000đ - 65.000đ",
        reason: "Nhiều rau xanh thanh mát, chấm sốt béo ngậy, đổi vị vừa ngon vừa không lo ngấy.",
        searchKeyword: "Nem nướng Nha Trang",
        tags: ["Thanh mát", "Nhiều rau", "Ăn vui miệng"],
        calories: "~520 kcal",
        pairWith: "Trà đào cam sả hoặc nước chanh dây",
      },
    ];

    res.json({
      success: true,
      source: "smart_curated_chef",
      suggestions: fallbackDishes,
      advice: "Mẹo nhỏ: Đặt món vào khung giờ 11h - 11h30 để đồ ăn tới nhanh nhất và kịp áp mã freeship!",
    });
  }
});

async function startServer() {
  // Static SEO routes for Googlebot and search crawlers
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml");
    res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
