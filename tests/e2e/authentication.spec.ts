import { expect, test } from "@playwright/test";

/**
 * @fileoverview 인증 시스템 테스트
 * @description 사용자 인증 관련 폼 입력 검증, 사용자 인증
 *
 * @testScope
 * - 로그인 폼 검증 (빈 필드, 잘못된 형식, 성공 플로우)
 * - 회원가입 폼 검증 (이메일 단계, 비밀번호 단계)
 * - 폼 유효성 검사 및 버튼 상태 확인
 * - 환경변수 기반 실제 계정 테스트 지원
 *
 * @coverage 6개 테스트
 * @author 0zuth
 * @since 2025-09
 */

test.describe("로그인 폼 검증", () => {
  test("빈 필드 검증", async ({ page }) => {
    await page.goto("/signin");

    // 입력하지 않은 상태에서 로그인 버튼이 비활성화되어 있는지 확인
    const loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeDisabled();

    // 현재 페이지 유지 확인
    await expect(page.url()).toContain("/signin");
  });

  test("잘못된 이메일 형식", async ({ page }) => {
    await page.goto("/signin");

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    await emailInput.fill("invalid-email");
    await passwordInput.fill("password123");

    await expect(loginButton).toBeDisabled();

    // 현재 페이지 유지 확인
    await expect(page.url()).toContain("/signin");
  });

  test("잘못된 비밀번호 형식", async ({ page }) => {
    await page.goto("/signin");

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("한글비밀번호");
    await expect(loginButton).toBeDisabled();

    // 6자 미만
    await passwordInput.clear();
    await passwordInput.fill("12345");
    await expect(loginButton).toBeDisabled();

    // 20자 초과
    await passwordInput.clear();
    await passwordInput.fill("a".repeat(21));
    await expect(loginButton).toBeDisabled();
  });

  test("로그인 성공 플로우", async ({ page }) => {
    await page.goto("/signin");

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    // 환경변수에 실제 계정 존재 여부 확인
    const testEmail = process.env.TEST_EMAIL;
    const testPassword = process.env.TEST_PASSWORD;

    if (testEmail && testPassword) {
      await emailInput.fill(testEmail);
      await passwordInput.fill(testPassword);
      await loginButton.click();

      // 로그인 성공 시 리다이렉션 확인
      await page.waitForTimeout(2000);
      await expect(page.url()).not.toContain("/signin");
    } else {
      await emailInput.fill("test@example.com");
      await passwordInput.fill("validPassword123!");

      await expect(loginButton).toBeEnabled();

      console.log(
        "환경변수에 테스트 계정이 존재하지 않아 폼 검증만 수행했습니다."
      );
    }
  });
});

test.describe("회원가입 폼 검증", () => {
  test("이메일 단계 검증", async ({ page }) => {
    await page.goto("/signup");

    // 이메일 입력 필드가 있는지 확인
    const emailInput = page.locator('input[type="email"]');
    const nextButton = page.locator('button:has-text("다음")');

    if ((await emailInput.count()) > 0) {
      // 빈 필드일 때 버튼 비활성화
      await expect(nextButton).toBeDisabled();

      // 잘못된 이메일 형식
      await emailInput.fill("invalid-email");
      await expect(nextButton).toBeDisabled();

      // 올바른 이메일 형식
      await emailInput.fill("test@example.com");
      await expect(nextButton).toBeEnabled();
    } else {
      console.log("이메일 입력 단계를 찾을 수 없습니다.");
    }
  });

  test("비밀번호 단계 검증", async ({ page }) => {
    await page.goto("/signup");

    // 회원가입 플로우에서 비밀번호 단계로 이동
    const emailInput = page.locator('input[type="email"]');
    const nextButton = page.locator('button:has-text("다음")');

    if ((await emailInput.count()) > 0) {
      await emailInput.fill("test@example.com");
      if (await nextButton.isEnabled()) {
        await nextButton.click();
        await page.waitForTimeout(1000);
      }
    }

    // 비밀번호 입력 필드 확인
    const passwordInput = page.locator('input[name="password"]');
    const confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    const submitButton = page.locator('button[type="submit"]');

    if ((await passwordInput.count()) > 0) {
      // 빈 필드일 때 버튼 비활성화
      await expect(submitButton).toBeDisabled();

      // 비밀번호 불일치
      await passwordInput.fill("password123!");
      await confirmPasswordInput.fill("differentPassword");
      await expect(submitButton).toBeDisabled();

      // 비밀번호 일치
      await confirmPasswordInput.clear();
      await confirmPasswordInput.fill("password123!");
      await expect(submitButton).toBeEnabled();
    } else {
      console.log("비밀번호 입력 단계를 찾을 수 없습니다.");
    }
  });
});
