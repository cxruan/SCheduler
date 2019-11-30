package scheduling;

import java.lang.Comparable;
import java.util.ArrayList;
import java.util.Collections;

public class Schedule implements Comparable<Schedule> {
    Section[] sections;
    double score;
    String scheduleName;

    public Schedule(Section[] s) {
        sections = s.clone();
        score = 0;
    }

    @Override
    public int compareTo(Schedule rhs) {
        if (score == rhs.score) {
            return hashCode() - rhs.hashCode();
        } else {
            return (int) ((score - rhs.score) * 1000);
        }
    }

    transient private TimeRange[][] timeTable = null;

    TimeRange[][] getTimeTable() {

        if(timeTable != null)
            return timeTable;

        TimeRange[][] table = new TimeRange[7][];
        for (int i = 0; i < 7; i++) {
            ArrayList<TimeRange> currDay = new ArrayList<TimeRange>();
            for (Section s : sections) {
                if (s.penalize && s.days.contains(i + 1)) {
                    int index = -(Collections.binarySearch(currDay, s.time) + 1);
                    currDay.add(index, s.time);
                }
            }
            table[i] = currDay.toArray(new TimeRange[]{});
        }
        return timeTable = table;
    }
}
