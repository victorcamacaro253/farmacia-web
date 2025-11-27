/*
  # Pharmacy E-commerce Schema

  ## Overview
  Complete database schema for an Argentine pharmacy chain with multiple locations.
  Supports products, categories, branches, users, shopping carts, and orders.

  ## Tables Created

  ### 1. categories
  Product categories (Medicamentos, Cuidado Personal, etc.)
  - `id` (uuid, primary key)
  - `name` (text)
  - `slug` (text, unique)
  - `description` (text)
  - `icon` (text)
  - `parent_id` (uuid, nullable) - for subcategories
  - `created_at` (timestamptz)

  ### 2. branches
  Physical pharmacy locations across Argentina
  - `id` (uuid, primary key)
  - `name` (text)
  - `address` (text)
  - `city` (text)
  - `province` (text)
  - `postal_code` (text)
  - `phone` (text)
  - `latitude` (decimal)
  - `longitude` (decimal)
  - `hours` (jsonb) - opening hours
  - `is_open` (boolean)
  - `created_at` (timestamptz)

  ### 3. products
  Pharmacy products catalog
  - `id` (uuid, primary key)
  - `name` (text)
  - `slug` (text, unique)
  - `description` (text)
  - `short_description` (text)
  - `price` (decimal)
  - `compare_at_price` (decimal, nullable)
  - `category_id` (uuid, foreign key)
  - `brand` (text)
  - `requires_prescription` (boolean)
  - `stock` (integer)
  - `images` (jsonb) - array of image URLs
  - `tags` (text array)
  - `is_featured` (boolean)
  - `is_on_sale` (boolean)
  - `created_at` (timestamptz)

  ### 4. profiles
  User profiles extending Supabase auth
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text)
  - `phone` (text)
  - `address` (text)
  - `city` (text)
  - `province` (text)
  - `postal_code` (text)
  - `preferred_branch_id` (uuid, foreign key)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. cart_items
  Shopping cart items for users
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `product_id` (uuid, foreign key)
  - `quantity` (integer)
  - `created_at` (timestamptz)

  ### 6. orders
  Customer orders
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `branch_id` (uuid, foreign key)
  - `status` (text)
  - `total` (decimal)
  - `shipping_address` (jsonb)
  - `payment_method` (text)
  - `created_at` (timestamptz)

  ### 7. order_items
  Individual items in orders
  - `id` (uuid, primary key)
  - `order_id` (uuid, foreign key)
  - `product_id` (uuid, foreign key)
  - `quantity` (integer)
  - `price` (decimal)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Policies for authenticated users to manage their data
  - Public read access for products, categories, and branches
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '',
  parent_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Branches table
CREATE TABLE IF NOT EXISTS branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  postal_code text DEFAULT '',
  phone text DEFAULT '',
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  hours jsonb DEFAULT '{}',
  is_open boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE branches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view branches"
  ON branches FOR SELECT
  TO public
  USING (true);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  short_description text DEFAULT '',
  price decimal(10, 2) NOT NULL,
  compare_at_price decimal(10, 2),
  category_id uuid REFERENCES categories(id) NOT NULL,
  brand text DEFAULT '',
  requires_prescription boolean DEFAULT false,
  stock integer DEFAULT 0,
  images jsonb DEFAULT '[]',
  tags text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  is_on_sale boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text DEFAULT '',
  phone text DEFAULT '',
  address text DEFAULT '',
  city text DEFAULT '',
  province text DEFAULT '',
  postal_code text DEFAULT '',
  preferred_branch_id uuid REFERENCES branches(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  branch_id uuid REFERENCES branches(id),
  status text DEFAULT 'pending',
  total decimal(10, 2) NOT NULL,
  shipping_address jsonb DEFAULT '{}',
  payment_method text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL,
  price decimal(10, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_sale ON products(is_on_sale);
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);