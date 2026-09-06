export function scoreGuess(code, guess) {
  let wrongPlace = 0
  let rightPlace = 0
  let unmatchedCode = []
  let unmatchedGuess = []

  code.forEach((color, i) => {
    if (color === guess[i]) {
      rightPlace += 1
    } else {
      unmatchedCode.push(color)
      unmatchedGuess.push(guess[i])
    }
  })

  unmatchedGuess.forEach(color => {
    let matchingIndex = unmatchedCode.indexOf(color)
    if (matchingIndex >= 0) {
      wrongPlace += 1
      unmatchedCode.splice(matchingIndex, 1)
    }
  })

  return [wrongPlace, rightPlace]
}
