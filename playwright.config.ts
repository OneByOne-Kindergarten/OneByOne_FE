import { defineConfig, devices } from "@playwright/test";

/**
 * MCP와 연동된 자동화된 브라우저 테스트를 위한 설정
 */
export default defineConfig({
  testDir: "./tests/e2e",

  // 테스트 실행 설정
  fullyParallel: true, // 병렬 실행으로 속도 향상
  forbidOnly: !!process.env.CI, // CI에서는 .only() 금지
  retries: process.env.CI ? 2 : 0, // CI에서 실패 시 2번 재시도
  workers: process.env.CI ? 1 : undefined, // CI에서 1개 워커만 사용

  reporter: [["html"], ["json", { outputFile: "test-results/results.json" }]],

  use: {
    baseURL: "http://localhost:5174",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",

    // MCP 연동을 위한 설정
    actionTimeout: 10000,
    navigationTimeout: 30000,
    testIdAttribute: "data-testid",

    // 헤드리스 모드 설정 (MCP 디버깅 시 false로 변경)
    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // 모바일
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5174",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2분 타임아웃
  },

  outputDir: "test-results/",
});
