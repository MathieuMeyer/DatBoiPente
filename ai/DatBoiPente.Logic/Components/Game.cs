using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatBoiPente.Logic.Exceptions;
using RestSharp;

namespace DatBoiPente.Logic.Components
{
    class Game
    {
        private PlayerDetails _playerDetails;
        private GameState _gameState;
        private Board _board;

        public PlayerDetails PlayerDetails => _playerDetails;
        public GameState GameState => _gameState;
        public Board Board => _board;

        public Game() { }

        public void RequestGameConnection(Connector connector)
        {
            JsonObject playerDetails = (JsonObject) connector.Request($"connect/{AI.Name}", Method.GET);

            if ((long)playerDetails["code"] == 200)
            {
                this._playerDetails = new PlayerDetails
                {
                    Id = playerDetails["idJoueur"].ToString(),
                    Name = playerDetails["nomJoueur"].ToString(),
                    PlayerIndex = (int)(long)playerDetails["numJoueur"]
                };
                this._board = new Board(this._playerDetails.PlayerIndex);
            }
            else { throw new PlayerSlotsFullException(); }
        }

        public async Task UpdateGameState(Connector connector)
        {
            JsonObject gameState = (JsonObject)await connector.AsyncRequest($"turn/{this._playerDetails.Id}", Method.GET);

            if ((long) gameState["code"] == 200)
            {
                this._gameState = new GameState()
                {
                    IsPlaying = true,
                    IsOurTrun = (long) gameState["status"] == 1,
                    PlayerOneScore = (int) (long) gameState["nbTenaillesJ1"],
                    PlayerTwoScore = (int) (long) gameState["nbTenaillesJ2"],
                    LastPlayedCoordinates =
                        new GameState.LastPlayed((int) (long) gameState["dernierCoupX"],
                            (int) (long) gameState["dernierCoupY"]),
                    IsGameOver = (bool) gameState["finPartie"],
                    GameOverMessage = (string) gameState["detailFinPartie"],
                    Turn = (int) (long) gameState["numTour"]
                };
                this._board.UpdateBoard((JsonArray) gameState["tableau"]);
            }
            else
            {
                this._gameState = new GameState();
            }
        }

        public async Task Play(Connector connector, GameState.LastPlayed decision)
        {
            JsonObject response = (JsonObject) await connector.AsyncRequest($"play/{decision.X}/{decision.Y}/{this._playerDetails.Id}", Method.GET);
        }
    }
}
