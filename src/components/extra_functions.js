export function adjustingScore(score) {
  if (score.toString().length === 1) {
    return `${score}.00`;
  } else if (score.toString().length === 3) {
    return `${score}0`;
  } else {
    return score;
  }
} // Used for update the score in case of a different pattern.
