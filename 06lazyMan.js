// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

class ALazyMan {
  constructor(name, logFn) {
    this.name = name;
    this.logFn = logFn;
    this.normalTask = [];
    this.urgentTask = [];
    this.greet();
    setTimeout(() => {
      this.executeNext();
    }, 0);
  }
  greet() {
    this.normalTask.push(["greet", `Hi, I'm ${this.name}.`]);
  }
  eat(food) {
    this.normalTask.push(["eat", food]);
    return this;
  }
  sleep(time) {
    this.normalTask.push(["sleep", time]);
    return this;
  }
  sleepFirst(time) {
    this.urgentTask.unshift(["sleep", time]);
    return this;
  }
  executeNext() {
    let task = this.urgentTask.shift();
    if (!task) {
      task = this.normalTask.shift();
    }
    if (!task) {
      return;
    }
    const [action, value] = task;
    switch (action) {
      case "greet":
        this.logFn(value);
        this.executeNext();
        return;
      case "eat":
        this.logFn(`Eat ${value}.`);
        this.executeNext();
        return;
      case "sleep":
        setTimeout(() => {
          this.logFn(`Wake up after ${value} second${value > 1 ? "s" : ""}.`);
          this.executeNext();
        }, value * 1000);
        return;
    }
  }
}

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  return new ALazyMan(name, logFn);
}
