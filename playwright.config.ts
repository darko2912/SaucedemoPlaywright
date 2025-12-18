import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    testDir: 'tests',
    fullyParallel: true,
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        trace: "retain-on-first-failure",
        screenshot: "only-on-failure"
    },
    reporter: [
        ['html', { open: 'never' }],
    ],
    projects: [
        {
            name: "Chromium",
            use: { browserName: 'chromium' }
        },
        {
            name: "Firefox",
            use: { browserName: 'firefox' }
        },
        {
            name: "Webkit",
            use: { browserName: 'webkit' }
        }
    ]
}

export default config