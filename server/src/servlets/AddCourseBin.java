package servlets;

import javax.servlet.annotation.WebServlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;
import java.io.InputStreamReader;

@WebServlet("/api/AddCourseBin")
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
		String courseID = "";
		String termID = "";
		Success s = new Success();
		Error e = new Error();
		SerializedJson Json = new SerializedJson();

		if (request.getParameter("courseID") != null)
			courseID = request.getParameter("courseID").trim();
		if (request.getParameter("termID") != null)
			termID = request.getParameter("termID").trim();

		if (courseID == "" && termID == "") {
			e.message = "Course code and semester time must be specified.";
		} else if (courseID == "") {
			e.message = "Course code cannot be empty.";
		} else if (termID == "") {
			e.message = "Semester time unspecified.";
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
				e.message = "Course doesn't exist.";
			} else {
				courseID = courseID.toUpperCase();

				boolean first = true;
				boolean hasLec = false;
				boolean hasDis = false;
				boolean hasQuiz = false;
				boolean hasLab = false;

				for (Element row : info.select("tr")) {
					if (first) {
						first = false;
						ParentClassInfo pif = new ParentClassInfo();
						pif.id = courseID;
						pif.type = "adult";

						s.data.add(pif);
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
						sf.parentId = courseID + "-" + sf.class_type;

						if (hasLec == false && sf.class_type.equalsIgnoreCase("Lecture")) {
							hasLec = true;
							Category lec = new Category();
							lec.id = courseID + "-" + sf.class_type;
							lec.parentId = courseID;

							s.data.add(lec);
						} else if (hasDis == false && sf.class_type.equalsIgnoreCase("Discussion")) {
							hasDis = true;
							Category dis = new Category();
							dis.id = courseID + "-" + sf.class_type;
							dis.parentId = courseID;
							s.data.add(dis);
						} else if (hasQuiz == false && sf.class_type.equalsIgnoreCase("Quiz")) {
							hasQuiz = true;
							Category quiz = new Category();
							quiz.id = courseID + "-" + sf.class_type;
							quiz.parentId = courseID;
							s.data.add(quiz);
						} else if (hasLab == false && sf.class_type.equalsIgnoreCase("Lab")) {
							hasLab = true;
							Category lab = new Category();
							lab.id = courseID + "-" + sf.class_type;
							lab.parentId = courseID;
							s.data.add(lab);
						}

						s.data.add(sf);
					}
				}
			}
		}
		Json.finishJson(e, s);
		response.getWriter().append(Json.Json);
	}
}
