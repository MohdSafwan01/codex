require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const seedProducts = [
  {
    title: 'The Systems Design Playbook',
    description: 'A comprehensive guide to designing scalable distributed systems. Covers load balancing, caching, database sharding, message queues, and real-world architecture case studies from Netflix, Uber, and Instagram.',
    price: 349,
    category: 'Ebook',
    coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'DSA Patterns: 50 Must-Know',
    description: 'Master the 50 most frequently asked data structure and algorithm patterns in top tech interviews. Includes sliding window, two pointers, BFS/DFS, dynamic programming, and graph traversal techniques with annotated solutions.',
    price: 149,
    category: 'Notes',
    coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'Machine Learning, Visually',
    description: 'Learn machine learning through stunning visual explanations. From linear regression to transformers, every concept is illustrated with hand-crafted diagrams, intuitive analogies, and interactive thought experiments.',
    price: 199,
    category: 'PDF',
    coverImageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: "UI/UX: The Designer's Bible",
    description: 'The definitive reference for modern interface design. Covers design thinking, Figma workflows, accessibility standards, motion design principles, and case studies from Apple, Stripe, and Linear.',
    price: 299,
    category: 'Ebook',
    coverImageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'Cloud Computing Zero to Hero',
    description: 'From fundamentals to deployment mastery. Covers AWS, GCP, Azure core services, containerization with Docker, Kubernetes orchestration, CI/CD pipelines, and serverless architecture patterns.',
    price: 99,
    category: 'Notes',
    coverImageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'Full-Stack React 2026 Guide',
    description: 'Build production-grade applications with React 19, Next.js 15, and modern full-stack patterns. Covers Server Components, Server Actions, authentication, database integration, and deployment to Vercel.',
    price: 249,
    category: 'PDF',
    coverImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert seed products
    const created = await Product.insertMany(seedProducts);
    console.log(`✓ Seeded ${created.length} products:`);
    created.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.title} — ₹${p.price} (${p.category})`);
    });

    console.log('\n✓ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
