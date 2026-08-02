// Face Atlas data: packs, trait study notes, and confusability maps.
// Trait notes are broad statistical tendencies with huge individual overlap —
// cues to look for, never rules. Latin American entries describe ancestry-mix
// tendencies that vary enormously within every country.

const PACKS = [
  {
    id: 'mideast', name: 'Middle East & Caucasus', flag: '🌍',
    regions: ['Armenian', 'Georgian', 'Azerbaijani', 'Iranian', 'Turkish', 'Kurdish', 'Lebanese', 'Syrian', 'Egyptian', 'Saudi', 'Iraqi', 'Jordanian', 'Palestinian', 'Yemeni'],
    rookie: ['Saudi', 'Egyptian', 'Turkish', 'Armenian', 'Georgian'],
    spotter: ['Saudi', 'Egyptian', 'Turkish', 'Armenian', 'Georgian', 'Iranian', 'Lebanese', 'Kurdish', 'Iraqi', 'Yemeni']
  },
  {
    id: 'centralamerica', name: 'Central America', flag: '🌎',
    regions: ['Mexican', 'Guatemalan', 'Belizean', 'Honduran', 'Salvadoran', 'Nicaraguan', 'Costa Rican', 'Panamanian'],
    rookie: ['Mexican', 'Guatemalan', 'Belizean', 'Costa Rican'],
    spotter: ['Mexican', 'Guatemalan', 'Belizean', 'Costa Rican', 'Panamanian', 'Honduran']
  },
  {
    id: 'southamerica', name: 'South America', flag: '🌎',
    regions: ['Colombian', 'Venezuelan', 'Ecuadorian', 'Peruvian', 'Bolivian', 'Chilean', 'Argentinian', 'Brazilian', 'Paraguayan', 'Uruguayan'],
    rookie: ['Argentinian', 'Bolivian', 'Brazilian', 'Colombian', 'Chilean'],
    spotter: ['Argentinian', 'Bolivian', 'Brazilian', 'Colombian', 'Chilean', 'Peruvian', 'Venezuelan', 'Uruguayan']
  },
  {
    id: 'asia', name: 'Asia', flag: '🌏',
    regions: ['Chinese', 'Japanese', 'Korean', 'Mongolian', 'Vietnamese', 'Thai', 'Filipino', 'Indonesian', 'Malaysian', 'Cambodian', 'Burmese', 'Indian', 'Pakistani', 'Bangladeshi', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Afghan', 'Nepali', 'Sri Lankan', 'Laotian'],
    rookie: ['Japanese', 'Thai', 'Indian', 'Kazakh', 'Filipino'],
    spotter: ['Japanese', 'Thai', 'Indian', 'Kazakh', 'Filipino', 'Chinese', 'Korean', 'Vietnamese', 'Indonesian', 'Pakistani', 'Kyrgyz', 'Afghan']
  },
  {
    id: 'europe', name: 'Europe', flag: '🇪🇺',
    regions: ['Russian', 'Ukrainian', 'Polish', 'Lithuanian', 'German', 'Swedish', 'Italian', 'Spanish', 'Portuguese', 'Greek', 'Serbian', 'Albanian', 'Bulgarian', 'Romanian', 'Hungarian'],
    rookie: ['Swedish', 'Italian', 'Russian', 'Greek', 'German'],
    spotter: ['Swedish', 'Italian', 'Russian', 'Greek', 'German', 'Spanish', 'Polish', 'Serbian', 'Romanian']
  },
  {
    id: 'africa', name: 'Africa', flag: '🌍',
    regions: ['Nigerian', 'Ghanaian', 'Senegalese', 'Ethiopian', 'Somali', 'Kenyan', 'Moroccan', 'Algerian', 'Tunisian'],
    rookie: ['Nigerian', 'Ethiopian', 'Moroccan', 'Kenyan'],
    spotter: ['Nigerian', 'Ethiopian', 'Moroccan', 'Kenyan', 'Somali', 'Senegalese', 'Algerian']
  }
];

const NEIGHBORS = {
  // Middle East & Caucasus
  Armenian: ['Georgian', 'Azerbaijani', 'Iranian', 'Kurdish'],
  Georgian: ['Armenian', 'Azerbaijani', 'Turkish'],
  Azerbaijani: ['Armenian', 'Georgian', 'Turkish', 'Iranian'],
  Iranian: ['Armenian', 'Kurdish', 'Azerbaijani', 'Turkish'],
  Turkish: ['Georgian', 'Azerbaijani', 'Lebanese', 'Kurdish'],
  Kurdish: ['Iranian', 'Armenian', 'Turkish', 'Syrian'],
  Lebanese: ['Syrian', 'Turkish', 'Egyptian'],
  Syrian: ['Lebanese', 'Egyptian', 'Kurdish', 'Saudi'],
  Egyptian: ['Syrian', 'Saudi', 'Lebanese'],
  Saudi: ['Egyptian', 'Syrian'],
  // Central America
  Mexican: ['Guatemalan', 'Salvadoran', 'Honduran'],
  Guatemalan: ['Mexican', 'Salvadoran', 'Honduran'],
  Belizean: ['Honduran', 'Panamanian', 'Nicaraguan'],
  Honduran: ['Salvadoran', 'Nicaraguan', 'Guatemalan'],
  Salvadoran: ['Honduran', 'Guatemalan', 'Nicaraguan'],
  Nicaraguan: ['Honduran', 'Costa Rican', 'Salvadoran'],
  'Costa Rican': ['Nicaraguan', 'Panamanian', 'Colombian'],
  Panamanian: ['Costa Rican', 'Colombian', 'Belizean'],
  // South America
  Colombian: ['Venezuelan', 'Ecuadorian', 'Panamanian'],
  Venezuelan: ['Colombian', 'Brazilian', 'Ecuadorian'],
  Ecuadorian: ['Peruvian', 'Colombian', 'Bolivian'],
  Peruvian: ['Bolivian', 'Ecuadorian', 'Paraguayan'],
  Bolivian: ['Peruvian', 'Paraguayan', 'Ecuadorian'],
  Chilean: ['Argentinian', 'Peruvian', 'Uruguayan'],
  Argentinian: ['Uruguayan', 'Chilean', 'Brazilian'],
  Brazilian: ['Venezuelan', 'Paraguayan', 'Argentinian'],
  Paraguayan: ['Bolivian', 'Brazilian', 'Argentinian'],
  Uruguayan: ['Argentinian', 'Chilean', 'Brazilian'],
  // Asia
  Chinese: ['Korean', 'Japanese', 'Vietnamese', 'Mongolian'],
  Japanese: ['Korean', 'Chinese'],
  Korean: ['Japanese', 'Chinese', 'Mongolian'],
  Mongolian: ['Kazakh', 'Chinese', 'Korean'],
  Vietnamese: ['Thai', 'Chinese', 'Cambodian'],
  Thai: ['Vietnamese', 'Cambodian', 'Burmese', 'Malaysian'],
  Filipino: ['Indonesian', 'Malaysian', 'Thai'],
  Indonesian: ['Malaysian', 'Filipino', 'Cambodian'],
  Malaysian: ['Indonesian', 'Filipino', 'Thai'],
  Cambodian: ['Thai', 'Vietnamese', 'Burmese'],
  Burmese: ['Thai', 'Bangladeshi', 'Cambodian'],
  Indian: ['Pakistani', 'Bangladeshi'],
  Pakistani: ['Indian', 'Bangladeshi', 'Uzbek'],
  Bangladeshi: ['Indian', 'Burmese', 'Pakistani'],
  Kazakh: ['Mongolian', 'Uzbek', 'Korean', 'Kyrgyz'],
  Uzbek: ['Kazakh', 'Pakistani', 'Mongolian', 'Tajik'],
  // Central & South Asia additions
  Kyrgyz: ['Kazakh', 'Mongolian', 'Uzbek'],
  Tajik: ['Uzbek', 'Afghan', 'Iranian'],
  Turkmen: ['Uzbek', 'Azerbaijani', 'Iranian'],
  Afghan: ['Pakistani', 'Tajik', 'Iranian'],
  Nepali: ['Indian', 'Burmese', 'Bangladeshi'],
  'Sri Lankan': ['Indian', 'Bangladeshi', 'Nepali'],
  Laotian: ['Thai', 'Cambodian', 'Vietnamese'],
  // Mideast additions
  Iraqi: ['Syrian', 'Jordanian', 'Kurdish', 'Saudi'],
  Jordanian: ['Palestinian', 'Syrian', 'Iraqi'],
  Palestinian: ['Jordanian', 'Lebanese', 'Syrian'],
  Yemeni: ['Saudi', 'Somali', 'Egyptian'],
  // Europe
  Russian: ['Ukrainian', 'Polish', 'Lithuanian'],
  Ukrainian: ['Russian', 'Polish', 'Romanian'],
  Polish: ['Ukrainian', 'Russian', 'German', 'Lithuanian'],
  Lithuanian: ['Polish', 'Russian', 'Swedish'],
  German: ['Polish', 'Swedish', 'Hungarian'],
  Swedish: ['German', 'Lithuanian', 'Russian'],
  Italian: ['Spanish', 'Greek', 'Portuguese'],
  Spanish: ['Italian', 'Portuguese', 'Greek'],
  Portuguese: ['Spanish', 'Italian', 'Moroccan'],
  Greek: ['Italian', 'Albanian', 'Bulgarian', 'Turkish'],
  Serbian: ['Bulgarian', 'Romanian', 'Albanian'],
  Albanian: ['Greek', 'Serbian', 'Italian'],
  Bulgarian: ['Serbian', 'Romanian', 'Greek'],
  Romanian: ['Bulgarian', 'Hungarian', 'Serbian'],
  Hungarian: ['Romanian', 'German', 'Serbian'],
  // Africa
  Nigerian: ['Ghanaian', 'Senegalese', 'Kenyan'],
  Ghanaian: ['Nigerian', 'Senegalese', 'Kenyan'],
  Senegalese: ['Ghanaian', 'Nigerian', 'Kenyan'],
  Ethiopian: ['Somali', 'Kenyan', 'Yemeni'],
  Somali: ['Ethiopian', 'Kenyan', 'Yemeni'],
  Kenyan: ['Ethiopian', 'Nigerian', 'Somali'],
  Moroccan: ['Algerian', 'Tunisian', 'Spanish'],
  Algerian: ['Moroccan', 'Tunisian', 'Egyptian'],
  Tunisian: ['Algerian', 'Moroccan', 'Egyptian']
};

const TRAITS = {
  // ——— Middle East & Caucasus ———
  Armenian: {
    cues: ['Strong, often convex ("aquiline") nose with a high bridge', 'Prominent brow ridge and dense, dark eyebrows', 'Deep-set eyes, usually dark brown', 'Broad jaw and relatively compact midface'],
    confused: { Georgian: 'Georgians tend to have a straighter nose bridge and lighter eyes more often.', Iranian: 'Persians tend toward a longer, narrower face; Armenian faces read more compact and heavy-browed.' }
  },
  Georgian: {
    cues: ['Straighter or gently curved nose bridge (less hooked than neighbors)', 'Lighter eyes (green/hazel) show up noticeably more often', 'Wide, open midface with high cheekbones', 'Softer brow line than Armenians'],
    confused: { Armenian: 'Armenians usually carry a stronger convex nose and heavier brow.', Turkish: 'Turks trend rounder in the face; Georgians keep a longer cheekbone line.' }
  },
  Azerbaijani: {
    cues: ['Almond-shaped, slightly upturned eyes — a subtle Turkic signature', 'Medium nose, straighter than Armenian, finer than Georgian', 'Olive skin with cool undertone; very dark, thick hair', 'Defined cheekbones with a tapering chin'],
    confused: { Iranian: 'Persians trend toward longer faces and higher nose bridges.', Turkish: 'Turks show more Balkan/Mediterranean mixture; Azerbaijanis read slightly more Central-Asian around the eyes.' }
  },
  Iranian: {
    cues: ['Long, oval face with a high, refined nose bridge', 'High-arched, expressive eyebrows', 'Large, elongated dark eyes with thick lashes', 'Fair-to-olive skin, often lighter than Gulf Arabs'],
    confused: { Armenian: 'Armenians read more compact with heavier brow and jaw.', Kurdish: 'Kurds trend more angular and rugged; Persian features read more elongated and refined.' }
  },
  Turkish: {
    cues: ['Rounder, softer face outline than Caucasus neighbors', 'Moderate nose — rarely as strong as Armenian/Kurdish', 'Wide mixture zone: Balkan, Anatolian and Central-Asian echoes', 'Medium-olive skin; brown rather than jet-black hair is common'],
    confused: { Azerbaijani: 'Azerbaijanis show the Turkic eye shape more strongly.', Lebanese: 'Levantines trend finer-boned with a narrower midface.' }
  },
  Kurdish: {
    cues: ['Angular, rugged bone structure — strong jaw and chin', 'Very dense eyebrows, often nearly meeting', 'Deep-set eyes; green/hazel not rare in some groups', 'Prominent straight-to-convex nose'],
    confused: { Iranian: 'Persian faces read longer and smoother; Kurdish faces more angular.', Armenian: 'Both are heavy-browed — Armenians trend broader in the jaw, Kurds more chiseled.' }
  },
  Lebanese: {
    cues: ['Fine-boned Levantine look: narrow midface, softer oval outline', 'Lighter Mediterranean skin; light eyes appear regularly', 'Delicate-to-moderate nose, seldom heavy', 'Groomed, polished presentation is culturally common in photos'],
    confused: { Syrian: 'Extremely close — Syrians trend slightly stronger noses and warmer skin.', Turkish: 'Turks read rounder-faced; Lebanese keep the narrow Levantine midface.' }
  },
  Syrian: {
    cues: ['Classic Levantine oval face, a touch stronger-featured than Lebanese', 'Warm olive skin; dark expressive eyes', 'Moderate-to-prominent nose with a defined tip', 'Full, dark eyebrows framing the eyes'],
    confused: { Lebanese: 'Nearly twins — Lebanese trend lighter and finer-boned.', Egyptian: 'Egyptians trend fuller lips and rounder eyes with North-African warmth.' }
  },
  Egyptian: {
    cues: ['North-African warmth: golden-brown undertone to the skin', 'Fuller lips and rounder, larger-set eyes', 'Wider nose base than Levantines', 'Rounder face outline; very dark, often wavy hair'],
    confused: { Syrian: 'Levantines are narrower-faced with cooler skin tones.', Saudi: 'Peninsula Arabs trend narrower faces and stronger nose profiles.' }
  },
  Saudi: {
    cues: ['Narrow, elongated face typical of the Arabian Peninsula', 'Strong, prominent nose with a defined bridge', 'Deep brown-to-dark skin tone; jet-black hair, dense beard growth in men', 'Intense, dark deep-set eyes'],
    confused: { Egyptian: 'Egyptians trend rounder-faced and fuller-lipped.', Syrian: 'Levantines are lighter-skinned with softer nose profiles.' }
  },

  // ——— Central America ———
  Mexican: {
    cues: ['Broad mestizo spectrum — Indigenous + Spanish mix dominates', 'High, wide cheekbones with a strong jaw', 'Straight, heavy black hair; warm brown skin', 'Almond eyes; moderate nose with a fleshy tip'],
    confused: { Guatemalan: 'Guatemalans trend more strongly Indigenous (Maya) — shorter midface, broader nose base.', Salvadoran: 'Very close; Salvadorans trend slightly softer cheekbones.' }
  },
  Guatemalan: {
    cues: ['Strongest Maya signal in the region: compact face, prominent cheekbones', 'Broader nose base with a low bridge', 'Deep warm brown skin; jet-black straight hair', 'Epicanthic-leaning eye shape more common than farther south'],
    confused: { Mexican: 'Mexicans average more European admixture — longer midface, higher nose bridge.', Honduran: 'Hondurans trend a touch more mixed and less strongly Maya.' }
  },
  Belizean: {
    cues: ['Strong Afro-Caribbean presence — many faces read Creole/Garifuna', 'Fuller lips and wider nose than Spanish-mestizo neighbors', 'Darker skin tones common; tightly curled hair frequent', 'English-Caribbean rather than Spanish colonial heritage'],
    confused: { Panamanian: 'Panama also has Afro-Caribbean roots — Belizeans trend stronger Creole features.', Honduran: 'Mainland Hondurans read more mestizo; coastal Garifuna faces overlap heavily.' }
  },
  Honduran: {
    cues: ['Mestizo majority with a visible Indigenous Lenca base', 'Rounder face than Guatemalan Maya profile', 'Medium-brown skin; wavy-to-straight dark hair', 'Caribbean coast adds Garifuna (Afro-Indigenous) faces'],
    confused: { Salvadoran: 'Nearly interchangeable; Salvadorans trend slightly lighter and more compact.', Nicaraguan: 'Nicaraguans trend a bit more European admixture in the Pacific cities.' }
  },
  Salvadoran: {
    cues: ['Compact mestizo face — Pipil Indigenous base', 'Softer cheekbone line than Guatemala', 'Medium warm-brown skin, straight dark hair', 'Small-to-moderate nose with a rounded tip'],
    confused: { Honduran: 'Extremely close — Hondurans trend slightly taller-faced.', Guatemalan: 'Guatemalans show the stronger Maya cheekbone/nose signal.' }
  },
  Nicaraguan: {
    cues: ['Mestizo with a stronger European tilt in Pacific-side faces', 'Longer midface than the northern-triangle look', 'Warm olive-to-brown skin; wavy hair common', 'Caribbean coast contributes Miskito and Creole faces'],
    confused: { Honduran: 'Hondurans trend more Indigenous on average.', 'Costa Rican': 'Ticos trend lighter and more European still.' }
  },
  'Costa Rican': {
    cues: ['Most European-leaning look of Central America ("Tico" Valle Central)', 'Lighter skin and eyes appear more often than anywhere nearby', 'Narrower nose, longer face than the mestizo north', 'Still plenty of mestizo and Afro-Limón diversity'],
    confused: { Nicaraguan: 'Nicaraguans trend warmer-toned with broader midfaces.', Panamanian: 'Panamanians trend more Afro-Caribbean and mixed.' }
  },
  Panamanian: {
    cues: ['Crossroads mix: mestizo + Afro-Caribbean + Indigenous + Chinese threads', 'Fuller lips and broader nose than Costa Rican neighbor', 'Wide range of skin tones in one population', 'Rounder face outline; curly-to-wavy hair frequent'],
    confused: { 'Costa Rican': 'Ticos trend lighter and more uniformly European-mestizo.', Colombian: 'Caribbean Colombians look very similar; Colombians trend a longer face.' }
  },

  // ——— South America ———
  Colombian: {
    cues: ['Balanced tri-racial mix — mestizo core with African coastal thread', 'Soft oval face, warm olive-to-brown skin', 'Full dark hair with body/wave; expressive dark eyes', 'Moderate nose, fuller lips than Southern Cone'],
    confused: { Venezuelan: 'Nearly twins — Venezuelans trend slightly more Caribbean/African admixture.', Ecuadorian: 'Ecuadorians trend more Andean-Indigenous: broader cheekbones, lower nose bridge.' }
  },
  Venezuelan: {
    cues: ['Caribbean mestizo blend with visible African thread', 'Warm golden-brown skin; strong dark brows', 'Fuller lips and softer jaw than Andean neighbors', 'Wavy-to-curly dark hair very common'],
    confused: { Colombian: 'Practically inseparable; Colombians trend a touch more Andean.', Brazilian: 'Brazilians span even wider; coastal Brazilians overlap heavily.' }
  },
  Ecuadorian: {
    cues: ['Strong Andean-Indigenous base (Kichwa)', 'High, wide cheekbones; compact midface', 'Low nose bridge with a broader base', 'Deep warm brown skin; thick straight black hair'],
    confused: { Peruvian: 'Extremely close Andean look — Peruvians trend a slightly longer face.', Bolivian: 'Bolivians read the most strongly Indigenous of the three.' }
  },
  Peruvian: {
    cues: ['Andean-Indigenous majority signal (Quechua)', 'Prominent cheekbones with almond, slightly hooded eyes', 'Aquiline-tending nose distinctive of the Andes', 'Bronze-brown skin; straight jet-black hair'],
    confused: { Bolivian: 'Bolivians trend rounder-faced and more compact.', Ecuadorian: 'Ecuadorians trend a broader nose base and shorter midface.' }
  },
  Bolivian: {
    cues: ['Strongest Indigenous (Aymara/Quechua) signal in South America', 'Round, compact face with very high cheekbones', 'Distinct almond eyes with epicanthic tendency', 'Deep bronze skin; heavy straight black hair'],
    confused: { Peruvian: 'Peruvians trend the classic Andean aquiline nose more strongly.', Paraguayan: 'Paraguayans mix Guaraní + European — softer cheekbones, lighter tone.' }
  },
  Chilean: {
    cues: ['Mestizo with a strong European overlay (Spanish/Basque)', 'Mapuche thread shows in wide cheekbones on many faces', 'Skin trends lighter than Andean neighbors', 'Straight dark-brown hair; moderate features overall'],
    confused: { Argentinian: 'Argentinians trend more purely European (Italian/Spanish).', Peruvian: 'Peruvians read more strongly Andean-Indigenous.' }
  },
  Argentinian: {
    cues: ['Most European face of the continent — Italian + Spanish dominance', 'Longer face, higher nose bridge, narrower nostrils', 'Lighter skin, and light eyes are unremarkable', 'Dark-brown to chestnut wavy hair common'],
    confused: { Uruguayan: 'Effectively the same population — coin-flip territory.', Chilean: 'Chileans carry more visible Indigenous admixture.' }
  },
  Brazilian: {
    cues: ['Widest spectrum on Earth: European, African, Indigenous, Japanese threads', 'Sun-warmed skin across every tone', 'Full lips and relaxed, open expressions trend in photos', 'Wavy-to-curly dark hair is the plurality look'],
    confused: { Venezuelan: 'Caribbean mix overlaps; Venezuelans trend more uniform mestizo.', Colombian: 'Similar tri-racial blend — Brazilians span wider extremes.' }
  },
  Paraguayan: {
    cues: ['Uniquely uniform Guaraní-Spanish blend (most of the population)', 'Warm olive-tan skin; soft rounded features', 'Wide-set dark eyes with a gentle epicanthic hint', 'Straight-to-wavy near-black hair'],
    confused: { Bolivian: 'Bolivians read more strongly Andean with higher cheekbones.', Brazilian: 'Southern Brazilians look close; Brazilians vary far more.' }
  },
  Uruguayan: {
    cues: ['European-immigrant face like Argentina (Spanish/Italian)', 'Light-to-olive skin; light eyes fairly common', 'Longer midface with a defined nose bridge', 'Little Indigenous signal compared to the Andes'],
    confused: { Argentinian: 'Statistically near-identical — the hardest pair in the pack.', Chilean: 'Chileans show more mestizo/Mapuche influence.' }
  },

  // ——— Asia ———
  Chinese: {
    cues: ['Broad Han spectrum: rounder-to-oval face, smooth brow', 'Single eyelids and epicanthic folds are common but not universal', 'Straight black hair; fair-to-light-tan skin', 'Wider, flatter nose bridge than Northeast neighbors on average'],
    confused: { Korean: 'Koreans trend flatter, wider faces with higher, flatter cheekbones.', Japanese: 'Japanese trend longer faces with more prominent noses.' }
  },
  Japanese: {
    cues: ['Longer, narrower face than mainland neighbors', 'More prominent, higher-bridged nose on average', 'Softer jawline; skin often very fair with neutral undertone', 'Larger eye aperture than the stereotype suggests'],
    confused: { Korean: 'Koreans trend wider jaws and flatter midfaces.', Chinese: 'Han faces trend rounder with a lower nose bridge.' }
  },
  Korean: {
    cues: ['Flat, wide midface with high, flat cheekbones', 'Straighter, more angular jaw (before any surgery trends)', 'Monolids very common; eyes set wide', 'Very fair skin culturally prized and common'],
    confused: { Japanese: 'Japanese trend narrower faces and stronger noses.', Mongolian: 'Mongolians trend even wider faces with more robust bone.' }
  },
  Mongolian: {
    cues: ['Widest, most robust facial bone in East Asia', 'Very high, padded cheekbones; deep epicanthic folds', 'Weathered ruddy-tan skin tone common', 'Strong jaw with a broad chin'],
    confused: { Kazakh: 'Kazakhs blend in a Turkic/West-Eurasian thread — slightly higher nose bridges.', Korean: 'Koreans trend flatter and fairer with less robust bone.' }
  },
  Vietnamese: {
    cues: ['Delicate, small-boned Southeast Asian frame', 'Wider mouth with fuller lips than East Asians', 'Golden-tan skin; large dark eyes, double lids common', 'Low, soft nose bridge with rounded tip'],
    confused: { Thai: 'Thais trend darker-toned with deeper-set eyes.', Chinese: 'Southern Han overlap heavily; Vietnamese trend smaller-framed.' }
  },
  Thai: {
    cues: ['Warm golden-brown skin, deeper than Vietnam/China', 'Softly rounded face with wide cheekbones', 'Large, deep-set eyes with defined creases', 'Fuller lips; broad, low nose'],
    confused: { Cambodian: 'Khmer faces trend broader noses and darker tone.', Vietnamese: 'Vietnamese trend lighter and smaller-featured.' }
  },
  Filipino: {
    cues: ['Austronesian base with Spanish and Chinese threads', 'Rounded face, warm tan skin, wide bright smile', 'Broad, low nose bridge; full lips', 'Large expressive eyes with double lids typical'],
    confused: { Indonesian: 'Very close Austronesian kin — Indonesians trend slightly darker.', Malaysian: 'Malays overlap heavily; Filipinos show more Spanish/Chinese mixing.' }
  },
  Indonesian: {
    cues: ['Core Austronesian look: warm brown skin, rounded features', 'Broad nose with low bridge; full lips', 'Thick, wavy-to-straight black hair', 'Huge archipelago variety — Java vs. Papua differ enormously'],
    confused: { Malaysian: 'Malays are nearly the same population — the hardest pair here.', Filipino: 'Filipinos trend lighter with more East-Asian eye shapes.' }
  },
  Malaysian: {
    cues: ['Malay core barely distinguishable from western Indonesia', 'Warm brown skin; soft rounded face', 'Broad, low nose; gentle epicanthic tendency', 'Large population Chinese and Indian threads diversify the mix'],
    confused: { Indonesian: 'Effectively the same core population — coin-flip.', Thai: 'Thais trend deeper-set eyes and golden (not brown) undertone.' }
  },
  Cambodian: {
    cues: ['Khmer signature: broad face with wide-set eyes', 'Darkest average skin tone of mainland Southeast Asia', 'Wide, flat nose; full, well-defined lips', 'Strong cheekbones with a short midface'],
    confused: { Thai: 'Thais trend lighter with narrower noses.', Vietnamese: 'Vietnamese read distinctly lighter and finer-featured.' }
  },
  Burmese: {
    cues: ['Bridge between South and Southeast Asia', 'Warm golden-brown skin; round face', 'Eyes larger and rounder than East Asia, folds vary', 'Broad nose but often with more bridge than Khmer/Thai'],
    confused: { Thai: 'Thais trend more East-Asian eye shapes.', Bangladeshi: 'Bengalis read South-Asian: deeper-set eyes, stronger nose bridge.' }
  },
  Indian: {
    cues: ['South-Asian core: large, deep-set eyes with heavy lashes', 'Strong, defined nose bridge (north) to broader base (south)', 'Skin from wheatish to deep brown across regions', 'Full dark brows; thick wavy-to-straight black hair'],
    confused: { Pakistani: 'Pakistanis trend lighter with more West-Asian (Iranic) nose profiles.', Bangladeshi: 'Bengalis trend rounder faces with a touch of Southeast-Asian eye shape.' }
  },
  Pakistani: {
    cues: ['South-Asian base with a strong West-Asian (Iranic/Pashtun) overlay', 'Higher nose bridge and lighter skin than the subcontinent average', 'Light eyes (green/grey) appear in northern groups', 'Strong brow and jaw; dense beard growth in men'],
    confused: { Indian: 'North Indians overlap heavily; Pakistanis trend more Iranic noses.', Uzbek: 'Uzbeks add a visible Turkic eye-fold signal.' }
  },
  Bangladeshi: {
    cues: ['Bengali look: soft round face, warm deep-brown skin', 'Large, liquid dark eyes; gentle features', 'Hint of Southeast-Asian eye shape from eastern gene flow', 'Smaller nose with a rounded tip vs. northwest South Asia'],
    confused: { Indian: 'Eastern Indians (West Bengal) are the same population.', Burmese: 'Burmese read more Southeast-Asian with lighter golden tone.' }
  },
  Kazakh: {
    cues: ['Turkic-Mongolic blend: wide face with high cheekbones', 'Epicanthic folds over often-narrow eyes, but with West-Eurasian nose bridge', 'Skin fair-to-tan with ruddy cheeks common', 'Strong, wide jaw; straight black hair'],
    confused: { Mongolian: 'Mongolians read more purely East-Asian robust.', Uzbek: 'Uzbeks trend more West-Asian: larger eyes, stronger noses.' }
  },
  Uzbek: {
    cues: ['Persian-Turkic crossroads: more West-Asian than Kazakh', 'Larger, rounder eyes with softer folds', 'Defined nose bridge; dark strong brows', 'Olive-tan skin; dark wavy hair'],
    confused: { Kazakh: 'Kazakhs read more East-Asian in the eyes and cheekbones.', Pakistani: 'Northern Pakistanis overlap; Uzbeks keep a Turkic eye hint.' }
  },
  // ——— Mideast additions ———
  Iraqi: {
    cues: ['Strong straight-to-convex nose, broad base', 'Heavy dark brows over deep-set eyes', 'Squarer jaw than Levantine neighbors', 'Olive-tan skin, dense black hair'],
    confused: { Syrian: 'Syrians trend finer-boned; Iraqi faces read heavier in jaw and nose.', Saudi: 'Gulf faces trend longer and narrower; Iraqis broader in the midface.' }
  },
  Jordanian: {
    cues: ['Levantine-Bedouin blend: long face, prominent nose', 'Angular cheekbones with a lean look', 'Dark, deep-set eyes under straight brows', 'Tan skin tone deeper than coastal Levantines'],
    confused: { Palestinian: 'Extremely close; Jordanians trend slightly leaner and more Bedouin-angular.', Syrian: 'Syrians read softer and fairer on average.' }
  },
  Palestinian: {
    cues: ['Classic Levantine balance: medium-strong nose, oval face', 'Expressive full brows, large dark eyes', 'Fuller lips than Gulf neighbors', 'Olive skin with warm undertone'],
    confused: { Jordanian: 'Nearly identical pools; Jordanians trend more angular desert features.', Lebanese: 'Lebanese trend fairer with finer noses.' }
  },
  Yemeni: {
    cues: ['Fine-boned, narrow face with sharp features', 'Prominent thin-bridged nose', 'Very dark, dense hair and brows; darker skin than Gulf average', 'Horn-of-Africa echo in some faces'],
    confused: { Saudi: 'Saudis read broader and fairer; Yemenis finer and darker.', Somali: 'Somalis carry East-African features more strongly; Yemenis stay Arabian.' }
  },
  // ——— Central & South Asia additions ———
  Kyrgyz: {
    cues: ['Strongly East-Asian eye fold with low bridge', 'Broad, flat cheekbones — mountain-Turkic look', 'Rounder face than Kazakh on average', 'Straight black hair, sparse beard'],
    confused: { Kazakh: 'Extremely close; Kyrgyz trend slightly rounder-faced and more uniformly East-Asian.', Mongolian: 'Mongolians read broader-jawed and heavier-boned.' }
  },
  Tajik: {
    cues: ['Persian-featured: high nose bridge, larger rounded eyes', 'Most West-Asian of Central Asians', 'Dark wavy hair, strong brows, frequent beard shadow', 'Longer midface than Turkic neighbors'],
    confused: { Uzbek: 'Uzbeks keep a Turkic eye hint; Tajiks read almost fully Persian.', Afghan: 'Heavy overlap; Afghans (Pashtun) trend more rugged and angular.' }
  },
  Turkmen: {
    cues: ['Turkic-Persian blend: moderate fold with a defined nose', 'Long face with high forehead', 'Between Uzbek and Azerbaijani in overall look', 'Dark hair, weathered tan skin'],
    confused: { Uzbek: 'Uzbeks trend rounder-faced; Turkmen longer and more hook-nosed.', Azerbaijani: 'Azerbaijanis read more Caucasus-Mediterranean.' }
  },
  Afghan: {
    cues: ['Rugged, angular Pashtun structure: strong jaw, sharp cheekbones', 'Prominent aquiline nose', 'Light eyes (green/grey) not rare', 'Weathered skin, heavy brows and beard'],
    confused: { Pakistani: 'Pashtun faces cross the border; Punjabi Pakistanis read softer and rounder.', Tajik: 'Tajiks trend smoother Persian features.' }
  },
  Nepali: {
    cues: ['Himalayan blend: Indic features with East-Asian eye fold in many', 'Broad cheekbones with a compact midface', 'Warm brown skin, straight black hair', 'Flatter profile than Indian plains faces'],
    confused: { Indian: 'Plains Indians lack the East-Asian eye hint most Nepalis carry.', Burmese: 'Burmese read more fully Southeast-Asian.' }
  },
  'Sri Lankan': {
    cues: ['Deep brown skin with cool undertone', 'Large, very dark round eyes', 'Softer, rounder face than South Indian average', 'Dense black wavy hair'],
    confused: { Indian: 'South Indians are closest; Sri Lankans trend rounder-faced and darker.', Bangladeshi: 'Bengalis carry a slight East-Asian hint Sri Lankans lack.' }
  },
  Laotian: {
    cues: ['Classic mainland Southeast-Asian: golden-brown skin, wide cheekbones', 'Fuller lips and broader nose than Thai average', 'Rounder face than Vietnamese', 'Strong single-fold eyes common'],
    confused: { Thai: 'Thais trend narrower-faced with finer features.', Cambodian: 'Khmer read broader-nosed and squarer-jawed; Lao softer.' }
  },
  // ——— Europe ———
  Russian: {
    cues: ['Broad face with wide-set, often light eyes', 'Softer, shorter nose with a lower bridge', 'High rounded cheekbones — a faint steppe echo', 'Fair skin; light-brown to blond hair common'],
    confused: { Ukrainian: 'Extremely close; Ukrainians trend slightly darker-haired and warmer-toned.', Polish: 'Poles trend narrower-faced with sharper noses.' }
  },
  Ukrainian: {
    cues: ['East-Slavic base with a warmer coloring than Russians', 'Rounded face, full cheeks', 'Straight medium nose', 'Dark-blond to brown hair, frequent green eyes'],
    confused: { Russian: 'Russians trend fairer and flatter-cheeked.', Romanian: 'Romanians read more Balkan-Mediterranean.' }
  },
  Polish: {
    cues: ['West-Slavic: narrower face than eastern neighbors', 'Sharper, more defined nose', 'Light eyes very common, often grey-blue', 'Fair skin with cool undertone'],
    confused: { Russian: 'Russians trend broader-faced.', German: 'Germans read heavier-jawed; Poles finer.' }
  },
  Lithuanian: {
    cues: ['Baltic look: strong straight nose, long face', 'Very fair — blond and light-eyed rates among Europe\'s highest', 'Pronounced cheekbone line', 'Cool, pale skin tone'],
    confused: { Polish: 'Poles trend slightly darker and rounder.', Swedish: 'Swedes read softer-featured; Balts more angular.' }
  },
  German: {
    cues: ['Central-European: strong jaw and chin', 'Medium-long face with a straight nose', 'Light eyes and mid-brown hair typical', 'Ruddier skin than Slavic neighbors'],
    confused: { Polish: 'Poles trend finer-boned.', Swedish: 'Swedes trend longer-faced and blonder.' }
  },
  Swedish: {
    cues: ['Nordic: long face, high flat cheekbones', 'Blond hair and blue eyes at very high rates', 'Straight, refined nose', 'Very fair, cool-toned skin'],
    confused: { German: 'Germans read squarer and darker.', Lithuanian: 'Balts carry a heavier bone structure.' }
  },
  Italian: {
    cues: ['Mediterranean: olive skin, dark expressive eyes', 'Prominent, often convex nose', 'Strong brows and dark thick hair', 'Expressive full mouth'],
    confused: { Spanish: 'Spaniards trend softer-nosed and rounder-faced.', Greek: 'Greeks read wider-jawed with denser brows.' }
  },
  Spanish: {
    cues: ['Iberian: olive-fair skin, warm brown eyes', 'Softer nose than Italian average', 'Rounder face with balanced features', 'Dark chestnut hair'],
    confused: { Italian: 'Italians trend stronger-nosed and more angular.', Portuguese: 'Nearly identical; Portuguese trend slightly darker and rounder-eyed.' }
  },
  Portuguese: {
    cues: ['Atlantic-Iberian: slightly darker than Spanish average', 'Large, round dark eyes', 'Compact face with soft features', 'Dense dark, often wavy hair'],
    confused: { Spanish: 'Very close; Spaniards trend lighter.', Moroccan: 'Moroccans carry North-African structure — stronger nose, deeper tone.' }
  },
  Greek: {
    cues: ['Aegean: wide jaw, strong chin', 'Dense, nearly-meeting brows common', 'Prominent straight "Greek" nose — bridge flows from forehead', 'Olive skin, very dark curls'],
    confused: { Italian: 'Italians trend longer-faced.', Turkish: 'Turks read softer and rounder; Greeks more sculpted.' }
  },
  Serbian: {
    cues: ['Dinaric: notably long face and tall skull', 'Strong, straight-to-convex nose', 'Deep-set light-or-dark eyes under straight brows', 'Dark hair with fair-olive skin'],
    confused: { Bulgarian: 'Bulgarians trend rounder and slightly darker.', Albanian: 'Albanians trend finer-boned.' }
  },
  Albanian: {
    cues: ['Fine-boned Balkan: narrow face, sharp features', 'Light eyes surprisingly common', 'Straight, thin nose', 'Dark-brown hair, olive-fair skin'],
    confused: { Greek: 'Greeks trend heavier-browed and wider-jawed.', Serbian: 'Serbs read longer-faced and heavier-boned.' }
  },
  Bulgarian: {
    cues: ['Slavic-Balkan mix: rounder face than Serbs', 'Medium nose with slight convexity', 'Warm olive skin, dark hair', 'Softer brow than Greek average'],
    confused: { Serbian: 'Serbs trend longer-faced.', Romanian: 'Romanians carry a Latin softness; Bulgarians more Slavic-solid.' }
  },
  Romanian: {
    cues: ['Latin island in the Balkans: softer, warmer features', 'Large brown eyes, gentle brow', 'Medium nose, often slightly aquiline', 'Chestnut-to-black hair, olive-fair skin'],
    confused: { Bulgarian: 'Bulgarians read more Slavic-boned.', Hungarian: 'Hungarians trend broader-cheeked.' }
  },
  Hungarian: {
    cues: ['Central-European with a faint Magyar-steppe echo in cheekbones', 'Broad midface, slightly almond eyes in some', 'Medium-strong nose', 'Brown hair, fair-olive skin'],
    confused: { Romanian: 'Romanians trend softer and darker-eyed.', German: 'Germans lack the cheekbone echo.' }
  },
  // ——— Africa ———
  Nigerian: {
    cues: ['West-African: strong rounded features, full lips', 'Broad nose with wide nostril base', 'Deep ebony-to-dark-brown skin', 'Robust jaw and short midface'],
    confused: { Ghanaian: 'Very close; Ghanaians trend slightly softer-featured.', Kenyan: 'East Africans trend narrower-faced.' }
  },
  Ghanaian: {
    cues: ['West-African coastal: rounded face, warm deep-brown skin', 'Full lips with softer nose than Nigerian average', 'Wide, open eyes', 'Compact, smooth features'],
    confused: { Nigerian: 'Nigerians trend more robust-jawed.', Senegalese: 'Senegalese trend taller-faced and darker.' }
  },
  Senegalese: {
    cues: ['Sahelian: elongated face and slender features', 'Very dark, cool-toned skin', 'Finer nose than coastal West Africans', 'High, prominent cheekbones'],
    confused: { Ghanaian: 'Ghanaians read rounder and warmer-toned.', Somali: 'Somalis carry Horn-of-Africa fineness with narrower noses.' }
  },
  Ethiopian: {
    cues: ['Horn-of-Africa: fine, sculpted features', 'Narrow, high-bridged nose', 'Large almond eyes with striking lashes', 'Copper-to-brown skin, soft-curled hair'],
    confused: { Somali: 'Extremely close; Somalis trend longer-faced and darker.', Yemeni: 'Yemenis sit across the strait — heavier brows, straighter hair.' }
  },
  Somali: {
    cues: ['Elongated, elegant face — among the world\'s narrowest', 'Thin, straight nose', 'Dark brown skin with smooth even tone', 'High forehead, soft-curled hair'],
    confused: { Ethiopian: 'Ethiopians trend rounder-faced and lighter.', Kenyan: 'Kenyans (Bantu) read broader-nosed and rounder.' }
  },
  Kenyan: {
    cues: ['East-African Bantu: balanced oval face', 'Medium-broad nose, full lips', 'Rich dark-brown skin', 'Rounder features than Horn neighbors'],
    confused: { Ethiopian: 'Ethiopians carry finer Horn features.', Nigerian: 'West Africans trend heavier-jawed and broader-nosed.' }
  },
  Moroccan: {
    cues: ['Maghrebi: Berber-Arab blend, olive-to-tan skin', 'Strong, defined nose with high bridge', 'Dense dark brows over intense eyes', 'Angular cheekbones'],
    confused: { Algerian: 'Nearly identical; Algerians trend slightly fairer.', Spanish: 'Iberians lack the Berber nose strength.' }
  },
  Algerian: {
    cues: ['Berber base with Mediterranean mixture', 'Medium-strong nose, softer than Moroccan average', 'Fair-olive to tan skin range is wide', 'Dark wavy hair'],
    confused: { Moroccan: 'Moroccans trend more rugged-featured.', Tunisian: 'Tunisians read softer and more Mediterranean.' }
  },
  Tunisian: {
    cues: ['Most Mediterranean of the Maghreb', 'Softer, rounder features than Morocco/Algeria', 'Fair-olive skin common', 'Large dark eyes with gentle brow'],
    confused: { Algerian: 'Algerians trend more Berber-angular.', Lebanese: 'Levantines read finer-nosed.' }
  }
};
