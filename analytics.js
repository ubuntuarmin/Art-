// analytics.js
(function() {
    // Inject the GTag script
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-CXKT6454VW';
    document.head.appendChild(script);

    // Initialize GTag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-CXKT6454VW');
})();
