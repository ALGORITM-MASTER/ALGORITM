package org.example.level3;

public class ChangeWord {
	public int solution(String begin, String target, String[] words) {
		boolean[] visit = new boolean[words.length];

		int answer = solve(begin, target, words, visit);
		if (answer == 0) {
			return 0;
		}
		return answer-1;
	}

	private int solve(String begin, String target, String[] words, boolean[] visit) {
		if (begin.equals(target)) {
			return 1;
		}

		int result = 0;

		for (int i = 0; i < words.length; i++) {
			if (visit[i]) {
				continue;
			}

			if (canChange(begin, words[i])) {
				visit[i] = true;
				int temp = solve(words[i], target, words, visit);
				if (result == 0) {
					result = temp;
				} else {

					result = result > temp ? temp : result;
				}

				visit[i] = false;
			}
		}

		return result == 0 ? 0 : result + 1;
	}

	private boolean canChange(String begin, String nextWord) {
		int count = 0;

		for (int i = 0; i < begin.length(); i++) {
			if (begin.charAt(i) == nextWord.charAt(i)) {
				count++;
			}
		}

		return count == begin.length()-1;
	}
}
