import { defineConfig } from 'astro/config';

export default defineConfig({
    site: "https://www.evaevangelisti.com",
    redirects: {
        "/index.html": "/"
    }
});
