

namespace Toasted.Data
{
    public interface IRepository
    {
        public Task<IEnumerable<User>> GetAllUsersAsync();
        public Task<User> LoginAsync(string username, string password);

        public Task<bool> AddUserAsync(User user);

        public Task<User> GetUserAsync(string username);

        //public Task<bool> UpdatePasswordAsync(string username, string encryptedPassword);

        //public Task<bool> UpdateTempUnitAsync(string username, char tempUnit);

        //public Task<bool> UpdateLocationAsync(string username, string locationJSON);
        //public  Task<bool> checkEmailExistsAsync(string email);
    }
}
