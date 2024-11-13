const axios = require('axios');

// Replace this URL with the page URL you want to fetch
const pageUrl = 'https://www.aliexpress.com/item/1005007105015794.html?spm=a2g0o.productlist.main.1.336a39959LGrGT&algo_pvid=efc440a6-13d5-47e5-9080-10238ef68c91&algo_exp_id=efc440a6-13d5-47e5-9080-10238ef68c91-0&pdp_npi=4%40dis%21GBP%217.84%212.99%21%21%2170.14%2126.76%21%40211b655217314911817387875ed7aa%2112000039420020725%21sea%21UK%210%21ABX&curPageLogUid=4DqzqAhGBXIY&utparam-url=scene%3Asearch%7Cquery_from%3A';

async function fetchPageHtml(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching the page:', error);
        return null;
    }
}

function extractImageUrls(html) {
    const urlPattern = /https:\/\/ae01\.alicdn\.com\/kf\/[a-zA-Z0-9]+\/[^"]+\.jpg/g;
    const urls = new Set(html.match(urlPattern)); // Using Set to avoid duplicates
    return Array.from(urls);
}

async function main() {
    const html = await fetchPageHtml(pageUrl);
    if (!html) return;

    const imageUrls = extractImageUrls(html);
    imageUrls.forEach(url => {
        if (!url.endsWith('80x80.jpg')) { // Filter out URLs ending with '80x80.jpg'
            console.log(url + '_.webp');
        }
    });
}

// Run main function with minimal error handling
main().catch(error => console.error("Error in main function:", error));
