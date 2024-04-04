package org.example.level3;

import java.util.*;

public class BugUser {
	public int solution(String[] user_id, String[] banned_id) {
		List<Data> datas = toData(user_id);

		return findAll(datas, banned_id);
	}

	private List<Data> toData(String[] user_id) {
		List<Data> datas = new ArrayList<>();

		for (int i = 0; i < user_id.length; i++) {
			datas.add(new Data(i, user_id[i]));
		}

		return datas;
	}

	public int findAll(List<Data> datas, String[] banned_id) {
		Set<Integer> union = new HashSet<>();

		Set<String> results = new HashSet<>();
		dfs(datas, banned_id, union, 0, results);

		return results.size();
	}

	public void dfs(List<Data> datas, String[] banned_id, Set<Integer> union, int depth, Set<String> results) {
		if (depth == banned_id.length) {
			if (union.size() < banned_id.length) {
				return;
			}

			String result = listToString(new ArrayList<>(union));
			results.add(result);
			return ;
		}

		String banned = banned_id[depth];
		for (int i = 0; i < datas.size(); i++) {
			if (union.contains(datas.get(i).id)) {
				continue;
			}

			if (isBan(banned, datas.get(i).userId)) {
				union.add(datas.get(i).id);
				dfs(datas, banned_id, union, depth+1, results);
				union.remove(datas.get(i).id);
			}
		}
	}

	private boolean isBan(String banned, String target) {
		if (banned.length() != target.length()) {
			return false;
		}

		for (int i = 0; i < banned.length(); i++) {
			if (banned.charAt(i) == '*') {
				continue;
			}

			if (banned.charAt(i) != target.charAt(i)) {
				return false;
			}
		}

		return true;
	}

	public String listToString(List<Integer> sortedList) {
		StringBuilder sb = new StringBuilder();
		for(Integer data : sortedList) {
			sb.append(data).append(":");
		}

		return sb.toString();
	}

	class Data {
		public int id;
		public String userId;

		public Data(int id, String userId) {
			this.id = id;
			this.userId = userId;
		}
	}
}
