package scheduling;

import java.lang.Comparable;
import java.util.ArrayList;
import java.util.Collections;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import com.google.gson.annotations.Expose;

public class Schedule implements Comparable<Schedule> {
    
    public int id;
    public boolean published = false;
    @Expose public String scheduleName = null, username = null;
    @Expose public double total, early, late, breaks, reserved;
    @Expose public Section[] sections;

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
                if (s.penalize && s.days.contains(i + 1) && s.time != null) {
                    int index = -(Collections.binarySearch(currDay, s.time) + 1);
                    currDay.add(index, s.time);
                }
            }
            table[i] = currDay.toArray(new TimeRange[]{});
        }
        return timeTable = table;
    }
    
    public boolean isComplete() {
    	if(!(scheduleName != null && sections != null && sections.length > 0))
    	{
    		return false;
    	}
    	for(Section s : sections)
    	{
    		if(!s.isValid())
    		{
    			return false;
    		}
    	}
    	return true;
    }
    
    static public Schedule fromJson(String json)
	{
		Gson gson = new Gson();
		
		Schedule data = null;
		
		try
		{
			data = gson.fromJson(json, Schedule.class);
		}
		catch(JsonSyntaxException jse)
		{
			System.out.println(jse.getMessage());
			return null;
		}
		
		return data;
	}
    
    public String toJson()
    {
    	return toJson(false);
    }
    
    // if excludeFields is true, attributes id, inDatabase, published are excluded.
    public String toJson(boolean excludeFields)
    {
    	Gson gson = null;
    	if(excludeFields)
    	{
    		gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    	}
    	else
    	{
    		gson = new Gson();
    	}
    	return gson.toJson(this);
    }
}
