
# MUZEM EMERALDS - ECOMMERCE DATA STRUCTURE
## Multi-Platform Product Distribution Package

**Generated:** 2026-02-22 02:07:09
**Brand:** Muzem Emeralds
**Total Products:** 132
**Markets:** Colombia (Primary), International
**Currencies:** COP (Primary), USD (International)

---

## FILE INVENTORY

### 1. Master Catalog Files
| File | Records | Description |
|------|---------|-------------|
| master_catalog.csv | 132 | Complete product catalog in CSV format |
| master_catalog.json | 132 | Complete product catalog in JSON format |

### 2. Platform-Specific Import Files
| File | Records | Platform | Compatibility |
|------|---------|----------|---------------|
| shopify_import.csv | 132 | Shopify | Shopify Admin > Products > Import |
| woocommerce_import.csv | 132 | WooCommerce | WP Admin > Products > Import |
| magento_import.csv | 132 | Magento | System > Import > Products |
| amazon_import.csv | 132 | Amazon Seller Central | Inventory > Add Products via Upload |

### 3. Supporting Data Files
| File | Records | Description |
|------|---------|-------------|
| image_mapping.csv | 132 | Product image URLs, local paths, SEO filenames, alt text |
| categories.json | - | Complete category taxonomy with hierarchy |
| variants.json | 71+ | Size and material variant structures |
| inventory.csv | 132 | Inventory tracking with reorder points |

---

## PRODUCT BREAKDOWN

### By Jewelry Type
- Ring: 71 products
- Pendant: 44 products
- Bracelet: 14 products
- Chain: 2 products
- Earrings: 1 products

### By Material
- 18k Yellow Gold: 59 products
- Silver: 38 products
- White Gold: 31 products
- Other: 3 products
- Platinum: 1 products

### By Emerald Type
- Natural: 106 products
- Carved: 20 products
- Drop Cut: 2 products
- Oval: 1 products
- Rectangular: 1 products
- Trapiche: 1 products
- Rough: 1 products

---

## PRICING SUMMARY

### COP (Colombian Peso)
- Minimum: $900,000 COP
- Maximum: $100,000,000 COP
- Average: $15,349,242 COP

### USD (US Dollar)
- Minimum: $225.00 USD
- Maximum: $25,000.00 USD
- Average: $3,837.31 USD

---

## PLATFORM COMPATIBILITY NOTES

### Shopify
- Uses standard Shopify CSV import format
- Includes Google Shopping fields
- Multi-currency support configured
- SEO fields mapped (title, description)
- Image alt text included
- Variant structure ready for size options

### WooCommerce
- Compatible with WooCommerce Product CSV Import Suite
- Product attributes mapped (Material, Emerald Type, Origin)
- Yoast SEO meta fields included
- Category hierarchy preserved
- Stock management enabled

### Magento
- Uses Magento 2 CSV import format
- All required fields included
- Category paths properly formatted
- Image labels for accessibility
- Stock and inventory settings configured
- Additional attributes mapped

### Amazon
- Flat file format for Seller Central
- Condition set to "New"
- Tax code configured
- International shipping disabled (Colombia focus)
- Lead time set to 2 days

---

## CATEGORY TAXONOMY

```
Jewelry
├── Rings
│   ├── Gold Rings
│   │   ├── Yellow Gold Rings
│   │   └── White Gold Rings
│   ├── Silver Rings
│   └── Platinum Rings
├── Earrings
│   ├── Gold Earrings
│   └── Silver Earrings
├── Pendants
│   ├── Gold Pendants
│   └── Silver Pendants
├── Bracelets
│   ├── Gold Bracelets
│   └── Silver Bracelets
└── Chains
    ├── Gold Chains
    └── Silver Chains
```

---

## TAGS SYSTEM

### Standard Tags
- colombian-emerald
- 18k-gold
- natural-stone
- certified
- handcrafted
- family-legacy

### Conditional Tags
- diamonds (for products with diamond accents)
- moissanite (for products with moissanite)

---

## IMAGE NAMING CONVENTION

**Format:** `muzem-[product-type]-[material]-[emerald-type]-[id].jpg`

**Example:** `muzem-ring-yellow-gold-natural-muzem_001.jpg`

**Alt Text Format:** `MUZEM [Product Name] - Colombian Emerald [Type] in [Material]`

---

## SKU STRUCTURE

**Format:** `MUZ-[MATERIAL]-[TYPE]-[NUMBER]`

**Material Codes:**
- YG18 = 18k Yellow Gold
- WG18 = White Gold
- SV925 = Silver
- PT950 = Platinum
- OTH = Other

**Type Codes:**
- RNG = Ring
- ERR = Earrings
- PND = Pendant
- BRC = Bracelet
- CHN = Chain
- JWL = Other Jewelry

**Example:** `MUZ-YG18-RNG-001`

---

## INVENTORY MANAGEMENT

### Reorder Points
- High Value (>$50M COP): Reorder at 1 unit
- Medium Value ($20-50M COP): Reorder at 2 units
- Standard Value (<$20M COP): Reorder at 3 units

### Warehouse
- Primary: Bogotá, Colombia
- Supplier: Muzem Emeralds Internal

---

## VARIANT STRUCTURE

### Size Variants (Rings)
- Available sizes: 5, 6, 7, 8, 9, 10, 11, 12
- Size 7 typically in stock
- Other sizes made to order

### Material Variants
- 18k Yellow Gold (base price)
- White Gold (base price)
- Silver (25% of base price)
- Platinum (150% of base price)

---

## USAGE INSTRUCTIONS

### Shopify Import
1. Go to Shopify Admin > Products
2. Click "Import"
3. Upload `shopify_import.csv`
4. Review and confirm import

### WooCommerce Import
1. Install WooCommerce Product CSV Import Suite
2. Go to WP Admin > Products > Import
3. Upload `woocommerce_import.csv`
4. Map fields if needed
5. Run import

### Magento Import
1. Go to System > Import
2. Select Entity Type: Products
3. Select Import Behavior: Add/Update
4. Upload `magento_import.csv`
5. Check data and import

### Amazon Import
1. Go to Seller Central > Inventory
2. Select "Add Products via Upload"
3. Choose file type: Inventory Files
4. Upload `amazon_import.csv`
5. Submit and monitor processing

---

## SUPPORT & CONTACT

**Brand:** Muzem Emeralds
**Website:** https://muzem.co
**Instagram:** @muzem_emeralds
**Locations:** Bogotá, Medellín

---

*Generated for multi-platform ecommerce distribution*
