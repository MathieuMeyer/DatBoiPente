using System;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using DatBoiPente.Logic.Components;
using DatBoiPente.Logic.Exceptions;
using RestSharp;
using RestSharp.Extensions;

namespace DatBoiPente.Logic
{
	public class AI
	{
	    public static string Name = "AI_HereComeDatBoi";

		private Connector _connector;
	    private PlayerDetails _playerDetails;
	    private GameState _gameState;

        public bool Connected => this._connector != null && this._connector.TestConnection();

	    public AI() { }

		public void Connect(string webServiceUrl)
		{
            Uri uri;
            bool uriWellFormated = Uri.TryCreate(webServiceUrl, UriKind.Absolute, out uri) && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);
		    if (!uriWellFormated) throw new UriFormatException();

            this._connector = new Connector(webServiceUrl);
		    if (!this._connector.TestConnection()) throw new ServerException();
		}

	    public void RequestGameConnection()
	    {
	        JsonObject playerDetails = (JsonObject) this._connector.Request($"connect/{AI.Name}", Method.GET);
            
	        if ((long) playerDetails["code"] == 200)
	        {
	            this._playerDetails = new PlayerDetails
	            {
	                Id = playerDetails["idJoueur"].ToString(),
	                Name = playerDetails["nomJoueur"].ToString(),
	                PlayerIndex = (int) (long) playerDetails["numJoueur"]
	            };
	        }
	        else { throw new PlayerSlotsFullException(); }
	    }

	    public async Task UpdateGameState()
	    {
	        JsonObject gameState = (JsonObject) await this._connector.AsyncRequest($"turn/{this._playerDetails.Id}", Method.GET);
	        this._gameState = new GameState()
	        {

	        };
	    }
	}
}
