using Microsoft.Extensions.Configuration;
using Toasted.Data;

var builder = WebApplication.CreateBuilder(args);

// Build configuration

// Add services to the container.
string connectionString = "";
if(builder.Environment.IsDevelopment()){

    var configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .Build();

    connectionString = configuration.GetConnectionString("DefaultConnection");

}
else{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

builder.Logging.AddConsole(); // Configure console logging

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRepository>(sp => new SqlRepository(connectionString, sp.GetRequiredService<ILogger<SqlRepository>>()));

var app = builder.Build();

app.UseCors(builder => builder
    .AllowAnyOrigin()
       .AllowAnyMethod()
          .AllowAnyHeader());


// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
