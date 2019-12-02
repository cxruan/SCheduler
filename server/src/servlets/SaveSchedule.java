package servlets;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.JsonResponse;
import repositories.DatabaseManager;
import scheduling.Schedule;

/**
 * Servlet implementation class SaveHistory
 */
@WebServlet("/api/save")
public class SaveSchedule extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveSchedule() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().print(new JsonResponse("error", "use POST").toJson());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = (String)request.getSession().getAttribute("username");
		if(username == null)
		{
			response.getWriter().print(new JsonResponse("error", "not logged in").toJson());
		}
		else
		{
			BufferedReader br = request.getReader();
			StringBuilder sb = new StringBuilder();
			String line = null;
			try {
				while((line = br.readLine()) != null)
				{
					sb.append(line);
				}
			} catch (IOException ioe) {
			    throw new ServletException(ioe);
			}
			if(sb.length() == 0)
			{
				response.getWriter().append(new JsonResponse("error", "empty request").toJson());
				return;
			}
			Schedule s = Schedule.fromJson(sb.toString());
			if(s != null && s.isValid())
			{
				s.username = username;
				if(DatabaseManager.addSchedule(username, s.toJson(), false) > 0)
				{
					response.getWriter().append(new JsonResponse("ok", null).toJson());
				}
				else
				{
					response.getWriter().append(new JsonResponse("error", "cannot insert in to database").toJson());
				}
			}
			else
			{
				response.getWriter().append(new JsonResponse("error", "inalid request").toJson());
			}
		}
	}

}
