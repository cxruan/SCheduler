package scheduling;

import java.lang.Comparable;
import java.util.ArrayList;
import java.util.Collections;

public class Schedule implements Comparable<Schedule> {
    
    int id;
    boolean inDatabase = false;
    String scheduleName;
    double total, early, late, breaks, reserved;
    Section[] sections;

    public Schedule(Section[] s) {
        sections = s.clone();
        total = early = late = breaks = reserved = 0;
    }

    @Override
    public int compareTo(Schedule rhs) {
        if (total == rhs.total) {
            return hashCode() - rhs.hashCode();
        } else {
            return (int) ((rhs.total - total) * 1000);
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
    
    public boolean isValid() {
    	return scheduleName != null && sections != null && sections.length > 0;
    }
}
