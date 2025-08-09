/**
 * Flutter InAppWebView와의 양방향 통신을 위한 유틸리티
 */

// 지원하는 메시지 타입 정의
export enum MessageType {
  REQUEST_FCM_TOKEN = "REQUEST_FCM_TOKEN",
  REQUEST_LAT_LONG = "REQUEST_LAT_LONG",
  REQUEST_PERMISSION = "REQUEST_PERMISSION",
  // TODO : 테스트 메시지 추가
}

// 콜백 함수 타입
type MessageCallback<T = unknown> = (data: T) => void;

// 콜백 저장소 (FCM_TOKEN 같은 푸시 메시지 수신용)
const messageCallbacks: Record<string, MessageCallback[]> = {};

/**
 * Flutter에서 전송된 메시지를 처리하는 함수
 * @param event 메시지 이벤트
 */
function handleFlutterMessage(event: MessageEvent) {
  try {
    const message = JSON.parse(event.data);

    if (!message || !message.type) {
      console.warn("Invalid message format >> ", message);
      return;
    }

    const callbacks = messageCallbacks[message.type] || [];
    callbacks.forEach((callback) => callback(message.data));
  } catch (error) {
    console.error("Error processing message from Flutter:", error);
  }
}

/**
 * Flutter로 메시지를 전송하는 함수
 * @param type 메시지 타입
 * @param data 메시지 데이터
 * @returns 핸들러에서 반환한 결과 값 Promise
 */
export async function sendToFlutter<T = unknown, R = any>(
  type: MessageType | string,
  data: T
): Promise<R> {
  const message = { type, data };

  if (!window.flutter_inappwebview) {
    console.warn("Flutter InAppWebView not available. Running in browser?");
    return Promise.resolve({
      status: "error",
      message: "Flutter InAppWebView not available",
    } as unknown as R);
  }

  try {
    // 핸들러에서 반환한 값을 직접 반환
    const result = await window.flutter_inappwebview.callHandler(
      "onWebViewMessage",
      JSON.stringify(message)
    );
    return (
      result ||
      ({ status: "error", message: "No response from Flutter" } as unknown as R)
    );
  } catch (error) {
    console.error("Error sending message to Flutter:", error);
    throw error; // 재시도 등의 로직을 위해 오류를 그대로 throw
  }
}

/**
 * Flutter에서 보내는 특정 타입의 메시지를 수신하기 위한 리스너 등록
 * (FCM 토큰과 같은 푸시 메시지 수신용)
 * @param type 수신할 메시지 타입
 * @param callback 메시지 처리 콜백 함수
 */
export function listenToFlutter<T = unknown>(
  type: MessageType | string,
  callback: MessageCallback<T>
): () => void {
  if (!messageCallbacks[type]) {
    messageCallbacks[type] = [];
  }

  messageCallbacks[type].push(callback as MessageCallback);

  // 리스너가 등록되지 않았으면 등록
  if (Object.keys(messageCallbacks).length === 1) {
    window.addEventListener("message", handleFlutterMessage);
  }

  // 구독 취소 함수 반환
  return () => {
    const index =
      messageCallbacks[type]?.indexOf(callback as MessageCallback) ?? -1;
    if (index !== -1) {
      messageCallbacks[type]?.splice(index, 1);
    }

    // 모든 콜백이 제거되면 이벤트 리스너도 제거
    if (
      Object.values(messageCallbacks).every(
        (callbacks) => callbacks.length === 0
      )
    ) {
      window.removeEventListener("message", handleFlutterMessage);
    }
  };
}

// React 컴포넌트에서 사용할 수 있는 타입 정의
declare global {
  interface Window {
    // Flutter InAppWebView에서 제공하는 window.flutter_inappwebview.callHandler 사용
    flutter_inappwebview?: {
      callHandler: (handlerName: string, ...args: any[]) => Promise<any>;
    };
  }
}

// 권한 타입 정의
export enum PermissionType {
  CAMERA = "CAMERA",
  LOCATION = "LOCATION",
  STORAGE = "STORAGE",
  MICROPHONE = "MICROPHONE",
  NOTIFICATION = "NOTIFICATION",
}

// 권한 요청 인터페이스
export interface PermissionRequest {
  type: PermissionType;
}

// 권한 결과 인터페이스
export interface PermissionResult {
  status: "success" | "error";
  message: string;
}

/**
 * 플러터에게 권한 요청
 * @param permissionType 요청할 권한 타입
 */
export function requestPermission(permissionType: PermissionType): void {
  sendToFlutter(MessageType.REQUEST_PERMISSION, { type: permissionType });
}
