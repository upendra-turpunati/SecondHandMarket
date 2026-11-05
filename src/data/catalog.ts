import type { Category, Product, Seller } from '../types'

export const categories: Category[] = [
  { id: 'phones', name: 'Mobile phones', description: 'Smartphones from major brands' },
  { id: 'laptops', name: 'Laptops', description: 'Work and study machines' },
  { id: 'tablets', name: 'Tablets', description: 'iPads and Android tablets' },
  { id: 'tvs', name: 'TVs', description: 'LED, OLED and smart TVs' },
  { id: 'audio', name: 'Headphones & earbuds', description: 'Over-ear and true wireless' },
  { id: 'wearables', name: 'Smartwatches', description: 'Watches and fitness bands' },
  { id: 'cameras', name: 'Cameras', description: 'Mirrorless, DSLR and lenses' },
  { id: 'gaming', name: 'Gaming consoles', description: 'PlayStation, Xbox and Nintendo' },
  { id: 'pc-parts', name: 'PC components', description: 'GPUs, CPUs, storage and more' },
  { id: 'other', name: 'Other electronics', description: 'Speakers, monitors and accessories' },
]

export const cities = [
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Ahmedabad',
  'Kochi',
  'Kolkata',
  'Jaipur',
] as const

export const sellers: Seller[] = [
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    city: 'Bengaluru',
    state: 'Karnataka',
    memberSince: '2023-04',
    about:
      'Lists personal devices after upgrades. Prefers local pickup in Indiranagar and Koramangala.',
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    city: 'Kochi',
    state: 'Kerala',
    memberSince: '2024-01',
    about: 'Sells well-kept gadgets from home. Happy to meet in Ernakulam for handover.',
  },
  {
    id: 'rahul-sharma',
    name: 'Rahul Sharma',
    city: 'Delhi',
    state: 'Delhi',
    memberSince: '2022-11',
    about: 'Occasional seller of laptops and cameras. Meetups around South Delhi.',
  },
  {
    id: 'ananya-iyer',
    name: 'Ananya Iyer',
    city: 'Chennai',
    state: 'Tamil Nadu',
    memberSince: '2023-08',
    about: 'Upgrades phones and audio gear regularly. Adyar and T. Nagar preferred.',
  },
  {
    id: 'vikram-patel',
    name: 'Vikram Patel',
    city: 'Ahmedabad',
    state: 'Gujarat',
    memberSince: '2024-06',
    about: 'PC builder selling spare parts after a system refresh.',
  },
  {
    id: 'neha-kapoor',
    name: 'Neha Kapoor',
    city: 'Mumbai',
    state: 'Maharashtra',
    memberSince: '2023-02',
    about: 'Lists TVs and tablets from a family move. Andheri and Bandra meetups.',
  },
  {
    id: 'karthik-reddy',
    name: 'Karthik Reddy',
    city: 'Hyderabad',
    state: 'Telangana',
    memberSince: '2022-07',
    about: 'Gaming and photography kit from a home studio in Gachibowli.',
  },
  {
    id: 'meera-desai',
    name: 'Meera Desai',
    city: 'Pune',
    state: 'Maharashtra',
    memberSince: '2024-03',
    about: 'Student-friendly listings. Prefers Kothrud and Baner for pickup.',
  },
]

export const products: Product[] = [
  {
    id: 'iphone-14-pro',
    title: 'Apple iPhone 14 Pro 128GB Deep Purple',
    brand: 'Apple',
    price: 58900,
    condition: 'Excellent',
    category: 'phones',
    city: 'Bengaluru',
    state: 'Karnataka',
    description:
      'Purchased in 2023, dual SIM, battery health around 88%. No dents. Screen protector on since day one. Original box, charging cable and unused EarPods included. Face ID works. Local pickup preferred; courier can be discussed after you inspect the phone.',
    specs: [
      { label: 'Storage', value: '128 GB' },
      { label: 'Colour', value: 'Deep Purple' },
      { label: 'Battery', value: '~88% health' },
      { label: 'Warranty', value: 'Expired' },
    ],
    images: [
      'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'arjun-mehta',
    postedAt: '2026-08-28',
    featured: true,
  },
  {
    id: 'pixel-8',
    title: 'Google Pixel 8 128GB Hazel',
    brand: 'Google',
    price: 32990,
    condition: 'Like New',
    category: 'phones',
    city: 'Hyderabad',
    state: 'Telangana',
    description:
      'Used for six months as a secondary phone. Clean body, no scratches on the display. Includes official case and box. Android updates current as of listing date.',
    specs: [
      { label: 'Storage', value: '128 GB' },
      { label: 'Colour', value: 'Hazel' },
      { label: 'SIM', value: 'Dual SIM' },
    ],
    images: [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'karthik-reddy',
    postedAt: '2026-08-30',
    featured: true,
  },
  {
    id: 'samsung-s23',
    title: 'Samsung Galaxy S23 256GB Phantom Black',
    brand: 'Samsung',
    price: 36500,
    condition: 'Good',
    category: 'phones',
    city: 'Mumbai',
    state: 'Maharashtra',
    description:
      'Light hairline marks on the frame. Display is clean. 256 GB storage, all original accessories except the unused earbuds. Factory reset done.',
    specs: [
      { label: 'Storage', value: '256 GB' },
      { label: 'Colour', value: 'Phantom Black' },
    ],
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'neha-kapoor',
    postedAt: '2026-08-22',
  },
  {
    id: 'oneplus-12',
    title: 'OnePlus 12 16GB/512GB Flowy Emerald',
    brand: 'OnePlus',
    price: 41900,
    condition: 'Excellent',
    category: 'phones',
    city: 'Pune',
    state: 'Maharashtra',
    description:
      'Fast charging brick and cable included. Used with a case. No green line. Reason for sale: switching to a smaller phone.',
    specs: [
      { label: 'RAM', value: '16 GB' },
      { label: 'Storage', value: '512 GB' },
    ],
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'meera-desai',
    postedAt: '2026-08-25',
  },
  {
    id: 'macbook-air-m2',
    title: 'MacBook Air 13" M2 8GB/256GB Midnight',
    brand: 'Apple',
    price: 72000,
    condition: 'Excellent',
    category: 'laptops',
    city: 'Bengaluru',
    state: 'Karnataka',
    description:
      'Cycle count is low. Keyboard and trackpad feel new. Charger included. Small mark on the lid near the Apple logo. Great for travel and classes.',
    specs: [
      { label: 'Chip', value: 'M2' },
      { label: 'RAM', value: '8 GB' },
      { label: 'Storage', value: '256 GB SSD' },
    ],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'arjun-mehta',
    postedAt: '2026-08-26',
    featured: true,
  },
  {
    id: 'thinkpad-t14',
    title: 'Lenovo ThinkPad T14 Gen 3 i7 16GB/512GB',
    brand: 'Lenovo',
    price: 48500,
    condition: 'Good',
    category: 'laptops',
    city: 'Delhi',
    state: 'Delhi',
    description:
      'Corporate machine wiped and reinstalled with Windows 11. TrackPoint works. Battery lasts a full work day. Minor wear on palm rest.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7' },
      { label: 'RAM', value: '16 GB' },
      { label: 'Storage', value: '512 GB SSD' },
    ],
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'rahul-sharma',
    postedAt: '2026-08-18',
    featured: true,
  },
  {
    id: 'asus-tuf',
    title: 'ASUS TUF Gaming A15 Ryzen 7 RTX 3060',
    brand: 'ASUS',
    price: 55990,
    condition: 'Good',
    category: 'laptops',
    city: 'Hyderabad',
    state: 'Telangana',
    description:
      '144 Hz display, 16 GB RAM, 512 GB SSD. Fans are clean. Used for college gaming. RGB keyboard still bright. Original charger.',
    specs: [
      { label: 'GPU', value: 'RTX 3060' },
      { label: 'RAM', value: '16 GB' },
    ],
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'karthik-reddy',
    postedAt: '2026-08-20',
  },
  {
    id: 'dell-xps-13',
    title: 'Dell XPS 13 9315 i5 16GB/512GB',
    brand: 'Dell',
    price: 54000,
    condition: 'Like New',
    category: 'laptops',
    city: 'Chennai',
    state: 'Tamil Nadu',
    description:
      'Ultraportable with a sharp display. Barely used in 2025. Sleeve and USB-C charger included.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5' },
      { label: 'Weight', value: '~1.2 kg' },
    ],
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'ananya-iyer',
    postedAt: '2026-08-27',
  },
  {
    id: 'ipad-air-m1',
    title: 'iPad Air 5 M1 64GB Wi-Fi Blue',
    brand: 'Apple',
    price: 34500,
    condition: 'Excellent',
    category: 'tablets',
    city: 'Kochi',
    state: 'Kerala',
    description:
      'Used for notes and media. No Apple Pencil in this listing. Screen is unmarked. Smart Folio included.',
    specs: [
      { label: 'Chip', value: 'M1' },
      { label: 'Storage', value: '64 GB' },
    ],
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'priya-nair',
    postedAt: '2026-08-24',
    featured: true,
  },
  {
    id: 'tab-s9',
    title: 'Samsung Galaxy Tab S9 128GB Graphite',
    brand: 'Samsung',
    price: 38900,
    condition: 'Excellent',
    category: 'tablets',
    city: 'Mumbai',
    state: 'Maharashtra',
    description:
      'S Pen included. Keyboard cover not included. IP68 tablet in great shape after a year of light use.',
    specs: [
      { label: 'Storage', value: '128 GB' },
      { label: 'S Pen', value: 'Included' },
    ],
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'neha-kapoor',
    postedAt: '2026-08-16',
  },
  {
    id: 'sony-bravia-55',
    title: 'Sony Bravia 55" 4K Google TV (2022)',
    brand: 'Sony',
    price: 42000,
    condition: 'Good',
    category: 'tvs',
    city: 'Mumbai',
    state: 'Maharashtra',
    description:
      'Moving house, selling the living-room TV. Picture is excellent. Stand and remote included. Wall mount not included. Buyer should arrange transport.',
    specs: [
      { label: 'Size', value: '55 inch' },
      { label: 'Resolution', value: '4K UHD' },
    ],
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'neha-kapoor',
    postedAt: '2026-08-12',
    featured: true,
  },
  {
    id: 'lg-oled-c2',
    title: 'LG OLED C2 48" 4K',
    brand: 'LG',
    price: 68000,
    condition: 'Excellent',
    category: 'tvs',
    city: 'Bengaluru',
    state: 'Karnataka',
    description:
      'Desktop OLED used as a monitor in the evenings. No burn-in visible in test patterns. Original remote and stand.',
    specs: [
      { label: 'Size', value: '48 inch' },
      { label: 'Panel', value: 'OLED' },
    ],
    images: [
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'arjun-mehta',
    postedAt: '2026-08-21',
  },
  {
    id: 'sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Midnight Blue',
    brand: 'Sony',
    price: 18990,
    condition: 'Like New',
    category: 'audio',
    city: 'Chennai',
    state: 'Tamil Nadu',
    description:
      'ANC still excellent. Case, cables and airplane adapter included. Ear pads are original and clean.',
    specs: [
      { label: 'Type', value: 'Over-ear wireless' },
      { label: 'ANC', value: 'Yes' },
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'ananya-iyer',
    postedAt: '2026-08-29',
    featured: true,
  },
  {
    id: 'airpods-pro-2',
    title: 'Apple AirPods Pro (2nd gen) USB-C',
    brand: 'Apple',
    price: 14500,
    condition: 'Excellent',
    category: 'audio',
    city: 'Pune',
    state: 'Maharashtra',
    description:
      'Both buds and case work. Extra ear tips in the box. Find My works on the case.',
    specs: [
      { label: 'Connector', value: 'USB-C' },
      { label: 'ANC', value: 'Yes' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'meera-desai',
    postedAt: '2026-08-23',
  },
  {
    id: 'bose-qc',
    title: 'Bose QuietComfort Ultra Headphones',
    brand: 'Bose',
    price: 21000,
    condition: 'Good',
    category: 'audio',
    city: 'Delhi',
    state: 'Delhi',
    description:
      'Comfortable for long flights. Light wear on the headband fabric. Sound and ANC are strong.',
    specs: [
      { label: 'Type', value: 'Over-ear wireless' },
    ],
    images: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'rahul-sharma',
    postedAt: '2026-08-14',
  },
  {
    id: 'watch-ultra',
    title: 'Apple Watch Ultra 49mm GPS + Cellular',
    brand: 'Apple',
    price: 45500,
    condition: 'Excellent',
    category: 'wearables',
    city: 'Mumbai',
    state: 'Maharashtra',
    description:
      'Titanium case, Ocean band included. Battery lasts a weekend of light tracking. Cellular plan not transferable.',
    specs: [
      { label: 'Size', value: '49 mm' },
      { label: 'Connectivity', value: 'GPS + Cellular' },
    ],
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'neha-kapoor',
    postedAt: '2026-08-19',
    featured: true,
  },
  {
    id: 'galaxy-watch6',
    title: 'Samsung Galaxy Watch6 Classic 47mm',
    brand: 'Samsung',
    price: 12990,
    condition: 'Good',
    category: 'wearables',
    city: 'Ahmedabad',
    state: 'Gujarat',
    description:
      'Rotating bezel works smoothly. Extra sport band included. Used with a Galaxy phone.',
    specs: [
      { label: 'Size', value: '47 mm' },
    ],
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'vikram-patel',
    postedAt: '2026-08-11',
  },
  {
    id: 'a7iv',
    title: 'Sony A7 IV body + 28-70mm kit lens',
    brand: 'Sony',
    price: 145000,
    condition: 'Excellent',
    category: 'cameras',
    city: 'Delhi',
    state: 'Delhi',
    description:
      'Shutter count under 12,000. Sensor is clean. Two batteries, charger, strap and original box. Ideal for events and travel.',
    specs: [
      { label: 'Mount', value: 'Sony E' },
      { label: 'Shutter count', value: '< 12,000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'rahul-sharma',
    postedAt: '2026-08-17',
    featured: true,
  },
  {
    id: 'canon-r50',
    title: 'Canon EOS R50 with 18-45mm',
    brand: 'Canon',
    price: 48500,
    condition: 'Like New',
    category: 'cameras',
    city: 'Hyderabad',
    state: 'Telangana',
    description:
      'Vlogging kit with a clean sensor. 16 GB card included. Barely used after a photography course.',
    specs: [
      { label: 'Mount', value: 'RF' },
    ],
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'karthik-reddy',
    postedAt: '2026-08-15',
  },
  {
    id: 'ps5-slim',
    title: 'PlayStation 5 Slim Disc with extra controller',
    brand: 'Sony',
    price: 38900,
    condition: 'Excellent',
    category: 'gaming',
    city: 'Pune',
    state: 'Maharashtra',
    description:
      'Disc edition, one extra DualSense. HDMI and power cables included. No games in this listing. Console is dust-free.',
    specs: [
      { label: 'Edition', value: 'Slim disc' },
      { label: 'Controllers', value: '2' },
    ],
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'meera-desai',
    postedAt: '2026-08-28',
    featured: true,
  },
  {
    id: 'switch-oled',
    title: 'Nintendo Switch OLED White',
    brand: 'Nintendo',
    price: 18500,
    condition: 'Good',
    category: 'gaming',
    city: 'Kochi',
    state: 'Kerala',
    description:
      'Dock, Joy-Cons and grip included. Joy-Con drift is not present. Screen has a faint mark at the corner.',
    specs: [
      { label: 'Model', value: 'OLED' },
    ],
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cb7c3c6d?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'priya-nair',
    postedAt: '2026-08-10',
  },
  {
    id: 'rtx-4070',
    title: 'NVIDIA GeForce RTX 4070 12GB (used)',
    brand: 'NVIDIA',
    price: 36500,
    condition: 'Excellent',
    category: 'pc-parts',
    city: 'Ahmedabad',
    state: 'Gujarat',
    description:
      'Pulled from a well-cooled mid-tower. Never mined. Original box and adapter. Tests fine in 1440p gaming.',
    specs: [
      { label: 'VRAM', value: '12 GB' },
      { label: 'Interface', value: 'PCIe' },
    ],
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'vikram-patel',
    postedAt: '2026-08-27',
    featured: true,
  },
  {
    id: 'wd-sn850',
    title: 'WD Black SN850X 2TB NVMe SSD',
    brand: 'Western Digital',
    price: 11200,
    condition: 'Like New',
    category: 'pc-parts',
    city: 'Ahmedabad',
    state: 'Gujarat',
    description:
      'Used as a secondary game drive for four months. Health report is excellent. Heatsink not included.',
    specs: [
      { label: 'Capacity', value: '2 TB' },
      { label: 'Interface', value: 'M.2 NVMe' },
    ],
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'vikram-patel',
    postedAt: '2026-08-09',
  },
  {
    id: 'kindle-paperwhite',
    title: 'Amazon Kindle Paperwhite (11th gen) 16GB',
    brand: 'Amazon',
    price: 8900,
    condition: 'Good',
    category: 'other',
    city: 'Chennai',
    state: 'Tamil Nadu',
    description:
      'Warm light works. Case included. Small scuff on the back. Deregistered and ready for a new Amazon account.',
    specs: [
      { label: 'Storage', value: '16 GB' },
    ],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'ananya-iyer',
    postedAt: '2026-08-08',
  },
  {
    id: 'lg-ultragear',
    title: 'LG UltraGear 27" 1440p 165Hz monitor',
    brand: 'LG',
    price: 18500,
    condition: 'Excellent',
    category: 'other',
    city: 'Chennai',
    state: 'Tamil Nadu',
    description:
      'IPS panel, no dead pixels spotted. Height-adjust stand. HDMI and DisplayPort cables included.',
    specs: [
      { label: 'Size', value: '27 inch' },
      { label: 'Refresh rate', value: '165 Hz' },
    ],
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    ],
    sellerId: 'ananya-iyer',
    postedAt: '2026-08-13',
  },
]

export function getSeller(id: string) {
  return sellers.find((seller) => seller.id === id)
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

export function getProductsBySeller(sellerId: string) {
  return products.filter((product) => product.sellerId === sellerId)
}

export function getCategory(id: string) {
  return categories.find((category) => category.id === id)
}
