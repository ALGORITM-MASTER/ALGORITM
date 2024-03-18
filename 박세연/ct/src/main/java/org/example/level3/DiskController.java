package org.example.level3;

import java.util.*;

public class DiskController {
	public int solution(int[][] jobs) {
		int answer = 0;

		PriorityQueue<Disk> disks = new PriorityQueue<>((o1, o2) -> o1.start - o2.start);
		for (int[] job : jobs) {
			disks.add(new Disk(job[0], job[1]));
		}

		return find(disks);
	}

	public int find(PriorityQueue<Disk> disks) {
		int currentTime = 0;
		int size = disks.size();
		int result = 0;

		PriorityQueue<Disk> worker = new PriorityQueue<>((o1, o2)-> o1.end - o2.end);

		while(!disks.isEmpty() || !worker.isEmpty()) {

			while (!disks.isEmpty() && disks.peek().start <= currentTime) {
				worker.add(disks.remove());
			}

			if (worker.isEmpty()) {
				currentTime = disks.peek().start;
				continue;
			}

			Disk disk = worker.remove();
			currentTime += disk.end;
			result += (currentTime - disk.start);
		}

		return result / size;
	}

	class Disk {

		public int start;
		public int end;

		public Disk(int start, int end) {
			this.start = start;
			this.end = end;
		}

		public String toString() {
			return start+"-"+end;
		}
	}
}
