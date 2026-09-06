import ethnicWearImage from '@assets/generated_images/meridian-ethnic-wear.png';
import westernDressesImage from '@assets/generated_images/meridian-western-dresses.png';
import menswearImage from '@assets/generated_images/meridian-menswear.png';
import footwearImage from '@assets/generated_images/meridian-footwear.png';
import homeDecorImage from '@assets/generated_images/meridian-home-decor.png';
import beautyImage from '@assets/generated_images/meridian-beauty.png';
import accessoriesImage from '@assets/generated_images/meridian-accessories.png';
import jewelleryImage from '@assets/generated_images/meridian-jewellery.png';
import kidsImage from '@assets/generated_images/meridian-kids.png';
import gadgetsImage from '@assets/generated_images/meridian-gadgets.png';
import heroBannerImage from '@assets/generated_images/meridian-hero-banner.png';
import saleBannerImage from '@assets/generated_images/meridian-sale-banner.png';
import titanWatchImage from '@assets/w-1_1788324363931.webp';
import fossilWatchImage from '@assets/w-2_1788324363931.webp';
import casioWatchImage from '@assets/w-3_1788324363932.webp';
import guessWatchImage from '@assets/w-4_1788324363932.webp';
import kurtasImage from '@assets/ws1_1788324363932.webp';
import topsImage from '@assets/ws2_1788324363933.webp';
import dressesImage from '@assets/ws3_1788324363933.webp';
import womensFootwearImage from '@assets/ws4_1788324363934.webp';
import casualShirtsImage from '@assets/ws6_1788324363934.webp';
import formalShirtsImage from '@assets/ws7webp_1788324363934.webp';
import beautyCatalogImage from '@assets/ws8_1788324363935.webp';
import mensPlaidImage from '@assets/zcstock-images-03_1788324363936.webp';
import mensSweatshirtImage from '@assets/zcstock-images-05_1788324363937.webp';
import denimJacketImage from '@assets/zcstock-images-06_1788324363937.webp';
import blueJeansImage from '@assets/zcstock-images-07_(1)_1788324363937.webp';
import blueJeansAltImage from '@assets/zcstock-images-07_1788324363938.webp';
import tailoredTrousersImage from '@assets/zcstock-images-09_1788324363938.webp';
import kidsShortsImage from '@assets/zcstock-images-10_1788324363938.webp';
import blackJoggersImage from '@assets/zcstock-images-11_1788324363939.webp';
import pinkBlazerImage from '@assets/zcstock-images-42_1788324363939.webp';
import arkiaPinkSareeImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.28_AM23_1788460627027.jpeg';
import kurtiDesignJaipurImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.27_AM19_1788460627029.jpeg';
import maaKrupaOliveImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.27_AM9_1788460627030.jpeg';
import maaKrupaIvoryImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.27_AM8_1788460627030.jpeg';
import pinkRoseSareeImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.27_AM6_1788460627032.jpeg';
import printStudioImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.26_AM5_1788460627033.jpeg';
import tehzeebImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.26_AM4_1788460627033.jpeg';
import arkiaLimeSareeImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.25_AM4_1788460627034.jpeg';
import vedaantiCropTopImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.25_AM3_1788460627035.jpeg';
import ludmurySetImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.25_AM2_1788460627035.jpeg';
import mnrAnarkaliImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.24_AM1_1788460627036.jpeg';
import stylyumDressImage from '@assets/WhatsApp_Image_2026-09-04_at_12.02.24_AM_1788460627036.jpeg';
import bellaVitaDateWomanImage from '@assets/meridian_catalog_cleaned/bella-vita-date-woman.png';
import bellaVitaCeoManImage from '@assets/meridian_catalog_cleaned/bella-vita-ceo-man.png';
import frenchEssenceBloomOudImage from '@assets/meridian_catalog_cleaned/french-essence-bloom-oud.png';
import marquisaKurtaSetImage from '@assets/meridian_catalog_cleaned/marquisa-kurta-set.png';
import kaliniPrintedSetImage from '@assets/meridian_catalog_cleaned/kalini-cotton-set.png';
import sangriaEmbroideredTunicImage from '@assets/meridian_catalog_cleaned/sangria-tunic.png';
import glitchezWindcheaterImage from '@assets/meridian_catalog_cleaned/glitchez-windcheater.png';
import roadsterStripedTopImage from '@assets/meridian_catalog_cleaned/roadster-striped-top.png';

export type Category = 'Women' | 'Men' | 'Kids' | 'Beauty' | 'Home' | 'Footwear' | 'Accessories' | 'Jewellery' | 'Gadgets';

export type Product = {
  id: string;
  name: string;
  store: string;
  vendorId: string;
  category: Category;
  price: number;
  compareAt?: number;
  image: string;
  alt: string;
  colors: string[];
  sizes?: string[];
  description: string;
  badge?: string;
  rating: number;
  reviews: number;
  featured?: boolean;
};

export type Vendor = {
  id: string;
  name: string;
  handle: string;
  city: string;
  story: string;
  image: string;
  avatar: string;
  category: string;
  products: number;
};

export type CartLine = { productId: string; quantity: number; size?: string; color?: string };

export const heroImage = heroBannerImage;
export const saleImage = saleBannerImage;
export const womenEditImage = westernDressesImage;
export const menEditImage = menswearImage;

export const categories = [
  { label: 'Ethnic Wear', value: 'Women', image: kurtasImage },
  { label: 'Kurtas & Kurtis', value: 'Women', image: kurtasImage },
  { label: 'Western Dresses', value: 'Women', image: dressesImage },
  { label: 'Tops & Tees', value: 'Women', image: topsImage },
  { label: 'Menswear', value: 'Men', image: casualShirtsImage },
  { label: 'Casual Shirts', value: 'Men', image: casualShirtsImage },
  { label: 'Formal Shirts', value: 'Men', image: formalShirtsImage },
  { label: 'Footwear', value: 'Footwear', image: womensFootwearImage },
  { label: 'Home Decor', value: 'Home', image: homeDecorImage },
  { label: 'Beauty', value: 'Beauty', image: beautyCatalogImage },
  { label: 'Watches', value: 'Accessories', image: titanWatchImage },
  { label: 'Jewellery', value: 'Jewellery', image: jewelleryImage },
  { label: 'Kids', value: 'Kids', image: kidsShortsImage },
  { label: 'Gadgets', value: 'Gadgets', image: gadgetsImage },
];

export const vendors: Vendor[] = [
  { id: 'ethnic-house', name: 'Ethnic House', handle: 'ethnic-house', city: 'Jaipur, Rajasthan', category: 'Indian occasion wear', products: 1240, image: ethnicWearImage, avatar: 'EH', story: 'Hand-finished festive silhouettes rooted in India’s craft traditions.' },
  { id: 'urban-gentleman', name: 'Urban Gentleman', handle: 'urban-gentleman', city: 'Bengaluru, Karnataka', category: 'Modern menswear', products: 860, image: menswearImage, avatar: 'UG', story: 'Everyday tailoring and easy layers for a life in motion.' },
  { id: 'style-studio', name: 'Style Studio', handle: 'style-studio', city: 'Mumbai, Maharashtra', category: 'Contemporary fashion', products: 980, image: westernDressesImage, avatar: 'SS', story: 'Statement dressing, clean lines, and a little more colour in every day.' },
  { id: 'weaves-and-more', name: 'Weaves & More', handle: 'weaves-and-more', city: 'Varanasi, Uttar Pradesh', category: 'Handloom & sarees', products: 540, image: ethnicWearImage, avatar: 'WM', story: 'Timeless weaves sourced directly from independent Indian artisans.' },
  { id: 'beauty-hub', name: 'Beauty Hub', handle: 'beauty-hub', city: 'New Delhi, Delhi', category: 'Beauty & body', products: 620, image: beautyImage, avatar: 'BH', story: 'Modern formulas and small rituals for skin that feels like your own.' },
  { id: 'home-comforts', name: 'Home Comforts', handle: 'home-comforts', city: 'Kochi, Kerala', category: 'Home & living', products: 390, image: homeDecorImage, avatar: 'HC', story: 'Warm, useful pieces that make your home feel more lived in.' },
];

const catalogProductImages: Record<string, string> = {
  'floral-maxi-dress': westernDressesImage,
  'slim-fit-cotton-shirt': menswearImage,
  'embroidered-kurta-set': ethnicWearImage,
  'classic-leather-watch': titanWatchImage,
  'casual-sneakers': footwearImage,
  'banarasi-silk-saree': ethnicWearImage,
  'trendy-backpack': accessoriesImage,
  'luxury-eau-de-parfum': beautyImage,
  'printed-kurti': ethnicWearImage,
  'straight-fit-jeans': menswearImage,
  'linen-shirt': westernDressesImage,
  'everyday-sandal': footwearImage,
  'rose-gold-hoops': jewelleryImage,
  'woven-table-lamp': homeDecorImage,
  'kids-cotton-set': kidsImage,
  'wireless-earbuds': gadgetsImage,
  'fossil-watch': fossilWatchImage,
  'casio-vintage-watch': casioWatchImage,
  'guess-mesh-watch': guessWatchImage,
  'checked-cotton-shirt': mensPlaidImage,
  'soft-fleece-sweatshirt': mensSweatshirtImage,
  'denim-utility-jacket': denimJacketImage,
  'relaxed-blue-jeans': blueJeansImage,
  'classic-blue-jeans': blueJeansAltImage,
  'tailored-navy-trousers': tailoredTrousersImage,
  'kids-lounge-shorts': kidsShortsImage,
  'black-court-joggers': blackJoggersImage,
  'rose-pink-blazer': pinkBlazerImage,
  'arkia-pink-floral-saree': arkiaPinkSareeImage,
  'kurti-design-jaipur-brown-set': kurtiDesignJaipurImage,
  'maa-krupa-olive-suit': maaKrupaOliveImage,
  'maa-krupa-ivory-suit': maaKrupaIvoryImage,
  'pink-rose-rangoli-saree': pinkRoseSareeImage,
  'print-studio-teal-coord': printStudioImage,
  'tehzeeb-navy-chikankari-set': tehzeebImage,
  'arkia-lime-floral-saree': arkiaLimeSareeImage,
  'vedaanti-lace-crop-top': vedaantiCropTopImage,
  'ludmury-maroon-set': ludmurySetImage,
  'mnr-purple-anarkali-set': mnrAnarkaliImage,
  'stylyum-embroidered-dress': stylyumDressImage,
  'bella-vita-date-woman-perfume': bellaVitaDateWomanImage,
  'bella-vita-ceo-man-perfume': bellaVitaCeoManImage,
  'french-essence-bloom-oud-set': frenchEssenceBloomOudImage,
  'marquisa-gotta-patti-kurta-set': marquisaKurtaSetImage,
  'kalini-mirror-work-cotton-set': kaliniPrintedSetImage,
  'sangria-embroidered-tunic': sangriaEmbroideredTunicImage,
  'glitchez-piping-windcheater': glitchezWindcheaterImage,
  'roadster-striped-shirt-top': roadsterStripedTopImage,
};

export const products: Product[] = ([
  { id: 'floral-maxi-dress', name: 'Floral Printed Maxi Dress', store: 'Style Studio', vendorId: 'style-studio', category: 'Women', price: 899, compareAt: 1299, image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Woman in a softly printed maxi dress', colors: ['Rose', 'Mauve'], sizes: ['S', 'M', 'L', 'XL'], description: 'A floaty floral maxi with a flattering waist and an easy day-to-evening drape.', badge: 'New arrival', rating: 4.4, reviews: 1200, featured: true },
  { id: 'slim-fit-cotton-shirt', name: "Men's Slim Fit Cotton Shirt", store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Men', price: 679, compareAt: 999, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Man wearing a light cotton shirt', colors: ['Sky', 'White'], sizes: ['S', 'M', 'L', 'XL'], description: 'A breathable cotton shirt with a clean slim fit for workdays and weekends.', rating: 4.2, reviews: 890, featured: true },
  { id: 'embroidered-kurta-set', name: 'Embroidered Floral Kurta Set', store: 'Ethnic House', vendorId: 'ethnic-house', category: 'Women', price: 1249, compareAt: 1499, image: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Embroidered festive kurta set', colors: ['Marigold', 'Ivory'], sizes: ['S', 'M', 'L', 'XL'], description: 'A festive kurta set finished with delicate floral embroidery and a soft straight trouser.', badge: 'Festive edit', rating: 4.5, reviews: 2100, featured: true },
  { id: 'classic-leather-watch', name: 'Classic Leather Watch', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Accessories', price: 1599, compareAt: 2499, image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Classic brown leather watch styled with menswear', colors: ['Tan'], description: 'A polished everyday watch with a genuine leather strap and a clean dial.', rating: 4.3, reviews: 560, featured: true },
  { id: 'casual-sneakers', name: 'Women Casual Sneakers', store: 'Style Studio', vendorId: 'style-studio', category: 'Footwear', price: 899, compareAt: 1499, image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Clean white casual sneakers', colors: ['White', 'Sand'], sizes: ['36', '37', '38', '39', '40'], description: 'Cushioned everyday sneakers with a clean low-top profile and a soft neutral palette.', badge: '40% off', rating: 4.4, reviews: 1500, featured: true },
  { id: 'banarasi-silk-saree', name: 'Banarasi Silk Saree', store: 'Weaves & More', vendorId: 'weaves-and-more', category: 'Women', price: 2199, compareAt: 2999, image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Silk saree with a warm botanical print', colors: ['Rust', 'Gold'], description: 'A luminous silk saree with a traditional border and an heirloom-worthy fall.', badge: 'Handloom', rating: 4.6, reviews: 760, featured: true },
  { id: 'trendy-backpack', name: 'Everyday Canvas Backpack', store: 'Style Studio', vendorId: 'style-studio', category: 'Accessories', price: 749, compareAt: 1199, image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Structured tan everyday backpack', colors: ['Tan', 'Black'], description: 'A roomy canvas backpack with considered pockets for commutes and short escapes.', rating: 4.3, reviews: 1100, featured: true },
  { id: 'luxury-eau-de-parfum', name: 'Luxury Eau De Parfum', store: 'Beauty Hub', vendorId: 'beauty-hub', category: 'Beauty', price: 999, compareAt: 1499, image: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Minimal glass perfume bottle', colors: ['Amber'], description: 'A warm, lingering blend of bergamot, sandalwood, and soft vanilla in a sculptural bottle.', badge: 'Bestseller', rating: 4.5, reviews: 980, featured: true },
  { id: 'printed-kurti', name: 'Printed Cotton Kurti', store: 'Ethnic House', vendorId: 'ethnic-house', category: 'Women', price: 599, compareAt: 899, image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Woman wearing a printed cotton kurti', colors: ['Coral', 'Blue'], sizes: ['S', 'M', 'L', 'XL'], description: 'A lightweight cotton kurti with a neat neckline and an easy everyday fit.', rating: 4.4, reviews: 640, featured: true },
  { id: 'straight-fit-jeans', name: 'Classic Straight Fit Jeans', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Men', price: 1199, compareAt: 1799, image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Man wearing relaxed dark jeans', colors: ['Indigo', 'Black'], sizes: ['30', '32', '34', '36'], description: 'A straight-fit denim with a little room through the leg and a lived-in wash.', rating: 4.4, reviews: 430, featured: true },
  { id: 'linen-shirt', name: 'Relaxed Linen Shirt', store: 'Style Studio', vendorId: 'style-studio', category: 'Women', price: 799, compareAt: 1199, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Woman in an ivory linen shirt', colors: ['Ivory', 'Ink'], sizes: ['S', 'M', 'L', 'XL'], description: 'A breathable linen layer with a softly oversized cut for warm-weather dressing.', rating: 4.7, reviews: 320 },
  { id: 'everyday-sandal', name: 'Strappy Everyday Sandals', store: 'Style Studio', vendorId: 'style-studio', category: 'Footwear', price: 799, compareAt: 1199, image: 'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Minimal leather sandals', colors: ['Tan', 'Black'], sizes: ['36', '37', '38', '39', '40'], description: 'A barely-there leather sandal with a cushioned footbed for days on the move.', rating: 4.3, reviews: 270 },
  { id: 'rose-gold-hoops', name: 'Rose Gold Everyday Hoops', store: 'Ethnic House', vendorId: 'ethnic-house', category: 'Jewellery', price: 699, compareAt: 999, image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Delicate gold jewellery styled with fabric', colors: ['Rose gold'], description: 'Lightweight hoops designed to bring a little glow to everyday looks.', rating: 4.6, reviews: 380 },
  { id: 'woven-table-lamp', name: 'Woven Table Lamp', store: 'Home Comforts', vendorId: 'home-comforts', category: 'Home', price: 1299, compareAt: 1899, image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Warm neutral home decor styling', colors: ['Natural'], description: 'A warm woven lamp that throws a gentle pool of light across a bedside or console.', rating: 4.5, reviews: 190 },
  { id: 'kids-cotton-set', name: 'Kids Cotton Co-ord Set', store: 'Style Studio', vendorId: 'style-studio', category: 'Kids', price: 599, compareAt: 899, image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Soft natural kidswear styling', colors: ['Oat', 'Sage'], sizes: ['2-3Y', '4-5Y', '6-7Y'], description: 'A soft cotton set made for play, naps, and every little adventure between.', rating: 4.5, reviews: 210 },
  { id: 'wireless-earbuds', name: 'Pocket Wireless Earbuds', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Gadgets', price: 1499, compareAt: 1999, image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Minimal tech accessory styled on a desk', colors: ['Ivory'], description: 'Compact wireless earbuds with a quiet charging case for commutes and calls.', rating: 4.2, reviews: 510 },
  { id: 'fossil-watch', name: 'Fossil Rose Gold Watch', store: 'Timekeepers', vendorId: 'urban-gentleman', category: 'Accessories', price: 4999, compareAt: 9999, image: fossilWatchImage, alt: 'Fossil rose gold watch in a presentation box', colors: ['Rose gold'], description: 'A polished rose gold watch with a classic dial and an easy everyday shine.', badge: 'Up to 50% off', rating: 4.7, reviews: 840, featured: true },
  { id: 'casio-vintage-watch', name: 'Casio Vintage Digital Watch', store: 'Timekeepers', vendorId: 'urban-gentleman', category: 'Accessories', price: 2299, compareAt: 4599, image: casioWatchImage, alt: 'Casio vintage rose gold digital watch', colors: ['Rose gold'], description: 'A retro digital icon with a warm metallic finish and reliable everyday timing.', badge: 'Up to 50% off', rating: 4.6, reviews: 620, featured: true },
  { id: 'guess-mesh-watch', name: 'Guess Gold Mesh Watch', store: 'Timekeepers', vendorId: 'urban-gentleman', category: 'Accessories', price: 5999, compareAt: 9999, image: guessWatchImage, alt: 'Guess gold mesh fashion watch', colors: ['Gold'], description: 'A sculptural triangular dial and fine mesh strap for an elevated occasion edit.', badge: 'Up to 40% off', rating: 4.5, reviews: 380, featured: true },
  { id: 'checked-cotton-shirt', name: 'Checked Cotton Overshirt', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Men', price: 899, compareAt: 1499, image: mensPlaidImage, alt: 'Man wearing a green checked cotton shirt', colors: ['Forest', 'Navy'], sizes: ['S', 'M', 'L', 'XL'], description: 'A relaxed checked shirt that works as a light layer through changing seasons.', badge: 'New arrival', rating: 4.4, reviews: 330, featured: true },
  { id: 'soft-fleece-sweatshirt', name: 'Everyday Fleece Sweatshirt', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Men', price: 749, compareAt: 1199, image: mensSweatshirtImage, alt: 'Man wearing a white fleece sweatshirt', colors: ['Cloud', 'Ink'], sizes: ['S', 'M', 'L', 'XL'], description: 'A soft fleece essential with a clean shape for relaxed weekends and travel days.', rating: 4.3, reviews: 410, featured: true },
  { id: 'denim-utility-jacket', name: 'Classic Denim Utility Jacket', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Men', price: 1399, compareAt: 2199, image: denimJacketImage, alt: 'Man wearing a blue denim jacket', colors: ['Washed blue'], sizes: ['S', 'M', 'L', 'XL'], description: 'A dependable denim layer with utility pockets and an easy mid-weight feel.', rating: 4.5, reviews: 290, featured: true },
  { id: 'relaxed-blue-jeans', name: 'Relaxed Blue Jeans', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Men', price: 1099, compareAt: 1799, image: blueJeansImage, alt: 'Relaxed blue jeans with white sneakers', colors: ['Mid blue'], sizes: ['30', '32', '34', '36'], description: 'A relaxed denim fit with room to move and a softly faded everyday wash.', rating: 4.4, reviews: 520, featured: true },
  { id: 'classic-blue-jeans', name: 'Classic Straight Blue Jeans', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Men', price: 1199, compareAt: 1999, image: blueJeansAltImage, alt: 'Classic blue straight-leg jeans', colors: ['Blue'], sizes: ['30', '32', '34', '36'], description: 'Straight-leg denim with a clean finish that anchors shirts, tees, and jackets.', rating: 4.3, reviews: 460 },
  { id: 'tailored-navy-trousers', name: 'Tailored Navy Trousers', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Men', price: 1299, compareAt: 1999, image: tailoredTrousersImage, alt: 'Navy tailored trousers styled with brown shoes', colors: ['Navy'], sizes: ['30', '32', '34', '36'], description: 'A sharp tailored trouser with a clean taper for desk-to-dinner dressing.', rating: 4.5, reviews: 240 },
  { id: 'kids-lounge-shorts', name: 'Kids Cotton Lounge Shorts', store: 'Style Studio', vendorId: 'style-studio', category: 'Kids', price: 399, compareAt: 699, image: kidsShortsImage, alt: 'Soft grey cotton shorts for kids', colors: ['Grey', 'Oat'], sizes: ['2-3Y', '4-5Y', '6-7Y'], description: 'Soft cotton shorts made for play days, slow mornings, and everything between.', rating: 4.4, reviews: 180 },
  { id: 'black-court-joggers', name: 'Black Court Joggers', store: 'Urban Gentleman', vendorId: 'urban-gentleman', category: 'Men', price: 999, compareAt: 1499, image: blackJoggersImage, alt: 'Black joggers styled with black sneakers', colors: ['Black'], sizes: ['S', 'M', 'L', 'XL'], description: 'A streamlined jogger with a comfortable stretch waist and an athletic finish.', rating: 4.2, reviews: 310 },
  { id: 'rose-pink-blazer', name: 'Rose Pink Tailored Blazer', store: 'Style Studio', vendorId: 'style-studio', category: 'Women', price: 1799, compareAt: 2999, image: pinkBlazerImage, alt: 'Woman wearing a rose pink tailored blazer', colors: ['Rose'], sizes: ['S', 'M', 'L', 'XL'], description: 'A confident pink blazer with clean tailoring and a softly polished drape.', badge: 'New arrival', rating: 4.6, reviews: 270, featured: true },
  { id: 'arkia-pink-floral-saree', name: 'ArKia Pink Floral Chiffon Saree', store: 'ArKia', vendorId: 'ethnic-house', category: 'Women', price: 1299, compareAt: 2499, image: arkiaPinkSareeImage, alt: 'Pink floral chiffon saree from ArKia', colors: ['Pink'], sizes: ['Free size'], description: 'A graceful pink chiffon saree with handwork details and a statement floral border.', badge: 'Featured brand', rating: 4.6, reviews: 418, featured: true },
  { id: 'kurti-design-jaipur-brown-set', name: 'Jaipur Embroidered Brown 3-Piece Set', store: 'Kurti Design Jaipur', vendorId: 'ethnic-house', category: 'Women', price: 999, compareAt: 1999, image: kurtiDesignJaipurImage, alt: 'Brown embroidered three-piece kurta set', colors: ['Brown'], sizes: ['S', 'M', 'L', 'XL'], description: 'A soft cotton-flex three-piece set finished with elegant embroidery for everyday polish.', badge: 'Featured brand', rating: 4.5, reviews: 356, featured: true },
  { id: 'maa-krupa-olive-suit', name: 'Maa Krupa Olive Embroidered Suit', store: 'Maa Krupa Collection', vendorId: 'ethnic-house', category: 'Women', price: 1149, compareAt: 2299, image: maaKrupaOliveImage, alt: 'Olive green embroidered three-piece suit', colors: ['Olive'], sizes: ['S', 'M', 'L', 'XL'], description: 'A premium georgette suit with delicate beadwork and a softly tailored silhouette.', badge: 'Featured brand', rating: 4.7, reviews: 512, featured: true },
  { id: 'maa-krupa-ivory-suit', name: 'Maa Krupa Ivory Threadwork Suit', store: 'Maa Krupa Collection', vendorId: 'ethnic-house', category: 'Women', price: 1249, compareAt: 2499, image: maaKrupaIvoryImage, alt: 'Ivory embroidered three-piece suit with pink threadwork', colors: ['Ivory', 'Pink'], sizes: ['S', 'M', 'L', 'XL'], description: 'An ivory georgette three-piece set with intricate threadwork and an elegant dupatta.', badge: 'Featured brand', rating: 4.6, reviews: 438, featured: true },
  { id: 'pink-rose-rangoli-saree', name: 'Pink Rose Rangoli Silk Saree', store: 'Pink Rose Fashion Store', vendorId: 'weaves-and-more', category: 'Women', price: 1499, compareAt: 2999, image: pinkRoseSareeImage, alt: 'Cream and rose embroidered silk saree', colors: ['Cream', 'Rose'], sizes: ['Free size'], description: 'A luminous Rangoli silk saree with a fully stitched blouse and mirror-work border.', badge: 'Featured brand', rating: 4.8, reviews: 601, featured: true },
  { id: 'print-studio-teal-coord', name: 'Print Studio Teal Sequin Co-ord', store: 'Print Studio', vendorId: 'style-studio', category: 'Women', price: 1199, compareAt: 2399, image: printStudioImage, alt: 'Teal sequin two-piece women’s outfit', colors: ['Teal'], sizes: ['S', 'M', 'L', 'XL'], description: 'A sparkling teal two-piece georgette set with a flattering layered hem for celebrations.', badge: 'Featured brand', rating: 4.5, reviews: 329, featured: true },
  { id: 'tehzeeb-navy-chikankari-set', name: 'Tehzeeb Navy Chikankari Set', store: 'Tehzeeb Chikankari Arts', vendorId: 'ethnic-house', category: 'Women', price: 1099, compareAt: 2199, image: tehzeebImage, alt: 'Navy floral chikankari three-piece set', colors: ['Navy'], sizes: ['S', 'M', 'L', 'XL'], description: 'A rich navy Lahriya rayon three-piece set with mirror sequin work and a flowing dupatta.', badge: 'Featured brand', rating: 4.7, reviews: 477, featured: true },
  { id: 'arkia-lime-floral-saree', name: 'ArKia Lime Handbrush Floral Saree', store: 'ArKia', vendorId: 'weaves-and-more', category: 'Women', price: 1299, compareAt: 2499, image: arkiaLimeSareeImage, alt: 'Lime green floral chiffon saree', colors: ['Lime'], sizes: ['Free size'], description: 'A fresh lime chiffon saree with handbrush florals and delicate handwork finishing.', badge: 'Featured brand', rating: 4.6, reviews: 382, featured: true },
  { id: 'vedaanti-lace-crop-top', name: 'Vedaanti Floral Lace Crop Top', store: 'Vedaanti', vendorId: 'style-studio', category: 'Women', price: 699, compareAt: 1299, image: vedaantiCropTopImage, alt: 'Ivory floral lace crop top', colors: ['Ivory'], sizes: ['S', 'M', 'L', 'XL'], description: 'A feminine floral lace crop top with a clean cropped shape for modern styling.', badge: 'Featured brand', rating: 4.4, reviews: 218, featured: true },
  { id: 'ludmury-maroon-set', name: 'Ludmury Maroon Cotton 3-Piece Set', store: 'Ludmury Style', vendorId: 'ethnic-house', category: 'Women', price: 949, compareAt: 1899, image: ludmurySetImage, alt: 'Maroon embroidered cotton three-piece set', colors: ['Maroon'], sizes: ['S', 'M', 'L', 'XL'], description: 'A soft cotton three-piece set with floral embroidery and an easy longline fit.', badge: 'Featured brand', rating: 4.5, reviews: 347, featured: true },
  { id: 'mnr-purple-anarkali-set', name: 'MNR Purple Printed Anarkali Set', store: 'MNR Creation', vendorId: 'ethnic-house', category: 'Women', price: 1199, compareAt: 2399, image: mnrAnarkaliImage, alt: 'Purple printed flowing anarkali set', colors: ['Purple'], sizes: ['S', 'M', 'L', 'XL'], description: 'A joyful printed anarkali with a dramatic flare, matching pants, and a lightweight dupatta.', badge: 'Featured brand', rating: 4.6, reviews: 294, featured: true },
  { id: 'stylyum-embroidered-dress', name: 'Stylyum Embroidered Fit & Flare Dress', store: 'Stylyum', vendorId: 'style-studio', category: 'Women', price: 920, compareAt: 3399, image: stylyumDressImage, alt: 'White embroidered bell sleeve fit and flare dress', colors: ['White'], sizes: ['S', 'M', 'L', 'XL'], description: 'A breezy embroidered fit-and-flare dress with bell sleeves and a soft tiered silhouette.', badge: 'Featured brand', rating: 4.2, reviews: 273, featured: true },
  { id: 'bella-vita-date-woman-perfume', name: 'Bella Vita Date Woman Eau De Parfum', store: 'Beauty Hub', vendorId: 'beauty-hub', category: 'Beauty', price: 565, compareAt: 999, image: bellaVitaDateWomanImage, alt: 'Bella Vita Date Woman Eau De Parfum bottle and perfume notes', colors: ['Berry'], sizes: ['100 ml'], description: 'A bright fruity, citrus, and woody fragrance for easy everyday wear.', badge: 'Perfume edit', rating: 4.6, reviews: 17300, featured: true },
  { id: 'bella-vita-ceo-man-perfume', name: 'Bella Vita CEO Man Eau De Parfum', store: 'Beauty Hub', vendorId: 'beauty-hub', category: 'Beauty', price: 485, compareAt: 899, image: bellaVitaCeoManImage, alt: 'Bella Vita CEO Man Eau De Parfum bottle', colors: ['Black'], sizes: ['100 ml'], description: 'A confident, long-lasting fragrance with a polished woody character.', badge: 'Perfume edit', rating: 4.4, reviews: 30400, featured: true },
  { id: 'french-essence-bloom-oud-set', name: 'French Essence Bloom & Oud Perfume Set', store: 'Beauty Hub', vendorId: 'beauty-hub', category: 'Beauty', price: 316, compareAt: 599, image: frenchEssenceBloomOudImage, alt: 'French Essence Bloom and Oud perfume gift set', colors: ['Pink', 'Black'], sizes: ['2 x 30 ml'], description: 'A two-piece Bloom and Oud set pairing bright florals with a warm, elegant oud.', badge: 'Perfume edit', rating: 4.3, reviews: 3100, featured: true },
  { id: 'marquisa-gotta-patti-kurta-set', name: 'Marquisa Gotta Patti Kurta Set With Dupatta', store: 'Ethnic House', vendorId: 'ethnic-house', category: 'Women', price: 1699, compareAt: 2377, image: marquisaKurtaSetImage, alt: 'Marquisa pink gotta patti kurta set with dupatta', colors: ['Rose pink'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], description: 'A rosy A-line kurta set with delicate gotta patti details and a flowing dupatta.', badge: "Women's edit", rating: 3.1, reviews: 173, featured: true },
  { id: 'kalini-mirror-work-cotton-set', name: 'Kalini Printed Cotton Kurta Set With Dupatta', store: 'Ethnic House', vendorId: 'ethnic-house', category: 'Women', price: 1342, compareAt: 3999, image: kaliniPrintedSetImage, alt: 'Kalini mustard printed cotton kurta set with dupatta', colors: ['Mustard'], sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'], description: 'A pure cotton printed set with mirror-work accents, trousers, and a matching dupatta.', badge: "Women's edit", rating: 4.2, reviews: 223, featured: true },
  { id: 'sangria-embroidered-tunic', name: 'Sangria Black & Red Embroidered Tunic', store: 'Style Studio', vendorId: 'style-studio', category: 'Women', price: 718, compareAt: 1999, image: sangriaEmbroideredTunicImage, alt: 'Sangria black and red embroidered women’s tunic', colors: ['Black', 'Red'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'], description: 'A relaxed black tunic with striking red embroidery across the neckline and sleeves.', badge: "Women's edit", rating: 4.3, reviews: 2300, featured: true },
  { id: 'glitchez-piping-windcheater', name: 'Glitchez Contrast Piping Windcheater Jacket', store: 'Style Studio', vendorId: 'style-studio', category: 'Women', price: 843, compareAt: 1999, image: glitchezWindcheaterImage, alt: 'Glitchez white contrast piping windcheater jacket', colors: ['White'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], description: 'A lightweight white windcheater with contrast piping and an easy toggle hem.', badge: "Women's edit", rating: 4.3, reviews: 338, featured: true },
  { id: 'roadster-striped-shirt-top', name: 'Roadster Striped Shirt Style Top', store: 'Style Studio', vendorId: 'style-studio', category: 'Women', price: 891, compareAt: 2399, image: roadsterStripedTopImage, alt: 'Roadster pink striped shirt style women’s top', colors: ['Pink'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], description: 'A relaxed pink striped shirt-style top with an easy fit for everyday layering.', badge: "Women's edit", rating: 4.4, reviews: 694, featured: true },
] satisfies Product[]).map((product) => ({ ...product, image: catalogProductImages[product.id] ?? product.image }));

export const getProduct = (id?: string) => products.find((product) => product.id === id);
export const getVendor = (id?: string) => vendors.find((vendor) => vendor.id === id);
export const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export const readLocal = <T,>(key: string, fallback: T): T => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
};
export const writeLocal = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value));