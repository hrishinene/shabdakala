export class ZDummyObject {
  private str: string;
  private num: number;

  constructor(str: string, num: number) {
    this.str = str;
    this.num = num;
  }

  getStr(): string {
    return this.str;
  }

  getNum(): number {
    return this.num;
  }
}

// Example usage
const dummy = new ZDummyObject("example", 42);
console.log(dummy.getStr()); // Output: example
console.log(dummy.getNum()); // Output: 42