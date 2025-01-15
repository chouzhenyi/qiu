import { PENDING, FULFILLED, REJECTED } from "./promiseStatus";
import { StatusType } from "./promiseStatus";

type functionType = (params: any) => void;
type callbackType = () => void;
type executorType = (resolve: functionType, reject: functionType) => void;

export class myPromise {
  status: StatusType = PENDING;
  value: any;
  reason: any;
  onResolvedCallbacks: callbackType[] = [];
  onRejectedCallbacks: callbackType[] = [];
  constructor(executor: executorType) {
    const resolve = (value: any) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason: any) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled: functionType, onRejected: functionType) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => onFulfilled(this.value));
      this.onRejectedCallbacks.push(() => onRejected(this.reason));
    }
  }
}
