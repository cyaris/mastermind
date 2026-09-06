import assert from "node:assert/strict"
import test from "node:test"

import { scoreGuess } from "../src/lib/functions/scoring.js"

test("scoreGuess separates wrong-place and right-place colors", () => {
  assert.deepEqual(scoreGuess([1, 2, 3, 4], [1, 3, 2, 5]), [2, 1])
})

test("scoreGuess does not count a duplicate guess more times than it occurs in the code", () => {
  assert.deepEqual(scoreGuess([1, 2, 3, 4], [1, 1, 1, 1]), [0, 1])
  assert.deepEqual(scoreGuess([1, 1, 2, 2], [1, 2, 1, 3]), [2, 1])
})

test("scoreGuess recognizes exact wins and complete misses", () => {
  assert.deepEqual(scoreGuess([1, 5, 3, 2], [1, 5, 3, 2]), [0, 4])
  assert.deepEqual(scoreGuess([1, 2, 3, 4], [5, 5, 5, 5]), [0, 0])
})
