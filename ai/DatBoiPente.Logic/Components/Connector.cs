using System;
using RestSharp;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace DatBoiPente.Logic.Components
{
	public class Connector
	{
	    public static IList<string> ConnectionTestRoutes = new List<string> {"connect", "play", "turn"};
		private readonly RestClient _restClient;

		public Connector(string webServiceUrl)
		{
			_restClient = new RestClient(webServiceUrl);
		}

		public bool TestConnection()
		{
            return true;
		}

	    public object Request(string route, Method method)
	    {
            RestRequest request = new RestRequest(route, method);
            IRestResponse response = this._restClient.Execute(request);

	        return SimpleJson.DeserializeObject(response.Content);
	    }

	    public async Task<object> AsyncRequest(string route, Method method)
        {
            RestRequest request = new RestRequest(route, method);
            IRestResponse response = await _restClient.ExecuteTaskAsync(request);

            return SimpleJson.DeserializeObject(response.Content);
        }
	}
}
