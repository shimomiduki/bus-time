// sw.js (Service Worker)

// キャッシュするファイルの名前を定義
const CACHE_NAME = 'bus-timetable-cache-v1';
// キャッシュするファイルリスト
// ここにアプリで使用する全てのファイルをリストアップします。
const urlsToCache = [
    '/', // アプリのルート (index.html を指すことが多い)
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png'
];

// Service Worker インストール時の処理
self.addEventListener('install', (event) => {
    event.waitUntil(
        // 指定したファイルをキャッシュに登録
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Service Worker フェッチ (リソース取得) 時の処理
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // リクエストされたリソースがキャッシュにあるか確認
        caches.match(event.request)
            .then((response) => {
                // キャッシュにあればそれを返す
                if (response) {
                    return response;
                }
                // キャッシュになければネットワークから取得
                return fetch(event.request);
            })
    );
});

// Service Worker アクティベート時の処理 (古いキャッシュの削除など)
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // ホワイトリストにないキャッシュを削除
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
