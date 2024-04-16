package org.example.level2;

import java.util.*;
import java.util.stream.*;

public class LastMusic {
	public String solution(String m, String[] musicinfos) {
		List<Music> musics = new ArrayList<>();

		for (String info : musicinfos) {
			musics.add(makeMusic(info));
		}

		// 시간을 기준으로 정렬 : 시간 많고 -> 시간 적고
		musics.sort((m1, m2) -> {
			if (m1.getTime() > m2.getTime()) {
				return -1;
			}
			else if (m1.getTime() < m2.getTime()) {
				return 1;
			}

			return 1;
		});
		// [14 HELLO, 5 WORLD]

		// 찾으려는 음악의 코드 분리
		String[] mArray = Music.parseSplit(m).toArray(String[]::new);

		// 포함하는지 확인해서 반환
		for (Music music : musics) {
			if (music.containCode(mArray)) {
				return music.getMusicName();
			}
		}

		// 없으면 none
		return "(None)";
	}

	// Music을 만들어주는 메서드
	public Music makeMusic(String musicInfo) {
		String[] infos = musicInfo.split(",");
		return new Music(infos[2], infos[3], calcTime(infos[0], infos[1]));
	}

	// 음악에 중복된 시간을 계산 => 분으로 계산하여 반환
	public int calcTime(String startTime, String endTime) {
		String[] sTime = startTime.split(":");
		String[] eTime = endTime.split(":");

		int hour = Integer.parseInt(eTime[0]) - Integer.parseInt(sTime[0]);
		int min = Integer.parseInt(eTime[1]) - Integer.parseInt(sTime[1]);

		return hour * 60 + min;
	}
}

class Music {
	private String[] musicData;
	private String musicName;
	private int time;

	public Music(String musicName, String code, int time) {
		this.musicName = musicName;
		this.musicData = initData(parseSplit(code), time);
		this.time = time;
	}

	// 각 코드 별로 분리해주는 메서드
	// 각 데이터를 분리하다 #와 만나면 이전 값이랑 붙여주는 역할을 한다.
	// C다음 #이면 C# 이됨
	public static List<String> parseSplit(String code) {
		List<String> data = new ArrayList<>();

		for (int i = 0; i < code.toCharArray().length; i++) {
			if (code.charAt(i) == '#') {
				data.set(data.size()-1, data.get(data.size()-1)+"#");
				continue;
			}

			data.add(String.valueOf(code.charAt(i)));
		}
		return data;
	}

	// 한 주기의 코드를 알아 냈으므로 시간만큼의 코드를 다시 만듦
	public String[] initData(List<String> code, int time) {
		List<String> ret = new ArrayList<>();

		for (int i = 0; i < time / code.size(); i++) {
			ret.addAll(code);
		}
		ret.addAll(
			code.subList(0, time % code.size())
		);
		return ret.toArray(String[]::new);
	}

	// 포함하는지 확인
	// 뮤직 데이터는  시간동안 동작하는 모든 코드
	public boolean containCode(String[] m) {
		if (this.musicData.length == 0) {
			return false;
		}

		int[][] map = new int[this.musicData.length][m.length];


		for (int musicIndex = 0; musicIndex < map.length; musicIndex++) {
			if (this.musicData[musicIndex].equals(m[0])) {
				map[musicIndex][0]++;
			}

			if (map[musicIndex][0] == m.length) {
				return true;
			}
		}
		for (int mIndex = 1; mIndex < m.length; mIndex++) {
			if (this.musicData[0].equals(m[mIndex])) {
				map[0][mIndex]++;
			}
			if (map[0][mIndex] == m.length) {
				return true;
			}
		}

		// DP로 포함하는지 확인
		for (int musicIndex=1; musicIndex < map.length; musicIndex++) {
			for (int mIndex = 1; mIndex < map[musicIndex].length; mIndex++) {
				if (!m[mIndex].equals(this.musicData[musicIndex])) {
					continue;
				}

				map[musicIndex][mIndex] = map[musicIndex-1][mIndex-1] + 1;
				if (map[musicIndex][mIndex] == m.length) {
					return true;
				}
			}
		}

		return false;
	}

	public String getMusicName() {
		return this.musicName;
	}

	public int getTime() {
		return this.time;
	}

	public String toString(){
		return time+"_"+musicName;
	}
}

