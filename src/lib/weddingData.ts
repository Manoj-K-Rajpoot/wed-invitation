export interface EventItinerary {
  id: string;
  title: string;
  subtitle: string;
  hindiTitle: string;
  date: string;
  hindiDate: string;
  time: string;
  timeTagline: string;
  venue: string;
  subVenue: string;
  dressCode: string;
  colorPalette: { name: string; hex: string }[];
  recommendedAttire: {
    men: string;
    women: string;
  };
  description: string;
  iconName: string;
  bgGradient: string;
}

export interface StoryChapter {
  id: number;
  chapterNumber: string;
  title: string;
  year: string;
  location: string;
  story: string;
  quote: string;
  icon: string;
}

export const WEDDING_DATA = {
  couple: {
    groom: {
      name: "Sajal",
      hindiName: "सजल",
      fullName: "Sajal Singhania",
      hindiFullName: "सजल सिंघानिया",
      sonOf: "Smt. Sunita & Shri Rajesh Singhania",
      hindiSonOf: "श्रीमती सुनीता एवं श्री राजेश सिंघानिया",
      grandsonOf: "Late Smt. Kamla & Late Shri Om Prakash Singhania",
      hindiGrandsonOf: "स्व. श्रीमती कमला देवी एवं स्व. श्री ओम प्रकाश सिंघानिया",
      bio: "Tech Entrepreneur & Adventurer",
    },
    bride: {
      name: "Aaradhya",
      hindiName: "आराध्या",
      fullName: "Aaradhya Sharma",
      hindiFullName: "आराध्या शर्मा",
      daughterOf: "Smt. Rekha & Dr. Devendra Sharma",
      hindiDaughterOf: "श्रीमती रेखा एवं डॉ. देवेंद्र शर्मा",
      granddaughterOf: "Smt. Shanti & Shri Harish Chandra Sharma",
      hindiGranddaughterOf: "श्रीमती शांति देवी एवं श्री हरीश चंद्र शर्मा",
      bio: "Architect & Classical Dancer",
    },
    hashtag: "#SajalWedsAaradhya",
    monogram: "S & A",
    saveTheDate: "December 14, 2026",
    weddingTimestamp: "2026-12-14T17:00:00+05:30",
  },
  
  venue: {
    name: "The Oberoi Udaivilas",
    hindiName: "द ओबेरॉय उदयविलास",
    city: "Udaipur, Rajasthan",
    hindiCity: "उदयपुर, राजस्थान",
    address: "Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001",
    googleMapsUrl: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
    appleMapsUrl: "https://maps.apple.com/?q=The+Oberoi+Udaivilas+Udaipur",
    embedCoordinates: {
      lat: 24.5779,
      lng: 73.6738,
    },
    airportInfo: "Maharana Pratap Airport (UDR) is 28 km away (approx. 45 mins). Dedicated wedding chauffeured luxury coaches will be available upon arrival.",
    conciergeContact: "+91 98765 43210",
    whatsappNumber: "919876543210",
  },

  shlokas: [
    {
      sanskrit: "॥ ॐ श्री गणेशाय नमः ॥",
      hindi: "श्री गणेशाय नमः",
      translation: "Salutations to Lord Ganesha, the Remover of all Obstacles.",
    },
    {
      sanskrit: "मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः।\nमंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥",
      hindi: "भगवान श्री हरि विष्णु और देवी लक्ष्मी का पावन आशीर्वाद इस मांगलिक गठबंधन पर सदैव बना रहे।",
      translation: "May the divine grace of the almighty bestow eternal happiness, peace, and auspicious blessings on this holy union.",
    },
    {
      sanskrit: "यदेतद्धृदयं तव तदस्तु हृदयं मम।\nयदिदं हृदयं मम तदस्तु हृदयं तव॥",
      hindi: "“जो हृदय तुम्हारा है, वह मेरा हो, और जो हृदय मेरा है, वह तुम्हारा हो।” — ऋग्वैदिक पावन वचन",
      translation: "“May your heart be mine, and my heart be yours forever.” — Sacred Rigvedic Vow",
    }
  ],

  hindiPatrika: {
    heading: "शुभ विवाह पत्रिका",
    subheading: "परम पिता परमात्मा की असीम अनुकंपा से",
    invitationNote: "मान्यवर, हमारे प्रिय पुत्र एवं पुत्री के शुभ परिणय संस्कार के इस पावन अवसर पर आपकी गरिमामयी उपस्थिति एवं स्नेहपूर्ण शुभाशीर्वाद सादर प्रार्थनीय है।",
    darshanaAbhilashi: "समस्त सिंघानिया एवं शर्मा परिवार",
    swagatKarta: "विनीत: राजेश सिंघानिया, डॉ. देवेंद्र शर्मा एवं परिजन",
  },

  ourStory: [
    {
      id: 1,
      chapterNumber: "Chapter 01",
      title: "The Serendipitous Meeting",
      year: "Autumn 2023",
      location: "Lake Pichola, Udaipur",
      story: "A warm autumn evening by the ghats of Udaipur brought two wandering souls together. What began as a spontaneous conversation over saffron kulhad chai turned into hours of laughter under the moonlit sky.",
      quote: "“In a city of lakes and royal palaces, we discovered a love as vast as the horizon.”",
      icon: "Sparkles",
    },
    {
      id: 2,
      chapterNumber: "Chapter 02",
      title: "The Symphony of Hearts",
      year: "Spring 2024",
      location: "The Golden Meadows",
      story: "Countless shared sunrises, playlist exchanges, and heartfelt conversations revealed that every dream, value, and rhythm of our lives was meant to be shared together.",
      quote: "“With every passing season, understanding blossomed into an unspoken, unbreakable bond.”",
      icon: "HeartHandshake",
    },
    {
      id: 3,
      chapterNumber: "Chapter 03",
      title: "The Royal Promise",
      year: "Winter 2025",
      location: "Jagmandir Island Palace",
      story: "Under a canopy of fairy lights, gentle royal sitar melodies, and floating diyas, Sajal went down on one knee. With tears of joy and hearts beating as one, Aaradhya said YES!",
      quote: "“Two souls, one sacred path, and a promise for seven lifetimes.”",
      icon: "Gem",
    },
  ] as StoryChapter[],

  itinerary: [
    {
      id: "mehndi",
      title: "Ganesh Sthapana & Mehendi",
      subtitle: "Colors, Henna & Folk Beats",
      hindiTitle: "गणेश स्थापना एवं मेहंदी उत्सव",
      date: "Saturday, 12 December 2026",
      hindiDate: "शनिवार, १२ दिसंबर २०२६",
      time: "03:30 PM Onwards",
      timeTagline: "As the afternoon golden sun shines",
      venue: "The Oberoi Udaivilas",
      subVenue: "The Courtyard of Fountains",
      dressCode: "Bright Indian Florals & Mehendi Greens",
      colorPalette: [
        { name: "Mehendi Green", hex: "#2E7D32" },
        { name: "Lime Glow", hex: "#7CB342" },
        { name: "Mustard Gold", hex: "#FBC02D" },
        { name: "Blush Peach", hex: "#FFAB91" },
      ],
      recommendedAttire: {
        men: "Printed Silk Kurta, Nehru Jacket & Dhoti / Churidar",
        women: "Floral Georgette Lehenga, Sharara or Chanderi Anarkali",
      },
      description: "An auspicious invocation to Lord Ganesha followed by vibrant henna application, colorful dupattas, folk ghumar dancers, and delectable street delicacies of Rajasthan.",
      iconName: "Feather",
      bgGradient: "from-emerald-900/90 via-teal-950/95 to-amber-950/90",
    },
    {
      id: "haldi",
      title: "Haldi & Phoolon Ki Holi",
      subtitle: "Golden Glow & Floral Shower",
      hindiTitle: "हल्दी रस्म एवं फूलों की होली",
      date: "Sunday, 13 December 2026",
      hindiDate: "रविवार, १३ दिसंबर २०२६",
      time: "10:30 AM Onwards",
      timeTagline: "In the cheerful morning radiance",
      venue: "The Oberoi Udaivilas",
      subVenue: "The Lakeside Lawns",
      dressCode: "Sunny Yellows, Mustards & Pastel Whites",
      colorPalette: [
        { name: "Turmeric Yellow", hex: "#F57F17" },
        { name: "Marigold Gold", hex: "#FFA000" },
        { name: "Ivory Silk", hex: "#FFF8E1" },
        { name: "Rose Petal", hex: "#F48FB1" },
      ],
      recommendedAttire: {
        men: "Yellow Cotton/Linen Kurta Pajama with Saffron Scarf",
        women: "Yellow Organza Saree, Yellow/White Chiffon Lehenga with Floral Jewelry",
      },
      description: "Infusing the bride and groom with fragrant turmeric paste, sandalwood, and a fragrant shower of thousands of fresh rose and marigold petals accompanied by dhol beats.",
      iconName: "Sun",
      bgGradient: "from-amber-900/90 via-yellow-950/95 to-orange-950/90",
    },
    {
      id: "sangeet",
      title: "Sangeet & Cocktail Soirée",
      subtitle: "Glamour, Glitz & Melodies",
      hindiTitle: "संगीत संध्या एवं कॉकटेल पार्टी",
      date: "Sunday, 13 December 2026",
      hindiDate: "रविवार, १३ दिसंबर २०२६",
      time: "07:30 PM Onwards",
      timeTagline: "Underneath the star-studded twilight",
      venue: "The Oberoi Udaivilas",
      subVenue: "The Royal Ballroom & Pool Terrace",
      dressCode: "Indo-Western Tuxedos & Shimmering Lehengas",
      colorPalette: [
        { name: "Midnight Royal Blue", hex: "#1A237E" },
        { name: "Emerald Glitz", hex: "#004D40" },
        { name: "Champagne Gold", hex: "#D4AF37" },
        { name: "Obsidian Black", hex: "#212121" },
      ],
      recommendedAttire: {
        men: "Velvet Bandhgala Suit, Tuxedo or Modern Indo-Western Sherwani",
        women: "Sequin Embroidered Lehenga, Saree Gown or Glamorous Evening Dress",
      },
      description: "An unforgettable evening of high-energy family dance face-offs, live Bollywood acoustic band, signature royal cocktails, and non-stop celebration until the midnight stars.",
      iconName: "Music",
      bgGradient: "from-indigo-950/90 via-purple-950/95 to-slate-950/90",
    },
    {
      id: "wedding",
      title: "The Baraat, Varmala & Pheras",
      subtitle: "The Sacred Royal Wedding",
      hindiTitle: "शुभ विवाह (बारात, वरमाला एवं फेरे)",
      date: "Monday, 14 December 2026",
      hindiDate: "सोमवार, १४ दिसंबर २०२६",
      time: "04:30 PM Baraat | 06:00 PM Pheras",
      timeTagline: "As the auspicious twilight sets",
      venue: "The Oberoi Udaivilas",
      subVenue: "The Grand Mandap by Lake Pichola",
      dressCode: "Royal Traditional Indian (Ivory, Gold & Deep Crimson)",
      colorPalette: [
        { name: "Royal Crimson", hex: "#880E4F" },
        { name: "Imperial Gold", hex: "#C59B27" },
        { name: "Raw Silk Ivory", hex: "#FFFDE7" },
        { name: "Rani Pink", hex: "#AD1457" },
      ],
      recommendedAttire: {
        men: "Regal Embroidered Sherwani, Royal Safa (Turban) with Kalgi & Mojris",
        women: "Traditional Zardozi Bridal Lehenga, Banarasi/Kanjivaram Silk Saree with Royal Jewelry",
      },
      description: "The grand royal procession with elephants and brass band, followed by the enchanting Varmala ceremony, sacred Vedic pheras around the holy fire, and eternal vows.",
      iconName: "Flame",
      bgGradient: "from-red-950/95 via-rose-950/95 to-amber-950/90",
    },
    {
      id: "reception",
      title: "The Grand Royal Reception",
      subtitle: "Feast, Blessings & Toast",
      hindiTitle: "शाही प्रतिभोज (रिसेप्शन)",
      date: "Monday, 14 December 2026",
      hindiDate: "सोमवार, १४ दिसंबर २०२६",
      time: "08:30 PM Onwards",
      timeTagline: "A celebration of eternal love",
      venue: "The Oberoi Udaivilas",
      subVenue: "The Maharana Palace Promenade",
      dressCode: "Royal Black Tie & Regal Silk Sarees",
      colorPalette: [
        { name: "Deep Wine", hex: "#4A148C" },
        { name: "Antique Bronze", hex: "#8D6E63" },
        { name: "Warm Gold", hex: "#E5C158" },
        { name: "Classic Tux Black", hex: "#1A1A1A" },
      ],
      recommendedAttire: {
        men: "Classic Black Tie Tuxedo or Royal Jodhpuri Bandhgala",
        women: "Couture Evening Gown, Royal Tissue Saree or Contemporary Cape Lehenga",
      },
      description: "An opulent gala dinner with global gourmet culinary stations, sufi musical symphonies, congratulatory toasts, and royal family reception.",
      iconName: "Wine",
      bgGradient: "from-stone-950/95 via-amber-950/90 to-red-950/95",
    },
  ] as EventItinerary[],
};
