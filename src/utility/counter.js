// cross file global counter

let counter = 0
export const Counter = {
  next: () => {
    counter += 1;
    console.log(`counter.next: ${counter}`);
    return counter;
  },
  current: () => {
    return counter;
  }
}

export default Counter