-- Seed data for FarmaSalud Argentina

-- Categories
INSERT INTO categories (name, slug, description, icon, parent_id) VALUES
('Medicamentos', 'medicamentos', 'Medicamentos de venta libre y con receta', 'Pill', NULL),
('Cuidado Personal', 'cuidado-personal', 'Productos para el cuidado diario', 'Heart', NULL),
('Bebés', 'bebes', 'Todo para el cuidado de tu bebé', 'Baby', NULL),
('Belleza', 'belleza', 'Cosméticos y productos de belleza', 'Sparkles', NULL),
('Hogar', 'hogar', 'Productos para el hogar y limpieza', 'Home', NULL),
('Salud y Bienestar', 'salud-bienestar', 'Suplementos y productos naturales', 'Stethoscope', NULL),
('Dermocosmética', 'dermocosmetica', 'Cuidado especializado de la piel', 'Leaf', NULL);

-- Branches in Buenos Aires and other provinces
INSERT INTO branches (name, address, city, province, postal_code, phone, latitude, longitude, hours, is_open) VALUES
('FarmaSalud Centro', 'Av. Corrientes 1234', 'Buenos Aires', 'Buenos Aires', 'C1043', '011-4567-8901', -34.603722, -58.381592, '{"monday": "8:00-22:00", "tuesday": "8:00-22:00", "wednesday": "8:00-22:00", "thursday": "8:00-22:00", "friday": "8:00-22:00", "saturday": "9:00-21:00", "sunday": "10:00-18:00"}', true),
('FarmaSalud Palermo', 'Av. Santa Fe 3456', 'Buenos Aires', 'Buenos Aires', 'C1425', '011-4876-5432', -34.588432, -58.425156, '{"monday": "8:00-22:00", "tuesday": "8:00-22:00", "wednesday": "8:00-22:00", "thursday": "8:00-22:00", "friday": "8:00-22:00", "saturday": "9:00-21:00"}', true),
('FarmaSalud Belgrano', 'Av. Cabildo 2345', 'Buenos Aires', 'Buenos Aires', 'C1428', '011-4785-6789', -34.560592, -58.457422, '{"monday": "8:00-22:00", "tuesday": "8:00-22:00", "wednesday": "8:00-22:00", "thursday": "8:00-22:00", "friday": "8:00-22:00", "saturday": "9:00-21:00"}', true),
('FarmaSalud Caballito', 'Av. Rivadavia 5678', 'Buenos Aires', 'Buenos Aires', 'C1424', '011-4903-2345', -34.619722, -58.442815, '{"monday": "8:00-22:00", "tuesday": "8:00-22:00", "wednesday": "8:00-22:00", "thursday": "8:00-22:00", "friday": "8:00-22:00", "saturday": "9:00-21:00"}', true),
('FarmaSalud Recoleta', 'Av. Callao 1890', 'Buenos Aires', 'Buenos Aires', 'C1024', '011-4806-7890', -34.590722, -58.392415, '{"monday": "8:00-22:00", "tuesday": "8:00-22:00", "wednesday": "8:00-22:00", "thursday": "8:00-22:00", "friday": "8:00-22:00", "saturday": "9:00-21:00"}', true),
('FarmaSalud San Isidro', 'Av. Libertador 4567', 'San Isidro', 'Buenos Aires', 'B1642', '011-4747-3456', -34.471235, -58.513478, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "9:00-19:00"}', true),
('FarmaSalud La Plata', 'Calle 7 N° 890', 'La Plata', 'Buenos Aires', 'B1900', '0221-423-4567', -34.921350, -57.954590, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "9:00-19:00"}', true),
('FarmaSalud Córdoba Centro', 'Av. Colón 567', 'Córdoba', 'Córdoba', 'X5000', '0351-421-3456', -31.420083, -64.188776, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "9:00-19:00"}', true),
('FarmaSalud Rosario', 'San Martín 1234', 'Rosario', 'Santa Fe', 'S2000', '0341-440-5678', -32.946899, -60.639297, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "9:00-19:00"}', true),
('FarmaSalud Mendoza', 'Av. San Martín 890', 'Mendoza', 'Mendoza', 'M5500', '0261-423-7890', -32.889458, -68.845839, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "9:00-19:00"}', true);

-- Products with realistic Argentine pharmacy items
INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Ibuprofeno 400mg x 30 comprimidos',
  'ibuprofeno-400mg-30',
  'Analgésico y antiinflamatorio para el alivio del dolor leve a moderado. Reduce la fiebre y la inflamación. Indicado para dolores musculares, articulares, de cabeza y menstruales.',
  'Analgésico y antiinflamático 400mg x 30 comp.',
  2890,
  NULL,
  id,
  'Bayer',
  false,
  150,
  '["https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg"]',
  ARRAY['analgésico', 'antiinflamatorio', 'dolor'],
  true,
  false
FROM categories WHERE slug = 'medicamentos';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Tafirol 1g x 16 comprimidos',
  'tafirol-1g-16',
  'Analgésico y antipirético de acción rápida. Alivia dolores de cabeza, musculares, dentales y menstruales. Reduce la fiebre. Fórmula de acción prolongada.',
  'Paracetamol 1g para dolor y fiebre',
  3450,
  4200,
  id,
  'Genomma Lab',
  false,
  200,
  '["https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg"]',
  ARRAY['analgésico', 'antipirético', 'dolor', 'fiebre'],
  true,
  true
FROM categories WHERE slug = 'medicamentos';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Amoxicilina 500mg x 21 cápsulas',
  'amoxicilina-500mg-21',
  'Antibiótico de amplio espectro para el tratamiento de infecciones bacterianas. Efectivo contra infecciones respiratorias, urinarias y de piel. Debe completarse el tratamiento indicado.',
  'Antibiótico de amplio espectro 500mg',
  8750,
  NULL,
  id,
  'Roemmers',
  true,
  80,
  '["https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg"]',
  ARRAY['antibiótico', 'infección', 'bacterias'],
  false,
  false
FROM categories WHERE slug = 'medicamentos';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Crema Hidratante La Roche-Posay',
  'crema-hidratante-laroche',
  'Crema hidratante intensiva para pieles sensibles. Con agua termal y glicerina. Textura ligera de rápida absorción. Hipoalergénica y sin perfume. Restaura la barrera cutánea.',
  'Hidratación profunda para pieles sensibles',
  12890,
  15600,
  id,
  'La Roche-Posay',
  false,
  60,
  '["https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg"]',
  ARRAY['hidratante', 'piel sensible', 'dermocosmética'],
  true,
  true
FROM categories WHERE slug = 'dermocosmetica';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Protector Solar Isdin SPF 50+',
  'protector-solar-isdin-50',
  'Protección solar muy alta UVB/UVA. Textura ultraligera de rápida absorción. Resistente al agua. No deja residuo blanco. Ideal para uso diario en rostro y cuerpo.',
  'Protección solar facial SPF 50+ 50ml',
  18750,
  NULL,
  id,
  'Isdin',
  false,
  90,
  '["https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg"]',
  ARRAY['protector solar', 'spf50', 'facial'],
  true,
  false
FROM categories WHERE slug = 'dermocosmetica';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Shampoo Pantene Pro-V 400ml',
  'shampoo-pantene-400ml',
  'Shampoo reparador para cabello dañado. Fórmula con Pro-Vitamina B5. Limpia suavemente mientras fortalece. Deja el cabello suave y brillante. Uso diario.',
  'Shampoo reparador con Pro-Vitamina B5',
  4590,
  5800,
  id,
  'Pantene',
  false,
  120,
  '["https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg"]',
  ARRAY['shampoo', 'cabello', 'reparador'],
  false,
  true
FROM categories WHERE slug = 'cuidado-personal';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Crema Dental Colgate Total 12',
  'crema-dental-colgate-total',
  'Pasta dental con protección antibacterial de 12 horas. Previene caries, gingivitis y sarro. Blanquea suavemente los dientes. Aliento fresco duradero. Fórmula con zinc.',
  'Pasta dental protección total 90g',
  3250,
  NULL,
  id,
  'Colgate',
  false,
  180,
  '["https://images.pexels.com/photos/4269365/pexels-photo-4269365.jpeg"]',
  ARRAY['crema dental', 'higiene bucal', 'blanqueador'],
  true,
  false
FROM categories WHERE slug = 'cuidado-personal';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Desodorante Rexona Clinical 48g',
  'desodorante-rexona-clinical',
  'Desodorante antitranspirante de máxima protección. Fórmula clinical con 96 horas de protección. Sin alcohol. No mancha la ropa. Dermatológicamente probado.',
  'Antitranspirante máxima protección 96hs',
  5890,
  7200,
  id,
  'Rexona',
  false,
  100,
  '["https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg"]',
  ARRAY['desodorante', 'antitranspirante', 'protección'],
  false,
  true
FROM categories WHERE slug = 'cuidado-personal';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Pañales Pampers Premium Care M x 56',
  'panales-pampers-m-56',
  'Pañales de máxima absorción y suavidad. Con canales de aire que mantienen la piel seca. Cintura elástica para mejor ajuste. Indicadores de humedad. Hipoalergénicos.',
  'Pañales Premium talle M x 56 unidades',
  12450,
  NULL,
  id,
  'Pampers',
  false,
  70,
  '["https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg"]',
  ARRAY['pañales', 'bebé', 'absorción'],
  true,
  false
FROM categories WHERE slug = 'bebes';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Toallitas Húmedas Huggies x 96',
  'toallitas-huggies-96',
  'Toallitas húmedas para bebé con triple limpieza. Con extracto de aloe y vitamina E. Libres de alcohol y parabenos. Textura suave y resistente. Dermatológicamente probadas.',
  'Toallitas húmedas con aloe x 96',
  3890,
  4500,
  id,
  'Huggies',
  false,
  150,
  '["https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg"]',
  ARRAY['toallitas', 'bebé', 'limpieza'],
  true,
  true
FROM categories WHERE slug = 'bebes';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Leche Corporal Nivea 400ml',
  'leche-corporal-nivea-400ml',
  'Loción hidratante para todo el cuerpo. Con vitamina E y aceites nutritivos. Piel suave y tersa por 48 horas. Absorción rápida sin sensación grasa. Para todo tipo de piel.',
  'Hidratante corporal 48hs 400ml',
  5990,
  NULL,
  id,
  'Nivea',
  false,
  110,
  '["https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg"]',
  ARRAY['hidratante', 'corporal', 'piel'],
  false,
  false
FROM categories WHERE slug = 'cuidado-personal';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Vitamina C 1000mg x 30 comprimidos',
  'vitamina-c-1000mg-30',
  'Suplemento de vitamina C de alta potencia. Fortalece el sistema inmunológico. Poderoso antioxidante. Ayuda en la absorción de hierro. Un comprimido diario.',
  'Vitamina C 1000mg sistema inmune',
  6750,
  8900,
  id,
  'Bago',
  false,
  95,
  '["https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg"]',
  ARRAY['vitamina', 'suplemento', 'inmunidad'],
  true,
  true
FROM categories WHERE slug = 'salud-bienestar';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Omega 3 x 60 cápsulas',
  'omega-3-60-capsulas',
  'Aceite de pescado rico en EPA y DHA. Apoya la salud cardiovascular y cerebral. Reduce triglicéridos. Anti-inflamatorio natural. Sin sabor a pescado.',
  'Omega 3 salud cardiovascular 60 cáps',
  9850,
  NULL,
  id,
  'Nutrigen',
  false,
  75,
  '["https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg"]',
  ARRAY['omega3', 'suplemento', 'corazón'],
  false,
  false
FROM categories WHERE slug = 'salud-bienestar';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Sérum Facial Vichy Minéral 89',
  'serum-vichy-mineral-89',
  'Sérum hidratante con 89% agua volcánica mineralizada. Fortalece la barrera cutánea. Textura gel ultra-ligera. Potencia la eficacia de tu rutina. Todo tipo de pieles.',
  'Sérum hidratante fortificante 50ml',
  22900,
  NULL,
  id,
  'Vichy',
  false,
  50,
  '["https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg"]',
  ARRAY['sérum', 'hidratante', 'facial'],
  true,
  false
FROM categories WHERE slug = 'dermocosmetica';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Rimmel Máscara Lash Accelerator',
  'rimmel-mascara-lash',
  'Máscara de pestañas con fórmula que estimula el crecimiento. Volumen y longitud instantáneos. No se apelmaza ni deja grumos. A prueba de agua. Negro intenso.',
  'Máscara de pestañas volumen extremo',
  8750,
  11200,
  id,
  'Rimmel',
  false,
  65,
  '["https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg"]',
  ARRAY['máscara', 'pestañas', 'maquillaje'],
  false,
  true
FROM categories WHERE slug = 'belleza';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Base Líquida Maybelline Fit Me',
  'base-maybelline-fit-me',
  'Base de maquillaje de cobertura natural a media. 12 horas de duración. No obstruye poros. Textura ligera. SPF 18. Disponible en múltiples tonos.',
  'Base líquida acabado natural SPF18',
  11990,
  NULL,
  id,
  'Maybelline',
  false,
  80,
  '["https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg"]',
  ARRAY['base', 'maquillaje', 'cobertura'],
  false,
  false
FROM categories WHERE slug = 'belleza';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Alcohol en Gel 500ml',
  'alcohol-gel-500ml',
  'Alcohol en gel antibacterial para manos. Elimina 99.9% de gérmenes. Con glicerina para no resecar. No necesita agua ni enjuague. Aroma suave.',
  'Alcohol en gel antiséptico 500ml',
  2490,
  NULL,
  id,
  'FarmaSalud',
  false,
  200,
  '["https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"]',
  ARRAY['alcohol', 'higiene', 'antibacterial'],
  true,
  false
FROM categories WHERE slug = 'hogar';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Barbijos Quirúrgicos x 50',
  'barbijos-quirurgicos-50',
  'Barbijos descartables de triple capa. Alta filtración. Cómodos y transpirables. Con clip nasal ajustable. Ideal para uso diario. Certificados.',
  'Barbijos descartables 3 capas x 50',
  4890,
  6200,
  id,
  'FarmaSalud',
  false,
  130,
  '["https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"]',
  ARRAY['barbijos', 'protección', 'higiene'],
  false,
  true
FROM categories WHERE slug = 'hogar';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Termómetro Digital Infrarrojo',
  'termometro-digital-infrarrojo',
  'Termómetro sin contacto de lectura instantánea. Mide temperatura frontal y ambiental. Pantalla LCD con retroiluminación. Memoria de 32 lecturas. Alarma de fiebre.',
  'Termómetro infrarrojo sin contacto',
  15900,
  NULL,
  id,
  'Omron',
  false,
  45,
  '["https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"]',
  ARRAY['termómetro', 'digital', 'fiebre'],
  true,
  false
FROM categories WHERE slug = 'salud-bienestar';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Tensiómetro Digital de Brazo',
  'tensiometro-digital-brazo',
  'Tensiómetro automático de brazo. Medición precisa de presión arterial. Detección de arritmias. Memoria para 60 lecturas. Pantalla grande. Estuche incluido.',
  'Tensiómetro digital con memoria',
  28500,
  35000,
  id,
  'Omron',
  false,
  35,
  '["https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"]',
  ARRAY['tensiómetro', 'presión', 'salud'],
  true,
  true
FROM categories WHERE slug = 'salud-bienestar';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Crema para Pañalitis x 100g',
  'crema-panalitis-100g',
  'Crema protectora y reparadora para la zona del pañal. Con óxido de zinc. Previene y trata irritaciones. Textura suave. Hipoalergénica. Sin parabenos.',
  'Crema protectora zona del pañal',
  5490,
  NULL,
  id,
  'Johnson & Johnson',
  false,
  90,
  '["https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg"]',
  ARRAY['crema', 'bebé', 'pañalitis'],
  false,
  false
FROM categories WHERE slug = 'bebes';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Shampoo para Bebé 400ml',
  'shampoo-bebe-400ml',
  'Shampoo suave sin lágrimas para bebés. Fórmula con pH balanceado. Limpia delicadamente. No irrita los ojos. Con extracto de manzanilla. Hipoalergénico.',
  'Shampoo sin lágrimas pH balanceado',
  4250,
  5100,
  id,
  'Johnson & Johnson',
  false,
  105,
  '["https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg"]',
  ARRAY['shampoo', 'bebé', 'sin lágrimas'],
  false,
  true
FROM categories WHERE slug = 'bebes';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Suero Fisiológico x 20 Ampollas',
  'suero-fisiologico-20',
  'Solución fisiológica estéril. Para limpieza nasal y ocular. Alivia congestión nasal. Cada ampolla es monodosis. Sin conservantes. Ideal para bebés y adultos.',
  'Suero fisiológico monodosis x 20',
  3890,
  NULL,
  id,
  'Pisa',
  false,
  140,
  '["https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"]',
  ARRAY['suero', 'nasal', 'higiene'],
  false,
  false
FROM categories WHERE slug = 'medicamentos';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Jarabe para la Tos 120ml',
  'jarabe-tos-120ml',
  'Jarabe expectorante con guaifenesina. Alivia la tos productiva. Fluidifica las secreciones. Sabor agradable. Para adultos y niños mayores de 6 años.',
  'Jarabe expectorante 120ml',
  6490,
  NULL,
  id,
  'Elea',
  false,
  85,
  '["https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg"]',
  ARRAY['jarabe', 'tos', 'expectorante'],
  false,
  false
FROM categories WHERE slug = 'medicamentos';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Antiácido Masticable x 40',
  'antiacido-masticable-40',
  'Antiácido de acción rápida con carbonato de calcio. Alivia acidez y malestar estomacal. Sabor menta. Masticables. No produce rebote ácido.',
  'Antiácido rápido sabor menta x 40',
  4750,
  5900,
  id,
  'Bayer',
  false,
  110,
  '["https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg"]',
  ARRAY['antiácido', 'acidez', 'estómago'],
  false,
  true
FROM categories WHERE slug = 'medicamentos';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Gotas para los Ojos 15ml',
  'gotas-ojos-15ml',
  'Lágrimas artificiales para ojos secos. Alivio inmediato. Sin conservantes. Compatible con lentes de contacto. Lubricación prolongada. Visión clara.',
  'Lágrimas artificiales lubricantes',
  7890,
  NULL,
  id,
  'Poen',
  false,
  70,
  '["https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg"]',
  ARRAY['gotas', 'ojos', 'lubricante'],
  false,
  false
FROM categories WHERE slug = 'medicamentos';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Protector Labial SPF 30',
  'protector-labial-spf30',
  'Bálsamo labial con protección solar. Hidrata y protege del sol. Con manteca de karité y vitamina E. No graso. Resistente al agua.',
  'Bálsamo labial con protección solar',
  2890,
  NULL,
  id,
  'Neutrogena',
  false,
  125,
  '["https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg"]',
  ARRAY['protector labial', 'spf', 'hidratante'],
  false,
  false
FROM categories WHERE slug = 'cuidado-personal';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Agua Micelar 400ml',
  'agua-micelar-400ml',
  'Agua micelar 3 en 1: limpia, desmaquilla y tonifica. Para todo tipo de pieles. Sin enjuague. Sin alcohol. Testada dermatológicamente. Calma y purifica.',
  'Agua micelar desmaquillante 400ml',
  9850,
  12400,
  id,
  'Garnier',
  false,
  95,
  '["https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg"]',
  ARRAY['agua micelar', 'desmaquillante', 'limpieza'],
  true,
  true
FROM categories WHERE slug = 'belleza';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Probióticos x 30 Cápsulas',
  'probioticos-30-capsulas',
  'Probióticos con 10 mil millones de UFC. Apoya la salud digestiva e inmunológica. Cepas múltiples. Resistente al ácido estomacal. Toma diaria.',
  'Probióticos salud digestiva 30 cáps',
  14900,
  NULL,
  id,
  'Nutrigen',
  false,
  55,
  '["https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg"]',
  ARRAY['probióticos', 'digestión', 'inmunidad'],
  false,
  false
FROM categories WHERE slug = 'salud-bienestar';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Colágeno Hidrolizado x 450g',
  'colageno-hidrolizado-450g',
  'Colágeno en polvo sin sabor. Apoya la salud de articulaciones, piel y cabello. Fácil disolución. Con vitamina C. Rendimiento 30 porciones.',
  'Colágeno hidrolizado con vitamina C',
  19900,
  24500,
  id,
  'Gentech',
  false,
  40,
  '["https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg"]',
  ARRAY['colágeno', 'articulaciones', 'piel'],
  true,
  true
FROM categories WHERE slug = 'salud-bienestar';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Esmalte de Uñas Revlon',
  'esmalte-unas-revlon',
  'Esmalte de uñas de larga duración. Color intenso. Brillo diamante. Secado rápido. Sin formaldehído. Pincel ancho para aplicación fácil.',
  'Esmalte larga duración brillo intenso',
  3990,
  NULL,
  id,
  'Revlon',
  false,
  100,
  '["https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg"]',
  ARRAY['esmalte', 'uñas', 'maquillaje'],
  false,
  false
FROM categories WHERE slug = 'belleza';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Crema Antiedad Eucerin Q10',
  'crema-antiedad-eucerin',
  'Crema facial antiarrugas con Q10. Reduce líneas de expresión. Reafirma y revitaliza. Protección UV. Clínicamente probada. Resultados visibles.',
  'Crema antiarrugas con Q10 y UV',
  16750,
  NULL,
  id,
  'Eucerin',
  false,
  48,
  '["https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg"]',
  ARRAY['antiedad', 'antiarrugas', 'facial'],
  false,
  false
FROM categories WHERE slug = 'dermocosmetica';

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, brand, requires_prescription, stock, images, tags, is_featured, is_on_sale)
SELECT
  'Limpiador Facial Cetaphil 236ml',
  'limpiador-facial-cetaphil',
  'Limpiador facial suave para todo tipo de pieles. Elimina impurezas sin resecar. pH balanceado. Sin jabón ni fragancia. Recomendado por dermatólogos.',
  'Limpiador suave pH balanceado 236ml',
  11250,
  13800,
  id,
  'Cetaphil',
  false,
  75,
  '["https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg"]',
  ARRAY['limpiador', 'facial', 'suave'],
  true,
  true
FROM categories WHERE slug = 'dermocosmetica';
