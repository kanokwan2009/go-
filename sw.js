const CACHE_NAME = 'go-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
  // สามารถเพิ่มไฟล์ CSS, JS หรือรูปภาพอื่นๆ ที่ต้องการแคชไว้ตรงนี้ได้
];

// ติดตั้ง Service Worker และแคชไฟล์
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ดึงข้อมูลจากแคชเมื่อไม่มีอินเทอร์เน็ต
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
