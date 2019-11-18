package scheduling.json;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import scheduling.Course;

public class RequestJson {
	public Course[] courses;
	public Preferences preferences;
	
	static public RequestJson deserialize(String json)
	{
		Gson gson = new Gson();
		
		RequestJson data = null;
		
		try
		{
			data = gson.fromJson(json, RequestJson.class);
		}
		catch(JsonSyntaxException jse)
		{
			System.out.println(jse.getMessage());
		}
		
		return data;
	}
}
