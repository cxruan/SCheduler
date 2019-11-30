package servlets;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import scheduling.Scheduler;

/**
 * Servlet implementation class Schedule
 */
@WebServlet("/Schedule")
public class Schedule extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Schedule() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("{\"error\" : \"requests have to be made with POST\"}");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
			response.getWriter().append("{\"error\" : \"malformed request\"}");
			return;
		}
		Scheduler sc = new Scheduler();
		response.getWriter().append(sc.makeJsonSchedules(sb.toString()));
	}

}
