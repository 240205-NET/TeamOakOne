using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Xml;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Toasted.Data;

    public class SqlRepository : IRepository
    {
        // Fields

        private readonly string _connectionString;
        private readonly ILogger<SqlRepository> _logger;

        // Constructors
        public SqlRepository(string connectionString, ILogger<SqlRepository> logger)
        {
            this._connectionString = connectionString;
            this._logger = logger;
        }

        // Methods
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            using SqlConnection connection = new SqlConnection(this._connectionString);

            await connection.OpenAsync();
            string cmdText = "SELECT * FROM [Toasted].[User];";
            using SqlCommand cmd = new SqlCommand(cmdText, connection);
            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            Console.WriteLine("Reader Executed...");

            List<User> users = new List<User>();

            while (await reader.ReadAsync())
            {
                int userId = (int)reader["userID"];
                string username = reader["username"].ToString() ?? "";
                string email = reader["email"].ToString() ?? "";
                string location = (string)reader["location"];
                string firstName = reader["firstName"].ToString() ?? "";
                string lastName = reader["lastName"].ToString() ?? "";
                string password = reader["password"].ToString() ?? "";

                User user = new User(username, password, firstName, lastName, userId, email, location);
                users.Add(user);

            }

            await connection.CloseAsync();

            _logger.LogInformation("Executed GetAllUsersAsync, returned {0} results.", users.Count);
            return users;
        }

        public async Task<User> LoginAsync(string username, string password)
        {
            using SqlConnection connection = new SqlConnection(this._connectionString);

            await connection.OpenAsync();
            string cmdText = "SELECT * FROM [Toasted].[User] WHERE username = @username AND password = @password;";
            using SqlCommand cmd = new SqlCommand(cmdText, connection);
            cmd.Parameters.AddWithValue("@username", username);
            cmd.Parameters.AddWithValue("@password", password);
            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            User user = null;

            if (await reader.ReadAsync())
            {
                int userId = (int)reader["userID"];
                string email = reader["email"].ToString() ?? "";
                string location = (string)reader["location"];
                string firstName = reader["firstName"].ToString() ?? "";
                string lastName = reader["lastName"].ToString() ?? "";
                string pw = reader["password"].ToString() ?? "";

                user = new User(username, pw, firstName, lastName, userId, email, location);
            }

            await connection.CloseAsync();

            _logger.LogInformation("Executed LoginAsync for {0}, returned {1}.", username, user != null);
            return user;
        }

        public async Task<bool> AddUserAsync(User user)
        {
            using SqlConnection connection = new SqlConnection(this._connectionString);

            await connection.OpenAsync();
            string cmdText = "INSERT INTO [Toasted].[User] (username, email, location, firstName, lastName, password) VALUES (@username, @email, @location, @firstName, @lastName, @password);";
            using SqlCommand cmd = new SqlCommand(cmdText, connection);
            cmd.Parameters.AddWithValue("@username", user.username);
            cmd.Parameters.AddWithValue("@email", user.email);
            cmd.Parameters.AddWithValue("@location", user.location);
            cmd.Parameters.AddWithValue("@firstName", user.firstName);
            cmd.Parameters.AddWithValue("@lastName", user.lastName);
            cmd.Parameters.AddWithValue("@password", user.password);
            int rows = await cmd.ExecuteNonQueryAsync();

            await connection.CloseAsync();

            _logger.LogInformation("Executed AddUserAsync for {0}, returned {1}.", user.username, rows == 1);
            return rows == 1;
        }

        public async Task<User> GetUserAsync(string username)
        {
            using SqlConnection connection = new SqlConnection(this._connectionString);

            await connection.OpenAsync();
            string cmdText = "SELECT * FROM [Toasted].[User] WHERE username = @username;";
            using SqlCommand cmd = new SqlCommand(cmdText, connection);
            cmd.Parameters.AddWithValue("@username", username);
            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            User user = null;

            if (await reader.ReadAsync())
            {
                int userId = (int)reader["userID"];
                string email = reader["email"].ToString() ?? "";
                string location = (string)reader["location"];
                string firstName = reader["firstName"].ToString() ?? "";
                string lastName = reader["lastName"].ToString() ?? "";
                string pw = reader["password"].ToString() ?? "";

                user = new User(username, pw, firstName, lastName, userId, email, location);
            }

            await connection.CloseAsync();

            _logger.LogInformation("Executed GetUserAsync for {0}, returned {1}.", username, user != null);
            return user;
        }

    }

