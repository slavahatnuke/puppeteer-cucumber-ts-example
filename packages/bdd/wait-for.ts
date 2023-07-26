import { setDefaultTimeout } from '@cucumber/cucumber';

const WAIT_FOR_TIMEOUT: number =
  parseInt(process.env.ACCEPTANCE_WAIT_FOR_TIMEOUT!) || 3e3;
const WAIT_FOR_CHECKING_INTERVAL = 100;

const DEFAULT_CUCUMBER_TIMEOUT = WAIT_FOR_TIMEOUT + 1e3;
setDefaultTimeout(DEFAULT_CUCUMBER_TIMEOUT);

export async function waitFor(
  checker: () => boolean | Promise<boolean>,
  timeout = WAIT_FOR_TIMEOUT,
  interval = WAIT_FOR_CHECKING_INTERVAL,
) {
  const startedAt = Date.now();

  while (true) {
    if (Date.now() - startedAt >= timeout) {
      throw new Error(`waitFor: Timeout ${timeout} ms`);
    } else {
      if (await checker()) {
        break;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

export async function waitForAssertion(
  checker: () => boolean | Promise<boolean> | void | Promise<void>,
  timeout = WAIT_FOR_TIMEOUT,
  interval = WAIT_FOR_CHECKING_INTERVAL,
) {
  let lastError: any;

  try {
    await waitFor(
      async () => {
        try {
          const result = await checker();

          const isOk = !!result || result === undefined;

          if (isOk) {
            lastError = undefined;
          }
          return isOk;
        } catch (error) {
          lastError = error;
          return false;
        }
      },
      timeout,
      interval,
    );
  } catch (error) {
    if (lastError) {
      throw lastError;
    } else {
      throw error;
    }
  }
}

export async function waitUntil<T>(
  action: () => T | Promise<T>,
  condition: (value: T) => boolean,
  timeout = WAIT_FOR_TIMEOUT,
  interval = WAIT_FOR_CHECKING_INTERVAL,
): Promise<T> {
  let lastValue: T;

  await waitFor(
    async () => {
      lastValue = await action();
      return condition(lastValue);
    },
    timeout,
    interval,
  );

  return lastValue!;
}
