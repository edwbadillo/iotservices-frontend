export interface AppErrorListener {
  refreshToken: () => Promise<any>,
  onNetworkError: () => void,
  onUnauthorized: () => void,
  onError: (statusCode: number) => void,
}