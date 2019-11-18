package scheduling;

import java.lang.Comparable;

public class TimeRange implements Comparable<TimeRange> {

    public int start = -1, end = -1;

    public TimeRange(int s, int e) {
        start = s;
        end = e;
    }

    @Override
    public int compareTo(TimeRange rhs) {
        if(start == rhs.start)
            return end - rhs.end;
        return start - rhs.start;
    }

    @Override
    public boolean equals(Object o) {

        if (o == this)
            return true;

        if (!(o instanceof TimeRange))
            return false;

        TimeRange range = (TimeRange) o;

        return start == range.start && end == range.end;
    }

    public boolean contains(int time)
    {
        return start <= time && time <= end;
    }

    public boolean overlaps(TimeRange range)
    {
        return contains(range.start) || contains(range.end);
    }

    public int length()
    {
        return end - start;
    }
}
