// cross file global counter

let counter = 0
export const Counter = {
  next: () => {
    counter += 1;
    //console.log(`counter.next: ${counter}`);
    return counter;
  },
  current: () => {
    //console.log(`counter.current: ${counter}`);
    return counter;
  },
  setCurrent: (n) => {
    counter = n;
    return counter;
  }
}

export default Counter