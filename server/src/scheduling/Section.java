package scheduling;

import java.util.Set;

public class Section {
    public String name, ID, type, instructor, location;
    public TimeRange time;
    public Set<Integer> days;
    public boolean include, penalize;
}
