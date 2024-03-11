CREATE TABLE [Toasted].[User](
    [userID] INT IDENTITY(1,1) PRIMARY KEY,
    [username] NVARCHAR(50) UNIQUE NOT NULL,
    [email] NVARCHAR(50) NOT NULL,
    [location] NVARCHAR(MAX), --json
    [firstName] NVARCHAR(50),
    [lastName] NVARCHAR(50),
    [password] NVARCHAR(50) NOT NULL
);

SELECT * FROM [Toasted].[User];

TRUNCATE TABLE [Toasted].[User];

INSERT INTO [Toasted].[User] VALUES ('user1','email','thingy','firstname','last','passy') 