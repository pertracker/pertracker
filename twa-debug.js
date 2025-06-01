// TWA Debug Script - Add this to your index.html temporarily
console.log('=== TWA DEBUG INFO ===');
console.log('User Agent:', navigator.userAgent);
console.log('Display Mode:', window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser');
console.log('PWA Detection:', {
  standalone: window.navigator.standalone,
  displayMode: window.matchMedia('(display-mode: standalone)').matches,
  referrer: document.referrer,
  search: window.location.search
});

// Check if running in TWA
const isTWA = () => {
  return document.referrer.includes('android-app://') || 
         window.matchMedia('(display-mode: standalone)').matches ||
         navigator.userAgent.includes('wv') || // WebView
         window.location.search.includes('utm_source=twa');
};

console.log('Is TWA?', isTWA());
console.log('Current URL:', window.location.href);
console.log('=== END DEBUG ===');
