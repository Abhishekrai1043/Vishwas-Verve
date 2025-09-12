// src/data/products.js
const products = [
  {
    id: '1',
    title: 'Organic Cotton Tee',
    description: 'Breathable, soft & ethically made. Pre-shrunk, comfortable fit.',
    price: 499,
    images: [
      'src/Images/Shirt_1.jpg',
      '/assets/hero1-2.jpg',
      '/assets/hero1-3.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'VVT-TEE-OC-01',
    material: '100% Organic Cotton',
    color: 'Ivory',
    stock: 24,
    category: 'Men'         // <-- category added
  },
  {
    id: '2',
    title: 'Eco Carrybag - Small',
    description: 'Handy bag made from recycled fabric. Reinforced handles, machine-washable.',
    price: 199,
    images: [
      'src/Images/Bag_2.jpg',
      '/assets/hero2-2.jpg'
    ],
    sizes: ['One size'],
    sku: 'VVT-BAG-SM-02',
    material: 'Recycled Polyester',
    color: 'Olive',
    stock: 120,
    category: 'Bags'
  },
  {
    id: '3',
    title: 'Linen Shirt',
    description: 'Lightweight linen for everyday comfort. Relaxed fit with button placket.',
    price: 899,
    images: [
      'src/Images/Shirt_2.jpg',
      '/assets/hero3-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'VVT-SHIRT-LN-03',
    material: '70% Linen, 30% Cotton',
    color: 'Sky Blue',
    stock: 12,
    category: 'Men'
  },
  {
    id: '4',
    title: 'Women’s Organic Tee',
    description: 'Soft organic cotton tee with a flattering cut for women.',
    price: 549,
    images: ['src/Images/W_Shirt_4.jpg'],
    sizes: ['XS','S','M','L'],
    sku: 'VVT-TEE-W-04',
    material: '100% Organic Cotton',
    color: 'Blush',
    stock: 18,
    category: 'Women'
  },
  {
    id: '5',
    title: 'Kids Play Tee',
    description: 'Durable, comfy tees for everyday play.',
    price: 299,
    images: ['src/Images/Shirt_3.jpg'],
    sizes: ['2-3','4-5','6-7'],
    sku: 'VVT-TEE-K-05',
    material: 'Organic Cotton Blend',
    color: 'Yellow',
    stock: 40,
    category: 'Kids'
  },
  {
    id: '6',
    title: 'Large Eco Carrybag',
    description: 'Spacious carrybag ideal for shopping and travel.',
    price: 299,
    images: ['src/Images/Bag_1.jpg'],
    sizes: ['One size'],
    sku: 'VVT-BAG-LG-06',
    material: 'Recycled Polyester',
    color: 'Charcoal',
    stock: 80,
    category: 'Bags'
  }
]

export default products
