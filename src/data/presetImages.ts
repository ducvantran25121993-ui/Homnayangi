export interface PresetFoodImage {
  name: string;
  url: string;
  category: string;
}

export const PRESET_FOOD_CATEGORIES = [
  "Tất Cả",
  "Thịt Heo",
  "Thịt Bò",
  "Thịt Gà",
  "Cá & Hải Sản",
  "Món Trứng",
  "Cơm & Xôi",
  "Bún, Phở, Mì",
  "Bánh Mì & Cuốn",
  "Lẩu, Canh & Cháo",
  "Món Chay & Rau",
  "Đồ Uống",
  "Món Ăn Vặt & Đổi Vị",
] as const;

export const PRESET_FOOD_IMAGES: PresetFoodImage[] = [
  {
    "name": "Sườn xào chua ngọt óng ánh",
    "url": "/images/suon_xao_chua_ngot.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt ba chỉ luộc cà pháo giòn rụm",
    "url": "/images/thit_luoc_ca_phao.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Gà luộc lá chanh vàng ươm",
    "url": "/images/ga_luoc_la_chanh.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Đậu hũ sốt cà chua hành hoa",
    "url": "/images/dau_hu_sot_ca_chua.jpg",
    "category": "Món Chay & Rau"
  },
  {
    "name": "Canh cua rau đay mồng tơi thanh mát",
    "url": "/images/canh_cua_rau_day.jpg",
    "category": "Lẩu, Canh & Cháo"
  },
  {
    "name": "Bánh cuốn nóng chả lụa",
    "url": "/images/banh_cuon.jpg",
    "category": "Bánh Mì & Cuốn"
  },
  {
    "name": "Bánh tráng nướng Đà Lạt",
    "url": "/images/banh_trang_nuong_da_lat.jpg",
    "category": "Bánh Mì & Cuốn"
  },
  {
    "name": "Bánh tráng trộn bò khô trứng cút",
    "url": "/images/banh_trang_tron.jpg",
    "category": "Bánh Mì & Cuốn"
  },
  {
    "name": "Bánh xèo chay nấm đậu xanh",
    "url": "/images/banh_xeo_chay.jpg",
    "category": "Bánh Mì & Cuốn"
  },
  {
    "name": "Bánh xèo miền Tây tôm thịt",
    "url": "/images/banh_xeo.jpg",
    "category": "Bánh Mì & Cuốn"
  },
  {
    "name": "Gỏi cuốn tôm thịt thanh mát",
    "url": "/images/goi_cuon.jpg",
    "category": "Bánh Mì & Cuốn"
  },
  {
    "name": "Nem lụi xứ Huế cuốn bánh tráng",
    "url": "/images/nem_lui.jpg",
    "category": "Bánh Mì & Cuốn"
  },
  {
    "name": "Nem nướng Nha Trang chấm nước sốt",
    "url": "/images/nem_nuong_nha_trang.jpg",
    "category": "Bánh Mì & Cuốn"
  },
  {
    "name": "Bánh đập mắm nêm",
    "url": "/images/banh_dap_mam_nem.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bánh mì chảo thập cẩm pate trứng",
    "url": "/images/banh_mi_chao.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bánh mì Doner Kebab",
    "url": "/images/banh_mi_kebab.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bánh mì pate truyền thống",
    "url": "/images/banh_mi_pate.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bánh mì que Hải Phòng cay tê",
    "url": "/images/banh_mi_que.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bánh mì thịt nướng sả thơm",
    "url": "/images/banh_mi_thit_nuong.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bánh mì xíu mại Đà Lạt",
    "url": "/images/banh_mi_xiu_mai.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún cá thanh nhẹ nước dùng trong",
    "url": "/images/bun_ca.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún chả giò chay giòn rụm",
    "url": "/images/bun_cha_gio_chay.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún chả Hà Nội than hoa",
    "url": "/images/bun_cha_ha_noi.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún mắm miền Tây đậm đà",
    "url": "/images/bun_mam.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún măng vịt chấm mắm gừng",
    "url": "/images/bun_mang_vit.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún mọc sườn non thanh ngọt",
    "url": "/images/bun_moc.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún ốc chuối đậu chua thanh",
    "url": "/images/bun_oc.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún riêu chay đậu hũ nấm",
    "url": "/images/bun_rieu_chay.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún Thái hải sản chua cay",
    "url": "/images/bun_thai.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún thang Hà Nội thanh tao",
    "url": "/images/bun_thang.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bún thịt nướng chả giò mè",
    "url": "/images/bun_thit_nuong.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Canh bún rau muống cua đồng",
    "url": "/images/canh_bun.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Hủ tiếu chay thanh đạm ngọt nước",
    "url": "/images/hu_tieu_chay.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Hủ tiếu gõ bình dân đậm vị",
    "url": "/images/hu_tieu_go.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Hủ tiếu Nam Vang thập cẩm",
    "url": "/images/hu_tieu_nam_vang.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Hủ tiếu sa tế nai cay thơm",
    "url": "/images/hu_tieu_sa_te_nai.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Lẩu mắm miền Tây cá tôm mực",
    "url": "/images/lau_mam_mien_tay.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Mì cay Hàn Quốc cấp độ",
    "url": "/images/mi_cay_han_quoc.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Mì hoành thánh xá xíu nước trong",
    "url": "/images/mi_hoanh_thanh.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Mì Quảng tôm thịt bánh tráng mè",
    "url": "/images/mi_quang.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Mì trộn tóp mỡ trứng lòng đào",
    "url": "/images/mi_tron_top_mo.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Mì xào giòn hải sản sốt sệt",
    "url": "/images/mi_xao_gion.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Miến lươn giòn Nghệ An",
    "url": "/images/mien_luon.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Phở chay nấm hương nước hầm rau củ",
    "url": "/images/pho_chay_nam.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Phở cuốn Hà Nội chấm mắm chua ngọt",
    "url": "/images/pho_cuon_ha_noi.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Phở sốt vang bò mềm ngậy",
    "url": "/images/pho_sot_vang.jpg",
    "category": "Bún, Phở, Mì"
  },
  {
    "name": "Bạch tuộc nướng sa tế",
    "url": "/images/bach_tuoc_nuong.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bánh canh cá lóc",
    "url": "/images/banh_canh_ca_loc.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bánh canh cua biển",
    "url": "/images/banh_canh_cua.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bánh canh ghẹ nguyên con",
    "url": "/images/banh_canh_ghe.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bánh đa cua Hải Phòng",
    "url": "/images/banh_da_cua.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bánh mì chả cá Nha Trang",
    "url": "/images/banh_mi_cha_ca.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bắp cải xào cà chua thanh nhẹ",
    "url": "/images/bap_cai_xao_ca_chua.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bầu luộc chấm kho quẹt tóp mỡ",
    "url": "/images/bau_luoc_kho_quet.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bún cá cay Hải Phòng đậm vị",
    "url": "/images/bun_ca_cay_hai_phong.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bún cá ngừ kho thơm cà",
    "url": "/images/bun_ca_ngu.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bún đậu mắm tôm mẹt đầy đủ",
    "url": "/images/bun_dau_mam_tom.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bún hải sản chua cay thập cẩm",
    "url": "/images/bun_hai_san.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bún mọc Hà Nội truyền thống",
    "url": "/images/bun_moc_ha_noi.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bún nước lèo Trà Vinh Sóc Trăng",
    "url": "/images/bun_nuoc_leo.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Bún riêu cua đồng gạch béo",
    "url": "/images/bun_rieu_cua.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cá diêu hồng hấp gừng hành",
    "url": "/images/ca_dieu_hong_hap.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cá làm món gì ngon - Cá kho tộ",
    "url": "/images/ca-lam-mon-gi-ngon.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cá lóc nướng trui rơm cuốn rau",
    "url": "/images/ca_loc_nuong_trui.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cà pháo muối dưa hấu giòn",
    "url": "/images/ca_phao_muoi_dua_hau.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cà pháo ổi xí muội chua ngọt",
    "url": "/images/ca_phao_oi_xi_muoi.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cà pháo thanh long đổi vị",
    "url": "/images/ca_phao_thanh_long.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cà phê muối xứ Huế đậm đà",
    "url": "/images/ca_phe_muoi.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cá viên chiên sốt nước mắm tỏi",
    "url": "/images/ca_vien_chien_nuoc_mam.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Canh bí xanh nấu tôm thanh mát",
    "url": "/images/canh_bi_xanh_tom.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Canh cải cúc nấu tôm tươi",
    "url": "/images/canh_cai_cuc_tom.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Canh chua cá lóc miền Tây",
    "url": "/images/canh_chua_ca_loc.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Canh cua đồng mồng tơi mướp",
    "url": "/images/canh_cua_dong.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Canh mọc nấm hương rau củ",
    "url": "/images/canh_moc_nam_huong.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Canh nghêu nấu chua thơm thì là",
    "url": "/images/canh_ngheu_nau_chua.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Canh rau dền nấu tôm ngọt lành",
    "url": "/images/canh_rau_den_tom.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Chả cá Lã Vọng Hà Nội",
    "url": "/images/cha_ca_la_vong.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Chả cá sốt cà chua đậm vị",
    "url": "/images/cha_ca_sot_ca.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cháo cá lóc hành gừng ấm bụng",
    "url": "/images/chao_ca_loc.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cơm cá kho tộ đậm đà hao cơm",
    "url": "/images/com_ca_kho_to.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cơm chiên hải sản tôm mực",
    "url": "/images/com_chien_hai_san.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Đậu hũ sốt cà chua nấm hương",
    "url": "/images/dau_hu_sot_ca_nam.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Gỏi cuốn tôm thịt chấm sốt tương",
    "url": "/images/goi_cuon_tom_thit_chuan.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Hàu nướng mỡ hành phô mai",
    "url": "/images/hau_nuong.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Hủ tiếu mực tươi giòn ngọt",
    "url": "/images/hu_tieu_muc.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Lẩu cá kèo lá giang miền Tây",
    "url": "/images/lau_ca_keo.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Lẩu Thái hải sản chua cay tomyum",
    "url": "/images/lau_thai_hai_san.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Miến cua bể xào măng",
    "url": "/images/mien_cua.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Miến xào cua bể tươi ngọt",
    "url": "/images/mien_xao_cua.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Mực một nắng nướng sa tế",
    "url": "/images/muc_mot_nang_nuong.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Mực nướng muối ớt than hoa",
    "url": "/images/muc_nuong.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Mực xào cần tây hành tây",
    "url": "/images/muc_xao_can_tay.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Nước dừa tắc giải nhiệt mùa hè",
    "url": "/images/nuoc_dua_tac.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Nước ép dưa hấu đỏ ngọt mát",
    "url": "/images/nuoc_ep_dua_hau.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Nước mía sầu riêng béo ngọt",
    "url": "/images/nuoc_mia_sau_rieng.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Nước rau muống luộc dầm sấu mát",
    "url": "/images/nuoc_rau_muong_dam_sau.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Ốc hương sốt trứng muối béo ngậy",
    "url": "/images/oc_huong_trung_muoi.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Rau cải luộc chấm trứng lòng đào",
    "url": "/images/rau_cai_luoc_trung_long_dao.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Rau muống luộc chấm tương Bần",
    "url": "/images/rau_muong_luoc_tuong_ban.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Salad cá ngừ bắp ngọt sốt mè",
    "url": "/images/salad_ca_ngu_ngo_ngot.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Salad cá ngừ rau mầm",
    "url": "/images/salad_ca_ngu.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Su hào cà rốt xào mực",
    "url": "/images/su_hao_ca_rot_muc.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Trà sữa trân châu đường đen",
    "url": "/images/tra_sua_tran_chau_duong_den.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Xoài non lắc muối tôm giòn chua",
    "url": "/images/xoai_non_lac_muoi_tom.jpg",
    "category": "Cá & Hải Sản"
  },
  {
    "name": "Cơm cháy kho quẹt giòn rụm",
    "url": "/images/com_chay_kho_quet.jpg",
    "category": "Cơm & Xôi"
  },
  {
    "name": "Cơm chiên Dương Châu lạp xưởng",
    "url": "/images/com_chien_duong_chau.jpg",
    "category": "Cơm & Xôi"
  },
  {
    "name": "Cơm niêu kho quẹt chay",
    "url": "/images/com_nieu_kho_quet_chay.jpg",
    "category": "Cơm & Xôi"
  },
  {
    "name": "Cơm tấm Sài Gòn",
    "url": "/images/com_tam.jpg",
    "category": "Cơm & Xôi"
  },
  {
    "name": "Mâm cơm gia đình ấm cúng 3 món",
    "url": "/images/mam_com_gia_dinh.jpg",
    "category": "Cơm & Xôi"
  },
  {
    "name": "Xôi chiên phồng nhân thịt băm",
    "url": "/images/xoi_chien.jpg",
    "category": "Cơm & Xôi"
  },
  {
    "name": "Xôi xéo Hà Nội hành phi mỡ gà",
    "url": "/images/xoi_xeo_ha_noi.jpg",
    "category": "Cơm & Xôi"
  },
  {
    "name": "Xôi xéo pate lạp xưởng ruốc",
    "url": "/images/xoi_pate_lap_xuong.jpg",
    "category": "Cơm & Xôi"
  },
  {
    "name": "Cacao dầm trân chú béo ngậy",
    "url": "/images/cacao_dam_tran_chau.jpg",
    "category": "Đồ Uống"
  },
  {
    "name": "Matcha latte kem sữa béo mịn",
    "url": "/images/matcha_latte_kem_sua.jpg",
    "category": "Đồ Uống"
  },
  {
    "name": "Trà chanh giã tay thơm lừng",
    "url": "/images/tra_chanh_gia_tay.jpg",
    "category": "Đồ Uống"
  },
  {
    "name": "Trà dâu tằm tuyết giải nhiệt",
    "url": "/images/tra_dau_tam_tuyet.jpg",
    "category": "Đồ Uống"
  },
  {
    "name": "Trà đào cam sả thanh mát",
    "url": "/images/tra_dao_cam_sa.jpg",
    "category": "Đồ Uống"
  },
  {
    "name": "Trà mãng cầu xiêm chua ngọt",
    "url": "/images/tra_mang_cau_xiem.jpg",
    "category": "Đồ Uống"
  },
  {
    "name": "Trà ô long sữa nướng đậm vị",
    "url": "/images/tra_o_long_sua_nuong.jpg",
    "category": "Đồ Uống"
  },
  {
    "name": "Trà sen vàng củ năng kem sữa",
    "url": "/images/tra_sen_vang.jpg",
    "category": "Đồ Uống"
  },
  {
    "name": "Canh chua chay nấm dứa đậu phụ",
    "url": "/images/canh_chua_chay.jpg",
    "category": "Lẩu, Canh & Cháo"
  },
  {
    "name": "Canh khổ qua dồn thịt thanh nhiệt",
    "url": "/images/canh_kho_qua_don_thit.jpg",
    "category": "Lẩu, Canh & Cháo"
  },
  {
    "name": "Canh mướp hương nấu lạc bùi béo",
    "url": "/images/canh_muop_huong_lac.jpg",
    "category": "Lẩu, Canh & Cháo"
  },
  {
    "name": "Cháo ếch Singapore niêu đất",
    "url": "/images/chao_ech.jpg",
    "category": "Lẩu, Canh & Cháo"
  },
  {
    "name": "Cháo lòng dồi tiết nóng hổi",
    "url": "/images/chao_long.jpg",
    "category": "Lẩu, Canh & Cháo"
  },
  {
    "name": "Cháo vịt măng tươi chấm mắm gừng",
    "url": "/images/chao_vit.jpg",
    "category": "Lẩu, Canh & Cháo"
  },
  {
    "name": "Lẩu ếch măng cay nồng ấm",
    "url": "/images/lau_ech_mang_cay.jpg",
    "category": "Lẩu, Canh & Cháo"
  },
  {
    "name": "Lẩu nấm chay thanh ngọt tự nhiên",
    "url": "/images/lau_nam_chay.jpg",
    "category": "Lẩu, Canh & Cháo"
  },
  {
    "name": "Bánh bao nhân thịt trứng cút",
    "url": "/images/banh_bao.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Bánh bèo chén miền Trung",
    "url": "/images/banh_beo.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Bánh chuối nướng cốt dừa",
    "url": "/images/banh_chuoi_nuong.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Bánh flan caramen béo mịn",
    "url": "/images/banh_flan_caramen.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Bánh khọt Vũng Tàu tôm tươi",
    "url": "/images/banh_khot.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Bánh ướt lòng gà",
    "url": "/images/banh_uot.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Bao tử hầm tiêu xanh ấm bụng",
    "url": "/images/bao_tu_ham_tieu.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Bingsu dâu tây tuyết mát lạnh",
    "url": "/images/bingsu_dau_tay.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Cải thìa xào nấm đông cô",
    "url": "/images/cai_thia_xao_nam.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Chả giò tôm thịt chiên giòn",
    "url": "/images/cha_gio.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Chè bưởi An Giang cốt dừa",
    "url": "/images/che_buoi.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Chè khúc bạch hạnh nhân thanh mát",
    "url": "/images/che_khuc_bach.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Chén mắm nhĩ chuối cau chấm đọt",
    "url": "/images/chen_mam_nhi_chuoi_cau.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Cút lộn xào me chua ngọt đậm đà",
    "url": "/images/cut_lon_xao_me.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Dê tái chanh bóp thính",
    "url": "/images/de_tai_chanh.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Dimsum há cảo xíu mại Hong Kong",
    "url": "/images/dimsum.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Dồi sụn nướng than thơm nức",
    "url": "/images/doi_sun_nuong.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Dưa chua thơm chấm muối ớt",
    "url": "/images/dua_chua_thom_muoi_ot.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Dưa giá hẹ chua ngọt giải ngấy",
    "url": "/images/dua_gia_he_quyt_duong.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Dưa leo mận hậu muối ớt",
    "url": "/images/dua_leo_man_hau.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Dưa leo nhỏ giòn chấm kho quẹt",
    "url": "/images/dua_leo_nho_xanh.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Đậu que xào tỏi giòn ngọt",
    "url": "/images/dau_que_xao_toi.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Đồ chua chè hạt sen tráng miệng",
    "url": "/images/do_chua_che_hat_sen.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Giá đỗ xào huyết heo hẹ",
    "url": "/images/gia_xao_huyet_he.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Gỏi ngó sen tôm thịt chua ngọt",
    "url": "/images/goi_ngo_sen.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Gỏi xoài xanh tôm khô chua cay",
    "url": "/images/mango_salad.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Hủ tiếu mực khô tôm tươi",
    "url": "/images/squid_noodle.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Kim chi xoài cát giòn chua ngọt",
    "url": "/images/kim_chi_xoai_cat.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Lòng nướng sa tế giòn sần sật",
    "url": "/images/long_nuong.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Mắm ớt xiêm bưởi chua thanh",
    "url": "/images/mam_ot_xiem_buoi.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Mì khô xá xíu tóp mỡ",
    "url": "/images/dry_noodles.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Món ngon bằng nồi chiên không dầu",
    "url": "/images/mon-ngon-bang-noi-chien-khong-dau.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Nấu gì hôm nay - Mâm cơm chuẩn vị",
    "url": "/images/nau-gi-hom-nay.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Nước ép cam sành đu đủ",
    "url": "/images/cam_sanh_du_du.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Ớt chuông nhồi thịt nướng",
    "url": "/images/ot_chuong_nhan_xuong.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Su su xào tỏi giòn ngọt",
    "url": "/images/su_su_xao_toi.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Sườn nướng sốt BBQ",
    "url": "/images/bbq_spareribs.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Tàu hũ trân châu đường đen cốt dừa",
    "url": "/images/tau_hu_tran_chau.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Thịt ba chỉ làm món gì ngon",
    "url": "/images/thit-ba-chi-lam-mon-gi-ngon.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Thịt băm làm món gì ngon",
    "url": "/images/thit-bam-lam-mon-gi-ngon.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Tiệc buffet nướng lẩu thịnh soạn",
    "url": "/images/buffet.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Vịt nấu chao đậm đà miền Tây",
    "url": "/images/vit_nau_chao.jpg",
    "category": "Món Ăn Vặt & Đổi Vị"
  },
  {
    "name": "Đậu hũ chiên giòn chấm mắm tôm",
    "url": "/images/dau_hu_chien_gion.jpg",
    "category": "Món Chay & Rau"
  },
  {
    "name": "Đậu hũ Tứ Xuyên cay tê nồng nàn",
    "url": "/images/dau_hu_tu_xuyen.jpg",
    "category": "Món Chay & Rau"
  },
  {
    "name": "Nước rau má đậu xanh sữa dừa",
    "url": "/images/rau_ma_dau_xanh.jpg",
    "category": "Món Chay & Rau"
  },
  {
    "name": "Rau muống xào tỏi xanh mướt",
    "url": "/images/rau_muong_xao_toi.jpg",
    "category": "Món Chay & Rau"
  },
  {
    "name": "Trứng cuộn vân mây vàng xốp",
    "url": "/images/trung_cuon_van_may.jpg",
    "category": "Món Trứng"
  },
  {
    "name": "Trứng cút lộn xào me chua ngọt",
    "url": "/images/trung_cut_lon_xao_me.jpg",
    "category": "Món Trứng"
  },
  {
    "name": "Trứng làm món gì ngon - Trứng cuộn",
    "url": "/images/trung-lam-mon-gi-ngon.jpg",
    "category": "Món Trứng"
  },
  {
    "name": "Bắp bò ngâm mắm chua ngọt",
    "url": "/images/bap_bo_ngam_mam.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bắp xào bơ tép mỡ hành",
    "url": "/images/bap_xao_bo_tep.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bê thui Cầu Mống chấm mắm nêm",
    "url": "/images/be_thui.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bò cuộn nấm kim châm nướng",
    "url": "/images/bo_cuon_nam.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bò kho bánh mì đậm đà",
    "url": "/images/bo_kho_banh_mi.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bò kho gừng sả cay ấm",
    "url": "/images/bo_kho_gung_sa.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bò né chảo gang trứng ốp",
    "url": "/images/bo_ne.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bò nhúng dấm cuốn bánh tráng",
    "url": "/images/bo_nhung_dam.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bò nướng tảng sốt trứng muối",
    "url": "/images/bo_nuong_tang_trung_muoi.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bò tơ nướng ngói thơm lừng",
    "url": "/images/bo_to_nuong_ngoi.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bò tơ nướng tảng mọng nước",
    "url": "/images/bo_to_nuong_tang.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bò xào hoa thiên lý thanh ngọt",
    "url": "/images/bo_xao_thien_ly.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bột chiên giòn trứng hành lá",
    "url": "/images/bot_chien.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bún bò Huế chay nấm đậu",
    "url": "/images/bun_bo_hue_chay.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Bún bò Huế chuẩn vị cố đô",
    "url": "/images/bun_bo_hue.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Cá bát bắp dấm thanh ngọt",
    "url": "/images/ca_bat_bo_sap_dam.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Cơm bò lúc lắc khoai tây",
    "url": "/images/com_bo_luc_lac.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Cơm niêu bò xào tiêu đen",
    "url": "/images/com_nieu_bo_tieu_den.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Cơm rang dưa bò phố cổ",
    "url": "/images/com_rang_dua_bo.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Kem bơ sầu riêng Đà Lạt",
    "url": "/images/kem_bo_da_lat.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Lẩu riêu cua bắp bò sườn sụn",
    "url": "/images/lau_rieu_cua_bap_bo.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Lòng bò xào dưa cải chua",
    "url": "/images/long_bo_xao_dua.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Mì xao bò rau cải giòn dai",
    "url": "/images/mi_xao_bo.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Nộm bò khô đu đủ bờ hồ",
    "url": "/images/nom_bo_kho.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Nui xào bò sốt cà chua",
    "url": "/images/nui_xao_bo.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Ốc hương sốt bơ tỏi thơm lừng",
    "url": "/images/oc_huong_bo_toi.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Phá lấu bò bánh mì nước cốt dừa",
    "url": "/images/pha_lau_bo.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Phở bò Hà Nội gia truyền",
    "url": "/images/pho_bo.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Phở bò tái lăn xèo xèo thơm tỏi",
    "url": "/images/pho_bo_tai_lan.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Salad rau mầm thịt bò áp chảo",
    "url": "/images/salad_rau_mam_bo.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Sinh tố bơ sữa đặc béo ngậy",
    "url": "/images/sinh_to_bo.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Thịt bò làm món gì ngon",
    "url": "/images/thit-bo-lam-mon-gi-ngon.jpg",
    "category": "Thịt Bò"
  },
  {
    "name": "Canh gà hầm hạt sen táo đỏ",
    "url": "/images/canh_ga_ham_hat_sen.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Canh kim chi thịt heo hầm",
    "url": "/images/kimchi_jjigae.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Chân gà ngâm sả tắc giòn sần sật",
    "url": "/images/chan_ga_sa_tac.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Chân gà nướng mật ong cay giòn",
    "url": "/images/chan_ga_nuong.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Chim cút quay ngũ vị da giòn",
    "url": "/images/chim_cut_quay.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Cơm gà Hội An xé phay vàng ươm",
    "url": "/images/com_ga_hoi_an.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Cơm gà nướng sốt Teriyaki",
    "url": "/images/teriyaki_chicken.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Cơm gà quay sốt mật ong",
    "url": "/images/com_ga_quay_sot_mat.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Cơm gà xối mỡ da giòn rụm",
    "url": "/images/com_ga_xoi_mo.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Gà đồi hấp lá chanh da vàng",
    "url": "/images/ga_doi_hap_la_chanh.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Gà kho gừng sả ớt ấm nồng",
    "url": "/images/ga_kho_gung_sa_ot.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Gà nướng than cơm lam Tây Bắc",
    "url": "/images/ga_nuong_com_lam.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Gà rán sốt cay Hàn Quốc",
    "url": "/images/ga_ran_sot_cay.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Lẩu gà lá é Đà Lạt",
    "url": "/images/lau_ga_la_e.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Lẩu gà ớt hiểm hầm ấm",
    "url": "/images/lau_ga_ot_hiem.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Miến gà ta truyền thống ngọt nước",
    "url": "/images/mien_ga.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Món ăn chống ngán thanh đạm",
    "url": "/images/an-gi-cho-do-ngan.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Nấm đùi gà xào húng quế thơm",
    "url": "/images/nam_dui_ga_xao_hung_que.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Phở gà ta lá chanh thanh ngọt",
    "url": "/images/pho_ga_ta.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Salad ức gà sốt Caesar",
    "url": "/images/chicken_caesar.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Sụn gà rang muối sả giòn sần sật",
    "url": "/images/sun_ga_rang_muoi.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Thịt gà nấu món gì ngon",
    "url": "/images/thit-ga-nau-mon-gi-ngon.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Xôi gà xé mỡ hành dẻo thơm",
    "url": "/images/xoi_ga.jpg",
    "category": "Thịt Gà"
  },
  {
    "name": "Bánh hỏi heo quay giòn bì",
    "url": "/images/banh_hoi_heo_quay.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Bánh mì heo quay giòn rụm",
    "url": "/images/banh_mi_heo_quay.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Bánh tráng cuốn thịt heo Đà Nẵng",
    "url": "/images/banh_trang_cuon_thit_heo_cover.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Bún sườn dọc mùng thanh mát",
    "url": "/images/bun_suon_doc_mung.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Canh măng tươi sườn heo",
    "url": "/images/canh_mang_tuoi_suon.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Canh rau ngót nấu thịt băm",
    "url": "/images/canh_rau_ngot_thit_bam.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Canh sườn hầm bí đỏ bổ dưỡng",
    "url": "/images/canh_suon_bi_do.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Cháo sườn sụn quẩy giòn",
    "url": "/images/chao_suon_sun.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Cơm chay sườn non sốt chua ngọt",
    "url": "/images/com_chay_suon_non.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Cơm sườn cay nướng than",
    "url": "/images/com_suon_cay.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Cơm tấm sườn bì chả trứng ốp",
    "url": "/images/com_tam_suon_bi_cha.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Cơm thịt kho tàu nước dừa",
    "url": "/images/com_thit_kho_tau.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Dẻ sườn heo nướng sốt BBQ",
    "url": "/images/de_suon_heo_bbq.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Giò heo chiên giòn bì sốt Thái",
    "url": "/images/gio_heo_chien_gion.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Hôm nay ăn gì với thịt heo",
    "url": "/images/hom-nay-an-gi-voi-thit-heo.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Nui giò heo hầm củ quả",
    "url": "/images/nui_gio_heo.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Sườn heo làm món gì ngon",
    "url": "/images/suon-heo-lam-mon-gi-ngon.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Sườn heo rim mặn ngọt óng ánh",
    "url": "/images/suon_heo_rim_man_ngot.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Tai heo sốt Thái giòn sần sật cay",
    "url": "/images/tai_heo_sot_thai.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt ba chỉ luộc trắng giòn",
    "url": "/images/thit_ba_chi_luoc.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt ba chỉ nướng nồi chiên giòn",
    "url": "/images/thit_ba_chi_nuong_noi_chien.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt ba chỉ rang cháy cạnh",
    "url": "/images/ba_chi_rang.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt băm sốt cà chua đậm vị",
    "url": "/images/thit_bam_sot_ca_chua.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt heo làm món gì ngon",
    "url": "/images/thit-heo-lam-mon-gi-ngon.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt heo luộc cuốn bánh tráng",
    "url": "/images/thit-heo-luoc-cuon-banh-trang.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt heo xào sả ớt cay nồng",
    "url": "/images/thit-heo-xao-sa-ot.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt heo xào sả ớt cay thơm",
    "url": "/images/thit_heo_xao_sa_ot.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt kho tàu nước dừa trứng cút",
    "url": "/images/thit_kho_tau.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt luộc cuốn bánh tráng rau rừng",
    "url": "/images/thit_luoc_cuon_banh_trang.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Thịt nạc heo làm món gì ngon",
    "url": "/images/thit-nac-heo-lam-mon-gi-ngon.jpg",
    "category": "Thịt Heo"
  },
  {
    "name": "Tôm đồng rim thịt ba chỉ đưa cơm",
    "url": "/images/tom_dong_rim_ba_chi.jpg",
    "category": "Thịt Heo"
  }
];
