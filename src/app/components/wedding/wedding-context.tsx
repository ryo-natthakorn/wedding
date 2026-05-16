import React, { createContext, useContext, useState } from "react";

export type Lang = "EN" | "TH";

export const translations = {
  EN: {
    // Ring unlock
    slide_to_open: "Slide to open",
    slide_hint: "An invitation awaits",

    // Hero
    hero_date: "22 . 11 . 26",
    invitation_pre: "You are cordially invited to celebrate",
    ampersand: "&",

    // Family intro
    family_parents_label: "Together with our families",
    family_bride_parents: "Mr. Winai & Mrs. Anong Setboonsrang",
    family_groom_parents: "Mr. Natthawut & Mrs. Ratchatana Suppasuesanguan",
    family_invite_line: "request the honour of your presence at the wedding of",
    family_bride_th: "ร.อ.หญิง ปัณทิกา เศรษฐ์บุญสร้าง",
    family_groom_th: "นาย ณัฐกร ศุภชื่อสงวน",
    family_bride_en: "Flt. Lt. Pantika Setboonsrang",
    family_groom_en: "Mr. Natthakorn Suppasuesanguan",
    family_and: "and",

    // Ceremony timeline
    timeline_label: "The Day",
    timeline_subtitle: "A celebration of love & togetherness",
    timeline_engagement_time: "16:09",
    timeline_engagement_title: "Engagement",
    timeline_engagement_desc: "An intimate ring-exchange among close family.",
    timeline_welcome_time: "17:00",
    timeline_welcome_title: "Welcome & Photos",
    timeline_welcome_desc: "Champagne arrival and polaroid moments with you.",
    timeline_celebration_time: "17:30",
    timeline_celebration_title: "Celebration",
    timeline_celebration_desc: "Dinner, music and laughter beneath the lanterns.",

    // Polaroid gallery
    gallery_label: "Our Polaroids",
    gallery_subtitle: "Little moments from us to you",
    gallery_caption_1: "the day we met",
    gallery_caption_2: "first golden hour",
    gallery_caption_3: "her yes",
    gallery_caption_4: "happiest two",
    gallery_caption_5: "forever begins",
    gallery_caption_6: "see you soon ♡",

    // Hashtag
    hashtag_label: "Share with us",
    hashtag_value: "#PNEst221126",
    hashtag_sub: "Share your memories with us",

    // Dress code
    dress_label: "Dress Code",
    dress_title: "Garden Earth Tones",
    dress_desc:
      "We invite you to dress in warm earthy tones — browns, golds and greens — to bloom alongside us in the garden.",
    dress_palette_row1: "Brown",
    dress_palette_row2: "Gold",
    dress_palette_row3: "Green",

    // Legacy (kept so older sections still render)
    together: "Together with their families",
    opening:
      "With hearts full of joy and gratitude, we warmly invite you to share in our celebration of love — a gathering among dear friends and family, in the spirit of home.",
    scroll: "Scroll",
    save_the_date: "Save the Date",
    sunday: "Sunday",
    ceremony: "Ceremony",
    reception: "Reception",
    celebration: "Celebration",
    venue_label: "Venue",
    venue_name_line1: "SailomSangdad",
    venue_name_line2: "Homey Studio",
    venue_desc:
      "A charming garden studio nestled in a cozy homey setting — the perfect backdrop for an intimate celebration of love and togetherness.",
    directions: "Get Directions",
    program_label: "Program of Events",
    program: [
      { time: "16:09", title: "Engagement", desc: "An intimate ring-exchange among close family." },
      { time: "17:00", title: "Welcome & Photos", desc: "Champagne arrival and polaroid moments with you." },
      { time: "17:30", title: "Celebration", desc: "Dinner, music and laughter beneath the lanterns." },
    ],
    countdown_label: "Counting Down To Our Special Day",
    countdown_subtitle: "We can't wait to celebrate with you",
    story_label: "Our Story",
    story_subtitle: "A love written in moments",
    story_items: [
      { year: "2020", title: "First Meeting", caption: "Two souls finding each other in the most unexpected place." },
      { year: "2022", title: "Adventures Together", caption: "Every journey became more beautiful with you by my side." },
      { year: "2024", title: "The Proposal", caption: "With a song written just for you, I asked for forever." },
      { year: "2026", title: "Forever Begins", caption: "And now we write our greatest chapter together." },
    ],
    map_label: "Finding Us",
    map_title: "SailomSangdad Homey Studio",
    map_address: "Bangkok, Thailand",
    map_note: "Please confirm the exact address upon RSVP — we will send you full directions.",
    map_btn: "Open in Google Maps",
    rsvp_label: "RSVP",
    rsvp_title: "Will You Join Us?",
    rsvp_subtitle: "Kindly reply by October 1, 2026",
    rsvp_name: "Your Full Name",
    rsvp_email: "Email Address",
    rsvp_attend: "Will you attend?",
    rsvp_yes: "Joyfully Accept",
    rsvp_no: "Regretfully Decline",
    rsvp_guests: "Number of Guests",
    rsvp_dietary: "Dietary Preferences / Notes",
    rsvp_submit: "Send RSVP",
    rsvp_thanks: "Thank you! We look forward to celebrating with you.",
    rsvp_sorry: "We will miss you dearly. Thank you for letting us know.",
    quote: '"A happy marriage is a long conversation which always seems too short."',
    quote_author: "— André Maurois",
    footer_venue: "SailomSangdad Homey Studio · November 22, 2026",
    music_label: "Our Song",
    music_title: "Pantika (Proposal Song)",
    music_note: "♪ A song written with love",
  },
  TH: {
    slide_to_open: "เลื่อนเพื่อเปิด",
    slide_hint: "การ์ดเชิญรอคุณอยู่",

    hero_date: "๒๒ . ๑๑ . ๒๖",
    invitation_pre: "ขอเชิญร่วมแบ่งปันความสุขในพิธีมงคลสมรส",
    ampersand: "&",

    family_parents_label: "พร้อมด้วยสองครอบครัว",
    family_bride_parents: "คุณพ่อวินัย & คุณแม่อนงค์ เศรษฐ์บุญสร้าง",
    family_groom_parents: "คุณพ่อณัฐวุฒิ & คุณแม่รัชตนา ศุภชื่อสงวน",
    family_invite_line: "ขอเรียนเชิญร่วมแสดงความยินดีในงานมงคลสมรส",
    family_bride_th: "ร.อ.หญิง ปัณทิกา เศรษฐ์บุญสร้าง",
    family_groom_th: "นาย ณัฐกร ศุภชื่อสงวน",
    family_bride_en: "Flt. Lt. Pantika Setboonsrang",
    family_groom_en: "Mr. Natthakorn Suppasuesanguan",
    family_and: "และ",

    timeline_label: "กำหนดการ",
    timeline_subtitle: "ร่วมเฉลิมฉลองความรักของเรา",
    timeline_engagement_time: "๑๖.๐๙",
    timeline_engagement_title: "พิธีหมั้น",
    timeline_engagement_desc: "พิธีสวมแหวนหมั้นในวงครอบครัวอย่างอบอุ่น",
    timeline_welcome_time: "๑๗.๐๐",
    timeline_welcome_title: "ต้อนรับและถ่ายภาพ",
    timeline_welcome_desc: "ถ่ายภาพร่วมกันและจิบแชมเปญต้อนรับ",
    timeline_celebration_time: "๑๗.๓๐",
    timeline_celebration_title: "งานฉลองมงคลสมรส",
    timeline_celebration_desc: "อาหาร ดนตรี และเสียงหัวเราะใต้แสงโคมไฟ",

    gallery_label: "ภาพถ่ายของเรา",
    gallery_subtitle: "ช่วงเวลาเล็กๆ จากเราถึงคุณ",
    gallery_caption_1: "วันที่เราพบกัน",
    gallery_caption_2: "แสงอ่อนๆ ครั้งแรก",
    gallery_caption_3: "คำว่า ใช่",
    gallery_caption_4: "สองคนที่มีความสุขที่สุด",
    gallery_caption_5: "นิรันดร์เริ่มต้นแล้ว",
    gallery_caption_6: "แล้วเจอกัน ♡",

    hashtag_label: "ร่วมแบ่งปันกับเรา",
    hashtag_value: "#PNEst221126",
    hashtag_sub: "แชร์ช่วงเวลาดีๆ ของวันนั้นกับเรา",

    dress_label: "การแต่งกาย",
    dress_title: "โทนสีสวนอบอุ่น",
    dress_desc:
      "ขอเชิญสวมใส่เสื้อผ้าในโทนสีอบอุ่นจากธรรมชาติ ทั้งสีน้ำตาล ทอง และเขียว เพื่อเบ่งบานไปกับเราในสวนของวันสำคัญ",
    dress_palette_row1: "น้ำตาล",
    dress_palette_row2: "ทอง",
    dress_palette_row3: "เขียว",

    together: "พร้อมด้วยสองครอบครัว",
    opening:
      "ด้วยใจที่เปี่ยมล้นด้วยความสุขและความซาบซึ้ง เราขอเชิญคุณมาร่วมเฉลิมฉลองความรักของเรา — การรวมตัวของเพื่อนสนิทและครอบครัวในบรรยากาศอบอุ่นเสมือนบ้าน",
    scroll: "เลื่อน",
    save_the_date: "จดวันสำคัญไว้ในใจ",
    sunday: "วันอาทิตย์",
    ceremony: "พิธีมงคลสมรส",
    reception: "งานรับรอง",
    celebration: "งานเฉลิมฉลอง",
    venue_label: "สถานที่จัดงาน",
    venue_name_line1: "สายลมสังแดด",
    venue_name_line2: "โฮมมี่ สตูดิโอ",
    venue_desc:
      "สตูดิโอสวนที่เงียบสงบและอบอุ่น — ฉากหลังที่สมบูรณ์แบบสำหรับการเฉลิมฉลองความรักอย่างเป็นส่วนตัว",
    directions: "ดูเส้นทาง",
    program_label: "กำหนดการงาน",
    program: [
      { time: "16:09", title: "พิธีหมั้น", desc: "พิธีสวมแหวนในวงครอบครัวอย่างอบอุ่น" },
      { time: "17:00", title: "ต้อนรับและถ่ายภาพ", desc: "ถ่ายภาพร่วมกันและจิบแชมเปญต้อนรับ" },
      { time: "17:30", title: "งานฉลองมงคลสมรส", desc: "อาหาร ดนตรี และเสียงหัวเราะใต้แสงโคมไฟ" },
    ],
    countdown_label: "นับถอยหลังสู่วันพิเศษของเรา",
    countdown_subtitle: "เราตั้งตารอที่จะได้เฉลิมฉลองร่วมกับคุณ",
    story_label: "เรื่องราวของเรา",
    story_subtitle: "ความรักที่เขียนขึ้นจากทุกช่วงเวลา",
    story_items: [
      { year: "2020", title: "การพบกันครั้งแรก", caption: "สองดวงวิญญาณที่ค้นพบกันในสถานที่ที่ไม่คาดคิด" },
      { year: "2022", title: "การผจญภัยร่วมกัน", caption: "ทุกการเดินทางสวยงามยิ่งขึ้นเมื่อมีคุณอยู่เคียงข้าง" },
      { year: "2024", title: "การขอแต่งงาน", caption: "ด้วยเพลงที่เขียนขึ้นเพื่อคุณโดยเฉพาะ ฉันขอมอบชีวิตทั้งชีวิต" },
      { year: "2026", title: "จุดเริ่มต้นของนิรันดร์", caption: "และตอนนี้เราจะเขียนบทที่ยิ่งใหญ่ที่สุดด้วยกัน" },
    ],
    map_label: "เส้นทางมาหาเรา",
    map_title: "สายลมสังแดด โฮมมี่ สตูดิโอ",
    map_address: "กรุงเทพมหานคร, ประเทศไทย",
    map_note: "กรุณายืนยันที่อยู่ที่แน่นอนเมื่อตอบรับคำเชิญ — เราจะส่งเส้นทางเดินทางให้คุณ",
    map_btn: "เปิดใน Google Maps",
    rsvp_label: "ตอบรับคำเชิญ",
    rsvp_title: "คุณจะมาร่วมงานกับเราไหม?",
    rsvp_subtitle: "กรุณาตอบรับภายใน 1 ตุลาคม 2569",
    rsvp_name: "ชื่อ-นามสกุล",
    rsvp_email: "อีเมลของคุณ",
    rsvp_attend: "คุณจะมาร่วมงานหรือไม่?",
    rsvp_yes: "ยินดีตอบรับ",
    rsvp_no: "ขอแสดงความเสียใจที่ไม่สะดวก",
    rsvp_guests: "จำนวนผู้เข้าร่วม",
    rsvp_dietary: "อาหารที่แพ้หรือหมายเหตุเพิ่มเติม",
    rsvp_submit: "ส่งการตอบรับ",
    rsvp_thanks: "ขอบคุณมาก! เราตื่นเต้นที่จะได้เจอคุณในวันนั้น",
    rsvp_sorry: "เราจะคิดถึงคุณมาก ขอบคุณที่แจ้งให้เราทราบ",
    quote: '"การแต่งงานที่มีความสุขคือบทสนทนายาวนานที่ดูเหมือนสั้นเกินไปเสมอ"',
    quote_author: "— André Maurois",
    footer_venue: "สายลมสังแดด โฮมมี่ สตูดิโอ · ๒๒ พฤศจิกายน ๒๕๖๙",
    music_label: "เพลงของเรา",
    music_title: "Pantika (เพลงขอแต่งงาน)",
    music_note: "♪ เพลงที่เขียนด้วยความรัก",
  },
};

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.EN;
}>({
  lang: "EN",
  setLang: () => {},
  t: translations.EN,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
