export const PLACEHOLDER_IMG = "/images/placeholder.jpg";

export const CATEGORIES = [
  "Clothing", "Shoes", "Home & Living", "Jewelry & Accessories",
  "Toys & Entertainment", "Graphics & Photos", "Video & Audio", "Web Templates & Code",
];

export const SHOP_BY_CATEGORY = [
  { name: "Clothing", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa3284422356-62618554.webp" },
  { name: "Home & Living", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa32d947a2c2-95720633.webp" },
  { name: "Toys & Entertainment", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa33016cd3d5-22961515.webp" },
  { name: "Women's Clothing", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa33130537d7-29441060.webp" },
  { name: "Men's Clothing", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa3334490a07-19765633.webp" },
  { name: "Furniture", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa3341655123-11031908.webp" },
  { name: "Necklaces & Accessories", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa335861cdd2-08512447.webp" },
  { name: "Graphics", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa33817aca32-54738529.webp" },
  { name: "Painting", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa33c32d65d7-74266909.webp" },
  { name: "Boots", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa33e7271260-26824134.webp" },
  { name: "Decorative Pillows", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa33f6b755e4-34777699.webp" },
  { name: "Handbags", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/category_64fa340bbb1f36-33117053.webp" },
];

export function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const SPECIAL_OFFERS = [
  { name: "Animal colorful digital prints", seller: "Trendshop", price: 29, old: 39, off: 25, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47e4f94de21-55399162.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47e4d9a8323-26891221.webp" },
  { name: "Summer fashion top lace", seller: "Trendshop", price: 65, old: 79, off: 17, category: "Clothing", brand: "Mango", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4201f585363-92441454.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4201c490084-07881264.webp" },
  { name: "Women lace blouse with different colors", seller: "Trendshop", price: 69, old: 79, off: 12, category: "Clothing", brand: "H & M", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b444b84378e5-48553876.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b444ba308901-31287907.webp" },
  { name: "Floral women sundress", seller: "Admin", price: 80, old: 89, off: 10, category: "Clothing", brand: "Levi's", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4782bb1fd97-37411119.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4782d286682-59509226.webp" },
  { name: "Gucci nylon fabric smart backpack", seller: "Admin", price: 55, old: 69, off: 20, category: "Jewelry & Accessories", brand: "Gucci", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b411eda41296-01344268.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b411f466a7b6-02145988.webp" },
  { name: "Black sneakers with white sole", seller: "Admin", price: 69, old: 89, off: 22, category: "Shoes", brand: "Nike", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b42a27c973e8-01581927.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b42a259057e9-75893884.webp" },
  { name: "Women kipling bailey saddle handbag", seller: "Admin", price: 59, old: 69, off: 14, category: "Jewelry & Accessories", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47ead387d08-44405792.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47eabbdf674-98222623.webp" },
  { name: "Handcrafted decorative pillow for a luxurious touch", seller: "Admin", price: 59, old: 69, off: 14, category: "Home & Living", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b48328ae6803-76215334.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4833b368006-11466025.webp" },
];

export const FEATURED = [
  { name: "Black midi skirt with white flowers", seller: "Trendshop", price: 48, old: 55, category: "Clothing", brand: "Mango", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b48029e507b3-80580535.webp" },
  { name: "Handcrafted decorative pillow for a luxurious touch", seller: "Admin", price: 59, old: 69, category: "Home & Living", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b48328ae6803-76215334.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4833b368006-11466025.webp" },
  { name: "Floral women sundress", seller: "Admin", price: 80, old: 89, category: "Clothing", brand: "Levi's", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4782bb1fd97-37411119.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4782d286682-59509226.webp" },
  { name: "Sun hat for women protection cap", seller: "Trendshop", price: 29, category: "Clothing", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b42b1dbd5113-51388874.webp" },
  { name: "Sneaker shoes men", seller: "Trendshop", price: 89, old: 100, category: "Shoes", brand: "Adidas", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b4478ad6a990-03566156.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b4478e3d8e54-30788629.webp" },
  { name: "Women kipling bailey saddle handbag", seller: "Admin", price: 59, old: 69, category: "Jewelry & Accessories", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47ead387d08-44405792.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47eabbdf674-98222623.webp" },
  { name: "Cobalt man t-shirt all colors", seller: "Admin", quote: true, category: "Clothing", brand: "Lacoste", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b32b29ee69f3-56299505.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b304f254f980-30964558.webp" },
  { name: "Adorable animals photo pack", seller: "Admin", free: true, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b43c0815e533-31234379.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b43c0d86d030-10748051.webp" },
  { name: "Moment of inspiration piano music", seller: "Admin", price: 15, old: 34, category: "Video & Audio", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b42f2718f5d4-41096104.webp" },
  { name: "Animation of popular vacation spots", seller: "Trendshop", price: 10, old: 15, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b47049815ed3-83770961.webp" },
  { name: "Light blue women shirt", seller: "Trendshop", price: 49, old: 69, category: "Clothing", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b425f0776b19-61247097.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b425f0ddf6c6-92483626.webp" },
  { name: "Summer fashion top lace", seller: "Trendshop", price: 65, old: 79, category: "Clothing", brand: "Mango", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4201f585363-92441454.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4201c490084-07881264.webp" },
  { name: "Handmade cute handbag", seller: "Admin", price: 30, old: 45, category: "Jewelry & Accessories", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b41f022c8196-57636736.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b41f0abfc7b5-38356090.webp" },
  { name: "Blanket comfort couch pillow", seller: "Trendshop", price: 39, category: "Home & Living", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b41df6be2689-15394576.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b41ded2fa3a3-63386428.webp" },
  { name: "Women casual dress", seller: "Admin", price: 56, category: "Clothing", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b43a9740e718-26703231.webp" }
];

export const NEW_ARRIVALS = [
  { name: "Colorful women scarves", seller: "Trendshop", price: 40, old: 45, category: "Clothing", brand: "Burberry", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b48824569e72-87260111.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b48827f0c797-67487226.webp" },
  { name: "Women's ankle boot with different colors", seller: "Admin", price: 59, old: 69, category: "Shoes", brand: "Puma", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b487298b0b21-76170608.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b48731c06933-20793933.webp" },
  { name: "Navy polka dot dress", seller: "Trendshop", price: 130, old: 150, category: "Clothing", brand: "Diesel", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b48564b4bf14-00611832.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4856960e3a7-38134132.webp" },
  { name: "Modern grey couch and pillows", seller: "Admin", price: 299, category: "Home & Living", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w480_68b484e37e8a50-42247775.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4833b368006-11466025.webp" },
  { name: "Black fashion women backpack", seller: "Trendshop", quote: true, category: "Jewelry & Accessories", brand: "Tommy Hilfiger", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4841cba49a9-06761398.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b48436b7d5c3-05660062.webp" },
  { name: "Handcrafted decorative pillow for a luxurious touch", seller: "Admin", price: 59, old: 69, category: "Home & Living", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b48328ae6803-76215334.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4833b368006-11466025.webp" },
  { name: "Black midi skirt with white flowers", seller: "Trendshop", price: 48, old: 55, category: "Clothing", brand: "Mango", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b48029e507b3-80580535.webp" },
  { name: "Women kipling bailey saddle handbag", seller: "Admin", price: 59, old: 69, category: "Jewelry & Accessories", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47ead387d08-44405792.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47eabbdf674-98222623.webp" },
  { name: "Animal colorful digital prints", seller: "Trendshop", price: 29, old: 39, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47e4f94de21-55399162.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47e4d9a8323-26891221.webp" },
  { name: "Floral women sundress", seller: "Admin", price: 80, old: 89, category: "Clothing", brand: "Levi's", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4782bb1fd97-37411119.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4782d286682-59509226.webp" },
  { name: "Seychelles women's brown ankle bootie", seller: "Trendshop", price: 75, category: "Shoes", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47738678476-02357761.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b477334a1b37-42698513.webp" },
  { name: "Ship illustration royalty free image", seller: "Admin", price: 12, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w480_68b476dea0d5d2-94701714%20(1).webp" },
  { name: "Men outerwear navy color", seller: "Trendshop", price: 89, old: 99, category: "Clothing", brand: "U.S. Polo Assn", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b411eda41296-01344268.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b411f466a7b6-02145988.webp" },
  { name: "Men's lace formal casual fashion shoe", seller: "Trendshop", price: 59, category: "Shoes", brand: "Dockers", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4201f585363-92441454.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4201c490084-07881264.webp" },
  { name: "Modern blue handbag", seller: "Trendshop", price: 45, old: 60, category: "Jewelry & Accessories", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b41f022c8196-57636736.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b41f0abfc7b5-38356090.webp" },
  { name: "Black bag over the shoulder", seller: "Admin", price: 49, old: 69, category: "Jewelry & Accessories", brand: "Armani", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47ead387d08-44405792.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47eabbdf674-98222623.webp" },
  { name: "Summer fashion top lace", seller: "Trendshop", price: 65, old: 79, category: "Clothing", brand: "Mango", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4201f585363-92441454.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4201c490084-07881264.webp" },
  { name: "Women lace blouse with different colors", seller: "Trendshop", price: 69, old: 79, category: "Clothing", brand: "H & M", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b444b84378e5-48553876.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b444ba308901-31287907.webp" },
  { name: "Gucci nylon fabric smart backpack", seller: "Admin", price: 55, old: 69, category: "Jewelry & Accessories", brand: "Gucci", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b411eda41296-01344268.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b411f466a7b6-02145988.webp" },
  { name: "Black sneakers with white sole", seller: "Admin", price: 69, old: 89, category: "Shoes", brand: "Nike", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b42a27c973e8-01581927.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b42a259057e9-75893884.webp" },
  { name: "Sun hat for women protection cap", seller: "Trendshop", price: 29, category: "Clothing", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b42b1dbd5113-51388874.webp" },
  { name: "Sneaker shoes men", seller: "Trendshop", price: 89, old: 100, category: "Shoes", brand: "Adidas", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b4478ad6a990-03566156.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b4478e3d8e54-30788629.webp" },
  { name: "Cobalt man t-shirt all colors", seller: "Admin", quote: true, category: "Clothing", brand: "Lacoste", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b32b29ee69f3-56299505.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b304f254f980-30964558.webp" },
  { name: "Adorable animals photo pack", seller: "Admin", free: true, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b43c0815e533-31234379.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b43c0d86d030-10748051.webp" },
  { name: "Moment of inspiration piano music", seller: "Admin", price: 15, old: 34, category: "Video & Audio", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b42f2718f5d4-41096104.webp" },
  { name: "Animation of popular vacation spots", seller: "Trendshop", price: 10, old: 15, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b47049815ed3-83770961.webp" },
  { name: "Light blue women shirt", seller: "Trendshop", price: 49, old: 69, category: "Clothing", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b425f0776b19-61247097.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b425f0ddf6c6-92483626.webp" },
  { name: "Handmade cute handbag", seller: "Admin", price: 30, old: 45, category: "Jewelry & Accessories", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b41f022c8196-57636736.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b41f0abfc7b5-38356090.webp" },
  { name: "Blanket comfort couch pillow", seller: "Trendshop", price: 39, category: "Home & Living", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b41df6be2689-15394576.webp", image2: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b41ded2fa3a3-63386428.webp" },
  { name: "Women casual dress", seller: "Admin", price: 56, category: "Clothing", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b43a9740e718-26703231.webp" },
  { name: "Futuristic landscape animation", seller: "Trendshop", price: 18, old: 20, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47e4f94de21-55399162.webp" },
  { name: "Car Race Pro License Keys", seller: "Admin", price: 19, old: 625, category: "Toys & Entertainment", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b42a27c973e8-01581927.webp" },
  { name: "Vastu plants for your house", seller: "Trendshop", price: 69, category: "Home & Living", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b4478ad6a990-03566156.webp" },
  { name: "Adidas daily shoes", seller: "Admin", price: 59, category: "Shoes", brand: "Adidas", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b4478e3d8e54-30788629.webp" },
  { name: "Men's sport shoe", seller: "Admin", price: 45, old: 49, category: "Shoes", brand: "Nike", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4201c490084-07881264.webp" },
  { name: "Motivation piano with cello and drums", seller: "Trendshop", price: 25, old: 29, category: "Video & Audio", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b42f2718f5d4-41096104.webp" },
  { name: "Intro animation with purple background and white sneakers", seller: "Trendshop", price: 25, old: 29, category: "Video & Audio", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w480_68b47049815ed3-83770961.webp" },
  { name: "Fashionable black and white sneakers", seller: "Trendshop", price: 49, old: 69, category: "Shoes", brand: "Nike", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b42a259057e9-75893884.webp" },
  { name: "Women vintage collage art design", seller: "Admin", price: 15, old: 20, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w480_68b476dea0d5d2-94701714.webp" },
  { name: "Infinite - Blog & Magazine Script", seller: "Trendshop", price: 36, category: "Web Templates & Code", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w480_68b484e37e8a50-42247775.webp" },
  { name: "Varient - News & Magazine Script", seller: "Trendshop", price: 49, category: "Web Templates & Code", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4833b368006-11466025.webp" },
  { name: "Classic leather wallet for men", seller: "Trendshop", price: 35, old: 45, category: "Jewelry & Accessories", brand: "Hugo Boss", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b411eda41296-01344268.webp" },
  { name: "Minimalist ceramic coffee mug", seller: "Admin", price: 18, old: 24, category: "Home & Living", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b48328ae6803-76215334.webp" },
  { name: "Cotton summer shorts for men", seller: "Trendshop", price: 32, old: 40, category: "Clothing", brand: "Lee Cooper", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b444b84378e5-48553876.webp" },
  { name: "Elegant silver chain necklace", seller: "Admin", price: 45, old: 55, category: "Jewelry & Accessories", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47ead387d08-44405792.webp" },
  { name: "Casual striped polo shirt", seller: "Trendshop", price: 42, old: 50, category: "Clothing", brand: "U.S. Polo Assn", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/imG_w960_68b32b29ee69f3-56299505.webp" },
  { name: "Waterproof hiking backpack", seller: "Admin", price: 78, old: 95, category: "Jewelry & Accessories", brand: "Puma", image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b4841cba49a9-06761398.webp" },
  { name: "Abstract watercolor painting set", seller: "Trendshop", price: 22, old: 30, category: "Graphics & Photos", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47e4f94de21-55399162.webp" },
  { name: "Vintage brass desk lamp", seller: "Admin", price: 65, old: 80, category: "Home & Living", brand: null, image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w480_68b484e37e8a50-42247775.webp" }
];

export const CLOTHING_ITEMS = [
  { name: "Navy polka dot dress", seller: "Trendshop", price: 130, oldPrice: 150, image: "/images/dress.jpg" },
  { name: "Black midi skirt with white flowers", seller: "Trendshop", price: 48, oldPrice: 55, image: "/images/skirt.jpg" },
  { name: "Floral women sundress", seller: "Admin", price: 80, oldPrice: 89, image: "/images/sundress.jpg" },
  { name: "Men outerwear navy color", seller: "Trendshop", price: 89, oldPrice: 99, image: "/images/outerwear.jpg" },
  { name: "Women lace blouse with different colors", seller: "Trendshop", price: 69, oldPrice: 79, image: "/images/blouse.jpg" },
  { name: "Women casual dress", seller: "Admin", price: 56, oldPrice: null, image: "/images/casual-dress.jpg" },
  { name: "Light blue women shirt", seller: "Trendshop", price: 49, oldPrice: 69, image: "/images/blue-shirt.jpg" },
  { name: "Women red casual dress", seller: "Admin", price: 99, oldPrice: null, image: "/images/red-dress.jpg" },
  { name: "Summer fashion top lace", seller: "Trendshop", price: 65, oldPrice: 79, image: "/images/top-lace.jpg" },
  { name: "Elegant white lace fabric", seller: "Trendshop", price: 59, oldPrice: null, image: "/images/white-lace.jpg" },
  { name: "Cobalt man t-shirt all colors", seller: "Admin", price: null, oldPrice: null, image: "/images/tshirt.jpg" }
];
export const JEWELRY_ITEMS = [
  { name: "Women kipling bailey saddle handbag", seller: "Admin", price: 59, oldPrice: 69, image: "/images/kipling-bag.jpg" },
  { name: "Sun hat for women protection cap", seller: "Trendshop", price: 29, oldPrice: null, image: "/images/sun-hat.jpg" },
  { name: "Handmade cute handbag", seller: "Admin", price: 30, oldPrice: 45, image: "/images/handmade-bag.jpg" },
  { name: "Colorful women scarves", seller: "Trendshop", price: 40, oldPrice: 45, image: "/images/scarves.jpg" },
  { name: "Black fashion women backpack", seller: "Trendshop", price: null, oldPrice: null, image: "/images/black-backpack.jpg" },
  { name: "Modern blue handbag", seller: "Trendshop", price: 45, oldPrice: 60, image: "/images/blue-handbag.jpg" },
  { name: "Women black leather handbag", seller: "Admin", price: 39, oldPrice: 49, image: "/images/black-leather-bag.jpg" },
  { name: "Black gold fashion backpack", seller: "Trendshop", price: null, oldPrice: null, image: "/images/black-gold-backpack.jpg" },
  { name: "Black bag over the shoulder", seller: "Admin", price: 49, oldPrice: 59, image: "/images/shoulder-bag.jpg" },
  { name: "Gucci nylon fabric smart backpack", seller: "Admin", price: 55, oldPrice: 69, image: "/images/gucci-backpack.jpg" },
  { name: "Bohemian Multicolor Handmade Bracelet Set", seller: "Trendshop", price: 49, oldPrice: 69, image: "/images/bracelet.jpg" }
];

export const BRANDS = [
  { name: "Adidas", image: "" },
  { name: "Armani", image: "" },
  { name: "Burberry", image: "" },
  { name: "Diesel", image: "" },
  { name: "Dockers", image: "" },
  { name: "Gucci", image: "" },
  { name: "H & M", image: "" },
  { name: "Hugo Boss", image: "" },
  { name: "Lacoste", image: "" },
  { name: "Lee Cooper", image: "" },
  { name: "Levi's", image: "" },
  { name: "Mango", image: "" },
  { name: "Nike", image: "" },
  { name: "Puma", image: "" },
  { name: "Tommy Hilfiger", image: "" },
  { name: "U.S. Polo Assn", image: "" },
];

export const BLOG_POSTS = [
  { id: 1, title: "Essential travel packing tips for fashion lovers", category: "Life Style", time: "2 months ago", image: "https://modesy.codingest.net/uploads/blog/blog_64a23412389ab.jpg", description: "Stay stylish and organized on your trips with these smart packing hacks." },
  { id: 2, title: "The psychology of colors in fashion", category: "Fashion", time: "2 months ago", image: "https://modesy.codingest.net/uploads/blog/blog_64a23425123cd.jpg", description: "Learn how the colors you wear influence mood, confidence, and perception." },
  { id: 3, title: "Gift ideas for every budget from affordable to luxury", category: "Life Style", time: "2 months ago", image: "https://modesy.codingest.net/uploads/blog/blog_64a2343890ef.jpg", description: "Find the perfect gift without breaking the bank, our ideas suit every budget." },
  { id: 4, title: "A beginner's guide to home fragrances", category: "Business", time: "2 months ago", image: "https://modesy.codingest.net/uploads/blog/blog_64a2345678ab.jpg", description: "Learn how scents can transform your home atmosphere and boost your mood." },
  { id: 5, title: "Must-have accessories to elevate your everyday look", category: "Business", time: "2 months ago", image: "https://modesy.codingest.net/uploads/blog/blog_64a234789012.jpg", description: "Small details make a big difference discover the top accessories you need right now." },
  { id: 6, title: "Why sustainable fashion matters more than ever", category: "Fashion", time: "2 months ago", image: "https://modesy.codingest.net/uploads/blog/blog_64a234901234.jpg", description: "Understand the importance of eco-friendly choices in fashion and how you can make a difference." },
  { id: 7, title: "How to pick the right shoes for comfort and style", category: "Fashion", time: "2 months ago", image: "https://modesy.codingest.net/uploads/blog/blog_64a234b56789.jpg", description: "Find out how to balance fashion and comfort when choosing your footwear." },
  { id: 8, title: "How to choose the perfect outfit for every occasion", category: "Life Style", time: "2 months ago", image: "https://modesy.codingest.net/uploads/blog/blog_64a234c89012.jpg", description: "Learn how to style yourself with the right outfit for casual, formal, and special events." }
];

export const SLIDES = [
  {title: "Buy Nice and Unique Clothes",sub: "Discover quality premium basics and trendy essentials at surprisingly affordable prices",cta: "Explore Now",image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/slider_2560x800_6a94336760c054-95358530.webp",},
  {title: "Find Backpacks That Best Suit You",sub: "Timeless, modern, and feminine pieces made with quality materials and craftsmanship",cta: "Buy Now",image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/slider_2560x800_6a9434c4d28763-19000658.webp",},
];

export const PROMO_BANNERS_TOP = [
  {image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/block_68b02a748392d5-47296084.webp",},
  {image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/block_68b02b0fa06e09-81527750.webp",},
  {image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/block_68b02a91357c27-13557247.webp",}
];

export const PROMO_BANNERS_BOTTOM = [
  {image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/block_68b02a364b90c6-71529931.webp"},
  {image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/block_68b02a59a1d144-08234125.webp"}
];

const _all = [...SPECIAL_OFFERS, ...FEATURED, ...NEW_ARRIVALS, ...CLOTHING_ITEMS];
const _seen = new Set();
const _deduped = _all.filter((p) => {
  if (_seen.has(p.name)) return false;
  _seen.add(p.name);
  return true;
}); 

export const ALL_PRODUCTS_WITH_SLUG = _deduped.map((p) => ({
  ...p,
  slug: slugify(p.name),
  description:
    "This item is carefully selected to meet your needs and exceed your expectations. Made with quality materials and crafted with attention to detail, it's a great addition to your collection.",
}));

export function getProductBySlug(slug) {
  return ALL_PRODUCTS_WITH_SLUG.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug, count = 4) {
  return ALL_PRODUCTS_WITH_SLUG.filter((p) => p.slug !== slug).slice(0, count);
}

export const CATEGORY_LIST = CATEGORIES.map((name) => ({
  name,
  slug: slugify(name),
}));

export function getCategoryBySlug(slug) {
  return CATEGORY_LIST.find((c) => c.slug === slug);
}

export function getProductsByCategory(categoryName) {
  return ALL_PRODUCTS_WITH_SLUG.filter((p) => p.category === categoryName);
}

export const SUBCATEGORY_MAP = {
  "Clothing": ["Women's Clothing", "Men's Clothing", "Kid's Clothing"],
  "Shoes": ["Women's Shoes", "Men's Shoes", "Kid's Shoes"],
  "Home & Living": ["Furniture", "Decorative Pillows", "Kitchenware"],
  "Jewelry & Accessories": ["Necklaces & Accessories", "Handbags", "Watches"],
};