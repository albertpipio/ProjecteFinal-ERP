using ERP_API.Models.Request;
using ERP_API.Models.Response;

namespace ERP_API.Services
{
    public interface IUserService
    {
         UserResponse Auth(AuthRequest model);
    }
}