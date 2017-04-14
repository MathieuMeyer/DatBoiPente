using System;
using System.Runtime.Remoting;
using System.Threading;
using System.Threading.Tasks;
using DatBoiPente.Logic.Components;

namespace DatBoiPente.Logic
{
	public class AI
	{
	    public static string Name = "0002ARRA";

		private Connector _connector;
	    private Game _game;
	    private DecisionManager _decisionManager;

        public bool Connected => this._connector != null && this._connector.TestConnection();

	    public AI()
	    {
	        this._game = new Game();
            this._decisionManager = new DecisionManager();
	    }

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
	        _game.RequestGameConnection(this._connector);
	    }

	    public async Task LaunchAi()
	    {
	        while (true)
            {
                Thread.Sleep(500);
                await this._game.UpdateGameState(this._connector);
                if (this._game.GameState.IsPlaying)
                {
                    if (!this._game.GameState.IsGameOver)
                    {
                        if (this._game.GameState.IsOurTrun)
                            await Play();
                    }
                    else Console.WriteLine("Game over");
                }
                else Console.WriteLine("Game is not playing");
            }
        }

	    public async Task Play()
	    {
	        await this._game.Play(this._connector, await _decisionManager.TakeDecision(this._game));
	    }
	}
}
