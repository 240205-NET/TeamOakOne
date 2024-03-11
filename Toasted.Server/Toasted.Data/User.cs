using System.Xml.Serialization;


namespace Toasted.Data
{
	public class User
	{
		public string username { get; set; }
		public string password { get; set; }
		public string firstName { get; set; }
		public string lastName { get; set; }
		public int userId { get; set; }
		public string email { get; set; }
		public string location { get; set; } //default location choice
		private static XmlSerializer Serializer = new XmlSerializer(typeof(User));


		public User(string username, string password, string firstName, string lastName, int userId, string email, string location)
		{
			this.username = username;
			this.password = password;
			this.firstName = firstName;
			this.lastName = lastName;
			this.userId = userId;
			this.email = email;
			this.location = location;

		}

		//no location
		public User(string username, string password, string firstName, string lastName, int userId, string email)
		{
			this.username = username;
			this.password = password;
			this.firstName = firstName;
			this.lastName = lastName;
			this.userId = userId;
			this.email = email;
		}



    }
}