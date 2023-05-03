function sum(a: number, b: number): number {
  return a + b;
}

describe('sum', () => {
  it('1 + 2', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
