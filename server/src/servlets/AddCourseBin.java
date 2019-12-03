package servlets;

import javax.servlet.annotation.WebServlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.jsoup.nodes.Element;
import java.io.InputStreamReader;

@WebServlet("/api/add-course")
public class AddCourseBin extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AddCourseBin() {
		super();
	}

	private static String encodeValue(String value) {
		try {
			return URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
		} catch (UnsupportedEncodingException ex) {
			throw new RuntimeException(ex.getCause());
		}
	}

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String courseID = null;
		String termID = null;
		
		courseID = request.getParameter("courseID");
		termID = request.getParameter("termID");
		
		AddCourseBinResponse res = null;

		if (courseID == null || courseID.isEmpty()) {
			res = new AddCourseBinResponse("Course ID cannot be empty.");
		} else if (termID == null || termID.isEmpty()) {
			res = new AddCourseBinResponse("Term cannot be empty.");
		} else {
			URL url = new URL("https://classes.usc.edu/term-" + termID + "/course/" + courseID);
			HttpURLConnection connect = (HttpURLConnection) url.openConnection();
			connect.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
			StringBuilder sb = new StringBuilder();
			String line = null;
			try {
				while ((line = br.readLine()) != null) {
					sb.append(line);
				}
			} catch (IOException ioe) {
				throw new ServletException(ioe);
			}

			Document doc = Jsoup.parse(sb.toString());
			Elements info = doc.select(".sections");

			if (info == null) {
				res = new AddCourseBinResponse("Course does not exist.");
			} else {
				courseID = courseID.toUpperCase();
				Map<String, ArrayList<SessionInfo>> map = new HashMap<String, ArrayList<SessionInfo>>();

				for (Element row : info.select("tr[data-section-id]")) {
					SessionInfo sf = new SessionInfo();
						sf.id = row.select("td.section").text();
						sf.class_type = row.select("td.type").text();
						sf.time = row.select("td.time").text();
						sf.days =  row.select("td.days").text();
						sf.instructor = row.select("td.instructor").text();
						sf.location = row.select("td.type").text();
						sf.type = "child";
						sf.parentId = courseID + "-" + sf.class_type;

						if(!map.containsKey(sf.class_type))
						{
							map.put(sf.class_type, new ArrayList<SessionInfo>());
						}
						
						map.get(sf.class_type).add(sf);
				}
				
				res = new AddCourseBinResponse();
				res.dataAL.add(new ResponseItemHeader(courseID, "parent", null));
				
				for(String type : map.keySet())
				{
					res.dataAL.add(new ResponseItemHeader(courseID + "-" + type, "child", courseID));
					for(SessionInfo session : map.get(type))
					{
						res.dataAL.add(session);
					}
				}
			}
		}
		
		response.getWriter().append(res.toJson());
	}
}

class AddCourseBinResponse {
	public AddCourseBinResponse()
	{
		status = "success";
	}
	public AddCourseBinResponse(String error)
	{
		status = "error";
		message = error;
	}
	String status;
	Object[] data;
	transient ArrayList<Object> dataAL = new ArrayList<Object>();
	String message;
	
    public String toJson()
    {
    	data = dataAL.toArray();
    	Gson gson = null;
    	gson = new Gson();
    	return gson.toJson(this);
    }
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

class ResponseItemHeader {
	public ResponseItemHeader(String id, String type, String pId)
	{
		this.id = id;
		this.type = type;
		this.parentId = pId;
	}
	String id, type, parentId;	
}
