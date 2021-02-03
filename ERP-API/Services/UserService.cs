using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using ERP_API.Models;
using ERP_API.Models.Common;
using ERP_API.Models.Request;
using ERP_API.Models.Response;
using ERP_API.Tools;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ERP_API.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public UserResponse Auth(AuthRequest model)
        {
            UserResponse userResponse = new UserResponse();
            using (var db = new ERPContext())
            {
                string spassword = Encrypt.GetSHA256(model.Password);

                var user = db.Users.Where(d => d.Email == model.Email &&
                                             d.Password == spassword).FirstOrDefault();
                if (user == null) return null;

                userResponse.Email = user.Email;
                userResponse.Token = GetToken(user);

            }

            return userResponse;
        }

        private string GetToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_appSettings.SECRET_KEY);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email)
                    }
                ),
                Expires = DateTime.UtcNow.AddDays(60),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}