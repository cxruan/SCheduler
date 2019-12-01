package servlets;

import java.util.Vector;
import com.google.gson.Gson;

public class ParentClassInfo {
	String id;
	String type;
}

class SessionInfo {
	public String id;
	public String class_type;
	public String time;
	public String days;
	public String instructor;
	public String location;
	public String type;
	public String parentId;
}

class Category {
	String id;
	String type = "child";
	String parentId;
}

class Error {
	String status = "error";
	String message;
}

class Success {
	String status = "success";
	Vector<Object> data = new Vector<Object>();
}

class SerializedJson {
	String Json;
	Gson gson;

	public SerializedJson() {
		Json = "";
		gson = new Gson();
	}

	public void finishJson(Error e, Success s) {
		if (e.message != null)
			Json += gson.toJson(e);
		else
			Json += gson.toJson(s);
	}
}