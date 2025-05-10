import {sum} from "./sum_function.js"

/**
 * Testing function: {function name}
 */

// true tests
test('Checks the sum function for 1 + 2', () => {
    expect(sum(1, 2)).toBe(3);
});

test('Checks the sum function -3 + -5', () => {
    expect(sum(-3, -5)).toBe(-8);
});

// false tests (will be added with more functions)