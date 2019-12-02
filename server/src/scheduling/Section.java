package scheduling;

import java.util.Set;

import com.google.gson.annotations.Expose;

public class Section {
	@Expose public String name, ID, type, instructor, location;
	@Expose public TimeRange time;
	@Expose public Set<Integer> days;
	@Expose public boolean include, penalize;
    
    public boolean isValid()
    {
    	return name != null && ID != null && type != null && 
    			(time == null || time.start <= time.end) &&
    			days != null;
    }
}
