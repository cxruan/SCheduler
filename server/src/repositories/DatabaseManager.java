package repositories;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import entity.Credential;

public class DatabaseManager {
	private static String url = null;
	
	private static Connection getConnection() throws SQLException, UrlNotSetException {
		if(url == null)
		{
			url = System.getenv("CS201_FINAL_PROJECT_DB_URL");
		}
		if(url == null)
		{
			throw new UrlNotSetException("Environment variable CS201_FINAL_PROJECT_DB_URL is not set.");
		}
		return DriverManager.getConnection(url);
	}
//	"jdbc:mysql://google/final_project?"
//			+ "cloudSqlInstance=usc-csci-201:us-central1:mysql-db"
//			+ "&socketFactory=com.google.cloud.sql.mysql.SocketFactory"
//			+ "&useSSL=false&user=final_project_shared&password=PxH7w8yaK!YWuG";

	public DatabaseManager() {}

	public static boolean validateUsername(String username) {
		boolean recorded = false;
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		String querySearch = "SELECT * FROM Users WHERE username = ?";
		
		try {
			conn = getConnection();
			ps = conn.prepareStatement(querySearch);
			ps.setString(1, username);
			rs = ps.executeQuery();
			
			while (rs.next()) {
				String usernameToMatch = rs.getString("username"); 
				if (username.compareTo(usernameToMatch) == 0) {
					recorded = true;
					break;
				}
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		} catch (UrlNotSetException urle) {
			urle.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
			if (ps != null) {
				try {
					ps.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
		}
		return recorded;
	}
	
	public static Credential getHashAndSalt(String username) {
		Credential credential= null;
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		String querySearch = "SELECT * FROM Users WHERE username = ?";
		
		try {
			conn = getConnection();
			ps = conn.prepareStatement(querySearch);
			ps.setString(1, username);
			rs = ps.executeQuery();
			
			while (rs.next()) {
				String usernameToMatch = rs.getString("username"); 
				if (username.compareTo(usernameToMatch) == 0) {
					credential = new Credential(rs.getString("hash"), rs.getString("salt"));
				}
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		} catch (UrlNotSetException urle) {
			urle.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
			if (ps != null) {
				try {
					ps.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
		}
		return credential;
	}

	public static void register(String username, String hash, String salt) {
		Connection conn = null;
		PreparedStatement ps = null;

		String registerQuery = "INSERT INTO Users (username, hash, salt) VALUES (?, ?, ?)";

		try {
			conn = getConnection();
			ps = conn.prepareStatement(querySearch);
			ps.setString(1, username);
			ps.setString(2, hash);
			ps.setString(3, salt);
			ps.executeUpdate();
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		} finally {
			if(ps != null) {
				try{
					ps.close();
				} catch(SQLException sqle) {
					sqle.printStackTrace();
				}
			}

			if(conn != null) {
				try {
					conn.close();
				} catch(SQLException sqle) {
					sqle.printStackTrace();
				}
			}
		}
	}	
	
	// return PrimaryKey if insert is successful, -1 otherwise.
	public static int addSchedule(String username, String schedule, boolean isPublic) {	
		Connection conn = null;
		PreparedStatement ps1 = null, ps2 = null;
		ResultSet rs = null;
		
		String querySearch = "INSERT INTO Schedules (userId, public, content) VALUES ((SELECT userId from Users WHERE username=?), ?, ?)";
		String queryPK = "SELECT LAST_INSERT_ID()";
		
		int rowsAffected = 0;
		
		try {
			conn = getConnection();
			ps1 = conn.prepareStatement(querySearch);
			ps1.setString(1, username);
			ps1.setBoolean(2, isPublic);
			ps1.setString(3, schedule);
			ps2 = conn.prepareStatement(queryPK);
			
			if(ps1.executeUpdate() > 0)
			{
				rs = ps2.executeQuery();
				if (rs.next()) {
					int pk = rs.getInt("LAST_INSERT_ID()"); 
					return pk;
				}
			}
			
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		} catch (UrlNotSetException urle) {
			urle.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
			if (ps1 != null) {
				try {
					ps1.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
			if (ps2 != null) {
				try {
					ps2.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
		}
		return -1;
	}
	
	public static int setPublic(String username, int scheduleId) {	
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		String querySearch = "UPDATE Schedules SET public=true WHERE userId=(SELECT userId from Users WHERE username=?) AND scheduleId=?";
		
		try {
			conn = getConnection();
			ps = conn.prepareStatement(querySearch);
			ps.setString(1, username);
			ps.setInt(2, scheduleId);
			
			return ps.executeUpdate();
			
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		} catch (UrlNotSetException urle) {
			urle.printStackTrace();
		} finally {
			if (ps != null) {
				try {
					ps.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
			}
		}
		return 0;
	}
}

class UrlNotSetException extends RuntimeException {
	static final long serialVersionUID = 1L;
	public UrlNotSetException(String message)
	{
		super(message);
	}
}