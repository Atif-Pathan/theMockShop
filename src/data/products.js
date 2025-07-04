// This file acts as our local, mock database.
// It transforms the raw data into the final format our app expects.

const categoryMap = {
  1: { id: 1, name: 'Clothes', slug: 'clothes' },
  2: { id: 2, name: 'Electronics', slug: 'electronics' },
  3: { id: 3, name: 'Furniture', slug: 'furniture' },
  4: { id: 4, name: 'Shoes', slug: 'shoes' },
  5: { id: 5, name: 'Miscellaneous', slug: 'miscellaneous' },
};

const rawProducts = [
  {
    id: '2d0269ab-75b6-48f8-88aa-0f9f6fa4ee87',
    title: 'Majestic Mountain Graphic T-Shirt',
    description:
      'Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.',
    price: 44,
    images:
      'https://i.imgur.com/QkIa5tT.jpeg,https://i.imgur.com/jb5Yu0h.jpeg,https://i.imgur.com/UlxxXyG.jpeg',
    category_id: '1',
    slug: 'majestic-mountain-graphic-t-shirt',
  },
  {
    id: '87ae06e5-7096-4ce3-af2e-1b6f8623711b',
    title: 'Classic Red Pullover Hoodie',
    description:
      'Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.',
    price: 10,
    images:
      'https://i.imgur.com/1twoaDy.jpeg,https://i.imgur.com/FDwQgLy.jpeg,https://i.imgur.com/kg1ZhhH.jpeg',
    category_id: '1',
    slug: 'classic-red-pullover-hoodie',
  },
  {
    id: '6895b836-0632-4da4-a961-e579ad7b2612',
    title: 'Classic Heather Gray Hoodie',
    description:
      'Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.',
    price: 69,
    images:
      'https://i.imgur.com/cHddUCu.jpeg,https://i.imgur.com/CFOjAgK.jpeg,https://i.imgur.com/wbIMMme.jpeg',
    category_id: '1',
    slug: 'classic-heather-gray-hoodie',
  },
  {
    id: '804ec042-9b81-4392-ac3b-76a533912d3a',
    title: 'Classic Grey Hooded Sweatshirt',
    description:
      'Elevate your casual wear with our Classic Grey Hooded Sweatshirt. Made from a soft cotton blend, this hoodie features a front kangaroo pocket, an adjustable drawstring hood, and ribbed cuffs for a snug fit. Perfect for those chilly evenings or lazy weekends, it pairs effortlessly with your favorite jeans or joggers.',
    price: 90,
    images:
      'https://i.imgur.com/R2PN9Wq.jpeg,https://i.imgur.com/IvxMPFr.jpeg,https://i.imgur.com/7eW9nXP.jpeg',
    category_id: '1',
    slug: 'classic-grey-hooded-sweatshirt',
  },
  {
    id: 'f8d2bcc7-dfaa-4ee2-8f9b-f1250a144a2b',
    title: 'Classic Black Hooded Sweatshirt',
    description:
      'Elevate your casual wardrobe with our Classic Black Hooded Sweatshirt. Made from high-quality, soft fabric that ensures comfort and durability, this hoodie features a spacious kangaroo pocket and an adjustable drawstring hood. Its versatile design makes it perfect for a relaxed day at home or a casual outing.',
    price: 79,
    images:
      'https://i.imgur.com/cSytoSD.jpeg,https://i.imgur.com/WwKucXb.jpeg,https://i.imgur.com/cE2Dxh9.jpeg',
    category_id: '1',
    slug: 'classic-black-hooded-sweatshirt',
  },
  {
    id: '02064888-f93e-44e2-8504-d4dbbab6ce7b',
    title: 'Classic Comfort Fit Joggers',
    description:
      'Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers. These versatile black joggers feature a soft elastic waistband with an adjustable drawstring, two side pockets, and ribbed ankle cuffs for a secure fit. Made from a lightweight and durable fabric, they are ideal for both active days and relaxed lounging.',
    price: 25,
    images:
      'https://i.imgur.com/ZKGofuB.jpeg,https://i.imgur.com/GJi73H0.jpeg,https://i.imgur.com/633Fqrz.jpeg',
    category_id: '1',
    slug: 'classic-comfort-fit-joggers',
  },
  {
    id: 'f6f635a9-61e4-42ca-aba9-634f75560914',
    title: 'Classic Comfort Drawstring Joggers',
    description:
      'Experience the perfect blend of comfort and style with our Classic Comfort Drawstring Joggers. Designed for a relaxed fit, these joggers feature a soft, stretchable fabric, convenient side pockets, and an adjustable drawstring waist with elegant gold-tipped detailing. Ideal for lounging or running errands, these pants will quickly become your go-to for effortless, casual wear.',
    price: 79,
    images: 'https://i.imgur.com/mp3rUty.jpeg,https://i.imgur.com/JQRGIc2.jpeg',
    category_id: '1',
    slug: 'classic-comfort-drawstring-joggers',
  },
  {
    id: '6886dbd4-2818-48b0-b80b-870c131a6cbb',
    title: 'Classic Red Jogger Sweatpants',
    description:
      'Experience ultimate comfort with our red jogger sweatpants, perfect for both workout sessions and lounging around the house. Made with soft, durable fabric, these joggers feature a snug waistband, adjustable drawstring, and practical side pockets for functionality. Their tapered design and elastic cuffs offer a modern fit that keeps you looking stylish on the go.',
    price: 98,
    images:
      'https://i.imgur.com/9LFjwpI.jpeg,https://i.imgur.com/vzrTgUR.jpeg,https://i.imgur.com/p5NdI6n.jpeg',
    category_id: '1',
    slug: 'classic-red-jogger-sweatpants',
  },
  {
    id: '2e2b511c-a078-4b9e-b926-277930b107a2',
    title: 'Classic Navy Blue Baseball Cap',
    description:
      'Step out in style with this sleek navy blue baseball cap. Crafted from durable material, it features a smooth, structured design and an adjustable strap for the perfect fit. Protect your eyes from the sun and complement your casual looks with this versatile and timeless accessory.',
    price: 61,
    images:
      'https://i.imgur.com/R3iobJA.jpeg,https://i.imgur.com/Wv2KTsf.jpeg,https://i.imgur.com/76HAxcA.jpeg',
    category_id: '1',
    slug: 'classic-navy-blue-baseball-cap',
  },
  {
    id: '833014f2-a5ea-4aff-83f5-f9ce393aede5',
    title: 'Classic Blue Baseball Cap',
    description:
      'Top off your casual look with our Classic Blue Baseball Cap, made from high-quality materials for lasting comfort. Featuring a timeless six-panel design with a pre-curved visor, this adjustable cap offers both style and practicality for everyday wear.',
    price: 86,
    images:
      'https://i.imgur.com/wXuQ7bm.jpeg,https://i.imgur.com/BZrIEmb.jpeg,https://i.imgur.com/KcT6BE0.jpeg',
    category_id: '1',
    slug: 'classic-blue-baseball-cap',
  },
  {
    id: '1986db3a-13aa-47fa-bb93-44fed379683f',
    title: 'Classic Red Baseball Cap',
    description:
      'Elevate your casual wardrobe with this timeless red baseball cap. Crafted from durable fabric, it features a comfortable fit with an adjustable strap at the back, ensuring one size fits all. Perfect for sunny days or adding a sporty touch to your outfit.',
    price: 35,
    images:
      'https://i.imgur.com/cBuLvBi.jpeg,https://i.imgur.com/N1GkCIR.jpeg,https://i.imgur.com/kKc9A5p.jpeg',
    category_id: '1',
    slug: 'classic-red-baseball-cap',
  },
  {
    id: '8d5a7298-e52a-41cc-b650-c228753857e3',
    title: 'Classic Black Baseball Cap',
    description:
      'Elevate your casual wear with this timeless black baseball cap. Made with high-quality, breathable fabric, it features an adjustable strap for the perfect fit. Whether you’re out for a jog or just running errands, this cap adds a touch of style to any outfit.',
    price: 58,
    images:
      'https://i.imgur.com/KeqG6r4.jpeg,https://i.imgur.com/xGQOw3p.jpeg,https://i.imgur.com/oO5OUjb.jpeg',
    category_id: '1',
    slug: 'classic-black-baseball-cap',
  },
  {
    id: '188f9f7e-b045-444c-9757-2fc1b17fd19c',
    title: 'Classic Olive Chino Shorts',
    description:
      'Elevate your casual wardrobe with these classic olive chino shorts. Designed for comfort and versatility, they feature a smooth waistband, practical pockets, and a tailored fit that makes them perfect for both relaxed weekends and smart-casual occasions. The durable fabric ensures they hold up throughout your daily activities while maintaining a stylish look.',
    price: 84,
    images: 'https://i.imgur.com/UsFIvYs.jpeg,https://i.imgur.com/YIq57b6.jpeg',
    category_id: '1',
    slug: 'classic-olive-chino-shorts',
  },
  {
    id: '019d1132-a618-4dcc-8530-02d28ce9d92d',
    title: 'Classic High-Waisted Athletic Shorts',
    description:
      'Stay comfortable and stylish with our Classic High-Waisted Athletic Shorts. Designed for optimal movement and versatility, these shorts are a must-have for your workout wardrobe. Featuring a figure-flattering high waist, breathable fabric, and a secure fit that ensures they stay in place during any activity, these shorts are perfect for the gym, running, or even just casual wear.',
    price: 43,
    images:
      'https://i.imgur.com/eGOUveI.jpeg,https://i.imgur.com/UcsGO7E.jpeg,https://i.imgur.com/NLn4e7S.jpeg',
    category_id: '1',
    slug: 'classic-high-waisted-athletic-shorts',
  },
  {
    id: '4e03f778-5e34-487e-8b99-9d04f74cf2b2',
    title: 'Classic White Crew Neck T-Shirt',
    description:
      'Elevate your basics with this versatile white crew neck tee. Made from a soft, breathable cotton blend, it offers both comfort and durability. Its sleek, timeless design ensures it pairs well with virtually any outfit. Ideal for layering or wearing on its own, this t-shirt is a must-have staple for every wardrobe.',
    price: 39,
    images:
      'https://i.imgur.com/axsyGpD.jpeg,https://i.imgur.com/T8oq9X2.jpeg,https://i.imgur.com/J6MinJn.jpeg',
    category_id: '1',
    slug: 'classic-white-crew-neck-t-shirt',
  },
  {
    id: '7308c989-8265-4a9a-8d84-39a2c50d3cb8',
    title: 'Classic White Tee - Timeless Style and Comfort',
    description:
      "Elevate your everyday wardrobe with our Classic White Tee. Crafted from premium soft cotton material, this versatile t-shirt combines comfort with durability, perfect for daily wear. Featuring a relaxed, unisex fit that flatters every body type, it's a staple piece for any casual ensemble. Easy to care for and machine washable, this white tee retains its shape and softness wash after wash. Pair it with your favorite jeans or layer it under a jacket for a smart look.",
    price: 73,
    images:
      'https://i.imgur.com/Y54Bt8J.jpeg,https://i.imgur.com/SZPDSgy.jpeg,https://i.imgur.com/sJv4Xx0.jpeg',
    category_id: '1',
    slug: 'classic-white-tee-timeless-style-and-comfort',
  },
  {
    id: '6413aab0-7e11-4880-af4a-909f163d0f50',
    title: 'Classic Black T-Shirt',
    description:
      "Elevate your everyday style with our Classic Black T-Shirt. This staple piece is crafted from soft, breathable cotton for all-day comfort. Its versatile design features a classic crew neck and short sleeves, making it perfect for layering or wearing on its own. Durable and easy to care for, it's sure to become a favorite in your wardrobe.",
    price: 35,
    images:
      'https://i.imgur.com/9DqEOV5.jpeg,https://i.imgur.com/ae0AEYn.jpeg,https://i.imgur.com/mZ4rUjj.jpeg',
    category_id: '1',
    slug: 'classic-black-t-shirt',
  },
  {
    id: '401c1152-6b78-45d8-801d-dd63bdb2b02f',
    title: 'Sleek White & Orange Wireless Gaming Controller',
    description:
      'Elevate your gaming experience with this state-of-the-art wireless controller, featuring a crisp white base with vibrant orange accents. Designed for precision play, the ergonomic shape and responsive buttons provide maximum comfort and control for endless hours of gameplay. Compatible with multiple gaming platforms, this controller is a must-have for any serious gamer looking to enhance their setup.',
    price: 69,
    images:
      'https://i.imgur.com/ZANVnHE.jpeg,https://i.imgur.com/Ro5z6Tn.jpeg,https://i.imgur.com/woA93Li.jpeg',
    category_id: '2',
    slug: 'sleek-white-orange-wireless-gaming-controller',
  },
  {
    id: 'eb5e9eb4-e819-415f-8165-a16161dc0eda',
    title: 'Sleek Wireless Headphone & Inked Earbud Set',
    description:
      'Experience the fusion of style and sound with this sophisticated audio set featuring a pair of sleek, white wireless headphones offering crystal-clear sound quality and over-ear comfort. The set also includes a set of durable earbuds, perfect for an on-the-go lifestyle. Elevate your music enjoyment with this versatile duo, designed to cater to all your listening needs.',
    price: 44,
    images:
      'https://i.imgur.com/yVeIeDa.jpeg,https://i.imgur.com/jByJ4ih.jpeg,https://i.imgur.com/KXj6Tpb.jpeg',
    category_id: '2',
    slug: 'sleek-wireless-headphone-inked-earbud-set',
  },
  {
    id: 'f2114aa6-e428-4fae-a3ae-1deb83c5bd99',
    title: 'Sleek Comfort-Fit Over-Ear Headphones',
    description:
      "Experience superior sound quality with our Sleek Comfort-Fit Over-Ear Headphones, designed for prolonged use with cushioned ear cups and an adjustable, padded headband. Ideal for immersive listening, whether you're at home, in the office, or on the move. Their durable construction and timeless design provide both aesthetically pleasing looks and long-lasting performance.",
    price: 28,
    images:
      'https://i.imgur.com/SolkFEB.jpeg,https://i.imgur.com/KIGW49u.jpeg,https://i.imgur.com/mWwek7p.jpeg',
    category_id: '2',
    slug: 'sleek-comfort-fit-over-ear-headphones',
  },
  {
    id: '74dbeeb3-7f5a-49a4-be4e-c1d547789ae4',
    title: 'Efficient 2-Slice Toaster',
    description:
      'Enhance your morning routine with our sleek 2-slice toaster, featuring adjustable browning controls and a removable crumb tray for easy cleaning. This compact and stylish appliance is perfect for any kitchen, ensuring your toast is always golden brown and delicious.',
    price: 48,
    images:
      'https://i.imgur.com/keVCVIa.jpeg,https://i.imgur.com/afHY7v2.jpeg,https://i.imgur.com/yAOihUe.jpeg',
    category_id: '2',
    slug: 'efficient-2-slice-toaster',
  },
  {
    id: '575895da-dca5-42e9-90b1-cc5bb9cc401a',
    title: 'Sleek Wireless Computer Mouse',
    description:
      'Experience smooth and precise navigation with this modern wireless mouse, featuring a glossy finish and a comfortable ergonomic design. Its responsive tracking and easy-to-use interface make it the perfect accessory for any desktop or laptop setup. The stylish blue hue adds a splash of color to your workspace, while its compact size ensures it fits neatly in your bag for on-the-go productivity.',
    price: 10,
    images:
      'https://i.imgur.com/w3Y8NwQ.jpeg,https://i.imgur.com/WJFOGIC.jpeg,https://i.imgur.com/dV4Nklf.jpeg',
    category_id: '2',
    slug: 'sleek-wireless-computer-mouse',
  },
  {
    id: '101b3caa-4d87-49ce-80ff-d4eec5f326e8',
    title: 'Sleek Modern Laptop with Ambient Lighting',
    description:
      'Experience next-level computing with our ultra-slim laptop, featuring a stunning display illuminated by ambient lighting. This high-performance machine is perfect for both work and play, delivering powerful processing in a sleek, portable design. The vibrant colors add a touch of personality to your tech collection, making it as stylish as it is functional.',
    price: 43,
    images:
      'https://i.imgur.com/OKn1KFI.jpeg,https://i.imgur.com/G4f21Ai.jpeg,https://i.imgur.com/Z9oKRVJ.jpeg',
    category_id: '2',
    slug: 'sleek-modern-laptop-with-ambient-lighting',
  },
  {
    id: '5a00abda-d276-4c20-b199-0c7610d7827c',
    title: 'Sleek Modern Laptop for Professionals',
    description:
      'Experience cutting-edge technology and elegant design with our latest laptop model. Perfect for professionals on-the-go, this high-performance laptop boasts a powerful processor, ample storage, and a long-lasting battery life, all encased in a lightweight, slim frame for ultimate portability. Shop now to elevate your work and play.',
    price: 97,
    images:
      'https://i.imgur.com/ItHcq7o.jpeg,https://i.imgur.com/55GM3XZ.jpeg,https://i.imgur.com/tcNJxoW.jpeg',
    category_id: '2',
    slug: 'sleek-modern-laptop-for-professionals',
  },
  {
    id: '5c29e945-fb4c-44e3-b59d-3dc7c9557a75',
    title: 'Stylish Red & Silver Over-Ear Headphones',
    description:
      'Immerse yourself in superior sound quality with these sleek red and silver over-ear headphones. Designed for comfort and style, the headphones feature cushioned ear cups, an adjustable padded headband, and a detachable red cable for easy storage and portability. Perfect for music lovers and audiophiles who value both appearance and audio fidelity.',
    price: 39,
    images:
      'https://i.imgur.com/YaSqa06.jpeg,https://i.imgur.com/isQAliJ.jpeg,https://i.imgur.com/5B8UQfh.jpeg',
    category_id: '2',
    slug: 'stylish-red-silver-over-ear-headphones',
  },
  {
    id: '94a1ae4a-7920-4434-9c5f-6d87a3b476c5',
    title: 'Sleek Mirror Finish Phone Case',
    description:
      "Enhance your smartphone's look with this ultra-sleek mirror finish phone case. Designed to offer style with protection, the case features a reflective surface that adds a touch of elegance while keeping your device safe from scratches and impacts. Perfect for those who love a minimalist and modern aesthetic.",
    price: 27,
    images:
      'https://i.imgur.com/yb9UQKL.jpeg,https://i.imgur.com/m2owtQG.jpeg,https://i.imgur.com/bNiORct.jpeg',
    category_id: '2',
    slug: 'sleek-mirror-finish-phone-case',
  },
  {
    id: '77b86707-8862-4d94-8a2b-ca0fd5824a9a',
    title: 'Sleek Smartwatch with Vibrant Display',
    description:
      'Experience modern timekeeping with our high-tech smartwatch, featuring a vivid touch screen display, customizable watch faces, and a comfortable blue silicone strap. This smartwatch keeps you connected with notifications and fitness tracking while showcasing exceptional style and versatility.',
    price: 16,
    images:
      'https://i.imgur.com/LGk9Jn2.jpeg,https://i.imgur.com/1ttYWaI.jpeg,https://i.imgur.com/sPRWnJH.jpeg',
    category_id: '2',
    slug: 'sleek-smartwatch-with-vibrant-display',
  },
  {
    id: '96a5823a-e9af-43a2-b856-aa39916fb54e',
    title: 'Sleek Modern Leather Sofa',
    description:
      'Enhance the elegance of your living space with our Sleek Modern Leather Sofa. Designed with a minimalist aesthetic, it features clean lines and a luxurious leather finish. The robust metal legs provide stability and support, while the plush cushions ensure comfort. Perfect for contemporary homes or office waiting areas, this sofa is a statement piece that combines style with practicality.',
    price: 53,
    images:
      'https://i.imgur.com/Qphac99.jpeg,https://i.imgur.com/dJjpEgG.jpeg,https://i.imgur.com/MxJyADq.jpeg',
    category_id: '3',
    slug: 'sleek-modern-leather-sofa',
  },
  {
    id: '0845a500-0932-4057-915f-3504acfc070b',
    title: 'Mid-Century Modern Wooden Dining Table',
    description:
      'Elevate your dining room with this sleek Mid-Century Modern dining table, featuring an elegant walnut finish and tapered legs for a timeless aesthetic. Its sturdy wood construction and minimalist design make it a versatile piece that fits with a variety of decor styles. Perfect for intimate dinners or as a stylish spot for your morning coffee.',
    price: 24,
    images:
      'https://i.imgur.com/DMQHGA0.jpeg,https://i.imgur.com/qrs9QBg.jpeg,https://i.imgur.com/XVp8T1I.jpeg',
    category_id: '3',
    slug: 'mid-century-modern-wooden-dining-table',
  },
  {
    id: '65f6ccbf-845e-4b6a-beb7-eb16f5ff674d',
    title: 'Elegant Golden-Base Stone Top Dining Table',
    description:
      'Elevate your dining space with this luxurious table, featuring a sturdy golden metal base with an intricate rod design that provides both stability and chic elegance. The smooth stone top in a sleek round shape offers a robust surface for your dining pleasure. Perfect for both everyday meals and special occasions, this table easily complements any modern or glam decor.',
    price: 66,
    images:
      'https://i.imgur.com/NWIJKUj.jpeg,https://i.imgur.com/Jn1YSLk.jpeg,https://i.imgur.com/VNZRvx5.jpeg',
    category_id: '3',
    slug: 'elegant-golden-base-stone-top-dining-table',
  },
  {
    id: 'a5e857ab-e92b-4f97-b49f-c00cc051368e',
    title: 'Modern Elegance Teal Armchair',
    description:
      'Elevate your living space with this beautifully crafted armchair, featuring a sleek wooden frame that complements its vibrant teal upholstery. Ideal for adding a pop of color and contemporary style to any room, this chair provides both superb comfort and sophisticated design. Perfect for reading, relaxing, or creating a cozy conversation nook.',
    price: 25,
    images:
      'https://i.imgur.com/6wkyyIN.jpeg,https://i.imgur.com/Ald3Rec.jpeg,https://i.imgur.com/dIqo03c.jpeg',
    category_id: '3',
    slug: 'modern-elegance-teal-armchair',
  },
  {
    id: 'a4fdc26a-0c37-46e4-915f-5512566f826c',
    title: 'Elegant Solid Wood Dining Table',
    description:
      'Enhance your dining space with this sleek, contemporary dining table, crafted from high-quality solid wood with a warm finish. Its sturdy construction and minimalist design make it a perfect addition for any home looking for a touch of elegance. Accommodates up to six guests comfortably and includes a striking fruit bowl centerpiece. The overhead lighting is not included.',
    price: 67,
    images:
      'https://i.imgur.com/4lTaHfF.jpeg,https://i.imgur.com/JktHE1C.jpeg,https://i.imgur.com/cQeXQMi.jpeg',
    category_id: '3',
    slug: 'elegant-solid-wood-dining-table',
  },
  {
    id: 'e0f67200-e73e-4a45-b785-2f885e956570',
    title: 'Modern Minimalist Workstation Setup',
    description:
      'Elevate your home office with our Modern Minimalist Workstation Setup, featuring a sleek wooden desk topped with an elegant computer, stylish adjustable wooden desk lamp, and complimentary accessories for a clean, productive workspace. This setup is perfect for professionals seeking a contemporary look that combines functionality with design.',
    price: 49,
    images:
      'https://i.imgur.com/3oXNBst.jpeg,https://i.imgur.com/ErYYZnT.jpeg,https://i.imgur.com/boBPwYW.jpeg',
    category_id: '3',
    slug: 'modern-minimalist-workstation-setup',
  },
  {
    id: 'd350ecea-9e19-49b8-afb3-76391c125a07',
    title: 'Modern Ergonomic Office Chair',
    description:
      'Elevate your office space with this sleek and comfortable Modern Ergonomic Office Chair. Designed to provide optimal support throughout the workday, it features an adjustable height mechanism, smooth-rolling casters for easy mobility, and a cushioned seat for extended comfort. The clean lines and minimalist white design make it a versatile addition to any contemporary workspace.',
    price: 71,
    images: 'https://i.imgur.com/3dU0m72.jpeg,https://i.imgur.com/zPU3EVa.jpeg',
    category_id: '3',
    slug: 'modern-ergonomic-office-chair',
  },
  {
    id: '1496a70d-977c-4d47-b277-20e8813891f2',
    title: 'Futuristic Holographic Soccer Cleats',
    description:
      "Step onto the field and stand out from the crowd with these eye-catching holographic soccer cleats. Designed for the modern player, these cleats feature a sleek silhouette, lightweight construction for maximum agility, and durable studs for optimal traction. The shimmering holographic finish reflects a rainbow of colors as you move, ensuring that you'll be noticed for both your skills and style. Perfect for the fashion-forward athlete who wants to make a statement.",
    price: 39,
    images:
      'https://i.imgur.com/qNOjJje.jpeg,https://i.imgur.com/NjfCFnu.jpeg,https://i.imgur.com/eYtvXS1.jpeg',
    category_id: '4',
    slug: 'futuristic-holographic-soccer-cleats',
  },
  {
    id: '2a6e5d20-c815-437d-a4df-5cf4a1e330db',
    title: 'Rainbow Glitter High Heels',
    description:
      'Step into the spotlight with these eye-catching rainbow glitter high heels. Designed to dazzle, each shoe boasts a kaleidoscope of shimmering colors that catch and reflect light with every step. Perfect for special occasions or a night out, these stunners are sure to turn heads and elevate any ensemble.',
    price: 39,
    images:
      'https://i.imgur.com/62gGzeF.jpeg,https://i.imgur.com/5MoPuFM.jpeg,https://i.imgur.com/sUVj7pK.jpeg',
    category_id: '4',
    slug: 'rainbow-glitter-high-heels',
  },
  {
    id: 'bd049e03-5bce-4c68-95ac-1bf3f4d2c93c',
    title: 'Chic Summer Denim Espadrille Sandals',
    description:
      'Step into summer with style in our denim espadrille sandals. Featuring a braided jute sole for a classic touch and adjustable denim straps for a snug fit, these sandals offer both comfort and a fashionable edge. The easy slip-on design ensures convenience for beach days or casual outings.',
    price: 33,
    images:
      'https://i.imgur.com/9qrmE1b.jpeg,https://i.imgur.com/wqKxBVH.jpeg,https://i.imgur.com/sWSV6DK.jpeg',
    category_id: '4',
    slug: 'chic-summer-denim-espadrille-sandals',
  },
  {
    id: 'ad50331b-a385-4cd3-a6d8-093a055050b4',
    title: 'Vibrant Runners: Bold Orange & Blue Sneakers',
    description:
      "Step into style with these eye-catching sneakers featuring a striking combination of orange and blue hues. Designed for both comfort and fashion, these shoes come with flexible soles and cushioned insoles, perfect for active individuals who don't compromise on style. The reflective silver accents add a touch of modernity, making them a standout accessory for your workout or casual wear.",
    price: 27,
    images:
      'https://i.imgur.com/hKcMNJs.jpeg,https://i.imgur.com/NYToymX.jpeg,https://i.imgur.com/HiiapCt.jpeg',
    category_id: '4',
    slug: 'vibrant-runners-bold-orange-blue-sneakers',
  },
  {
    id: '9557c118-3bca-47f5-934f-45c1c35c22d5',
    title: 'Vibrant Pink Classic Sneakers',
    description:
      'Step into style with our Vibrant Pink Classic Sneakers! These eye-catching shoes feature a bold pink hue with iconic white detailing, offering a sleek, timeless design. Constructed with durable materials and a comfortable fit, they are perfect for those seeking a pop of color in their everyday footwear. Grab a pair today and add some vibrancy to your step!',
    price: 84,
    images:
      'https://i.imgur.com/mcW42Gi.jpeg,https://i.imgur.com/mhn7qsF.jpeg,https://i.imgur.com/F8vhnFJ.jpeg',
    category_id: '4',
    slug: 'vibrant-pink-classic-sneakers',
  },
  {
    id: '4104897d-c988-40bd-9c6a-db6bda699f5e',
    title: 'Futuristic Silver and Gold High-Top Sneaker',
    description:
      'Step into the future with this eye-catching high-top sneaker, designed for those who dare to stand out. The sneaker features a sleek silver body with striking gold accents, offering a modern twist on classic footwear. Its high-top design provides support and style, making it the perfect addition to any avant-garde fashion collection. Grab a pair today and elevate your shoe game!',
    price: 68,
    images:
      'https://i.imgur.com/npLfCGq.jpeg,https://i.imgur.com/vYim3gj.jpeg,https://i.imgur.com/HxuHwBO.jpeg',
    category_id: '4',
    slug: 'futuristic-silver-and-gold-high-top-sneaker',
  },
  {
    id: '8d2f499a-2605-46f5-877e-d8751333eaec',
    title: 'Futuristic Chic High-Heel Boots',
    description:
      'Elevate your style with our cutting-edge high-heel boots that blend bold design with avant-garde aesthetics. These boots feature a unique color-block heel, a sleek silhouette, and a versatile light grey finish that pairs easily with any cutting-edge outfit. Crafted for the fashion-forward individual, these boots are sure to make a statement.',
    price: 36,
    images:
      'https://i.imgur.com/HqYqLnW.jpeg,https://i.imgur.com/RlDGnZw.jpeg,https://i.imgur.com/qa0O6fg.jpeg',
    category_id: '4',
    slug: 'futuristic-chic-high-heel-boots',
  },
  {
    id: 'e06c9e4f-4206-4935-8c01-bc1efeb699fd',
    title: 'Elegant Patent Leather Peep-Toe Pumps with Gold-Tone Heel',
    description:
      'Step into sophistication with these chic peep-toe pumps, showcasing a lustrous patent leather finish and an eye-catching gold-tone block heel. The ornate buckle detail adds a touch of glamour, perfect for elevating your evening attire or complementing a polished daytime look.',
    price: 53,
    images:
      'https://i.imgur.com/AzAY4Ed.jpeg,https://i.imgur.com/umfnS9P.jpeg,https://i.imgur.com/uFyuvLg.jpeg',
    category_id: '4',
    slug: 'elegant-patent-leather-peep-toe-pumps',
  },
  {
    id: 'c63bc844-4ccd-4b87-a348-4a401b45e9e7',
    title: 'Elegant Purple Leather Loafers',
    description:
      "Step into sophistication with our Elegant Purple Leather Loafers, perfect for making a bold statement. Crafted from high-quality leather with a vibrant purple finish, these shoes feature a classic loafer silhouette that's been updated with a contemporary twist. The comfortable slip-on design and durable soles ensure both style and functionality for the modern man.",
    price: 17,
    images:
      'https://i.imgur.com/Au8J9sX.jpeg,https://i.imgur.com/gdr8BW2.jpeg,https://i.imgur.com/KDCZxnJ.jpeg',
    category_id: '4',
    slug: 'elegant-purple-leather-loafers',
  },
  {
    id: '6132ff8d-5892-4345-a7f0-44c64eaabdf5',
    title: 'Classic Blue Suede Casual Shoes',
    description:
      'Step into comfort with our Classic Blue Suede Casual Shoes, perfect for everyday wear. These shoes feature a stylish blue suede upper, durable rubber soles for superior traction, and classic lace-up fronts for a snug fit. The sleek design pairs well with both jeans and chinos, making them a versatile addition to any wardrobe.',
    price: 39,
    images:
      'https://i.imgur.com/sC0ztOB.jpeg,https://i.imgur.com/Jf9DL9R.jpeg,https://i.imgur.com/R1IN95T.jpeg',
    category_id: '4',
    slug: 'classic-blue-suede-casual-shoes',
  },
  {
    id: '7a8d2238-024c-489b-a0a1-045344645ff8',
    title: 'Sleek Futuristic Electric Bicycle',
    description:
      "This modern electric bicycle combines style and efficiency with its unique design and top-notch performance features. Equipped with a durable frame, enhanced battery life, and integrated tech capabilities, it's perfect for the eco-conscious commuter looking to navigate the city with ease.",
    price: 22,
    images:
      'https://i.imgur.com/BG8J0Fj.jpg,https://i.imgur.com/ujHBpCX.jpg,https://i.imgur.com/WHeVL9H.jpg',
    category_id: '5',
    slug: 'sleek-futuristic-electric-bicycle',
  },
  {
    id: '9cfe32b2-8e85-4a7a-bc7c-c8331914db51',
    title: 'Sleek All-Terrain Go-Kart',
    description:
      'Experience the thrill of outdoor adventures with our Sleek All-Terrain Go-Kart, featuring a durable frame, comfortable racing seat, and robust, large-tread tires perfect for handling a variety of terrains. Designed for fun-seekers of all ages, this go-kart is an ideal choice for backyard racing or exploring local trails.',
    price: 37,
    images:
      'https://i.imgur.com/Ex5x3IU.jpg,https://i.imgur.com/z7wAQwe.jpg,https://i.imgur.com/kc0Dj9S.jpg',
    category_id: '5',
    slug: 'sleek-all-terrain-go-kart',
  },
  {
    id: 'a69e845b-063e-4845-b02d-6bd8f74d0893',
    title: 'Radiant Citrus Eau de Parfum',
    description:
      "Indulge in the essence of summer with this vibrant citrus-scented Eau de Parfum. Encased in a sleek glass bottle with a bold orange cap, this fragrance embodies freshness and elegance. Perfect for daily wear, it's an olfactory delight that leaves a lasting, zesty impression.",
    price: 73,
    images:
      'https://i.imgur.com/xPDwUb3.jpg,https://i.imgur.com/3rfp691.jpg,https://i.imgur.com/kG05a29.jpg',
    category_id: '5',
    slug: 'radiant-citrus-eau-de-parfum',
  },
  {
    id: '9cbaffca-3bc3-41ef-a5ac-d262097bb266',
    title: 'Sleek Olive Green Hardshell Carry-On Luggage',
    description:
      'Travel in style with our durable hardshell carry-on, perfect for weekend getaways and business trips. This sleek olive green suitcase features smooth gliding wheels for easy airport navigation, a sturdy telescopic handle, and a secure zippered compartment to keep your belongings safe. Its compact size meets most airline overhead bin requirements, ensuring a hassle-free flying experience.',
    price: 48,
    images:
      'https://i.imgur.com/jVfoZnP.jpg,https://i.imgur.com/Tnl15XK.jpg,https://i.imgur.com/7OqTPO6.jpg',
    category_id: '5',
    slug: 'sleek-olive-green-hardshell-carry-on-luggage',
  },
  {
    id: '2f0748a1-70c4-4c09-b4cd-e04f2bef1a14',
    title: 'Chic Transparent Fashion Handbag',
    description:
      'Elevate your style with our Chic Transparent Fashion Handbag, perfect for showcasing your essentials with a clear, modern edge. This trendy accessory features durable acrylic construction, luxe gold-tone hardware, and an elegant chain strap. Its compact size ensures you can carry your day-to-day items with ease and sophistication.',
    price: 61,
    images:
      'https://i.imgur.com/Lqaqz59.jpg,https://i.imgur.com/uSqWK0m.jpg,https://i.imgur.com/atWACf1.jpg',
    category_id: '5',
    slug: 'chic-transparent-fashion-handbag',
  },
  {
    id: 'd33fbff6-a1e3-4488-9acd-6a91877d4f1d',
    title: 'Trendy Pink-Tinted Sunglasses',
    description:
      'Step up your style game with these fashionable black-framed, pink-tinted sunglasses. Perfect for making a statement while protecting your eyes from the glare. Their bold color and contemporary design make these shades a must-have accessory for any trendsetter looking to add a pop of color to their ensemble.',
    price: 38,
    images:
      'https://i.imgur.com/0qQBkxX.jpg,https://i.imgur.com/I5g1DoE.jpg,https://i.imgur.com/myfFQBW.jpg',
    category_id: '5',
    slug: 'trendy-pink-tinted-sunglasses',
  },
  {
    id: 'a6c6a9e4-50cb-4180-882f-0b9a0217537f',
    title: 'Elegant Glass Tumbler Set',
    description:
      'Enhance your drinkware collection with our sophisticated set of glass tumblers, perfect for serving your favorite beverages. This versatile set includes both clear and subtly tinted glasses, lending a modern touch to any table setting. Crafted with quality materials, these durable tumblers are designed to withstand daily use while maintaining their elegant appeal.',
    price: 50,
    images:
      'https://i.imgur.com/TF0pXdL.jpg,https://i.imgur.com/BLDByXP.jpg,https://i.imgur.com/b7trwCv.jpg',
    category_id: '5',
    slug: 'elegant-glass-tumbler-set',
  },
];

export const allProducts = rawProducts.map((product, index) => ({
  id: index + 1, // Assign a simple, sequential number ID
  title: product.title,
  slug: product.slug,
  price: product.price,
  description: product.description,
  // Look up the category object from our map and assign it
  category: categoryMap[product.category_id],
  // Split the comma-separated image string into a proper array
  images: product.images.split(','),
}));
