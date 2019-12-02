package scheduling;

import java.lang.Comparable;
import java.util.ArrayList;
import java.util.Collections;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

public class Schedule implements Comparable<Schedule> {
    
    public int id;
    public boolean inDatabase = false;
    public boolean published = false;
    public String scheduleName = null, username = null;
    public double total, early, late, breaks, reserved;
    public Section[] sections;

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
			jse.printStackTrace();
			return null;
		}
		
		return data;
	}
    
    public String toJson()
    {
    	Gson gson = new Gson();
    	return gson.toJson(this);
    }
}
