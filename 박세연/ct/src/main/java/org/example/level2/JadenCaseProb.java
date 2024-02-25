package org.example.level2;

public class JadenCaseProb {
	public String solution(String s) {
		String answer = "";

		JadenCase jadenCase = new JadenCase(s);
		jadenCase.parse();

		return jadenCase.getS();
	}
}


class JadenCase {
	char[] sTemp;
	boolean first;

	public JadenCase(String s) {
		this.sTemp = s.toCharArray();
		this.first = true;
	}

	public void parse() {
		for (int i = 0; i < this.sTemp.length; i++) {
			this.sTemp[i] = checkData(this.sTemp[i], first);
		}
	}

	private char checkData(char data, boolean isFirst) {
		if (data == ' ') {
			this.first = true;
			return data;
		}

		if (isFirst) {
			if (data >= 'a' && data <= 'z') {
				data = (char)(data-'a' + 'A');
			}
			this.first = false;
			return data;
		}

		if (data >= 'A' && data <= 'Z') {
			data = (char)(data-'A' + 'a');
		}
		return data;
	}

	public String getS() {
		return new String(this.sTemp);
	}
}