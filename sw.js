// The old Paint Checker app has been retired. This replaces its offline helper: it clears the saved copies
// (including the old paint and barcode lists), removes itself, and reloads open pages so they show the "moved" page.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then(cs => cs.forEach(c => c.navigate(c.url))));
});
