const axios = require('axios');

// Step 1: Define the supported services array
const supportedServices = [
    'spotify', 'itunes', 'appleMusic', 'youtube', 'youtubeMusic',
    'google', 'googleStore', 'pandora', 'deezer', 'tidal',
    'amazonStore', 'amazonMusic', 'soundcloud', 'napster', 
    'yandex', 'spinrilla', 'audius', 'anghami', 'boomplay', 'audiomack'
];

async function convertUrl(originalUrl, targetService) {
    try {
        if (!supportedServices.includes(targetService)) {
            throw new Error(`Service ${targetService} is not supported.`);
        }

        const response = await axios.get(`https://api.song.link/v1-alpha.1/links`, {
            params: { url: originalUrl }
        });

        const links = response.data.linksByPlatform;

        if (links[targetService]) {
            return links[targetService].url;
        } else {
            throw new Error(`No matching link found on ${targetService}.`);
        }
    } catch (error) {
        console.error(`Error converting URL: ${error.message}`);
        // Send back the specific error message to the frontend
        throw error;
    }
}

module.exports = convertUrl;