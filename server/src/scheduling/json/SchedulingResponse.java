package scheduling.json;

import com.google.gson.Gson;

import scheduling.Schedule;

public class SchedulingResponse {
	public String error = null;
	public String warning = null;
	public Schedule[] results = null;
	
    public String toJson()
    {
    	Gson gson = new Gson();
    	return gson.toJson(this);
    }
}
