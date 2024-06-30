package org.example.bj;

import java.util.*;
import java.io.*;

public class MakeSecret {

	public static void main(String[] args) throws IOException {
		BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));

		String[] inputs = bf.readLine().split(" ");
		int L = Integer.parseInt(inputs[0]);
		int C = Integer.parseInt(inputs[1]);

		String[] alphabet = bf.readLine().split(" ");

		new MakeSecret().solution(L, C, alphabet);
	}

	private void solution(int l, int c, String[] alphabet) {
		Data data = new Data();
		Arrays.sort(alphabet);
		keyFunction(0, data, l, alphabet);
	}

	private void keyFunction(int index, Data data, int l, String[] alphabet) {
		if (data.length() == l) {
			data.result();
			return;
		}

		for (int i = index; i < alphabet.length; i++) {
			if (data.add(alphabet[i])) {
				keyFunction(i+1, data, l, alphabet);
				data.pop();
			}
		}
	}

	class Data {
		static final Set<String> moList = new HashSet<>(Arrays.asList("a", "e", "i", "o", "u"));

		List<String> array;
		int ja;
		int mo;

		public Data() {
			this.array = new ArrayList<>();
			this.ja = 0;
			this.mo = 0;
		}

		public boolean add(String data) {
			if (array.contains(data)) {
				return false;
			}

			array.add(data);

			if (moList.contains(data)) {
				mo++;
			} else {
				ja++;
			}

			return true;
		}

		public int length() {
			return array.size();
		}

		public void result() {
			if (mo < 1 || ja < 2) {
				return;
			}

			System.out.println(String.join("", array));
		}

		public void pop() {
			String data = array.remove(array.size()-1);
			if (moList.contains(data)) {
				mo--;
			} else {
				ja--;
			}
		}
	}
}
