package org.example.level3;

import java.util.ArrayList;
import java.util.List;

public class TravelPath {

	private List<String> allPaths = new ArrayList<>();

	public String[] solution(String[][] tickets) {
		List<Path> paths = ticketToPaths(tickets);
		boolean[] visit = new boolean[paths.size()];
		dfs(paths, visit, "ICN", "ICN", 0);

		allPaths.sort((o1, o2) -> o1.compareTo(o2));

		return  allPaths.get(0).split(",");
	}

	private void dfs(List<Path> paths, boolean[] visit, String start, String cpath, int depth) {
		if (depth == paths.size()) {
			allPaths.add(cpath);
			return;
		}

		for (int i = 0 ; i < paths.size(); i++) {
			Path currentPath = paths.get(i);

			if (!visit[i] && currentPath.start.equals(start)) {
				visit[i] = true;
				dfs(paths, visit, currentPath.end, cpath+","+currentPath.end, depth+1);
				visit[i] = false;
			}
		}

	}

	private List<Path> ticketToPaths(String[][] tickets) {
		List<Path> paths = new ArrayList<>();
		int index = 0;

		for (String[] ticket : tickets) {
			paths.add(new Path(index, ticket[0], ticket[1]));
		}

		return paths;
	}
}

class Path {

	public int index;
	public String start;
	public String end;

	public Path(int index, String start, String end) {
		this.index = index;
		this.start = start;
		this.end = end;
	}
}