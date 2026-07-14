// Comprehensive product dataset for The sewcreative

export const CATEGORIES = [
  {
    id: "embroidery-hoop",
    name: "Embroidery Hoop",
    image: "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop",
    description: "Finely hand-stitched floral and portrait hoops using premium threads and soft organic linen, framed in refined organic bamboo hoops.",
    subcategories: ["Couple Hoop", "Baby Hoop", "Family Hoop", "Wedding Hoop", "Anniversary Hoop"]
  },
  {
    id: "resin-art",
    name: "Resin Art",
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=800&auto=format&fit=crop",
    description: "Glossy, high-end crystal-clear epoxy resin creations layered with delicate gold foil, real dried petals, and custom hand-painted details.",
    subcategories: ["Earrings", "Bookmark", "Puja Thali", "Keychain", "Rakhi", "Name Plate", "Photo Frame", "Wall Frame", "Clock", "Coaster"]
  },
  {
    id: "flower-bouquet",
    name: "Pipe Cleaner Flower Bouquet",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
    description: "Whimsical, soft-textured forever bouquets crafted meticulously from premium pipe cleaners. Perfect for everlasting displays.",
    subcategories: ["Rose Bouquet", "Tulip Bouquet", "Sunflower Bouquet", "Mixed Flower Bouquet", "Custom Bouquet"]
  },
  {
    id: "gift-hampers",
    name: "Gift Hampers",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    description: "Exquisite hand-packed luxury boxes filled with premium treats, personalized keepsakes, dried flowers, and hand-written letters.",
    subcategories: ["Birthday Gift Box", "Anniversary Box", "Wedding Box", "Baby Shower Box", "Personalized Gifts"]
  },
  {
    id: "personalized-gifts",
    name: "Personalized Frames & Keepsakes",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    description: "Timeless custom home decor, custom LED lamps, couples frames, and musical Spotify frame integrations.",
    subcategories: ["Name Frame", "Couple Frame", "Spotify Frame", "LED Frame", "Name Keychain"]
  }
];

export const PRODUCTS = [
  // 1. Embroidery Hoops
  {
    id: "hoop-couple",
    name: "Premium Couple Portrait Embroidery Hoop",
    category: "embroidery-hoop",
    subcategory: "Couple Hoop",
    price: 2499,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Capture love eternally with a premium hand-embroidered couple portrait. Custom stitched onto pure European linen using high-grade French DMC cotton threads. Enclosed in a polished bamboo frame with luxury velvet backing.",
    features: [
      "100% hand-stitched with premium French DMC threads",
      "High-grade organic linen cloth backing",
      "Elegantly polished beechwood/bamboo hoop",
      "Fully customized portraits based on your photo upload"
    ],
    colors: ["Blush Pink", "Soft Lavender", "Pure White", "Sage Green"],
    materials: ["Linen", "Bamboo", "DMC Cotton Thread"],
    estimatedDelivery: "7-10 working days",
    customizationFields: [
      { name: "partner1", label: "Partner Name 1", type: "text", placeholder: "e.g. Aarav", required: true },
      { name: "partner2", label: "Partner Name 2", type: "text", placeholder: "e.g. Ishita", required: true },
      { name: "anniversaryDate", label: "Anniversary / Special Date", type: "date", required: false },
      { name: "specialMessage", label: "Custom Message (Bottom text)", type: "text", placeholder: "e.g. Together Forever", required: false }
    ]
  },
  {
    id: "hoop-baby",
    name: "Whimsical Baby Announcement Embroidery Hoop",
    category: "embroidery-hoop",
    subcategory: "Baby Hoop",
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 96,
    images: [
      "https://images.unsplash.com/photo-1522850959074-322f1f3b0211?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A beautiful nursery wall keepsake capturing the baby's birth details: name, weight, birth date, and time, surrounded by delicate hand-stitched floral borders or sleeping animals.",
    features: [
      "Custom pastel floral and animal embroidery patterns",
      "Stitched birth statistics (Date, Time, Weight, Place)",
      "Safe, eco-friendly organic cotton canvas background"
    ],
    colors: ["Baby Pink", "Powder Blue", "Light Peach", "Mint Green"],
    materials: ["Cotton Canvas", "Bamboo Hoop", "Cotton Thread"],
    estimatedDelivery: "6-8 working days",
    customizationFields: [
      { name: "babyName", label: "Baby's Full Name", type: "text", placeholder: "e.g. Kiara Sharma", required: true },
      { name: "birthDate", label: "Birth Date", type: "date", required: true },
      { name: "birthTime", label: "Birth Time (optional)", type: "text", placeholder: "e.g. 09:45 AM", required: false },
      { name: "birthWeight", label: "Birth Weight / Height (optional)", type: "text", placeholder: "e.g. 3.2 kg, 48 cm", required: false }
    ]
  },
  {
    id: "hoop-wedding",
    name: "Luxury Royal Wedding Garland Embroidery Hoop",
    category: "embroidery-hoop",
    subcategory: "Wedding Hoop",
    price: 2999,
    originalPrice: 3999,
    rating: 5.0,
    reviewCount: 188,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Commemorate the big day with this royal garland floral hoop. Featuring dense three-dimensional embroidered wedding garlands, luxury gold thread detailing, and customized bridal names.",
    features: [
      "Heavy premium 3D hand embroidery stitches",
      "Metallic golden thread highlights for a royal touch",
      "Velvet hanging loop and high-grade wooden frame"
    ],
    colors: ["Crimson Red & Gold", "Pastel Pink & Gold", "Lavender & Gold", "Emerald & Gold"],
    materials: ["Satin Silk Cloth", "Polished Walnut Hoop", "Silk Threads"],
    estimatedDelivery: "9-12 working days",
    customizationFields: [
      { name: "brideName", label: "Bride's Name", type: "text", placeholder: "e.g. Ananya", required: true },
      { name: "groomName", label: "Groom's Name", type: "text", placeholder: "e.g. Kabir", required: true },
      { name: "weddingDate", label: "Wedding Date", type: "date", required: true },
      { name: "customQuote", label: "Wedding Vow / Short Quote", type: "text", placeholder: "e.g. Two souls, one heartbeat", required: false }
    ]
  },

  // 2. Resin Art
  {
    id: "resin-earrings",
    name: "Gilded Botanicals Dried Flower Resin Earrings",
    category: "resin-art",
    subcategory: "Earrings",
    price: 499,
    originalPrice: 799,
    rating: 4.7,
    reviewCount: 220,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Aesthetic drop earrings embedding genuine hand-pressed dried baby's breath and lavender petals. Layered with gold leaf flakes in eco-friendly UV-stable resin and Hypoallergenic 24k gold-plated brass hooks.",
    features: [
      "Contains authentic hand-pressed dried flowers",
      "Hypoallergenic 24K gold plated earring hooks",
      "Crystal clear, lightweight UV-resistant epoxy resin"
    ],
    colors: ["Gold Foil", "Silver Foil", "Rose Gold Foil"],
    materials: ["Epoxy Resin", "Dried Flowers", "24K Gold Plated Brass"],
    estimatedDelivery: "3-5 working days",
    customizationFields: [
      { name: "flowerType", label: "Flower Petal Choice", type: "text", placeholder: "e.g. Red Rose, Yellow Marigold, Blue Hydrangea", required: false }
    ]
  },
  {
    id: "resin-bookmark",
    name: "Luxury Personalized Dried Flower Resin Bookmark",
    category: "resin-art",
    subcategory: "Bookmark",
    price: 349,
    originalPrice: 499,
    rating: 4.9,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Elevate your reading rituals. Custom bookmarks cast with elegant metallic flakes, dried ferns, and your name in cursive gold lettering, finished with a matching silk tassel.",
    features: [
      "Custom name script in high-definition luxury gold font",
      "Matching silk tassel attached to each bookmark",
      "Slim, highly durable, flexible resin structure"
    ],
    colors: ["Gold & Rose Petals", "Silver & Forget-Me-Not", "Rose Gold & Baby's Breath"],
    materials: ["Resin", "Gold Leaf", "Real Pressed Flowers", "Silk Tassel"],
    estimatedDelivery: "4-6 working days",
    customizationFields: [
      { name: "bookmarkName", label: "Custom Name on Bookmark", type: "text", placeholder: "e.g. Shruti", required: true },
      { name: "quote", label: "Inspirational Quote / Text (optional)", type: "text", placeholder: "e.g. Just one more chapter...", required: false }
    ]
  },
  {
    id: "resin-thali",
    name: "Ethereal Pearl & Gold Resin Puja Thali Set",
    category: "resin-art",
    subcategory: "Puja Thali",
    price: 1899,
    originalPrice: 2799,
    rating: 4.9,
    reviewCount: 75,
    images: [
      "https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Make festive prayers magical. An elegant, custom-molded epoxy puja thali set featuring pearlescent white waves, rich gold border rings, small matching katoris, and a custom diya holder.",
    features: [
      "Includes 1 Thali, 2 matching Katoris, and 1 matching Diya",
      "Stain-resistant and heat-resistant resin formulation",
      "Luxurious pearlescent texture with heavy gold leaf rimming"
    ],
    colors: ["Pearl White & Gold", "Crimson Red & Gold", "Royal Teal & Gold"],
    materials: ["Heat-resistant Resin", "Pearl Pigment", "Acrylic Gilded Handles"],
    estimatedDelivery: "6-9 working days",
    customizationFields: [
      { name: "familySurname", label: "Family Name / Inscription (Center)", type: "text", placeholder: "e.g. Sharma Family / Shubh Labh", required: false }
    ]
  },
  {
    id: "resin-nameplate",
    name: "Modern Geode Luxury Resin House Name Plate",
    category: "resin-art",
    subcategory: "Name Plate",
    price: 3499,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 64,
    images: [
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Welcome guests with a striking geode-style resin house nameplate. Cast with real crystal quartz clusters, heavy glitter veins, and dynamic layered pigments. Fitted with durable outdoor-ready mounting studs.",
    features: [
      "Waterproof, weatherproof, and UV-stabilized coating",
      "Stunning 3D geode edge with shimmering gold leaf highlights",
      "3D acrylic gold mirror lettering for names and house numbers"
    ],
    colors: ["Emerald Geode & Gold", "Black Obsidian & Silver", "Blush Quartz & Gold"],
    materials: ["MDF base", "UV-stabilized resin", "Mirror Acrylic", "Quartz Crystals"],
    estimatedDelivery: "10-14 working days",
    customizationFields: [
      { name: "houseNumber", label: "House Number / Flat No.", type: "text", placeholder: "e.g. Villa 24B", required: true },
      { name: "familyNames", label: "Names to display", type: "textarea", placeholder: "e.g. The Sens\nRohit & Priyanka", required: true },
      { name: "baseTheme", label: "Custom Theme Instructions", type: "text", placeholder: "e.g. Emerald with golden lines and white lettering", required: false }
    ]
  },

  // 3. Pipe Cleaner Flower Bouquets
  {
    id: "bouquet-rose",
    name: "Luxury Eternal Rose Pipe Cleaner Bouquet",
    category: "flower-bouquet",
    subcategory: "Rose Bouquet",
    price: 1199,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 154,
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A gorgeous bouquet of deep red and pink everlasting roses hand-twisted from premium velvet-textured chenille pipe cleaners. Wrapped in aesthetic Korean double-faced paper with a custom gold letter seal.",
    features: [
      "Hand-crafted velvet chenille roses that never wilt",
      "Wrapped in premium luxury Korean wrapping sheets",
      "Includes an elegant decorative LED string light insert"
    ],
    colors: ["Classic Crimson Red", "Blush Pink & White", "Ethereal Pastel Lavender", "Royal Velvet Blue"],
    materials: ["Plush Chenille", "Florist Wrapping Paper", "LED Lights"],
    estimatedDelivery: "4-6 working days",
    customizationFields: [
      { name: "cardMsg", label: "Message on Gift Card", type: "textarea", placeholder: "e.g. Happy Birthday my love! You shine brighter than any star...", required: false },
      { name: "wrapColor", label: "Wrapping Paper Color Choice", type: "text", placeholder: "e.g. Dusty Pink and Matte White", required: false }
    ]
  },
  {
    id: "bouquet-tulip",
    name: "Charming Pastel Tulip Chenille Bouquet",
    category: "flower-bouquet",
    subcategory: "Tulip Bouquet",
    price: 999,
    originalPrice: 1499,
    rating: 4.8,
    reviewCount: 112,
    images: [
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Cute, modern, Pinterest-aesthetic tulip bouquet. Handcrafted with high-density pastel chenille stems, detailed green leaves, and elegant mesh wrapping. Perfect for bedroom desks and dining table decor.",
    features: [
      "Extremely soft texture with high-density plush wire",
      "Vibrant long-lasting pastel color pigments",
      "Includes a premium paper shopping carry bag"
    ],
    colors: ["Sunrise Yellow & Orange", "Baby Pink & Cream", "Soft Lavender & Mint"],
    materials: ["Premium Chenille Stems", "Satin Ribbon", "Aesthetic Mesh Wrapper"],
    estimatedDelivery: "4-6 working days",
    customizationFields: [
      { name: "cardMsg", label: "Gift Message", type: "text", placeholder: "e.g. Congratulations on your graduation!", required: false }
    ]
  },

  // 4. Gift Hampers
  {
    id: "hamper-birthday",
    name: "Royal Celebration Personalized Birthday Hamper",
    category: "gift-hampers",
    subcategory: "Birthday Gift Box",
    price: 3999,
    originalPrice: 5499,
    rating: 5.0,
    reviewCount: 88,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Give them the ultimate birthday pampering. A premium gold-embossed matte gift box loaded with a custom name keychain, a hand-poured lavender soy candle, artisan chocolate bars, a customized photo frame, and a bouquet of mini pipe cleaner roses.",
    features: [
      "Shipped in an elegant magnetic-latch hardboard gift box",
      "Includes 4 personalized custom items curated inside",
      "A hand-written luxury gold-ink calligraphy card included"
    ],
    colors: ["Classic Gold & White", "Blush Rose & Gold", "Luxury Obsidian & Silver"],
    materials: ["Rigid Gift Box", "Premium Keepsakes", "Satin Ribbons", "Eco Shreddings"],
    estimatedDelivery: "5-7 working days",
    customizationFields: [
      { name: "birthdayPersonName", label: "Birthday Star's Name", type: "text", placeholder: "e.g. Rahul", required: true },
      { name: "age", label: "Age / Birthday Number (optional)", type: "text", placeholder: "e.g. 25th", required: false },
      { name: "candleFragrance", label: "Fragrance Choice", type: "text", placeholder: "e.g. Lavender, Cinnamon Rose, Vanilla Caramel", required: false },
      { name: "wishes", label: "Detailed Calligraphy Card Message", type: "textarea", placeholder: "Write your warm birthday greeting here...", required: true }
    ]
  },
  {
    id: "hamper-anniversary",
    name: "Luxury Eternal Bond Couple Anniversary Box",
    category: "gift-hampers",
    subcategory: "Anniversary Box",
    price: 4599,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 94,
    images: [
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop"
    ],
    description: "An elegant hampers designed to celebrate everlasting love. Features a couple resin keychain set, a customized couple embroidery hoop, premium rose sparkling juice, and customized coordinates or wedding date plaques.",
    features: [
      "Includes custom 8-inch couple hoop & couple keychains",
      "Comes with elegant copper micro fairy lights wrapping",
      "Premium wooden keepsake crate reusable for storage"
    ],
    colors: ["Rose Gold Love Theme", "Timeless White & Gold Theme"],
    materials: ["Premium Wooden Crate", "Linen", "Resin", "Luxury Satin Ribbon"],
    estimatedDelivery: "6-9 working days",
    customizationFields: [
      { name: "coupleNames", label: "Couple's Names", type: "text", placeholder: "e.g. Rohan & Siya", required: true },
      { name: "anniversaryDate", label: "Anniversary Date", type: "date", required: true },
      { name: "specialNotes", label: "Special Requests / Custom Instructions", type: "textarea", placeholder: "e.g. Put a gold bow, include a small bouquet of lavender flowers.", required: false }
    ]
  },

  // 5. Personalized Frames & Keepsakes
  {
    id: "frame-spotify",
    name: "Aesthetic Premium Spotify Acrylic LED Frame",
    category: "personalized-gifts",
    subcategory: "Spotify Frame",
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 284,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Play your favorite song forever. An ultra-premium shatterproof acrylic plaque printed with a scannable Spotify code, the custom photo of your choice, song title, and artist name, set on a warm glowing beechwood LED light base.",
    features: [
      "Includes a real-wood beech base with warm yellow USB LED lights",
      "HD printed high-transparency thick acrylic sheet",
      "Fully functional scannable Spotify song code"
    ],
    colors: ["Warm LED Base", "Multicolor RGB LED Base (with remote)"],
    materials: ["Shatterproof Acrylic", "Beechwood Base", "LED Strips"],
    estimatedDelivery: "4-6 working days",
    customizationFields: [
      { name: "songTitle", label: "Song Name", type: "text", placeholder: "e.g. Perfect", required: true },
      { name: "artistName", label: "Artist Name", type: "text", placeholder: "e.g. Ed Sheeran", required: true },
      { name: "spotifyLink", label: "Spotify Track Link / URI (optional)", type: "text", placeholder: "e.g. https://open.spotify.com/track/...", required: false },
      { name: "customDate", label: "Custom Date/Subtitle (instead of album name)", type: "text", placeholder: "e.g. 14.02.2024", required: false }
    ]
  },
  {
    id: "frame-led",
    name: "Luxury Holographic 3D LED Name Frame",
    category: "personalized-gifts",
    subcategory: "LED Frame",
    price: 1599,
    originalPrice: 2299,
    rating: 4.8,
    reviewCount: 104,
    images: [
      "https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A stunning bedside night light frame featuring names intricately laser-etched on a premium optical acrylic plate. Creates a holographic 3D illusion of stars, floral wreaths, and custom typography, glowing softly in warm gold light.",
    features: [
      "Durable laser-engraved details that never peel or fade",
      "Low power consumption warm LED wooden stand",
      "Elegant glassmorphic style plate borders"
    ],
    colors: ["Warm White Glow", "Cool Ivory Glow"],
    materials: ["Laser-Etched Acrylic", "Polished Oak Wood LED Base"],
    estimatedDelivery: "5-7 working days",
    customizationFields: [
      { name: "engravedNames", label: "Names to Engrave", type: "text", placeholder: "e.g. Aman & Shruti", required: true },
      { name: "specialYear", label: "Year / Date (Optional)", type: "text", placeholder: "e.g. Estd. 2021", required: false }
    ]
  }
];
