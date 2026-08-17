import type { Locale } from "../../i18n/config";

interface PerfumeItemDef {
	name: string;
	brand: string;
	href: string;
	image: string;
	/** Volume in ml, dot-decimal ("1.5"); formatted per locale. */
	ml: string;
	concentration: "EDT" | "EDP" | "Extrait" | "Parfum";
	alt: string;
	notesEn: string[];
	notesRu: string[];
}

interface PerfumeGroupDef {
	labelEn?: string;
	labelRu?: string;
	/** TFW bottle shots are edge-to-edge crops instead of padded contain fits. */
	tfw?: boolean;
	items: PerfumeItemDef[];
}

export interface PerfumeItem {
	name: string;
	brand: string;
	href: string;
	image: string;
	volume: string;
	concentration: string;
	alt: string;
	notes: string[];
}

export interface PerfumeGroup {
	label?: string;
	tfw: boolean;
	items: PerfumeItem[];
}

export interface PerfumeCollectionCopy {
	metaTitle: string;
	metaDescription: string;
	eyebrow: string;
	title: string;
	lead: string;
	sectionAriaLabel: string;
	viewerAriaLabel: string;
	openImageLabel: string;
	groups: PerfumeGroup[];
}

const groups: PerfumeGroupDef[] = [
	{
		items: [
			{
				name: "L’Eau d’Issey Pour Homme",
				brand: "Issey Miyake",
				href: "https://www.fragrantica.com/perfume/Issey-Miyake/L-Eau-d-Issey-Pour-Homme-721.html",
				image: "issey-miyake-hq.jpg",
				ml: "125",
				concentration: "EDT",
				alt: "Issey Miyake L’Eau d’Issey Pour Homme",
				notesEn: [
					"Yuzu, lemon, bergamot, calone",
					"Blue lotus, lily-of-the-valley, nutmeg, saffron",
					"Vetiver, musk, cedar, sandalwood"
				],
				notesRu: [
					"Юдзу, лимон, бергамот, калон",
					"Голубой лотос, ландыш, мускатный орех, шафран",
					"Ветивер, мускус, кедр, сандал"
				]
			},
			{
				name: "H24",
				brand: "Hermès",
				href: "https://www.fragrantica.com/perfume/Hermes/H24-Eau-de-Parfum-75811.html",
				image: "hermes-h24-edp-hq.jpg",
				ml: "30",
				concentration: "EDP",
				alt: "Hermès H24 Eau de Parfum",
				notesEn: ["Oakmoss, clary sage, sclarene, narcissus, rosewood"],
				notesRu: ["Дубовый мох, мускатный шалфей, скларен, нарцисс, палисандр"]
			},
			{
				name: "Light Blue Summer Vibes Pour Homme",
				brand: "Dolce & Gabbana",
				href: "https://www.fragrantica.com/perfume/Dolce-Gabbana/Light-Blue-Pour-Homme-Summer-Vibes-80377.html",
				image: "dg-summer-vibes-hq.jpg",
				ml: "75",
				concentration: "EDT",
				alt: "Dolce & Gabbana Light Blue Pour Homme Summer Vibes",
				notesEn: ["Sicilian lemon", "Cypress", "Amberwood"],
				notesRu: ["Сицилийский лимон", "Кипарис", "Амбровое дерево"]
			},
			{
				name: "Sauvage",
				brand: "Dior",
				href: "https://www.fragrantica.com/perfume/Christian-Dior/Sauvage--31861.html",
				image: "dior-sauvage-hq.jpg",
				ml: "60",
				concentration: "EDT",
				alt: "Dior Sauvage Eau de Toilette",
				notesEn: [
					"Calabrian bergamot, pepper",
					"Sichuan pepper, lavender, patchouli, geranium",
					"Ambroxan, cedar, labdanum"
				],
				notesRu: [
					"Калабрийский бергамот, перец",
					"Сычуаньский перец, лаванда, пачули, герань",
					"Амброксан, кедр, лабданум"
				]
			},
			{
				name: "Layton",
				brand: "Parfums de Marly",
				href: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Layton-39314.html",
				image: "pdm-layton-hq.jpg",
				ml: "10",
				concentration: "EDP",
				alt: "Parfums de Marly Layton",
				notesEn: [
					"Apple, lavender, mandarin, bergamot",
					"Geranium, violet, jasmine",
					"Vanilla, cardamom, sandalwood, guaiac wood"
				],
				notesRu: [
					"Яблоко, лаванда, мандарин, бергамот",
					"Герань, фиалка, жасмин",
					"Ваниль, кардамон, сандал, гваяковое дерево"
				]
			},
			{
				name: "Tender Amber",
				brand: "Zara",
				href: "https://www.fragrantica.com/perfume/Zara/Tender-Amber-84076.html",
				image: "zara-tender-amber-hq.jpg",
				ml: "100",
				concentration: "EDP",
				alt: "Zara Tender Amber",
				notesEn: ["Exotic fruits, blackcurrant", "Rose, tuberose", "Amber"],
				notesRu: ["Экзотические фрукты, чёрная смородина", "Роза, тубероза", "Амбра"]
			},
			{
				name: "Vibrant Leather",
				brand: "Zara",
				href: "https://www.fragrantica.com/perfume/Zara/Vibrant-Leather-Eau-de-Parfum-50122.html",
				image: "zara-vibrant-leather-hq.jpg",
				ml: "60",
				concentration: "EDP",
				alt: "Zara Vibrant Leather Eau de Parfum",
				notesEn: ["Bergamot, lemon", "Leather, bamboo", "Patchouli, papyrus"],
				notesRu: ["Бергамот, лимон", "Кожа, бамбук", "Пачули, папирус"]
			},
			{
				name: "Bogoss Vibrant Leather Winter",
				brand: "Zara",
				href: "https://www.fragrantica.com/perfume/Zara/Vibrant-Leather-Bogoss-Winter-101916.html",
				image: "zara-bogoss-winter-hq.jpg",
				ml: "100",
				concentration: "EDP",
				alt: "Zara Vibrant Leather Bogoss Winter",
				notesEn: [
					"Pineapple, bergamot, lime",
					"Leather, bamboo",
					"Cognac, papyrus, patchouli"
				],
				notesRu: ["Ананас, бергамот, лайм", "Кожа, бамбук", "Коньяк, папирус, пачули"]
			}
		]
	},
	{
		labelEn: "Arabic",
		labelRu: "Арабские",
		items: [
			{
				name: "Atlas",
				brand: "Lattafa",
				href: "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Atlas-89765.html",
				image: "lattafa-atlas-hq.jpg",
				ml: "55",
				concentration: "EDP",
				alt: "Lattafa Atlas",
				notesEn: [
					"Marine notes, salt, lemon",
					"Davana, iris",
					"Ambergris, oakmoss, sandalwood"
				],
				notesRu: [
					"Морские ноты, соль, лимон",
					"Давана, ирис",
					"Серая амбра, дубовый мох, сандал"
				]
			},
			{
				name: "Opulent Dubai",
				brand: "Lattafa",
				href: "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Opulent-Dubai-105609.html",
				image: "lattafa-opulent-dubai-hq.jpg",
				ml: "100",
				concentration: "EDP",
				alt: "Lattafa Opulent Dubai",
				notesEn: [
					"Mango, grapefruit, lemon, ginger",
					"Jasmine, cedar, violet",
					"Woody notes, ambergris, oakmoss, benzoin"
				],
				notesRu: [
					"Манго, грейпфрут, лимон, имбирь",
					"Жасмин, кедр, фиалка",
					"Древесные ноты, серая амбра, дубовый мох, бензоин"
				]
			},
			{
				name: "Pisa",
				brand: "Lattafa",
				href: "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Pisa-99140.html",
				image: "lattafa-pisa-hq.jpg",
				ml: "100",
				concentration: "EDP",
				alt: "Lattafa Pisa",
				notesEn: ["Mandarin, lemon, bergamot", "Cedar", "Sandalwood, amber"],
				notesRu: ["Мандарин, лимон, бергамот", "Кедр", "Сандал, амбра"]
			},
			{
				name: "Asad",
				brand: "Lattafa",
				href: "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Asad-72821.html",
				image: "lattafa-asad-hq.jpg",
				ml: "100",
				concentration: "EDP",
				alt: "Lattafa Asad",
				notesEn: [
					"Black pepper, pineapple, tobacco",
					"Patchouli, coffee, iris",
					"Vanilla, amber, dry wood, benzoin"
				],
				notesRu: [
					"Чёрный перец, ананас, табак",
					"Пачули, кофе, ирис",
					"Ваниль, амбра, сухое дерево, бензоин"
				]
			},
			{
				name: "Genesis Pisces",
				brand: "French Avenue",
				href: "https://www.fragrantica.com/perfume/French-Avenue/Pisces-107912.html",
				image: "french-avenue-pisces-hq.jpg",
				ml: "100",
				concentration: "EDP",
				alt: "French Avenue Pisces",
				notesEn: [
					"Margarita, cardamom, blackcurrant",
					"Juniper berries, ginger",
					"Vetiver, tonka bean, patchouli"
				],
				notesRu: [
					"Маргарита, кардамон, чёрная смородина",
					"Ягоды можжевельника, имбирь",
					"Ветивер, бобы тонка, пачули"
				]
			},
			{
				name: "Safari Breeze",
				brand: "French Avenue",
				href: "https://www.fragrantica.com/perfume/French-Avenue/Safari-Breeze-118019.html",
				image: "french-avenue-safari-breeze-hq.jpg",
				ml: "100",
				concentration: "Extrait",
				alt: "French Avenue Safari Breeze",
				notesEn: [
					"Grapefruit, blackcurrant, coconut",
					"Spearmint, jasmine",
					"Vetiver, amber, oakmoss"
				],
				notesRu: [
					"Грейпфрут, чёрная смородина, кокос",
					"Мята колосистая, жасмин",
					"Ветивер, амбра, дубовый мох"
				]
			},
			{
				name: "Turathi Blue",
				brand: "Afnan",
				href: "https://www.fragrantica.com/perfume/Afnan/Turathi-Blue-70839.html",
				image: "afnan-turathi-blue-hq.jpg",
				ml: "90",
				concentration: "EDP",
				alt: "Afnan Turathi Blue",
				notesEn: ["Citruses", "Woody notes, amber", "Musk, spices, patchouli"],
				notesRu: ["Цитрусы", "Древесные ноты, амбра", "Мускус, специи, пачули"]
			},
			{
				name: "Freeze",
				brand: "Riiffs",
				href: "https://www.fragrantica.com/perfume/Riiffs-Perfumes/Freeze-118093.html",
				image: "riiffs-freeze-hq.jpg",
				ml: "100",
				concentration: "Extrait",
				alt: "Riiffs Freeze",
				notesEn: [
					"Mint, bergamot, grapefruit, snow",
					"Ice, tea, ginger, sage",
					"Ambermax, peony, cedar"
				],
				notesRu: [
					"Мята, бергамот, грейпфрут, снег",
					"Лёд, чай, имбирь, шалфей",
					"Амбермакс, пион, кедр"
				]
			},
			{
				name: "Pacific Aura",
				brand: "Rayhaan",
				href: "https://www.fragrantica.com/perfume/Rayhaan/Pacific-Aura-109709.html",
				image: "rayhaan-pacific-aura-hq.jpg",
				ml: "100",
				concentration: "EDP",
				alt: "Rayhaan Pacific Aura",
				notesEn: [
					"Mandarin, mint, bergamot, blackcurrant",
					"Basil, carrot seeds, rose",
					"Fig, ambroxan, amber"
				],
				notesRu: [
					"Мандарин, мята, бергамот, чёрная смородина",
					"Базилик, семена моркови, роза",
					"Инжир, амброксан, амбра"
				]
			},
			{
				name: "No. 16 Faded",
				brand: "Arcadia by Amna",
				href: "https://www.fragrantica.com/perfume/Arcadia/No-16-Faded-82618.html",
				image: "arcadia-faded-hq.jpg",
				ml: "5",
				concentration: "EDP",
				alt: "Arcadia No. 16 Faded",
				notesEn: [
					"Coriander, cardamom, rosewood, cinnamon",
					"Sage, leather, rose, hedione",
					"Cypriol, patchouli, incense, tobacco"
				],
				notesRu: [
					"Кориандр, кардамон, палисандр, корица",
					"Шалфей, кожа, роза, гедион",
					"Циприол, пачули, ладан, табак"
				]
			}
		]
	},
	{
		labelEn: "Samples",
		labelRu: "Пробники",
		items: [
			{
				name: "Blu Mare",
				brand: "Giardini di Toscana",
				href: "https://www.fragrantica.com/perfume/Giardini-Di-Toscana/Blu-Mare-92752.html",
				image: "giardini-blu-mare-hq.jpg",
				ml: "2",
				concentration: "EDP",
				alt: "Giardini di Toscana Blu Mare",
				notesEn: [
					"Bergamot, lemon, grapefruit, pink pepper",
					"Marine accord, cypress",
					"Ambergris, oakmoss"
				],
				notesRu: [
					"Бергамот, лимон, грейпфрут, розовый перец",
					"Морской аккорд, кипарис",
					"Серая амбра, дубовый мох"
				]
			},
			{
				name: "Abu Dhabi",
				brand: "Gallivant",
				href: "https://www.fragrantica.com/perfume/Gallivant/Abu-Dhabi-76841.html",
				image: "gallivant-abu-dhabi-hq.jpg",
				ml: "2",
				concentration: "EDP",
				alt: "Gallivant Abu Dhabi",
				notesEn: [
					"Cypress, pink pepper, mint, rosemary",
					"Clary sage, saffron, geranium, iris",
					"Cedar, patchouli, leather, musk"
				],
				notesRu: [
					"Кипарис, розовый перец, мята, розмарин",
					"Мускатный шалфей, шафран, герань, ирис",
					"Кедр, пачули, кожа, мускус"
				]
			},
			{
				name: "Los Angeles",
				brand: "Gallivant",
				href: "https://www.fragrantica.com/perfume/Gallivant/Los-Angeles-56369.html",
				image: "gallivant-los-angeles-hq.jpg",
				ml: "2",
				concentration: "EDP",
				alt: "Gallivant Los Angeles",
				notesEn: [
					"Pineapple, eucalyptus, clary sage, mandarin",
					"Tuberose, marine notes, narcissus",
					"Cypriol, musk, guaiac wood, heliotrope"
				],
				notesRu: [
					"Ананас, эвкалипт, мускатный шалфей, мандарин",
					"Тубероза, морские ноты, нарцисс",
					"Циприол, мускус, гваяковое дерево, гелиотроп"
				]
			},
			{
				name: "Néroli Botanica",
				brand: "Essential Parfums",
				href: "https://www.fragrantica.com/perfume/Essential-Parfums/Neroli-Botanica-90834.html",
				image: "essential-neroli-botanica-hq.jpg",
				ml: "2",
				concentration: "EDP",
				alt: "Essential Parfums Néroli Botanica",
				notesEn: [
					"Ginger, pink pepper, turmeric, black pepper",
					"Neroli, jasmine, orange blossom",
					"Vetiver, sandalwood, benzoin"
				],
				notesRu: [
					"Имбирь, розовый перец, куркума, чёрный перец",
					"Нероли, жасмин, флёрдоранж",
					"Ветивер, сандал, бензоин"
				]
			},
			{
				name: "Aurner",
				brand: "Aesop",
				href: "https://www.fragrantica.com/perfume/Aesop/Aurner-102299.html",
				image: "aesop-aurner-hq.jpg",
				ml: "2",
				concentration: "EDP",
				alt: "Aesop Aurner",
				notesEn: [
					"Roman chamomile, cardamom, pink pepper",
					"Magnolia leaf, geranium, cardamom",
					"Sandalwood, cedar, cypriol"
				],
				notesRu: [
					"Римская ромашка, кардамон, розовый перец",
					"Лист магнолии, герань, кардамон",
					"Сандал, кедр, циприол"
				]
			},
			{
				name: "Tales of Amber",
				brand: "Goldfield & Banks",
				href: "https://www.fragrantica.com/perfume/Goldfield-Banks-Australia/Tales-of-Amber-111767.html",
				image: "goldfield-tales-of-amber-hq.jpg",
				ml: "2",
				concentration: "Extrait",
				alt: "Goldfield & Banks Tales of Amber",
				notesEn: [
					"Orange blossom, moss",
					"Orris, cinnamon, musk",
					"Labdanum, ambergris, oud"
				],
				notesRu: [
					"Флёрдоранж, мох",
					"Ирис, корица, мускус",
					"Лабданум, серая амбра, уд"
				]
			},
			{
				name: "Silky Woods Elixir",
				brand: "Goldfield & Banks",
				href: "https://www.fragrantica.com/perfume/Goldfield-Banks-Australia/Silky-Woods-Elixir-87428.html",
				image: "goldfield-silky-woods-elixir-hq.jpg",
				ml: "2",
				concentration: "Extrait",
				alt: "Goldfield & Banks Silky Woods Elixir",
				notesEn: [
					"Fig, saffron",
					"Orris, caramel, praline",
					"Oud, vanilla, guaiac wood"
				],
				notesRu: [
					"Инжир, шафран",
					"Ирис, карамель, пралине",
					"Уд, ваниль, гваяковое дерево"
				]
			},
			{
				name: "Oud for Greatness Neo",
				brand: "Initio Parfums Privés",
				href: "https://www.fragrantica.com/perfume/Initio-Parfums-Prives/Oud-for-Greatness-Neo-93090.html",
				image: "initio-oud-greatness-neo-hq.jpg",
				ml: "1.5",
				concentration: "EDP",
				alt: "Initio Parfums Privés Oud for Greatness Neo",
				notesEn: ["Oud, bergamot", "Lavender, saffron", "Fir balsam, musk"],
				notesRu: ["Уд, бергамот", "Лаванда, шафран", "Пихтовый бальзам, мускус"]
			},
			{
				name: "Hacivat",
				brand: "Nishane",
				href: "https://www.fragrantica.com/perfume/Nishane/Hacivat-44174.html",
				image: "nishane-hacivat-hq.jpg",
				ml: "1.5",
				concentration: "Extrait",
				alt: "Nishane Hacivat",
				notesEn: [
					"Pineapple, grapefruit, bergamot",
					"Cedar, patchouli, jasmine",
					"Oakmoss, woody notes"
				],
				notesRu: [
					"Ананас, грейпфрут, бергамот",
					"Кедр, пачули, жасмин",
					"Дубовый мох, древесные ноты"
				]
			},
			{
				name: "Between Two Trees",
				brand: "Floraïku",
				href: "https://www.fragrantica.com/perfume/Floraiku/Between-Two-Trees-46172.html",
				image: "floraiku-between-two-trees-hq.jpg",
				ml: "1.5",
				concentration: "EDP",
				alt: "Floraïku Between Two Trees",
				notesEn: [
					"White grapefruit, lime, juniper berries, pink pepper",
					"Ginger, mate, cardamom",
					"Vetiver, leather, cedar, labdanum"
				],
				notesRu: [
					"Белый грейпфрут, лайм, ягоды можжевельника, розовый перец",
					"Имбирь, мате, кардамон",
					"Ветивер, кожа, кедр, лабданум"
				]
			},
			{
				name: "Sand and Skin",
				brand: "Floraïku",
				href: "https://www.fragrantica.com/perfume/Floraiku/Sand-and-Skin-79180.html",
				image: "floraiku-sand-and-skin-hq.jpg",
				ml: "1.5",
				concentration: "EDP",
				alt: "Floraïku Sand and Skin",
				notesEn: [
					"Lisylang, mahonial",
					"Ylang-ylang, sandalwood, patchouli, cedar",
					"Madagascar vanilla, benzoin, labdanum"
				],
				notesRu: [
					"Лизиланг, махониал",
					"Иланг-иланг, сандал, пачули, кедр",
					"Мадагаскарская ваниль, бензоин, лабданум"
				]
			},
			{
				name: "Layton Exclusif",
				brand: "Parfums de Marly",
				href: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Layton-Exclusif-46633.html",
				image: "pdm-layton-exclusif-hq.jpg",
				ml: "1.5",
				concentration: "Parfum",
				alt: "Parfums de Marly Layton Exclusif",
				notesEn: [
					"Almond, mandarin, bergamot, aquatic notes",
					"Civet, geranium, gardenia, water lily",
					"Oud, coffee, vanilla, sandalwood"
				],
				notesRu: [
					"Миндаль, мандарин, бергамот, водные ноты",
					"Цивет, герань, гардения, водяная лилия",
					"Уд, кофе, ваниль, сандал"
				]
			}
		]
	},
	{
		labelEn: "The Fragrance World",
		labelRu: "The Fragrance World",
		tfw: true,
		items: [
			{
				name: "Fabulous",
				brand: "Tom Ford Fucking Fabulous",
				href: "https://thefragranceworld.co.uk/product/fabulous/",
				image: "tfw-fabulous-notes.webp",
				ml: "100",
				concentration: "Parfum",
				alt: "The Fragrance World Fabulous",
				notesEn: ["Lavender, almond, clary sage", "Cashmeran, iris", "Leather, amber, tonka"],
				notesRu: ["Лаванда, миндаль, мускатный шалфей", "Кашмеран, ирис", "Кожа, амбра, тонка"]
			},
			{
				name: "Stronger Together",
				brand: "Giorgio Armani Stronger With You",
				href: "https://thefragranceworld.co.uk/product/stronger-together/",
				image: "tfw-stronger-together-notes.webp",
				ml: "50",
				concentration: "Parfum",
				alt: "The Fragrance World Stronger Together",
				notesEn: ["Cardamom, pink pepper", "Sage, lavender", "Chestnut, vanilla, amber"],
				notesRu: ["Кардамон, розовый перец", "Шалфей, лаванда", "Каштан, ваниль, амбра"]
			},
			{
				name: "Mystical",
				brand: "Byredo Gypsy Water",
				href: "https://thefragranceworld.co.uk/product/mystical/",
				image: "tfw-mystical-notes.webp",
				ml: "50",
				concentration: "Parfum",
				alt: "The Fragrance World Mystical",
				notesEn: [
					"Bergamot, lemon, pepper",
					"Pine needles, juniper, iris",
					"Amber, sandalwood, vanilla"
				],
				notesRu: [
					"Бергамот, лимон, перец",
					"Сосновая хвоя, можжевельник, ирис",
					"Амбра, сандал, ваниль"
				]
			},
			{
				name: "TV",
				brand: "Tom Ford Tobacco Vanille",
				href: "https://thefragranceworld.co.uk/product/tv/",
				image: "tfw-tv-notes.webp",
				ml: "50",
				concentration: "Parfum",
				alt: "The Fragrance World TV",
				notesEn: [
					"Tobacco leaf, spices",
					"Tonka, vanilla, cacao",
					"Dried fruits, woody notes, amber"
				],
				notesRu: [
					"Табачный лист, специи",
					"Тонка, ваниль, какао",
					"Сухофрукты, древесные ноты, амбра"
				]
			},
			{
				name: "Ombre",
				brand: "Tom Ford Ombré Leather",
				href: "https://thefragranceworld.co.uk/product/ombre/",
				image: "tfw-ombre-notes.webp",
				ml: "50",
				concentration: "Parfum",
				alt: "The Fragrance World Ombre",
				notesEn: ["Leather, cardamom, jasmine", "Patchouli, vetiver", "Amber, woody notes, moss"],
				notesRu: ["Кожа, кардамон, жасмин", "Пачули, ветивер", "Амбра, древесные ноты, мох"]
			},
			{
				name: "Cherry Fume",
				brand: "Tom Ford Cherry Smoke",
				href: "https://thefragranceworld.co.uk/product/cherry-fume/",
				image: "tfw-cherry-fume-notes.webp",
				ml: "50",
				concentration: "Parfum",
				alt: "The Fragrance World Cherry Fume",
				notesEn: ["Cherry, bitter almond", "Smoke, oud", "Benzoin, tonka, woody amber"],
				notesRu: ["Вишня, горький миндаль", "Дым, уд", "Бензоин, тонка, древесная амбра"]
			}
		]
	},
	{
		labelEn: "Large samples",
		labelRu: "Большие пробники",
		tfw: true,
		items: [
			{
				name: "Gorgeous Vanilla",
				brand: "Tom Ford Vanille Fatale",
				href: "https://thefragranceworld.co.uk/product/gorgeous-vanilla/",
				image: "tfw-gorgeous-vanilla-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Gorgeous Vanilla",
				notesEn: ["Vanilla, brown sugar", "Tonka, orchid", "Amber, musk, sandalwood"],
				notesRu: ["Ваниль, коричневый сахар", "Тонка, орхидея", "Амбра, мускус, сандал"]
			},
			{
				name: "Soleil",
				brand: "Tom Ford Soleil Blanc",
				href: "https://thefragranceworld.co.uk/product/soleil/",
				image: "tfw-soleil-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Soleil",
				notesEn: [
					"Bergamot, cardamom, ylang-ylang",
					"Tuberose, coconut milk",
					"Amber, benzoin, musk"
				],
				notesRu: [
					"Бергамот, кардамон, иланг-иланг",
					"Тубероза, кокосовое молоко",
					"Амбра, бензоин, мускус"
				]
			},
			{
				name: "Ispahan",
				brand: "Dior Oud Ispahan",
				href: "https://thefragranceworld.co.uk/product/ispahan/",
				image: "tfw-ispahan-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Ispahan",
				notesEn: ["Rose, saffron", "Oud, labdanum", "Amber, sandalwood, vetiver"],
				notesRu: ["Роза, шафран", "Уд, лабданум", "Амбра, сандал, ветивер"]
			},
			{
				name: "Pura",
				brand: "Xerjoff Erba Pura",
				href: "https://thefragranceworld.co.uk/product/pura/",
				image: "tfw-pura-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Pura",
				notesEn: [
					"Orange, lemon, bergamot",
					"White peach, jasmine",
					"Vanilla, white musk, amber"
				],
				notesRu: [
					"Апельсин, лимон, бергамот",
					"Белый персик, жасмин",
					"Ваниль, белый мускус, амбра"
				]
			},
			{
				name: "Pomegranate",
				brand: "Jo Malone Pomegranate Noir",
				href: "https://thefragranceworld.co.uk/product/pomegranate/",
				image: "tfw-pomegranate-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Pomegranate",
				notesEn: [
					"Pomegranate, raspberry",
					"Casablanca lily, pink pepper",
					"Patchouli, musk, guaiac"
				],
				notesRu: [
					"Гранат, малина",
					"Лилия касабланка, розовый перец",
					"Пачули, мускус, гваяк"
				]
			},
			{
				name: "Peach",
				brand: "Tom Ford Bitter Peach",
				href: "https://thefragranceworld.co.uk/product/peach/",
				image: "tfw-peach-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Peach",
				notesEn: [
					"Peach, blood orange",
					"Rum, davana, heliotrope",
					"Cashmeran, sandalwood, vanilla"
				],
				notesRu: [
					"Персик, красный апельсин",
					"Ром, давана, гелиотроп",
					"Кашмеран, сандал, ваниль"
				]
			},
			{
				name: "Greatness",
				brand: "Initio Oud for Greatness",
				href: "https://thefragranceworld.co.uk/product/greatness/",
				image: "tfw-greatness-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Greatness",
				notesEn: ["Saffron, lavender, nutmeg", "Oud, agarwood", "Musk, sandalwood, amber"],
				notesRu: ["Шафран, лаванда, мускатный орех", "Уд, агаровое дерево", "Мускус, сандал, амбра"]
			},
			{
				name: "Symptom",
				brand: "Initio Side Effect",
				href: "https://thefragranceworld.co.uk/product/symptom/",
				image: "tfw-symptom-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Symptom",
				notesEn: ["Rum, cinnamon", "Vanilla, tobacco, dark chocolate", "Oud, musk, amber"],
				notesRu: ["Ром, корица", "Ваниль, табак, тёмный шоколад", "Уд, мускус, амбра"]
			},
			{
				name: "Brave",
				brand: "Rabanne Invictus",
				href: "https://thefragranceworld.co.uk/product/brave/",
				image: "tfw-brave-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Brave",
				notesEn: ["Grapefruit, mandarin", "Bay leaf, guaiac wood", "Amber, musk, oakmoss"],
				notesRu: ["Грейпфрут, мандарин", "Лавровый лист, гваяковое дерево", "Амбра, мускус, дубовый мох"]
			},
			{
				name: "33",
				brand: "Le Labo Santal 33",
				href: "https://thefragranceworld.co.uk/product/33/",
				image: "tfw-33-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World 33",
				notesEn: ["Violet, cardamom", "Iris, papyrus, ambrox", "Cedar, leather, sandalwood"],
				notesRu: ["Фиалка, кардамон", "Ирис, папирус, амброкс", "Кедр, кожа, сандал"]
			},
			{
				name: "Statement",
				brand: "Hermès Terre d’Hermès",
				href: "https://thefragranceworld.co.uk/product/statement/",
				image: "tfw-statement-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Statement",
				notesEn: [
					"Orange, grapefruit, pepper",
					"Geranium, patchouli, benzoin",
					"Vetiver, cedar"
				],
				notesRu: [
					"Апельсин, грейпфрут, перец",
					"Герань, пачули, бензоин",
					"Ветивер, кедр"
				]
			},
			{
				name: "Myrrh",
				brand: "Jo Malone Myrrh & Tonka",
				href: "https://thefragranceworld.co.uk/product/myrrh/",
				image: "tfw-myrrh-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Myrrh",
				notesEn: ["Lavender, myrrh", "Tonka, vanilla, almond", "Sandalwood, musk, amber"],
				notesRu: ["Лаванда, мирра", "Тонка, ваниль, миндаль", "Сандал, мускус, амбра"]
			},
			{
				name: "Sunset",
				brand: "Maison Margiela Replica Beach Walk",
				href: "https://thefragranceworld.co.uk/product/sunset/",
				image: "tfw-sunset-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Sunset",
				notesEn: [
					"Bergamot, lemon, pink pepper",
					"Coconut milk, ylang-ylang, iris",
					"Musk, benzoin, cedar"
				],
				notesRu: [
					"Бергамот, лимон, розовый перец",
					"Кокосовое молоко, иланг-иланг, ирис",
					"Мускус, бензоин, кедр"
				]
			},
			{
				name: "Smoked",
				brand: "Viktor&Rolf Spicebomb",
				href: "https://thefragranceworld.co.uk/product/smoked/",
				image: "tfw-smoked-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Smoked",
				notesEn: [
					"Grapefruit, pink pepper, chili",
					"Saffron, cinnamon, paprika",
					"Tobacco, vetiver, leather"
				],
				notesRu: [
					"Грейпфрут, розовый перец, чили",
					"Шафран, корица, паприка",
					"Табак, ветивер, кожа"
				]
			},
			{
				name: "Gentle",
				brand: "Maison Francis Kurkdjian Gentle Fluidity",
				href: "https://thefragranceworld.co.uk/product/gentle/",
				image: "tfw-gentle-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Gentle",
				notesEn: [
					"Juniper, coriander, nutmeg",
					"Amber, iris, musk",
					"Vanilla, sandalwood, cedar"
				],
				notesRu: [
					"Можжевельник, кориандр, мускатный орех",
					"Амбра, ирис, мускус",
					"Ваниль, сандал, кедр"
				]
			},
			{
				name: "Luna",
				brand: "Prada Luna Rossa",
				href: "https://thefragranceworld.co.uk/product/luna/",
				image: "tfw-luna-notes.webp",
				ml: "5",
				concentration: "Parfum",
				alt: "The Fragrance World Luna",
				notesEn: [
					"Lavender, clary sage",
					"Ambroxan, iris, metallic notes",
					"Cedar, musk, amber"
				],
				notesRu: [
					"Лаванда, мускатный шалфей",
					"Амброксан, ирис, металлические ноты",
					"Кедр, мускус, амбра"
				]
			}
		]
	}
];

const formatVolume = (ml: string, locale: Locale): string =>
	locale === "ru" ? `${ml.replace(".", ",")} мл` : `${ml} ml`;

const copyByLocale = {
	en: {
		metaTitle: "My perfume collection",
		metaDescription: "A simple list I made to keep track of what's in stock.",
		eyebrow: "Design",
		title: "My perfume collection",
		lead: "The list changes all the time — I buy some things and sell others. As of the last site update there are 52 items in the set (24 bottles and 28 samples). The long-term goal isn't to pile up a bit of everything, but to find what I truly like and keep about ten.",
		sectionAriaLabel: "Perfume collection",
		viewerAriaLabel: "Image viewer",
		openImageLabel: "Open image:"
	},
	ru: {
		metaTitle: "Коллекция парфюмов",
		metaDescription: "Простой список, который я сделал, чтобы отслеживать, что у меня сейчас есть.",
		eyebrow: "Дизайн",
		title: "Коллекция парфюмов",
		lead: "Список регулярно меняется, что-то покупаю, что-то продаю. На момент последнего обновления сайта в наборе 52 штуки (24 флакона и 28 пробников). Долгосрочная цель — не собрать побольше всего подряд, а найти то, что нравится, и оставить штук десять.",
		sectionAriaLabel: "Парфюмерная коллекция",
		viewerAriaLabel: "Просмотр изображения",
		openImageLabel: "Открыть изображение:"
	}
} as const;

export const getPerfumeCollection = (locale: Locale): PerfumeCollectionCopy => {
	const copy = copyByLocale[locale === "ru" ? "ru" : "en"];

	return {
		...copy,
		groups: groups.map((group) => ({
			label: locale === "ru" ? group.labelRu : group.labelEn,
			tfw: group.tfw ?? false,
			items: group.items.map((item) => ({
				name: item.name,
				brand: item.brand,
				href: item.href,
				image: item.image,
				volume: formatVolume(item.ml, locale),
				concentration: item.concentration,
				alt: item.alt,
				notes: locale === "ru" ? item.notesRu : item.notesEn
			}))
		}))
	};
};
