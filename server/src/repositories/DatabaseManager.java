package repositories;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import entity.Credential;

public class DatabaseManager {
	private static final String url = "jdbc:mysql://google/final_project?"
			+ "cloudSqlInstance=usc-csci-201:us-central1:mysql-db"
			+ "&socketFactory=com.google.cloud.sql.mysql.SocketFactory"
			+ "&useSSL=false&user=final_project_shared&password=PxH7w8yaK!YWuG";

	public DatabaseManager() {}

	public static boolean validateUsername(String username) {
		boolean recorded = false;
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		String querySearch = "SELECT * FROM Users WHERE username = ?";
		
		try {
			conn = DriverManager.getConnection(url);
			ps = conn.prepareStatement(querySearch);
			ps.setString(1, username);
			rs = ps.executeQuery();
			System.out.println("database: " + username);
			while (rs.next()) {
				String usernameToMatch = rs.getString("username"); 
				System.out.println("database match: "+usernameToMatch+"\n");
				if (username.compareTo(usernameToMatch) == 0) {
					recorded = true;
					break;
				}
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
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
	
	
	/*public static boolean validateUsername(String username) {
		boolean recorded = false;
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		String querySearch = "SELECT * FROM Users WHERE username = ?";
		
		try {
			conn = DriverManager.getConnection(url);
			ps = conn.prepareStatement(querySearch);
			ps.setString(1, username);
			rs = ps.executeQuery();
			
			if(rs.next())
			{
				recorded = true;
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
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
	}*/
	
	
	
	public static Credential getHashAndSalt(String username) {
		Credential credential= null;
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		String querySearch = "SELECT * FROM Users WHERE username = ?";
		
		try {
			conn = DriverManager.getConnection(url);
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

	public static void register(String username, String Hash, String salt) {}
}