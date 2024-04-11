package org.example.level2;

import java.util.*;
import java.util.stream.*;

public class Dictionary {
	public int solution(String word) {
		int answer = 0;
		Alpha alpha = new Alpha();
		alpha.initMap();

		return alpha.getIndex(word);
	}
}

class Alpha {
	private static final String[] alphabetData = {" ", "A", "E", "I", "O", "U"};
	private Set<String> strSet;
	private Map<String, Integer> resultMap;

	public Alpha() {
		this.strSet = new HashSet<>();
		this.resultMap = new HashMap<>();
	}

	public void initMap() {
		for (int i = 1; i < alphabetData.length; i++) {
			depth(1, alphabetData[i]);
		}

		int i=1;

		List<String> temp = this.strSet.stream()
			.sorted((s1,s2) -> {
				return s1.compareTo(s2);
			})
			.collect(Collectors.toList());
		for (String str : temp) {
			this.resultMap.put(str, i);
			i++;
		}
	}

	public void depth(int length, String str) {
		if (length == alphabetData.length-1) {
			this.strSet.add(str);
			return;
		}

		for (int i = 0; i < alphabetData.length; i++) {
			if (i == 0) {
				depth(length+1, str);
			}
			else {
				depth(length+1, str+alphabetData[i]);
			}
		}
	}

	public int getIndex(String str) {
		return this.resultMap.get(str);
	}


}