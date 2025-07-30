import { Product } from './types';

export const CATEGORIES = ['All', 'Lips', 'Eyes', 'Face', 'Skincare', 'Tools'];

export const PRODUCTS: Product[] = [
  // Lips
  {
    id: 1,
    name: 'Velvet Dream Matte Lipstick',
    category: 'Lips',
    price: 399.00,
    description: 'A weightless, long-lasting matte lipstick that delivers intense color in one swipe.',
    image: 'pictures/images/velvet matte lipstick.jpg'
  },
  {
    id: 7,
    name: 'Satin Kiss Lipstick',
    category: 'Lips',
    price: 950.00,
    description: 'Creamy, satin-finish lipstick that hydrates and delivers vibrant color.',
    image: 'pictures/images/Satin Kiss Lipstick.jpg'
  },
  {
    id: 8,
    name: 'Liquid Glass Lip Gloss',
    category: 'Lips',
    price: 799.00,
    description: 'A high-shine, non-sticky gloss for a fuller, luscious lip look.',
    image: 'pictures/images/Liquid Glass Lip Gloss.jpg'
  },
  {
    id: 9,
    name: 'Precision Lip Liner',
    category: 'Lips',
    price: 599.00,
    description: 'Define and shape your lips with this creamy, long-wearing lip liner.',
    image: 'pictures/images/Precision Lip Liner.jpg'
   },
  {
    id: 10,
    name: 'Hydrating Lip Balm',
    category: 'Lips',
    price: 450.00,
    description: 'A nourishing balm with SPF 15 for soft, protected lips all day.',
    image: 'pictures/images/Hydrating Lip Balm.jpg'
  },

  // Eyes
  {
    id: 2,
    name: 'Lash Sculptor Mascara',
    category: 'Eyes',
    price: 750.00,
    description: 'Achieve dramatic volume and length with this smudge-proof, carbon-black mascara.',
    image: 'pictures/images/Lash Sculptor Mascara.jpg'
  },
  {
    id: 6,
    name: 'Stardust Eyeshadow Palette',
    category: 'Eyes',
    price: 2500.00,
    description: 'A versatile palette with 12 cosmic-inspired shades in matte, shimmer, and glitter finishes.',
    image: 'pictures/images/Stardust Eyeshadow Palette.jpg'
  },
  {
    id: 11,
    name: 'Wing Master Liquid Eyeliner',
    category: 'Eyes',
    price: 850.00,
    description: 'A waterproof, felt-tip eyeliner for creating the sharpest, most precise wings.',
    image: 'pictures/images/Wing Master Liquid Eyeliner.jpg'
  },
  {
    id: 12,
    name: 'Brow Perfecting Pencil',
    category: 'Eyes',
    price: 650.00,
    description: 'Fill and define your brows with this fine-tipped pencil and spoolie duo.',
    image: 'pictures/images/Brow Perfecting Pencil.jpg'
  },
  {
    id: 13,
    name: '24H Kohl Kajal',
    category: 'Eyes',
    price: 499.00,
    description: 'Intensely pigmented and long-lasting kohl for a dramatic, smoldering eye look.',
    image: 'pictures/images/24H Kohl Kajal.jpg'
  },
  
  // Face
  {
    id: 3,
    name: 'Glow Pledge Liquid Foundation',
    category: 'Face',
    price: 1499.00,
    description: 'A radiant liquid foundation that blurs imperfections and leaves a natural, dewy finish.',
    image: 'pictures/images/Glow Pledge Liquid Foundation.jpg'
  },
  {
    id: 14,
    name: 'Airbrush Finish Concealer',
    category: 'Face',
    price: 999.00,
    description: 'A full-coverage, yet lightweight concealer that brightens and perfects.',
    image: 'pictures/images/Airbrush Finish Concealer.jpg'
  },
  {
    id: 15,
    name: 'Matte Perfecting Primer',
    category: 'Face',
    price: 1100.00,
    description: 'Controls oil and minimizes pores for a flawless makeup base that lasts all day.',
    image: 'pictures/images/Matte Perfecting Primer.jpg'
  },
  {
    id: 16,
    name: 'Rosewater Setting Mist',
    category: 'Face',
    price: 899.00,
    description: 'A hydrating mist that sets makeup and leaves skin with a refreshing, dewy glow.',
    image: 'pictures/images/Rosewater Setting Mist.jpg'
  },
  {
    id: 17,
    name: 'Radiant Cream Blush',
    category: 'Face',
    price: 750.00,
    description: 'A buildable, blendable cream blush for a natural, healthy-looking flush.',
    image: 'pictures/images/Radiant Cream Blush.jpg'
  },

  // Skincare
  {
    id: 4,
    name: 'Hyaluronic Serum',
    category: 'Skincare',
    price: 1200.00,
    description: 'Hydrate and soothe your skin with this lightweight, fast-absorbing hyaluronic serum.',
    image: 'pictures/images/Hyaluronic Serum.jpg'
  },
  {
    id: 18,
    name: 'Gentle Cleansing Foam',
    category: 'Skincare',
    price: 850.00,
    description: 'A mild, pH-balanced cleanser that removes impurities without stripping the skin.',
    image: 'pictures/images/Gentle Cleansing Foam.jpg'
  },
  {
    id: 19,
    name: 'Vitamin C Brightening Moisturizer',
    category: 'Skincare',
    price: 1350.00,
    description: 'Fade dark spots and even out skin tone with this antioxidant-rich moisturizer.',
    image: 'pictures/images/Vitamin C Brightening Moisturizer.jpg'
  },
  {
    id: 20,
    name: 'Detoxifying Clay Mask',
    category: 'Skincare',
    price: 950.00,
    description: 'Purify pores and draw out toxins with this mineral-rich clay mask.',
    image: 'pictures/images/Detoxifying Clay Mask.jpg'
  },
  {
    id: 21,
    name: 'Revitalizing Eye Cream',
    category: 'Skincare',
    price: 1150.00,
    description: 'Reduce the appearance of fine lines and dark circles with this potent eye cream.',
    image: 'pictures/images/Revitalizing Eye Cream.jpg'
  },

  // Tools
  {
    id: 5,
    name: 'Silken Powder Brush',
    category: 'Tools',
    price: 650.00,
    description: 'Luxuriously soft synthetic bristles for flawless application of powder products.',
    image: 'pictures/images/Silken Powder Brush.jpg'
  },
  {
    id: 22,
    name: 'Pro Blending Sponge',
    category: 'Tools',
    price: 499.00,
    description: 'An edgeless, high-definition cosmetic sponge for seamless makeup application.',
    image: 'pictures/images/Pro Blending Sponge.jpg'
  },
  {
    id: 23,
    name: 'Precision Tweezer Set',
    category: 'Tools',
    price: 350.00,
    description: 'A set of professional-grade tweezers for perfect brow shaping and grooming.',
    image: 'pictures/images/Precision Tweezer Set.jpg'
  },
  {
    id: 24,
    name: 'Eyelash Curler',
    category: 'Tools',
    price: 550.00,
    description: 'Create a dramatic, long-lasting curl with this ergonomically designed eyelash curler.',
    image: 'pictures/images/Eyelash Curler.jpg'
  },
  {
    id: 25,
    name: 'Makeup Brush Cleaning Mat',
    category: 'Tools',
    price: 400.00,
    description: 'A silicone mat with multiple textures to deep clean your makeup brushes.',
    image: 'pictures/images/Makeup Brush Cleaning Mat.jpg'
  },
];


export const MOST_LOVED_PRODUCTS: Product[] = [
    PRODUCTS[0], // Velvet Dream Matte Lipstick
    PRODUCTS[1], // Lash Sculptor Mascara
    PRODUCTS[2], // Glow Pledge Liquid Foundation
];