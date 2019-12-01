package servlets;

import javax.servlet.annotation.WebServlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.InputStream;
import java.io.InputStreamReader;

@WebServlet("/AddCourseBin")
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

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String courseID = request.getParameter("courseID");
		String termID = request.getParameter("termID");

		if (courseID == null && termID == null)
			out.println("Course code and semester time must be specified.");
		else if (courseID == null)
			out.println("Course code cannot be empty.");
		else if (termID == null)
			out.println("Semester time unspecified.");
		else {
			courseID = courseID.trim();
			termID = termID.trim();
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
				out.println("Course doesn't exist.");
			} else {
				String Json = "";
				Gson gson = new Gson();
				courseID = courseID.toUpperCase();
				boolean first = true;
				for (Element row : info.select("tr")) {
					if (first) {
						first = false;
						ParentClassInfo pif = new ParentClassInfo();
						pif.id = courseID;
						pif.type = "adult";

						Json += gson.toJson(pif) + ",";
					} else {
						Elements tds = row.select("td");
						SessionInfo sf = new SessionInfo();
						sf.id = tds.get(0).text();
						sf.class_type = tds.get(2).text();
						sf.time = tds.get(3).text();
						sf.days = tds.get(4).text();
						sf.instructor = tds.get(6).text();
						sf.location = tds.get(7).text();
						sf.type = "child";
						sf.parentId = courseID;

						Json += gson.toJson(sf) + ",";
					}
				}
				Json = Json.substring(0, Json.length() - 1);
				Json = "[" + Json + "]";
				response.getWriter().append(Json);
			}
		}
		out.close();
	}
}
