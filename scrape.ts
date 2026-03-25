import { chromium } from 'playwright';

async function scrape() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.airsoftmlq.com/replicas-airsoft-a1a2/', { waitUntil: 'networkidle' });
  
  const products = await page.evaluate(() => {
    const results = [];
    // Common patterns for product items in e-commerce
    const items = document.querySelectorAll('.product-item, .product, .item, .grid-item, .col-lg-4, .col-md-6, .col-6');
    
    items.forEach(item => {
      const nameEl = item.querySelector('h2, h3, .name, .title, .product-title');
      const priceEl = item.querySelector('.price, .product-price, .amount');
      const imgEl = item.querySelector('img');
      
      if (nameEl && priceEl) {
        results.push({
          name: nameEl.textContent?.trim(),
          price: priceEl.textContent?.trim(),
          img: imgEl?.src || imgEl?.dataset.src,
          desc: item.textContent?.trim().substring(0, 100) // fallback desc
        });
      }
    });
    return results;
  });

  // Filter out duplicates and non-products
  const uniqueProducts = [];
  const seenNames = new Set();
  
  products.forEach(p => {
    if (p.name && p.price && p.price.includes('€') && !seenNames.has(p.name)) {
      uniqueProducts.push(p);
      seenNames.add(p.name);
    }
  });

  console.log(JSON.stringify(uniqueProducts, null, 2));
  await browser.close();
}

scrape();
