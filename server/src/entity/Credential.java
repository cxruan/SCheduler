package entity;

public class Credential {
	private String hash;
	private String salt;

	public Credential() {}

	public Credential(String hash, String salt) {
		this.hash = hash;
		this.salt = salt;
	}
	
	public String getHash() {
		return this.hash;
	}
	
	public String getSalt() {
		return this.salt;
	}
}